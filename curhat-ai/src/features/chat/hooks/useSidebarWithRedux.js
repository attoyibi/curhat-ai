import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useRef } from 'react';
import { toggleSidebar, closeSidebar, fetchUserSessions, addUserSessions } from '../redux/sidebarSlice';

const useSidebar = () => {
    const dispatch = useDispatch();
    const { isSidebarOpen, userSessions, isLoading, error } = useSelector((state) => state.sidebar);
    const sidebarRef = useRef(null);

    // Toggle the sidebar
    const toggleSidebarState = () => {
        dispatch(toggleSidebar());
    };

    // Close the sidebar
    const closeSidebarState = () => {
        dispatch(closeSidebar());
    };

    // Close sidebar if clicking outside
    const handleClickOutside = (event) => {
        if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
            dispatch(closeSidebar());
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
        // const dataUserSession = fetchUserSessions();
        // console.log("dataUserSession", dataUserSession);
        dispatch(fetchUserSessions());
    }, [dispatch]);

    return {
        isSidebarOpen,
        toggleSidebar: toggleSidebarState,
        closeSidebar: closeSidebarState,
        sidebarRef,
        userSessions,
        isLoading,
        error,
    };
};

export default useSidebar;
