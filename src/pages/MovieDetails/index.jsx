import { useParams } from "react-router-dom";
import { useState } from "react";
import { useMovieDetails } from "../../hooks/useMovie";
import {
  Button,
  Spinner,
  Alert,
  Container,
  Row,
  Col,
  Badge,
  Card,
} from "react-bootstrap";
import { addToFavorites } from "../../utils/addToWatchlist";
import { FaStar, FaHeart, FaRegHeart, FaCalendarAlt } from "react-icons/fa";
import "./MovieDetails.css";

const MovieDetails = () => {
  const { movieId } = useParams();
  const { movie, loading, error } = useMovieDetails(movieId);
  const [isFavorite, setIsFavorite] = useState(() => {
    const favorites = JSON.parse(localStorage.getItem("favorites")) || [];
    return favorites.includes(movieId);
  });

  const handleAddToFavorites = () => {
    setIsFavorite(addToFavorites(movieId));
  };

  if (loading)
    return (
      <div className="loading-container">
        <Spinner animation="border" variant="primary" />
        <p>Loading movie details...</p>
      </div>
    );

  if (error)
    return (
      <Container className="mt-5">
        <Alert variant="danger">
          <Alert.Heading>Error</Alert.Heading>
          <p>{error}</p>
        </Alert>
      </Container>
    );

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
          <Card className=" shadow">
            <Row className="g-0">
              {/* Desktop view - Side by side layout */}
              <Col lg={4} md={5} className="d-none d-md-block poster-container">
                {movie.poster_path ? (
                  <div className="poster-wrapper">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      className="movie-poster"
                    />
                  </div>
                ) : (
                  <div className="no-poster">
                    <span>No poster available</span>
                  </div>
                )}
              </Col>

              {/* Mobile view - Image on top */}
              <Col xs={12} className="d-md-none">
                {movie.poster_path ? (
                  <div className="text-center p-3">
                    <img
                      src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                      alt={movie.title}
                      className="img-fluid rounded"
                      style={{ maxHeight: "500px" }}
                    />
                  </div>
                ) : (
                  <div className="no-poster my-3">
                    <span>No poster available</span>
                  </div>
                )}
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

                  {movie.genres && movie.genres.length > 0 && (
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
                  )}

                  <div className="overview mb-4">
                    <h4>Overview</h4>
                    <p>{movie.overview || "No overview available."}</p>
                  </div>

                  {movie.production_companies &&
                    movie.production_companies.length > 0 && (
                      <div className="production mb-4">
                        <h5>Production</h5>
                        <p>
                          {movie.production_companies
                            .map((company) => company.name)
                            .join(", ")}
                        </p>
                      </div>
                    )}

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
};

export default MovieDetails;
