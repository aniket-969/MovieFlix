import React from "react";
import { useTheme } from "../context/ThemeContext";
import { MoonIcon } from "./Icons/Moon";
import { SunIcon } from "./Icons/Sun";

const ThemeToggleButton = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle-btn d-flex align-items-center justify-content-center"
    >
      {theme === "light" ? <MoonIcon /> : <SunIcon />}
    </button>
  );
};

export default ThemeToggleButton