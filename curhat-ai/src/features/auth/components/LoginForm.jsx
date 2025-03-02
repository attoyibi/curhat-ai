// src/features/auth/components/LoginForm.jsx
import React, { useState } from 'react';
import usePasswordVisibility from '../hooks/usePasswordVisibility'
import { useAuth } from '../hooks';
const LoginForm = () => {
    const { login, logout, error, loading } = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { isVisible, toggleVisibility } = usePasswordVisibility();
    const handleSubmit = (e) => {
        e.preventDefault();
        login(email, password);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm dark:bg-neutral-900 dark:border-neutral-700">
                <div className="p-4 sm:p-7">
                    <div className="text-center">
                        <h1 className="block text-2xl font-bold text-gray-800 dark:text-white">Sign in</h1>
                        <p className="mt-2 text-sm text-gray-600 dark:text-neutral-400">
                            Don&apos;t have an account yet?{' '}
                            <a
                                className="text-blue-600 decoration-2 hover:underline focus:outline-none focus:underline font-medium dark:text-blue-500"
                                href="/register"
                            >
                                Sign up here
                            </a>
                        </p>
                    </div>

                    <div className="mt-5">
                        {/* <form onSubmit={handleSubmit}> */}
                        <div className="grid gap-y-4">
                            <div>
                                <label htmlFor="email" className="block text-sm mb-2 dark:text-white">
                                    Email address
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    className="border py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                />
                                {/* {errors.email && <p className="text-xs text-red-600 mt-2">{errors.email}</p>} */}
                            </div>

                            <div>
                                <label htmlFor="password" className="block text-sm mb-2 dark:text-white">
                                    Password
                                </label>
                                <div className="flex relative">
                                    <input
                                        type={isVisible ? 'text' : 'password'}
                                        id="password"
                                        name="password"
                                        className="border py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={toggleVisibility}
                                        className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 dark:text-neutral-400"
                                    >
                                        {isVisible ? (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5"
                                                fill="currentColor"
                                                viewBox="0 0 24 24"
                                            >
                                                <path d="M12 4.5c-4.68 0-8.84 2.91-10.43 7.18-.05.15-.05.31 0 .46 1.6 4.27 5.76 7.18 10.43 7.18s8.83-2.91 10.43-7.18c.05-.15.05-.31 0-.46C20.83 7.41 16.67 4.5 12 4.5zm0 12c-2.9 0-5.45-1.66-6.88-4.5 1.42-2.83 3.97-4.5 6.88-4.5s5.45 1.66 6.88 4.5c-1.42 2.83-3.97 4.5-6.88 4.5z" />
                                                <circle cx="12" cy="12" r="1.5" />
                                            </svg>
                                        ) : (
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                className="h-5 w-5"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                                strokeWidth="2"
                                            >
                                                <path d="M17.94 17.94A10.94 10.94 0 0 1 12 19C7.82 19 3.94 15.82 2.1 12A10.94 10.94 0 0 1 4.06 6.06M1 1l22 22" />
                                            </svg>
                                        )}
                                    </button>
                                </div>

                                {error && <p className="text-red-500">{error}</p>}
                                {/* {errors.password && <p className="text-xs text-red-600 mt-2">{errors.password}</p>} */}
                            </div>
                            {/* {serverError && <p className="text-xs text-red-600 mt-2">{serverError}</p>} */}

                            <div>
                                <button
                                    type="submit"
                                    className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-gray-200 bg-blue-600 text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none dark:bg-blue-500 dark:border-blue-500 dark:hover:bg-blue-600 dark:focus:bg-blue-600"
                                    disabled={loading}
                                >
                                    {loading ? 'Signing in...' : 'Sign In'}
                                </button>
                            </div>
                        </div>
                        {/* </form> */}
                    </div>
                </div>
            </div>
        </form>
    );
};

export default LoginForm;
