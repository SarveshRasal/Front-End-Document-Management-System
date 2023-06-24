import React, { useState, useEffect } from 'react';

const DocumentUsersView = () => {
    const [documents, setDocuments] = useState([]);
    const [selectedDocument, setSelectedDocument] = useState('');
    const [documentUsers, setDocumentUsers] = useState([]);

    // Fetch the list of documents from the API
    useEffect(() => {
        const fetchDocuments = async () => {
            try {
                const response = await fetch('http://localhost:8000/files/');
                const data = await response.json();
                setDocuments(data.files);
            } catch (error) {
                console.error('Error fetching documents:', error);
            }
        };

        fetchDocuments();
    }, []);

    // Fetch the users associated with the selected document from the API
    useEffect(() => {
        const fetchDocumentUsers = async () => {
            try {
                const response = await fetch(`http://localhost:8000/associated_users/${selectedDocument}/`);
                const data = await response.json();
                setDocumentUsers(data.associated_users);
                console.log(documentUsers)
            } catch (error) {
                console.error('Error fetching document users:', error);
            }
        };

        if (selectedDocument) {
            fetchDocumentUsers();
        }
    }, [selectedDocument]);

    return (
        <div>
            <h2>Document Users View</h2>
            <div>
                <label htmlFor="document">Select a document:</label>
                <select
                    id="document"
                    value={selectedDocument}
                    onChange={(e) => setSelectedDocument(e.target.value)}
                    required
                >
                    <option value="">Select a document</option>
                    {documents.map((document) => (
                        <option key={document._id} value={document._id}>
                            {document.file_path.split('\\').pop()}
                        </option>
                    ))}
                </select>
            </div>
            {selectedDocument && (
                <div>
                    <h3>Associated Users:</h3>
                    {documentUsers.length > 0 ? (
                        <ul>
                            {documentUsers.map((user) => (
                                <li key={user._id}>
                                    User Email: {user.Email}, Priority: {user.priority}, {user.approval_status ? 'Approved' : 'Not Approved'}
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>No users associated with this document.</p>
                    )}
                </div>
            )}
        </div>
    );
};

export default DocumentUsersView;
