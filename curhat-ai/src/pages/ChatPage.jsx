import React, { useState, useEffect } from "react";
import axios from "axios";
import ChatUser from '../components/Chat'
import AIChatBubble from '../components/AIChatBubble'
// Komponen untuk menampilkan pesan dari pengguna
// const ChatUser = ({ msg }) => (
//     <div className="chat chat-end">
//         <div className="chat-bubble">{msg}</div>
//     </div>
// );

// Komponen untuk menampilkan pesan dari AI
// const AIChatBubble = ({ avatar, sender, time, message, status }) => (
//     <div className="chat chat-start">
//         <div className="chat-image avatar">
//             <div className="w-10 rounded-full">
//                 <img alt="AI Avatar" src={avatar} />
//             </div>
//         </div>
//         <div className="chat-header">
//             {sender}
//             <time className="text-xs opacity-50">{time}</time>
//         </div>
//         <div className="chat-bubble">{message}</div>
//         <div className="chat-footer opacity-50">{status}</div>
//     </div>
// );

const ChatPage = () => {
    const [messages, setMessages] = useState([]);
    const [inputMessage, setInputMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false); // Tambahkan state untuk loading

    useEffect(() => {
        console.log('OpenAI API Key:', import.meta.env.VITE_OPENAI_API_KEY);
    }, []);

    const handleSendMessage = async () => {
        if (inputMessage.trim()) {
            const userMessage = { sender: "user", text: inputMessage };
            setMessages((prevMessages) => [...prevMessages, userMessage]);
            setInputMessage(""); // Clear input

            // Call OpenAI API
            try {
                const response = await axios.post(
                    "https://api.openai.com/v1/chat/completions",
                    {
                        model: "gpt-3.5-turbo",
                        messages: [
                            {
                                role: "system",
                                content: "You are a supportive and empathetic conversational assistant designed to provide emotional support and guidance."
                            },
                            ...messages.map(msg => ({
                                role: msg.sender === "user" ? "user" : "assistant",
                                content: msg.text
                            })),
                            { role: "user", content: inputMessage },
                        ],
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            "Authorization": `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
                        },
                    }
                );

                const aiMessage = {
                    sender: "AI",
                    text: response.data.choices[0].message.content,
                };
                console.log('Response:', response.data);
                setMessages((prevMessages) => [...prevMessages, aiMessage]);
            } catch (error) {
                console.error("Error fetching data from OpenAI:", error);
            }
        }
    };

    return (
        <div className="flex flex-col h-screen bg-gray-100">
            {/* Header */}
            <div className="bg-blue-600 text-white p-4 text-center">
                <h1 className="text-lg font-semibold">Sampaikan Keluh Kesahmu</h1>
            </div>

            {/* Chat Area */}
            <div className="flex-grow p-4 overflow-y-auto max-w-[1440px] align-middle mx-auto w-full">
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
            </div>

            {/* Input Area */}
            <div className="bg-white p-4 flex items-center border-t">
                <input
                    type="text"
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    className="flex-grow p-2 border rounded-lg focus:outline-none focus:border-blue-500"
                    placeholder="Type a message..."
                    onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
                    disabled={isLoading} // Disable input saat loading
                />
                <button
                    onClick={handleSendMessage}
                    className={`ml-4 px-4 py-2 rounded-lg ${isLoading ? "bg-gray-400" : "bg-blue-600"} text-white`}
                    disabled={isLoading} // Disable tombol saat loading
                >
                    {isLoading ? "Loading..." : "Send"} {/* Ubah teks tombol */}
                </button>
            </div>
            {/* <div className="relative">
                        <textarea className="p-4 pb-12 block w-full bg-gray-100 border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600" placeholder="Ask me anything..."></textarea>

                        <div className="absolute bottom-px inset-x-px p-2 rounded-b-lg bg-gray-100 dark:bg-neutral-800">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center">
                                    <button type="button" className="inline-flex shrink-0 justify-center items-center size-8 rounded-lg text-gray-500 hover:bg-white focus:z-10 focus:outline-none focus:bg-white dark:text-neutral-500 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700">
                                        <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <rect width="18" height="18" x="3" y="3" rx="2" />
                                            <line x1="9" x2="15" y1="15" y2="9" />
                                        </svg>
                                    </button>

                                    <button type="button" className="inline-flex shrink-0 justify-center items-center size-8 rounded-lg text-gray-500 hover:bg-white focus:z-10 focus:outline-none focus:bg-white dark:text-neutral-500 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700">
                                        <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                                        </svg>
                                    </button>
                                </div>

                                <div className="flex items-center gap-x-1">
                                    <button type="button" className="inline-flex shrink-0 justify-center items-center size-8 rounded-lg text-gray-500 hover:bg-white focus:z-10 focus:outline-none focus:bg-white dark:text-neutral-500 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700">
                                        <svg className="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                            <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                                            <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                                            <line x1="12" x2="12" y1="19" y2="22" />
                                        </svg>
                                    </button>

                                    <button type="button" className="inline-flex shrink-0 justify-center items-center size-8 rounded-lg text-white bg-blue-600 hover:bg-blue-500 focus:z-10 focus:outline-none focus:bg-blue-500">
                                        <svg className="shrink-0 size-3.5" xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                                            <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div> */}
        </div>
    );
};

export default ChatPage;
