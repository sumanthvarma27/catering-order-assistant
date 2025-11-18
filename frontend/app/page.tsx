'use client';

import { useState } from 'react';
import Image from 'next/image';
import RoyalChatInterface from '../components/RoyalChatInterface';
import MenuSummary from '../components/MenuSummary';
import { TrayItem } from '@/lib/types';

export default function CateringPage() {
  const [showCart, setShowCart] = useState(false);
  const [cartItems, setCartItems] = useState<TrayItem[]>([]);

  const handleDetailsComplete = (items: TrayItem[]) => {
    setCartItems(items);
    setShowCart(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#fdfaf5] via-[#faf2e6] to-[#f7ebd7] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Logo Header */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <Image 
            src="/logo.png" 
            alt="Royal Biryani House" 
            width={175} 
            height={125}
            className="rounded-lg shadow-lg"
          />
          <div className="text-center">
            <h1 className="text-4xl font-heading text-transparent bg-clip-text bg-gradient-to-r from-amber-700 via-orange-600 to-red-600 font-bold tracking-tight">
              Royal Biryani House
            </h1>
            <p className="text-gray-600 text-sm">AI-Powered Catering Assistant</p>
          </div>
        </div>

        <main className={`grid gap-8 ${showCart ? 'grid-cols-1 lg:grid-cols-2' : 'grid-cols-1 max-w-4xl mx-auto'}`}>
          <section className="bg-white/80 rounded-3xl border border-amber-100 shadow-royal p-4">
            <RoyalChatInterface onDetailsComplete={handleDetailsComplete} />
          </section>

          {showCart && (
            <section className="bg-white/80 rounded-3xl border border-amber-100 shadow-royal p-4">
              <MenuSummary initialItems={cartItems} />
            </section>
          )}
        </main>

        {/* Footer */}
        <footer className="mt-8 text-center text-xs text-gray-500">
          <p>© 2025 Royal Biryani House | AI-Powered Catering Platform</p>
        </footer>
      </div>
    </div>
  );
}