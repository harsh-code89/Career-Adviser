"use client";

import { useState } from 'react';
import { sendMessageToChatbot } from '@/lib/chatbot';

export default function CareerChatbot() {
  const [sessionId] = useState(() => `session-${Date.now()}`);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([]);

  const handleSendMessage = async () => {
    if (!message.trim()) return;

    const userMessage = { sender: 'user', text: message };
    setChatHistory((prev) => [...prev, userMessage]);

    try {
      const response = await sendMessageToChatbot(sessionId, message);
      const botMessage = { sender: 'bot', text: response.fulfillmentText };
      setChatHistory((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = { sender: 'bot', text: `Error: ${error.message}` };
      setChatHistory((prev) => [...prev, errorMessage]);
    }

    setMessage('');
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4">Career Chatbot</h1>
      <div className="w-full max-w-md p-4 border rounded mb-4 bg-gray-100">
        {chatHistory.map((chat, index) => (
          <div
            key={index}
            className={`mb-2 p-2 rounded ${
              chat.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300'
            }`}
          >
            <strong>{chat.sender === 'user' ? 'You' : 'Bot'}:</strong> {chat.text}
          </div>
        ))}
      </div>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type your message..."
        className="mb-4 p-2 border rounded w-full max-w-md"
      />
      <button
        onClick={handleSendMessage}
        className="p-2 bg-green-500 text-white rounded"
      >
        Send Message
      </button>
    </div>
  );
}