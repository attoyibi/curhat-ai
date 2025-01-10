import React from 'react';
import { Navigate } from 'react-router-dom';
import { Outlet } from 'react-router-dom';

const ProtectedRoute = () => {
    const isAuthenticated = localStorage.getItem('isAuthenticated'); // Simulasi autentikasi
    return isAuthenticated ? <Outlet /> : <Navigate to="/home" />;
};

export default ProtectedRoute;
