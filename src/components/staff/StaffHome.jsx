import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const StaffHome = () => {
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
                <Link className="nav-link text-white" to="/staff/uploadNotes">Upload Notes</Link>
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
    </div>
  );
};

export default StaffHome;
