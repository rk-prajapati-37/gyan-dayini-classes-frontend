import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


import './index.css';
import "./styles/globals.css"; // ✅ सही path // Global styles for the application
 

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);