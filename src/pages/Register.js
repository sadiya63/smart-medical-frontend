import React, { useState } from 'react';
import axios from 'axios';
import Header from '../components/Header';
import Chatbot from '../components/Chatbot';
import '../pages/authStyles.css';

const Register = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      setLoading(true);
      await axios.post('https://smart-medical-backend-hldq.onrender.com/', {
        email,
        password,
      });

      // redirect after successful registration
      window.location.href = '/login';
    } catch (err) {
      console.log('Error during registration:', err.response);
      setError(
        err.response?.data?.message ||
        'User already exists or registration failed'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Header />

      <div className="form-container">
        <div className="form-card">
          <h2>Register</h2>

          {error && <div className="error-message">{error}</div>}

          <form onSubmit={handleRegister}>
            <label htmlFor="email">Email</label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />

            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />

            <button type="submit" disabled={loading}>
              {loading ? 'Registering...' : 'Register'}
            </button>
          </form>
        </div>
      </div>

     
      <Chatbot />
    </>
  );
};

export default Register;
