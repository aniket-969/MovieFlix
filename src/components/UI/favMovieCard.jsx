import React from "react";
import { Card, Button, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const FavoriteMovieCard = ({ movie, removeFromFavorites }) => {
  return (
    <Col key={movie.id}>
      <Card className="h-100 fav-movie-card">
        <Link to={`/movie/${movie.id}`}>
          <Card.Img
            variant="top"
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            className="card-img-top"
          />
        </Link>
        <Card.Body>
          <Link to={`/movie/${movie.id}`} className="text-decoration-none">
            <Card.Title className="text-var-primary">{movie.title}</Card.Title>
          </Link>
          <Card.Text className="text-muted">
            Rating: {movie.vote_average.toFixed(1)}
          </Card.Text>
          <Button
            variant="danger"
            className="w-100"
            onClick={(e) => {
              e.preventDefault(); // Prevents navigation
              e.stopPropagation(); // Prevents bubbling up to the Link
              console.log(`Clicked remove for movie ID: ${movie.id}`); // Check if button is clicked
              removeFromFavorites(movie.id);
            }}
          >
            Remove from Favorites
          </Button>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default FavoriteMovieCard;
