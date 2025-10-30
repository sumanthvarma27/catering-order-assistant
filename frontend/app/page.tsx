'use client';

import RoyalChatInterface from './components/RoyalChatInterface';

export default function CateringDashboard() {
  return (
    <div className="relative min-h-screen bg-gradient-to-b from-[#fdfaf5] via-[#f9f4ec] to-[#f6eee0] p-10">
      {/* Page Heading */}
      <header className="mb-10 text-center">
        <h2 className="text-5xl font-heading text-copper tracking-tight mb-2">
          Catering Dashboard
        </h2>
      </header>

      {/* Chat Section - moved to top */}
      <section
        id="chat"
        className="bg-white/80 backdrop-blur-xl border border-amber-100 rounded-3xl shadow-royal overflow-hidden mb-12 animate-fadeInUp"
      >
        <RoyalChatInterface />
      </section>

      {/* Overview Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <div className="bg-white/90 rounded-2xl border border-amber-100 shadow-royal p-6 hover:shadow-royal-hover transition-all duration-300">
          <h3 className="text-lg font-semibold text-copper mb-2">Active Chats</h3>
          <p className="text-4xl font-bold text-brown">12</p>
          <p className="text-sm text-gray-600">Ongoing catering conversations</p>
        </div>

        <div className="bg-white/90 rounded-2xl border border-amber-100 shadow-royal p-6 hover:shadow-royal-hover transition-all duration-300">
          <h3 className="text-lg font-semibold text-copper mb-2">Orders This Month</h3>
          <p className="text-4xl font-bold text-brown">48</p>
          <p className="text-sm text-gray-600">Completed catering bookings</p>
        </div>

        <div className="bg-white/90 rounded-2xl border border-amber-100 shadow-royal p-6 hover:shadow-royal-hover transition-all duration-300">
          <h3 className="text-lg font-semibold text-copper mb-2">Customer Satisfaction</h3>
          <p className="text-4xl font-bold text-brown">98%</p>
          <p className="text-sm text-gray-600">Based on client feedback</p>
        </div>
      </section>
    </div>
  );
}
