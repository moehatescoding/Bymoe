'use client';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

export default function LoadingScreen() {
  const [isReady, setIsReady] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    setIsReady(false);
    // Cinematic load for the initial entry, shorter load for page transitions
    const timeout = setTimeout(() => setIsReady(true), 1200);
    return () => clearTimeout(timeout);
  }, [pathname]);

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
            <motion.div 
              className="relative w-48 h-16 md:w-64 md:h-20 mb-12 mix-blend-screen overflow-hidden"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <Image 
                src="/logo.png" 
                alt="BYMOE" 
                fill 
                sizes="(max-width: 768px) 192px, 256px"
                className="object-contain object-center"
                priority
              />
            </motion.div>

            <div className="w-full relative h-px bg-brand-white/10 overflow-hidden mb-6">
              <motion.div 
                className="absolute top-0 left-0 h-full bg-brand-white"
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
              />
            </div>
            
            <motion.p 
              className="text-[10px] tracking-widest text-brand-muted uppercase font-medium"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
            >
              Loading Cinematic Experience
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
