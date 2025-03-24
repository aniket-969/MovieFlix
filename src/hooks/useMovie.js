import { useState, useEffect } from "react";
import {
  fetchLatestMovies,
  fetchPopularMovies,
  fetchMovieGenres,
  fetchMoviesByGenre,
  searchMovies,
} from "../api/queries/movies.js";

const useMovies = (type = "popular", genreId = null, searchTerm = "") => {
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

      // session storage check
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
          response = await searchMovies(searchTerm, page);
        } else if (genreId) {
          response = await fetchMoviesByGenre(genreId, page);
        } else {
          switch (type) {
            case "latest":
              response = await fetchLatestMovies(page);
              break;
            case "popular":
              response = await fetchPopularMovies(page);
              break;
            default:
              response = await fetchPopularMovies(page);
          }
        }

        setMovies((prevMovies) => [...prevMovies, ...response.data.results]);
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

    fetchMovies();
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

  //  loading more pages
  const loadMore = () => {
    if (page < totalPages) {
      setPage((prevPage) => prevPage + 1);
    }
  };

  return { movies, loading, error, genres, page, totalPages, loadMore };
};

export default useMovies;
