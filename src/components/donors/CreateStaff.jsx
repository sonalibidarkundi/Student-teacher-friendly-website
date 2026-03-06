// src/components/CreateStaff.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CreateStaff = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [fullname, setFullname] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [address, setAddress] = useState('');
    const [selectedClasses, setSelectedClasses] = useState([]);
    const [classes, setClasses] = useState([]);

    useEffect(() => {
        // Fetch available classes
        const fetchClasses = async () => {
            const response = await fetch('http://localhost:5000/api/clerk/getAllClasses');
            const data = await response.json();
            setClasses(data);
        };
        fetchClasses();
    }, []);

    const handleClassChange = (e) => {
        const options = e.target.options;
        const selected = [];
        for (let i = 0; i < options.length; i++) {
            if (options[i].selected) {
                selected.push(options[i].value);
            }
        }
        setSelectedClasses(selected);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/clerk/staff', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    username, 
                    password, 
                    fullname, 
                    mobile_number: mobileNumber, 
                    address, 
                    class_ids: selectedClasses // Send array of class IDs
                })
            });
            if (response.ok) {
                const newStaff = await response.json();
                alert('Staff created:', newStaff);
                // Clear form fields
                setUsername('');
                setPassword('');
                setFullname('');
                setMobileNumber('');
                setAddress('');
                setSelectedClasses([]);
            } else {
                console.error('Failed to create staff');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4" style={{ width: '24rem' }}>
                <h2 className="card-title text-center">Create Staff</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password:</label>
                        <input
                            type="password"
                            className="form-control"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            maxLength={8}

                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="fullname">Full Name:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="fullname"
                            value={fullname}
                            onChange={(e) => 
                                {
                                    const value = e.target.value;
                                        if (/^[a-zA-Z\s]*$/.test(value)) {
                                                 setFullname(value);
                                              }
                                             }}
                                  maxLength={30}
                                
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="mobileNumber">Mobile Number:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="mobileNumber"
                            value={mobileNumber}
                            onChange={(e) => {
                                const value = e.target.value;
                                if (/^[987]\d{0,9}$/.test(value)) {  // Ensure it starts with 9, 8, or 7 and limit to 10 digits
                                  setMobileNumber(value);
                              }
                              }}
                              required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Address:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="classId">Class:</label>
                        <select
                            className="form-control"
                            id="classId"
                            multiple
                            value={selectedClasses}
                            onChange={handleClassChange}
                            required
                        >
                            {classes.map(cls => (
                                <option key={cls.id} value={cls.id}>{cls.name}</option>
                            ))}
                        </select>
                    </div>
                    <button type="submit" className="btn btn-primary mt-3">Create Staff</button>

                    <Link className='btn btn-primary mt-3' to="/donor/home" style={{marginLeft:"5px",marginTop:"-100%"}}>Home</Link>
                </form>
            </div>
        </div>
    );
};

export default CreateStaff;
