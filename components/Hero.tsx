'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

// ─────────────────────────────────────────
// WhatsApp SVG Icon (official logo colors)
// ─────────────────────────────────────────
function WhatsAppIcon({ size = 24 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" fill="currentColor"/>
    </svg>
  );
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  const bgScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-screen flex flex-col overflow-hidden bg-brand-black"
    >
      {/* ── Background: Cinematic Kawasaki image with Parallax ── */}
      <motion.div 
        className="absolute inset-0 z-0 origin-center"
        style={{ scale: bgScale }}
      >
        <Image
          src="/kawasaki-hero.jpg"
          alt="Kawasaki Ninja — bymoe"
          fill
          className="object-cover object-center"
          priority
        />
        {/* Heavy dark cinematic vignettes so all text and UI elements remain perfectly crisp */}
        <div className="absolute inset-0 bg-gradient-to-b from-brand-black/85 via-brand-black/40 to-brand-black" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-black/70 via-transparent to-brand-black/70" />
      </motion.div>

      {/* ── Hero Content Layer ── */}
      <motion.div 
        className="relative z-10 flex flex-col min-h-screen px-5 sm:px-8 md:px-12 pt-28 pb-12"
        style={{ opacity: heroOpacity }}
      >
        {/* Top-Left Brand Identity */}
        <motion.div
          className="flex flex-col items-start"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          {/* bymoe logo */}
          <div className="relative w-44 h-14 sm:w-56 sm:h-16 mb-4 overflow-hidden">
            <Image
              src="/logo.svg"
              alt="bymoe"
              fill
              sizes="(max-width: 640px) 176px, 224px"
              className="object-contain object-left"
              priority
            />
          </div>

          <p className="text-xs sm:text-sm tracking-[0.25em] text-white/60 uppercase font-light mb-1">
            Life, built my way.
          </p>
          <p className="text-[10px] tracking-[0.2em] text-[#39FF14] uppercase font-semibold">
            Kawasaki Ninja · Creator · Rider · Builder
          </p>
        </motion.div>

        {/* Vertical Spacer to push CTA box to bottom-left */}
        <div className="flex-1 min-h-[140px]" />

        {/* ─── WHATSAPP COMMUNITY CTA & QUICK ACTIONS (Inside Hero) ─── */}
        <motion.div
          className="w-full max-w-lg"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <a
            href="https://chat.whatsapp.com/ENrb0phc8sT32tMnwnoqiw?s=cl&p=i&mlu=0"
            target="_blank"
            rel="noopener noreferrer"
            className="group flex items-center gap-4 w-full p-5 sm:p-6 rounded-2xl border border-white/15 bg-black/50 backdrop-blur-xl hover:bg-[#25D366]/15 hover:border-[#25D366]/50 active:scale-[0.98] transition-all duration-300 cursor-pointer shadow-2xl"
          >
            {/* WA Icon circle */}
            <div className="flex-shrink-0 w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-[#25D366]/15 border border-[#25D366]/30 flex items-center justify-center group-hover:bg-[#25D366]/25 transition-colors">
              <span className="text-[#25D366]">
                <WhatsAppIcon size={24} />
              </span>
            </div>

            <div className="flex-1 min-w-0">
              <p className="text-white font-bold text-base sm:text-lg leading-tight tracking-tight">
                Join WhatsApp Community
              </p>
              <p className="text-white/50 text-xs sm:text-sm mt-0.5 font-light">
                Ride. Share. Connect.
              </p>
            </div>

            {/* Arrow */}
            <div className="flex-shrink-0 text-white/30 group-hover:text-[#25D366] group-hover:translate-x-1 transition-all duration-300">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </div>
          </a>

          {/* Quick actions row */}
          <div className="flex gap-3 mt-3">
            <Link
              href="/products"
              className="flex-1 flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 active:scale-[0.97] transition-all cursor-pointer text-xs font-bold tracking-widest uppercase text-white/70 hover:text-white"
            >
              Products
            </Link>
            <Link
              href="/blog"
              className="flex-1 flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 active:scale-[0.97] transition-all cursor-pointer text-xs font-bold tracking-widest uppercase text-white/70 hover:text-white"
            >
              Blog
            </Link>
            <Link
              href="/content"
              className="flex-1 flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-white/5 backdrop-blur-md border border-white/10 hover:bg-white/10 active:scale-[0.97] transition-all cursor-pointer text-xs font-bold tracking-widest uppercase text-white/70 hover:text-white"
            >
              Reels
            </Link>
          </div>
        </motion.div>
      </motion.div>

      {/* ── Scroll Indicator (Bottom Center) ── */}
      <motion.div
        className="absolute bottom-4 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <motion.div
          className="w-px h-8 bg-gradient-to-b from-white/0 to-white/40"
          animate={{ scaleY: [0, 1, 0], transformOrigin: 'top' }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      </motion.div>
    </section>
  );
}
