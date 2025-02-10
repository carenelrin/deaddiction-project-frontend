import React, { useState } from "react";
import axios from "axios";

const Chatbot = () => {
  const [messages, setMessages] = useState([]); // Chat history
  const [prompt, setPrompt] = useState(""); // User input

  const handleSend = async () => {
    if (!prompt.trim()) return;

    const userMessage = { sender: "user", text: prompt };
    setMessages((prev) => [...prev, userMessage]);

    try {
      const response = await axios.post("http://localhost:4000/api/chat", {
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
    <div className="flex flex-col min-h-screen">

      <div className="w-full bg-gradient-to-r from-blue-500 to-blue-400 p-8 flex items-center justify-center">
        <h2 className="text-white text-3xl font-semibold">Welcome to Chatbot</h2>
      </div>

      <div className="flex-1 flex flex-col bg-gray-100 p-4 border-t border-gray-300">

        <header className="bg-blue-400 text-white text-center py-4 font-bold text-xl rounded-lg mb-4 shadow-lg">
          Chatbot
        </header>
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`flex ${
                msg.sender === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`px-6 py-3 max-w-md rounded-xl shadow-lg ${
                  msg.sender === "user"
                    ? "bg-blue-400 text-white rounded-br-none"
                    : "bg-gray-200 text-black rounded-bl-none"
                }`}
              >
                {msg.text}
              </div>
            </div>
          ))}
        </div>
        <div className="bg-white p-4 flex items-center gap-2 border-t border-gray-300 shadow-md rounded-lg">
          <input
            type="text"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={handleSend}
            className="bg-blue-400 text-white px-6 py-3 rounded-lg hover:bg-blue-400 transition duration-200"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chatbot;