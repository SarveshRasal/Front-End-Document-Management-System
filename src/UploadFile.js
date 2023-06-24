import React, { useState } from 'react';
import axios from 'axios';
import './UploadFile.css';

const DocumentUploader = () => {
    const [selectedFile, setSelectedFile] = useState(null);

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (!selectedFile) {
            alert('Please select a file');
            return;
        }

        try {
            const formData = new FormData();
            formData.append('file', selectedFile);

            await axios.post('http://localhost:8000/files/upload/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });

            alert('File uploaded successfully');
            setSelectedFile(null);
        } catch (error) {
            console.error('Error uploading file:', error);
            alert('Failed to upload file');
        }
    };

    return (
        <div>
            <h2>Document Uploader</h2>
            <form onSubmit={handleSubmit}>
                <input type="file" onChange={handleFileChange} />
                <button type="submit">Upload</button>
            </form>
        </div>
    );
};

export default DocumentUploader;
