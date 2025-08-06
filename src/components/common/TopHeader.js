// src/components/common/TopHeader.js
import React, { useState, useRef, useEffect } from "react";
import "./TopHeader.css";

export default function TopHeader({ themeColor, setThemeColor, darkMode, setDarkMode, COLORS }) {
  const [showPalette, setShowPalette] = useState(false);
  const paletteRef = useRef(null);

  // Close palette when clicked outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (paletteRef.current && !paletteRef.current.contains(event.target)) {
        setShowPalette(false);
      }
    }
    if (showPalette) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPalette]);

  return (
    <div className="top-header">
      <div className="top-header-inner">
        {/* Left Info */}
        <div className="top-header-left">
          <span style={{ borderRight: "1px solid #ccc", paddingRight: 10 }}>
            <i className="fas fa-map-marker-alt" />
            <span style={{ color: "var(--theme-text)", marginLeft: 5 }}>
              123 Street, New York
            </span>
          </span>
          <span>
            <i className="fas fa-envelope" />
            <span style={{ color: "var(--theme-text)", marginLeft: 5 }}>
              Email@gyandayiniclasses.in
            </span>
          </span>
        </div>

        {/* Right icons and controls */}
        <div className="top-header-right">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-facebook-f"></i>
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-twitter"></i>
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-instagram"></i>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            <i className="fab fa-linkedin-in"></i>
          </a>

          {/* GEAR ICON: Open Color Palette */}
          <button
            className="top-header-icon-btn"
            onClick={() => setShowPalette(!showPalette)}
            title="Change Theme Color"
          >
            <i className="fas fa-cog"></i>
          </button>

          {/* Color Palette Popup */}
          {showPalette && (
            <div className="top-header-palette-popup" ref={paletteRef}>
              <span className="palette-label">Theme Colors</span>
              <div className="top-header-palette">
                {COLORS.map((color) => (
                  <button
                    key={color.value}
                    style={{
                      background: color.value,
                      border:
                        themeColor === color.value ? "2.5px solid #222" : "2px solid #fff"
                    }}
                    className="top-header-color-btn"
                    aria-label={color.name}
                    onClick={() => {
                      setThemeColor(color.value); // will change text color only
                      setShowPalette(false);
                    }}
                  />
                ))}
              </div>
            </div>
          )}

          {/* MOON ICON: Dark/Light Toggle */}
          <button
            className="top-header-icon-btn"
            onClick={() => setDarkMode(!darkMode)}
            title="Toggle Dark Mode"
            style={{
              background: darkMode ? "#333" : "#fff",
              color: darkMode ? "#fff" : "#222"
            }}
          >
            <i className={darkMode ? "fas fa-moon" : "far fa-moon"}></i>
          </button>
        </div>
      </div>
    </div>
  );
}
