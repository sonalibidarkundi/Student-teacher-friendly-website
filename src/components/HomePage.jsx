import React from 'react';
import '../styles.css'; // Import the CSS file
import { NavLink } from 'react-router-dom';
import Footer from './Footer';

const HomePage = () => {
  return (
    <div>
      <h1 style={{color:'black',fontFamily:"cursive"}} className="my-3">STUDENT-TEACHER FRIENDLY WEBSITE</h1>
      <div id="carouselExampleInterval" class="carousel slide" data-bs-ride="carousel">
      
      <div className="carousel-inner" style={{height:"400px",width:"100%"}}>
          <div className="carousel-item active">
            <img src={`${process.env.PUBLIC_URL}/images/66.jpg`} style={{height:"300px",width:"100%"}} className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src={`${process.env.PUBLIC_URL}/images/333.jpeg`} style={{height:"300px",width:"100%"}} className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src={`${process.env.PUBLIC_URL}/images/14.jpg`} style={{height:"300px",width:"100%"}}className="d-block w-100" alt="..." />
          </div>
          <div className="carousel-item">
            <img src={`${process.env.PUBLIC_URL}/images/R.jpeg`} style={{height:"300px",width:"100%"}}className="d-block w-100" alt="..." />
          </div>
        </div>
  
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
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
