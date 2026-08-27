'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Camera push effect (scale up slightly on scroll)
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0.5, 0]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 100]);

  // Transition settings for realistic easing
  const easing: [number, number, number, number] = [0.25, 0.1, 0.25, 1]; // Smooth, realistic curve

  return (
    <section 
      ref={containerRef} 
      className="relative w-full h-screen overflow-hidden bg-brand-black flex items-center justify-center"
    >
      {/* Garage Background with Silhouette */}
      <motion.div
        className="absolute inset-0 z-0 origin-center"
        style={{ scale }}
      >
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/80 to-brand-black/30 z-10" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#050508_70%)] z-10" />
        
        {/* Placeholder for the dark garage / motorcycle silhouette. 
            Once the 3D scene is ready, this will transition seamlessly into it. */}
        <div 
          className="absolute inset-0 opacity-40 bg-center bg-cover bg-no-repeat"
          style={{ 
            backgroundImage: 'url("https://images.unsplash.com/photo-1558981806-ec527fa84c39?q=80&w=2070&auto=format&fit=crop")',
            filter: 'brightness(0.3) contrast(1.2) grayscale(0.8)'
          }}
        />
      </motion.div>

      {/* Typography Layer */}
      <motion.div 
        className="relative z-20 flex flex-col items-center text-center px-4"
        style={{ y: textY, opacity }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, ease: easing, delay: 0.2 }}
          className="overflow-hidden mb-6"
        >
          <h1 className="text-[clamp(4rem,15vw,12rem)] font-bold tracking-tighter leading-[0.85] text-brand-white">
            BYMOE
          </h1>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease: easing, delay: 1 }}
          className="flex flex-col items-center gap-4"
        >
          <h2 className="text-xl md:text-3xl font-light tracking-wide text-brand-white/90">
            Life, built my way.
          </h2>
          
          <div className="flex items-center gap-3 text-xs md:text-sm tracking-[0.2em] text-brand-muted uppercase font-medium mt-2">
            <span>Creator</span>
            <span className="w-1 h-1 rounded-full bg-brand-muted/50" />
            <span>Builder</span>
            <span className="w-1 h-1 rounded-full bg-brand-muted/50" />
            <span>Rider</span>
            <span className="w-1 h-1 rounded-full bg-brand-muted/50" />
            <span>Explorer</span>
          </div>
        </motion.div>
      </motion.div>

      {/* Scroll Indicator / Instruction */}
      <motion.div 
        className="absolute bottom-12 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center gap-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, ease: easing, delay: 2 }}
        style={{ opacity }}
      >
        <div className="text-[10px] tracking-[0.3em] text-brand-white/50 uppercase">
          Explore the Machine
        </div>
        <motion.div 
          className="w-[1px] h-12 bg-brand-white/20 relative overflow-hidden"
        >
          <motion.div 
            className="w-full h-1/2 bg-brand-white/80 absolute top-0 left-0"
            animate={{ 
              y: ['-100%', '200%']
            }}
            transition={{ 
              duration: 1.5,
              ease: "linear",
              repeat: Infinity
            }}
          />
        </motion.div>
      </motion.div>
    </section>
  );
}
