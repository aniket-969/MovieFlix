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
import { Link } from "react-router-dom";
import SpinnerComponent from "./../../components/UI/spinner";
import ErrorComponent from "./../../components/UI/errorComponent";

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
    <Container fluid className="favorites-page p-4 bg-var-primary ">
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
          <Col key={movie.id}>
            <Card className="h-100 fav-movie-card">
              {/* Wrap only the image inside the Link */}
              <Link to={`/movie/${movie.id}`}>
                <Card.Img
                  variant="top"
                  src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                  alt={movie.title}
                  className="card-img-top"
                />
              </Link>

              <Card.Body>
                {/* Wrap only the title inside the Link */}
                <Link
                  to={`/movie/${movie.id}`}
                  className="text-decoration-none"
                >
                  <Card.Title className="text-var-primary">
                    {movie.title}
                  </Card.Title>
                </Link>

                <Card.Text className="text-muted">
                  Rating: {movie.vote_average.toFixed(1)}
                </Card.Text>

                {/* Remove from Favorites button (outside the Link) */}
                <Button
                  variant="danger"
                  className="w-100"
                  onClick={(e) => {
                    e.preventDefault(); // Prevent Link navigation
                    removeFromFavorites(movie.id);
                  }}
                >
                  Remove from Favorites
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default FavoritesPage;