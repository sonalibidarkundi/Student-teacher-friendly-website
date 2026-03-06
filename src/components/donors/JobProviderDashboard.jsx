// JobProviderDashboard.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const JobProviderDashboard = () => {
  const [applications, setApplications] = useState([]);
  const { jobId } = useParams(); // Get jobId from URL parameters

  useEffect(() => {
    const fetchApplications = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/jobs/applications/${jobId}`);
        const data = await response.json();
        if (response.ok) {
          setApplications(data);
        } else {
          alert(data.error || 'Failed to fetch applications');
        }
      } catch (error) {
        alert('Error: ' + error.message);
      }
    };

    fetchApplications();
  }, [jobId]);

  return (
    <div className="container mt-5">
      <h3>Applications for Job ID: {jobId}</h3>
      {applications.length > 0 ? (
        <ul className="list-group">
          {applications.map((application) => (
            <li key={application.id} className="list-group-item d-flex justify-content-between align-items-center">
              <div>
                <p><strong>Username:</strong> {application.username}</p>
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

export default JobProviderDashboard;
