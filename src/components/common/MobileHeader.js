import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./MobileHeader.css"; // CSS code नीचे है

const navLinks = [
  { title: "Home", path: "/" },
  { title: "About", path: "/about" },
  { title: "Services", path: "/services" },
  { title: "Programs", path: "/programs" },
  { title: "Events", path: "/events" },
  { title: "Pages", path: "/pages" },
  { title: "Contact", path: "/contact" }
];

export default function MobileHeader() {
  const [menu, setMenu] = useState(false);

  // For close when clicking overlay
  const handleOverlay = (e) => {
    if (e.target.classList.contains("mobile-menu-overlay")) setMenu(false);
  };

  return (
    <header className="mobile-main-header">
      {/* Top bar */}
      <div className="mobile-header-bar">
        <div className="mobile-logo-group">
          <span className="brand-red">Baby</span>
          <span className="brand-blue">Care</span>
        </div>
        <button className="mobile-menu-btn" onClick={() => setMenu(true)} aria-label="Open menu">
          <span></span><span></span><span></span>
        </button>
      </div>

      {/* Burger Drawer/Menu */}
      {menu && (
        <>
          <div className="mobile-menu-overlay" onClick={handleOverlay}></div>
          <nav className="mobile-menu-drawer">
            <div className="mobile-menu-header">
              <div className="mobile-logo-group">
                <span className="brand-red">Baby</span>
                <span className="brand-blue">Care</span>
              </div>
              <button className="menu-close-btn" aria-label="Close" onClick={() => setMenu(false)}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <ul className="mobile-nav-links">
              {navLinks.map(link => (
                <li key={link.title}>
                  <Link to={link.path} onClick={() => setMenu(false)}>{link.title}</Link>
                </li>
              ))}
            </ul>
            {/* Pink phone/question box */}
            <div className="mobile-header-questions">
              <span className="header-phone-icon">
                <i className="fas fa-phone-alt"></i>
              </span>
              <div>
                <div className="mobile-ques-text">Have any questions?</div>
                <div className="mobile-ques-phone">Free: + 0123 456 7890</div>
              </div>
            </div>
            {/* Search btn */}
            <button className="mobile-search-btn" aria-label="Search">
              <i className="fas fa-search"></i>
            </button>
          </nav>
        </>
      )}
    </header>
  );
}
