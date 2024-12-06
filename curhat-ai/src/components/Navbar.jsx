import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate(); // Initialize useNavigate for navigation
  const [isAuthenticated, setIsAuthenticated] = useState(false); // State untuk cek login

  // Simulasi pengecekan login (replace sesuai mekanisme autentikasi Anda)
  useEffect(() => {
    // Misalnya, cek dari localStorage atau API
    const checkAuth = () => {
      const loggedIn = localStorage.getItem("isAuthenticated") === "true";
      setIsAuthenticated(loggedIn);
    };

    checkAuth();
  }, []);

  // Function to handle Login button click
  const handleLoginClick = () => {
    navigate("/login"); // Navigate to the Login page
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-normalBackground dark:bg-darkBackground p-4 shadow-lg z-10 h-16">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <Link to={"/home"}>
          <div className="text-normalPrimary dark:text-darkPrimary font-bold text-xl">
            Curhat-AI
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="flex space-x-4">
          <Link to="/home" className="text-normalPrimary dark:text-darkPrimary hover:underline">
            Home
          </Link>
          <Link to="/about" className="text-normalPrimary dark:text-darkPrimary hover:underline">
            About
          </Link>
          <Link to="/pricing" className="text-normalPrimary dark:text-darkPrimary hover:underline">
            Pricing
          </Link>
        </div>

        {/* Right Side: Login Button or Chat Button */}
        <div className="flex space-x-4 items-center">
          {!isAuthenticated ? ( // Jika belum login, tampilkan tombol Login
            <button
              onClick={handleLoginClick}
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded-md transition-colors duration-200"
            >
              Login
            </button>
          ) : ( // Jika sudah login, tampilkan tombol Chat
            <button
              onClick={() => navigate("/")} // Arahkan ke routing "/"
              className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded-md transition-colors duration-200"
            >
              Back to Chat
            </button>
          )}
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
