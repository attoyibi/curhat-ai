import { useState, useEffect } from "react";

const useDarkMode = () => {
    const [darkMode, setDarkMode] = useState(() => {
        // Check for saved user preference in localStorage or default to false
        const savedMode = localStorage.getItem("darkMode");
        return savedMode ? JSON.parse(savedMode) : false;
    });

    useEffect(() => {
        // Update the document class based on darkMode state
        if (darkMode) {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }

        // Save the dark mode state to localStorage
        localStorage.setItem("darkMode", JSON.stringify(darkMode));
    }, [darkMode]);

    const toggleDarkMode = () => {
        setDarkMode(!darkMode);
    };

    return { darkMode, toggleDarkMode };
};

export default useDarkMode;
