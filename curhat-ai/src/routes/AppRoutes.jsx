// src/routes/AppRoutes.jsx
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import LandingPage from '../pages/LandingPage';
import Login from '../pages/Login';
import { LoginPage as LoginPageWithFeature, LoginForm, RegisterForm } from '../features/auth';
import { WelcomeChat as WelcomeChatFeature } from '../features/chat';
import { NewChatSideBar } from '../features/chat';
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
import Pricing from '../components/Pricing';
import NotFound from '../components/NotFound'
const AppRoutes = () => {
    return (
        <Router>
            <Routes>
                {/* Public Routes with AuthLayout */}
                <Route element={<AuthLayout />}>
                    {/* <Route path="/login" element={<Login />} /> */}
                    <Route path="/login" element={<LoginForm />} />
                    <Route path="/register" element={<RegisterForm />} />
                </Route>

                {/* Public Routes (Landing Page & About Page) */}
                <Route element={<MainLayout />}>
                    <Route path="/home" element={<LandingPage />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/pricing" element={<Pricing />} />
                </Route>

                {/* Protected Routes */}
                <Route element={<ProtectedRoute />}>
                    <Route path="/dashboard" element={<Dashboard />} />
                    {/* <Route path="/chat-v1" element={<ChatPage />} /> */}
                    {/* <Route path="/chat-sidebar" element={<ChatPageSidebar />} /> */}
                    <Route path="/" element={<ChatLayout />} >
                        {/* <Route index element={<WelcomeChat />} /> */}
                        <Route index element={<WelcomeChatFeature />} />
                        <Route path="newChat" element={<WelcomeChatFeature />} />
                        {/* <Route path="chat" element={<NewChatSideBar />} /> */}
                        <Route path="chat/:id" element={<NewChatSideBar />} />
                    </Route >
                </Route>

                {/* Redirect any unknown route to the landing page */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        </Router>
    );
};

export default AppRoutes;
