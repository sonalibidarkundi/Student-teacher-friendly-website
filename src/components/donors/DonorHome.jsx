import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const username = localStorage.getItem('username');
      try {
        const response = await fetch('http://localhost:5000/api/clerk/user', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username }),
        });

        if (response.ok) {
          const data = await response.json();
          setUser(data);
        } else {
          console.error('Error fetching user data:', await response.text());
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, []);

  if (!user) return <div>Loading...</div>;

  return (
    <div>
      <header className="header d-flex flex-column flex-md-row align-items-center justify-content-between p-3 bg-light">
        <div className="d-flex align-items-center gap-3">
          {user.image && (
            <img src={`http://localhost:5000${user.image}`} alt={user.username} style={{ borderRadius: '50%', width: '50px', height: '50px' }} />
          )}
          <div>
            <h1 className="h4 mb-0">Welcome, {user.username}</h1>
            {user.companyName && <h2 className="h6 mb-0 text-muted">{user.companyName}</h2>}
          </div>
        </div>
      </header>
      <nav className="navbar navbar-expand-lg navbar-light bg-primary">
        <div className="container-fluid">
          <Link className="navbar-brand text-white" to="/">{user.companyName || 'Home'}</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav me-auto">
              <li className="nav-item">
                <span className="nav-link"> </span>
              </li>
            </ul>
            <ul className="navbar-nav">
            <li className="nav-item">
                <Link className="nav-link text-white" to="/clerk/AddClass">Add Class</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/clerk/CreateStudent">Create Student</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/clerk/CreateStaff">Create Staff</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white" to="/">Log Out</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      <div className="content p-3">
        {/* Content will go here */}
      </div>
      <div className="n1 mt-4 p-3">
        <h2 className="mobile-text-center mb-3">About Us:-</h2>
        <div className="about-content">
          <p> In student and teacher-friendly websites both students and teachers, offering educational resources, tools, and support for learning and teaching.
          Here are some key features that make a website student and teacher-friendly:A good student-teacher website should have an intuitive and easy-to-navigate interface.
          It should be organized in a way that makes it simple for both students and teachers to find the information they need.
          The website should provide a wide range of educational resources such as lesson plans, worksheets, videos, interactive activities, and study materials. 
          These resources should be well-structured and aligned with the curriculum.Websites that facilitate communication and collaboration between students and teachers are valuable.
          Features like discussion forums, messaging systems, and shared document spaces can enhance the learning experience.
          A good student-teacher website should include tools for assessments, quizzes, and grading. 
          It should also allow for feedback mechanisms that help both students and teachers track progress and improve learning outcomes.
          Websites that allow users to customize their learning experience based on their individual needs and preferences are beneficial. Personalized learning paths, adaptive learning technologies, 
          and tailored recommendations can enhance engagement and learning outcomes.
          objectives of our websites are Teachers can upload syllabus , notes and assignment making it convenient for students to access all the necessary information in one place.
          Students can use the website to view the course materials , stay organized thought the semester
          Facilitate collaboration between students and teachers.
          Ensure that the website is accessible on various devices.Allows teachers to give suggestions and feedbacks
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
