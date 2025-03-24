import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useMovieDetails } from "../../hooks/useMovie"; 
import { Button, Spinner, Alert } from "react-bootstrap";
import { addToFavorites } from "../../utils/addToWatchlist";

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

    if (loading) return <Spinner animation="border" role="status" className="d-block mx-auto mt-5" />;
    if (error) return <Alert variant="danger" className="text-center">{error}</Alert>;

    return (
        <div className="container-fluid d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
            {movie ? (
                <div className="card p-3 shadow-lg w-75" style={{ maxWidth: "600px" }}>
                    <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title} className="img-fluid rounded mx-auto d-block" style={{ maxHeight: "300px", width: "auto" }} />
                    <h2 className="mt-3 text-center">{movie.title}</h2>
                    <p><strong>Genre:</strong> {movie.genres?.map(g => g.name).join(", ")}</p>
                    <p><strong>Release Date:</strong> {movie.release_date}</p>
                    <p><strong>Rating:</strong> {movie.vote_average} / 10</p>
                    <p>{movie.overview}</p>
                    <Button variant={isFavorite ? "danger" : "primary"} onClick={handleAddToFavorites} className="w-100">
                        {isFavorite ? "Added to Favorites" : "Add to Favorites"}
                    </Button>
                </div>
            ) : (
                <Alert variant="warning">Movie not found.</Alert>
            )}
        </div>
    );
};

export default MovieDetails;