// src/routes/AppRoutes.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import Login from '../pages/Login';
import About from '../pages/About';
import Dashboard from '../pages/Dashboard';
import ChatPage from '../pages/ChatPage';
import MainLayout from '../layouts/MainLayout';
import AuthLayout from '../layouts/AuthLayout';
import ProtectedRoute from '../components/ProtectedRoute';
import ChatPageSidebar from '../pages/ChatPageSidebar';
import WelcomeChat from '../components/WelcomeChat';
import ChatLayout from '../layouts/ChatLayout';
import ChatNew from '../components/ChatNew';
const AppRoutes = () => {
    return (
        <Router>
            <Routes>

                {/* Public Routes with AuthLayout */}
                <Route element={<AuthLayout />}>
                    <Route path="/login" element={<Login />} />
                </Route>

                {/* Public Routes (Landing Page & About Page) */}
                <Route element={<MainLayout />}>
                    <Route path="/" element={<LandingPage />} />
                    <Route path="/about" element={<About />} />
                </Route>

                {/* Protected Routes */}
                <Route element={<ProtectedRoute />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/chat-v1" element={<ChatPage />} />
                    {/* <Route path="/chat-sidebar" element={<ChatPageSidebar />} /> */}
                    <Route path="/chat" element={<ChatLayout />} >
                        <Route path="welcome" element={<WelcomeChat />} />
                        <Route path="new" element={<ChatNew />} />
                    </Route >
                </Route>

                {/* Redirect any unknown route to the landing page */}
                <Route path="*" element={<Navigate to="/" />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
