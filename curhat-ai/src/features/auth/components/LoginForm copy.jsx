// src/features/auth/components/LoginForm.jsx
import React, { useState } from 'react';

const LoginForm = ({ onLogin, error, loading }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        onLogin(email, password);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-2 mt-1 border rounded-md"
                    placeholder="Enter your email"
                />
            </div>
            <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="w-full px-4 py-2 mt-1 border rounded-md"
                    placeholder="Enter your password"
                />
            </div>
            <button
                type="submit"
                className="w-full px-4 py-2 font-semibold text-white bg-indigo-600 rounded-md"
                disabled={loading}
            >
                {loading ? 'Logging in...' : 'Login'}
            </button>
            {error && <p className="text-red-500">{error}</p>}
        </form>
    );
};

export default LoginForm;
