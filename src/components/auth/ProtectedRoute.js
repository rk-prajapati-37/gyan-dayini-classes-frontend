import React from 'react';
import { Navigate } from 'react-router-dom';
const ProtectedRoute = ({ isAuthenticated, children }) =>
  isAuthenticated ? children : <Navigate to="/login" />;
export default ProtectedRoute;
