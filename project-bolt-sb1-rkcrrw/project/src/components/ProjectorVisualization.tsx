import React from 'react';
import { ProjectionCalculator } from './ProjectionCalculator';
import { ProjectionValues } from '../utils/projectionCalculations';
import { RoomVisualizationVP } from './RoomVisualizationVP';

interface ProjectorVisualizationProps {
  width: number;
  height: number;
  isMetric: boolean;
  roomDimensions: {
    width: number;
    height: number;
    depth: number;
  };
}

export function ProjectorVisualization({
  width,
  height,
  isMetric,
  roomDimensions
}: ProjectorVisualizationProps) {
  const [projectionValues, setProjectionValues] = React.useState<ProjectionValues>({
    imageWidth: width,
    minThrowRatio: 1.3,
    maxThrowRatio: 1.7
  });

  const handleProjectionChange = (values: ProjectionValues) => {
    setProjectionValues(values);
  };

  return (
    <div className="space-y-8">
      <ProjectionCalculator
        imageWidth={width}
        onProjectionChange={handleProjectionChange}
      />
      
      <RoomVisualizationVP
        roomDimensions={roomDimensions}
        screenDimensions={{
          width,
          height
        }}
        isMetric={isMetric}
        minThrowRatio={projectionValues.minThrowRatio}
        maxThrowRatio={projectionValues.maxThrowRatio}
      />
    </div>
  );
}