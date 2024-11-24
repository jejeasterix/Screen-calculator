import React from 'react';

interface RoomDimensionsProps {
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  setDimensions: (dimensions: { width: number; height: number; depth: number }) => void;
  isMetric: boolean;
  hideAdvice?: boolean;
}

export function RoomDimensions({
  dimensions,
  setDimensions,
  isMetric,
  hideAdvice = false,
}: RoomDimensionsProps) {
  const handleInputChange = (field: keyof typeof dimensions) => (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    setDimensions({ ...dimensions, [field]: value });
  };

  return (
    <div>
      <h2 className="text-xl font-semibold text-gray-800 mb-6">Dimensions de la pièce</h2>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Largeur (cm)
            </label>
            <input
              type="number"
              value={dimensions.width.toFixed(1)}
              onChange={handleInputChange('width')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Hauteur (cm)
            </label>
            <input
              type="number"
              value={dimensions.height.toFixed(1)}
              onChange={handleInputChange('height')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              min="0"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Profondeur (cm)
            </label>
            <input
              type="number"
              value={dimensions.depth.toFixed(1)}
              onChange={handleInputChange('depth')}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
              min="0"
            />
          </div>
        </div>
        {!hideAdvice && (
          <div className="bg-blue-50 p-4 rounded-lg">
            <p className="text-sm text-blue-700">
              Conseils pour mesurer votre pièce :
            </p>
            <ul className="mt-2 text-sm text-blue-600 list-disc list-inside">
              <li>Utilisez un mètre ruban pour plus de précision</li>
              <li>Mesurez à hauteur d'écran pour la largeur et la profondeur</li>
              <li>
                Pour la hauteur, mesurez du sol au plafond à l'emplacement prévu
                de l'écran
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}