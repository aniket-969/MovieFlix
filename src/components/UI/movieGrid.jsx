import React, { useState, useRef, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import SpinnerComponent from "./spinner";
import MovieCard from "../UI/movieCard"
import "../../styles/movieGrid.css";

const MovieCarousel = ({ title, movies, loading }) => {
  const [hoverIndex, setHoverIndex] = useState(-1);
  const [scrollPosition, setScrollPosition] = useState(0);
  const carouselRef = useRef(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  // Calculate number of visible cards based on screen width
  const getVisibleCardsCount = () => {
    if (typeof window === 'undefined') return 5;
    const screenWidth = window.innerWidth;
    if (screenWidth <= 575) return 2;
    if (screenWidth <= 767) return 3;
    if (screenWidth <= 1199) return 4;
    return 5;
  };

  // Update scroll and arrow visibility
  useEffect(() => {
    if (carouselRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = carouselRef.current;
      
      // Update arrow visibility
      setShowLeftArrow(scrollLeft > 0);
      setShowRightArrow(scrollLeft < scrollWidth - clientWidth - 10);
    }
  }, [scrollPosition]);

  // Handle scroll
  const handleScroll = (direction) => {
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
          {/* MovieCard */}
          {movies.map((movie, index) => (
            <MovieCard 
              key={movie.id} 
              movie={movie} 
              index={index}
              onMouseEnter={() => setHoverIndex(index)}
              onMouseLeave={() => setHoverIndex(-1)}
              isHovered={hoverIndex === index}
            />
          ))}
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
};

export default MovieCarousel;