// ApplyJob.js
import React, { useState } from 'react';

const ApplyJob = () => {
  const [skills, setSkills] = useState('');
  const [jobs, setJobs] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/users/search', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ skills }),
      });
      const data = await response.json();
      if (response.ok) {
        setJobs(data);
      } else {
        alert(data.error || 'Failed to search jobs');
      }
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  const handleApply = async (jobId) => {
    const username = localStorage.getItem('username'); // Assuming username is stored in localStorage

    try {
      const response = await fetch('http://localhost:5000/api/users/apply', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ jobId, username }),
      });
      const data = await response.json();
      if (response.ok) {
        alert('Application submitted successfully');
      } else {
        alert(data.error || 'Failed to apply for job');
      }
    } catch (error) {
      alert('Error: ' + error.message);
    }
  };

  return (
    <div className="container mt-5">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h3>Search and Apply for Jobs</h3>
        <a href="/receiver/ReceiverHome" className="btn btn-primary">Back to Home</a>
      </div>
      <form onSubmit={handleSearch}>
        <div className="mb-3">
          <input
            type="text"
            name="skills"
            placeholder="Enter skills"
            value={skills}
            onChange={(e) => setSkills(e.target.value)}
            required
            className="form-control"
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Search Jobs
        </button>
      </form>
      <div className="mt-4">
        {jobs.length > 0 ? (
          <ul className="list-group">
            {jobs.map((job) => (
              <li key={job.id} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <h5>{job.title}</h5>
                  <p>{job.description}</p>
                  <p><strong>Skills:</strong> {job.skills}</p>
                </div>
                <button onClick={() => handleApply(job.id)} className="btn btn-success">
                  Apply
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No jobs found</p>
        )}
      </div>
    </div>
  );
};

export default ApplyJob;
