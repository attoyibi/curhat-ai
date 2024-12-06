import { Outlet } from "react-router-dom";
// import useChat from "../hooks/useChat";
// import useSidebar from "../hooks/useSidebar"; // Import the custom hook
import { Sidebar, useChat as useChatFromFeature, useSidebar, useSidebarWithRedux } from "../features/chat"; // Import the Sidebar component
const ChatLayout = () => {
  // const {
  //   messages,
  //   inputMessage,
  //   isLoading,
  //   setInputMessage,
  //   handleSendMessage,
  // } = useChatFromFeature();

  const { isSidebarOpen, showUserSettings, toggleSidebar, sidebarRef, userSessions, isLoading, logoutUser, toggleUserSettings, isShowUserSettings } = useSidebarWithRedux();

  return (
    <div className="">
      <Sidebar showUserSettings={showUserSettings} isOpen={isSidebarOpen} sidebarRef={sidebarRef} userSessions={userSessions} logoutUser={logoutUser} toggleUserSettings={toggleUserSettings} isShowUserSettings={isShowUserSettings} />

      <div className="relative h-screen w-full lg:ps-64">
        <Outlet />

        <div className="max-w-4xl mx-auto fixed top-0 left-0 z-10 p-3 sm:py-6">
          <div className="lg:hidden flex justify-end mb-2 sm:mb-3">
            <button
              disabled={isLoading}
              type="button"
              className="p-2 inline-flex items-center gap-x-2 text-xs font-medium rounded-lg border border-gray-200 bg-white text-gray-800 shadow-sm hover:bg-gray-50 focus:outline-none focus:bg-gray-50 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-white dark:hover:bg-neutral-800 dark:focus:bg-neutral-800"
              aria-haspopup="dialog"
              aria-expanded="false"
              aria-controls="hs-application-sidebar"
              aria-label="Toggle navigation"
              onClick={toggleSidebar}
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
    </div>
  );
};

export default ChatLayout;
