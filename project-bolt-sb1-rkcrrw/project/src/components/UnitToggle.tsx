import React from 'react';
import { Ruler } from 'lucide-react';

interface UnitToggleProps {
  isMetric: boolean;
  onToggle: () => void;
}

export function UnitToggle({ isMetric, onToggle }: UnitToggleProps) {
  return (
    <button
      onClick={onToggle}
      className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-50"
    >
      <Ruler className="w-4 h-4 text-indigo-600" />
      <span className="font-medium">
        {isMetric ? 'Métrique (cm)' : 'Impérial (in)'}
      </span>
    </button>
  );
}