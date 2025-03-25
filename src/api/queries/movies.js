import axiosClient from "../axiosClient";

// Fetch Latest Movies (Hero Banner)
export const fetchLatestMovies = (page = 1) => {
    return axiosClient.get("/movie/now_playing", {
      params: { page },
    });
  };
  
  // Fetch popular movies
  export const fetchPopularMovies = (page = 1) => {
    return axiosClient.get("/movie/popular", {
      params: { page },
    });
  };
  
  // Fetch trending movies
  export const fetchTrendingMovies = (page = 1) => {
    return axiosClient.get("/trending/movie/week", {
      params: { page },
    });
  };
  
  // Fetch movie genres
  export const fetchMovieGenres = () => {
    return axiosClient.get("/genre/movie/list");
  };
  
  // Fetch movies by genre
  export const fetchMoviesByGenre = (genreId, page = 1) => {
    console.log(genreId)
    return axiosClient.get("/discover/movie", {
      params: {
        with_genres: genreId,
        page,
        sort_by: "popularity.desc",
      },
    });
  };
  
  // Search movies
  export const searchMovies = (query, page = 1) => {
    return axiosClient.get("/search/movie", {
      params: {
        query,
        page,
        include_adult: false,
      },
    });
  };
  
  // Fetch movie details
  export const fetchMovieDetails = (movieId) => {
    return axiosClient.get(`/movie/${movieId}`, {
      params: {
        append_to_response: "credits,videos,images",
      },
    });
  };
  