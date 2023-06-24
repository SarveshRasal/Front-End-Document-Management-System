import React, { useState, useEffect } from 'react';

const DocumentAssociationForm = () => {
    const [documents, setDocuments] = useState([]);
    const [users, setUsers] = useState([]);
    const [selectedDocument, setSelectedDocument] = useState('');
    const [selectedUser, setSelectedUser] = useState('');
    const [priority, setPriority] = useState('');
    const [associationType, setAssociationType] = useState('association');

    // Fetch the list of documents and users from the API
    useEffect(() => {
        const fetchDocumentsAndUsers = async () => {
            try {
                const documentsResponse = await fetch('http://localhost:8000/files/');
                const documentsData = await documentsResponse.json();
                setDocuments(documentsData.files);

                const usersResponse = await fetch('http://localhost:8000/users/');
                const usersData = await usersResponse.json();
                setUsers(usersData.users);
            } catch (error) {
                console.error('Error fetching documents and users:', error);
            }
        };

        fetchDocumentsAndUsers();
    }, []);

    // Handle form submission for association or disassociation
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (selectedDocument && selectedUser) {
            if (associationType === 'association') {
                // Make an API request to associate the selected document and user with the priority level
                try {
                    const response = await fetch(`http://localhost:8000/associate/${selectedDocument}/${selectedUser}`, {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify({ document_id: selectedDocument, user_id: selectedUser, priority }),
                    });

                    if (response.ok) {
                        // Association successful
                        console.log('Association created successfully');
                        // Reset form fields
                        setSelectedDocument('');
                        setSelectedUser('');
                        setPriority('');
                        window.location.reload();
                    } else {
                        // Association failed
                        console.error('Failed to create association');
                        window.location.reload();
                    }
                } catch (error) {
                    console.error('Error creating association:', error);
                    window.location.reload();
                }
            } else if (associationType === 'disassociation') {
                // Make an API request to disassociate the selected document and user
                try {
                    const response = await fetch(`http://localhost:8000/disassociate/${selectedDocument}/${selectedUser}`, {
                        method: 'DELETE',
                    });

                    if (response.ok) {
                        // Disassociation successful
                        console.log('Disassociation successful');
                        // Reset form fields
                        setSelectedDocument('');
                        setSelectedUser('');
                        setPriority('');
                        window.location.reload();
                    } else {
                        // Disassociation failed
                        console.error('Failed to disassociate');
                        window.location.reload();
                    }
                } catch (error) {
                    console.error('Error disassociating:', error);
                    window.location.reload();
                }
            }
        }
    };

    return (
        <div>
            <h2>Document Association Form</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="document">Select a document:</label>
                    <select id="document" value={selectedDocument} onChange={(e) => setSelectedDocument(e.target.value)} required>
                        <option value="">Select a document</option>
                        {documents.map((document) => (
                            <option key={document._id} value={document._id}>
                                {document.file_path.split('\\').pop()}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="user">Select a user:</label>
                    <select id="user" value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)} required>
                        <option value="">Select a user</option>
                        {users.map((user) => (
                            <option key={user._id} value={user._id}>
                                {user.Email}
                            </option>
                        ))}
                    </select>
                </div>
                <div>
                    <label htmlFor="priority">Select priority level:</label>
                    <input type="number" id="priority" value={priority} onChange={(e) => setPriority(e.target.value)} required />
                </div>
                <div>
                    <label htmlFor="associationType">Association Type:</label>
                    <select id="associationType" value={associationType} onChange={(e) => setAssociationType(e.target.value)}>
                        <option value="association">Association</option>
                        <option value="disassociation">Disassociation</option>
                    </select>
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default DocumentAssociationForm;
