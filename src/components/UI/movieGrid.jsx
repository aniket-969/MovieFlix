import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import SpinnerComponent from './spinner';

const MovieCarousel = ({ title, movies, loading, viewAll = false }) => {
  const [hoverIndex, setHoverIndex] = useState(-1);
  const [scrollPosition, setScrollPosition] = useState(0);
  const carouselRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);
  
  // Check if arrows should be visible based on scroll position
  useEffect(() => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  }, [scrollPosition]);

  // Handle scroll
  const handleScroll = (direction) => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.clientWidth * 0.8;
      const newPosition = direction === 'left' 
        ? scrollPosition - scrollAmount 
        : scrollPosition + scrollAmount;
      
      carouselRef.current.scrollTo({
        left: newPosition,
        behavior: 'smooth'
      });
      
      setScrollPosition(newPosition);
    }
  };
  
  // Update scroll position when carousel is scrolled directly
  const handleScrollEvent = () => {
    if (carouselRef.current) {
      setScrollPosition(carouselRef.current.scrollLeft);
    }
  };
  
 if (loading) {
    return <SpinnerComponent />;
  }
  
  if (!movies || movies.length === 0) {
    return (
      <div className="text-center py-4">
        <p className="fs-5 text-muted">No movies available</p>
      </div>
    );
  }

  const displayMovies = movies.slice(0, 20);

  return (
    <div className="movie-carousel mb-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="fs-4 fw-bold mb-0 text-var-primary">{title}</h2>
        
      </div>
      
      <div className="position-relative">
        {/* Left scroll arrow */}
        {showLeftArrow && (
          <button 
            className="carousel-arrow left-arrow"
            onClick={() => handleScroll('left')}
            aria-label="Scroll left"
          >
            <i className="bi bi-chevron-left fs-2"></i>
          </button>
        )}
        
        {/* Movie carousel */}
        <div 
          ref={carouselRef}
          className="movie-carousel-container"
          onScroll={handleScrollEvent}
        >
          {displayMovies.map((movie, index) => (
            <div 
              key={movie.id} 
              className="movie-card-container"
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(-1)}
            >
              <Link 
                to={`/movie/${movie.id}`}
                className="text-decoration-none"
              >
                <div className="card bg-dark border-0 netflix-card h-100">
                  <div className="position-relative overflow-hidden rounded">
                    {movie.poster_path ? (
                      <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.title}
                        className="card-img-top w-100"
                        style={{ 
                          aspectRatio: "2/3",
                          objectFit: "cover",
                          transition: "transform 0.3s ease-in-out",
                          transform: hoverIndex === index ? "scale(1.05)" : "scale(1)"
                        }}
                      />
                    ) : (
                      <div 
                        className="card-img-top bg-secondary d-flex align-items-center justify-content-center"
                        style={{ aspectRatio: "2/3" }}
                      >
                        <span className="text-white">No Image</span>
                      </div>
                    )}
                    
                    {/* Hover info overlay */}
                    <div 
                      className="position-absolute bottom-0 start-0 w-100 p-2"
                      style={{
                        background: "linear-gradient(0deg, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 100%)",
                        opacity: hoverIndex === index ? 1 : 0,
                        transition: "opacity 0.3s ease",
                      }}
                    >
                      <h6 className="text-white mb-1 text-truncate">{movie.title}</h6>
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
                    
                    {/* Permanent bottom rating badge */}
                    <div 
                      className="position-absolute bottom-0 end-0 m-2"
                      style={{
                        opacity: hoverIndex === index ? 0 : 1,
                        transition: "opacity 0.3s ease",
                      }}
                    >
                      <span className="badge bg-dark bg-opacity-75 text-warning">
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
        
        {/* Right scroll arrow */}
        {showRightArrow && (
          <button 
            className="carousel-arrow right-arrow"
            onClick={() => handleScroll('right')}
            aria-label="Scroll right"
          >
            <i className="bi bi-chevron-right fs-2"></i>
          </button>
        )}
      </div>
    </div>
  );
};



export default MovieCarousel;