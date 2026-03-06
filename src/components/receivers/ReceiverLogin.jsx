// src/components/donors/DonorLogin.jsx
import React, { useState } from 'react';
import '../../styles.css';
import { useNavigate, Link } from 'react-router-dom';

const ReceiverLogin = () => {

  const navigate =useNavigate();
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
        navigate('/receiver/ReceiverHome');
      } else {
        alert(data.error); // Ensure you're alerting the error message properly
      }
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };


  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <Link to="/" className="btn btn-secondary">Back to Home</Link>
      </div>
      
      <h2 className="text-center mb-4">Student Login</h2>

      {/* Form in Card */}
      <div className="card shadow">
        <div className="card-body">
          <h5 className="card-title mb-4">Student Login Form</h5>
          <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Username</label>
          <input type="text" className='form-control' value={username} onChange={(e) => setUsername(e.target.value)} required />
        </div>
        <div className="mb-3">
          <label>Password</label>
          <input type="password" className='form-control' value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" className='btn btn-primary w-100'>Sign In</button>
      </form>
  
        </div>
      </div>
    </div>
  );
};

export default ReceiverLogin;

