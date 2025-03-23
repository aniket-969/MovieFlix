import axiosClient from "../axiosClient";

export const fetchMovies = async (searchTerm, page = 1) => {
  return axiosClient.get("/", {
    params: { s: searchTerm, page: page },
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

export const fetchLatestMovies = async (query = "2025", page = 1) => {
  const response = await axiosClient.get("", {
    params: { s: query, y: 2025, type: "movie", page },
  });
  return response.data;
};
