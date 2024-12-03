import { useState, useRef, useEffect } from 'react';
import supabase from '../../../lib/supabaseClient';

const useSidebar = () => {
    const [isSidebarOpen, setSidebarOpen] = useState(false);
    const [userSessions, setUserSessions] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const sidebarRef = useRef(null);

    // Toggle the sidebar's open/close state
    const toggleSidebar = () => {
        setSidebarOpen(prev => !prev);
    };

    // Close the sidebar
    const closeSidebar = () => {
        setSidebarOpen(false);
    };

    // Close the sidebar if clicking outside of it
    const handleClickOutside = (event) => {
        if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
            closeSidebar();
        }
    };

    // Close the sidebar on key press (e.g., ESC key)
    const handleKeyPress = (event) => {
        if (event.key === 'Escape') {
            closeSidebar();
        }
    };

    // Fetch user sessions from Supabase
    const getUserSessions = async () => {
        setIsLoading(true);
        try {
            // Retrieve the current session
            const { data: { session }, error: sessionError } = await supabase.auth.getSession();

            if (sessionError) {
                console.error('Error retrieving session:', sessionError);
                return null;
            }

            // Check if a user is logged in
            if (!session) {
                console.log('No user session found.');
                return null;
            }

            // Fetch the user sessions (replace 'sessions' with your actual table name)
            const { data, error } = await supabase
                .from('sessions')
                .select('*')
                .eq('user_id', session.user.id); // Filter by the logged-in user's ID

            if (error) {
                console.error('Error fetching user sessions:', error);
                return null;
            }

            setUserSessions(data); // Store fetched sessions in state
            return data;
        } catch (error) {
            console.error('Error during session fetching:', error);
            return null;
        } finally {
            setIsLoading(false);
        }
    };

    // Fetch and log user sessions
    const fetchUserSessions = async () => {
        const sessions = await getUserSessions();
        console.log('User sessions:', sessions);
    };

    // Effect for handling outside clicks and key presses
    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleKeyPress);

        // Clean up event listeners on component unmount
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleKeyPress);
        };
    }, []);

    // Fetch sessions initially when the hook is used
    useEffect(() => {
        getUserSessions();
    }, []);

    return {
        isSidebarOpen,
        toggleSidebar,
        sidebarRef,
        userSessions,
        isLoading,
        fetchUserSessions,
    };
};

export default useSidebar;
