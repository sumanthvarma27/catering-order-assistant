'use client';

import { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { IoSend, IoClose, IoCheckmarkDone } from 'react-icons/io5';
import { FaRedo, FaStar } from 'react-icons/fa';
import { HiSparkles } from 'react-icons/hi';
import { useClientTime } from './hooks/useClientTime'; // add at top


export default function RoyalChatInterface() {
  const [messages, setMessages] = useState<{ role: string; content: string; id: number }[]>([
    {
      role: 'assistant',
      content:
        "👋 Welcome to Royal Biryani House! I'm your AI catering assistant. I can help you with quotes, menu selection, and event planning. What occasion are you celebrating?",
      id: Date.now(),
    },
  ]);

  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const endRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement | null>(null);
  const [isOpen, setIsOpen] = useState(true);
  const currentTime = useClientTime();

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  const send = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMsg = { role: 'user', content: input, id: Date.now() };
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setLoading(true);
    setIsTyping(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMsg] }),
      });

      if (!res.ok) throw new Error('Failed to send message');
      const data = await res.json();

      setTimeout(() => {
        setMessages((prev) => [
          ...prev,
          { role: 'assistant', content: data.message, id: Date.now() },
        ]);
        setIsTyping(false);
      }, 800);
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: '❌ Oops! Something went wrong. Please try again or start a new conversation.',
          id: Date.now(),
        },
      ]);
      setIsTyping(false);
    } finally {
      setLoading(false);
    }
  };

  const resetConversation = () => {
    setMessages([
      {
        role: 'assistant',
        content: '👋 Fresh start! How can I help you plan your perfect event today?',
        id: Date.now(),
      },
    ]);
    setInput('');
  };

  const quickReplies = [
    { text: 'I need catering for 50 people', icon: '👥' },
    { text: "What's on your menu?", icon: '📋' },
    { text: 'Wedding catering options', icon: '💒' },
    { text: 'Corporate event pricing', icon: '💼' },
  ];

  const handleQuickReply = (reply: string) => {
    setInput(reply);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  return (
    <div className="flex flex-col h-[80vh]">
      {/* Header */}
      <div className="relative bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 px-6 py-5 text-white rounded-t-3xl">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="relative">
              <div className="absolute inset-0 bg-white/30 rounded-full blur-xl"></div>
              <div className="relative w-12 h-12 bg-white/20 rounded-full flex items-center justify-center backdrop-blur-sm border-2 border-white/40">
                <span className="text-2xl">✦</span>
              </div>
            </div>
            <div>
              <h3
                className="font-bold text-xl flex items-center gap-2"
                style={{ fontFamily: 'Playfair Display, serif' }}
              >
                Royal Biryani House
                <HiSparkles className="animate-pulse" size={18} />
              </h3>
              <div className="flex items-center gap-2 text-xs text-white/90">
                <span className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse shadow-lg shadow-green-400/50"></span>
                  Online
                </span>
                <span>•</span>
                <span>AI Assistant</span>
                <span>•</span>
                <span className="flex items-center gap-1">
                  <FaStar size={10} className="text-yellow-300" />
                  5.0 Rating
                </span>
              </div>
            </div>
          </div>

          <div className="flex gap-2">
            <motion.button
              onClick={resetConversation}
              className="hover:bg-white/20 p-2.5 rounded-full transition-colors duration-200 backdrop-blur-sm"
              whileHover={{ scale: 1.1, rotate: 180 }}
              whileTap={{ scale: 0.9 }}
              title="Start new conversation"
            >
              <FaRedo size={18} />
            </motion.button>
            <motion.button
              onClick={() => setIsOpen(false)}
              className="hover:bg-white/20 p-2.5 rounded-full transition-colors duration-200 backdrop-blur-sm"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <IoClose size={24} />
            </motion.button>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-gradient-to-b from-amber-50/30 to-white">
        {messages.map((m) => (
          <motion.div
            key={m.id}
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            transition={{ duration: 0.3 }}
            className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
          >
            <div
              className={`max-w-[80%] ${
                m.role === 'user'
                  ? 'bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-3xl rounded-br-md'
                  : 'bg-white/90 backdrop-blur-sm text-gray-800 border-2 border-amber-100 rounded-3xl rounded-bl-md'
              } px-6 py-4 shadow-lg hover:shadow-xl transition-shadow duration-300`}
            >
              {m.role === 'assistant' && (
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-6 h-6 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                    <span className="text-xs">✦</span>
                  </div>
                  <span className="text-xs font-bold text-amber-700">Royal AI</span>
                </div>
              )}
              <div className={m.role === 'user' ? 'text-white font-medium' : 'text-gray-800'}>
                {m.content}
              </div>
              {m.role === 'user' && (
                <div className="flex justify-end mt-2">
                  <IoCheckmarkDone size={16} className="text-white/80" />
                </div>
              )}
              {m.role === 'assistant' && (
                <div className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                  {m.role === 'assistant' && (
                    <div className="text-xs text-gray-400 mt-2 flex items-center gap-1">
                      {currentTime ? <span>{currentTime}</span> : null}
                    </div>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex justify-start"
          >
            <div className="bg-white/90 backdrop-blur-sm border-2 border-amber-100 rounded-3xl rounded-bl-md px-6 py-4 shadow-lg">
              <div className="flex items-center gap-2 mb-2">
                <div className="w-6 h-6 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                  <span className="text-xs">✦</span>
                </div>
                <span className="text-xs font-bold text-amber-700">Royal AI</span>
              </div>
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full animate-bounce"></span>
                <span
                  className="w-2.5 h-2.5 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full animate-bounce"
                  style={{ animationDelay: '0.2s' }}
                ></span>
                <span
                  className="w-2.5 h-2.5 bg-gradient-to-r from-amber-400 to-orange-500 rounded-full animate-bounce"
                  style={{ animationDelay: '0.4s' }}
                ></span>
              </div>
            </div>
          </motion.div>
        )}

        {/* Quick Replies */}
        {messages.length === 1 && !loading && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="pt-4">
            <p className="text-xs text-gray-500 mb-3 text-center font-semibold flex items-center justify-center gap-2">
              <HiSparkles className="text-amber-500" />
              Quick suggestions
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {quickReplies.map((reply, idx) => (
                <motion.button
                  key={idx}
                  onClick={() => handleQuickReply(reply.text)}
                  className="group bg-white/90 backdrop-blur-sm border-2 border-amber-200 hover:border-amber-400 text-gray-700 px-5 py-3 rounded-2xl text-sm font-medium hover:shadow-lg transition-all duration-300 flex items-center gap-3"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-2xl group-hover:scale-110 transition-transform duration-300">
                    {reply.icon}
                  </span>
                  <span>{reply.text}</span>
                </motion.button>
              ))}
            </div>
          </motion.div>
        )}

        <div ref={endRef}></div>
      </div>

      {/* Input */}
      <div className="border-t-2 border-amber-100 bg-white/80 backdrop-blur-xl p-5 rounded-b-3xl">
        <form onSubmit={send} className="flex gap-3 items-end">
          <div className="flex-1">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  send(e);
                }
              }}
              placeholder="Type your message here..."
              disabled={loading}
              rows={1}
              className="w-full border-2 border-amber-200 rounded-2xl px-5 py-3.5 text-base focus:ring-2 focus:ring-amber-500 focus:border-amber-500 outline-none transition-all duration-200 disabled:bg-gray-100 disabled:cursor-not-allowed resize-none bg-white/90 backdrop-blur-sm"
              maxLength={500}
            />
            <div className="flex justify-between items-center mt-2 px-2">
              <span className="text-xs text-gray-400 font-medium">{input.length}/500</span>
              <span className="text-xs text-gray-400 flex items-center gap-1">
                <kbd className="px-2 py-0.5 bg-gray-100 border border-gray-300 rounded text-xs">
                  Enter
                </kbd>
                to send
              </span>
            </div>
          </div>
          <motion.button
            type="submit"
            disabled={loading || !input.trim()}
            className="bg-gradient-to-r from-amber-500 to-orange-500 text-white p-4 rounded-2xl hover:shadow-lg hover:shadow-amber-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 mb-7"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <IoSend size={24} />
          </motion.button>
        </form>

        <div className="flex items-center justify-center gap-2 mt-3">
          <p className="text-xs text-gray-500">🔒 Secure</p>
          <span className="text-gray-300">•</span>
          <p className="text-xs text-gray-500">🚀 AI-Powered</p>
          <span className="text-gray-300">•</span>
          <p className="text-xs text-gray-500">⭐ Trusted</p>
        </div>
      </div>
    </div>
  );
}
