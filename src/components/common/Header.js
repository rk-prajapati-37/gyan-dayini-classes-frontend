import React, { useState } from "react";
import { Link } from "react-router-dom";



import "./Header.css";

const navLinks = [
  { title: "Home", path: "/" },
  {
    title: "About",
    path: "/about",
    submenu: [
      { title: "Our Team", path: "/team" },
      { title: "Testimonial", path: "/testimonial" }
    ]
  },
  { title: "Services", path: "/services" },
  { title: "Programs", path: "/programs" },
  { title: "Events", path: "/events" },
  { title: "Blogs", path: "/blogs" },
  { title: "Contact", path: "/contact" }
];

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [dropdown, setDropdown] = useState("");
  const [mobileDropdown, setMobileDropdown] = useState("");

  return (
    <header className="main-header">
      <div className="header-inner">
       <div className="header-logo-group">
  <img
    src="/header_logo.png"
    alt="Gyan Dayini Logo"
    className="header-logo"
  />
<div className="header-brand">
  <span className=" brand-red">Gyan Dayini</span>
  <span className=" brand-blue"> Classes</span>
</div>

</div>

        <nav className="header-nav">
          <ul>
            {navLinks.map((link) =>
              link.submenu ? (
                <li
                  key={link.title}
                  className="nav-has-dropdown"
                  onMouseEnter={() => setDropdown(link.title)}
                  onMouseLeave={() => setDropdown("")}
                >
                  <button
                    type="button"
                    className="nav-link-btn"
                    aria-haspopup="true"
                    aria-expanded={dropdown === link.title}
                  >
                    {link.title} <i className={`fas fa-chevron-down${dropdown === link.title ? " active" : ""}`} />
                  </button>
                  <div
                    className="nav-dropdown"
                    style={{ display: dropdown === link.title ? "block" : "none" }}
                  >
                    {link.submenu.map((sublink) => (
                      <Link key={sublink.title} to={sublink.path}>
                        {sublink.title}
                      </Link>
                    ))}
                  </div>
                </li>
              ) : (
                <li key={link.title}>
                  <Link to={link.path}>{link.title}</Link>
                </li>
              )
            )}
          </ul>
        </nav>
        {/* Desktop only, hide on mobile */}
        <div className="header-rights desktop-only">
          <div className="header-questions">
            <span className="header-phone-icon"><i className="fas fa-phone-alt"></i></span>
            <div>
              <div className="header-ques-text">Have any questions?</div>
              <div className="header-ques-phone">Free: + 0123 456 7890</div>
            </div>
          </div>
          <button className="header-login-btn" onClick={() => setModalOpen(true)}>
            Login
          </button>
        </div>
        {/* Burger - mobile only */}
        <button className="header-burger mobile-only" aria-label="Open menu" onClick={() => setMenuOpen((m) => !m)}>
          <span /><span /><span />
        </button>
      </div>

      {/* Mobile Drawer */}
      {menuOpen && (
        <>
          <div className="mobile-menu-overlay" onClick={() => setMenuOpen(false)} />
          <nav className="mobile-menu-drawer">
            <div className="mobile-menu-header">
            <div className="header-logo-group">
  <img
    src="/header_logo.png"
    alt="Gyan Dayini Logo"
    className="header-logo"
  />
  <span className="header-brand">Gyan Dayini Classes</span>
</div>


              <button className="menu-close-btn" onClick={() => setMenuOpen(false)}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <ul className="mobile-nav-links">
              {navLinks.map((link) =>
                link.submenu ? (
                  <li key={link.title}>
                    <button
                      className="mobile-nav-link-btn"
                      onClick={() =>
                        setMobileDropdown(
                          mobileDropdown === link.title ? "" : link.title
                        )
                      }
                    >
                      {link.title} <i className={`fas fa-chevron-${mobileDropdown === link.title ? "up" : "down"}`} />
                    </button>
                    <div
                      className="mobile-nav-dropdown"
                      style={{ display: mobileDropdown === link.title ? "block" : "none" }}
                    >
                      {link.submenu.map((sublink) => (
                        <Link
                          key={sublink.title}
                          to={sublink.path}
                          onClick={() => setMenuOpen(false)}
                        >{sublink.title}
                        </Link>
                      ))}
                    </div>
                  </li>
                ) : (
                  <li key={link.title}>
                    <Link to={link.path} onClick={() => setMenuOpen(false)}>
                      {link.title}
                    </Link>
                  </li>
                )
              )}
            </ul>
            {/* Only show in drawer (mobile-only) */}
            <div className="mobile-header-questions">
              <span className="header-phone-icon"><i className="fas fa-phone-alt"></i></span>
              <div>
                <div className="mobile-ques-text">Have any questions?</div>
                <div className="mobile-ques-phone">Free: + 0123 456 7890</div>
              </div>
            </div>
            <button className="mobile-login-btn" onClick={() => { setModalOpen(true); setMenuOpen(false); }}>
              Login
            </button>
          </nav>
        </>
      )}

      {/* Login Modal */}
      {modalOpen && (
        <div className="login-modal-overlay" onClick={() => setModalOpen(false)}>
          <div className="login-modal" onClick={e => e.stopPropagation()}>
            <button className="modal-close-btn" onClick={() => setModalOpen(false)}>
              <i className="fas fa-times"></i>
            </button>
            <LoginSignupTabs />
          </div>
        </div>
      )}
    </header>
  );
}

// Same as before for the modal.
function LoginSignupTabs() {
  const [tab, setTab] = useState("login");
  return (
    <div style={{ minWidth: 310, maxWidth: 340 }}>
      <div className="modal-tabs">
        <button className={tab === "login" ? "active" : ""} onClick={() => setTab("login")}>Login</button>
        <button className={tab === "signup" ? "active" : ""} onClick={() => setTab("signup")}>Sign Up</button>
      </div>
      {tab === "login" ? (
        <form className="login-form">
          <label>Email</label>
          <input type="email" placeholder="Enter email" />
          <label>Password</label>
          <input type="password" placeholder="Password" />
          <button type="submit">Login</button>
        </form>
      ) : (
        <form className="login-form">
          <label>Name</label>
          <input type="text" placeholder="Your Name" />
          <label>Email</label>
          <input type="email" placeholder="Enter email" />
          <label>Password</label>
          <input type="password" placeholder="Create a password" />
          <button type="submit">Sign Up</button>
        </form>
      )}
    </div>
  );
}
