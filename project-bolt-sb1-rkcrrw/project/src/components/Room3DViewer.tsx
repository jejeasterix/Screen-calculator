import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, PerspectiveCamera, Text } from '@react-three/drei';
import * as THREE from 'three';

interface Room3DViewerProps {
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  isMetric: boolean;
}

function Measurements({ dimensions }: { dimensions: Room3DViewerProps['dimensions'] }) {
  // Calculer les dimensions de l'écran
  const screenWidth = dimensions.width * 0.7;
  const screenHeight = dimensions.height * 0.4;
  
  return (
    <>
      {/* Largeur - au sol */}
      <Text
        position={[0, 0.1, -dimensions.depth * 0.01 / 2]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={0.25}
        color="#4f46e5"
        anchorX="center"
        anchorY="middle"
      >
        {`${dimensions.width} cm`}
      </Text>

      {/* Hauteur - sur le mur gauche */}
      <Text
        position={[-dimensions.width * 0.01 / 2 - 0.2, dimensions.height * 0.01 / 2, -dimensions.depth * 0.01 / 2]}
        rotation={[0, 0, 0]}
        fontSize={0.25}
        color="#4f46e5"
        anchorX="center"
        anchorY="middle"
      >
        {`${dimensions.height} cm`}
      </Text>

      {/* Profondeur - sur le sol */}
      <Text
        position={[-dimensions.width * 0.01 / 2, 0.1, -dimensions.depth * 0.01 / 4]}
        rotation={[-Math.PI / 2, Math.PI / 4, 0]}
        fontSize={0.25}
        color="#4f46e5"
        anchorX="center"
        anchorY="middle"
      >
        {`${dimensions.depth} cm`}
      </Text>

      {/* Dimensions de l'écran */}
      <Text
        position={[0, dimensions.height * 0.01 * 0.6, -dimensions.depth * 0.01 / 2 + 0.1]}
        rotation={[0, 0, 0]}
        fontSize={0.2}
        color="#1e1b4b"
        anchorX="center"
        anchorY="bottom"
      >
        {`Écran: ${screenWidth.toFixed(0)} × ${screenHeight.toFixed(0)} cm`}
      </Text>
    </>
  );
}

function Room({ dimensions }: Room3DViewerProps) {
  // Toujours utiliser les centimètres pour la visualisation 3D
  const scale = 0.01; // cm to m
  const width = dimensions.width * scale;
  const height = dimensions.height * scale;
  const depth = dimensions.depth * scale;

  // Calculer les dimensions de l'écran
  const screenWidth = width * 0.7;
  const screenHeight = height * 0.4;

  return (
    <group>
      {/* Room walls */}
      <mesh position={[0, height/2, -depth/2]}>
        <boxGeometry args={[width, height, 0.01]} />
        <meshStandardMaterial color="#e5e7eb" transparent opacity={0.5} />
      </mesh>
      <mesh position={[-width/2, height/2, 0]}>
        <boxGeometry args={[0.01, height, depth]} />
        <meshStandardMaterial color="#e5e7eb" transparent opacity={0.5} />
      </mesh>
      <mesh position={[0, 0, 0]}>
        <boxGeometry args={[width, 0.01, depth]} />
        <meshStandardMaterial color="#d1d5db" />
      </mesh>
      
      {/* Screen placeholder with border */}
      <group position={[0, height * 0.6, -depth/2 + 0.02]}>
        {/* Screen background */}
        <mesh>
          <boxGeometry args={[screenWidth, screenHeight, 0.02]} />
          <meshStandardMaterial color="#4f46e5" />
        </mesh>
        {/* Screen border */}
        <mesh position={[0, 0, 0.01]}>
          <boxGeometry args={[screenWidth + 0.05, screenHeight + 0.05, 0.01]} />
          <meshStandardMaterial color="#1e1b4b" />
        </mesh>
      </group>

      {/* Measurements */}
      <Measurements dimensions={dimensions} />
    </group>
  );
}

export function Room3DViewer({ dimensions, isMetric }: Room3DViewerProps) {
  return (
    <div className="w-full h-[500px] bg-gray-100 rounded-xl overflow-hidden">
      <Canvas shadows camera={{ position: [3, 2, 3], fov: 60 }}>
        <color attach="background" args={['#f3f4f6']} />
        <OrbitControls
          enableDamping
          dampingFactor={0.05}
          minDistance={2}
          maxDistance={10}
        />
        <ambientLight intensity={0.5} />
        <directionalLight position={[10, 10, 5]} intensity={1} castShadow />
        <Room dimensions={dimensions} isMetric={isMetric} />
      </Canvas>
    </div>
  );
}
