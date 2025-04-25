import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Activity } from 'lucide-react';

const Login = () => {

  useEffect(() => {

    const link = document.createElement("link");
                link.href = "css/auth.css"; 
                link.rel = "stylesheet";
                document.head.appendChild(link);

                return () => {
                  document.head.removeChild(link);
                }
  }, []);

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if already logged in
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/profile');
    }
  }, [isAuthenticated, navigate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    // Simulate login - In a real app, this would make an API call
    login({
      username: username,
      email: 'user@example.com',
      age: 30,
      patientHistory: {
        conditions: [],
        medications: [],
        allergies: [],
        lastVisit: new Date().toISOString(),
        bloodType: 'A+',
        height: '175',
        weight: '70'
      },
      vitals: {
        bloodPressure: '120/80',
        heartRate: '72',
        temperature: '36.6',
        oxygenLevel: '98'
      }
    });
    
    navigate('/profile');
  };

  return (
    <main className="auth-container">
      <div className="auth-box">
        <div className="flex justify-center mb-6">

        </div>
        <h2>Sign in to your account</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input 
              type="text" 
              id="username" 
              name="username" 
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required 
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input 
              type="password" 
              id="password" 
              name="password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required 
            />
          </div>
          <button type="submit" className="submit-button">Log in</button>
          <p className="login-link">Don't have an account? <Link to="/register">Register</Link></p>
        </form>
      </div>
    </main>
  );
};

export default Login;