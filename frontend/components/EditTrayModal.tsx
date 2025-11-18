'use client';

import { useState } from 'react';
import { TrayItem, getTraySize } from '@/lib/types';

interface EditTrayModalProps {
  item: TrayItem;
  onClose: () => void;
  onSave: (item: TrayItem) => void;
}

export default function EditTrayModal({ item, onClose, onSave }: EditTrayModalProps) {
  const [size, setSize] = useState(item.size);
  const [count, setCount] = useState(item.count);

  const trayOptions = getTraySize(item.category);

  const saveChanges = () => {
    const selectedTray = trayOptions.find(t => t.code === size);
    onSave({ 
      ...item, 
      size, 
      count, 
      suggested: `${count} × ${size} (${selectedTray?.servings || ''})` 
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white rounded-3xl p-6 shadow-2xl w-full max-w-md">
        <h2 className="text-xl font-semibold text-transparent bg-clip-text bg-gradient-to-r from-amber-700 to-orange-600 mb-4">
          Edit Tray - {item.name}
        </h2>
        
        <p className="text-sm text-gray-600 mb-4">Category: {item.category}</p>
        
        <label className="block mb-3 text-gray-700 text-sm font-medium">
          Select Tray Size:
        </label>
        <select
          value={size}
          onChange={(e) => setSize(e.target.value as 'HALF' | 'MEDIUM' | 'LARGE')}
          className="w-full border border-amber-200 rounded-lg p-3 mb-4 focus:ring-2 focus:ring-amber-400 bg-white"
        >
          {trayOptions.map((opt) => (
            <option key={opt.code} value={opt.code}>
              {opt.code} - {opt.label} ({opt.servings})
            </option>
          ))}
        </select>

        <label className="block mb-3 text-gray-700 text-sm font-medium">
          Number of Trays:
        </label>
        <input
          type="number"
          value={count}
          onChange={(e) => setCount(parseInt(e.target.value) || 1)}
          min={1}
          max={20}
          className="w-full border border-amber-200 rounded-lg p-3 mb-6 focus:ring-2 focus:ring-amber-400"
        />

        {item.price && (
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 mb-4">
            <p className="text-sm text-gray-600">Price per tray: ${item.price}</p>
            <p className="text-lg font-bold text-amber-600">
              Total: ${item.price * count}
            </p>
          </div>
        )}

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium transition-all"
          >
            Cancel
          </button>
          <button
            onClick={saveChanges}
            className="px-5 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold shadow-md hover:shadow-lg transition-all"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
}