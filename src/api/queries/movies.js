import axiosClient from "../axiosClient";

export const fetchMovies = async (searchTerm, page = 1) => { 
    return axiosClient.get("/", {
      params: { s: searchTerm, page: page }
    });
  };
  
  export const fetchMovieDetails = async (imdbID) => {
    const response = await axiosClient.get("", {
      params: { i: imdbID, plot: "full" }, // ✅ Correct way to append params
    });
    return response.data;
  };
  
  export const searchMovies = async (query, page = 1) => {
    const response = await axiosClient.get("", {
      params: { s: query, page },
    });
    return response.data;
  };
  
  export const fetchLatestMovies = async () => {
    const response = await axiosClient.get("", {
      params: { s: "*", y: 2024, type: "movie" }, 
    });
    return response.data;
  };
  
