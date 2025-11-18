'use client';

import { useState } from 'react';
import EditTrayModal from './EditTrayModal';
import { TrayItem } from '@/lib/types';

const RECOMMENDATIONS = [
  { 
    id: 101, 
    name: 'Paneer Tikka', 
    category: 'Veg Appetizers',
    description: 'Marinated cottage cheese', 
    suggested: '1 HALF',
    price: 100
  },
  { 
    id: 102, 
    name: 'Plain Naan', 
    category: 'Breads',
    description: 'Freshly baked bread', 
    suggested: '20 pieces',
    price: 50
  },
  { 
    id: 103, 
    name: 'Gulab Jamun', 
    category: 'Desserts',
    description: 'Traditional sweet', 
    suggested: '20 pieces',
    price: 30
  },
  { 
    id: 104, 
    name: 'Dal Fry', 
    category: 'Veg Entrees',
    description: 'Tempered lentils', 
    suggested: '1 HALF',
    price: 65
  },
];

interface MenuSummaryProps {
  initialItems: TrayItem[];
}

export default function MenuSummary({ initialItems }: MenuSummaryProps) {
  const [selectedItem, setSelectedItem] = useState<TrayItem | null>(null);
  const [menu, setMenu] = useState<TrayItem[]>(initialItems);
  const [orderConfirmed, setOrderConfirmed] = useState(false);

  const updateItem = (updated: TrayItem) => {
    setMenu((prev) => prev.map((m) => (m.id === updated.id ? updated : m)));
  };

  const removeItem = (itemId: number) => {
    if (confirm('Are you sure you want to remove this item?')) {
      setMenu((prev) => prev.filter((m) => m.id !== itemId));
    }
  };

  const addRecommendation = (rec: typeof RECOMMENDATIONS[0]) => {
    const newItem: TrayItem = {
      id: Date.now(),
      name: rec.name,
      category: rec.category,
      suggested: rec.suggested,
      size: rec.suggested.split(' ')[1] as 'HALF' | 'MEDIUM' | 'LARGE',
      count: 1,
      price: rec.price,
    };
    setMenu((prev) => [...prev, newItem]);
  };

  const groupedMenu = menu.reduce<Record<string, TrayItem[]>>((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  const calculateTotal = () => {
    return menu.reduce((total, item) => {
      return total + ((item.price || 0) * item.count);
    }, 0);
  };

  const handleConfirmOrder = async () => {
    setOrderConfirmed(true);
    
    // Send order to backend
    try {
      await fetch('/api/orders/confirm', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: menu,
          total: calculateTotal(),
          timestamp: new Date().toISOString(),
        }),
      });
    } catch (error) {
      console.error('Error confirming order:', error);
    }
  };

  if (orderConfirmed) {
    return (
      <div className="flex flex-col items-center justify-center h-full text-center p-8">
        <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mb-6">
          <span className="text-5xl">✅</span>
        </div>
        <h2 className="text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-600 to-emerald-600 mb-4">
          Order Received!
        </h2>
        <p className="text-gray-700 text-lg mb-2">
          Thank you for your order of <span className="font-bold text-amber-600">${calculateTotal()}</span>
        </p>
        <p className="text-gray-600 mb-6">
          Our team will contact you shortly to confirm the details and finalize your catering order.
        </p>
        <div className="bg-amber-50 border-2 border-amber-200 rounded-2xl p-6 max-w-md">
          <p className="text-sm text-gray-600 mb-2">📞 We'll call you within 24 hours</p>
          <p className="text-sm text-gray-600">📧 Check your email for order confirmation</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-700 via-orange-600 to-red-600 mb-4 text-center">
        🍽️ Your Catering Summary
      </h2>

      <div className="flex-1 overflow-y-auto space-y-6 pr-2">
        {Object.entries(groupedMenu).map(([category, items]) => (
          <div key={category}>
            <h3 className="text-lg font-semibold text-amber-700 mb-2 flex items-center gap-2">
              <span className="w-2 h-2 bg-amber-500 rounded-full"></span>
              {category}
            </h3>
            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between bg-white/70 border border-amber-100 rounded-xl p-3 shadow-sm hover:shadow-md transition group"
                >
                  <div className="flex-1">
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <p className="text-xs text-gray-500">
                      {item.count} × {item.size} Tray
                    </p>
                    {item.price && (
                      <p className="text-sm font-semibold text-amber-600 mt-1">
                        ${item.price * item.count}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedItem(item)}
                      className="text-sm bg-gradient-to-r from-amber-400 to-orange-500 text-white px-3 py-1.5 rounded-lg shadow hover:shadow-lg transition-all hover:scale-105"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => removeItem(item.id)}
                      className="text-sm bg-red-500 text-white px-3 py-1.5 rounded-lg shadow hover:shadow-lg hover:bg-red-600 transition-all hover:scale-105"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Recommendations */}
        <div className="border-t-2 border-amber-200 pt-6 mt-6">
          <h3 className="text-lg font-semibold text-gray-700 mb-3 flex items-center gap-2">
            <span className="text-xl">✨</span>
            Recommended Add-ons
          </h3>
          <p className="text-xs text-gray-500 mb-4">
            Complete your catering experience with these popular items
          </p>
          <div className="space-y-3">
            {RECOMMENDATIONS.map((rec) => (
              <div
                key={rec.id}
                className="flex items-center justify-between bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-xl p-3 hover:shadow-md transition group"
              >
                <div className="flex-1">
                  <p className="font-medium text-gray-800">{rec.name}</p>
                  <p className="text-xs text-gray-600">{rec.description}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    ${rec.price}
                  </p>
                </div>
                <button
                  onClick={() => addRecommendation(rec)}
                  className="text-sm bg-green-500 text-white px-3 py-1.5 rounded-lg shadow hover:shadow-lg hover:bg-green-600 transition-all hover:scale-105 flex items-center gap-1"
                >
                  <span>+</span> Add
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Total and Confirm */}
      <div className="mt-6 space-y-3">
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="text-gray-600">Total Items:</span>
            <span className="font-semibold text-gray-800">{menu.length}</span>
          </div>
          <div className="flex justify-between items-center text-lg">
            <span className="font-bold text-gray-800">Total Amount:</span>
            <span className="font-bold text-amber-600">${calculateTotal()}</span>
          </div>
        </div>
        <button
          onClick={handleConfirmOrder}
          className="w-full bg-gradient-to-r from-amber-500 via-orange-500 to-red-500 text-white font-semibold py-3 rounded-2xl hover:shadow-xl hover:shadow-amber-500/50 transition-all duration-300 transform hover:scale-[1.02] active:scale-[0.98]"
        >
          Confirm Order (${calculateTotal()})
        </button>
        <p className="text-xs text-center text-gray-500">
          We'll contact you via phone to finalize your order
        </p>
      </div>

      {selectedItem && (
        <EditTrayModal
          item={selectedItem}
          onClose={() => setSelectedItem(null)}
          onSave={updateItem}
        />
      )}
    </div>
  );
}