import React, { useEffect, useRef } from 'react';
import roomTemplate from '../assets/room-template.png';

const dimensionIcons = {
  width: '↔',
  height: '↕',
  diagonal: '⤢'
};

interface RoomVisualization2DProps {
  roomDimensions: {
    width: number;
    height: number;
    depth: number;
  };
  screenDimensions: {
    width: number;
    height: number;
  };
  bottomHeight: number | null;
  isMetric: boolean;
}

export function RoomVisualization2D({ 
  roomDimensions, 
  screenDimensions, 
  bottomHeight,
  isMetric 
}: RoomVisualization2DProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Fonction pour formater la mesure avec les deux unités
  const formatMeasurement = (value: number) => {
    const metricValue = isMetric ? value : value * 2.54;
    const imperialValue = isMetric ? value / 2.54 : value;
    return `${metricValue.toFixed(1)}cm / ${imperialValue.toFixed(1)}"`;
  };

  // Fonction pour dessiner du texte avec une icône
  const drawTextWithIcon = (
    ctx: CanvasRenderingContext2D,
    text: string,
    x: number,
    y: number,
    icon: string,
    rotation: number = 0
  ) => {
    ctx.save();
    ctx.translate(x, y);
    ctx.rotate(rotation);
    
    ctx.fillStyle = '#4F46E5';
    ctx.font = 'bold 30px Consolas, monospace';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    const iconFont = '30px Arial';
    ctx.font = iconFont;
    const iconWidth = ctx.measureText(icon).width;
    
    ctx.font = 'bold 30px Consolas, monospace';
    const textWidth = ctx.measureText(text).width;
    const totalWidth = iconWidth + textWidth + 10;
    
    ctx.fillText(icon, -totalWidth/2 + iconWidth/2, 0);
    ctx.fillText(text, -totalWidth/2 + iconWidth + 10 + textWidth/2, 0);
    
    ctx.restore();
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const backgroundImage = new Image();
    backgroundImage.src = roomTemplate;
    
    backgroundImage.onload = () => {
      canvas.width = backgroundImage.width;
      canvas.height = backgroundImage.height;

      const imageRef = {
        wallLeft: canvas.width * 0.2,
        wallRight: canvas.width * 0.8,
        wallTop: canvas.height * 0.1,
        wallBottom: canvas.height * 0.9,
      };

      const wallWidthPixels = imageRef.wallRight - imageRef.wallLeft;
      const wallHeightPixels = imageRef.wallBottom - imageRef.wallTop;
      const scaleX = wallWidthPixels / roomDimensions.width;
      const scaleY = wallHeightPixels / roomDimensions.height;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(backgroundImage, 0, 0);

      if (screenDimensions.width && screenDimensions.height) {
        const screenWidthPx = screenDimensions.width * scaleX;
        const screenHeightPx = screenDimensions.height * scaleY;
        const screenX = imageRef.wallLeft + (wallWidthPixels - screenWidthPx) / 2;

        // Calculer la diagonale
        const diagonalCm = Math.sqrt(
          Math.pow(screenDimensions.width, 2) + Math.pow(screenDimensions.height, 2)
        );

        // Afficher la largeur en haut
        drawTextWithIcon(
          ctx,
          formatMeasurement(screenDimensions.width),
          screenX + screenWidthPx / 2,
          imageRef.wallTop + 380,
          dimensionIcons.width
        );

        // Afficher la hauteur à droite
        drawTextWithIcon(
          ctx,
          formatMeasurement(screenDimensions.height),
          imageRef.wallRight - 160,
          imageRef.wallTop + 560,
          dimensionIcons.height,
          Math.PI / 2
        );

        // Afficher la diagonale au centre
        drawTextWithIcon(
          ctx,
          formatMeasurement(diagonalCm),
          screenX + screenWidthPx / 2,
          imageRef.wallTop + 560,
          dimensionIcons.diagonal
        );

        // Afficher les mesures de hauteur du bas seulement si bottomHeight est défini
        if (bottomHeight !== null) {
          const baseY = imageRef.wallTop + 900;
          
          // Afficher la hauteur du bas (toujours en cm)
          drawTextWithIcon(
            ctx,
            `${bottomHeight.toFixed(1)} cm`,
            imageRef.wallLeft + 180,
            baseY,
            dimensionIcons.height,
            Math.PI / 2
          );

          // Afficher la hauteur du bas + 20cm (toujours en cm)
          drawTextWithIcon(
            ctx,
            `${(bottomHeight + 20).toFixed(1)} cm`,
            imageRef.wallLeft - 140,
            baseY,
            dimensionIcons.height,
            Math.PI / 2
          );
        }
      }
    };
  }, [roomDimensions, screenDimensions, bottomHeight, isMetric]);

  return (
    <div className="bg-white p-4 rounded-lg border border-gray-200">
      <h2 className="text-lg font-semibold text-gray-800 mb-4">Visualisation de la pièce</h2>
      <div className="flex justify-center">
        <canvas
          ref={canvasRef}
          className="border border-gray-200 rounded"
          style={{ maxWidth: '100%', height: 'auto' }}
        />
      </div>
    </div>
  );
}
