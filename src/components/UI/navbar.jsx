import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import ThemeToggleButton from "./../ThemeToggle";
import "../../styles/navbar.css";

const Navbar = ({
  onSearch,
  genres,
  onGenreSelect,
  searchTerm,
  setSearchTerm,
  selectedGenre,
}) => {
  const [showSearch, setShowSearch] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const searchInputRef = useRef(null);

  // Handle navbar background change on scroll
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  // Focus search input when search is toggled
  useEffect(() => {
    if (showSearch && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [showSearch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
      setShowSearch(true);
    }
  };

  const handleSearchToggle = () => {
    setShowSearch(!showSearch);
    if (!showSearch) {
      // Prepare for focus via useEffect
      searchInputRef.current?.focus();
    } else {
      setSearchTerm("");
    }
  };

  const handleGenreClick = (genreId) => {
    // Call genre select handler
    onGenreSelect(genreId);
    setShowSearch(false);
    setSearchTerm("");
  };

  // Group genres into categories for dropdown
  const genreCategories = {
    "Popular Genres": genres.slice(0, 4),
    "Movie Genres": genres.slice(5, 8),
  };

  return (
    <div
      className={`fixed-top transition-all ${
        isScrolled
          ? "bg-black"
          : "bg-gradient-to-b from-black to-transparent "
      }`}
    >
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container-fluid px-4">
          {/* Logo */}
          <Link className="navbar-brand text-danger fw-bold" to="/">
            NETFLIX
          </Link>
          {/* Theme Toggle */}
          <ThemeToggleButton />
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              {/* Home */}
              <li className="nav-item">
                <Link className="nav-link active" to="/">
                  Home
                </Link>
              </li>
              {/* Fav */}
              <li className="nav-item">
                <Link className="nav-link" to="/favorites">
                  Favorites
                </Link>
              </li>

              {/* Categories Dropdown */}
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="categoriesDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Categories
                </a>
                <div
                  className="dropdown-menu dropdown-menu-dark"
                  aria-labelledby="categoriesDropdown"
                >
                  {Object.entries(genreCategories).map(
                    ([category, genreList]) => (
                      <div key={category}>
                        <h6 className="dropdown-header">{category}</h6>
                        {genreList.map((genre) => (
                          <button
                            key={genre.id}
                            className={`dropdown-item ${
                              selectedGenre === genre.name ? "active" : ""
                            }`}
                            onClick={() => handleGenreClick(genre.id)}
                          >
                            {genre.name}
                          </button>
                        ))}
                        {category !== "Other Genres" && (
                          <div className="dropdown-divider"></div>
                        )}
                      </div>
                    )
                  )}
                </div>
              </li>
            </ul>

            {/* Search Form */}
            <div className="d-flex align-items-center">
              {showSearch ? (
                <form
                  onSubmit={handleSubmit}
                  className="d-flex position-relative"
                >
                  <input
                    ref={searchInputRef}
                    type="text"
                    className="form-control bg-dark text-white"
                    placeholder="Titles, people, genres"
                    value={searchTerm}
                    onChange={(e) => {
                      setSearchTerm(e.target.value);
                      onSearch(e.target.value);
                    }}
                    style={{ width: "240px" }}
                  />
                  <button
                    type="submit"
                    className="btn btn-sm position-absolute end-0 top-0 bottom-0 text-white"
                  >
                    <i className="bi bi-search"></i>
                  </button>
                  <button
                    type="button"
                    className="btn btn-sm position-absolute end-0 top-0 bottom-0 text-white-50 me-5"
                    onClick={() => {
                      setShowSearch(false);
                      setSearchTerm("");
                    }}
                  >
                    <i className="bi bi-x-lg"></i>
                  </button>
                </form>
              ) : (
                <button
                  className="btn btn-sm text-white"
                  onClick={handleSearchToggle}
                  aria-label="Search"
                >
                  <i className="bi bi-search"></i>
                </button>
              )}
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
