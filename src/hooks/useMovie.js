import { useState, useEffect,useCallback } from "react";
import {
  fetchLatestMovies,
  fetchPopularMovies,
  fetchTrendingMovies,
  fetchMovieGenres,
  fetchMoviesByGenre,
  searchMovies,
} from "../api/queries/movies.js";
export const useMovies = (
  type = "popular",
  genreId = null,
  searchTerm = ""
) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [genres, setGenres] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const storageKey = `movies-${type}-${genreId || "all"}-${
    searchTerm || "all"
  }-page-${page}`;

  useEffect(() => {
    const fetchMovies = async () => {
      if (page > totalPages) return;

      // If new search/genre, reset state
      if (page === 1) setMovies([]);

      // Check session storage
      const cachedData = sessionStorage.getItem(storageKey);
      if (cachedData) {
        const { results, total_pages } = JSON.parse(cachedData);
        setMovies(results);
        setTotalPages(total_pages);
        return;
      }

      setLoading(true);
      setError(null);

      try {
        let response;
        if (searchTerm) {
          console.log("in search")
          response = await searchMovies(searchTerm, page);
        } else if (genreId) {
          console.log("in genre")
          response = await fetchMoviesByGenre(genreId, page);
          console.log(response)
        } else {
          switch (type) {
            case "latest":
              response = await fetchLatestMovies(page);
              break;
            case "popular":
              response = await fetchPopularMovies(page);
              break;
            case "trending":
              response = await fetchTrendingMovies(page);
              break;
            default:
              response = await fetchPopularMovies(page);
          }
        }

        setMovies((prevMovies) =>
          page === 1
            ? response.data.results
            : [...prevMovies, ...response.data.results]
        );
        setTotalPages(response.data.total_pages);

        // Store in session storage
        sessionStorage.setItem(
          storageKey,
          JSON.stringify({
            results: response.data.results,
            total_pages: response.data.total_pages,
          })
        );
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    //  fetch if search term is not empty or genre is selected
    if (
      (type === "search" && searchTerm.trim()) ||
      (type === "genre" && genreId) ||
      type !== "search"
    ) {
      fetchMovies();
    }
  }, [type, genreId, searchTerm, page]);

  useEffect(() => {
    const fetchGenres = async () => {
      try {
        const response = await fetchMovieGenres();
        setGenres(response.data.genres);
      } catch (err) {
        console.error("Error fetching genres:", err);
      }
    };

    fetchGenres();
  }, []);

  // Reset page when search term or genre changes
  useEffect(() => {
    setPage(1);
  }, [searchTerm, genreId]);

  // Load more pages
  const loadMore = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return { movies, loading, error, genres, page, totalPages, loadMore };
};

import { fetchMovieDetails } from "../api/queries/movies";

export const useMovieDetails = (movieId) => {
  const [movie, setMovie] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!movieId) return;

    const fetchDetails = async () => {
      setLoading(true);
      setError(null);

      try {
        const response = await fetchMovieDetails(movieId);
        setMovie(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [movieId]);

  return { movie, loading, error };
};

export const useMultipleMoviesDetails = (movieIds) => {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!movieIds.length) {
      setMovies([]);
      return;
    }

    const fetchMovies = async () => {
      setLoading(true);
      setError(null);

      try {
        const moviePromises = movieIds.map(async (id) => {
          try {
            const response = await fetchMovieDetails(id);
            return response.data;
          } catch (err) {
            console.error(`Failed to fetch movie ${id}:`, err);
            return null;
          }
        });

        const fetchedMovies = await Promise.all(moviePromises);
        setMovies(fetchedMovies.filter((movie) => movie !== null));
      } catch (err) {
        setError("Failed to fetch movie details");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [movieIds]); // Re-run when `movieIds` change

  return { movies, loading, error };
};
