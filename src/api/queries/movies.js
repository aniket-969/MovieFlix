import axiosClient from "../axiosClient";

export const fetchMoviesBySearch = async (searchTerm, page = 1) => {
    return axiosClient.get(`&s=${searchTerm}&page=${page}`);
  };

  export const fetchMovieDetails = async (imdbID) => {
    return axiosClient.get(`&i=${imdbID}&plot=full`);
  };
  
  export const searchMovies = async (query, page = 1) => {
    return axiosClient.get(`&s=${query}&page=${page}`);
  };
  
  export const fetchMoviesByGenre = async (genre) => {
    return axiosClient.get(`&s=${genre}`);
  };
  