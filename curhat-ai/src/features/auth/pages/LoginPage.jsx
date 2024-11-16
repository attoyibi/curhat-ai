// src/features/auth/pages/LoginPage.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { LoginForm } from '../index'; // Import from index
import useAuth from '../hooks/useAuth'; // Custom hook untuk login

const LoginPage = () => {
    const [error, setError] = useState('');
    const { login, loading } = useAuth();
    const navigate = useNavigate();

    const handleLogin = async (email, password) => {
        const success = await login(email, password);
        if (success) {
            navigate('/chat/welcome');
        } else {
            setError('Invalid login credentials');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-8 bg-white shadow-md rounded-md">
                <h2 className="text-2xl font-bold text-center text-gray-800">Login Feature</h2>
                <LoginForm onLogin={handleLogin} error={error} loading={loading} />
            </div>
        </div>
    );
};

export default LoginPage;
