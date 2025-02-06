import React, { useState } from "react";
import axios from "axios";

const Chatbot = () => {
  const [messages, setMessages] = useState([]);
  const [prompt, setPrompt] = useState("");

  const handleSend = async () => {
    if (!prompt.trim()) return;

    const userMessage = { sender: "user", text: prompt };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await axios.post("https://deaddiction-project-backend.onrender.com/api/chat/", {
        prompt,
      });
      const botMessage = { sender: "bot", text: response.data.response };
      setMessages((prev) => [...prev, botMessage]);
    } catch (error) {
      console.error("Error:", error);
      const errorMessage = {
        sender: "bot",
        text: "Something went wrong. Please try again!",
      };
      setMessages((prev) => [...prev, errorMessage]);
    }

    setPrompt("");
  };

  return (
    <div className="flex flex-col justify-between">
      <div className="mb-8 mt-8 flex flex-col md:flex-row h-full">
        <div className="w-full md:w-1/2 bg-gradient-to-r from-blue-400 to-blue-400 p-8 flex items-center justify-center">
          <h2 className="text-white text-2xl md:text-3xl font-semibold text-center">
            Hi there! I'm DeAddiction, your personal chatbot. Feel free to ask me anything!
          </h2>
        </div>

        <div className="w-full md:w-1/2 flex flex-col bg-gray-100 p-4 border-l border-gray-300">
          <header className="bg-blue-400 text-white text-center py-4 font-bold text-lg border-b border-blue-400">
            Chatbot
          </header>

          <div
            className="flex-1 p-4 overflow-y-auto"
            style={{
              maxHeight: "400px",
              overflowY: messages.length > 6 ? "auto" : "initial",
            }}
          >
            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${
                  msg.sender === "user" ? "justify-end" : "justify-start"
                } mb-2`}
              >
                <div
                  className={`px-4 py-2 rounded-lg ${
                    msg.sender === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-gray-300 text-black"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          <div className="bg-white p-4 flex items-center gap-2 border-t border-gray-300">
            <input
              type="text"
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring focus:ring-blue-300"
            />
            <button
              onClick={handleSend}
              className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;
