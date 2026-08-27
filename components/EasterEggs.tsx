'use client';
import { useEffect, useState } from 'react';
import { useAudioStore } from '@/store/audioStore';
import { motion, AnimatePresence } from 'framer-motion';

export default function EasterEggs() {
  const [magicTriggered, setMagicTriggered] = useState(false);
  const { playStartup, toggleMute, isMuted } = useAudioStore();

  useEffect(() => {
    // Hidden Konami-style text listener
    const secretCode = 'moegical';
    let inputBuffer = '';

    const handleKeyDown = (e: KeyboardEvent) => {
      // Append the character (lowercase)
      inputBuffer += e.key.toLowerCase();

      // Keep buffer to the length of the secret word
      if (inputBuffer.length > secretCode.length) {
        inputBuffer = inputBuffer.slice(inputBuffer.length - secretCode.length);
      }

      if (inputBuffer === secretCode && !magicTriggered) {
        setMagicTriggered(true);
        // Force audio on if muted so the user actually hears the easter egg
        if (isMuted) toggleMute();
        
        // Slight delay to allow audio context to catch up
        setTimeout(() => {
          playStartup();
        }, 100);

        // Hide it after a few seconds
        setTimeout(() => {
          setMagicTriggered(false);
          inputBuffer = '';
        }, 4000);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [magicTriggered, playStartup, isMuted, toggleMute]);

  return (
    <AnimatePresence>
      {magicTriggered && (
        <motion.div 
          className="fixed inset-0 z-[9999] pointer-events-none flex items-center justify-center mix-blend-difference"
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 1.2 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-[15vw] font-bold tracking-tighter text-brand-white">
            MAGIC.
          </h1>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
