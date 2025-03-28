import React, { useState, useCallback } from "react";
import { Container, Row, Alert } from "react-bootstrap";
import { useMultipleMoviesDetails } from "../../hooks/useMovie";
import SpinnerComponent from "../../components/UI/spinner";
import ErrorComponent from "../../components/UI/errorComponent";
import FavoriteMovieCard from "../../components/UI/favMovieCard";// Import memoized card

const FavoritesPage = () => {
  const [favoriteIds, setFavoriteIds] = useState(() =>
    JSON.parse(localStorage.getItem("favorites") || "[]")
  );

  console.log("Favorite IDs in state:", favoriteIds); // Check state

  const { movies: fetchedMovies, loading, error } =
    useMultipleMoviesDetails(favoriteIds);

  const removeFromFavorites = useCallback((movieId) => {
    console.log(`Removing movie ID: ${movieId}`); // Check if function is triggered

    setFavoriteIds((prevFavorites) => {
      const updatedFavorites = prevFavorites.filter((id) => id != movieId);
      console.log("Updated favorite IDs:", updatedFavorites); // Check if state is updated

      localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
      return updatedFavorites;
    });
  }, []);

  return (
    <Container fluid className="favorites-page p-4 bg-var-primary">
      <h1 className="text-center mb-4 text-var-primary">My Favorites</h1>

      {loading && <SpinnerComponent />}
      {error && <ErrorComponent message={error} />}

      {favoriteIds.length === 0 && !loading && (
        <Alert variant="info" className="text-center">
          You have no favorite movies yet.
        </Alert>
      )}

      <Row xs={1} md={2} lg={4} className="g-4 justify-content-center">
        {fetchedMovies.map((movie) => (
          <FavoriteMovieCard
            key={movie.id}
            movie={movie}
            removeFromFavorites={removeFromFavorites}
          />
        ))}
      </Row>
    </Container>
  );
};

export default FavoritesPage;
