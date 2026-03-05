import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4 mt-5">
      <div className="container">
        <div className="row">
          <div className="col-md-6 mb-4 mb-md-0">
            <h5>Follow Us</h5>
            <div className="d-flex justify-content-start">
            <a href="https://www.facebook.com/vijaymahantesh.bangaragundmath" className="text-white me-4" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="https://www.instagram.com" className="text-white me-4" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://www.whatsapp.com" className="text-white" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-whatsapp"></i>
              </a>
            </div>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <h5>Contact Us</h5>
            <p className="mb-1">Email: jadhavajeet2@gmail.com</p>
            <p className="mb-0">Phone: +91-7411402186</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
