'use client';
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Box, Cylinder } from '@react-three/drei';
import * as THREE from 'three';

/**
 * A tiny helper mesh that represents a specific part on the motorcycle.
 * When the real .glb is dropped in, this logic (lerping emissive color) 
 * will be applied directly to the nodes of the GLTF model based on mesh name.
 */
function ProxyPart({ position, args, active, type = 'box' }: { position: [number, number, number], args: any, active: boolean, type?: 'box' | 'cylinder' }) {
  const materialRef = useRef<THREE.MeshStandardMaterial>(null);

  useFrame(() => {
    if (materialRef.current) {
      // Subtly highlight this specific part when active
      const targetEmissive = active ? new THREE.Color(0x333344) : new THREE.Color(0x000000);
      const targetColor = active ? new THREE.Color(0x222233) : new THREE.Color(0x0a0a10);
      materialRef.current.emissive.lerp(targetEmissive, 0.1);
      materialRef.current.color.lerp(targetColor, 0.1);
    }
  });

  const material = (
    <meshStandardMaterial 
      ref={materialRef}
      color="#0a0a10" 
      roughness={0.4}
      metalness={0.6}
    />
  );

  return type === 'box' ? (
    <Box position={position} args={args}>{material}</Box>
  ) : (
    <Cylinder position={position} args={args}>{material}</Cylinder>
  );
}

export default function ModelPlaceholder({ activeHotspot }: { activeHotspot: string | null }) {
  const groupRef = useRef<THREE.Group>(null);

  // Subtle breathing animation for the whole bike
  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.01;
    }
  });

  return (
    <group ref={groupRef}>
      {/* 
        =========================================================
        HOW TO IMPLEMENT THE REAL .GLB LATER:
        1. const { nodes, materials } = useGLTF('/models/z900.glb')
        2. Render <mesh geometry={nodes.Exhaust.geometry} material={materials.ExhaustMat} />
        3. Use a useFrame hook to lerp the emissive intensity of materials.ExhaustMat 
           if activeHotspot === 'exhaust'.
        =========================================================
      */}

      {/* Base placeholder shape (Main Body) */}
      <Box args={[0.6, 0.9, 1.8]} position={[0, 0.7, 0]}>
        <meshStandardMaterial color="#08080c" roughness={0.3} metalness={0.8} />
      </Box>

      {/* Specific Interactive Proxy Parts */}
      {/* Exhaust */}
      <ProxyPart position={[0.35, 0.3, 0.5]} args={[0.15, 0.15, 0.6]} active={activeHotspot === 'exhaust'} />
      {/* Tank */}
      <ProxyPart position={[0, 1.05, -0.3]} args={[0.5, 0.3, 0.6]} active={activeHotspot === 'tank'} />
      {/* Wheels */}
      <ProxyPart position={[0, 0.3, -1.1]} args={[0.1, 0.1, 0.1, 32]} type="cylinder" active={activeHotspot === 'front_wheel'} />
      <ProxyPart position={[0, 0.3, 0.9]} args={[0.15, 0.15, 0.15, 32]} type="cylinder" active={activeHotspot === 'rear_wheel'} />
      {/* Mirrors */}
      <ProxyPart position={[0.4, 1.35, -0.6]} args={[0.1, 0.05, 0.1]} active={activeHotspot === 'mirrors'} />
      <ProxyPart position={[-0.4, 1.35, -0.6]} args={[0.1, 0.05, 0.1]} active={activeHotspot === 'mirrors'} />
      {/* Crash Protection */}
      <ProxyPart position={[0.4, 0.6, -0.1]} args={[0.08, 0.08, 0.15]} active={activeHotspot === 'crash_protection'} />
      <ProxyPart position={[-0.4, 0.6, -0.1]} args={[0.08, 0.08, 0.15]} active={activeHotspot === 'crash_protection'} />

      {/* Wireframe overlay to look technical */}
      <Box args={[0.601, 0.901, 1.801]} position={[0, 0.7, 0]}>
        <meshBasicMaterial color="#ffffff" wireframe={true} transparent opacity={0.05} />
      </Box>

      {/* Explicit labeling so the user knows it's a placeholder */}
      <Text
        position={[0, 1.4, 0]}
        fontSize={0.12}
        color="#ffffff"
        anchorX="center"
        anchorY="middle"
        font="https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfMZhrib2Bg-4.ttf"
      >
        Z900 PROXY MODEL
      </Text>
    </group>
  );
}
