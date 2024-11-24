import React, { useEffect, useState } from 'react';
import { calculateProjectionValues, ProjectionValues } from '../utils/projectionCalculations';

interface ProjectionCalculatorProps {
  imageWidth: number;
  onProjectionChange: (values: ProjectionValues) => void;
}

export function ProjectionCalculator({ imageWidth, onProjectionChange }: ProjectionCalculatorProps) {
  const [values, setValues] = useState<ProjectionValues>({
    imageWidth,
    throwDistance: undefined,
    minThrowRatio: undefined,
    maxThrowRatio: undefined
  });

  useEffect(() => {
    setValues(prev => ({ ...prev, imageWidth }));
  }, [imageWidth]);

  const handleChange = (field: keyof ProjectionValues) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value === '' ? undefined : parseFloat(e.target.value);
    const newValues = { ...values, [field]: value };
    const calculatedValues = calculateProjectionValues(newValues);
    setValues(calculatedValues);
    onProjectionChange(calculatedValues);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Distance de projection (cm)
          </label>
          <input
            type="number"
            value={values.throwDistance || ''}
            onChange={handleChange('throwDistance')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            min="0"
            step="0.1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Largeur d'image (cm)
          </label>
          <input
            type="number"
            value={values.imageWidth || ''}
            onChange={handleChange('imageWidth')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            min="0"
            step="0.1"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Rapport de projection min
          </label>
          <input
            type="number"
            value={values.minThrowRatio || ''}
            onChange={handleChange('minThrowRatio')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            min="0"
            step="0.1"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Rapport de projection max
          </label>
          <input
            type="number"
            value={values.maxThrowRatio || ''}
            onChange={handleChange('maxThrowRatio')}
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            min="0"
            step="0.1"
          />
        </div>
      </div>
    </div>
  );
}
