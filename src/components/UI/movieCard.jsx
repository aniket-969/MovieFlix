import React, { useState, useEffect, useRef, useMemo } from "react";
import { Link } from "react-router-dom";

const MovieCard = React.memo(
  ({ movie, onMouseEnter, onMouseLeave, isHovered, index }) => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [imageSrc, setImageSrc] = useState(null);
    const imageRef = useRef(null);

    // Memoize image URL to prevent unnecessary recreations
    const imageUrl = useMemo(
      () =>
        movie.poster_path
          ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
          : null,
      [movie.poster_path]
    );

    useEffect(() => {
      const currentImageRef = imageRef.current;

      const handleIntersection = (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && imageUrl) {
            const img = new Image();
            img.src = imageUrl;
            img.onload = () => {
              setImageSrc(img.src);
              setIsLoaded(true);
            };
            img.onerror = () => {
              setIsLoaded(false);
            };
          }
        });
      };

      const observer = new IntersectionObserver(handleIntersection, {
        root: null,
        rootMargin: "0px",
        threshold: 0.1,
      });

      if (currentImageRef) {
        observer.observe(currentImageRef);
      }

      return () => {
        if (currentImageRef) {
          observer.unobserve(currentImageRef);
        }
      };
    }, [imageUrl]);

    // Memoize styles to prevent unnecessary rerenders
    const cardImageStyle = useMemo(
      () => ({
        aspectRatio: "2/3",
        objectFit: "cover",
        transition: "transform 0.3s ease-in-out",
        transform: isHovered ? "scale(1.05)" : "scale(1)",
      }),
      [isHovered]
    );

    const hoverOverlayStyle = useMemo(
      () => ({
        background:
          "linear-gradient(0deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)",
        opacity: isHovered ? 1 : 0,
        transition: "opacity 0.3s ease",
      }),
      [isHovered]
    );

    const permanentBadgeStyle = useMemo(
      () => ({
        opacity: isHovered ? 0 : 1,
        transition: "opacity 0.3s ease",
      }),
      [isHovered]
    );

    // Memoize formatted movie details
    const formattedMovieDetails = useMemo(
      () => ({
        rating: movie.vote_average?.toFixed(1) || "N/A",
        year: movie.release_date?.substring(0, 4) || "N/A",
        ageRating: movie.adult ? "18+" : "PG",
      }),
      [movie]
    );

    return (
      <div
        ref={imageRef}
        data-movie-id={movie.id}
        className="movie-card-container"
        onMouseEnter={onMouseEnter}
        onMouseLeave={onMouseLeave}
      >
        <Link to={`/movie/${movie.id}`} className="text-decoration-none">
          <div className="card bg-dark border-0 netflix-card h-100">
            <div className="position-relative overflow-hidden rounded">
              {isLoaded && imageUrl ? (
                <img
                  src={imageSrc}
                  alt={movie.title}
                  className="card-img-top w-100"
                  loading="lazy"
                  style={cardImageStyle}
                />
              ) : (
                <div
                  className="card-img-top bg-secondary d-flex align-items-center justify-content-center"
                  style={{ aspectRatio: "2/3" }}
                >
                  <span className="text-white">
                    {imageUrl ? "Loading..." : "No Image"}
                  </span>
                </div>
              )}

              {/* Hover info overlay */}
              <div
                className="position-absolute bottom-0 start-0 w-100 p-2"
                style={hoverOverlayStyle}
              >
                <h6 className="text-white mb-1 text-truncate">{movie.title}</h6>
                <div className="d-flex justify-content-between align-items-center">
                  <span className="badge bg-danger me-1">
                    {formattedMovieDetails.ageRating}
                  </span>
                  <span className="badge bg-secondary">
                    <i className="bi bi-star-fill me-1 text-warning"></i>
                    {formattedMovieDetails.rating}
                  </span>
                  <small className="text-light">
                    {formattedMovieDetails.year}
                  </small>
                </div>
              </div>

              {/* Permanent bottom rating badge */}
              <div
                className="position-absolute bottom-0 end-0 m-2"
                style={permanentBadgeStyle}
              >
                <span className="badge bg-dark bg-opacity-75 text-warning">
                  <i className="bi bi-star-fill me-1"></i>
                  {formattedMovieDetails.rating}
                </span>
              </div>
            </div>
          </div>
        </Link>
      </div>
    );
  }
);

export default MovieCard;
