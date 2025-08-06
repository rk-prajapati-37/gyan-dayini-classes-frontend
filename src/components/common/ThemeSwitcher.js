// src/components/common/ThemeSwitcher.js
import React, { useEffect, useState } from "react";
import "./ThemeSwitcher.css";

const colorOptions = ["color-1", "color-2", "color-3", "color-4", "color-5"];

export default function ThemeSwitcher() {
  const [darkMode, setDarkMode] = useState(false);
  const [visible, setVisible] = useState(false);
  const [themeColor, setThemeColor] = useState("color-1");

  // Add theme color dynamically to body or html
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", themeColor);
  }, [themeColor]);

  useEffect(() => {
    document.body.setAttribute("data-mode", darkMode ? "dark" : "light");
  }, [darkMode]);

  return (
    <div className={`style-switcher ${visible ? "open" : ""}`}>
      {/* Toggle Button */}
      <div
        className="style-switcher-toggler s-icon"
        onClick={() => setVisible((v) => !v)}
        title="Toggle Style Switcher"
      >
        <i className="fas fa-cog fa-spin"></i>
      </div>

      {/* Dark/Light Mode Toggle */}
      <div
        className="day-night s-icon"
        onClick={() => setDarkMode((d) => !d)}
        title="Toggle Day/Night"
      >
        <i className={`fas fa-${darkMode ? "sun" : "moon"}`}></i>
      </div>

      <h4>Theme Colors</h4>

      <div className="colors">
        {colorOptions.map((color) => (
          <span
            key={color}
            className={color}
            onClick={() => setThemeColor(color)}
            title={color.toUpperCase()}
          ></span>
        ))}
      </div>
    </div>
  );
}
