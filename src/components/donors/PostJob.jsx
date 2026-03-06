import React, { useState } from 'react';

const PostJob = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [skills, setSkills] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const username = localStorage.getItem('username'); // Assuming username is stored in localStorage

    try {
      const response = await fetch('http://localhost:5000/api/jobs/postJob', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ title, description, skills, username }),
      });

      const data = await response.json();
      if (response.ok) {
        alert('Job added successfully');
        // Handle successful job addition
      } else {
        alert(data.error || 'Failed to add job');
      }
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  return (

    <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="col-md-8 col-lg-6">
    <div className="card shadow-lg">
      <h3 className="card-title text-center mb-4">Post a Job</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <input
            type="text"
            name="title"
            placeholder="Job Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <textarea
            name="description"
            placeholder="Job Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <input
            type="text"
            name="skills"
            placeholder="Required Skills"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <div className="text-center">
          <button type="submit" className="btn btn-primary rounded-5">
            Post Job
          </button>
        </div>
      </form>
    </div>
    </div>
  </div>
    
  );
};

export default PostJob;
