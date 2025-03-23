import React, { useEffect } from "react";
import { useMovies,useMovieDetails,useLatestMovies,useMovieFilter} from "../../hooks/useMovie" ;
import ThemeToggleButton from "../../components/ThemeToggle";

const Home = () => {
  
  return (
    <div>
      <ThemeToggleButton/>
      <h1>Home</h1>

    </div>
  );
};

export default Home;
