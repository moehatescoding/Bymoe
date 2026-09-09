'use client';

import { motion } from 'framer-motion';
import ReelCard from '@/components/ReelCard';
import { REELS_CONTENT } from '@/data/reels';

export default function ContentPage() {
  return (
    <main className="min-h-screen bg-brand-black pb-32 pt-28 px-5 sm:px-8 md:px-12 max-w-7xl mx-auto overflow-x-hidden">

      {/* Header */}
      <div className="mb-14 text-left border-b border-white/[0.08] pb-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 mb-3"
        >
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
          <p className="hud-tag">
            TELEMETRY // VERTICAL REELS & MOTION CUTS
          </p>
        </motion.div>
        <motion.h1
          className="font-display text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-tight text-white mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          RAW CUTS & <span className="text-[#00ff66]">NIGHT RIDES</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-lg text-white/60 max-w-2xl font-light leading-relaxed mb-6"
        >
          Exhaust notes, 14,000 RPM tach sweeps, garage build progress, and high-speed highway pulls. Documented vertically for mobile.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <a
            href="https://instagram.com/moegical"
            target="_blank"
            rel="noopener noreferrer"
            data-cursor="JOIN"
            className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-white/5 border border-white/10 hover:bg-[#00ff66] hover:text-black hover:border-[#00ff66] active:scale-[0.97] transition-all cursor-pointer text-xs font-mono font-bold uppercase tracking-wider text-white"
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
            </svg>
            <span>FOLLOW @MOEGICAL // INSTAGRAM FEED</span>
          </a>
        </motion.div>
      </div>

      {/* Reels grid — portrait 9:16 */}
      <section>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {REELS_CONTENT.map((reel, index) => (
            <ReelCard key={reel.id} reel={reel} index={index} />
          ))}
        </div>
      </section>

    </main>
  );
}
