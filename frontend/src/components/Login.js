// frontend/src/components/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { Link, Navigate } from 'react-router-dom';
import './Login.css'; // Import the CSS file

const Login = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3001/api/login', { username, password });
      const { token } = response.data;
      const user = { username, token };
      setUser(user);
      localStorage.setItem('user', JSON.stringify(user));
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setError('Invalid username or password. Please try again.');
      } else {
        console.error('Error logging in:', error);
        setError('Error logging in. Please try again.');
      }
    }
  };

  // Use Navigate to redirect after a successful login
  if (localStorage.getItem('user')) {
    return <Navigate to="/" />;
  }

  return (
    <div className="login-container">
      <h2>Login</h2>
      {error && <p className="error-message">{error}</p>}
      <form className="login-form" onSubmit={handleLogin}>
        <label className="form-label">Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="form-input"
          required
        />

        <label className="form-label">Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="form-input"
          required
        />

        <button type="submit" className="login-button">
          Login
        </button>
      </form>
      <p>
        Don't have an account? <Link to="/register" className="register-link">Register here</Link>.
      </p>
    </div>
  );
};

export default Login;
