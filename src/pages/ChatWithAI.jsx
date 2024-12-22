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
    <div className="flex flex-col h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-500 text-white text-center py-4 font-bold text-lg">
        Chatbot
      </header>

      {/* Chat Window */}
      <div className="flex-1 p-4 overflow-y-auto">
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

      {/* Input Field */}
      <div className="bg-white p-4 flex items-center gap-2 border-t">
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
  );
};

export default Chatbot;
