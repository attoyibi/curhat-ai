import { Link, useNavigate } from "react-router-dom"; // Import Link and useNavigate from react-router-dom

const Navbar = () => {
  const navigate = useNavigate(); // Initialize useNavigate for navigation


  // Function to handle Login button click
  const handleLoginClick = () => {
    navigate("/login"); // Navigate to the Login page
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-normalBackground dark:bg-darkBackground p-4 shadow-lg z-10 h-16">
      <div className="container mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="text-normalPrimary dark:text-darkPrimary font-bold text-xl">
          MyWebsite
        </div>

        {/* Navigation Links */}
        <div className="flex space-x-4">
          <Link to="/home" className="text-normalPrimary dark:text-darkPrimary hover:underline">
            Home
          </Link>
          <Link to="/about" className="text-normalPrimary dark:text-darkPrimary hover:underline">
            About
          </Link>
          {/* <Link to="/contact" className="text-normalPrimary dark:text-darkPrimary hover:underline">
            Contact
          </Link> */}
        </div>

        {/* Right Side: Login Button and Dark Mode Toggle */}
        <div className="flex space-x-4 items-center">
          <button
            onClick={handleLoginClick} // Set the onClick handler
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded-md transition-colors duration-200"
          >
            Login
          </button>


        </div>
      </div>
    </nav>
  );
};

export default Navbar;
