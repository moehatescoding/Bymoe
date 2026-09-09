'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Image from 'next/image';
import { Reel } from '@/data/reels';

interface ReelCardProps {
  reel: Reel;
  index: number;
}

export default function ReelCard({ reel, index }: ReelCardProps) {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.a
      href={reel.instagramUrl}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor="PLAY"
      className="editorial-grade group relative flex flex-col w-full aspect-[9/16] bg-[#0c0c12] rounded-2xl overflow-hidden border border-white/10 hover:border-[#00ff66]/50 transition-all duration-500 cursor-pointer select-none shadow-2xl"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileTap={{ scale: 0.98 }}
    >
      {/* ── Cover image ── */}
      {reel.coverUrl && !imgError ? (
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={reel.coverUrl}
            alt={`${reel.category} reel`}
            fill
            className="object-cover opacity-85 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
            onError={() => setImgError(true)}
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 via-zinc-800 to-black" />
      )}

      {/* Dark gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/60 z-[1]" />

      {/* ── Top Telemetry Bar ── */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 pt-4 z-10">
        {/* REC badge */}
        <div className="flex items-center gap-2 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
          <span className="font-mono text-[10px] text-white/90 font-bold uppercase tracking-wider">
            REC // 60FPS
          </span>
        </div>

        {/* Category pill */}
        <span className="hud-tag text-[9px]">
          {reel.category}
        </span>
      </div>

      {/* ── Center play button (Transforms on Hover) ── */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="w-16 h-16 rounded-full bg-black/60 backdrop-blur-md border border-white/20 flex items-center justify-center group-hover:bg-[#00ff66] group-hover:border-[#00ff66] group-hover:scale-115 transition-all duration-300 shadow-xl">
          <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="text-white group-hover:text-black ml-1 transition-colors">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </div>
      </div>

      {/* ── Bottom Telemetry Info ── */}
      <div className="absolute bottom-0 left-0 right-0 p-5 z-10 bg-gradient-to-t from-black via-black/80 to-transparent">
        <div className="flex items-center justify-between font-mono text-[10px] text-white/50 mb-1">
          <span>AUDIO // ORIGINAL CUT</span>
          <span className="text-[#00ff66]">HD 1080P</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="font-display text-lg font-black uppercase text-white tracking-wider group-hover:text-[#00ff66] transition-colors">
            WATCH REEL
          </span>
          <span className="text-xs text-[#00ff66] font-mono group-hover:translate-x-1 transition-transform">
            IG ↗
          </span>
        </div>
      </div>
    </motion.a>
  );
}
