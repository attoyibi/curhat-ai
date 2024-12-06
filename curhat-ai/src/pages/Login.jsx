// src/pages/Login.jsx -- this page depricated
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import supabase from '../lib/supabaseClient'; // Import Supabase instance

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(''); // State for error messages
    const navigate = useNavigate();

    const handleLogin = async (e) => {
        e.preventDefault();
        setError(''); // Reset error state

        if (!email.includes('@')) {
            alert('Please enter a valid email');
            return;
        }

        try {
            // Menggunakan Supabase untuk autentikasi email dan password
            const { error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                setError('Invalid login credentials');
            } else {
                // Simpan status autentikasi jika berhasil
                localStorage.setItem('isAuthenticated', 'true');
                navigate('/newChat');
            }
        } catch (err) {
            setError('An unexpected error occurred. Please try again.');
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-8 bg-white shadow-md rounded-md">
                <h2 className="text-2xl font-bold text-center text-gray-800">Login</h2>
                {error && <p className="text-center text-red-500">{error}</p>} {/* Display error message */}
                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            placeholder="Enter your email"
                        />
                    </div>
                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            className="w-full px-4 py-2 mt-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            placeholder="Enter your password"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full px-4 py-2 font-semibold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                    >
                        Login
                    </button>
                </form>
                {/* Navigation to Home */}
                <div className="mt-4 text-center">
                    <p className="text-sm text-gray-600">
                        Don't have an account?{' '}
                        <Link to="/register" className="font-medium text-indigo-600 hover:text-indigo-500">
                            Register here
                        </Link>
                    </p>
                    <p className="text-sm text-gray-600">
                        <Link to="/" className="font-medium text-indigo-600 hover:text-indigo-500">
                            Back to Home
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
