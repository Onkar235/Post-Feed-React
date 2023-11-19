import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

import './Register.css'; // Import the CSS file

const Register = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/register', { username, password });
      console.log('User registered successfully:', response.data);
      setSuccessMessage('User registered successfully. Redirecting to login page...');

      // Navigate to the login page after a short delay
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } catch (error) {
      if (error.response && error.response.status === 409) {
        // HTTP status 409 indicates a conflict, i.e., the user is already registered
        setErrorMessage('User already registered with the same username. Please choose different credentials.');
      } else {
        console.error('Error registering user:', error);
        setErrorMessage('Error registering user. Please try again.');
      }
    }
  };

  return (
    <div className="register-container">
      <h2>Register</h2>
      {successMessage && <p className="success-message">{successMessage}</p>}
      {errorMessage && <p className="error-message">{errorMessage}</p>}
      <form className="register-form" onSubmit={handleRegister}>
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

        <button type="submit" className="register-button">
          Register
        </button>
      </form>

      <p>
        Already have an account? <Link to="/login" className="register-link">Login here</Link>.
      </p>
    </div>
  );
};

export default Register;
