import React, { useState, useEffect } from 'react';
import axios from 'axios';
import config from './config';
import './AssociatedDocuments.css';

const AssociatedDocuments = ({ user_id, userEmail }) => {
    const [associatedDocuments, setAssociatedDocuments] = useState([]);

    useEffect(() => {
        // Fetch associated documents when the component mounts
        fetchAssociatedDocuments();
    }, []);

    const fetchAssociatedDocuments = async () => {
        try {
            const response = await axios.get(
                `${config.backendUrl}/associated_documents/${user_id}`
            );
            if (response.data["associated_documents"]) {
                console.log(response.data)
                setAssociatedDocuments(response.data["associated_documents"] || []);
            }
            console.log(associatedDocuments)
        } catch (error) {
            console.error(error);
        }
    };

    const handleApprove = async (document_Id, user_Id, approvalStatus) => {
        try {
            await axios.post(`${config.backendUrl}/status/${document_Id}/${user_Id}`, {
                document_id: document_Id,
                user_id: user_Id,
                approval_status: approvalStatus,
            });
            await fetchAssociatedDocuments();
        } catch (error) {
            console.error(error);
        }
    };

    const getFileNameFromPath = (filePath) => {
        console.error('FilePath:', filePath);
        const parts = filePath.split('\\');
        console.error('Parts:', parts);
        const fileName = parts[parts.length - 1];
        console.error('FileName:', fileName);
        return fileName;
    };

    return (
        <div className="gmail-component">
            <h2 className="gmail-component__subtitle">Document Feed</h2>
            {associatedDocuments.length > 0 ? (
                <ul className="gmail-component__list">
                    {associatedDocuments.map((document) => (
                        <li className="gmail-component__list-item" key={document.document_id}>
                            <a
                                className="gmail-component__document-link"
                                href={`${config.backendUrl}/files/download/${document.document_id}`}>
                                {document.filename || document.file_path.split('\\').pop()}
                            </a>
                            <span
                                className={`gmail-component__status ${
                                    document.approval_status ? 'approved' : 'pending'
                                }`}
                            >
                {document.approval_status ? 'Approved' : 'Pending'}
              </span>
                            <div className="gmail-component__buttons">
                                <button
                                    className="gmail-component__button gmail-component__button--approve"
                                    onClick={() =>
                                        handleApprove(document.document_id, user_id, true)
                                    }
                                >
                                    Approve
                                </button>
                                <button
                                    className="gmail-component__button gmail-component__button--reject"
                                    onClick={() =>
                                        handleApprove(document.document_id, user_id, false)
                                    }
                                >
                                    Reject
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="gmail-component__message">No associated documents found.</p>
            )}
        </div>
    );
};

export default AssociatedDocuments;
