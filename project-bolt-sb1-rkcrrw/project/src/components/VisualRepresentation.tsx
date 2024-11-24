import React from 'react';
import { ArrowLeftRight, ArrowUpDown, Maximize2 } from 'lucide-react';

interface AspectRatioType {
  // Add your aspect ratio type definition here
}

interface RoomDimensions {
  // Add your room dimensions type definition here
}

interface VisualRepresentationProps {
  aspectRatio: AspectRatioType;
  width: number;
  height: number;
  isMetric: boolean;
  roomDimensions: RoomDimensions;
}

export function VisualRepresentation({
  aspectRatio,
  width,
  height,
  isMetric,
  roomDimensions
}: VisualRepresentationProps) {
  const paddingTop = aspectRatio === '16:9' ? 56.25 : 42.85;
  const metricWidth = isMetric ? width : width * 2.54;
  const metricHeight = isMetric ? height : height * 2.54;
  const imperialWidth = isMetric ? width / 2.54 : width;
  const imperialHeight = isMetric ? height / 2.54 : height;
  const diagonal = Math.sqrt(width * width + height * height);
  const metricDiagonal = isMetric ? diagonal : diagonal * 2.54;
  const imperialDiagonal = isMetric ? diagonal / 2.54 : diagonal;

  return (
    <div className="relative mt-8">
      <div className="border-2 border-indigo-200 rounded-lg p-8">
        <div
          className="bg-indigo-100 rounded relative"
          style={{
            width: '100%',
            paddingTop: `${paddingTop}%`
          }}
        >
          {/* Top width measurement */}
          <div className="absolute -top-6 left-0 right-0 flex justify-center items-center text-sm">
            <ArrowLeftRight className="w-4 h-4 text-indigo-600 mr-2" />
            <span className="text-gray-700">
              {metricWidth.toFixed(1)}cm / {imperialWidth.toFixed(1)}in
            </span>
          </div>

          {/* Right height measurement */}
          <div className="absolute -right-6 top-0 bottom-0 flex items-center">
            <div className="transform rotate-90 flex items-center whitespace-nowrap text-sm">
              <ArrowUpDown className="w-4 h-4 text-indigo-600 mr-2" />
              <span className="text-gray-700">
                {metricHeight.toFixed(1)}cm / {imperialHeight.toFixed(1)}in
              </span>
            </div>
          </div>

          {/* Diagonal measurement */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="flex items-center text-sm bg-white/90 px-3 py-1 rounded-full shadow-sm">
              <Maximize2 className="w-4 h-4 text-indigo-600 mr-2" />
              <span className="text-gray-700">
                {metricDiagonal.toFixed(1)}cm / {imperialDiagonal.toFixed(1)}in
              </span>
            </div>
          </div>

          {/* Floor height line */}
          {/* Removed floor height line as it was referencing floorHeight */}
        </div>
      </div>
      <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-white px-3 text-sm text-gray-600">
        {aspectRatio}
      </div>
    </div>
  );
}