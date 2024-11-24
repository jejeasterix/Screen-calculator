import React from 'react';
import { DimensionType } from '../utils/calculations';

interface DimensionInputProps {
  value: number;
  onChange: (value: number) => void;
  dimensionType: DimensionType;
  onDimensionTypeChange: (type: DimensionType) => void;
  isMetric: boolean;
}

const dimensionIcons = {
  width: '↔',
  height: '↕',
  diagonal: '⤢'
};

const dimensionLabels = {
  width: 'Largeur',
  height: 'Hauteur',
  diagonal: 'Diagonale'
};

export function DimensionInput({
  value,
  onChange,
  dimensionType,
  onDimensionTypeChange,
  isMetric
}: DimensionInputProps) {
  return (
    <div className="space-y-4">
      <div className="flex gap-2">
        {(Object.keys(dimensionLabels) as DimensionType[]).map((type) => (
          <button
            key={type}
            onClick={() => onDimensionTypeChange(type)}
            className={`flex-1 px-3 py-2 rounded-lg border ${
              dimensionType === type
                ? 'bg-indigo-600 text-white border-indigo-600'
                : 'border-gray-300 text-gray-700 hover:bg-gray-50'
            }`}
          >
            <div className="flex items-center justify-center gap-2">
              <span className="text-xl">{dimensionIcons[type]}</span>
              <span className="font-medium">{dimensionLabels[type]}</span>
            </div>
          </button>
        ))}
      </div>
      <div className="relative">
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <span className="text-xl">{dimensionIcons[dimensionType]}</span>
        </div>
        <input
          type="number"
          value={value || ''}
          onChange={(e) => onChange(parseFloat(e.target.value) || 0)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
          placeholder={`Entrez la ${dimensionLabels[dimensionType].toLowerCase()} en ${isMetric ? 'cm' : 'pouces'}`}
        />
        <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none">
          <span className="text-gray-500">{isMetric ? 'cm' : 'in'}</span>
        </div>
      </div>
    </div>
  );
}