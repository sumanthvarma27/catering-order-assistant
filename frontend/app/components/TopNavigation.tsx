'use client';

import { useState } from 'react';
import { FaBell, FaSun, FaMoon } from 'react-icons/fa';

export default function TopNavigation() {
  const [darkMode, setDarkMode] = useState(false);

  return (
    <header className="bg-white/80 backdrop-blur-xl border-b border-brown/10 shadow-sm px-6 py-4 flex items-center justify-between">
      {/* Left Section */}
      <div className="flex items-center gap-4">
        <h2 className="text-xl font-heading text-copper tracking-tight hidden sm:block">
          Dashboard
        </h2>
        <input
          type="text"
          placeholder="Search..."
          className="hidden md:block border border-amber-200 rounded-xl px-4 py-2 text-sm bg-white/70 focus:ring-2 focus:ring-amber-400 outline-none transition-all duration-200"
        />
      </div>

      {/* Right Section */}
      <div className="flex items-center gap-5">
        {/* Theme Toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="text-brown hover:text-copper transition-all"
          title="Toggle Theme"
        >
          {darkMode ? <FaSun size={18} /> : <FaMoon size={18} />}
        </button>

        {/* Notifications */}
        <button
          className="relative text-brown hover:text-copper transition-all"
          title="Notifications"
        >
          <FaBell size={18} />
          <span className="absolute top-0 right-0 w-2.5 h-2.5 bg-red-500 rounded-full animate-pulse" />
        </button>

        {/* Profile */}
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-full bg-gradient-royal flex items-center justify-center text-white font-semibold shadow-md">
            R
          </div>
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-brown">Sumanth Varma</p>
            <p className="text-xs text-gray-500">Owner</p>
          </div>
        </div>
      </div>
    </header>
  );
}
