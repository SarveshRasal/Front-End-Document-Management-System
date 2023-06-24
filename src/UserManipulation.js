import React, { useState, useEffect } from 'react';
import axios from 'axios';

const UserManipulation = () => {
    const [name, setName] = useState('');
    const [designation, setDesignation] = useState('');
    const [office, setOffice] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [users, setUsers] = useState([]);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get('http://localhost:8000/users/');
            setUsers(response.data.users);
        } catch (error) {
            console.error(error);
        }
    };

    const addUser = async () => {
        const userData = {
            Name: name,
            Designation: designation,
            Office: office,
            Email: email,
            Password: password,
        };

        try {
            await axios.post('http://localhost:8000/users/add', {
                List_Of_User: [userData],
            });
            fetchUsers();
            // Reset form fields
            setName('');
            setDesignation('');
            setOffice('');
            setEmail('');
            setPassword('');
        } catch (error) {
            console.error(error);
        }
    };

    const removeUser = async (userId) => {
        try {
            await axios.delete(`http://localhost:8000/users/delete/${userId}`);
            fetchUsers();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div>
            <h2>User Manipulation</h2>
            <div>
                <h3>Add User</h3>
                <form onSubmit={addUser}>
                    <input
                        type="text"
                        placeholder="Name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Designation"
                        value={designation}
                        onChange={(e) => setDesignation(e.target.value)}
                        required
                    />
                    <input
                        type="text"
                        placeholder="Office"
                        value={office}
                        onChange={(e) => setOffice(e.target.value)}
                        required
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button type="submit">Add User</button>
                </form>
            </div>
            <div>
                <h3>Remove User</h3>
                <ul>
                    {users.map((user) => (
                        <li key={user._id}>
                            {user.Name} - {user.Email}{' '}
                            <button onClick={() => removeUser(user._id)}>Remove</button>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default UserManipulation;
