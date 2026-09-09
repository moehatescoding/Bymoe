'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';
import HeroAudioButton from '@/components/HeroAudioButton';

function WhatsAppIcon({ size = 22 }: { size?: number }) {
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

  const bgScale = useTransform(scrollYProgress, [0, 1], [1.02, 1.2]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.85], [1, 0]);
  const textParallax = useTransform(scrollYProgress, [0, 1], [0, 90]);

  return (
    <section 
      ref={containerRef}
      className="relative min-h-[100svh] flex flex-col justify-between overflow-hidden bg-[#08080a]"
    >
      {/* ── Background: Cinematic Kawasaki image with Ambient Drift & Parallax ── */}
      <motion.div 
        className="absolute inset-0 z-0 origin-center"
        style={{ scale: bgScale }}
      >
        <motion.div
          className="relative w-full h-full"
          animate={{
            scale: [1, 1.04, 1],
            x: [0, -6, 0],
            y: [0, -4, 0]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <Image
            src="/kawasaki-hero.jpg"
            alt="Kawasaki Ninja Z900 — bymoe"
            fill
            className="object-cover object-center editorial-grade"
            priority
          />
        </motion.div>

        {/* Asphalt Graded Dark Vignettes */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#08080a]/90 via-[#08080a]/40 to-[#08080a]" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#08080a]/85 via-transparent to-[#08080a]/75" />
        
        {/* Subtle Scanline / Asphalt Grit Grid */}
        <div 
          className="absolute inset-0 opacity-[0.04] pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(rgba(255,255,255,0.2) 1px, transparent 0)',
            backgroundSize: '24px 24px'
          }}
        />
      </motion.div>

      {/* ── Hero Main Content ── */}
      <motion.div 
        className="relative z-10 flex flex-col justify-between min-h-[100svh] px-4 sm:px-8 md:px-16 pt-16 sm:pt-24 md:pt-28 pb-24 sm:pb-28 md:pb-12 max-w-7xl mx-auto w-full"
        style={{ opacity: heroOpacity }}
      >
        {/* Top Telemetry Header */}
        <motion.div
          className="flex items-center justify-between gap-3 pt-1"
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          {/* Logo brandmark */}
          <div className="flex items-center gap-2.5 sm:gap-4">
            <div className="relative w-28 sm:w-44 h-8 sm:h-12 overflow-hidden">
              <Image
                src="/logo.png"
                alt="by/moe"
                fill
                sizes="(max-width: 640px) 112px, 176px"
                className="object-contain object-left"
                priority
              />
            </div>
            <div className="flex items-center gap-1.5 pl-2 sm:pl-4 border-l border-white/10">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00ff66] animate-pulse" />
              <span className="hud-tag text-[8px] sm:text-[9px] py-0.5 px-1.5 sm:px-2 whitespace-nowrap">
                Z900 // HYD · IND
              </span>
            </div>
          </div>

          {/* Voice Audio Experience Easter Egg */}
          <div className="flex items-center gap-2">
            <HeroAudioButton audioSrc="/audio/hero-voice.mp3" />
          </div>
        </motion.div>

        {/* ── Center: OVERSIZED KINETIC HEADLINE (Dominates Viewport) ── */}
        <motion.div
          style={{ y: textParallax }}
          className="my-auto py-6 sm:py-14 select-none"
        >
          <motion.div
            initial={{ opacity: 0, y: 35 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25 }}
            className="flex items-center gap-2 sm:gap-3 mb-2.5 sm:mb-4"
          >
            <span className="text-[10px] sm:text-xs font-mono tracking-[0.25em] sm:tracking-[0.3em] uppercase text-[#00ff66] font-semibold">
              // DISPATCH 001
            </span>
            <span className="h-px w-8 sm:w-12 bg-white/20" />
            <span className="text-[9px] sm:text-[11px] font-mono tracking-wider sm:tracking-widest text-white/40 uppercase">
              RIDER · BUILDER · CREATOR
            </span>
          </motion.div>

          <motion.h1
            className="text-editorial-lead text-[3rem] xs:text-[3.5rem] sm:text-8xl md:text-9xl lg:text-[10.5vw] font-extrabold text-white tracking-[-0.03em] leading-[0.88]"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.9, delay: 0.35, ease: [0.16, 1, 0.3, 1] }}
          >
            <span className="block text-white hover:text-[#00ff66] transition-colors duration-500">
              LIFE, BUILT
            </span>
            <span className="block text-white/35 hover:text-white transition-colors duration-500">
              MY WAY.
            </span>
          </motion.h1>

          <motion.p
            className="mt-4 sm:mt-6 max-w-xl text-xs sm:text-base md:text-lg text-white/60 font-light leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.55 }}
          >
            Motorsports telemetry, raw custom builds, midnight runs and unfiltered field notes from the garage to the highway.
          </motion.p>
        </motion.div>

        {/* ── Bottom Strip: ONE Singular Dominant Action + Tachometer Scroll ── */}
        <motion.div
          className="flex flex-col sm:flex-row items-stretch sm:items-end justify-between gap-4 sm:gap-6 pt-3 sm:pt-4 border-t border-white/[0.08]"
          initial={{ opacity: 0, y: 25 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          {/* Primary Action Above Fold */}
          <div className="w-full sm:max-w-md">
            <a
              href="https://chat.whatsapp.com/ENrb0phc8sT32tMnwnoqiw?s=cl&p=i&mlu=0"
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center justify-between p-3.5 sm:p-5 rounded-xl sm:rounded-2xl border border-white/15 bg-black/75 backdrop-blur-2xl hover:border-[#00ff66]/60 hover:bg-black/90 active:scale-[0.98] transition-all duration-300 shadow-[0_12px_40px_rgba(0,0,0,0.8)] cursor-pointer"
              data-cursor="JOIN"
            >
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-[#00ff66]/15 border border-[#00ff66]/30 flex items-center justify-center text-[#00ff66] flex-shrink-0 group-hover:scale-105 group-hover:bg-[#00ff66]/25 transition-all">
                  <WhatsAppIcon size={20} />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-white font-bold text-sm sm:text-base md:text-lg leading-tight tracking-tight">
                      Join WhatsApp Collective
                    </span>
                    <span className="w-2 h-2 rounded-full bg-[#00ff66] animate-pulse" />
                  </div>
                  <p className="text-white/45 text-[11px] sm:text-xs mt-0.5 font-light">
                    The Inner Circle · Group Rides & Builds
                  </p>
                </div>
              </div>

              <div className="text-white/30 group-hover:text-[#00ff66] group-hover:translate-x-1.5 transition-all duration-300 pr-1 flex-shrink-0">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M5 12h14M12 5l7 7-7 7"/>
                </svg>
              </div>
            </a>
          </div>

          {/* Moto-Themed Tachometer Scroll Cue */}
          <div className="hidden sm:flex items-center gap-4 select-none pointer-events-none">
            <div className="flex flex-col items-end">
              <span className="text-[10px] font-mono tracking-[0.25em] text-[#00ff66] uppercase font-bold">
                REV // SCROLL
              </span>
              <span className="text-[9px] font-mono text-white/30 tracking-widest uppercase">
                TACH 01 · 948cc
              </span>
            </div>

            <div className="relative w-5 h-12 flex flex-col items-center justify-start py-1">
              {/* Tick marks */}
              <div className="absolute inset-y-1 left-0 flex flex-col justify-between opacity-30 text-[6px] font-mono text-white">
                <span>-</span>
                <span>-</span>
                <span>-</span>
                <span>-</span>
              </div>
              <motion.div
                className="w-1 rounded-full bg-gradient-to-b from-white/10 via-[#00ff66]/60 to-[#00ff66]"
                animate={{ height: ['15%', '85%', '15%'] }}
                transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}
