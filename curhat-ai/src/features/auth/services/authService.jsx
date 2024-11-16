// src/features/auth/services/authService.js
import supabase from '../../../lib/supabaseClient';

const login = async (email, password) => {
    const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    return error ? { success: false, message: error.message } : { success: true };
};

const logout = async () => {
    await supabase.auth.signOut();
};

export default {
    login,
    logout,
};
