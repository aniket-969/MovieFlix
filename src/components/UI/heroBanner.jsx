import React, {
  useState,
  useEffect,
  useRef,
  lazy,
  Suspense,
  useCallback,
  useMemo,
} from "react";
import { Link } from "react-router-dom";
import "../../styles/heroBanner.css";
import SpinnerComponent from "./spinner";

const NetflixHeroBanner = ({ movies, loading }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const intervalRef = useRef(null);
  const [isImageLoaded, setIsImageLoaded] = useState(false);

  const displayMovies = useMemo(
    () => movies.filter((movie) => movie.backdrop_path).slice(0, 5),
    [movies]
  );

  const handlePlay = useCallback(() => {
    setIsTransitioning(true);
    setTimeout(() => {
      setActiveIndex((current) => (current + 1) % displayMovies.length);
      setTimeout(() => setIsTransitioning(false), 300);
    }, 300);
  }, [displayMovies.length]);

  useEffect(() => {
    if (displayMovies.length === 0) return;
    intervalRef.current = setInterval(handlePlay, 7000);
    return () => clearInterval(intervalRef.current);
  }, [handlePlay, displayMovies.length]);

  const handleIndicatorClick = useCallback(
    (index) => {
      if (index === activeIndex) return;
      clearInterval(intervalRef.current);
      setIsTransitioning(true);
      setTimeout(() => {
        setActiveIndex(index);
        setIsImageLoaded(false);
        setTimeout(() => setIsTransitioning(false), 300);
      }, 300);
      intervalRef.current = setInterval(handlePlay, 7000);
    },
    [activeIndex, handlePlay]
  );

  const handleImageLoad = useCallback(() => setIsImageLoaded(true), []);

  if (loading || displayMovies.length === 0) {
    return (
      <div className="vh-75 d-flex justify-content-center align-items-center">
        <Suspense fallback={<p>Loading...</p>}>
          {loading ? (
            <SpinnerComponent />
          ) : (
            <p className="fs-4">No featured movies available</p>
          )}
        </Suspense>
      </div>
    );
  }

  const currentMovie = displayMovies[activeIndex];

  return (
    <div className="netflix-hero position-relative mb-5">
      <div
        className="hero-background"
        style={{ height: "75vh", overflow: "hidden" }}
      >
        <div
          className={`position-absolute w-100 h-100 bg-cover bg-center transition-opacity ${
            isTransitioning ? "opacity-0" : "opacity-100"
          }`}
          style={{
            backgroundImage: isImageLoaded
              ? `url(https://image.tmdb.org/t/p/original${currentMovie.backdrop_path})`
              : "none",
            backgroundSize: "cover",
            backgroundPosition: "center top",
          }}
        >
          <img
            src={`https://image.tmdb.org/t/p/original${currentMovie.backdrop_path}`}
            alt="Backdrop"
            onLoad={handleImageLoad}
            style={{ display: "none" }}
          />
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

      <div
        className={`hero-content position-absolute top-0 left-0 w-100 h-100 d-flex align-items-center transition-opacity ${
          isTransitioning ? "opacity-0" : "opacity-100"
        }`}
        style={{ zIndex: 2 }}
      >
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-lg-6 ps-4 ps-md-5 hero-content">
              <h1 className="display-5 fw-bold mb-2 text-truncate-2-lines">
                {currentMovie.title}
              </h1>
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
              <p className="lead mb-4 text-truncate-3-lines">
                {currentMovie.overview?.substring(0, 180)}
                {currentMovie.overview?.length > 180 ? "..." : ""}
              </p>
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

      <div className="position-absolute bottom-0 end-0 me-4 mb-5">
        <div className="d-flex">
          {displayMovies.map((_, index) => (
            <button
              key={index}
              type="button"
              className={`netflix-indicator mx-1 ${
                index === activeIndex ? "active" : ""
              }`}
              onClick={() => handleIndicatorClick(index)}
            ></button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NetflixHeroBanner;
