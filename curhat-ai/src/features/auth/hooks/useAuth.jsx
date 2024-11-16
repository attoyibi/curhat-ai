// src/features/auth/hooks/useAuth.js
import { useState } from 'react';
import supabase from '../../../lib/supabaseClient';

const useAuth = () => {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const login = async (email, password) => {
        setLoading(true);
        setError('');
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) {
                setError(error.message);
                setLoading(false);
                return false;
            }
            return true;
        } catch (err) {
            setError('An unexpected error occurred.');
            setLoading(false);
            return false;
        }
    };

    const logout = async () => {
        await supabase.auth.signOut();
    };

    return {
        login,
        logout,
        error,
        loading,
    };
};

export default useAuth;
