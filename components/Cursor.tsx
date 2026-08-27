'use client';
import { useEffect, useState } from 'react';
import { motion, useSpring, useMotionValue } from 'framer-motion';

export default function Cursor() {
  const [isVisible, setIsVisible] = useState(false);
  const [cursorText, setCursorText] = useState('');
  const [isInteractive, setIsInteractive] = useState(false);
  
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  
  const springConfig = { damping: 25, stiffness: 300, mass: 0.5 };
  const cursorXSpring = useSpring(cursorX, springConfig);
  const cursorYSpring = useSpring(cursorY, springConfig);

  useEffect(() => {
    // Disable on touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      return;
    }

    setIsVisible(true);

    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      // Look for data-cursor attribute or interactive elements
      const interactiveEl = target.closest('a, button, [data-cursor]');
      
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
    <motion.div
      className="fixed top-0 left-0 pointer-events-none z-[9999] flex items-center justify-center rounded-full mix-blend-difference"
      style={{
        x: cursorXSpring,
        y: cursorYSpring,
        width: isInteractive ? (cursorText ? 80 : 40) : 12,
        height: isInteractive ? (cursorText ? 80 : 40) : 12,
        backgroundColor: '#ffffff',
        translateX: '-50%',
        translateY: '-50%',
      }}
      initial={{ opacity: 0 }}
      animate={{ 
        opacity: 1,
        scale: isInteractive ? 1 : 1
      }}
      transition={{ duration: 0.2 }}
    >
      {cursorText && (
        <span className="text-black text-[10px] font-bold tracking-widest pointer-events-none mix-blend-normal">
          {cursorText}
        </span>
      )}
    </motion.div>
  );
}
