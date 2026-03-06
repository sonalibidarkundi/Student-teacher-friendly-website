import React, { useState } from 'react';

const ProviderSignUp = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    companyName: '',
    logo: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, logo: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('username', formData.username);
    data.append('password', formData.password);
    data.append('role', 'provider');
    data.append('companyName', formData.companyName);
    data.append('logo', formData.logo);

    try {
      const response = await fetch('http://localhost:5000/api/clerk/signup', {
        method: 'POST',
        body: data
      });

      if (response.ok) {
        alert('Signup successful');
      } else {
        console.error('Signup failed');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (

    <div className="container mt-5">    
    {/* Carousel - hidden on small mobile, visible on larger screens */}
    <div id="carouselExampleIntervalSignup" className="carousel slide mb-4 d-none d-md-block" data-bs-ride="carousel">
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
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIntervalSignup" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIntervalSignup" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>

    {/* Mobile carousel - smaller version */}
    <div id="carouselExampleIntervalSignupMobile" className="carousel slide mb-4 d-md-none" data-bs-ride="carousel">
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
      <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIntervalSignupMobile" data-bs-slide="prev">
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIntervalSignupMobile" data-bs-slide="next">
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>

    {/* Form in Card */}
    <div className="card shadow">
      <div className="card-body">
        <h5 className="card-title mb-4 text-center">Donor Signup Form</h5>
        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <input type="text" className='form-control' name="username" placeholder="Username" onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <input type="password" className='form-control' name="password" placeholder="Password" onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <input type="text" className='form-control' name="companyName" placeholder="Company Name" onChange={handleChange} required />
          </div>
          <div className="mb-3">
            <input type="file" className='form-control' name="logo" onChange={handleFileChange} required />
          </div>
          <div className="text-center">
            <button className='btn btn-primary rounded-5 w-50 mt-2' type="submit">Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  </div>
   
  );
};

export default ProviderSignUp;
