import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark text-white py-4 mt-5">
      <div className="container">
        <div className="row">
          <div className="col-md-6 mb-4 mb-md-0" style={{textAlign: 'left'}}>
            <h5 style={{marginBottom: '20px', fontWeight: 'bold'}}>Follow Us</h5>
            <div className="d-flex justify-content-start" style={{gap: '20px'}}>
            <a href="https://www.facebook.com/vijaymahantesh.bangaragundmath" className="text-white" target="_blank" rel="noopener noreferrer" style={{fontSize: '18px'}}>
                <i className="fab fa-facebook-f"></i> Facebook
              </a>
              <a href="https://www.instagram.com" className="text-white" target="_blank" rel="noopener noreferrer" style={{fontSize: '18px'}}>
                <i className="fab fa-instagram"></i> Instagram
              </a>
              <a href="https://www.whatsapp.com" className="text-white" target="_blank" rel="noopener noreferrer" style={{fontSize: '18px'}}>
                <i className="fab fa-whatsapp"></i> WhatsApp
              </a>
            </div>
          </div>
          <div className="col-md-6 text-center text-md-end">
            <h5>Contact Us</h5>
            <p className="mb-1">Email: sonalibidarkundi@gmail.com</p>
            <p className="mb-0">Phone: +91-9731608708</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
