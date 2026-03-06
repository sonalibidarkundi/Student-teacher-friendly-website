import React, { useEffect, useState } from 'react';

const ViewApplicants = () => {
  const [applications, setApplications] = useState([]);
  const username = localStorage.getItem('username');

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/jobs/applications', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username }),
        });
        const data = await response.json();

        if (response.ok) {
          console.log('Applications data:', data);
          setApplications(data);
        } else {
          alert(data.error || 'Failed to fetch applications');
        }
      } catch (error) {
        alert('Error: ' + error.message);
      }
    };

    fetchApplications();
  }, [username]);

  return (
    <div className="container mt-5">
      <h3>Applications for Username: {username}</h3>
      {applications.length > 0 ? (
        <ul className="list-group">
          {applications.map((application) => (
            <li key={application.id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <p><strong>Job Title:</strong> {application.title}</p>
                <p><strong>Job Applied:</strong> {application.username}</p>
                <p><strong>Job Description:</strong> {application.description}</p>
                <p><strong>Status:</strong> {application.status}</p>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No applications yet</p>
      )}
    </div>
  );
};

export default ViewApplicants;
