import { useState, useEffect } from "react";
import {
  fetchMovies,
  fetchMovieDetails,
  fetchLatestMovies,
} from "../api/queries/movies.js";

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
      setError(null);

      try {
        const response = await fetchMovies(searchTerm, page);
        console.log(response); // Debugging output

        if (response.data.Response === "True") {
          setMovies(response.data.Search);
          sessionStorage.setItem(
            cacheKey,
            JSON.stringify(response.data.Search)
          );
        } else {
          setMovies([]); // Reset movies when no results
          setError(response.data.Error);
        }
      } catch (err) {
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
      setError(null);
      try {
        const data = await fetchMovieDetails(movieId);
        if (data.Response === "True") {
          setMovie(data);
          sessionStorage.setItem(cacheKey, JSON.stringify(data));
        } else {
          setError(data.Error || "Failed to fetch movie details.");
        }
      } catch (error) {
        setError("Failed to fetch movie details.");
      } finally {
        setLoading(false);
      }
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
      setError(null);
      try {
        const data = await fetchLatestMovies();
        console.log(data)
        if (data.Response === "True" && data.Search) {
          setMovies(data.Search);
          sessionStorage.setItem(cacheKey, JSON.stringify(data.Search));
        } else {
          setError(data.Error || "No latest movies found.");
          setMovies([]); 
        }
      } catch {
        setError("Failed to fetch latest movies.");
        setMovies([]);
      } finally {
        setLoading(false);
      }
    };

    fetchLatest();
  }, []);

  return { movies, loading, error };
};

export const useMovieFilter = () => {
  const GENRES = ["Action", "Comedy", "Drama", "Horror", "Sci-Fi"];
  const [genre, setGenre] = useState("Action");
  const [searchTerm, setSearchTerm] = useState(genre);
  const [page, setPage] = useState(1);

  const { movies, loading, error } = useMovies(searchTerm, page);

  const updateGenre = (newGenre) => {
    setGenre(newGenre);
    setSearchTerm(newGenre);
    setPage(1);
  };

  return { genre, updateGenre, movies, loading, error, GENRES, page, setPage };
};
