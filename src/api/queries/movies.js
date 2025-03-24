import axiosClient from "./axiosClient";

// Fetch Latest Movies (Hero Banner)
export const fetchLatestMovies = async (page = 1) => {
  return axiosClient.get("/movie/now_playing", {
    params: { page },
  });
};

// Fetch Popular Movies (Movie Grid)
export const fetchPopularMovies = async (page = 1) => {
  return axiosClient.get("/movie/popular", {
    params: { page },
  });
};

// Fetch Movie Details by ID
export const fetchMovieDetails = async (movieId) => {
  return axiosClient.get(`/movie/${movieId}`);
};

// Fetch Movie Genres
export const fetchMovieGenres = async () => {
  return axiosClient.get("/genre/movie/list");
};

// Fetch Movies by Genre
export const fetchMoviesByGenre = async (genreId, page = 1) => {
  return axiosClient.get("/discover/movie", {
    params: { with_genres: genreId, page },
  });
};

// Search Movies by Title
export const searchMovies = async (searchTerm, page = 1) => {
  return axiosClient.get("/search/movie", {
    params: { query: searchTerm, page },
  });
};

// Fetch Top-Rated Movies (Optional)
export const fetchTopRatedMovies = async (page = 1) => {
  return axiosClient.get("/movie/top_rated", {
    params: { page },
  });
};

// Fetch Similar Movies (Optional)
export const fetchSimilarMovies = async (movieId, page = 1) => {
  return axiosClient.get(`/movie/${movieId}/similar`, {
    params: { page },
  });
};

// Fetch Movie Videos (For Trailers)
export const fetchMovieVideos = async (movieId) => {
  return axiosClient.get(`/movie/${movieId}/videos`);
};
