import React from 'react';
import { Projector } from 'lucide-react';

interface RoomDimensions {
  width: number;
  height: number;
  depth: number;
}

interface ProjectorVisualizationProps {
  width: number;
  height: number;
  minThrowRatio: number;
  maxThrowRatio: number;
  isMetric: boolean;
  roomDimensions: RoomDimensions;
}

export function ProjectorVisualization({
  width,
  height,
  minThrowRatio,
  maxThrowRatio,
  isMetric,
  roomDimensions
}: ProjectorVisualizationProps) {
  const minDistance = width * minThrowRatio;
  const maxDistance = width * maxThrowRatio;
  
  const metricWidth = isMetric ? width : width * 2.54;
  const metricHeight = isMetric ? height : height * 2.54;
  const metricMinDist = isMetric ? minDistance : minDistance * 2.54;
  const metricMaxDist = isMetric ? maxDistance : maxDistance * 2.54;
  const metricRoomHeight = isMetric ? roomDimensions.height : roomDimensions.height * 2.54;
  
  const imperialWidth = isMetric ? width / 2.54 : width;
  const imperialHeight = isMetric ? height / 2.54 : height;
  const imperialMinDist = isMetric ? minDistance / 2.54 : minDistance;
  const imperialMaxDist = isMetric ? maxDistance / 2.54 : maxDistance;

  return (
    <div className="relative mt-8 bg-gray-50 p-6 rounded-xl">
      <div className="h-[400px] relative border-2 border-gray-200">
        {/* Plafond */}
        <div className="absolute top-0 left-0 right-0 h-1 bg-gray-300">
          <div className="absolute -top-6 left-1/2 transform -translate-x-1/2 text-sm text-gray-600">
            PLAFOND
          </div>
        </div>

        {/* Sol */}
        <div className="absolute bottom-0 left-0 right-0 h-1 bg-gray-300">
          <div className="absolute top-2 left-1/2 transform -translate-x-1/2 text-sm text-gray-600">
            SOL
          </div>
        </div>

        {/* Écran */}
        <div 
          className="absolute right-8 bg-indigo-600"
          style={{
            top: `${(metricRoomHeight - metricHeight) * 100 / metricRoomHeight}%`,
            height: `${(metricHeight * 100) / metricRoomHeight}%`,
            width: '4px'
          }}
        >
          {/* Dimensions de l'écran */}
          <div className="absolute -left-4 top-1/2 transform -translate-y-1/2 -translate-x-full text-sm text-gray-600 whitespace-nowrap">
            {metricHeight.toFixed(1)}cm
          </div>
          <div className="absolute top-0 left-1 w-[100px] h-[2px] bg-indigo-600">
            <div className="absolute -top-5 left-1/2 transform -translate-x-1/2 text-sm text-gray-600">
              {metricWidth.toFixed(1)}cm
            </div>
          </div>
          
          {/* Hauteur depuis le sol */}
          <div className="absolute bottom-0 right-8 h-px bg-gray-400 w-20">
            <div className="absolute right-0 top-0 transform translate-x-full text-sm text-gray-600 ml-2">
              {(metricRoomHeight - metricHeight).toFixed(1)}cm
            </div>
          </div>
        </div>

        {/* Projecteur */}
        <div 
          className="absolute left-8"
          style={{
            top: `${(metricRoomHeight - metricHeight + metricHeight/2) * 100 / metricRoomHeight}%`,
          }}
        >
          <Projector className="w-8 h-8 text-indigo-600" />
          
          {/* Lignes de projection */}
          <div 
            className="absolute left-8 border-t border-dashed border-indigo-400"
            style={{
              width: `${(metricMinDist * 100) / metricRoomHeight}px`,
            }}
          >
            <div className="absolute -top-6 right-0 text-sm text-gray-600 whitespace-nowrap">
              Min: {metricMinDist.toFixed(1)}cm ({minThrowRatio.toFixed(2)})
            </div>
          </div>
          <div 
            className="absolute left-8 border-t border-dashed border-indigo-400 top-8"
            style={{
              width: `${(metricMaxDist * 100) / metricRoomHeight}px`,
            }}
          >
            <div className="absolute top-2 right-0 text-sm text-gray-600 whitespace-nowrap">
              Max: {metricMaxDist.toFixed(1)}cm ({maxThrowRatio.toFixed(2)})
            </div>
          </div>
        </div>

        {/* Hauteur de la pièce */}
        <div className="absolute left-2 top-0 bottom-0 w-px bg-gray-300">
          <div className="absolute top-1/2 -left-12 transform -translate-y-1/2 text-sm text-gray-600 whitespace-nowrap">
            {metricRoomHeight.toFixed(1)}cm
          </div>
        </div>
      </div>
    </div>
  );
}