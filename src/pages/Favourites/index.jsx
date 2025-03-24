import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Card,
  Spinner,
  Alert,
  Button,
} from "react-bootstrap";
import { useMultipleMoviesDetails } from "../../hooks/useMovie";
import "./favourites.css";
import {Link} from "react-router-dom"

const FavoritesPage = () => {
  const [favoriteIds, setFavoriteIds] = useState(() =>
    JSON.parse(localStorage.getItem("favorites") || "[]")
  );

  const {
    movies: fetchedMovies,
    loading,
    error,
  } = useMultipleMoviesDetails(favoriteIds);

  const removeFromFavorites = (movieId) => {
    const updatedFavorites = favoriteIds.filter((id) => id != movieId);
    setFavoriteIds(updatedFavorites);
    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
  };

  return (
    <Container fluid className="favorites-page p-4">
      <h1 className="text-center mb-4 text-dark">My Favorites</h1>

      {loading && (
        <div className="text-center">
          <Spinner animation="border" />
        </div>
      )}

      {error && <Alert variant="danger">{error}</Alert>}

      {favoriteIds.length === 0 && !loading && (
        <Alert variant="info" className="text-center">
          You have no favorite movies yet.
        </Alert>
      )}

      <Row xs={1} md={2} lg={4} className="g-4 justify-content-center">
        {fetchedMovies.map((movie) => (
          <Link key={movie.id} to={`/movie/${movie.id}`}>
            <Col>
              <Card className="h-100 movie-card">
                <Card.Img
                  variant="top"
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="card-img-top"
                />
                <Card.Body>
                  <Card.Title>{movie.title}</Card.Title>
                  <Card.Text className="text-muted">
                    Rating: {movie.vote_average.toFixed(1)}
                  </Card.Text>
                  <Button
                    variant="danger"
                    className="w-100"
                    onClick={() => removeFromFavorites(movie.id)}
                  >
                    Remove from Favorites
                  </Button>
                </Card.Body>
              </Card>
            </Col>{" "}
          </Link>
        ))}
      </Row>
    </Container>
  );
};

export default FavoritesPage;
