'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import { Bike } from '@/data/bikes';
import Link from 'next/link';
import { useAudioStore } from '@/store/audioStore';
import { trackEvent } from '@/lib/analytics';
import { useEffect } from 'react';

export default function BikeCard({ bike, index }: { bike: Bike, index: number }) {
  const { playHover, playClick } = useAudioStore();
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    trackEvent('view_garage_bike', { bike_model: bike.model });
  }, [bike.model]);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start end', 'end start']
  });

  // Subtle parallax for the hero image
  const y = useTransform(scrollYProgress, [0, 1], ['-10%', '10%']);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <motion.article 
      ref={containerRef}
      style={{ opacity }}
      className="relative w-full min-h-screen py-32 border-b border-brand-white/5 flex flex-col"
    >
      {/* Bike Header */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16 mb-16">
        <div className="md:col-span-4 flex flex-col justify-end">
          <div className="flex items-center gap-4 mb-4">
            <span className="text-[10px] tracking-[0.2em] text-brand-muted uppercase font-semibold">
              {bike.year}
            </span>
            <span className="w-1 h-1 rounded-full bg-brand-muted/50" />
            <span className={`text-[9px] tracking-widest uppercase border px-2 py-0.5 rounded-sm ${
              bike.status === 'Current' ? 'border-brand-white text-brand-white' : 'border-brand-muted text-brand-muted'
            }`}>
              {bike.status}
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-semibold tracking-tighter leading-none mb-2">
            {bike.make} <br />
            <span className="text-brand-muted">{bike.model}</span>
          </h2>
          {bike.nickname && (
            <p className="text-sm font-light tracking-wide text-brand-white/70 italic mt-2">
              "{bike.nickname}"
            </p>
          )}
        </div>
        
        <div className="md:col-span-8">
          <p className="text-lg md:text-xl text-brand-white/90 leading-relaxed font-light">
            {bike.story}
          </p>
          {bike.id === 'z900' && (
            <div className="mt-8">
              <Link 
                href="/#viewer" 
                onClick={playClick}
                onMouseEnter={playHover}
                className="inline-flex items-center gap-2 text-[10px] tracking-widest text-brand-white uppercase border-b border-brand-white/30 pb-1 hover:border-brand-white transition-colors"
                data-cursor="VIEW 3D"
              >
                Launch 3D Viewer
                <svg width="12" height="12" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 13L13 1M13 1H4M13 1V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Link>
            </div>
          )}
        </div>
      </div>

      {/* Hero Image Parallax */}
      <div className="w-full h-[50vh] md:h-[70vh] relative overflow-hidden bg-brand-black">
        <motion.div style={{ y }} className="absolute inset-0 w-full h-[120%] -top-[10%]">
          <Image 
            src={bike.heroImage} 
            alt={`${bike.make} ${bike.model}`} 
            fill
            sizes="100vw"
            className="object-cover opacity-80"
          />
        </motion.div>
      </div>

      {/* Specs, Setup & Mods */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-16 mt-24">
        
        {/* Setup */}
        <div>
          <h3 className="text-[10px] tracking-[0.2em] text-brand-white/40 uppercase mb-6">The Setup</h3>
          <p className="text-sm text-brand-white/80 leading-relaxed font-light">
            {bike.setup}
          </p>
        </div>

        {/* Notes */}
        <div>
          <h3 className="text-[10px] tracking-[0.2em] text-brand-white/40 uppercase mb-6">Personal Notes</h3>
          <p className="text-sm text-brand-white/80 leading-relaxed font-light italic border-l border-brand-white/10 pl-4">
            "{bike.notes}"
          </p>
        </div>

        {/* Mods */}
        <div>
          <h3 className="text-[10px] tracking-[0.2em] text-brand-white/40 uppercase mb-6">Key Modifications</h3>
          <ul className="flex flex-col gap-3">
            {bike.modifications.map((mod, i) => (
               <li key={i} className="flex items-start gap-3 text-sm text-brand-white/90">
                 <span className="text-brand-muted mt-1 text-[8px]">■</span>
                 {mod}
               </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Mini Gallery */}
      {bike.gallery && bike.gallery.length > 0 && (
        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full mt-24 pb-12">
          <h3 className="text-[10px] tracking-[0.2em] text-brand-white/40 uppercase mb-8">Gallery</h3>
          <div className="flex md:grid md:grid-cols-3 gap-4 overflow-x-auto snap-x snap-mandatory hide-scrollbar pb-8 md:pb-0 -mx-6 px-6 md:mx-0 md:px-0">
            {bike.gallery.map((img, i) => (
              <div key={i} className="relative flex-none w-[80vw] md:w-auto aspect-square md:aspect-[4/5] bg-brand-surface overflow-hidden snap-center hover-reveal rounded-sm" data-cursor="VIEW">
                <Image 
                  src={img} 
                  alt={`${bike.nickname || bike.model} - Gallery Image ${i + 1}`} 
                  fill 
                  sizes="(max-width: 768px) 80vw, 33vw"
                  className="object-cover opacity-60 hover:opacity-100 transition-opacity duration-500"
                />
              </div>
            ))}
          </div>
        </div>
      )}
    </motion.article>
  );
}
