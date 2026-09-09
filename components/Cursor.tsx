'use client';
import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function Cursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isInteractive, setIsInteractive] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 28, stiffness: 350, mass: 0.4 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Disable on touch devices
    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    setIsVisible(true);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const interactiveEl = target.closest('a, button, [data-cursor], [role="button"]');
      
      if (interactiveEl) {
        setIsInteractive(true);
        const text = interactiveEl.getAttribute('data-cursor') || '';
        setCursorText(text);
      } else {
        setIsInteractive(false);
        setCursorText('');
      }
    };

    window.addEventListener('mousemove', moveCursor);
    window.addEventListener('mouseover', handleMouseOver);

    return () => {
      window.removeEventListener('mousemove', moveCursor);
      window.removeEventListener('mouseover', handleMouseOver);
    };
  }, [cursorX, cursorY]);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer Spring Follower Ring / Pill */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center border border-[#00ff66]/60 bg-black/60 backdrop-blur-sm"
        style={{
          x: cursorXSpring,
          y: cursorYSpring,
          translateX: '-50%',
          translateY: '-50%',
          borderRadius: cursorText ? '12px' : '9999px',
          padding: cursorText ? '6px 14px' : '0px',
        }}
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: 1,
          width: cursorText ? 'auto' : (isInteractive ? 44 : 26),
          height: cursorText ? 28 : (isInteractive ? 44 : 26),
          borderColor: isInteractive ? '#00ff66' : 'rgba(255, 255, 255, 0.25)',
        }}
        transition={{ duration: 0.2 }}
      >
        {cursorText ? (
          <span className="text-[#00ff66] text-[9px] font-mono font-bold tracking-[0.2em] uppercase whitespace-nowrap">
            [{cursorText}]
          </span>
        ) : null}
      </motion.div>

      {/* Inner Precision Center Point */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9999] w-1.5 h-1.5 rounded-full bg-[#00ff66]"
        style={{
          x: cursorX,
          y: cursorY,
          translateX: '-50%',
          translateY: '-50%',
        }}
      />
    </>
  );
}
