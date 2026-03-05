// src/components/donors/DonorLogin.jsx
import React, { useState } from 'react';
import '../../styles.css';
import { useNavigate } from 'react-router-dom';

const ReceiverLogin = () => {

  const navigate =useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/users/login', {
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
      <h2 className="text-center mb-4">Donor Login</h2>

      {/* Carousel - hidden on small mobile, visible on larger screens */}
      <div id="carouselExampleInterval" className="carousel slide mb-4 d-none d-md-block" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active" data-bs-interval="2000">
            <img src={`${process.env.PUBLIC_URL}/images/i1.jpg`} className="d-block w-100" alt="First slide" style={{ height: '300px', objectFit: 'cover' }} />
            <div className="carousel-caption d-none d-md-block">
              <h5>First Slide</h5>
              <p>Description for the first slide.</p>
            </div>
          </div>
          <div className="carousel-item" data-bs-interval="2000">
            <img src={`${process.env.PUBLIC_URL}/images/i2.jpg`} className="d-block w-100" alt="Second slide" style={{ height: '300px', objectFit: 'cover' }} />
            <div className="carousel-caption d-none d-md-block">
              <h5>Second Slide</h5>
              <p>Description for the second slide.</p>
            </div>
          </div>
          <div className="carousel-item" data-bs-interval="2000">
            <img src={`${process.env.PUBLIC_URL}/images/i3.jpg`} className="d-block w-100" alt="Third slide" style={{ height: '300px', objectFit: 'cover' }} />
            <div className="carousel-caption d-none d-md-block">
              <h5>Third Slide</h5>
              <p>Description for the third slide.</p>
            </div>
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Mobile carousel - smaller version */}
      <div id="carouselExampleIntervalMobile" className="carousel slide mb-4 d-md-none" data-bs-ride="carousel">
        <div className="carousel-inner">
          <div className="carousel-item active" data-bs-interval="2000">
            <img src={`${process.env.PUBLIC_URL}/images/i1.jpg`} className="d-block w-100" alt="First slide" style={{ height: '180px', objectFit: 'cover' }} />
          </div>
          <div className="carousel-item" data-bs-interval="2000">
            <img src={`${process.env.PUBLIC_URL}/images/i2.jpg`} className="d-block w-100" alt="Second slide" style={{ height: '180px', objectFit: 'cover' }} />
          </div>
          <div className="carousel-item" data-bs-interval="2000">
            <img src={`${process.env.PUBLIC_URL}/images/i3.jpg`} className="d-block w-100" alt="Third slide" style={{ height: '180px', objectFit: 'cover' }} />
          </div>
        </div>
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIntervalMobile" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIntervalMobile" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>

      {/* Form in Card */}
      <div className="card shadow">
        <div className="card-body">
          <h5 className="card-title mb-4"> Donor Login Form</h5>
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
