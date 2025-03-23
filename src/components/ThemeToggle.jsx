import React from "react";
import { useTheme } from "../context/ThemeContext";

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button onClick={toggleTheme} className="btn btn-toggle">
      {theme === "light" ? "Switch to Dark" : "Switch to Light"}
    </button>
  );
};

export default ThemeToggleButton;
