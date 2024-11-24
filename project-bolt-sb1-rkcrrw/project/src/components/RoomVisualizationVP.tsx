import React, { useEffect, useRef } from 'react';
import roomTemplate from '../assets/room-templateVP.png';

const dimensionIcons = {
  width: '↔',
  height: '↕',
  depth: '⟷',
  diagonal: '⤢'
};

interface RoomVisualizationVPProps {
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
  minThrowRatio: number;
  maxThrowRatio: number;
}

export function RoomVisualizationVP({ 
  roomDimensions, 
  screenDimensions, 
  bottomHeight,
  isMetric,
  minThrowRatio,
  maxThrowRatio
}: RoomVisualizationVPProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<{
    wallLeft: number;
    wallRight: number;
    wallTop: number;
    wallBottom: number;
  }>({ wallLeft: 0, wallRight: 0, wallTop: 0, wallBottom: 0 });

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

      imageRef.current = {
        wallLeft: canvas.width * 0.2,
        wallRight: canvas.width * 0.8,
        wallTop: canvas.height * 0.1,
        wallBottom: canvas.height * 0.9,
      };

      const wallWidthPixels = imageRef.current.wallRight - imageRef.current.wallLeft;
      const wallHeightPixels = imageRef.current.wallBottom - imageRef.current.wallTop;
      const scaleX = wallWidthPixels / roomDimensions.width;
      const scaleY = wallHeightPixels / roomDimensions.height;

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(backgroundImage, 0, 0);

      // Afficher la largeur en haut
      drawTextWithIcon(
        ctx,
        formatMeasurement(roomDimensions.width),
        imageRef.current.wallLeft + wallWidthPixels / 25,
        imageRef.current.wallTop + 400,
        dimensionIcons.width
      );

      // Afficher la profondeur à droite
      drawTextWithIcon(
        ctx,
        formatMeasurement(roomDimensions.depth),
        imageRef.current.wallRight + 40,
        imageRef.current.wallTop + wallHeightPixels / 2,
        dimensionIcons.depth
      );

      // Afficher la hauteur de la salle à droite
      drawTextWithIcon(
        ctx,
        `${roomDimensions.height.toFixed(1)} cm`,
        imageRef.current.wallRight + 200,
        imageRef.current.wallTop + wallHeightPixels / 2,
        dimensionIcons.height,
        Math.PI / 2
      );

      // Afficher la hauteur à droite
      drawTextWithIcon(
        ctx,
        formatMeasurement(screenDimensions.height),
        imageRef.current.wallRight - 580,
        imageRef.current.wallTop + 585,
        dimensionIcons.height,
        Math.PI / 2
      );

      // Afficher la diagonale
      const diagonal = Math.sqrt(roomDimensions.width ** 2 + roomDimensions.depth ** 2);
      drawTextWithIcon(
        ctx,
        formatMeasurement(diagonal),
        imageRef.current.wallLeft + wallWidthPixels / 25,
        imageRef.current.wallBottom - 500,
        dimensionIcons.diagonal
      );

      // Afficher la distance de projection minimale
      const minDistance = screenDimensions.width * minThrowRatio;
      drawTextWithIcon(
        ctx,
        `${minDistance.toFixed(1)} cm`,
        imageRef.current.wallLeft + wallWidthPixels / 4,
        imageRef.current.wallTop + 200,
        dimensionIcons.depth
      );

      // Afficher la distance de projection maximale
      const maxDistance = screenDimensions.width * maxThrowRatio;
      drawTextWithIcon(
        ctx,
        `${maxDistance.toFixed(1)} cm`,
        imageRef.current.wallLeft + wallWidthPixels / 4,
        imageRef.current.wallTop + 300,
        dimensionIcons.depth
      );

      // Afficher les mesures de hauteur du bas seulement si bottomHeight est défini
      if (bottomHeight !== null) {
        const baseY = imageRef.current.wallTop + 980;
        
        // Afficher la hauteur du bas (toujours en cm)
        drawTextWithIcon(
          ctx,
          `${bottomHeight.toFixed(1)} cm`,
          imageRef.current.wallLeft - 200,
          baseY,
          dimensionIcons.height,
          Math.PI / 2
        );
      }
    };
  }, [roomDimensions, screenDimensions, bottomHeight, isMetric, minThrowRatio, maxThrowRatio]);

  return (
    <div>
      <canvas
        ref={canvasRef}
        className="border border-gray-200 rounded"
        style={{ maxWidth: '100%', height: 'auto' }}
      />
    </div>
  );
}
