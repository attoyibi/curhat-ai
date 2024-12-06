import { useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
    addMessage,
    setInputMessage,
    setIsLoading,
    addSessions,
    setMessages,
    resetSessions,
} from "../redux/chatSlice";
import { fetchUserSessions, removeUserSessionFromState } from "../redux/sidebarSlice"
import supabase from "../../../lib/supabaseClient"

const useChatWithRedux = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    // Redux state
    const messages = useSelector((state) => state.chat.messages);
    const inputMessage = useSelector((state) => state.chat.inputMessage);
    const isLoading = useSelector((state) => state.chat.loading);
    const sessions = useSelector((state) => state.chat.sessions);
    const allReduxChatData = useSelector((state) => state.chat);

    // useEffect(() => {
    //     console.log("OpenAI API Key:", import.meta.env.VITE_OPENAI_API_KEY);
    //     console.log("message", messages.length);
    //     if (messages.length >= 2 && location.pathname !== "/chat") {
    //         console.log("masuk ke if use effect");
    //         navigate("/chat");
    //     }
    // }, [messages]);

    const getSessionTopic = async (inputMessage) => {
        try {
            const response = await axios.post(
                "https://api.openai.com/v1/chat/completions",
                {
                    model: "gpt-3.5-turbo",
                    messages: [
                        {
                            role: "system",
                            content: "You are an assistant that generates a concise and descriptive title for a given user message. Output only the title in the same language as the input, without any extra words, punctuation, or formatting. The output should be plain text and nothing else.",
                        },
                        { role: "user", content: inputMessage },
                    ],
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
                    },
                }
            );

            const sessionTopic = response.data.choices[0].message.content.trim();
            return sessionTopic; // Mengembalikan judul sesi
        } catch (error) {
            console.error("Error fetching session topic from OpenAI:", error);
            return "New Chat Session"; // Default jika terjadi error
        }
    };


    const handleFetchMessages = async (sessions) => {
        try {
            const response = await supabase.from('messages').select("*").eq('session_id', sessions)
            console.log("handleFetchMessages response", response);

            const newResponse = response.data.map(data => ({
                sender: data.sender,
                text: data.message_text
            }));
            console.log("handleFetchMessages newResponse", newResponse);
            dispatch(setMessages(newResponse));
        } catch (error) {
            console.error(error);
        } finally {
            dispatch(setIsLoading(false));
        }
    };

    const handleSendMessage = async () => {
        if (inputMessage.trim()) {
            const userMessage = { sender: "user", text: inputMessage };
            dispatch(addMessage(userMessage)); // Tambahkan pesan pengguna
            dispatch(setInputMessage("")); // Clear input
            dispatch(setIsLoading(true)); // Set loading state

            try {
                console.log("semua data Chat redux", allReduxChatData);
                // if (sessions === null || sessions === undefined) {
                // Mendapatkan judul sesi secara dinamis
                const dynamicTopic = await getSessionTopic(inputMessage);
                // create new sessions
                const sessionResponse = await supabase.from('sessions').insert({ topic: dynamicTopic }).select("session_id").single();
                const sessions = await sessionResponse.data.session_id;
                dispatch(addSessions(sessions));
                // }
                // send userMessage to table messages
                await supabase.from("messages").insert({
                    sender: "user",
                    message_text: userMessage.text,
                    session_id: sessions
                })

                // get respond from AI
                const response = await axios.post(
                    "https://api.openai.com/v1/chat/completions",
                    {
                        model: "gpt-3.5-turbo",
                        messages: [
                            {
                                role: "system",
                                content:
                                    "You are a supportive and empathetic conversational assistant designed to provide emotional support and guidance.",
                            },
                            ...messages.map((msg) => ({
                                role: msg.sender === "user" ? "user" : "bot",
                                content: msg.text,
                            })),
                            { role: "user", content: inputMessage },
                        ],
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
                        },
                    }
                );

                const aiMessage = {
                    sender: "bot",
                    text: response.data.choices[0].message.content,
                };

                dispatch(addMessage(aiMessage)); // Tambahkan pesan AI
                await supabase.from('messages').insert({
                    sender: "bot",
                    message_text: response.data.choices[0].message.content,
                    session_id: sessions
                })
                dispatch(fetchUserSessions());
                navigate(`/chat/${sessions}`);
            } catch (error) {
                console.error("Error fetching data from OpenAI:", error);
            } finally {
                dispatch(setIsLoading(false)); // Reset loading state
            }
        }
    };

    const handleChatMessage = async () => {
        const userMessage = { sender: "user", text: inputMessage };
        dispatch(addMessage(userMessage)); // Tambahkan pesan pengguna
        dispatch(setInputMessage("")); // Clear input
        dispatch(setIsLoading(true)); // Set loading state
        try {
            // Ambil 5 pesan terakhir dari Redux store
            const lastFiveMessages = messages.slice(-5).map((msg) => ({
                role: 'system',
                content: msg.text,
            }));

            // Kirim pesan ke OpenAI untuk mendapatkan respons
            const response = await axios.post(
                "https://api.openai.com/v1/chat/completions",
                {
                    model: "gpt-3.5-turbo",
                    messages: [
                        {
                            role: "system",
                            content:
                                "You are a supportive and empathetic conversational assistant designed to provide emotional support and guidance.",
                        },
                        ...lastFiveMessages,
                        { role: "user", content: inputMessage },
                    ],
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${import.meta.env.VITE_OPENAI_API_KEY}`,
                    },
                }
            );

            // Proses respons dari AI
            const aiMessage = {
                sender: "bot",
                text: response.data.choices[0].message.content,
            };

            // Tambahkan pesan ke Redux store
            dispatch(addMessage(aiMessage));

            await supabase.from('messages').insert(
                {
                    sender: "user",
                    message_text: inputMessage,
                    session_id: sessions
                }
            );
            // Simpan pesan AI ke database
            await supabase.from('messages').insert(
                {
                    sender: "bot",
                    message_text: response.data.choices[0].message.content,
                    session_id: sessions
                }
            );

        } catch (error) {
            console.error("Error fetching data from OpenAI:", error);
        } finally {
            dispatch(setIsLoading(false)); // Reset loading state
        }
    };

    const handleSessionMessage = async (id) => {
        dispatch(addSessions(id));
    }

    const removeSession = async (sessionId) => {
        try {
            const { error } = await supabase.from('sessions').delete().eq('session_id', sessionId);
            if (error) {
                throw error;
            }
            console.log(`Session ${sessionId} deleted successfully.`);
            if (sessions == sessionId) {
                navigate("newChat");
            }
            dispatch(removeUserSessionFromState(sessionId)); // Hapus dari Redux state
            // dispatch(resetSessions()); // Reset sessions jika diperlukan
        } catch (error) {
            console.error("Error deleting session:", error.message);
        }
    };


    return {
        messages,
        inputMessage,
        isLoading,
        sessions,
        setInputMessage: (message) => dispatch(setInputMessage(message)),
        handleSendMessage,
        handleChatMessage,
        handleSessionMessage,
        handleFetchMessages,
        removeSession
    };
};

export default useChatWithRedux;
