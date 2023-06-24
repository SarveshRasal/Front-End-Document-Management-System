import React, { useState } from 'react';
import axios from 'axios';
import config from "./config";
import './Login.css'

const Login = ({ onLoginSuccess }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user_id, setUser_id] = useState();

    const handleLogin = async () => {
        try {
            const response = await axios.post(`${config.backendUrl}/login/`, { Email: email, Password: password });
            // Handle the response from the backend
            //console.log(response.data);
            setUser_id(response.data.user_id);
            onLoginSuccess(response.data.user_id, response.data.Email);
            // Pass user_id to the callback function
        } catch (error) {
            // Handle error
            console.error(error);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2 className="login-heading">Sign in</h2>
                <input type="text" className="input-field" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} />
                <input type="password" className="input-field" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} />
                <button className="login-button" onClick={handleLogin}>Sign in</button>
            </div>
        </div>
    );
};

export default Login;
