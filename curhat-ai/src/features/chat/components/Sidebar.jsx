import { Link } from "react-router-dom";
import useChatWithRedux from "../hooks/useChatWithRedux";
const Sidebar = ({ isOpen, sidebarRef, userSessions }) => {
    console.log("userSession = ", userSessions);
    console.log("sidebarRef = ", sidebarRef);
    const { handleSessionMessage } = useChatWithRedux();
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
                            <li>
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
                            <Link key={index} to={`/chat/${session.session_id}`}>
                                <div onClick={() => handleSessionMessage(session.session_id)} key={index} className="py-2 px-4 hover:bg-gray-100 block w-full">
                                    {session?.topic}
                                </div>
                            </Link>
                        ))

                        }

                    </div>

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
                            <li>
                                <a
                                    className="flex items-center gap-x-3 py-2 px-3 text-sm text-gray-700 rounded-lg hover:bg-gray-100 focus:outline-none focus:bg-gray-100 dark:text-neutral-400 dark:hover:bg-neutral-900 dark:hover:text-neutral-300 dark:focus:bg-neutral-900 dark:focus:text-neutral-300"
                                    href="#"
                                >
                                    <div className="chat-image avatar">
                                        <div className="w-10 rounded-full">
                                            <img alt='user profile' src="./user_default.jpg" />
                                        </div>
                                    </div>
                                    User
                                </a>
                            </li>
                        </div>
                    </ul>
                </div>
            </nav>
        </div>
    );
};

export default Sidebar;
