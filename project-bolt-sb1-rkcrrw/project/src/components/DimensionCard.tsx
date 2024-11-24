import React from 'react';
import { ArrowLeftRight, ArrowUpDown, Maximize2 } from 'lucide-react';

interface DimensionCardProps {
  label: string;
  value: number;
  isMetric: boolean;
}

const dimensionIcons = {
  'Largeur': ArrowLeftRight,
  'Hauteur': ArrowUpDown,
  'Diagonale': Maximize2,
  'Distance minimale': ArrowLeftRight,
  'Distance maximale': ArrowLeftRight
};

export function DimensionCard({ label, value, isMetric }: DimensionCardProps) {
  const Icon = dimensionIcons[label as keyof typeof dimensionIcons];
  const metricValue = isMetric ? value : value * 2.54;
  const imperialValue = isMetric ? value / 2.54 : value;

  return (
    <div className="bg-gray-50 rounded-xl p-4">
      <div className="flex items-center gap-2 mb-2">
        {Icon && <Icon className="w-4 h-4 text-indigo-600" />}
        <h3 className="font-medium text-gray-700">{label}</h3>
      </div>
      <div className="space-y-1">
        <p className="text-lg font-semibold text-gray-900">
          {metricValue.toFixed(1)} cm
        </p>
        <p className="text-sm text-gray-500">
          {imperialValue.toFixed(1)} in
        </p>
      </div>
    </div>
  );
}