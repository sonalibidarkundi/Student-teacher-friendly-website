import React, { useEffect, useState } from 'react';

const DownloadFiles = () => {
    const [files, setFiles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const username = localStorage.getItem('username'); // Get the username from localStorage

    const fetchStudentDetails = async (username) => {
        try {
            const response = await fetch(`http://localhost:5000/api/staff/studetails/${username}`);
            if (!response.ok) {
                throw new Error('Failed to fetch student details');
            }
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error fetching student details:', error);
            return null;
        }
    };

    useEffect(() => {
        const fetchFiles = async () => {
            if (!username) {
                setError('Username is not available');
                return;
            }

            setLoading(true);
            setError(null);

            const studentDetails = await fetchStudentDetails(username);
            if (!studentDetails) {
                setError('Failed to fetch student details');
                setLoading(false);
                return;
            }

            const { id: studentId } = studentDetails;

            try {
                const response = await fetch('http://localhost:5000/api/staff/download', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ studentId })
                });

                const data = await response.json();

                if (Array.isArray(data.files)) {
                    setFiles(data.files);
                } else {
                    setFiles([]);
                }
            } catch (error) {
                console.error('Error fetching files:', error);
                setError('Failed to fetch files');
                setFiles([]);
            }

            setLoading(false);
        };

        fetchFiles();
    }, [username]);

    const handleDownload = async () => {
        setLoading(true);
        setError(null);
        const studentDetails = await fetchStudentDetails(username);
        if (!studentDetails) {
            setError('Failed to fetch student details');
            setLoading(false);
            return;
        }

        const { id: studentId } = studentDetails;

        try {
            const response = await fetch('http://localhost:5000/api/staff/download', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ studentId })
            });
            const data = await response.json();
            if (Array.isArray(data.files)) {
                setFiles(data.files);
            } else {
                setFiles([]);
            }
        } catch (error) {
            console.error('Error fetching files:', error);
            setError('Failed to fetch files');
            setFiles([]);
        }
        setLoading(false);
    };

    return (
        <div>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <h2>Download Files</h2>
                <a href="/receiver/ReceiverHome" className="btn btn-primary">Back to Home</a>
            </div>
            <button onClick={handleDownload} disabled={loading}>
                {loading ? 'Loading...' : 'Show Files'}
            </button>
            {error && <p>Error: {error}</p>}
            {files.length > 0 ? (
                <ul>
                    {files.map((file, index) => (
                        <li key={index}>
                            <a href={`http://localhost:5000/${file.file_path}`} download>
                                {file.file_path.split('/').pop()}
                            </a>
                        </li>
                    ))}
                </ul>
            ) : (
                !loading && <p>No files available</p>
            )}
        </div>
    );
};

export default DownloadFiles;