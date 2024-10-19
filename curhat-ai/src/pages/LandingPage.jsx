import React from 'react'
import { useEffect, useState } from 'react';
import HeroSection from "../components/HeroSection"
import BlogCard from '../components/BlogChard';
export default function LandingPage() {
    // State to manage the current theme (light or dark)
    const [theme, setTheme] = useState("light");

    useEffect(() => {
        // Set the theme in the HTML root element
        document.documentElement.setAttribute("data-theme", theme);

        // Apply the dark class for Tailwind dark mode
        if (theme === "dark") {
            document.documentElement.classList.add("dark");
        } else {
            document.documentElement.classList.remove("dark");
        }
    }, [theme]);

    // Function to toggle between light and dark themes
    const toggleTheme = () => {
        setTheme(theme === "light" ? "dark" : "light");
    };
    return (
        <div>
            <HeroSection />
            {/* <BlogCard /> */}
        </div>
    )
}
