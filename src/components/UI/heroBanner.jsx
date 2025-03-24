import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const HeroBanner = ({ movies, loading }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  
  // Auto-rotate carousel
  useEffect(() => {
    if (movies.length === 0) return;
    
    const interval = setInterval(() => {
      setActiveIndex((current) => (current + 1) % movies.length);
    }, 8000); // Change slide every 8 seconds
    
    return () => clearInterval(interval);
  }, [movies.length]);

  if (loading || movies.length === 0) {
    return (
      <div className="vh-75 d-flex justify-content-center align-items-center bg-dark">
        {loading ? (
          <div className="spinner-border text-danger" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        ) : (
          <p className="fs-4">No movies available</p>
        )}
      </div>
    );
  }

  const displayedMovies = movies.slice(0, 5); // Limit to 5 movies for the carousel

  return (
    <div id="heroCarousel" className="carousel slide" data-bs-ride="carousel">
      <div className="carousel-indicators">
        {displayedMovies.map((_, index) => (
          <button
            key={index}
            type="button"
            data-bs-target="#heroCarousel"
            data-bs-slide-to={index}
            className={index === activeIndex ? "active" : ""}
            aria-current={index === activeIndex ? "true" : "false"}
            aria-label={`Slide ${index + 1}`}
            onClick={() => setActiveIndex(index)}
          ></button>
        ))}
      </div>
      
      <div className="carousel-inner">
        {displayedMovies.map((movie, index) => (
          <div 
            key={movie.id}
            className={`carousel-item ${index === activeIndex ? "active" : ""}`}
          >
            <div 
              className="hero-banner"
              style={{
                height: "80vh",
                backgroundImage: `url(https://image.tmdb.org/t/p/original${movie.backdrop_path})`,
                backgroundSize: "cover",
                backgroundPosition: "center top",
                position: "relative",
              }}
            >
              <div
                className="overlay"
                style={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  background: "linear-gradient(to bottom, rgba(0,0,0,0.1) 0%, rgba(0,0,0,0.8) 100%)",
                }}
              ></div>
              
              <div
                className="container h-100 d-flex align-items-end pb-5"
                style={{ position: "relative", zIndex: 2 }}
              >
                <div className="row">
                  <div className="col-md-8 col-lg-6">
                    <h1 className="display-4 fw-bold">{movie.title}</h1>
                    <p className="lead mb-4">
                      {movie.overview.substring(0, 150)}
                      {movie.overview.length > 150 ? "..." : ""}
                    </p>
                    <div className="d-flex gap-2 mb-3">
                      <span className="badge bg-warning text-dark">
                        <i className="bi bi-star-fill me-1"></i>
                        {movie.vote_average.toFixed(1)}
                      </span>
                      <span className="badge bg-secondary">
                        {movie.release_date?.substring(0, 4)}
                      </span>
                    </div>
                    <Link
                      to={`/movie/${movie.id}`}
                      className="btn btn-danger btn-lg"
                    >
                      <i className="bi bi-play-fill me-2"></i>
                      Watch Details
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#heroCarousel"
        data-bs-slide="prev"
        onClick={() => setActiveIndex((activeIndex - 1 + displayedMovies.length) % displayedMovies.length)}
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#heroCarousel"
        data-bs-slide="next"
        onClick={() => setActiveIndex((activeIndex + 1) % displayedMovies.length)}
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};

export default HeroBanner;