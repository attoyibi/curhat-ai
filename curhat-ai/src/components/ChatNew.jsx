import React, { useEffect, useRef, useState } from "react";

import ChatUser from "../components/Chat";
import AIChatBubble from "../components/AIChatBubble";
import useChat from "../hooks/useChat"; // Import the useChat hook
import { useLocation } from "react-router-dom";
export default function ChatNew() {
  const location = useLocation();
  const {
    messages,
    inputMessage,
    isLoading,
    setInputMessage,
    handleSendMessage,
  } = useChat(); // Use the hook
  const chatEndRef = useRef(null); // Create a ref for scrolling
  // State untuk tinggi textarea
  const [textareaHeight, setTextareaHeight] = useState("auto");
  const [inputMessageText, setInputMessageText] = useState("");
  const textareaRef = useRef(null); // Ref untuk textarea

  // Scroll to bottom whenever messages change
  useEffect(() => {
    if (chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
    console.log(location.state.messages[0].text);
    console.log(location.state);
    updateTextareaHeight();
  }, [messages, inputMessage]);
  console.log("location di chatpge sidebar = ", location);

  // const handleInputChange = (e) => {
  //   setInputMessage(e.target.value);
  //   let value = e.target.value;
  //   console.log(value.length);
  //   let countEnter = 0;
  //   for (let index = 0; index < value.length; index++) {
  //     console.log(value[index]);
  //     if (value[index] == "/n") {
  //       countEnter++;
  //       console.log("Count Enter =", countEnter);
  //     }
  //   }
  //   if (e.target.scrollHeight > 100) {
  //     setTextareaHeight(countEnter * 20 + 10);
  //   }
  //   setTextareaHeight("auto"); // Set to auto to recalculate height
  //   console.log(e);
  //   console.log("tinggi element", e.target.scrollHeight);
  //   setTextareaHeight(`${e.target.scrollHeight}px`); // Set height to scrollHeight
  // };
  const handleInputChange = (e) => {
    setInputMessage(e.target.value); // Update konten berdasarkan input user
  };
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault(); // Prevent new line on Enter
      handleSendMessage(); // Call send message function
    }
  };
  // Fungsi untuk memperbarui tinggi textarea
  // const updateTextareaHeight = () => {
  //   const textarea = textareaRef.current;
  //   textarea.style.height = "auto"; // Reset tinggi agar mengecil jika diperlukan
  //   textarea.style.height = `${textarea.scrollHeight}px`; // Set tinggi berdasarkan scrollHeight
  // };
  // Fungsi untuk memperbarui tinggi textarea dengan batas maksimal
  const updateTextareaHeight = () => {
    const textarea = textareaRef.current;
    const maxHeight = window.innerHeight * 0.75; // 75% dari tinggi layar

    textarea.style.height = "auto"; // Reset tinggi agar mengecil jika diperlukan
    const newHeight = Math.min(textarea.scrollHeight, maxHeight); // Ambil nilai terkecil antara scrollHeight dan maxHeight
    textarea.style.height = `${newHeight}px`; // Set tinggi baru
  };
  return (
    <div className="max-w-3xl mx-auto ">
      {/* respond area */}
      <div className="flex-grow p-4 overflow-y-auto max-w-[1440px] align-middle mx-auto w-full pb-20">
        <div className="space-y-4">
          <ChatUser msg={location.state.messages[0].text} />
          <AIChatBubble
            avatar="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
            sender="Chat-AI Bot"
            time={new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
            message={location.state.messages[1].text}
            status="Delivered"
          />
          {messages.map((msg, index) => (
            <div key={index}>
              {msg.sender === "user" ? (
                <ChatUser msg={msg.text} />
              ) : (
                <AIChatBubble
                  avatar="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  sender="Chat-AI Bot"
                  time={new Date().toLocaleTimeString([], {
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                  message={msg.text}
                  status="Delivered"
                />
              )}
            </div>
          ))}
          {/* Add a div to act as a scroll anchor */}
          <div ref={chatEndRef} /> {/* Anchor for scrolling */}
        </div>
      </div>
      {/* chat area */}
      <div className="fixed bottom-4 w-full z-10 max-w-3xl md: p-5">
        <div className="relative flex">
          {/* <textarea
            className="text-black pb-12 block w-full bg-gray-100 border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
            placeholder="Ask me anything..."
          ></textarea> */}
          <textarea
            disabled={isLoading} // Disable textarea when loading
            style={{ height: textareaHeight }}
            className="text-black p-4 pb-5 block w-full bg-gray-100 border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-800 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
            placeholder={isLoading ? "Loading..." : "Ask me anything..."}
            onInput={handleInputChange}
            onKeyDown={handleKeyDown}
            ref={textareaRef} // Referensi untuk textarea
            value={inputMessage}
            onChange={handleInputChange}
          // rows={2} // Jumlah minimal baris textarea
          ></textarea>
          <div
            onClick={() => handleSendMessage()}
            className="absolute size-8 right-5 bottom-6">
            <button
              type="button"
              className="inline-flex shrink-0 justify-center items-center size-12 rounded-lg text-white bg-blue-600 hover:bg-blue-500 focus:z-10 focus:outline-none focus:bg-blue-500"
            >
              <svg
                className="shrink-0 size-5"
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
              </svg>
            </button>
          </div>
          {/* <textarea> halo</textarea> */}
          {/* <div className="absolute bottom-px inset-x-px p-2 rounded-b-lg bg-gray-100 dark:bg-neutral-800">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <button
                  type="button"
                  className="inline-flex shrink-0 justify-center items-center size-8 rounded-lg text-gray-500 hover:bg-white focus:z-10 focus:outline-none focus:bg-white dark:text-neutral-500 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
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
                    <rect width="18" height="18" x="3" y="3" rx="2" />
                    <line x1="9" x2="15" y1="15" y2="9" />
                  </svg>
                </button>

                <button
                  type="button"
                  className="inline-flex shrink-0 justify-center items-center size-8 rounded-lg text-gray-500 hover:bg-white focus:z-10 focus:outline-none focus:bg-white dark:text-neutral-500 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
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
                    <path d="m21.44 11.05-9.19 9.19a6 6 0 0 1-8.49-8.49l8.57-8.57A4 4 0 1 1 18 8.84l-8.59 8.57a2 2 0 0 1-2.83-2.83l8.49-8.48" />
                  </svg>
                </button>
              </div>

              <div className="flex items-center gap-x-1">
                <button
                  type="button"
                  className="inline-flex shrink-0 justify-center items-center size-8 rounded-lg text-gray-500 hover:bg-white focus:z-10 focus:outline-none focus:bg-white dark:text-neutral-500 dark:hover:bg-neutral-700 dark:focus:bg-neutral-700"
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
                    <path d="M12 2a3 3 0 0 0-3 3v7a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3Z" />
                    <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
                    <line x1="12" x2="12" y1="19" y2="22" />
                  </svg>
                </button>

                <button
                  type="button"
                  className="inline-flex shrink-0 justify-center items-center size-8 rounded-lg text-white bg-blue-600 hover:bg-blue-500 focus:z-10 focus:outline-none focus:bg-blue-500"
                >
                  <svg
                    className="shrink-0 size-3.5"
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    viewBox="0 0 16 16"
                  >
                    <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
                  </svg>
                </button>
              </div>
            </div>
          </div> */}
        </div>
        {/* className="absolute right-4 bottom-4 inline-flex shrink-0 justify-center items-center size-8 rounded-lg text-white bg-blue-600 hover:bg-blue-500 focus:z-10 focus:outline-none focus:bg-blue-500"
  > */}
        {/* <div className="absolute right-4 bottom-5 inline-flex shrink-0 justify-center item-center size-8"> */}
      </div>
    </div>
  );
}
