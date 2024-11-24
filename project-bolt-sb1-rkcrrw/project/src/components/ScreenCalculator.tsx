import React from 'react';
import { Calculator } from 'lucide-react';
import { AspectRatioButton } from './AspectRatioButton';
import { DimensionCard } from './DimensionCard';
import { UnitToggle } from './UnitToggle';
import { DimensionInput } from './DimensionInput';
import { calculateDimensionsFromInput, AspectRatioType, DimensionType } from '../utils/calculations';
import { RoomVisualization2D } from './RoomVisualization2D';

interface ScreenCalculatorProps {
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
  setRoomDimensions: (dimensions: { width: number; height: number; depth: number }) => void;
  bottomHeight: number | null;
  setBottomHeight: (value: number | null) => void;
  className?: string;
}

export function ScreenCalculator({
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
  className = "",
}: ScreenCalculatorProps) {
  const dimensions = calculateDimensionsFromInput(inputValue, dimensionType, aspectRatio);

  return (
    <div className={`bg-white rounded-2xl shadow-xl p-8 ${className}`}>
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Calculator className="w-8 h-8 text-indigo-600" />
          <h1 className="text-2xl font-bold text-gray-800">Calculateur d'écran</h1>
        </div>
        <UnitToggle isMetric={isMetric} onToggle={() => setIsMetric(!isMetric)} />
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 gap-6">
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

          {inputValue > 0 && (
            <div className="mt-8 space-y-6">
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

              <div className="space-y-2">
                <h2 className="text-lg font-semibold text-gray-800">Dimension de la pièce</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Largeur (cm)
                    </label>
                    <input
                      type="number"
                      value={roomDimensions.width || ''}
                      onChange={(e) => {
                        const value = e.target.value === '' ? 0 : parseFloat(e.target.value);
                        setRoomDimensions({
                          ...roomDimensions,
                          width: value
                        });
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      min="0"
                      step="1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Hauteur (cm)
                    </label>
                    <input
                      type="number"
                      value={roomDimensions.height || ''}
                      onChange={(e) => {
                        const value = e.target.value === '' ? 0 : parseFloat(e.target.value);
                        setRoomDimensions({
                          ...roomDimensions,
                          height: value
                        });
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      min="0"
                      step="1"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Profondeur (cm)
                    </label>
                    <input
                      type="number"
                      value={roomDimensions.depth || ''}
                      onChange={(e) => {
                        const value = e.target.value === '' ? 0 : parseFloat(e.target.value);
                        setRoomDimensions({
                          ...roomDimensions,
                          depth: value
                        });
                      }}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      min="0"
                      step="1"
                    />
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <RoomVisualization2D
                  roomDimensions={roomDimensions}
                  screenDimensions={{
                    width: dimensions.width,
                    height: dimensions.height
                  }}
                  bottomHeight={bottomHeight}
                  isMetric={isMetric}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}