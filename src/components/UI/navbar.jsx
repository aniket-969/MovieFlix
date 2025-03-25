import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import ThemeToggleButton from "./../ThemeToggle";
const NetflixNavbar = ({
  onSearch,
  genres,
  onGenreSelect,
  searchTerm,
  setSearchTerm,
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      onSearch(searchTerm.trim());
    }
  };

  const handleSearchToggle = () => {
    setShowSearch(!showSearch);
    if (!showSearch) {
      // Will focus via useEffect
    } else {
      setSearchTerm("");
    }
  };

  // Group genres into categories for dropdown
  const genreCategories = {
    "Popular Genres": genres.slice(0, 4),
    "Movie Genres": genres.slice(5, 8),
  };

  return (
    <div
      className={`fixed-top transition-all ${
        isScrolled ? "bg-black" : "bg-gradient-to-b from-black to-transparent"
      }`}
    >
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container-fluid px-4">
          {/* Logo */}
          <Link className="navbar-brand text-danger fw-bold" to="/">
            NETFLIX
          </Link>

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
                            className="dropdown-item"
                            onClick={() => onGenreSelect(genre.id)}
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

      {/* Custom CSS */}
      <style jsx="true">{`
        .transition-all {
          transition: background-color 0.3s ease;
        }

        .bg-gradient-to-b {
          background-image: linear-gradient(
            to bottom,
            rgba(0, 0, 0, 0.8) 0%,
            rgba(0, 0, 0, 0) 100%
          );
        }

        /* Override Bootstrap dropdown styles for Netflix feel */
        .dropdown-menu-dark {
          background-color: rgba(20, 20, 20, 0.9);
          border-radius: 2px;
          margin-top: 10px;
          border: 1px solid rgba(255, 255, 255, 0.1);
        }

        .dropdown-item:hover {
          background-color: rgba(255, 255, 255, 0.1);
        }

        /* Responsive adjustments */
        @media (max-width: 991.98px) {
          .navbar-collapse {
            background-color: rgba(0, 0, 0, 0.9);
            padding: 1rem;
            border-radius: 4px;
            margin-top: 0.5rem;
          }
        }
      `}</style>
    </div>
  );
};

export default NetflixNavbar;
