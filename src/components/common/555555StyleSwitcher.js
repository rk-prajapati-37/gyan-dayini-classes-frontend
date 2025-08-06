import React, { useState, useEffect } from "react";
import "./StyleSwitcher.css";

const COLORS = [
  { name: "Pink", value: "#fa4b89" },
  { name: "Blue", value: "#425ffd" },
  { name: "Green", value: "#34c759" },
  { name: "Orange", value: "#ff8748" }
];

export default function StyleSwitcher() {
  const [panelOpen, setPanelOpen] = useState(false);
  const [themeColor, setThemeColor] = useState("#fa4b89");
  const [darkMode, setDarkMode] = useState(false);

  // Update CSS Variables
  useEffect(() => {
    document.documentElement.style.setProperty("--theme-primary", themeColor);
    if (darkMode) {
      document.documentElement.classList.add("dark-mode");
    } else {
      document.documentElement.classList.remove("dark-mode");
    }
  }, [themeColor, darkMode]);

  return (
    <div className={`style-switcher${panelOpen ? " open" : ""}`}>
      {/* Toggle Button */}
      <button className="switcher-toggle" onClick={() => setPanelOpen(o => !o)}>
        <i className={`fas fa-${panelOpen ? "times" : "cog"}`}></i>
      </button>
      {/* Switcher Panel */}
      <div className="switcher-panel">
        <h4>Theme Color</h4>
        <div className="color-palette">
          {COLORS.map((color) => (
            <button
              key={color.value}
              style={{
                background: color.value,
                border: themeColor === color.value ? "2.5px solid #222" : "2px solid #fff"
              }}
              className="color-btn"
              aria-label={color.name}
              onClick={() => setThemeColor(color.value)}
            />
          ))}
        </div>
        <div className="switcher-row">
          <span>Dark Mode</span>
          <label className="switcher-toggle-switch">
            <input
              type="checkbox"
              checked={darkMode}
              onChange={(e) => setDarkMode(e.target.checked)}
            />
            <span className="switch-slider"></span>
          </label>
        </div>
      </div>
    </div>
  );
}
