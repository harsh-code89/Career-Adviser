"use client";

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';

export default function Chatbot() {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        router.push('/auth');
      } else {
        setUser(user);
      }
    };
    fetchUser();
  }, []);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const newMessages = [...messages, { text: input, sender: 'user' }];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      if (!user) {
        setMessages([...newMessages, { text: 'You must be logged in to use the chatbot.', sender: 'bot' }]);
        setIsLoading(false);
        return;
      }

      const response = await fetch('/api/chatbot', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sessionId: user.id, message: input }),
      });

      if (!response.ok) {
        throw new Error('Failed to send message.');
      }

      const data = await response.json();
      setMessages([...newMessages, { text: data.fulfillmentText, sender: 'bot' }]);
    } catch {
      setMessages([...newMessages, { text: 'Sorry, something went wrong.', sender: 'bot' }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-6">
      <div className="w-full max-w-2xl bg-white shadow-lg rounded-lg flex flex-col h-[70vh]">
        <div className="p-4 border-b">
          <h1 className="text-2xl font-bold text-gray-800">AI Chatbot</h1>
        </div>
        <div className="flex-1 p-4 overflow-y-auto">
          {messages.map((message, index) => (
            <div key={index} className={`mb-4 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
              <div className={`inline-block p-2 rounded-lg ${message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-800'}`}>
                {message.text}
              </div>
            </div>
          ))}
          {isLoading && <div className="text-gray-500">AI is thinking...</div>}
        </div>
        <div className="p-4 border-t flex">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1 p-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Type your message..."
            disabled={isLoading}
          />
          <button
            onClick={handleSendMessage}
            disabled={isLoading}
            className="px-4 py-2 bg-blue-500 text-white rounded-r-lg hover:bg-blue-600 disabled:opacity-50"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
