import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import SpinnerComponent from "./spinner";

const LazyImage = ({ movie, hoverIndex, index }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const imgRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.unobserve(entry.target);
        }
      },
      {
        root: null, // viewport
        rootMargin: "100px",
        threshold: 0,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => {
      if (imgRef.current) {
        observer.unobserve(imgRef.current);
      }
    };
  }, []);

  if (!movie.poster_path) {
    return (
      <div
        ref={imgRef}
        className="card-img-top bg-secondary d-flex align-items-center justify-content-center"
        style={{ aspectRatio: "2/3" }}
      >
        <span className="text-white">No Image</span>
      </div>
    );
  }

  return (
    <div ref={imgRef} className="position-relative overflow-hidden rounded">
      {isInView && (
        <img
          src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
          alt={movie.title}
          className="card-img-top"
          onLoad={() => setIsLoaded(true)}
          style={{
            aspectRatio: "2/3",
            objectFit: "cover",
            transition: "transform 0.3s ease-in-out",
            transform: hoverIndex === index ? "scale(1.05)" : "scale(1)",
            opacity: isLoaded ? 1 : 0,
          }}
        />
      )}
      {!isLoaded && isInView && (
        <div
          className="position-absolute top-0 start-0 w-100 h-100 bg-dark d-flex align-items-center justify-content-center"
          style={{ zIndex: 10 }}
        >
          <div className="spinner-border text-light" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      )}
    </div>
  );
};

const ResultsOverlay = ({ title, movies, loading, onClose }) => {
  const [hoverIndex, setHoverIndex] = useState(-1);
  // console.log(title)

  return (
    <div
      className="position-fixed top-0 start-0 w-100 h-100 bg-var-primary text-var-primary bg-opacity-90 overflow-auto"
      style={{ zIndex: 1050 }}
    >
      <div className="container py-5">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2 className="mb-0 fs-3">{title}</h2>
          <button
            className="btn btn-sm text-var-primary"
            onClick={onClose}
            aria-label="Close results"
            style={{ fontSize: "1.5rem" }}
          >
            <i className="bi bi-x-lg"></i>
          </button>
        </div>

        {loading ? (
          <SpinnerComponent />
        ) : movies.length === 0 ? (
          <div className="text-center py-5">
            <p className="fs-5 text-muted">
              No results found. Try a different search or genre.
            </p>
            <button onClick={onClose} className="btn btn-outline-light mt-3">
              Back to Browse
            </button>
          </div>
        ) : (
          <div className="row row-cols-2 row-cols-sm-3 row-cols-md-4 row-cols-lg-5 g-4">
            {movies.map((movie, index) => (
              <div
                key={movie.id}
                className="col"
                onMouseEnter={() => setHoverIndex(index)}
                onMouseLeave={() => setHoverIndex(-1)}
              >
                <Link
                  to={`/movie/${movie.id}`}
                  className="text-decoration-none"
                  onClick={onClose}
                >
                  <div className="card bg-dark border-0 h-100 netflix-card">
                    <LazyImage
                      movie={movie}
                      hoverIndex={hoverIndex}
                      index={index}
                    />

                    {/* Hover info overlay */}
                    <div
                      className="position-absolute bottom-0 start-0 w-100 p-2"
                      style={{
                        background:
                          "linear-gradient(0deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)",
                        opacity: hoverIndex === index ? 1 : 0,
                        transition: "opacity 0.3s ease",
                      }}
                    >
                      <h6 className="text-white mb-1 text-truncate">
                        {movie.title}
                      </h6>
                      <div className="d-flex justify-content-between align-items-center">
                        <span className="badge bg-danger me-1">
                          {movie.adult ? "18+" : "PG"}
                        </span>
                        <span className="badge bg-secondary">
                          <i className="bi bi-star-fill me-1 text-warning"></i>
                          {movie.vote_average?.toFixed(1)}
                        </span>
                        <small className="text-light">
                          {movie.release_date?.substring(0, 4) || "N/A"}
                        </small>
                      </div>
                    </div>

                    {/* Title below the image */}
                    <div
                      className="card-body px-1 py-2"
                      style={{
                        opacity: hoverIndex === index ? 0 : 1,
                        transition: "opacity 0.3s ease",
                      }}
                    >
                      <h6 className="card-title text-white text-truncate mb-0">
                        {movie.title}
                      </h6>
                      <div className="d-flex justify-content-between align-items-center">
                        <small className="text-muted">
                          {movie.release_date?.substring(0, 4) || "N/A"}
                        </small>
                        <span className="badge bg-dark text-warning">
                          <i className="bi bi-star-fill me-1"></i>
                          {movie.vote_average?.toFixed(1)}
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default ResultsOverlay;
