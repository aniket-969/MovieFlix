import { useState, useEffect } from "react";
import {
  fetchMovies,
  fetchMovieDetails,
  fetchLatestMovies,
} from "../api/movies";

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

    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await fetchMovies(searchTerm, page);
        if (data.Response === "True") {
          setMovies(data.Search);
          sessionStorage.setItem(cacheKey, JSON.stringify(data.Search));
        } else {
          setError(data.Error);
        }
      } catch {
        setError("Failed to fetch movies.");
      }
      setLoading(false);
    };

    fetchData();
  }, [searchTerm, page]);

  return { movies, loading, error };
};

export const useMovieDetails = (movieId) => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!movieId) return;

    const cacheKey = `movie-${movieId}`;
    const cachedData = sessionStorage.getItem(cacheKey);

    if (cachedData) {
      setMovie(JSON.parse(cachedData));
      return;
    }

    const getMovieDetails = async () => {
      setLoading(true);
      try {
        const data = await fetchMovieDetails(movieId);
        if (data.Response === "True") {
          setMovie(data);
          sessionStorage.setItem(cacheKey, JSON.stringify(data));
        } else {
          setError(data.Error);
        }
      } catch {
        setError("Failed to fetch movie details.");
      }
      setLoading(false);
    };

    getMovieDetails();
  }, [movieId]);

  return { movie, loading, error };
};

export const useLatestMovies = () => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cacheKey = "latestMovies";
    const cachedData = sessionStorage.getItem(cacheKey);

    if (cachedData) {
      setMovies(JSON.parse(cachedData));
      setLoading(false);
      return;
    }

    const fetchLatest = async () => {
      setLoading(true);
      try {
        const data = await fetchLatestMovies();
        if (data.Search) {
          setMovies(data.Search);
          sessionStorage.setItem(cacheKey, JSON.stringify(data.Search));
        }
      } catch {
        setError("Failed to fetch latest movies.");
      }
      setLoading(false);
    };

    fetchLatest();
  }, []);

  return { movies, loading, error };
};
