import { useState, lazy, Suspense } from "react";
import { useMovies } from "../../hooks/useMovie";
import NetflixHeroBanner from "../../components/UI/heroBanner";
import MovieGrid from "./../../components/UI/movieGrid";
import Navbar from "../../components/UI/navbar";
import SpinnerComponent from "../../components/UI/spinner";
import useDebounce from "../../hooks/useDebounce";

const ResultsOverlay = lazy(() => import("../../components/UI/overlay"));

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [selectedGenreName, setSelectedGenreName] = useState(null);
  const [showResults, setShowResults] = useState(false);

  // Use debounce hook for search term
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // Fetch latest movies for hero banner
  const { movies: latestMovies, loading: latestLoading } = useMovies("latest");
  const { genres } = useMovies();

  // Fetch movies based on genre or search
  const { movies: resultsMovies, loading: resultsLoading } = useMovies(
    selectedGenre ? "genre" : debouncedSearchTerm ? "search" : "popular",
    selectedGenre,
    debouncedSearchTerm
  );

  // Fetch popular movies for first grid
  const { movies: popularMovies, loading: popularLoading } =
    useMovies("popular");

  // Fetch trending movies for second grid
  const { movies: trendingMovies, loading: trendingLoading } =
    useMovies("trending");

  // Handle search functionality
  const handleSearch = (term) => {
    setSearchTerm(term);
    setSelectedGenre(null);
    setShowResults(!!term);
  };

  // Handle genre selection
  const handleGenreSelect = (genreId) => {
    console.log(genreId);
    setSelectedGenre(genreId);
    const genreName =
      genres.find((genre) => genre.id === genreId)?.name || "Selected";
    setSelectedGenreName(genreName);
    setSearchTerm("");
    setShowResults(true);
  };

  const closeResults = () => {
    setSearchTerm("");
    setSelectedGenre(null);
    setShowResults(false);
  };

  // Determine results to show and title
  const resultsToShow =
    selectedGenre || debouncedSearchTerm ? resultsMovies : popularMovies;

  const resultsTitle = selectedGenre
    ? `${selectedGenreName} Movies`
    : debouncedSearchTerm
    ? `Results for "${debouncedSearchTerm}"`
    : "Popular Movies";

  const isLoading =
    selectedGenre || debouncedSearchTerm ? resultsLoading : popularLoading;

  return (
    <div className="netflix-home min-vh-100 bg-var-primary text-white">
      {/* navbar */}
      <Navbar
        onSearch={handleSearch}
        onGenreSelect={handleGenreSelect}
        genres={genres}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedGenre={selectedGenre}
      />

      <div className={`${showResults ? "blur-sm" : ""}`}>
        {/* hero banner */}
        <NetflixHeroBanner movies={latestMovies} loading={latestLoading} />

        {/* Movie Grid */}
        <div className="container-fluid px-4 mt-n5 position-relative">
          {!showResults && (
            <>
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
            </>
          )}
        </div>
      </div>

      {showResults && (
        <Suspense fallback={<SpinnerComponent message="Loading movies..." />}>
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
