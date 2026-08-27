'use client';
import { Suspense, useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { CameraControls, Environment, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

import ModelPlaceholder from './ModelPlaceholder';
import Hotspot from './Hotspot';
import AccessoryPanel from './AccessoryPanel';
import { getAccessory } from '@/data/accessories';
import { useAudioStore } from '@/store/audioStore';
import { trackEvent } from '@/lib/analytics';

// Comprehensive list of Z900 parts with approximate spatial coordinates relative to center [0,0.6,0]
const HOTSPOTS = [
  // Front / Cockpit
  { id: 'headlight', label: 'LED Headlight', position: [0, 1.0, -1.1] as [number, number, number], camPos: [0, 1.0, -2.5] as [number, number, number] },
  { id: 'windscreen', label: 'TFT Display & Screen', position: [0, 1.25, -0.9] as [number, number, number], camPos: [-1.0, 1.8, -1.5] as [number, number, number] },
  { id: 'handlebars', label: 'Wide Handlebars', position: [0, 1.15, -0.6] as [number, number, number], camPos: [-1.0, 1.8, -1.0] as [number, number, number] },
  { id: 'clutch', label: 'Assist & Slipper Clutch', position: [-0.35, 1.15, -0.65] as [number, number, number], camPos: [-1.2, 1.5, -1.0] as [number, number, number] },
  { id: 'brake_lever', label: 'Adjustable Brake Lever', position: [0.35, 1.15, -0.65] as [number, number, number], camPos: [1.2, 1.5, -1.0] as [number, number, number] },
  { id: 'mirrors', label: 'Angular Mirrors', position: [0.4, 1.35, -0.6] as [number, number, number], camPos: [1.5, 1.8, -1.0] as [number, number, number] },
  { id: 'ignition', label: 'Ignition Key', position: [0, 1.25, -0.7] as [number, number, number], camPos: [-0.5, 1.6, -1.2] as [number, number, number] },

  // Suspension & Wheels
  { id: 'front_suspension', label: 'Inverted Front Fork', position: [0.15, 0.5, -1.0] as [number, number, number], camPos: [1.5, 0.5, -2.0] as [number, number, number] },
  { id: 'front_wheel', label: '17" Cast Wheels', position: [0, 0.3, -1.1] as [number, number, number], camPos: [-1.5, 0.3, -2.0] as [number, number, number] },
  { id: 'front_brakes', label: 'Dual 300mm Petal Discs', position: [-0.15, 0.3, -1.1] as [number, number, number], camPos: [-1.5, 0.3, -1.8] as [number, number, number] },
  
  // Body & Engine
  { id: 'tank', label: 'Muscular Fuel Tank', position: [0, 1.0, -0.3] as [number, number, number], camPos: [-1.5, 1.8, -1.0] as [number, number, number] },
  { id: 'frame', label: 'Trellis Frame', position: [0.3, 0.7, 0] as [number, number, number], camPos: [2.0, 1.0, 0] as [number, number, number] },
  { id: 'engine', label: '948cc Inline-Four', position: [0.2, 0.5, -0.1] as [number, number, number], camPos: [1.8, 0.5, -0.5] as [number, number, number] },
  { id: 'crash_protection', label: 'Frame Sliders', position: [0.4, 0.6, -0.1] as [number, number, number], camPos: [1.5, 0.6, 0.5] as [number, number, number] },
  
  // Rear
  { id: 'seat', label: 'Rider Seat', position: [0, 0.9, 0.3] as [number, number, number], camPos: [-1.5, 1.5, 1.0] as [number, number, number] },
  { id: 'exhaust', label: 'Tuned Exhaust', position: [0.35, 0.3, 0.5] as [number, number, number], camPos: [1.5, 0.3, 1.5] as [number, number, number] },
  { id: 'tail', label: 'Z LED Taillight', position: [0, 1.0, 1.0] as [number, number, number], camPos: [0, 1.5, 2.5] as [number, number, number] },
  { id: 'rear_wheel', label: 'Rear Tyre', position: [0, 0.3, 0.9] as [number, number, number], camPos: [-1.5, 0.5, 2.0] as [number, number, number] },
  { id: 'indicators', label: 'LED Turn Signals', position: [-0.2, 0.9, 1.1] as [number, number, number], camPos: [-1.0, 1.2, 2.0] as [number, number, number] },
];

import React from 'react';
import WebGLFallback from './WebGLFallback';

class ErrorBoundary extends React.Component<{ children: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) return <WebGLFallback />;
    return this.props.children;
  }
}

