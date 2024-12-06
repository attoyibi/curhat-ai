import React from "react";
import { Link } from "react-router-dom";

const NotFound = () => {
    return (
        <main className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="text-center">
                {/* Content */}
                <div className="space-y-4">
                    <h1 className="text-6xl font-bold text-gray-900">404</h1>
                    <h2 className="text-2xl font-semibold text-gray-700">Page not found</h2>
                    <p className="text-gray-500">Sorry, the page you're looking for cannot be found.</p>
                    <div>
                        <Link to="/home">
                            <button
                                type="button"
                                className="inline-flex items-center px-4 py-2 text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <svg
                                    className="w-5 h-5 mr-2"
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <path d="M12 19L5 12L12 5"></path>
                                    <path d="M19 12H5"></path>
                                </svg>
                                Back to home
                            </button>
                        </Link>
                    </div>
                </div>
                {/* End Content */}
            </div>
        </main>
    );
};

export default NotFound;
