import React, {useState} from 'react';
import Login from './Login';
import AssociatedDocuments from './AssociatedDocuments';
import UploadFile from './UploadFile';
import Associations from './Associations';
import UserManipulation from './UserManipulation';
import DocumentAssociations from "./DocumentAssociations";

const App = () => {
    const [loggedIn, setLoggedIn] = useState(false);
    const [userId, setUserId] = useState(null);
    const [email, setEmail] = useState('');

    const handleLoginSuccess = (user_id, user_email) => {
        setLoggedIn(true);
        setUserId(user_id);
        setEmail(user_email);
    };

    const handleLogout = () => {
        setLoggedIn(false);
        setUserId(null);
        setEmail('');
    };

    return (
        <div>
            <h1>Document Management System</h1>
            {loggedIn ? (
                <div>
                    <div>Signed in as: {email}</div>
                    <button onClick={handleLogout}>Logout</button>
                    {email === 'SuperUser' && <UserManipulation />} {/* Conditionally render UserManipulation */}
                    <AssociatedDocuments user_id={userId} />
                    <div>
                        <h2>
                            View User Associations of a Document
                        </h2>
                        <DocumentAssociations/>
                    </div>
                    <div>
                        <h2>Upload Document</h2>
                        <UploadFile />
                    </div>
                    <div>
                        <h2>Create Associations</h2>
                        <Associations />
                    </div>
                </div>
            ) : (
                <Login onLoginSuccess={handleLoginSuccess} />
            )}
        </div>
    );
};

export default App;
