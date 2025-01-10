// src/hooks/useRegisterForm.js
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import supabase from '../../../lib/supabaseClient';
const useRegister = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        username: '',
        rememberMe: false,
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false); // Track loading state
    const [registerError, setRegisterError] = useState(null); // Track register error message
    const navigate = useNavigate();
    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData({
            ...formData,
            [name]: type === 'checkbox' ? checked : value,
        });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!formData.email) newErrors.email = 'Email is required';
        if (!formData.password) newErrors.password = 'Password is required';
        if (formData.password !== formData.confirmPassword)
            newErrors.confirmPassword = 'Passwords do not match';
        if (!formData.username) newErrors.username = 'Username is required';
        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const newErrors = validateForm();

        if (Object.keys(newErrors).length === 0) {
            setLoading(true);
            setRegisterError(null);

            try {
                // Supabase sign up API
                const { data, error } = await supabase.auth.signUp({
                    email: formData.email,
                    password: formData.password,
                    options: {
                        emailRedirectTo: 'https://curhat-ai.vercel.app/login',
                        data: {
                            username: formData.username, // Metadata tambahan
                        },
                    },
                });


                if (error) {
                    throw error;
                }

                alert("Registration successful! Please verify your email.");
                navigate('/login'); // Redirect to login page
            } catch (error) {
                setRegisterError(error.message || 'Registration failed');
            } finally {
                setLoading(false);
            }
        } else {
            setErrors(newErrors);
        }
    };

    return {
        formData,
        errors,
        handleChange,
        handleSubmit,
        loading,
        registerError,
    };
};

export default useRegister;