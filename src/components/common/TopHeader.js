// src/components/common/TopHeader.js
import React from "react";
import "./TopHeader.css"; // अपने CSS file को import करो

export default function TopHeader() {
  return (
    <div className="top-header">
      <div className="top-header-inner">
        {/* Left: location & email */}
        <div className="top-header-left">
          <span style={{ borderRight: "1px solid #ccc", paddingRight: 10}}>
            <i className="fas fa-map-marker-alt" style={{ marginRight: 5 }}></i>
            123 Street, New York
          </span>
          <span>
            <i className="fas fa-envelope" style={{ marginRight: 5 }}></i>
            Email@gyandayiniclasses.in
          </span>
        </div>
        {/* Right: social icons */}
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
        </div>
      </div>
    </div>
  );
}
