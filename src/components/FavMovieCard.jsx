import React from "react";
import { Card, Button, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const FavMovieCard = React.memo(({ movie, removeFromFavorites }) => {
  const handleRemoveClick = (e) => {
    console.log("Remove button clicked for movie:", movie.id);
    removeFromFavorites(movie.id);
  };

  return (
    <Link to={`/movie/${movie.id}`} className="fav-movie-link">
      <Col>
        <Card className="h-100 fav-movie-card">
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
              onClick={handleRemoveClick}
            >
              Remove from Favorites
            </Button>
          </Card.Body>
        </Card>
      </Col>
    </Link>
  );
});

export default FavMovieCard;