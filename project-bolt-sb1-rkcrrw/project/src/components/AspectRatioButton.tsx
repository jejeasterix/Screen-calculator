import React from 'react';
import { MonitorIcon } from 'lucide-react';

interface AspectRatioButtonProps {
  ratio: string;
  selected: boolean;
  onClick: () => void;
}

export function AspectRatioButton({ ratio, selected, onClick }: AspectRatioButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`flex-1 px-4 py-2 rounded-lg border ${
        selected
          ? 'bg-indigo-600 text-white border-indigo-600'
          : 'border-gray-300 text-gray-700 hover:bg-gray-50'
      }`}
    >
      <div className="flex items-center justify-center gap-2">
        <MonitorIcon className="w-4 h-4" />
        {ratio}
      </div>
    </button>
  );
}