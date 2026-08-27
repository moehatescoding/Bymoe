'use client';
import { useEffect, useState } from 'react';
import { useProgress } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';

export default function LoadingScreen() {
  const { progress, active } = useProgress();
  const [showFallback, setShowFallback] = useState(false);
  const [isReady, setIsReady] = useState(false);

  // Consider it ready when R3F finishes loading
  useEffect(() => {
    if (progress === 100) {
      // Slight delay for a smoother transition after loading completes
      const timeout = setTimeout(() => setIsReady(true), 800);
      return () => clearTimeout(timeout);
    }
  }, [progress]);

  useEffect(() => {
    // If there is no 3D Canvas on the page, active stays false. 
    // Dismiss instantly after a short layout buffer.
    const noCanvasTimer = setTimeout(() => {
      if (!active && progress === 0 && !isReady) {
        setIsReady(true);
      }
    }, 500);

    // Fallback: If loading takes longer than 8 seconds, force ready or show message
    const fallbackTimer = setTimeout(() => {
      if (!isReady) {
        setShowFallback(true);
        setTimeout(() => setIsReady(true), 2000);
      }
    }, 8000);
    
    return () => {
      clearTimeout(noCanvasTimer);
      clearTimeout(fallbackTimer);
    };
  }, [isReady, active, progress]);

  return (
    <AnimatePresence>
      {!isReady && (
        <motion.div
          key="loading-screen"
          className="fixed inset-0 z-[999] flex flex-col items-center justify-center bg-brand-black text-brand-white"
          initial={{ opacity: 1 }}
          exit={{ 
            opacity: 0,
            y: '-10%',
            transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1] } 
          }}
        >
          <div className="flex flex-col items-center justify-center w-full max-w-sm px-6">
            <motion.h1 
              className="text-4xl md:text-6xl font-bold tracking-tighter mb-12"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              BYMOE
            </motion.h1>

            <div className="w-full relative h-px bg-brand-white/10 overflow-hidden mb-6">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-brand-white"
                initial={{ width: 0 }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.3, ease: "linear" }}
              />
            </div>

            <div className="flex justify-between w-full text-[9px] tracking-widest uppercase font-semibold text-brand-muted">
              <span>
                {showFallback ? "Taking longer than expected..." : "Loading the garage"}
              </span>
              <span className="text-brand-white tabular-nums">
                {Math.round(progress)}%
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
