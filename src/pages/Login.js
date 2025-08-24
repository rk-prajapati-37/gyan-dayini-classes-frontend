import React, { useState } from 'react';
import { authAPI } from '../services/api';
import './Login.css';

const Login = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student' // default role
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError(''); // Clear error when user types
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    
    try {
      if (isSignUp) {
        // Sign Up Process
        const result = await authAPI.register(formData);
        
        if (result.success) {
          setSuccess('Account created successfully! Please login.');
          setIsSignUp(false); // Switch to login mode
          setFormData({ name: '', email: '', password: '', role: 'student' });
        } else {
          setError(result.message || 'Registration failed');
        }
      } else {
        // Login Process
        const result = await authAPI.login({
          email: formData.email,
          password: formData.password
        });
        
        if (result.success && result.token) {
          // Save authentication data
          localStorage.setItem('token', result.token);
          localStorage.setItem('user', JSON.stringify(result.user));
          
          // Show success message
          setSuccess(`Welcome ${result.user.name}!`);
          
          // Redirect based on role
          setTimeout(() => {
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
          }, 1000);
        } else {
          setError(result.message || 'Login failed');
        }
      }
    } catch (error) {
      console.error('Auth error:', error);
      setError('Connection error. Please check your internet connection.');
    }
    
    setLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <h2>🎓 Gyan Dayini Classes</h2>
          <p>{isSignUp ? 'Create your account' : 'Login to continue'}</p>
        </div>
        
        {/* Tab Switcher */}
        <div className="auth-tabs">
          <button 
            className={!isSignUp ? 'active' : ''}
            onClick={() => {
              setIsSignUp(false);
              setError('');
              setSuccess('');
            }}
          >
            Login
          </button>
          <button 
            className={isSignUp ? 'active' : ''}
            onClick={() => {
              setIsSignUp(true);
              setError('');
              setSuccess('');
            }}
          >
            Sign Up
          </button>
        </div>
        
        <form onSubmit={handleSubmit} className="auth-form">
          {error && (
            <div className="error-message">
              ❌ {error}
            </div>
          )}
          
          {success && (
            <div className="success-message">
              ✅ {success}
            </div>
          )}
          
          {/* Name field - only for signup */}
          {isSignUp && (
            <div className="form-group">
              <label htmlFor="name">Full Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your full name"
                required
                disabled={loading}
              />
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
              minLength="6"
            />
          </div>
          
          {/* Role selection - only for signup */}
          {isSignUp && (
            <div className="form-group">
              <label htmlFor="role">I am a:</label>
              <select
                id="role"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
                disabled={loading}
              >
                <option value="student">Student</option>
                <option value="parent">Parent</option>
                <option value="teacher">Teacher</option>
              </select>
            </div>
          )}
          
          <button 
            type="submit" 
            className="auth-button"
            disabled={loading}
          >
            {loading ? (
              isSignUp ? 'Creating Account...' : 'Logging in...'
            ) : (
              isSignUp ? 'Sign Up' : 'Login'
            )}
          </button>
        </form>
        
        {/* Test Credentials - only for login */}
        {!isSignUp && (
          <div className="test-credentials">
            <h4>🧪 Test Credentials:</h4>
            <p><strong>Email:</strong> teacher@gyandayini.com</p>
            <p><strong>Password:</strong> teacher123</p>
            <button 
              type="button"
              onClick={() => {
                setFormData({
                  ...formData,
                  email: 'teacher@gyandayini.com',
                  password: 'teacher123'
                });
              }}
              className="fill-test-data"
            >
              Fill Test Data
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Login;
