'use client';

import { motion } from 'framer-motion';
import { Reel } from '@/data/reels';

interface ReelCardProps {
  reel: Reel;
  index: number;
}

export default function ReelCard({ reel, index }: ReelCardProps) {
  // Ensure URL ends with a slash before appending embed
  const baseUrl = reel.instagramUrl.endsWith('/') ? reel.instagramUrl : `${reel.instagramUrl}/`;
  const embedUrl = `${baseUrl}embed/?dark=1`;

  return (
    <motion.div
      className="group block relative w-full aspect-[9/16] md:aspect-[4/5] lg:aspect-[9/16] bg-brand-surface rounded-sm overflow-hidden border border-brand-white/10"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Decorative dark cinematic background while iframe loads */}
      <div className="absolute inset-0 bg-brand-black flex items-center justify-center -z-10">
        <div className="w-8 h-8 border-2 border-brand-white/20 border-t-brand-white rounded-full animate-spin" />
      </div>

      <iframe
        src={embedUrl}
        className="w-full h-full border-0"
        scrolling="no"
        allowTransparency={true}
        allow="encrypted-media"
      />
      
      {/* Fallback Overlay for category if we want to retain the BYMOE aesthetic */}
      <div className="absolute top-4 right-4 pointer-events-none">
        <span className="inline-block px-2 py-1 bg-brand-black/80 backdrop-blur-md text-[9px] tracking-widest uppercase text-brand-white rounded border border-brand-white/10">
          {reel.category}
        </span>
      </div>
    </motion.div>
  );
}
