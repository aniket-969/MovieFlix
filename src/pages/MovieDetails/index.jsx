import React, { useState, useCallback, memo } from "react";
import { useParams } from "react-router-dom";
import { useMovieDetails } from "../../hooks/useMovie";
import {
  Button,
  Container,
  Row,
  Col,
  Badge,
  Card,
  Alert,
} from "react-bootstrap";
import { addToFavorites } from "../../utils/addToWatchlist";
import { FaStar, FaHeart, FaRegHeart, FaCalendarAlt } from "react-icons/fa";
import "./MovieDetails.css";
import SpinnerComponent from "./../../components/UI/spinner";
import ErrorComponent from "./../../components/UI/errorComponent";

const MovieDetails = memo(() => {
  const { movieId } = useParams();
  const { movie, loading, error } = useMovieDetails(movieId);
  
  const [isFavorite, setIsFavorite] = useState(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    return favorites.includes(movieId);
  });

  const handleAddToFavorites = useCallback(() => {
    setIsFavorite(addToFavorites(movieId));
  }, [movieId]);

  // Memoized rendering of genres
  const renderGenres = useCallback(() => {
    if (!movie?.genres || movie.genres.length === 0) return null;
    
    return (
      <div className="genres mb-3">
        {movie.genres.map((genre) => (
          <Badge
            bg="secondary"
            key={genre.id}
            className="me-2 mb-2"
          >
            {genre.name}
          </Badge>
        ))}
      </div>
    );
  }, [movie?.genres]);

  // Memoized rendering of production companies
  const renderProductionCompanies = useCallback(() => {
    if (!movie?.production_companies || movie.production_companies.length === 0) return null;
    
    return (
      <div className="production mb-4">
        <h5>Production</h5>
        <p>
          {movie.production_companies
            .map((company) => company.name)
            .join(", ")}
        </p>
      </div>
    );
  }, [movie?.production_companies]);

  // Memoized rendering of poster
  const renderPoster = useCallback((isMobile = false) => {
    if (!movie?.poster_path) {
      return (
        <div className={`no-poster ${isMobile ? 'my-3' : ''}`}>
          <span>No poster available</span>
        </div>
      );
    }

    return isMobile ? (
      <div className="text-center p-3">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="img-fluid rounded"
          style={{ maxHeight: "500px" }}
        />
      </div>
    ) : (
      <div className="poster-wrapper">
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="movie-poster"
        />
      </div>
    );
  }, [movie?.poster_path, movie?.title]);

  // Rendering loading state
  if (loading) {
    return (
      <SpinnerComponent variant="primary" message="Loading movie details..." />
    );
  }

  // Rendering error state
  if (error) {
    return <ErrorComponent message={error} />;
  }

  // Rendering no movie found state
  if (!movie)
    return (
      <Container className="mt-5">
        <Alert variant="warning">
          <Alert.Heading>Movie Not Found</Alert.Heading>
          <p>Sorry, we couldn't find the movie you're looking for.</p>
        </Alert>
      </Container>
    );

  return (
    <Container fluid className="movie-details-container py-4">
      <Row className="justify-content-center">
        <Col xl={10} lg={11} md={12}>
          <Card className="shadow">
            <Row className="g-0">
              {/* Desktop view - Side by side layout */}
              <Col lg={4} md={5} className="d-none d-md-block poster-container">
                {renderPoster()}
              </Col>

              {/* Mobile view - Image on top */}
              <Col xs={12} className="d-md-none">
                {renderPoster(true)}
              </Col>

              <Col lg={8} md={7} xs={12} className="details-container">
                <Card.Body className="p-4">
                  <Card.Title as="h1" className="movie-title">
                    {movie.title}
                    {movie.release_date && (
                      <small className="text-muted ms-2">
                        ({new Date(movie.release_date).getFullYear()})
                      </small>
                    )}
                  </Card.Title>

                  <div className="movie-meta mb-3">
                    {movie.vote_average > 0 && (
                      <div className="rating">
                        <FaStar className="text-warning" />
                        <span>{movie.vote_average.toFixed(1)}/10</span>
                      </div>
                    )}

                    {movie.release_date && (
                      <div className="release-date">
                        <FaCalendarAlt />
                        <span>
                          {new Date(movie.release_date).toLocaleDateString(
                            "en-US",
                            {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            }
                          )}
                        </span>
                      </div>
                    )}

                    {movie.runtime > 0 && (
                      <div className="runtime">
                        <span>
                          {Math.floor(movie.runtime / 60)}h {movie.runtime % 60}
                          m
                        </span>
                      </div>
                    )}
                  </div>

                  {renderGenres()}

                  <div className="overview mb-4">
                    <h4>Overview</h4>
                    <p>{movie.overview || "No overview available."}</p>
                  </div>

                  {renderProductionCompanies()}

                  <Button
                    variant={isFavorite ? "danger" : "primary"}
                    onClick={handleAddToFavorites}
                    className="favorite-btn"
                  >
                    {isFavorite ? <FaHeart /> : <FaRegHeart />}
                    <span className="ms-2">
                      {isFavorite
                        ? "Remove from Favorites"
                        : "Add to Favorites"}
                    </span>
                  </Button>
                </Card.Body>
              </Col>
            </Row>
          </Card>
        </Col>
      </Row>
    </Container>
  );
});

export default MovieDetails;