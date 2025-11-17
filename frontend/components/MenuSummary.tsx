'use client';

import { useState } from 'react';
import EditTrayModal from './EditTrayModal';

interface TrayItem {
  id: number;
  name: string;
  category: string;
  suggested: string; // e.g. "2 SD"
  size: string;
  count: number;
}

export default function MenuSummary() {
  const [selectedItem, setSelectedItem] = useState<TrayItem | null>(null);
  const [menu, setMenu] = useState<TrayItem[]>([
    { id: 1, name: 'Chicken 65', category: 'Appetizer', suggested: '2 SD', size: 'SD', count: 2 },
    { id: 2, name: 'Butter Chicken', category: 'Entree', suggested: '1 LM', size: 'LM', count: 1 },
    { id: 3, name: 'Hyderabadi Biryani', category: 'Biryani', suggested: '2 LD', size: 'LD', count: 2 },
    { id: 4, name: 'Veg Pulao', category: 'Pulao', suggested: '1 SD', size: 'SD', count: 1 },
    { id: 5, name: 'Gulab Jamun', category: 'Dessert', suggested: '1 LM', size: 'LM', count: 1 },
  ]);

  const updateItem = (updated: TrayItem) => {
    setMenu((prev) => prev.map((m) => (m.id === updated.id ? updated : m)));
  };

  const groupedMenu = menu.reduce<Record<string, TrayItem[]>>((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {});

  const handleConfirm = () => {
    alert('✅ Order confirmed! (Next: connect to backend API)');
  };

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-2xl font-bold text-copper mb-4 text-center">
        🍽️ Your Catering Summary
      </h2>

      <div className="flex-1 overflow-y-auto space-y-6 pr-2">
        {Object.entries(groupedMenu).map(([category, items]) => (
          <div key={category}>
            <h3 className="text-lg font-semibold text-amber-700 mb-2">{category}</h3>
            <div className="space-y-3">
              {items.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between bg-white/70 border border-amber-100 rounded-xl p-3 shadow-sm hover:shadow-md transition"
                >
                  <div>
                    <p className="font-medium text-gray-800">{item.name}</p>
                    <p className="text-xs text-gray-500">
                      RBH Suggested: {item.suggested}
                    </p>
                  </div>
                  <button
                    onClick={() => setSelectedItem(item)}
                    className="text-sm bg-gradient-to-r from-amber-400 to-orange-500 text-white px-3 py-1.5 rounded-lg shadow hover:shadow-lg"
                  >
                    Edit
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6">
        <button
          onClick={handleConfirm}
          className="w-full bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold py-3 rounded-2xl hover:shadow-lg transition-all"
        >
          Confirm Order
        </button>
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
