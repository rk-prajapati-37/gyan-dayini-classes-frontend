import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";



import TopHeader from "./components/common/TopHeader";
import DesktopHeader from "./components/common/Header"; // (आपका main desktop wala)
// import MobileHeader from "./components/common/MobileHeader";

import Footer from "./components/common/Footer";

import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';

function App() {
  return (
    <Router>
      <TopHeader />
      <DesktopHeader />
      {/* <MobileHeader /> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
