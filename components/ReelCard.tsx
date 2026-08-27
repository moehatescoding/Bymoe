'use client';

import { motion } from 'framer-motion';
import { Reel } from '@/data/reels';

interface ReelCardProps {
  reel: Reel;
  index: number;
}

// Extracts the shortcode from an Instagram URL
// e.g. https://www.instagram.com/reel/DcGzCH_v7kP/ → DcGzCH_v7kP
function getShortcode(url: string): string {
  const match = url.match(/reel\/([^/]+)/);
  return match?.[1] ?? '';
}

export default function ReelCard({ reel, index }: ReelCardProps) {
  const shortcode = getShortcode(reel.instagramUrl);

  return (
    <motion.a
      href={reel.instagramUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col w-full aspect-[9/16] bg-[#111118] rounded-2xl overflow-hidden border border-white/10 cursor-pointer select-none"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* ── Background: Instagram oEmbed thumbnail ── */}
      {/* Instagram provides a CDN thumbnail via their embed. We use it as a
          background image so there's no empty black box. */}
      <img
        src={`https://www.instagram.com/p/${shortcode}/media/?size=l`}
        alt={`Instagram ${reel.category} reel`}
        className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-opacity duration-500"
        loading="lazy"
        onError={(e) => {
          // If the thumbnail fails (CORS on localhost), hide it gracefully
          (e.target as HTMLImageElement).style.display = 'none';
        }}
      />

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-black/50" />

      {/* ── Top bar ── */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 pt-4">
        {/* Instagram logo */}
        <div className="flex items-center gap-2">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="white" className="opacity-70">
            <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
          </svg>
          <span className="text-[10px] font-bold text-white/60 tracking-widest uppercase">@moegical</span>
        </div>

        {/* Category pill */}
        <span className="inline-block px-2.5 py-1 bg-black/60 backdrop-blur-md text-[9px] tracking-widest uppercase text-white rounded-full border border-white/10">
          {reel.category}
        </span>
      </div>

      {/* ── Center play button ── */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:bg-white/20 group-hover:scale-110 transition-all duration-300">
          {/* Play triangle */}
          <svg width="20" height="20" viewBox="0 0 24 24" fill="white" className="ml-1">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </div>
      </div>

      {/* ── Bottom label ── */}
      <div className="absolute bottom-0 left-0 right-0 px-4 pb-4">
        <p className="text-xs font-semibold text-white/80">Watch on Instagram</p>
        <p className="text-[10px] text-white/40 mt-0.5">Tap to open →</p>
      </div>
    </motion.a>
  );
}
