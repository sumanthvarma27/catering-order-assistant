'use client';

import { useState } from 'react';

interface TrayItem {
  id: number;
  name: string;
  category: string;
  suggested: string;
  size: string;
  count: number;
}

interface EditTrayModalProps {
  item: TrayItem;
  onClose: () => void;
  onSave: (item: TrayItem) => void;
}

export default function EditTrayModal({ item, onClose, onSave }: EditTrayModalProps) {
  const [size, setSize] = useState(item.size);
  const [count, setCount] = useState(item.count);

  const trayOptions = [
    { code: 'SD', label: 'Small (serves ~15)' },
    { code: 'LM', label: 'Medium (serves ~30)' },
    { code: 'LD', label: 'Large (serves ~50)' },
  ];

  const saveChanges = () => {
    onSave({ ...item, size, count, suggested: `${count} ${size}` });
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/40 backdrop-blur-sm flex justify-center items-center z-50">
      <div className="bg-white rounded-3xl p-6 shadow-2xl w-full max-w-md animate-fadeIn">
        <h2 className="text-xl font-semibold text-copper mb-4">Edit Tray Size</h2>

        <label className="block mb-3 text-gray-700 text-sm font-medium">
          Select Tray Size:
        </label>
        <select
          value={size}
          onChange={(e) => setSize(e.target.value)}
          className="w-full border border-amber-200 rounded-lg p-2 mb-4 focus:ring-2 focus:ring-amber-400"
        >
          {trayOptions.map((opt) => (
            <option key={opt.code} value={opt.code}>
              {opt.label}
            </option>
          ))}
        </select>

        <label className="block mb-3 text-gray-700 text-sm font-medium">
          Number of Trays:
        </label>
        <input
          type="number"
          value={count}
          onChange={(e) => setCount(parseInt(e.target.value))}
          min={1}
          className="w-full border border-amber-200 rounded-lg p-2 mb-6 focus:ring-2 focus:ring-amber-400"
        />

        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-lg bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium"
          >
            Cancel
          </button>
          <button
            onClick={saveChanges}
            className="px-5 py-2 rounded-lg bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold shadow-md hover:shadow-lg"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
