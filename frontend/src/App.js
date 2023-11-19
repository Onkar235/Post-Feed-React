// src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Register';

import './App.css'; // Import your main CSS file

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const handleLogout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <Router>
      <div>
        <nav className="navbar">
          <ul>
            <li><Link to="/">Home</Link></li>
            {!user && <li><Link to="/login">Login</Link></li>}
            {!user && <li><Link to="/register">Register</Link></li>}
            {user && <li><button onClick={handleLogout}>Logout</button></li>}
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={user ? <Home user={user} /> : <Navigate to="/login" replace />} />
          <Route path="/login" element={<Login setUser={setUser} />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
