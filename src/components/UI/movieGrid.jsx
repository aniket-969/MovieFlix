import React, { 
  useState, 
  useRef, 
  useEffect, 
  useMemo, 
  useCallback, 
  memo 
} from "react";
import { Link } from "react-router-dom";
import SpinnerComponent from "./spinner";
import MovieCard from "../UI/movieCard"
import "../../styles/movieGrid.css";

const MovieCarousel = memo(({ title, movies, loading }) => {
  const [hoverIndex, setHoverIndex] = useState(-1);
  const [scrollPosition, setScrollPosition] = useState(0);
  const carouselRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  // Memoize visible cards count calculation
  const visibleCardsCount = useMemo(() => {
    if (typeof window === 'undefined') return 5;
    const screenWidth = window.innerWidth;
    if (screenWidth <= 575) return 2;
    if (screenWidth <= 767) return 3;
    if (screenWidth <= 1199) return 4;
    return 5;
  }, []);

  // Memoize mouse enter handler
  const handleMouseEnter = useCallback((index) => {
    setHoverIndex(index);
  }, []);

  // Memoize mouse leave handler
  const handleMouseLeave = useCallback(() => {
    setHoverIndex(-1);
  }, []);

  // Memoize scroll update effect
  useEffect(() => {
    const updateArrowVisibility = () => {
      if (carouselRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
        
        // Update arrow visibility
        setShowLeftArrow(scrollLeft > 0);
        setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
      }
    };

    updateArrowVisibility();
  }, [scrollPosition]);

  // Memoize scroll handler
  const handleScroll = useCallback((direction) => {
    if (carouselRef.current) {
      const scrollAmount = carouselRef.current.clientWidth * 0.8;
      const newPosition =
        direction === "left"
          ? scrollPosition - scrollAmount
          : scrollPosition + scrollAmount;

      carouselRef.current.scrollTo({
        left: newPosition,
        behavior: "smooth",
      });

      setScrollPosition(newPosition);
    }
  }, [scrollPosition]);

  // Memoize scroll event handler
  const handleScrollEvent = useCallback(() => {
    if (carouselRef.current) {
      setScrollPosition(carouselRef.current.scrollLeft);
    }
  }, []);

  // Memoize rendering of movie cards
  const memoizedMovieCards = useMemo(() => 
    movies.map((movie, index) => (
      <MovieCard 
        key={movie.id} 
        movie={movie} 
        index={index}
        onMouseEnter={() => handleMouseEnter(index)}
        onMouseLeave={handleMouseLeave}
        isHovered={hoverIndex === index}
      />
    )), 
    [movies, hoverIndex, handleMouseEnter, handleMouseLeave]
  );

  // Early return for loading and empty states
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

  return (
    <div className="movie-carousel mb-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2 className="fs-4 fw-bold mb-0 text-var-primary">{title}</h2>
        <div className="text-muted">
          {movies.length} movies
        </div>
      </div>

      <div className="position-relative">
        {/* Left scroll arrow */}
        {showLeftArrow && (
          <button
            className="carousel-arrow left-arrow"
            onClick={() => handleScroll("left")}
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
          {memoizedMovieCards}
        </div>

        {/* Right scroll arrow */}
        {showRightArrow && (
          <button
            className="carousel-arrow right-arrow"
            onClick={() => handleScroll("right")}
            aria-label="Scroll right"
          >
            <i className="bi bi-chevron-right fs-2"></i>
          </button>
        )}
      </div>
    </div>
  );
});

export default MovieCarousel;