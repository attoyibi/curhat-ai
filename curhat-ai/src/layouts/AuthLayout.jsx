// src/layouts/AuthLayout.jsx
import React from 'react';
import { Outlet } from 'react-router-dom';

const AuthLayout = () => {
    return (
        <div className="flex items-center justify-center ">
            {/* Main Auth Content */}
            <div className="w-full">
                {/* This will render the child routes like Login or Register */}
                <Outlet />
            </div>
        </div>
    );
};

export default AuthLayout;
