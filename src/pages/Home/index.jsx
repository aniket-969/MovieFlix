import { useState, lazy, Suspense } from "react";
import { useMovies } from "../../hooks/useMovie";
import NetflixHeroBanner from "../../components/UI/heroBanner";
import MovieGrid from "./../../components/UI/movieGrid";
import NetflixNavbar from "../../components/UI/navbar";
import SpinnerComponent from "../../components/UI/spinner";
import useDebounce from "../../hooks/useDebounce";

const ResultsOverlay = lazy(() => import("../../components/UI/overlay"));

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [showResults, setShowResults] = useState(false);

  //  debounce hook for search term
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // Fetch latest movies for hero banner
  const { movies: latestMovies, loading: latestLoading } = useMovies("latest");
  const { genres } = useMovies();

  // Fetch popular movies for first grid
  const { movies: popularMovies, loading: popularLoading } =
    useMovies("popular");

  // Fetch trending movies for second grid
  const { movies: trendingMovies, loading: trendingLoading } =
    useMovies("trending");

  // Search results with debounced search term
  const { movies: searchResults, loading: searchLoading } = useMovies(
    debouncedSearchTerm ? "search" : "popular",
    null,
    debouncedSearchTerm
  );

  const handleSearch = (term) => {
    setSearchTerm(term);
    setSelectedGenre(null);
    setShowResults(!!term);
  };

  const closeResults = () => {
    setSearchTerm("");
    setShowResults(false);
  };

  // Determining results to show and the title
  const resultsToShow = debouncedSearchTerm ? searchResults : popularMovies;
  const resultsTitle = debouncedSearchTerm
    ? `Results for "${debouncedSearchTerm}"`
    : selectedGenre
    ? `${selectedGenre} Movies`
    : "Popular Movies";
  const isLoading = debouncedSearchTerm ? searchLoading : popularLoading;

  return (
    <div className="netflix-home min-vh-100 bg-black text-white">
      <NetflixNavbar
        onSearch={handleSearch}
        genres={genres}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      <div className={`${showResults ? "blur-sm" : ""}`}>
        <NetflixHeroBanner movies={latestMovies} loading={latestLoading} />

        <div className="container-fluid px-4 mt-n5 position-relative">
          <MovieGrid
            title="Popular on Netflix"
            movies={popularMovies}
            loading={popularLoading}
          />

          <MovieGrid
            title="Trending This Week"
            movies={trendingMovies}
            loading={trendingLoading}
          />
        </div>
      </div>

      {showResults && (
        <Suspense fallback={<SpinnerComponent message="Searching movies..." />}>
          <ResultsOverlay
            title={resultsTitle}
            movies={resultsToShow}
            loading={isLoading}
            onClose={closeResults}
          />
        </Suspense>
      )}
    </div>
  );
};

export default Home;
