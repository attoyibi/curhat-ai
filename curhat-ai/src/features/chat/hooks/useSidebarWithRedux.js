import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef, useState } from 'react';
import { toggleSidebar, closeSidebar, fetchUserSessions, addUserSessions, clearUserSessions, clearUserSettingComponent, toggleUserSettingsReducer } from '../redux/sidebarSlice';
import { useNavigate } from 'react-router-dom';
import supabase from '../../../lib/supabaseClient';
const useSidebar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isSidebarOpen, userSessions, isLoading, error, clearUserSessions, isShowUserSettings } = useSelector((state) => state.sidebar);
    const sidebarRef = useRef(null);
    // const [showUserSettings, setShowUserSettings] = useState(false);

    // Toggle the sidebar
    const toggleSidebarState = () => {
        dispatch(toggleSidebar());
    };

    // Close the sidebar
    const closeSidebarState = () => {
        dispatch(closeSidebar());
    };
    const toggleUserSettings = () => {
        // setShowUserSettings(!showUserSettings);
        dispatch(toggleUserSettingsReducer());
    };
    // Logout user
    const logoutUser = async () => {
        try {
            const { error } = await supabase.auth.signOut(); // Sign out from Supabase
            if (error) throw error;

            // Clear Redux state
            // dispatch(clearUserSessions());
            // Clear localStorage
            localStorage.clear();
            navigate('/home');
        } catch (err) {
            console.error("Logout error:", err.message);
        }
    };

    // Close sidebar if clicking outside
    const handleClickOutside = (event) => {
        if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
            dispatch(closeSidebar());
            dispatch(clearUserSettingComponent());
        }
    };

    // Close sidebar on key press (e.g., ESC key)
    const handleKeyPress = (event) => {
        if (event.key === 'Escape') {
            dispatch(closeSidebar());
        }
    };

    // Effect for handling outside clicks and key presses
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleKeyPress);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, []);

    // Fetch user sessions when the component mounts
    useEffect(() => {
        dispatch(fetchUserSessions());
    }, [dispatch]);

    return {
        isSidebarOpen,
        toggleSidebar: toggleSidebarState,
        closeSidebar: closeSidebarState,
        logoutUser,
        toggleUserSettings,
        sidebarRef,
        userSessions,
        isLoading,
        error,
        isShowUserSettings
    };
};

export default useSidebar;
