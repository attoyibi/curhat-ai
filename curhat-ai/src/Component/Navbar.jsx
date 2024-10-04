import React, { useState, useEffect } from "react";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <nav className=" fixed top-0 left-0 w-full bg-normalBackground dark:bg-darkBackground p-4 shadow-lg z-10 h-16">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-normalPrimary dark:text-darkPrimary font-bold text-xl">
          MyWebsite
        </div>

        {/* Dark Mode Toggle */}
        <button
          onClick={toggleDarkMode}
          className="bg-normalPrimary dark:bg-darkPrimary text-white dark:text-black px-4 py-2 rounded-lg focus:outline-none"
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
