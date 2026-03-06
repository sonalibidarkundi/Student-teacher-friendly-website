import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { Link } from 'react-router-dom';

const CreateClass = () => {
    const [name, setName] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/clerk/classes', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name })
            });
            if (response.ok) {
                const newClass = await response.json();
                alert('Class created:', newClass);
                setName(''); // Clear the input field
            } else {
                console.error('Failed to create class');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className="d-flex justify-content-center align-items-center vh-100">
            <div className="card p-4" style={{ width: '24rem' }}>
                <h2 className="card-title text-center">Create Class</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="className">Class Name:</label>
                        <input
                            type="text"
                            className="form-control"
                            id="className"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <button type="submit" className="btn btn-primary w-100 mt-3">
                        Create Class
                    </button>
                    <Link className='btn btn-primary mt-5' to="/donor/home">Home</Link>
                </form>
            </div>
        </div>
    );
};

export default CreateClass;
