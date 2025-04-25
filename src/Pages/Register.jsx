import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Register = () => {

  useEffect(() => {

    const link = document.createElement("link");
                link.href = "css/auth.css"; 
                link.rel = "stylesheet";
                document.head.appendChild(link);

                return () => {
                  document.head.removeChild(link);
                }
  }, []);

  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
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

    // Create new user object with sample data
    const newUser = {
      name,
      username,
      email,
      gender: 'Not specified',
      dateOfBirth: '',
      vitals: {
        bloodPressure: '120/80',
        heartRate: '72',
        temperature: '36.6',
        oxygenLevel: '98'
      },
      patientHistory: {
        conditions: [],
        medications: [],
        allergies: [],
        vaccines: [
          'COVID-19 Vaccine',
          'Flu Shot 2024',
          'Tetanus Booster'
        ],
        lastVisit: new Date().toISOString(),
        bloodType: 'A+',
        height: '175',
        weight: '70',
        medicalEvents: [
          {
            date: new Date().toISOString(),
            title: 'Initial Check-up',
            description: 'General health assessment and registration'
          }
        ]
      }
    };

    login(newUser);
    navigate('/profile');
  };

  return (
    <main className="auth-container">
      <div className="auth-box">
        <div className="flex justify-center mb-6">

        </div>
        <h2>Create your account</h2>
        {error && <div className="error-message">{error}</div>}
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input 
              type="text" 
              id="name" 
              name="name" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required 
            />
          </div>
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
            <label htmlFor="email">Email address</label>
            <input 
              type="email" 
              id="email" 
              name="email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
          <button type="submit" className="submit-button">Register</button>
          <p className="login-link">Already have an account? <Link to="/login">Log in</Link></p>
        </form>
      </div>
    </main>
  );
};

export default Register;