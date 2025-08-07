// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from "./contexts/AuthContext";

import TopHeader from "./components/common/TopHeader";
import DesktopHeader from "./components/common/Header";
import Footer from "./components/common/Footer";

import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';

import TeacherDashboard from './components/dashboard/TeacherDashboard';
import ParentDashboard from './components/dashboard/ParentDashboard';
import StudentDashboard from './components/dashboard/StudentDashboard';

// 🎨 Define available colors for text
const COLORS = [
  { name: "Blue", value: "#007bff" },
  { name: "Red", value: "#dc3545" },
  { name: "Green", value: "#28a745" },
  { name: "Purple", value: "#6f42c1" },
  { name: "Orange", value: "#fd7e14" }
];

function App() {
  const [themeColor, setThemeColor] = useState("#007bff");
  const [darkMode, setDarkMode] = useState(false);

  // Setup CSS variables and class handling
  useEffect(() => {
    // ✅ Only text color — will be used with --theme-text
    document.documentElement.style.setProperty('--theme-text', themeColor);
  }, [themeColor]);

  useEffect(() => {
    // ✅ Apply or remove dark-mode class on <html>
    const html = document.documentElement;
    if (darkMode) {
      html.classList.add("dark-mode");
    } else {
      html.classList.remove("dark-mode");
    }
  }, [darkMode]);

  return (
    <AuthProvider>
      <Router>
        <TopHeader
          themeColor={themeColor}
          setThemeColor={setThemeColor}
          darkMode={darkMode}
          setDarkMode={setDarkMode}
          COLORS={COLORS}
        />

        <DesktopHeader />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/teacher-dashboard" element={<TeacherDashboard />} />
          <Route path="/parent-dashboard" element={<ParentDashboard />} />
          <Route path="/student-dashboard" element={<StudentDashboard />} />
        </Routes>

        <Footer />
      </Router>
    </AuthProvider>
  );
}

export default App;
