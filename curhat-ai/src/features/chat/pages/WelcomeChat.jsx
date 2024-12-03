import React, { useState, useEffect } from "react";
import useChat from "../hooks/useChat";
import useChatWithRedux from "../hooks/useChatWithRedux";
import { useDispatch } from "react-redux";
import { resetSessions, resetChat } from "../redux/chatSlice";
// import SendIcon from "@/assets/send.svg";
export default function WelcomeChat() {
    const dispatch = useDispatch();
    const {
        messages,
        inputMessage,
        isLoading,
        setInputMessage,
        handleSendMessage,
    } = useChatWithRedux();
    const [imgLoading, setImgLoading] = useState("/send.svg");
    useEffect(() => {
        dispatch(resetSessions());
        dispatch(resetChat());
        console.log("==========session reset==============");
    }, []);
    return (
        <div className="dark:bg-neutral-900">
            <div className="h-screen flex flex-col pb-6">
                <div className="h-full flex flex-col justify-center">
                    <div className="-mt-20 max-w-4xl w-full text-center mx-auto px-4 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold text-gray-800 sm:text-4xl dark:text-white">
                            Welcome to Curhat AI Feature
                        </h1>
                        {/* <p className="mt-3 text-gray-600 dark:text-neutral-400">
                            Your AI-powered copilot for the web
                            </p> */}
                    </div>

                    <div className="mt-10 max-w-2xl w-full mx-auto px-4 sm:px-6 lg:px-8 ">
                        <div className="relative">
                            <input
                                type="text"
                                className="text-black bg-white p-4 block w-full border border-gray rounded-full text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                                placeholder={isLoading ? "Loading..." : "Ask me anything..."}
                                onChange={(e) => setInputMessage(e.target.value)}
                                disabled={isLoading} // Disable textarea when loading
                                onKeyDown={(e) => {
                                    if (e.key === "Enter") {
                                        handleSendMessage();
                                    }
                                }}
                            />
                            <div className="absolute top-1/2 end-2 -translate-y-1/2">
                                {/* <button
                  type="button"
                  className="size-10 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-500 hover:text-gray-800 focus:outline-none focus:text-gray-800 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:hover:text-white dark:focus:text-white"
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
                    <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" />
                    <path d="M12 12v9" />
                    <path d="m16 16-4-4-4 4" />
                  </svg>
                </button> */}
                                <button
                                    type="button"
                                    className="size-10 inline-flex justify-center items-center gap-x-2 text-sm font-semibold rounded-full border border-transparent text-gray-500 hover:text-gray-800 focus:outline-none focus:text-gray-800 bg-gray-100 disabled:opacity-50 disabled:pointer-events-none dark:text-neutral-400 dark:bg-neutral-800 dark:hover:text-white dark:focus:text-white"
                                    onClick={() => handleSendMessage()}
                                    disabled={isLoading} // Disable textarea when loading
                                >
                                    <img onClick={() => setImgLoading("/Loading_icon.gif")} src={imgLoading} alt="Send" className="w-4 h-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <footer className="mt-auto max-w-4xl text-center mx-auto px-4 sm:px-6 lg:px-8">
                <p className="text-xs text-gray-600 dark:text-neutral-500">© 2024 Muchson</p>
            </footer> */}
            </div>
        </div>
    );
}
