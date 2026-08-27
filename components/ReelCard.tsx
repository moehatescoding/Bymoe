'use client';

import { motion } from 'framer-motion';
import { Reel } from '@/data/reels';

interface ReelCardProps {
  reel: Reel;
  index: number;
}

export default function ReelCard({ reel, index }: ReelCardProps) {
  const baseUrl = reel.instagramUrl.endsWith('/') ? reel.instagramUrl : `${reel.instagramUrl}/`;
  const embedUrl = `${baseUrl}embed/?dark=1`;

  return (
    <motion.div
      className="group relative w-full aspect-[9/16] bg-brand-surface rounded-xl overflow-hidden border border-white/10"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Loading spinner bg */}
      <div className="absolute inset-0 bg-brand-black flex items-center justify-center">
        <div className="w-6 h-6 border-2 border-white/10 border-t-white/40 rounded-full animate-spin" />
      </div>

      {/* Instagram embed */}
      <iframe
        src={embedUrl}
        className="absolute inset-0 w-full h-full border-0"
        scrolling="no"
        allowTransparency={true}
        allow="encrypted-media"
        loading="lazy"
        title={`Instagram Reel — ${reel.category}`}
      />

      {/* Category badge — top right, pointer-events-none so iframe stays clickable */}
      <div className="absolute top-3 right-3 pointer-events-none z-10">
        <span className="inline-block px-2.5 py-1 bg-black/70 backdrop-blur-md text-[9px] tracking-widest uppercase text-white rounded-full border border-white/10">
          {reel.category}
        </span>
      </div>

      {/* Fallback tap link if iframe fails */}
      <a
        href={reel.instagramUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute inset-0 z-0 cursor-pointer"
        aria-label={`Watch ${reel.category} reel on Instagram`}
        tabIndex={-1}
      />
    </motion.div>
  );
}
