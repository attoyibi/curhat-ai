import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import useChatWithRedux from "../hooks/useChatWithRedux";
const Sidebar = ({ isOpen, sidebarRef, userSessions, logoutUser, toggleUserSettings, isShowUserSettings }) => {

    const { handleSessionMessage, removeSession } = useChatWithRedux();
    const userSettingsRef = useRef(null); // Ref untuk area user settings
    const deleteMenuRef = useRef(null);  // Ref untuk tombol delete

    const [showDelete, setShowDelete] = useState(false);

    // Event listener untuk mendeteksi klik di luar sidebar dan user settings
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                userSettingsRef.current &&
                !userSettingsRef.current.contains(event.target) &&
                sidebarRef.current &&
                !sidebarRef.current.contains(event.target)
            ) {
                toggleUserSettings(false);
            }
            if (
                deleteMenuRef.current &&
                !deleteMenuRef.current.contains(event.target) &&
                sidebarRef.current &&
                !sidebarRef.current.contains(event.target)
            ) {
                setShowDelete(false);
            }
        };
        // Jika klik di luar elemen delete menu


        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [sidebarRef, isShowUserSettings, deleteMenuRef]);
    return (
        <div
            ref={sidebarRef}
            className={`hs-overlay [--auto-close:lg] duration-300 transform fixed top-0 start-0 bottom-0 z-[60] w-64 bg-white border-e border-gray-200 lg:block lg:translate-x-0 lg:end-auto lg:bottom-0 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 dark:bg-neutral-900 dark:border-neutral-700 
        ${isOpen ? 'translate-x-0' : '-translate-x-full hidden'}`}
            role="dialog"
            tabIndex="-1"
            aria-label="Sidebar"
        >
            <nav className="size-full flex flex-col">
                <div className="flex items-center justify-between pt-4 pe-4 ps-7">
                    {/* Your logo or additional elements here */}
                </div>

                <div className="h-full flex flex-col justify-between">
                    <ul className="space-y-1.5 p-4 ">
                        <div>
                            <li key={"new-chat"}>
                                <Link to="/newChat">
                                    <div
                                        className="flex items-center gap-x-3 py-2 px-3 text-sm text-gray-700 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-900 dark:hover:text-neutral-300 dark:focus:bg-neutral-900 dark:focus:text-neutral-300"
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
                                    </div>
                                </Link>
                            </li>
                        </div>
                    </ul>

                    <div className="m-2 flex flex-col rounded-lg h-full overflow-y-auto">
                        {/* List of chats */}
                        {userSessions?.map((session, index) => (
                            <div className="flex flex-row relative hover:bg-gray-100 rounded-lg group">
                                <Link key={index} to={`/chat/${session.session_id}`}>
                                    <div
                                        className="py-2 px-4 block w-full"
                                        onClick={() => handleSessionMessage(session.session_id)}
                                        key={index}
                                    >
                                        {session?.topic}
                                    </div>
                                </Link>
                                <div
                                    onClick={() => {
                                        setShowDelete(!showDelete);
                                    }}
                                    className="cursor-pointer p-1 absolute right-0 text-xl font-bold hidden group-hover:block hover:border-solid"
                                >
                                    ...
                                </div>
                                {/* Setting Sidebar */}
                                {showDelete &&
                                    <div
                                        ref={deleteMenuRef}
                                        className="absolute top-10 right-0 hidden group-hover:flex flex-col gap-2 bg-white shadow-lg border rounded-lg p-4 z-10">
                                        <button
                                            className="flex items-center gap-2 text-red-500 hover:bg-red-100 p-2 rounded-md"
                                            onClick={() => {
                                                removeSession(session.session_id);
                                            }}
                                        >
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                strokeWidth="2"
                                                stroke="currentColor"
                                                className="w-5 h-5"
                                            >
                                                <path
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    d="M6 18L18 6M6 6l12 12"
                                                />
                                            </svg>
                                            Delete
                                        </button>
                                    </div>
                                }

                            </div>

                        ))}
                    </div>
                    <div className="relative p-2 max-w-[240px] mb-5">
                        {isShowUserSettings && (
                            <div
                                onClick={logoutUser}
                                className="absolute w-full bottom bg-white shadow-md rounded-lg p-4 z-[70] border border-gray-100">
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
                                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                                        <polyline points="16 17 21 12 16 7" />
                                        <line x1="21" y1="12" x2="9" y2="12" />
                                    </svg>

                                    <span className="bg-clip-text bg-gradient-to-tl from-gray-600 to-gray-900 text-transparent">
                                        Log Out
                                    </span>
                                </a>
                            </div>
                        )}
                    </div>
                    <ul key="setting" className="space-y-1.5 p-4 shadow-lg">
                        <li key="pricing-page">
                            <div
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
                                <Link to="/pricing">
                                    <span className="bg-clip-text bg-gradient-to-tl from-blue-600 to-violet-600 text-transparent">
                                        Upgrade Plan
                                    </span>
                                </Link>
                            </div>
                        </li>

                        <li key="user-setting">
                            <div
                                onClick={toggleUserSettings}
                                className="flex items-center gap-x-3 py-2 px-3 text-sm text-gray-700 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-900 dark:hover:text-neutral-300 dark:focus:bg-neutral-900 dark:focus:text-neutral-300 cursor-pointer"
                                href="#"
                            >
                                <div className="chat-image avatar">
                                    <div className="w-10 rounded-full">
                                        <img alt="user profile" src="./user_default.jpg" />
                                    </div>
                                </div>
                                User
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;