// Inside the scene setup component, optimize rendering:
function SceneSetup({ activeId, onActivate, exploreMode }: { activeId: string | null, onActivate: (id: string | null) => void, exploreMode: boolean }) {
  // ... (useFrame logic untouched) ...
  const cameraControlsRef = useRef<any>(null);
  const { camera, pointer } = useThree();
  const prefersReducedMotion = typeof window !== 'undefined' ? window.matchMedia('(prefers-reduced-motion: reduce)').matches : false;

  // Subtle mouse parallax
  useFrame(() => {
    if (!activeId && cameraControlsRef.current && !prefersReducedMotion) {
      const targetX = pointer.x * 0.1;
      const targetY = pointer.y * 0.1;
      camera.position.x = THREE.MathUtils.lerp(camera.position.x, camera.position.x + targetX, 0.05);
      camera.position.y = THREE.MathUtils.lerp(camera.position.y, camera.position.y + targetY, 0.05);
    }
  });

  // Handle camera transitions when a hotspot is clicked
  useEffect(() => {
    const isMobile = window.innerWidth < 768;
    const defaultDist = isMobile ? 5.0 : 3.5;
    
    if (activeId && cameraControlsRef.current) {
      const hotspot = HOTSPOTS.find(h => h.id === activeId);
      if (hotspot) {
        cameraControlsRef.current.setLookAt(
          hotspot.camPos[0], hotspot.camPos[1], hotspot.camPos[2],
          hotspot.position[0], hotspot.position[1], hotspot.position[2],
          !prefersReducedMotion
        );
      }
    } else if (cameraControlsRef.current) {
      cameraControlsRef.current.setLookAt(
        defaultDist, 1.5, defaultDist, 
        0, 0.6, 0, 
        !prefersReducedMotion
      );
    }
  }, [activeId, prefersReducedMotion]);

  return (
    <>
      <CameraControls 
        ref={cameraControlsRef} 
        makeDefault 
        minDistance={1.5} 
        maxDistance={6}
        maxPolarAngle={Math.PI / 2} 
        dollySpeed={0.5}
        smoothTime={0.5}
      />

      {/* Optimized Lighting: Reduced shadow map size */}
      <ambientLight intensity={0.4} />
      <spotLight position={[5, 5, 5]} angle={0.2} penumbra={1} intensity={1.5} castShadow shadow-mapSize={[512, 512]} />
      <spotLight position={[-5, 5, -5]} angle={0.2} penumbra={1} intensity={0.5} />
      
      {/* Optimized Environment: Low resolution */}
      <Environment preset="city" resolution={256} />

      <group onClick={(e) => {
        if (activeId) {
          e.stopPropagation();
          onActivate(null);
        }
      }}>
        <ModelPlaceholder activeHotspot={activeId} />
        
        {HOTSPOTS.map((hotspot) => {
          const hasAccessoryData = !!getAccessory('z900', hotspot.id);
          return (
            <Hotspot
              key={hotspot.id}
              position={hotspot.position}
              label={hotspot.label}
              description={hasAccessoryData ? undefined : 'Stock component.'} 
              active={activeId === hotspot.id}
              visible={exploreMode || activeId === hotspot.id}
              onClick={() => {
                if (!exploreMode && activeId !== hotspot.id) return;
                if (hotspot.id === 'ignition' && activeId !== 'ignition') {
                  const audioStore = useAudioStore.getState();
                  if (audioStore.isMuted) audioStore.toggleMute();
                  audioStore.playStartup();
                }

                if (activeId !== hotspot.id) {
                  trackEvent('view_accessory', { accessory_id: hotspot.id });
                }
                
                onActivate(activeId === hotspot.id ? null : hotspot.id);
              }}
            />
          );
        })}
      </group>

      {/* Optimized Shadows: bake shadows once (frames={1}) instead of rendering every frame */}
      <ContactShadows position={[0, 0, 0]} opacity={0.5} scale={5} blur={2} far={2} frames={1} resolution={256} />
    </>
  );
}

