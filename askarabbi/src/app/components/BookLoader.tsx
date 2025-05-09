"use client";

import React, { useRef, useMemo } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';

// Book model component with animation
function AnimatedBook() {
  const bookGroupRef = useRef<THREE.Group>(null);
  const frontCoverGroupRef = useRef<THREE.Group>(null);
  const backCoverGroupRef = useRef<THREE.Group>(null);

  // Dimensions (memoized for performance)
  const pageWidth = 1.5;
  const pageHeight = 0.2;
  const pageDepth = 2.0;
  const coverThickness = 0.05;
  const coverHeight = 0.25; // Slightly taller than pages
  const coverDepth = 2.1;  // Slightly deeper/wider than pages
  const decorationThickness = 0.02;

  const pageGeo = useMemo(() => new THREE.BoxGeometry(pageWidth, pageHeight, pageDepth), [pageWidth, pageHeight, pageDepth]);
  const coverGeo = useMemo(() => new THREE.BoxGeometry(coverThickness, coverHeight, coverDepth), [coverThickness, coverHeight, coverDepth]);
  const decorationGeo = useMemo(() => new THREE.BoxGeometry(decorationThickness, coverHeight * 0.8, coverDepth * 0.8), [decorationThickness, coverHeight, coverDepth]);
  const spineGeo = useMemo(() => new THREE.BoxGeometry(pageWidth * 0.1, coverHeight * 0.95, coverDepth * 0.95), [pageWidth, coverHeight, coverDepth]);
  
  // Animation logic
  useFrame((state) => {
    if (!bookGroupRef.current || !frontCoverGroupRef.current || !backCoverGroupRef.current) return;

    // Hover animation for the whole book
    bookGroupRef.current.position.y = Math.sin(state.clock.getElapsedTime() * 1.2) * 0.04;

    // Open/close animation for covers
    const openProgress = (Math.sin(state.clock.getElapsedTime() * 1.0) + 1) / 2; // Oscillates 0 to 1
    const maxOpenAngle = Math.PI / 2.2; // ~81 degrees

    const targetFrontAngle = openProgress * maxOpenAngle;
    const targetBackAngle = -openProgress * maxOpenAngle;

    frontCoverGroupRef.current.rotation.y = THREE.MathUtils.lerp(
      frontCoverGroupRef.current.rotation.y,
      targetFrontAngle,
      0.1
    );
    backCoverGroupRef.current.rotation.y = THREE.MathUtils.lerp(
      backCoverGroupRef.current.rotation.y,
      targetBackAngle,
      0.1
    );
  });
  
  const yOffsetForCovers = (coverHeight - pageHeight) / 2;

  return (
    <group ref={bookGroupRef}>
      {/* Pages */} 
      <mesh geometry={pageGeo} castShadow receiveShadow>
        <meshStandardMaterial color="#f0ead6" />
      </mesh>

      {/* Front Cover Group (pivots from left edge of pages) */} 
      <group ref={frontCoverGroupRef} position={[-pageWidth / 2, 0, 0]}>
        <mesh 
          name="frontCoverPlate"
          geometry={coverGeo} 
          position={[coverThickness / 2, yOffsetForCovers, 0]} 
          castShadow 
          receiveShadow
        >
          <meshStandardMaterial color="#0d3677" />
        </mesh>
        <mesh 
          name="frontCoverDecoration" 
          geometry={decorationGeo}
          position={[coverThickness + decorationThickness / 2, yOffsetForCovers, 0]}
          castShadow
        >
          <meshStandardMaterial color="#755c48" metalness={0.4} roughness={0.6} />
        </mesh>
      </group>

      {/* Back Cover Group (pivots from right edge of pages) */} 
      <group ref={backCoverGroupRef} position={[pageWidth / 2, 0, 0]}>
        <mesh 
          name="backCoverPlate"
          geometry={coverGeo} 
          position={[-coverThickness / 2, yOffsetForCovers, 0]} 
          castShadow 
          receiveShadow
        >
          <meshStandardMaterial color="#0d3677" />
        </mesh>
      </group>
      
      {/* Spine */} 
      <mesh geometry={spineGeo} position={[0, yOffsetForCovers, 0]} castShadow receiveShadow>
          <meshStandardMaterial color="#0a2a50" />
      </mesh>
    </group>
  );
}

export default function BookLoader({ loadingText }: { loadingText: string }) {
  return (
    <div className="w-full h-[300px] relative">
      <Canvas shadows camera={{ position: [0, 1.5, 4.5], fov: 50 }}>
        <ambientLight intensity={0.6} />
        <directionalLight 
          position={[5, 5, 5]} 
          intensity={1.0} 
          castShadow 
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
        />
        <pointLight position={[-5, -2, 2]} intensity={0.4} />
        
        <group position={[0, 0.2, 0]}> {/* Lift book slightly to center better with shadow */} 
          <AnimatedBook />
        </group>
        
        {/* Shadow Catcher Plane */} 
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
          <planeGeometry args={[10, 10]} />
          <shadowMaterial transparent opacity={0.3} />
        </mesh>
        
        <OrbitControls 
          enableZoom={false} 
          enablePan={false}
          minPolarAngle={Math.PI / 3.5} // Allow slightly more viewing angle variation
          maxPolarAngle={Math.PI / 2.5}
          minAzimuthAngle={-Math.PI / 6}
          maxAzimuthAngle={Math.PI / 6}
        />
      </Canvas>
      
      <div className="absolute bottom-2 left-0 right-0 text-center">
        <h3 className="text-xl font-bold text-[var(--primary)]">
          {loadingText}
        </h3>
      </div>
    </div>
  );
} 