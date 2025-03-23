import React, { useEffect } from "react";
import { useMovies,useMovieDetails,useLatestMovies,useMovieFilter} from "../../hooks/useMovie" ;

const Home = () => {
  // Fetch movies (default search: "Avengers", page 1)
  // const { movies, loading: moviesLoading, error: moviesError } = useMovies();

  // Fetch movie details (Example: "The Shawshank Redemption" ID)
  // const movieId = "tt0111161";
  // const { movie, loading: movieLoading, error: movieError } = useMovieDetails(movieId);

  // // Fetch latest movies
  const { movies: latestMovies, loading: latestLoading, error: latestError } = useLatestMovies();

  // // Genre filter
  // const { genre, updateGenre, movies: filteredMovies, GENRES } = useMovieFilter();

  // Logging data
  useEffect(() => {
    // console.log("🎬 Movies:", movies);
    // console.log("🎞️ Movie Details:", movie);
    console.log("🔥 Latest Movies:", latestMovies);
    // console.log("🎭 Filtered Movies:", filteredMovies);
  }, [latestMovies]);

  return (
    <div>
      <h1>Home</h1>

      {/* Genre Filter Dropdown */}
      {/* <h2>Movie Filter</h2>
      <select onChange={(e) => updateGenre(e.target.value)} value={genre}>
        {GENRES.map((g) => (
          <option key={g} value={g}>
            {g}
          </option>
        ))}
      </select> */}

      {/* Display Filtered Movies */}
      {/* <h2>Filtered Movies</h2>
      {filteredMovies.length > 0 ? (
        filteredMovies.map((movie) => <p key={movie.imdbID}>{movie.Title}</p>)
      ) : (
        <p>No movies found for {genre}</p>
      )} */}

      {/* API Loading and Error Handling */}
      {/* {moviesLoading && <p>Loading movies...</p>}
      {moviesError && <p>Error fetching movies: {moviesError}</p>} */}

      {/* {movieLoading && <p>Loading movie details...</p>}
      {movieError && <p>Error fetching movie details: {movieError}</p>}

      {latestLoading && <p>Loading latest movies...</p>}
      {latestError && <p>Error fetching latest movies: {latestError}</p>} */}
    </div>
  );
};

export default Home;
