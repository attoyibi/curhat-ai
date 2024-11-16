import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
const useChat = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    console.log("OpenAI API Key:", import.meta.env.VITE_OPENAI_API_KEY);
    console.log("message", messages.length);
    if (messages.length >= 2 && location.pathname != "/chat") {
      console.log("masuk ke if use effect");
      navigate("/chat", { state: { messages } });
    }
  }, [messages]);

  const handleSendMessage = async () => {
    if (inputMessage.trim()) {
      const userMessage = { sender: "user", text: inputMessage };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setInputMessage(""); // Clear input
      setIsLoading(true); // Set loading state

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

        setMessages((prevMessages) => [...prevMessages, aiMessage]);
      } catch (error) {
        console.error("Error fetching data from OpenAI:", error);
      } finally {
        setIsLoading(false); // Reset loading state
      }
    }
  };

  return {
    messages,
    inputMessage,
    isLoading,
    setInputMessage,
    handleSendMessage,
  };
};

export default useChat;
