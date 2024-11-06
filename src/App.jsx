// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import UserManagement from './components/UserManagement';
import ProductManagement from './components/ProductManagement';
import WingsCafeDashBoard from './components/WingsCafeDashBoard';

const App = () => {
    return (
        <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/dashboard" element={<WingsCafeDashBoard />} />
            <Route path="/usermanagement" element={<UserManagement />} />
            <Route path="/productmanagement" element={<ProductManagement />} />
        </Routes>
    );
};

export default App;
