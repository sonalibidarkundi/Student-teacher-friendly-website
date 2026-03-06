// src/components/CreateStudent.jsx

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const CreateStudent = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [fullname, setFullname] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [address, setAddress] = useState('');
    const [classId, setClassId] = useState('');
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

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/clerk/students', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password, fullname, mobile_number: mobileNumber, address, class_id: classId })
            });
            if (response.ok) {
                const newStudent = await response.json();
                alert('Student created:', newStudent);
                setUsername('');
                setPassword('');
                setFullname('');
                setMobileNumber('');
                setAddress('');
                setClassId('');
            } else {
                console.error('Failed to create student');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4" style={{ width: '24rem' }}>
                <h2 className="card-title text-center">Create Student</h2>
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
                            onChange={(e) =>{
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
                        <label htmlFor="mobileNumber">Reg no.:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="mobileNumber"
                          
                            value={mobileNumber}
                            onChange={(e) => setMobileNumber(e.target.value)}
                            required
                            pattern="[a-zA-Z0-9]*" // Optional: HTML5 attribute for pattern validation

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
                            value={classId}
                            onChange={(e) => setClassId(e.target.value)}
                            required
                        >
                            <option value="">Select a class</option>
                            {classes.map(cls => (
                                <option key={cls.id} value={cls.id}>{cls.name}</option>
                            ))}
                        </select>
                    </div>
                
                    <button type="submit" className="btn btn-primary w-100 mt-3">
                        Create Student
                    </button><br></br>

                    <Link className='btn btn-primary mt-5' to="/donor/home">Home</Link>
                </form>
            </div>
        </div>
    );
};

export default CreateStudent;
