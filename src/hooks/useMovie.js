import { useState, useEffect } from "react";
import { fetchMovies, fetchMovieDetails } from "../api/movies";

export const useMovies = (searchTerm = "Avengers", page = 1) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cacheKey = `movies-${searchTerm}-${page}`;
    const cachedData = sessionStorage.getItem(cacheKey);

    if (cachedData) {
      setMovies(JSON.parse(cachedData));
      return;
    }

    setLoading(true);
    fetchMovies(searchTerm, page)
      .then((data) => {
        if (data.Response === "True") {
          setMovies(data.Search);
          sessionStorage.setItem(cacheKey, JSON.stringify(data.Search)); 
        } else {
          setError(data.Error);
        }
      })
      .catch(() => setError("Failed to fetch movies."))
      .finally(() => setLoading(false));
  }, [searchTerm, page]);

  return { movies, loading, error };
};
