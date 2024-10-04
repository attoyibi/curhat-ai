import React, { useState, useEffect } from "react";
import Navbar from "./Component/Navbar";
import HeroSection from "./Component/HeroSection";
import Footer from "./Component/Footer";
import BlogCard from "./Component/BlogChard";

function App() {
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
    <>
      <Navbar toggleTheme={toggleTheme} />
      <HeroSection />
      <BlogCard />
      <Footer />
    </>
  );
}

export default App;
