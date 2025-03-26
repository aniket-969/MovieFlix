import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import SpinnerComponent from "./spinner";
import "../../styles/heroBanner.css";

const NetflixHeroBanner = ({ movies, loading }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const autoPlayRef = useRef(null);

  // Filter only movies with backdrop images
  const displayMovies = movies
    .filter((movie) => movie.backdrop_path)
    .slice(0, 5);

  // Auto-rotate carousel
  useEffect(() => {
    if (displayMovies.length === 0) return;

    const play = () => {
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveIndex((current) => (current + 1) % displayMovies.length);
        setTimeout(() => setIsTransitioning(false), 300);
      }, 300);
    };

    autoPlayRef.current = play;
  }, [displayMovies.length]);

  useEffect(() => {
    const interval = setInterval(() => {
      if (autoPlayRef.current) {
        autoPlayRef.current();
      }
    }, 7000); // Change slide every 7 seconds

    return () => clearInterval(interval);
  }, []);

  if (loading || displayMovies.length === 0) {
    return (
      <div className="vh-75 d-flex justify-content-center align-items-center">
        {loading ? (
          <SpinnerComponent />
        ) : (
          <p className="fs-4">No featured movies available</p>
        )}
      </div>
    );
  }

  const currentMovie = displayMovies[activeIndex];

  return (
    <div className="netflix-hero position-relative mb-5">
      {/* Video/Image Background */}
      <div
        className="hero-background"
        style={{ height: "75vh", overflow: "hidden" }}
      >
        <div
          className={`position-absolute w-100 h-100 bg-cover bg-center transition-opacity ${
            isTransitioning ? "opacity-0" : "opacity-100"
          }`}
          style={{
            backgroundImage: `url(https://image.tmdb.org/t/p/original${currentMovie.backdrop_path})`,
            backgroundSize: "cover",
            backgroundPosition: "center top",
          }}
        >
          {/* Gradient Overlay */}
          <div
            className="position-absolute w-100 h-100"
            style={{
              background: `
                linear-gradient(0deg, #141414 0%, rgba(20, 20, 20, 0) 50%, rgba(20, 20, 20, 0.7) 100%),
                linear-gradient(90deg, rgba(20, 20, 20, 0.8) 0%, rgba(20, 20, 20, 0) 60%)
              `,
            }}
          ></div>
        </div>
      </div>

      {/* Content Area */}
      <div
        className={`hero-content position-absolute top-0 left-0 w-100 h-100 d-flex align-items-center transition-opacity ${
          isTransitioning ? "opacity-0" : "opacity-100"
        }`}
        style={{ zIndex: 2 }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-lg-6 ps-4 ps-md-5 hero-content">
              <h1
                className="display-5 fw-bold mb-2 text-truncate-2-lines"
                style={{
                  textShadow: "2px 2px 4px rgba(0,0,0,0.5)",
                  maxWidth: "100%",
                }}
              >
                {currentMovie.title}
              </h1>

              {/* Movie Info */}
              <div className="d-flex align-items-center mb-3 text-light">
                <span className="badge bg-danger me-2">
                  {currentMovie.adult ? "18+" : "PG"}
                </span>
                <span className="me-2">
                  {currentMovie.release_date?.substring(0, 4)}
                </span>
                <span className="badge bg-secondary me-2">
                  <i className="bi bi-star-fill me-1 text-warning"></i>
                  {currentMovie.vote_average?.toFixed(1)}
                </span>
              </div>

              {/* Overview */}
              <p
                className="lead mb-4 text-truncate-3-lines"
                style={{
                  textShadow: "1px 1px 3px rgba(0,0,0,0.7)",
                  maxWidth: "100%",
                }}
              >
                {currentMovie.overview?.substring(0, 180)}
                {currentMovie.overview?.length > 180 ? "..." : ""}
              </p>

              {/* Action Buttons */}
              <div className="d-flex flex-wrap gap-2">
                <Link
                  to={`/movie/${currentMovie.id}`}
                  className="btn btn-secondary btn-lg px-4"
                >
                  <i className="bi bi-info-circle me-2"></i>
                  More Info
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Carousel Indicators */}
      <div className="position-absolute bottom-0 end-0 me-4 mb-5">
        <div className="d-flex">
          {displayMovies.map((_, index) => (
            <button
              key={index}
              type="button"
              className={`netflix-indicator mx-1 ${
                index === activeIndex ? "active" : ""
              }`}
              onClick={() => {
                setIsTransitioning(true);
                setTimeout(() => {
                  setActiveIndex(index);
                  setTimeout(() => setIsTransitioning(false), 500);
                }, 500);
              }}
              style={{
                width: "12px",
                height: "2px",
                background:
                  index === activeIndex
                    ? "#e50914"
                    : "rgba(255, 255, 255, 0.5)",
                border: "none",
                cursor: "pointer",
                padding: 0,
                transition: "all 0.3s ease",
              }}
            ></button>
          ))}
        </div>
      </div>

      {/* Age Rating */}
      <div className="position-absolute bottom-0 start-0 ms-4 mb-5">
        <div className="d-flex align-items-center">
          <div className="bg-dark bg-opacity-75 p-2 rounded">
            <i className="bi bi-badge-hd-fill text-danger"></i>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NetflixHeroBanner;
