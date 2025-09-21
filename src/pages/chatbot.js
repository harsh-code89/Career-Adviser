"use client";

import { useState, useEffect, useRef } from 'react';
import { sendMessageToChatbot } from '@/lib/chatbot';

export default function CareerChatbot() {
  const [sessionId] = useState(() => `session-${Date.now()}`);
  const [message, setMessage] = useState('');
  const [chatHistory, setChatHistory] = useState([
    {
      sender: 'bot',
      text: "👋 Hello! I'm your AI career advisor. I can help you with career guidance, resume tips, interview preparation, and industry insights. What would you like to know?",
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const chatEndRef = useRef(null);

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);

  const handleSendMessage = async () => {
    if (!message.trim() || isLoading) return;

    const userMessage = {
      sender: 'user',
      text: message,
      timestamp: new Date()
    };

    setChatHistory((prev) => [...prev, userMessage]);
    setMessage('');
    setIsLoading(true);
    setIsTyping(true);

    try {
      const response = await sendMessageToChatbot(sessionId, message);
      const botMessage = {
        sender: 'bot',
        text: response.fulfillmentText,
        timestamp: new Date()
      };
      setChatHistory((prev) => [...prev, botMessage]);
    } catch (error) {
      const errorMessage = {
        sender: 'bot',
        text: "I'm sorry, I'm having trouble connecting right now. Please try again in a moment. 🤖",
        timestamp: new Date()
      };
      setChatHistory((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setIsTyping(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const quickQuestions = [
    "What skills are in demand?",
    "How to prepare for interviews?",
    "Resume writing tips",
    "Career change advice"
  ];

  return (
    <div className="min-h-screen gradient-chat flex flex-col">
      {/* Floating Elements */}
      <div className="absolute top-20 left-10 w-16 h-16 bg-white/10 rounded-full float hidden lg:block"></div>
      <div className="absolute top-40 right-20 w-12 h-12 bg-white/5 rounded-full float hidden lg:block" style={{animationDelay: '2s'}}></div>
      <div className="absolute bottom-20 left-1/4 w-20 h-20 bg-white/10 rounded-full float hidden lg:block" style={{animationDelay: '4s'}}></div>

      {/* Header */}
      <header className="bg-white/10 backdrop-blur-md border-b border-white/20 py-6 px-8">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-xl">CA</span>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white">AI Career Assistant</h1>
              <p className="text-white/70 text-sm">24/7 career guidance and support</p>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-white/80">
              <div className="w-2 h-2 bg-green-400 rounded-full"></div>
              <span className="text-sm">Online</span>
            </div>
            <button
              onClick={() => window.history.back()}
              className="text-white/80 hover:text-white transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
              Close
            </button>
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col max-w-6xl mx-auto w-full p-4">
        {/* Quick Questions */}
        <div className="mb-6">
          <p className="text-white/80 text-sm mb-3">Quick questions:</p>
          <div className="flex flex-wrap gap-2">
            {quickQuestions.map((question, index) => (
              <button
                key={index}
                onClick={() => setMessage(question)}
                className="bg-white/20 text-white px-4 py-2 rounded-xl text-sm hover:bg-white/30 transition-colors"
              >
                {question}
              </button>
            ))}
          </div>
        </div>

        {/* Chat Container */}
        <div className="flex-1 modern-card flex flex-col">
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-6 space-y-4">
            {chatHistory.map((chat, index) => (
              <div
                key={index}
                className={`flex ${chat.sender === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] ${chat.sender === 'user' ? 'order-2' : 'order-1'}`}>
                  <div className={`chat-message-${chat.sender} p-4`}>
                    <p className="text-sm leading-relaxed">{chat.text}</p>
                    <p className={`text-xs mt-2 ${chat.sender === 'user' ? 'text-white/70' : 'text-gray-500'}`}>
                      {formatTime(chat.timestamp)}
                    </p>
                  </div>
                </div>
              </div>
            ))}

            {/* Typing Indicator */}
            {isTyping && (
              <div className="flex justify-start">
                <div className="chat-message-bot p-4">
                  <div className="flex items-center gap-2">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                      <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                    </div>
                    <span className="text-sm text-gray-500">AI is typing...</span>
                  </div>
                </div>
              </div>
            )}

            <div ref={chatEndRef} />
          </div>

          {/* Message Input */}
          <div className="border-t border-gray-200 p-6">
            <div className="flex gap-3">
              <div className="flex-1 relative">
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about your career..."
                  className="input-modern resize-none pr-12"
                  rows={1}
                  disabled={isLoading}
                  style={{ minHeight: '48px', maxHeight: '120px' }}
                />
                <button
                  onClick={handleSendMessage}
                  disabled={!message.trim() || isLoading}
                  className={`absolute right-3 top-1/2 transform -translate-y-1/2 p-2 rounded-lg transition-all duration-200 ${
                    message.trim() && !isLoading
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:scale-110'
                      : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                  }`}
                >
                  {isLoading ? (
                    <div className="loading-spinner w-4 h-4"></div>
                  ) : (
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                    </svg>
                  )}
                </button>
              </div>
            </div>

            <div className="flex justify-between items-center mt-3 text-xs text-gray-500">
              <span>Press Enter to send, Shift+Enter for new line</span>
              <span>{message.length}/1000</span>
            </div>
          </div>
        </div>

        {/* Chat Features */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="modern-card p-4 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">24/7 Available</h3>
            <p className="text-gray-600 text-sm">Get instant career advice anytime</p>
          </div>

          <div className="modern-card p-4 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">Personalized</h3>
            <p className="text-gray-600 text-sm">Tailored advice based on your profile</p>
          </div>

          <div className="modern-card p-4 text-center">
            <div className="w-12 h-12 bg-gradient-to-r from-yellow-500 to-orange-500 rounded-xl flex items-center justify-center mx-auto mb-3">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="font-semibold text-gray-800 mb-1">Expert Knowledge</h3>
            <p className="text-gray-600 text-sm">Industry insights and best practices</p>
          </div>
        </div>
      </main>
    </div>
  );
}
