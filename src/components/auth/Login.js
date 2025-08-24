import React, { useState } from 'react';
import { authAPI } from '../../services/api';
import './Login.css'; // अगर CSS file है

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(''); // Clear error when user types
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const result = await authAPI.login(formData);
      
      if (result.success && result.token) {
        // Save authentication data
        localStorage.setItem('token', result.token);
        localStorage.setItem('user', JSON.stringify(result.user));
        
        // Show success message
        alert(`Welcome ${result.user.name}!`);
        
        // Redirect based on role
        const { role } = result.user;
        switch(role) {
          case 'teacher':
            window.location.href = '/teacher-dashboard';
            break;
          case 'parent':
            window.location.href = '/parent-dashboard';
            break;
          case 'student':
            window.location.href = '/student-dashboard';
            break;
          default:
            window.location.href = '/dashboard';
        }
      } else {
        setError(result.message || 'Login failed');
      }
    } catch (error) {
      console.error('Login error:', error);
      setError('Connection error. Please check your internet connection.');
    }
    
    setLoading(false);
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h2>🎓 Gyan Dayini Classes</h2>
          <p>Login to continue</p>
        </div>
        
        <form onSubmit={handleSubmit} className="login-form">
          {error && (
            <div className="error-message">
              {error}
            </div>
          )}
          
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
              disabled={loading}
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
              disabled={loading}
            />
          </div>
          
          <button 
            type="submit" 
            className="login-button"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
        
        {/* Test Credentials */}
        <div className="test-credentials">
          <h4>Test Credentials:</h4>
          <p><strong>Email:</strong> teacher@gyandayini.com</p>
          <p><strong>Password:</strong> teacher123</p>
        </div>
      </div>
    </div>
  );
};

export default Login;
