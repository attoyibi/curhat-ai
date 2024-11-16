import { Outlet, useLocation, useNavigate, Link } from "react-router-dom";
// import ChatPage from "..pages/ChatPage";
import useChat from "../hooks/useChat"; // Import the useChat hook
import ChatUser from "../components/Chat";
import AIChatBubble from "../components/AIChatBubble";
import WelcomeChat from "../components/WelcomeChat";
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
    console.log(!isSidebarOpen);
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
            {/* <a
              className="flex-none focus:outline-none focus:opacity-80"
              href="../../examples/html/ai-with-sidebar.html"
              aria-label="Preline"
            >
              <svg
                className="w-28 h-auto"
                width="116"
                height="32"
                viewBox="0 0 116 32"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M33.5696 30.2968V10.7968H37.4474V13.1789H37.6229C37.7952 12.7972 38.0445 12.4094 38.3707 12.0155C38.7031 11.6154 39.134 11.283 39.6634 11.0183C40.1989 10.7475 40.8636 10.6121 41.6577 10.6121C42.6918 10.6121 43.6458 10.8829 44.5199 11.4246C45.3939 11.9601 46.0926 12.7695 46.6158 13.8529C47.139 14.93 47.4006 16.2811 47.4006 17.9061C47.4006 19.488 47.1451 20.8237 46.6342 21.9132C46.1295 22.9966 45.4401 23.8183 44.5661 24.3784C43.6982 24.9324 42.7256 25.2094 41.6484 25.2094C40.8852 25.2094 40.2358 25.0832 39.7003 24.8308C39.1709 24.5785 38.737 24.2615 38.3984 23.8799C38.0599 23.4921 37.8014 23.1012 37.6229 22.7073H37.5028V30.2968H33.5696ZM37.4197 17.8877C37.4197 18.7309 37.5367 19.4665 37.7706 20.0943C38.0045 20.7222 38.343 21.2115 38.7862 21.5624C39.2294 21.9071 39.768 22.0794 40.402 22.0794C41.0421 22.0794 41.5838 21.904 42.027 21.5532C42.4702 21.1961 42.8056 20.7037 43.0334 20.0759C43.2673 19.4419 43.3842 18.7125 43.3842 17.8877C43.3842 17.069 43.2704 16.3488 43.0426 15.7272C42.8149 15.1055 42.4794 14.6192 42.0362 14.2683C41.593 13.9175 41.0483 13.7421 40.402 13.7421C39.7618 13.7421 39.2202 13.9113 38.777 14.2499C38.34 14.5884 38.0045 15.0685 37.7706 15.6902C37.5367 16.3119 37.4197 17.0444 37.4197 17.8877ZM49.2427 24.9786V10.7968H53.0559V13.2712H53.2037C53.4622 12.391 53.8961 11.7262 54.5055 11.2769C55.1149 10.8214 55.8166 10.5936 56.6106 10.5936C56.8076 10.5936 57.02 10.6059 57.2477 10.6306C57.4754 10.6552 57.6755 10.689 57.8478 10.7321V14.2222C57.6632 14.1668 57.4077 14.1175 57.0815 14.0745C56.7553 14.0314 56.4567 14.0098 56.1859 14.0098C55.6073 14.0098 55.0903 14.136 54.6348 14.3884C54.1854 14.6346 53.8284 14.9793 53.5638 15.4225C53.3052 15.8657 53.176 16.3765 53.176 16.9551V24.9786H49.2427ZM64.9043 25.2556C63.4455 25.2556 62.1898 24.9601 61.1373 24.3692C60.0909 23.7721 59.2845 22.9289 58.7182 21.8394C58.1519 20.7437 57.8688 19.448 57.8688 17.9523C57.8688 16.4935 58.1519 15.2132 58.7182 14.1114C59.2845 13.0096 60.0816 12.1509 61.1096 11.5354C62.1437 10.9199 63.3563 10.6121 64.7474 10.6121C65.683 10.6121 66.5539 10.7629 67.3603 11.0645C68.1728 11.36 68.8806 11.8062 69.4839 12.4033C70.0932 13.0004 70.5672 13.7513 70.9057 14.6561C71.2443 15.5548 71.4135 16.6074 71.4135 17.8138V18.8941H59.4384V16.4566H67.7111C67.7111 15.8903 67.588 15.3886 67.3418 14.9516C67.0956 14.5146 66.754 14.1729 66.317 13.9267C65.8861 13.6744 65.3844 13.5482 64.812 13.5482C64.2149 13.5482 63.6856 13.6867 63.2239 13.9637C62.7684 14.2345 62.4114 14.6007 62.1529 15.0624C61.8944 15.5179 61.762 16.0257 61.7559 16.5858V18.9033C61.7559 19.605 61.8851 20.2113 62.1437 20.7222C62.4083 21.2331 62.7807 21.627 63.2608 21.904C63.741 22.181 64.3103 22.3195 64.9689 22.3195C65.406 22.3195 65.8061 22.2579 66.1692 22.1348C66.5324 22.0117 66.8432 21.8271 67.1018 21.5808C67.3603 21.3346 67.5572 21.033 67.6927 20.676L71.3304 20.9161C71.1458 21.7901 70.7672 22.5534 70.1948 23.2058C69.6285 23.8522 68.896 24.3569 67.9974 24.7201C67.1048 25.0771 66.0738 25.2556 64.9043 25.2556ZM77.1335 6.06949V24.9786H73.2003V6.06949H77.1335ZM79.5043 24.9786V10.7968H83.4375V24.9786H79.5043ZM81.4801 8.96863C80.8954 8.96863 80.3937 8.77474 79.9752 8.38696C79.5628 7.99302 79.3566 7.52214 79.3566 6.97431C79.3566 6.43265 79.5628 5.96792 79.9752 5.58014C80.3937 5.1862 80.8954 4.98923 81.4801 4.98923C82.0649 4.98923 82.5635 5.1862 82.9759 5.58014C83.3944 5.96792 83.6037 6.43265 83.6037 6.97431C83.6037 7.52214 83.3944 7.99302 82.9759 8.38696C82.5635 8.77474 82.0649 8.96863 81.4801 8.96863ZM89.7415 16.7797V24.9786H85.8083V10.7968H89.5569V13.2989H89.723C90.037 12.4741 90.5632 11.8216 91.3019 11.3415C92.0405 10.8552 92.9361 10.6121 93.9887 10.6121C94.9735 10.6121 95.8322 10.8275 96.5647 11.2584C97.2971 11.6893 97.8665 12.3048 98.2728 13.105C98.679 13.899 98.8821 14.8469 98.8821 15.9487V24.9786H94.9489V16.6505C94.9551 15.7826 94.7335 15.1055 94.2841 14.6192C93.8348 14.1268 93.2162 13.8806 92.4283 13.8806C91.8989 13.8806 91.4311 13.9944 91.0249 14.2222C90.6248 14.4499 90.3109 14.7823 90.0831 15.2193C89.8615 15.6502 89.7477 16.1703 89.7415 16.7797ZM107.665 25.2556C106.206 25.2556 104.951 24.9601 103.898 24.3692C102.852 23.7721 102.045 22.9289 101.479 21.8394C100.913 20.7437 100.63 19.448 100.63 17.9523C100.63 16.4935 100.913 15.2132 101.479 14.1114C102.045 13.0096 102.842 12.1509 103.87 11.5354C104.905 10.9199 106.117 10.6121 107.508 10.6121C108.444 10.6121 109.315 10.7629 110.121 11.0645C110.934 11.36 111.641 11.8062 112.245 12.4033C112.854 13.0004 113.328 13.7513 113.667 14.6561C114.005 15.5548 114.174 16.6074 114.174 17.8138V18.8941H102.199V16.4566H110.472C110.472 15.8903 110.349 15.3886 110.103 14.9516C109.856 14.5146 109.515 14.1729 109.078 13.9267C108.647 13.6744 108.145 13.5482 107.573 13.5482C106.976 13.5482 106.446 13.6867 105.985 13.9637C105.529 14.2345 105.172 14.6007 104.914 15.0624C104.655 15.5179 104.523 16.0257 104.517 16.5858V18.9033C104.517 19.605 104.646 20.2113 104.905 20.7222C105.169 21.2331 105.542 21.627 106.022 21.904C106.502 22.181 107.071 22.3195 107.73 22.3195C108.167 22.3195 108.567 22.2579 108.93 22.1348C109.293 22.0117 109.604 21.8271 109.863 21.5808C110.121 21.3346 110.318 21.033 110.454 20.676L114.091 20.9161C113.907 21.7901 113.528 22.5534 112.956 23.2058C112.389 23.8522 111.657 24.3569 110.758 24.7201C109.866 25.0771 108.835 25.2556 107.665 25.2556Z"
                  fill="currentColor"
                  className="fill-blue-600 dark:fill-white"
                />
                <path
                  d="M1 28.9786V15.9786C1 9.35116 6.37258 3.97858 13 3.97858C19.6274 3.97858 25 9.35116 25 15.9786C25 22.606 19.6274 27.9786 13 27.9786H12"
                  className="stroke-blue-600 dark:stroke-white"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M5 28.9786V16.1386C5 11.6319 8.58172 7.97858 13 7.97858C17.4183 7.97858 21 11.6319 21 16.1386C21 20.6452 17.4183 24.2986 13 24.2986H12"
                  className="stroke-blue-600 dark:stroke-white"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <circle
                  cx="13"
                  cy="16"
                  r="5"
                  fill="currentColor"
                  className="fill-blue-600 dark:fill-white"
                />
              </svg>
            </a> */}
          </div>

          <div className="h-full flex flex-col justify-between">
            <ul className="space-y-1.5 p-4 ">
              {/* newchat */}
              <div>
                <li>
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
              <Link to={"/home"}>
                <a className="py-2 px-4 hover:bg-gray-100 block w-full">
                  chat 2
                </a>
              </Link>
              <Link to={"/home"}>
                <a className="py-2 px-4 hover:bg-gray-100 block w-full">
                  chat 1
                </a>
              </Link>
              <Link to={"/home"}>
                <a className="py-2 px-4 hover:bg-gray-100 block w-full">
                  chat 2
                </a>
              </Link>
              <Link to={"/home"}>
                <a className="py-2 px-4 hover:bg-gray-100 block w-full">
                  chat 1
                </a>
              </Link>
              <Link to={"/home"}>
                <a className="py-2 px-4 hover:bg-gray-100 block w-full">
                  chat 2
                </a>
              </Link>
              <Link to={"/home"}>
                <a className="py-2 px-4 hover:bg-gray-100 block w-full">
                  chat 1
                </a>
              </Link>
              <Link to={"/home"}>
                <a className="py-2 px-4 hover:bg-gray-100 block w-full">
                  chat 2
                </a>
              </Link>
              <Link to={"/home"}>
                <a className="py-2 px-4 hover:bg-gray-100 block w-full">
                  chat 1
                </a>
              </Link>
              <Link to={"/home"}>
                <a className="py-2 px-4 hover:bg-gray-100 block w-full">
                  chat 2
                </a>
              </Link>
              <Link to={"/home"}>
                <a className="py-2 px-4 hover:bg-gray-100 block w-full">
                  chat 1
                </a>
              </Link>
              <Link to={"/home"}>
                <a className="py-2 px-4 hover:bg-gray-100 block w-full">
                  chat 2
                </a>
              </Link>
              <Link to={"/home"}>
                <a className="py-2 px-4 hover:bg-gray-100 block w-full">
                  chat 1
                </a>
              </Link>
              <Link to={"/home"}>
                <a className="py-2 px-4 hover:bg-gray-100 block w-full">
                  chat 2
                </a>
              </Link>
              <Link to={"/home"}>
                <a className="py-2 px-4 hover:bg-gray-100 block w-full">
                  chat 1
                </a>
              </Link>
              <Link to={"/home"}>
                <a className="py-2 px-4 hover:bg-gray-100 block w-full">
                  chat 2
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

          <div className="mt-auto">
            {/* <div className="py-2.5 px-7">
                            <p className="inline-flex items-center gap-x-2 text-xs text-green-600">
                                <span className="block size-1.5 rounded-full bg-green-600"></span>
                                Active 12,320 people
                            </p>
                        </div> */}

            {/* <div className="p-4 border-t border-gray-200 dark:border-neutral-700">
                            <a className="flex justify-between items-center gap-x-3 py-2 px-3 text-sm text-gray-700 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:hover:bg-neutral-900 dark:text-neutral-400 dark:hover:text-neutral-300 dark:focus:text-neutral-300" href="#">
                                Sign in
                                <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" />
                                    <polyline points="10 17 15 12 10 7" />
                                    <line x1="15" x2="3" y1="12" y2="12" />
                                </svg>
                            </a>
                        </div> */}
          </div>
        </nav>
      </div >

      <div className="relative h-screen w-full lg:ps-64">
        {/* <ChatPage /> */}
        <Outlet />
        {/* Chat Area */}
        {/* <div className="flex-grow p-4 overflow-y-auto max-w-[1440px] align-middle mx-auto w-full">
                    <div className="space-y-4">
                        {messages.map((msg, index) => (
                            <div key={index}>
                                {msg.sender === "user" ? (
                                    <ChatUser msg={msg.text} />
                                ) : (
                                    <AIChatBubble
                                        avatar="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                                        sender="Chat-AI Bot"
                                        time={new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                        message={msg.text}
                                        status="Delivered"
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                </div> */}

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
