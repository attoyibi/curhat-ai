import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch sessions from server
export const fetchChatSessions = createAsyncThunk(
    "chat/fetchChatSessions",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axios.get("/api/chat-sessions"); // Replace with actual endpoint
            return response.data;
        } catch (err) {
            return rejectWithValue(err.message);
        }
    }
);

// Send message to OpenAI API
export const sendMessage = createAsyncThunk(
    "chat/sendMessage",
    async ({ messages, inputMessage }, { rejectWithValue }) => {
        try {
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
                            role: msg.sender === "user" ? "user" : "assistant",
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
                sender: "AI",
                text: response.data.choices[0].message.content,
            };
            return aiMessage;
        } catch (error) {
            return rejectWithValue(error.message);
        }
    }
);

const chatSlice = createSlice({
    name: "chat",
    initialState: {
        sessions: null,
        messages: [],
        loading: false,
        error: null,
    },
    reducers: {
        clearError(state) {
            state.error = null;
        },
        resetChat(state) {
            state.messages = [];
        },
        setMessages: (state, action) => {
            state.messages = action.payload;
        },
        addMessage: (state, action) => {
            state.messages.push(action.payload);
        },
        setInputMessage: (state, action) => {
            state.inputMessage = action.payload;
        },
        setIsLoading: (state, action) => {
            state.loading = action.payload;
        },
        addSessions: (state, action) => {
            state.sessions = action.payload;
        },
        resetSessions: (state, action) => {
            state.sessions = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchChatSessions.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchChatSessions.fulfilled, (state, action) => {
                state.sessions = action.payload;
                state.loading = false;
            })
            .addCase(fetchChatSessions.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            })
            .addCase(sendMessage.pending, (state) => {
                state.loading = true;
            })
            .addCase(sendMessage.fulfilled, (state, action) => {
                state.messages.push(action.payload);
                state.loading = false;
            })
            .addCase(sendMessage.rejected, (state, action) => {
                state.error = action.payload;
                state.loading = false;
            });
    },
});

export const { setMessages, addMessage, setInputMessage, setIsLoading, addSessions, resetSessions, resetChat } = chatSlice.actions;
export default chatSlice.reducer;
