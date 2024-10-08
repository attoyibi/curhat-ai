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
        </div>
    );
};

export default ChatPage;