export default function MotorcycleViewer() {
  const [activeHotspot, setActiveHotspot] = useState<string | null>(null);
  const [exploreMode, setExploreMode] = useState(false);
  const { playHover, playClick, playStartup } = useAudioStore();
  const activeAccessory = activeHotspot ? getAccessory('z900', activeHotspot) : null;
  const [hasWebGL, setHasWebGL] = useState(true);

  // Check basic WebGL support before rendering Canvas
  useEffect(() => {
    try {
      const canvas = document.createElement('canvas');
      const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
      if (!gl) setHasWebGL(false);
    } catch (e) {
      setHasWebGL(false);
    }
  }, []);

  if (!hasWebGL) {
    return (
      <div className="relative w-full h-full bg-brand-black overflow-hidden">
        <WebGLFallback />
      </div>
    );
  }

  return (
    <div className="relative w-full h-full bg-brand-black overflow-hidden cursor-grab active:cursor-grabbing">
      
      {/* UI Overlay: Branding & Toggles */}
      <div className="absolute top-28 left-6 md:top-12 md:left-12 z-20 pointer-events-none flex flex-col gap-6">
        <div>
          <h2 className="text-3xl md:text-5xl font-light tracking-tight text-brand-white">Z900</h2>
          <p className="text-brand-muted text-[10px] md:text-xs tracking-[0.2em] uppercase mt-1">Sugomi Edition</p>
        </div>

        <div className="flex flex-col items-start gap-3 pointer-events-auto">
          <button 
            onMouseEnter={playHover}
            onClick={() => {
              playClick();
              if (!exploreMode) {
                playStartup();
                trackEvent('explore_bike', { bike: 'z900' });
              }
              setExploreMode(!exploreMode);
              if (exploreMode) setActiveHotspot(null);
            }}
            className={`px-6 py-4 md:px-4 md:py-2 text-[10px] tracking-widest uppercase transition-all duration-300 border rounded-sm ${
              exploreMode 
                ? 'bg-brand-white text-brand-black border-brand-white' 
                : 'bg-brand-black/50 text-brand-white border-brand-white/20 hover:border-brand-white/60'
            }`}
            data-cursor="TOGGLE"
          >
            {exploreMode ? 'Exit Exploration' : 'Explore Specs'}
          </button>
        </div>
      </div>

      {/* Reset View Button */}
      <div className={`absolute bottom-12 md:bottom-8 left-1/2 -translate-x-1/2 z-20 transition-all duration-500 ${
        activeHotspot && !activeAccessory ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4 pointer-events-none'
      }`}>
        <button 
          onMouseEnter={playHover}
          onClick={() => {
            playClick();
            setActiveHotspot(null);
          }}
          className="px-8 py-4 md:px-6 md:py-2.5 rounded-full border border-brand-white/20 bg-brand-black/80 backdrop-blur-md text-[10px] tracking-widest text-brand-white uppercase hover:bg-brand-white/10 transition-colors pointer-events-auto shadow-2xl"
          data-cursor="RESET"
        >
          Reset Camera
        </button>
      </div>

      {/* Instructions Overlay */}
      <div className="absolute bottom-12 right-6 md:top-12 md:bottom-auto md:right-12 md:-translate-y-0 hidden md:flex flex-col gap-8 z-10 pointer-events-none text-right transition-opacity duration-300" style={{ opacity: activeAccessory ? 0 : 1 }}>
        <div className="flex flex-col gap-1">
          <span className="text-[9px] text-brand-muted tracking-[0.2em] uppercase">Interaction</span>
          <span className="text-xs text-brand-white">Drag to Rotate</span>
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-[9px] text-brand-muted tracking-[0.2em] uppercase">Camera</span>
          <span className="text-xs text-brand-white">Scroll to Zoom</span>
        </div>
        {exploreMode && (
          <div className="flex flex-col gap-1">
            <span className="text-[9px] text-brand-muted tracking-[0.2em] uppercase">Inspect</span>
            <span className="text-xs text-brand-white">Tap Nodes</span>
          </div>
        )}
      </div>

      {/* Accessory Detail Side Panel */}
      <AccessoryPanel 
        accessory={activeAccessory || null} 
        onClose={() => {
          playClick();
          setActiveHotspot(null);
        }} 
      />

      {/* 3D Canvas with Error Boundary and Performance Hints */}
      <ErrorBoundary>
        <Canvas shadows dpr={[1, 1.5]} gl={{ powerPreference: "high-performance", antialias: false }} camera={{ position: (typeof window !== 'undefined' && window.innerWidth < 768) ? [5, 1.5, 5] : [3.5, 1.5, 3.5], fov: 45 }}>
          <Suspense fallback={null}>
            <SceneSetup activeId={activeHotspot} onActivate={setActiveHotspot} exploreMode={exploreMode} />
          </Suspense>
        </Canvas>
      </ErrorBoundary>
    </div>
  );
}
