import React, { useState, useEffect } from 'react';

const UploadFiles = () => {
    const [files, setFiles] = useState([]);
    const [selectedClasses, setSelectedClasses] = useState([]);
    const [classes, setClasses] = useState([]);
    const username = localStorage.getItem('username'); // Get the username from localStorage

    useEffect(() => {
        // Fetch available classes for the logged-in staff member
        const fetchClasses = async () => {
            if (username) {
                const response = await fetch(`http://localhost:5000/api/staff/staffclasses/${username}`);
                const data = await response.json();
                setClasses(data);
            }
        };
        fetchClasses();
    }, [username]);

    const handleFileChange = (e) => {
        setFiles(e.target.files);
    };

    const handleClassChange = (e) => {
        const options = e.target.options;
        const selectedValues = [];
        for (const option of options) {
            if (option.selected) {
                selectedValues.push(option.value);
            }
        }
        setSelectedClasses(selectedValues);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append('username', username);
        formData.append('class_ids', JSON.stringify(selectedClasses));

        for (const file of files) {
            formData.append('files', file);
        }

        try {
            const response = await fetch('http://localhost:5000/api/staff/upload', {
                method: 'POST',
                body: formData
            });

            if (response.ok) {
                alert('Files uploaded successfully');
                setFiles([]);
                setSelectedClasses([]);
            } else {
                console.error('Failed to upload files');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="classId">Classes:</label>
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
            <div className="form-group">
                <label htmlFor="files">Upload Files:</label>
                <input
                    type="file"
                    id="files"
                    multiple
                    onChange={handleFileChange}
                    required
                />
            </div>
            <button type="submit" className="btn btn-primary mt-3">Upload</button>
        </form>
    );
};

export default UploadFiles;
