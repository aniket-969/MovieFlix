import { useState } from "react";
import { useMovies } from "../../hooks/useMovie";
import NetflixHeroBanner from "../../components/UI/heroBanner";
import ResultsOverlay from "../../components/UI/overlay";
import MovieGrid from "./../../components/UI/movieGrid";
import NetflixNavbar from "../../components/UI/navbar";


const Home = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [showResults, setShowResults] = useState(false);

  // Fetch latest movies for hero banner
  const { movies: latestMovies, loading: latestLoading } = useMovies("latest");
const {genres} = useMovies()
  // Fetch popular movies for first grid
  const { movies: popularMovies, loading: popularLoading } =
    useMovies("popular");

  // Fetch trending movies for second grid
  const { movies: trendingMovies, loading: trendingLoading } =
    useMovies("trending");

  // Search results
  const { movies: searchResults, loading: searchLoading } = useMovies(
    showResults && searchTerm ? "search" : "popular",
    null,
    showResults ? searchTerm : ""
  );

  const handleSearch = (term) => {
    setSearchTerm(term);
    setSelectedGenre(null);
    setShowResults(!!term);
  };

  const closeResults = () => {
    setShowResults(false);
  };

  // Determine which results to show and the title
  const resultsToShow = searchTerm ? searchResults : popularMovies;
  const resultsTitle = searchTerm ? `Results for "${searchTerm}"` : 
    (selectedGenre ? `${selectedGenre} Movies` : "Popular Movies");
  const isLoading = searchTerm ? searchLoading : popularLoading;

  return (
    <div className="netflix-home min-vh-100 bg-black text-white">
      {/* Add the Navbar component here, above the rest of the content */}
      <NetflixNavbar onSearch={handleSearch} genres={genres}/>
      
      {/* Main Content - apply blur effect when overlay is shown */}
      <div className={`${showResults ? "blur-sm" : ""}`}>
        {/* Hero Banner */}
        <NetflixHeroBanner movies={latestMovies} loading={latestLoading}  />

        {/* Content Section with padding */}
        <div className="container-fluid px-4 mt-n5 position-relative">
          {/* Popular Movies Grid */}
          <MovieGrid
            title="Popular on Netflix"
            movies={popularMovies}
            loading={popularLoading}
          />

          {/* Trending Movies Grid */}
          <MovieGrid
            title="Trending This Week"
            movies={trendingMovies}
            loading={trendingLoading}
          />
        </div>
      </div>

      {/* Results Overlay */}
      {showResults && (
        <ResultsOverlay
          title={resultsTitle}
          movies={resultsToShow}
          loading={isLoading}
          onClose={closeResults}
        />
      )}
    </div>
  );
};

export default Home;

