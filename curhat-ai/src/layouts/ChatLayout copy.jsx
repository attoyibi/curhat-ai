import { Outlet, useLocation, useNavigate, Link } from "react-router-dom";
import useChat from "../hooks/useChat"; // Import the useChat hook
import { useState, useEffect, useRef } from "react";
const ChatLayout = ({ children }) => {
  const {
    messages,
    inputMessage,
    isLoading,
    setInputMessage,
    handleSendMessage,
  } = useChat(); // Use the hook
  const [isSidebarOpen, setSidebarOpen] = useState(false); // State to track sidebar visibility
  const sidebarRef = useRef(null); // Ref for sidebar
  const location = useLocation();
  const navigate = useNavigate();
  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen); // Toggle sidebar state
  };
  // Close sidebar on click outside
  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setSidebarOpen(false); // Close sidebar
    }
  };


  // Close sidebar on keypress
  const handleKeyPress = () => {
    setSidebarOpen(false); // Close sidebar when user starts typing
  };
  useEffect(() => {
    // Add event listeners
    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyPress);

    return () => {
      // Clean up event listeners when component unmounts
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyPress);
    };
  }, []);
  useEffect(() => {
    // Redirect to /chat/welcome if the current location is /chat (without any further path)
    // neet to improve and similar to chatgpt
    // if (location.pathname !== "/chat/welcome" || location.pathname !== "/chat/new") {
    //   navigate("/home");
    // }
  }, [location, navigate]); // Depend on location and navigate to trigger the effect

  return (
    <div className="">
      <div
        ref={sidebarRef} // Attach ref to sidebar
        id="hs-application-sidebar"
        // className="hs-overlay [--auto-close:lg] hs-overlay-open:translate-x-0 -translate-x-full duration-300 transform hidden fixed top-0 start-0 bottom-0 z-[60] w-64 bg-white border-e border-gray-200 overflow-y-auto lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 dark:bg-neutral-900 dark:border-neutral-700"
        className={`hs-overlay [--auto-close:lg] duration-300 transform fixed top-0 start-0 bottom-0 z-[60] w-64 bg-white border-e border-gray-200 lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 dark:bg-neutral-900 dark:border-neutral-700 
          ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full hidden'}`}
        role="dialog"
        tabIndex="-1"
        aria-label="Sidebar"
      >
        <nav className="size-full flex flex-col">
          <div className="flex items-center justify-between pt-4 pe-4 ps-7">

          </div>

          <div className="h-full flex flex-col justify-between">
            <ul className="space-y-1.5 p-4 ">
              {/* newchat */}
              <div>
                <li>
                  <Link to="/">
                    <a
                      className="flex items-center gap-x-3 py-2 px-3 text-sm text-gray-700 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-900 dark:hover:text-neutral-300 dark:focus:bg-neutral-900 dark:focus:text-neutral-300"
                      href="#"
                    >
                      <svg
                        className="shrink-0 size-4"
                        xmlns="http://www.w3.org/2000/svg"
                        width="24"
                        height="24"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h14" />
                        <path d="M12 5v14" />
                      </svg>
                      New chat
                    </a>
                  </Link>
                </li>
              </div>
            </ul>
            {/* list chat */}
            <div className="m-2 flex flex-col gap-2 rounded-lg h-full overflow-y-auto">
              {/* make list of title chat here */}
              <Link to={"/home"}>
                <a className="py-2 px-4 hover:bg-gray-100 block w-full">
                  chat 1
                </a>
              </Link>
            </div>
            {/* end of list  chat */}

            {/* Upgrade Plan */}
            <ul className="space-y-1.5 p-4 shadow-lg">
              <div>
                <li>
                  <a
                    className="flex items-center gap-x-3 py-2 px-3 text-sm text-gray-700 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-900 dark:hover:text-neutral-300 dark:focus:bg-neutral-900 dark:focus:text-neutral-300"
                    href="#"
                  >
                    <svg
                      className="shrink-0 size-4 text-blue-600"
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                    </svg>
                    <span className="bg-clip-text bg-gradient-to-tl from-blue-600 to-violet-600 text-transparent">
                      Upgrade Plan
                    </span>
                  </a>
                </li>
                {/* user profile */}
                <li>
                  <a
                    className="flex items-center gap-x-3 py-2 px-3 text-sm text-gray-700 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-900 dark:hover:text-neutral-300 dark:focus:bg-neutral-900 dark:focus:text-neutral-300"
                    href="#"
                  >
                    <div className="chat-image avatar">
                      <div className="w-10 rounded-full">
                        <img
                          alt='user profile'
                          src="./user_default.jpg"
                        />
                      </div>
                    </div>
                    User
                  </a>
                </li>
              </div>
            </ul>
          </div>
        </nav>
      </div >

      <div className="relative h-screen w-full lg:ps-64">
        {/* <ChatPage /> */}
        <Outlet />

        <div className="max-w-4xl mx-auto fixed top-0 left-0 z-10 p-3 sm:py-6">
          <div className="lg:hidden flex justify-end mb-2 sm:mb-3">
            <button
              disabled={isLoading} // Disable textarea when loading
              type="button"
              className="p-2 inline-flex items-center gap-x-2 text-xs font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
              aria-haspopup="dialog"
              aria-expanded="false"
              aria-controls="hs-application-sidebar"
              aria-label="Toggle navigation"
              data-hs-overlay="#hs-application-sidebar"
              onClick={toggleSidebar} // Toggle sidebar on click
            >
              <svg
                className="shrink-0 size-3.5"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <line x1="3" x2="21" y1="6" y2="6" />
                <line x1="3" x2="21" y1="12" y2="12" />
                <line x1="3" x2="21" y1="18" y2="18" />
              </svg>
              <span>Sidebar</span>
            </button>
          </div>
        </div>
      </div>
    </div >
  );
};

export default ChatLayout;
