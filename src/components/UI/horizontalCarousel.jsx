import { useState, useRef } from "react";
import { Link } from "react-router-dom";

const MovieCarousel = ({ title, movies, loading }) => {
  const carouselRef = useRef(null);
  const [scrollPosition, setScrollPosition] = useState(0);
  console.log(title, movies);
  const scrollLeft = () => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.clientWidth * 0.75;
      carouselRef.current.scrollBy({
        left: -scrollAmount,
        behavior: "smooth",
      });
      setScrollPosition(Math.max(0, scrollPosition - scrollAmount));
    }
  };

  const scrollRight = () => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.clientWidth * 0.75;
      carouselRef.current.scrollBy({
        left: scrollAmount,
        behavior: "smooth",
      });
      setScrollPosition(scrollPosition + scrollAmount);
    }
  };

  if (loading) {
    return (
      <div className="text-center py-5">
        <div className="spinner-border text-danger" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="text-center py-5">
        <p className="fs-5">No movies available</p>
      </div>
    );
  }

  return (
    <div className="movie-carousel position-relative">
      <div className="d-flex justify-content-between align-items-center mb-3">
        {/* arrows */}
        <h2 className="fs-4 fw-bold">{title}</h2>
        <div className="carousel-arrows d-none d-md-block">
          <button
            className="btn btn-outline-light btn-sm me-2"
            onClick={scrollLeft}
            disabled={scrollPosition <= 0}
          >
            <i className="bi bi-chevron-left"></i>
          </button>
          <button
            className="btn btn-outline-light btn-sm"
            onClick={scrollRight}
          >
            <i className="bi bi-chevron-right"></i>
          </button>
        </div>
      </div>

      <div
        className="carousel-container overflow-auto pb-2"
        ref={carouselRef}
        style={{
          scrollbarWidth: "none",
          msOverflowStyle: "none",
          "&::-webkit-scrollbar": { display: "none" },
        }}
      >
        <div className="d-flex gap-3" style={{ minWidth: "max-content" }}>
          {movies.map((movie) => (
            <div
              key={movie.id}
              className="carousel-item"
              style={{ width: "180px", transition: "transform 0.2s" }}
            >
              <Link
                to={`/movie/${movie.id}`}
                className="text-decoration-none"
                style={{
                  display: "block",
                  transform: "scale(1)",
                  transition: "transform 0.3s ease",
                  ":hover": { transform: "scale(1.05)" },
                }}
              >
                <div className="card bg-dark border-0">
                  <div className="position-relative">
                    {movie.poster_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        className="card-img-top rounded"
                        style={{ height: "270px", objectFit: "cover" }}
                      />
                    ) : (
                      <div
                        className="card-img-top bg-secondary rounded d-flex align-items-center justify-content-center"
                        style={{ height: "270px" }}
                      >
                        <span className="text-white">No Image</span>
                      </div>
                    )}
                    <div className="position-absolute top-0 end-0 m-2 badge bg-warning text-dark">
                      {movie.vote_average.toFixed(1)}
                    </div>
                  </div>
                  <div className="card-body px-0 py-2">
                    <h5
                      className="card-title text-white mb-0 text-truncate"
                      style={{ fontSize: "0.9rem" }}
                    >
                      {movie.title}
                    </h5>
                    <p className="card-text text-secondary small">
                      {movie.release_date?.substring(0, 4) || "N/A"}
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      {/* Mobile scroll arrows */}
      <div className="d-md-none d-flex justify-content-center mt-3">
        <button
          className="btn btn-outline-light btn-sm me-2"
          onClick={scrollLeft}
          disabled={scrollPosition <= 0}
        >
          <i className="bi bi-chevron-left"></i>
        </button>
        <button className="btn btn-outline-light btn-sm" onClick={scrollRight}>
          <i className="bi bi-chevron-right"></i>
        </button>
      </div>
    </div>
  );
};

export default MovieCarousel;
