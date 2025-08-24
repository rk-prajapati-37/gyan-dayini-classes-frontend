import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import { authAPI } from "../../services/api"; // Add this import

import "./Header.css";

const navLinks = [
  { title: "Home", path: "/" },
  {
    title: "About",
    path: "/about",
    submenu: [
      { title: "Our Team", path: "/team" },
      { title: "Testimonial", path: "/testimonial" },
    ],
  },
  { title: "Services", path: "/services" },
  { title: "Programs", path: "/programs" },
  { title: "Events", path: "/events" },
  { title: "Blogs", path: "/blogs" },
  { title: "Contact", path: "/contact" },
];

export default function Header() {
  const { login: setAuthData, user, logout } = useAuth(); // Updated this line
  const [menuOpen, setMenuOpen] = useState(false);
  const [modalOpen, setModalOpen] = useState(false);
  const [dropdown, setDropdown] = useState("");
  const [mobileDropdown, setMobileDropdown] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (email, password) => {
    try {
      const result = await authAPI.login({ email, password });
      
      if (result.success && result.token) {
        // Set auth data in context
        setAuthData(result.user, result.token);
        
        // Close modal
        setModalOpen(false);
        
        // Navigate based on role
        if (result.user.role === "teacher") {
          navigate("/teacher-dashboard");
        } else if (result.user.role === "parent") {
          navigate("/parent-dashboard");
        } else if (result.user.role === "student") {
          navigate("/student-dashboard");
        } else {
          navigate("/");
        }
        
        // Show success message
        alert(`Welcome ${result.user.name}!`);
      } else {
        alert(result.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      alert('Login failed. Please check your connection.');
    }
  };

  const handleSignup = async (userData) => {
    try {
      const result = await authAPI.register(userData);
      
      if (result.success) {
        alert('Account created successfully! Please login.');
        return true; // Success
      } else {
        alert(result.message || 'Registration failed');
        return false;
      }
    } catch (error) {
      console.error('Signup error:', error);
      alert('Registration failed. Please check your connection.');
      return false;
    }
  };

  const handleLogout = () => {
    logout();
  };

  return (
    <header className="main-header">
      <div className="header-inner">
        <div className="header-logo-group">
          <a
            href="https://gyandayiniclasses.in"
            rel="noopener noreferrer"
          >
            <img
              src="/header_logo.png"
              alt="Gyan Dayini Logo"
              className="header-logo"
            />
          </a>
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
                    {link.title}{" "}
                    <i
                      className={`fas fa-chevron-down${
                        dropdown === link.title ? " active" : ""
                      }`}
                    />
                  </button>
                  <div
                    className="nav-dropdown"
                    style={{
                      display: dropdown === link.title ? "block" : "none",
                    }}
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
          {/* <div className="header-questions">
            <span className="header-phone-icon">
              <i className="fas fa-phone-alt"></i>
            </span>
            <div>
              <div className="header-ques-text">Have any questions?</div>
              <div className="header-ques-phone">Free: + 0123 456 7890</div>
            </div>
          </div> */}
          
          {/* Show login button or user info */}
          {user ? (
            <div className="user-info">
              <span>Hi, {user.name}</span>
              <button className="header-logout-btn" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <button
              className="header-login-btn"
              onClick={() => setModalOpen(true)}
            >
              Login
            </button>
          )}
        </div>
        
        {/* Burger - mobile only */}
        <button
          className="header-burger mobile-only"
          aria-label="Open menu"
          onClick={() => setMenuOpen((m) => !m)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>

      {/* Mobile Drawer */}
      {menuOpen && (
        <>
          <div
            className="mobile-menu-overlay"
            onClick={() => setMenuOpen(false)}
          />
          <nav className="mobile-menu-drawer">
            <div className="mobile-menu-header">
              <div className="header-logo-group">
                <a
                  href="https://gyandayiniclasses.in"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="/header_logo.png"
                    alt="Gyan Dayini Logo"
                    className="header-logo"
                  />
                </a>
                <span className="header-brand">Gyan Dayini Classes</span>
              </div>

              <button
                className="menu-close-btn"
                onClick={() => setMenuOpen(false)}
              >
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
                      {link.title}{" "}
                      <i
                        className={`fas fa-chevron-${
                          mobileDropdown === link.title ? "up" : "down"
                        }`}
                      />
                    </button>
                    <div
                      className="mobile-nav-dropdown"
                      style={{
                        display:
                          mobileDropdown === link.title ? "block" : "none",
                      }}
                    >
                      {link.submenu.map((sublink) => (
                        <Link
                          key={sublink.title}
                          to={sublink.path}
                          onClick={() => setMenuOpen(false)}
                        >
                          {sublink.title}
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
            
            {/* Mobile user info or login */}
            <div className="mobile-header-questions">
              <span className="header-phone-icon">
                <i className="fas fa-phone-alt"></i>
              </span>
              <div>
                <div className="mobile-ques-text">Have any questions?</div>
                <div className="mobile-ques-phone">Free: + 0123 456 7890</div>
              </div>
            </div>
            
            {user ? (
              <div className="mobile-user-info">
                <span>Hi, {user.name}</span>
                <button className="mobile-logout-btn" onClick={handleLogout}>
                  Logout
                </button>
              </div>
            ) : (
              <button
                className="mobile-login-btn"
                onClick={() => {
                  setModalOpen(true);
                  setMenuOpen(false);
                }}
              >
                Login
              </button>
            )}
          </nav>
        </>
      )}

      {/* Login Modal */}
      {modalOpen && (
        <div
          className="login-modal-overlay"
          onClick={() => setModalOpen(false)}
        >
          <div className="login-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="modal-close-btn"
              onClick={() => setModalOpen(false)}
            >
              <i className="fas fa-times"></i>
            </button>
            <LoginSignupTabs 
              onLogin={handleLogin} 
              onSignup={handleSignup}
            />
          </div>
        </div>
      )}
    </header>
  );
}

// Enhanced Login/Signup Modal Component
function LoginSignupTabs({ onLogin, onSignup }) {
  const [tab, setTab] = useState("login");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "student"
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(""); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    
    try {
      if (tab === "login") {
        await onLogin(formData.email, formData.password);
      } else {
        // Signup
        if (!formData.name || !formData.email || !formData.password) {
          setError("All fields are required");
          setLoading(false);
          return;
        }
        
        const success = await onSignup(formData);
        if (success) {
          // Switch to login tab after successful signup
          setTab("login");
          setFormData({ name: "", email: "", password: "", role: "student" });
        }
      }
    } catch (error) {
      setError("An error occurred. Please try again.");
    }
    
    setLoading(false);
  };

  const fillTestData = () => {
    setFormData({
      ...formData,
      email: "teacher@gyandayini.com",
      password: "teacher123"
    });
  };

  return (
    <div style={{ minWidth: 310, maxWidth: 340 }}>
      <div className="modal-tabs">
        <button
          className={tab === "login" ? "active" : ""}
          onClick={() => {
            setTab("login");
            setError("");
          }}
        >
          Login
        </button>
        <button
          className={tab === "signup" ? "active" : ""}
          onClick={() => {
            setTab("signup");
            setError("");
          }}
        >
          Sign Up
        </button>
      </div>
      
      {error && (
        <div className="modal-error-message">
          {error}
        </div>
      )}
      
      <form className="login-form" onSubmit={handleSubmit}>
        {tab === "signup" && (
          <>
            <label>Full Name</label>
            <input 
              type="text" 
              name="name"
              placeholder="Your Full Name"
              value={formData.name}
              onChange={handleChange}
              required={tab === "signup"}
              disabled={loading}
            />
            
            <label>Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={handleChange}
              disabled={loading}
            >
              <option value="student">Student</option>
              <option value="parent">Parent</option>
              <option value="teacher">Teacher</option>
            </select>
          </>
        )}
        
        <label>Email</label>
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={formData.email}
          onChange={handleChange}
          required
          disabled={loading}
        />
        
        <label>Password</label>
        <input
          type="password"
          name="password"
          placeholder={tab === "signup" ? "Create a password" : "Password"}
          value={formData.password}
          onChange={handleChange}
          required
          disabled={loading}
          minLength="6"
        />
        
        <button type="submit" disabled={loading}>
          {loading ? (
            tab === "login" ? "Logging in..." : "Creating Account..."
          ) : (
            tab === "login" ? "Login" : "Sign Up"
          )}
        </button>
      </form>
      
      {/* Test data button for login */}
      {tab === "login" && (
        <div className="test-data-section">
          <button 
            type="button" 
            onClick={fillTestData}
            className="fill-test-btn"
          >
            Fill Test Data
          </button>
          <small>Email: teacher@gyandayini.com</small>
        </div>
      )}
    </div>
  );
}
