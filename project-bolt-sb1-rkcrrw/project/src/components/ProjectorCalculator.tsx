import React, { useState, useEffect } from 'react';
import { Projector } from 'lucide-react';
import { AspectRatioButton } from './AspectRatioButton';
import { DimensionCard } from './DimensionCard';
import { UnitToggle } from './UnitToggle';
import { DimensionInput } from './DimensionInput';
import { RoomVisualizationVP } from './RoomVisualizationVP';
import { RoomDimensions } from './RoomDimensions';
import { calculateDimensionsFromInput, AspectRatioType, DimensionType } from '../utils/calculations';

interface ProjectorCalculatorProps {
  inputValue: number;
  setInputValue: (value: number) => void;
  dimensionType: DimensionType;
  setDimensionType: (type: DimensionType) => void;
  isMetric: boolean;
  setIsMetric: (isMetric: boolean) => void;
  aspectRatio: AspectRatioType;
  setAspectRatio: (ratio: AspectRatioType) => void;
  roomDimensions: {
    width: number;
    height: number;
    depth: number;
  };
  setRoomDimensions: (dimensions: {
    width: number;
    height: number;
    depth: number;
  }) => void;
  bottomHeight: number | null;
  setBottomHeight: (value: number | null) => void;
}

export function ProjectorCalculator({
  inputValue,
  setInputValue,
  dimensionType,
  setDimensionType,
  isMetric,
  setIsMetric,
  aspectRatio,
  setAspectRatio,
  roomDimensions,
  setRoomDimensions,
  bottomHeight,
  setBottomHeight,
}: ProjectorCalculatorProps) {
  const [minThrowRatio, setMinThrowRatio] = useState<number>(1.3);
  const [maxThrowRatio, setMaxThrowRatio] = useState<number>(1.7);
  const [throwDistance, setThrowDistance] = useState<number | null>(null);

  // Fonction utilitaire pour arrondir à 1 décimale
  const roundToOneDecimal = (num: number): number => {
    return Math.round(num * 10) / 10;
  };

  const dimensions = calculateDimensionsFromInput(inputValue, dimensionType, aspectRatio);

  // Calcul des distances de projection avec arrondis
  const minDistance = roundToOneDecimal(dimensions.width * minThrowRatio);
  const maxDistance = roundToOneDecimal(dimensions.width * maxThrowRatio);

  // Mettre à jour la distance quand les ratios ou dimensions changent
  useEffect(() => {
    if (dimensions.width > 0 && minThrowRatio > 0) {
      setThrowDistance(roundToOneDecimal(dimensions.width * minThrowRatio));
    }
  }, [dimensions.width, minThrowRatio]);

  return (
    <div className="bg-white rounded-2xl shadow-xl">
      <div className="p-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <Projector className="w-8 h-8 text-indigo-600" />
            <h1 className="text-2xl font-bold text-gray-800">Calculateur de projection</h1>
          </div>
          <UnitToggle isMetric={isMetric} onToggle={() => setIsMetric(!isMetric)} />
        </div>

        <div className="space-y-6">
          <DimensionInput
            value={inputValue}
            onChange={setInputValue}
            dimensionType={dimensionType}
            onDimensionTypeChange={setDimensionType}
            isMetric={isMetric}
          />

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">Format d'image</label>
            <div className="flex gap-3">
              {(['16:9', '21:9'] as AspectRatioType[]).map((ratio) => (
                <AspectRatioButton
                  key={ratio}
                  ratio={ratio}
                  selected={aspectRatio === ratio}
                  onClick={() => setAspectRatio(ratio)}
                />
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <DimensionCard
              label="Largeur"
              value={dimensions.width}
              isMetric={isMetric}
            />
            <DimensionCard
              label="Hauteur"
              value={dimensions.height}
              isMetric={isMetric}
            />
            <DimensionCard
              label="Diagonale"
              value={dimensions.diagonal}
              isMetric={isMetric}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Distance de projection (cm)
              </label>
              <input
                type="number"
                value={throwDistance || ''}
                onChange={(e) => {
                  const distance = e.target.value === '' ? null : roundToOneDecimal(parseFloat(e.target.value));
                  setThrowDistance(distance);
                  if (distance && distance > 0 && dimensions.width > 0) {
                    const ratio = roundToOneDecimal(distance / dimensions.width);
                    setMinThrowRatio(ratio);
                    setMaxThrowRatio(ratio);
                  }
                }}
                step="0.1"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ratio de projection min
              </label>
              <input
                type="number"
                value={minThrowRatio.toFixed(1)}
                onChange={(e) => setMinThrowRatio(roundToOneDecimal(parseFloat(e.target.value) || 0))}
                step="0.1"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Ratio de projection max
              </label>
              <input
                type="number"
                value={maxThrowRatio.toFixed(1)}
                onChange={(e) => setMaxThrowRatio(roundToOneDecimal(parseFloat(e.target.value) || 0))}
                step="0.1"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Hauteur de bas d'image (cm)
            </label>
            <input
              type="number"
              value={bottomHeight || ''}
              onChange={(e) => {
                const value = e.target.value === '' ? null : parseFloat(e.target.value);
                setBottomHeight(value);
              }}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              min="0"
              step="1"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <DimensionCard
              label="Distance minimale"
              value={roundToOneDecimal(minDistance)}
              isMetric={isMetric}
            />
            <DimensionCard
              label="Distance maximale"
              value={roundToOneDecimal(maxDistance)}
              isMetric={isMetric}
            />
          </div>

          <RoomDimensions
            dimensions={roomDimensions}
            setDimensions={setRoomDimensions}
            isMetric={isMetric}
            hideAdvice={true}
          />
        </div>
      </div>

      <div className="bg-gray-50 p-8">
        <h2 className="text-xl font-semibold text-gray-800 mb-6">
          Visualisation de la pièce
        </h2>
        <div className="mt-6">
          <RoomVisualizationVP
            roomDimensions={roomDimensions}
            screenDimensions={{
              width: dimensions.width,
              height: dimensions.height
            }}
            bottomHeight={bottomHeight}
            isMetric={isMetric}
            minThrowRatio={minThrowRatio}
            maxThrowRatio={maxThrowRatio}
          />
        </div>
      </div>
    </div>
  );
}