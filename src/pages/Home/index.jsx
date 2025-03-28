import React, {
  useState,
  lazy,
  Suspense,
  useMemo,
  useCallback,
  memo,
} from "react";
import { useMovies } from "../../hooks/useMovie";
import NetflixHeroBanner from "../../components/UI/heroBanner";
import Navbar from "../../components/UI/navbar";
import SpinnerComponent from "../../components/UI/spinner";
import useDebounce from "../../hooks/useDebounce";

const ResultsOverlay = lazy(() => import("../../components/UI/overlay"));
const MovieCarousel = lazy(() => import("./../../components/UI/movieGrid"));

const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [showResults, setShowResults] = useState(false);

  // Use debounce hook for search term
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

  // Fetch movies and genres
  const { movies: latestMovies, loading: latestLoading } = useMovies("latest");
  const { genres } = useMovies();

  // Memoize genre name selection to prevent unnecessary re-renders
  const selectedGenreName = useMemo(() => {
    return (
      genres.find((genre) => genre.id === selectedGenre)?.name || "Selected"
    );
  }, [selectedGenre, genres]);

  const { movies: resultsMovies, loading: resultsLoading } = useMovies(
    selectedGenre ? "genre" : debouncedSearchTerm ? "search" : "popular",
    selectedGenre,
    debouncedSearchTerm
  );

  // Fetch popular and trending movies
  const { movies: popularMovies, loading: popularLoading } =
    useMovies("popular");
  const { movies: trendingMovies, loading: trendingLoading } =
    useMovies("trending");

  // Memoize results title and loading state
  const { resultsToShow, resultsTitle, isLoading } = useMemo(() => {
    if (selectedGenre) {
      return {
        resultsToShow: resultsMovies,
        resultsTitle: `${selectedGenreName} Movies`,
        isLoading: resultsLoading,
      };
    }

    if (debouncedSearchTerm) {
      return {
        resultsToShow: resultsMovies,
        resultsTitle: `Results for "${debouncedSearchTerm}"`,
        isLoading: resultsLoading,
      };
    }

    return {
      resultsToShow: popularMovies,
      resultsTitle: "Popular Movies",
      isLoading: popularLoading,
    };
  }, [
    selectedGenre,
    debouncedSearchTerm,
    resultsMovies,
    popularMovies,
    selectedGenreName,
    resultsLoading,
    popularLoading,
  ]);

  // Memoized search handler to prevent unnecessary re-renders
  const handleSearch = useCallback((term) => {
    setSelectedGenre(null);
    setSearchTerm(term);
    setShowResults(!!term);
  }, []);

  // Memoized genre selection handler
  const handleGenreSelect = useCallback((genreId) => {
    setSelectedGenre(genreId);
    setSearchTerm("");
    setShowResults(true);
  }, []);

  // Memoized close results handler
  const closeResults = useCallback(() => {
    setSearchTerm("");
    setSelectedGenre(null);
    setShowResults(false);
  }, []);

  return (
    <div className="netflix-home min-vh-100 bg-var-primary text-white">
      {/* Navbar */}
      <Navbar
        onSearch={handleSearch}
        onGenreSelect={handleGenreSelect}
        genres={genres}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        selectedGenre={selectedGenre}
      />

      <div className={`${showResults ? "blur-sm" : ""}`}>
        {/* Hero Banner */}
        <NetflixHeroBanner movies={latestMovies} loading={latestLoading} />

        {/* Movie Grid */}
        <div className="container-fluid px-4 mt-n5 position-relative">
          {!showResults && (
            <>
              <MovieCarousel
                title="Popular on Netflix"
                movies={popularMovies}
                loading={popularLoading}
              />

              <MovieCarousel
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
