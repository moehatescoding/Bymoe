'use client';

import { useRef, useEffect } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { Reel } from '@/data/reels';
import { useAudioStore } from '@/store/audioStore';

interface ReelCardProps {
  reel: Reel;
  index: number;
}

export default function ReelCard({ reel, index }: ReelCardProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLAnchorElement>(null);
  const isInView = useInView(containerRef, { margin: "-20% 0px" });
  const { playHover, playClick } = useAudioStore();

  useEffect(() => {
    if (!videoRef.current) return;
    
    // Play video only when it's in the viewport to save battery/CPU
    if (isInView) {
      const playPromise = videoRef.current.play();
      if (playPromise !== undefined) {
        playPromise.catch(error => {
          // Autoplay was prevented (e.g., low battery mode on iOS)
          console.log('Video autoplay prevented:', error);
        });
      }
    } else {
      videoRef.current.pause();
    }
  }, [isInView]);

  return (
    <motion.a
      ref={containerRef}
      href={reel.instagramUrl}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={playHover}
      onClick={playClick}
      className="group block relative w-full aspect-[9/16] bg-brand-surface rounded-sm overflow-hidden"
      data-cursor="WATCH"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Fallback Thumbnail / Poster */}
      <Image 
        src={reel.thumbnailUrl}
        alt={reel.instagramHandle}
        fill
        sizes="(max-width: 768px) 100vw, 33vw"
        className="object-cover transition-opacity duration-700"
      />

      {/* Video layer - hidden if users prefer reduced motion, allowing the static thumbnail to show */}
      <video
        ref={videoRef}
        src={reel.videoUrl}
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-0 md:opacity-100 group-hover:scale-105 transition-all duration-700 pointer-events-none motion-reduce:hidden"
      />

      {/* Overlay & Text */}
      <div className="absolute inset-0 bg-gradient-to-t from-brand-black/90 via-transparent to-brand-black/40 p-6 flex flex-col justify-between opacity-80 group-hover:opacity-100 transition-opacity">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-brand-white/10 flex items-center justify-center overflow-hidden border border-brand-white/20">
            <span className="text-[10px] font-bold">M</span>
          </div>
          <span className="text-xs font-medium text-brand-white drop-shadow-md">
            {reel.instagramHandle}
          </span>
        </div>
        
        <div>
          <span className="inline-block px-2 py-1 bg-brand-white/10 backdrop-blur-sm text-[9px] tracking-widest uppercase text-brand-white rounded mb-2">
            {reel.category}
          </span>
          <p className="text-sm font-medium text-brand-white line-clamp-2 drop-shadow-md">
            {reel.caption}
          </p>
        </div>
      </div>
    </motion.a>
  );
}
