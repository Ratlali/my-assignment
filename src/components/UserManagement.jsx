// src/components/UserManagement.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const UserManagement = () => {
    const [newUser, setNewUser] = useState({ username: '', password: '' });
    const [deleteUsername, setDeleteUsername] = useState('');
    const [users, setUsers] = useState([]);

    useEffect(() => {
        // Load users from local storage
        const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
        setUsers(storedUsers);
    }, []);

    const addUser = (event) => {
        event.preventDefault();
        const storedUsers = JSON.parse(localStorage.getItem('users')) || [];

        // Check if the username already exists
        if (storedUsers.find(u => u.username === newUser.username)) {
            alert('Username already exists');
            return;
        }

        const user = { id: Date.now(), ...newUser };
        storedUsers.push(user);
        localStorage.setItem('users', JSON.stringify(storedUsers));
        alert('User added successfully');
        setNewUser({ username: '', password: '' }); // Clear the input fields
        setUsers(storedUsers); // Update the local state to reflect new user
    };

    const deleteUser = (event) => {
        event.preventDefault();
        const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
        const filteredUsers = storedUsers.filter(user => user.username !== deleteUsername);
        
        if (filteredUsers.length === storedUsers.length) {
            alert('User not found');
            return;
        }

        localStorage.setItem('users', JSON.stringify(filteredUsers));
        alert('User deleted successfully');
        setDeleteUsername(''); // Clear the delete username
        setUsers(filteredUsers); // Update the local state to reflect deletion
    };

    return (
        <div>
            <h2>User Management</h2>

            <form onSubmit={addUser}>
                <input 
                    type="text" 
                    value={newUser.username} 
                    onChange={(e) => setNewUser({ ...newUser, username: e.target.value })} 
                    placeholder="Username" 
                    required 
                />
                <input 
                    type="password" 
                    value={newUser.password} 
                    onChange={(e) => setNewUser({ ...newUser, password: e.target.value })} 
                    placeholder="Password" 
                    required 
                />
                <button type="submit">Add User</button>
            </form>

            <form onSubmit={deleteUser}>
                <input 
                    type="text" 
                    value={deleteUsername} 
                    onChange={(e) => setDeleteUsername(e.target.value)} 
                    placeholder="Username to delete" 
                    required 
                />
                <button type="submit">Delete User</button>
            </form>

            <h3>Current Users</h3>
            <ul>
                {users.length > 0 ? (
                    users.map(user => (
                        <li key={user.id}>{user.username}</li>
                    ))
                ) : (
                    <p>No users found.</p>
                )}
            </ul>

            {/* Back button to navigate to the previous page */}
            <Link to="/dashboard">Back to Dashboard</Link>
        </div>
    );
};

export default UserManagement;
