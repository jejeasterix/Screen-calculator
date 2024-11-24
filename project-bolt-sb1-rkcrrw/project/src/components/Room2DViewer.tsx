import React from 'react';

interface Room2DViewerProps {
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  isMetric: boolean;
}

export function Room2DViewer({ dimensions }: Room2DViewerProps) {
  const scale = 0.5; // échelle de dessin (1m = 50px)
  
  return (
    <div className="bg-white p-4 rounded-xl shadow-sm">
      <h3 className="text-sm font-medium text-gray-700 mb-4">Vue en plan et élévation</h3>
      <div className="flex gap-4">
        {/* Vue en plan */}
        <div className="relative border border-gray-200 rounded-lg p-2">
          <div className="text-xs text-gray-500 mb-2">Vue en plan</div>
          <svg
            width={dimensions.width * scale + 60}
            height={dimensions.depth * scale + 60}
            className="bg-gray-50"
          >
            {/* Pièce */}
            <rect
              x={30}
              y={30}
              width={dimensions.width * scale}
              height={dimensions.depth * scale}
              fill="none"
              stroke="#4f46e5"
              strokeWidth="2"
            />
            
            {/* Écran */}
            <rect
              x={30 + (dimensions.width * scale * 0.15)}
              y={30}
              width={dimensions.width * scale * 0.7}
              height={4}
              fill="#4f46e5"
            />
            
            {/* Dimensions */}
            <text x={30} y={20} className="text-xs">{dimensions.width} cm</text>
            <text
              x={dimensions.width * scale + 40}
              y={dimensions.depth * scale / 2 + 30}
              className="text-xs"
            >
              {dimensions.depth} cm
            </text>
          </svg>
        </div>

        {/* Vue en élévation */}
        <div className="relative border border-gray-200 rounded-lg p-2">
          <div className="text-xs text-gray-500 mb-2">Vue en élévation</div>
          <svg
            width={dimensions.width * scale + 60}
            height={dimensions.height * scale + 60}
            className="bg-gray-50"
          >
            {/* Pièce */}
            <rect
              x={30}
              y={30}
              width={dimensions.width * scale}
              height={dimensions.height * scale}
              fill="none"
              stroke="#4f46e5"
              strokeWidth="2"
            />
            
            {/* Écran */}
            <rect
              x={30 + (dimensions.width * scale * 0.15)}
              y={30 + (dimensions.height * scale * 0.3)}
              width={dimensions.width * scale * 0.7}
              height={dimensions.height * scale * 0.4}
              fill="#4f46e5"
              fillOpacity="0.2"
              stroke="#4f46e5"
              strokeWidth="2"
            />
            
            {/* Dimensions */}
            <text x={30} y={20} className="text-xs">{dimensions.width} cm</text>
            <text
              x={dimensions.width * scale + 40}
              y={dimensions.height * scale / 2 + 30}
              className="text-xs"
            >
              {dimensions.height} cm
            </text>
          </svg>
        </div>
      </div>
    </div>
  );
}
