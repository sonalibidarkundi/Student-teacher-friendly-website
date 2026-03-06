// src/components/donors/DonorLogin.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const DonorLogin = () => {

  
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/clerk/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('username', data.username);
        localStorage.setItem('role', data.role);
        if (data.role === 'clerk') {
          navigate('/donor/home');
        } else if (data.role === 'student') {
          navigate('/receiver/ReceiverHome');
        } else if (data.role === 'staff') {
          navigate('/staff/home');
        } else {
          console.error('Unknown role');
        }
      } else {
        alert(data.error); // Ensure you're alerting the error message properly
      }
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  const containerStyle = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    backgroundColor: 'darkgray',
    padding: '20px 15px',
  };

  const cardStyle = {
    width: '100%',
    maxWidth: '400px',
    borderRadius: '10px',
    boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
    backgroundColor: '#fff',
    padding: '30px 20px',
    margin: '10px',
  };

  const cardTitleStyle = {
    marginBottom: '20px',
    fontSize: '1.5rem',
    color: '#333',
    textAlign: 'center',
    
  };

  const labelStyle = {
    display: 'block',
    marginBottom: '8px',
    fontSize: '1rem',
    color: '#555',
  };

  const inputStyle = {
    width: '100%',
    padding: '12px',
    marginBottom: '15px',
    borderRadius: '5px',
    border: '1px solid #ddd',
    boxSizing: 'border-box',
    fontSize: '16px',
  };

  const buttonStyle = {
    width: '100%',
    padding: '12px',
    borderRadius: '5px',
    border: 'none',
    backgroundColor: '#007bff',
    color: '#fff',
    fontSize: '1rem',
    cursor: 'pointer',
    marginTop: '10px',
  };

  return (
    <div style={containerStyle}>
      <div style={cardStyle}>
        <h2 style={cardTitleStyle}>Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <label style={labelStyle}>Username</label>
            <input
              type="text"
              style={inputStyle}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label style={labelStyle}>Password</label>
            <input
              type="password"
              style={inputStyle}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" style={buttonStyle}>Sign In</button>
        </form>
      </div>
    </div>
  );
};

export default DonorLogin;
