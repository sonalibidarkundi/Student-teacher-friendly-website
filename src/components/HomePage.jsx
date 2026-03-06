import React from 'react';
import '../styles.css'; // Import the CSS file
import { NavLink } from 'react-router-dom';
import Footer from './Footer';

const HomePage = () => {
  return (
   <div>
{/*  To add cards for 2 modules  */}
<div class="n1">
<p>
<h1 className="mobile-text-center" style={{color:"blueviolet"}}>LEARN ON YOUR </h1>
<h1 className="mobile-text-center" style={{color:"blueviolet"}}>SCHDULE.</h1>
<h1 className="mobile-text-center" style={{fontSize:"30px"}}>Anywhere,anytime,Start learning today!</h1>




      </p>
    </div>

 <div className='container'>
 <div className='row justify-content-center mt-4'>
 <div className="col-md-4 mb-4">
  <div>
  <div class="card-body">
   
    <NavLink to="/donor/login" className="btn btn-primary mobile-mb-3">Login</NavLink>
  </div>
  <div className="d-flex flex-wrap justify-content-center gap-3 mt-3">
    <img src={`${process.env.PUBLIC_URL}/images/31.jpeg`} style={{maxWidth:"200px",width:"100%"}} alt="" className="img-fluid" />

    <img src={`${process.env.PUBLIC_URL}/images/33.jpeg`} style={{maxWidth:"200px",width:"100%"}} alt="" className="img-fluid" />
  </div>
  
</div>
</div>


    </div>
 </div>
 
     <Footer/>
     
    </div>
    
  );

};

export default HomePage;
