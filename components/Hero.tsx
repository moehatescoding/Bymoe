'use client';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Image from 'next/image';

// Kawasaki green — the soul of the bike
const KAWI_GREEN = '#39FF14';

const EASE_EXPO: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  });

  // Parallax: bg moves slower than scroll → depth illusion
  const bgY      = useTransform(scrollYProgress, [0, 1], ['0%', '25%']);
  const bgScale  = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const textY    = useTransform(scrollYProgress, [0, 1], [0, 80]);
  const fadeOut  = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <section
      ref={containerRef}
      className="relative w-full h-screen overflow-hidden bg-brand-black flex items-end justify-start"
      style={{ '--kawi': KAWI_GREEN } as React.CSSProperties}
    >
      {/* ── Background image with parallax ── */}
      <motion.div
        className="absolute inset-0 origin-center will-change-transform"
        style={{ y: bgY, scale: bgScale }}
      >
        {/* The bike photo */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: 'url("/kawasaki-hero.jpg")' }}
        />

        {/* Dark vignette so text pops */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#050508] via-[#050508]/60 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#050508]/80 via-transparent to-transparent" />

        {/* Subtle green chromatic rim — left edge glow matching the bike paint */}
        <div
          className="absolute inset-y-0 left-0 w-px"
          style={{ boxShadow: `0 0 80px 40px ${KAWI_GREEN}22` }}
        />
      </motion.div>

      {/* ── Scanline noise overlay (editorial feel) ── */}
      <div
        className="absolute inset-0 z-10 pointer-events-none"
        style={{
          backgroundImage:
            'repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.04) 2px, rgba(0,0,0,0.04) 4px)',
          mixBlendMode: 'multiply',
        }}
      />

      {/* ── Main copy — bottom-left editorial layout ── */}
      <motion.div
        className="relative z-20 px-8 md:px-16 pb-16 md:pb-20 max-w-3xl"
        style={{ y: textY, opacity: fadeOut }}
      >
        {/* bymoe Brand Logo */}
        <motion.div
          initial={{ opacity: 0, y: -15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: EASE_EXPO, delay: 0.2 }}
          className="relative w-36 h-12 sm:w-44 sm:h-14 mb-4 overflow-hidden"
        >
          <Image
            src="/logo.svg"
            alt="bymoe"
            fill
            sizes="176px"
            className="object-contain object-left"
            priority
          />
        </motion.div>

        {/* Eyebrow tag */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: EASE_EXPO, delay: 0.3 }}
          className="flex items-center gap-3 mb-5"
        >
          {/* Green accent line */}
          <span
            className="block h-[2px] w-10 rounded-full"
            style={{ background: KAWI_GREEN }}
          />
          <span
            className="text-[11px] font-semibold tracking-[0.3em] uppercase"
            style={{ color: KAWI_GREEN }}
          >
            Kawasaki Ninja · ZX Series
          </span>
        </motion.div>

        {/* Main headline */}
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: '110%' }}
            animate={{ y: 0 }}
            transition={{ duration: 1.1, ease: EASE_EXPO, delay: 0.5 }}
            className="font-bold leading-[0.88] tracking-[-0.04em] text-brand-white"
            style={{ fontSize: 'clamp(4rem, 12vw, 10rem)' }}
          >
            BUILT TO
          </motion.h1>
        </div>
        <div className="overflow-hidden">
          <motion.h1
            initial={{ y: '110%' }}
            animate={{ y: 0 }}
            transition={{ duration: 1.1, ease: EASE_EXPO, delay: 0.65 }}
            className="font-bold leading-[0.88] tracking-[-0.04em] italic"
            style={{
              fontSize: 'clamp(4rem, 12vw, 10rem)',
              color: KAWI_GREEN,
              WebkitTextStroke: `1px ${KAWI_GREEN}`,
            }}
          >
            DOMINATE.
          </motion.h1>
        </div>

        {/* Sub-copy */}
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE_EXPO, delay: 1.1 }}
          className="mt-6 text-base md:text-lg text-brand-white/60 font-light leading-relaxed max-w-md"
        >
          Precision engineering. Predator aesthetics. Every curve designed to
          cut wind and command the road.
        </motion.p>

        {/* CTA row */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: EASE_EXPO, delay: 1.4 }}
          className="flex items-center gap-6 mt-8"
        >
          {/* Primary button */}
          <a
            href="/products"
            className="group relative inline-flex items-center gap-3 px-7 py-3.5 rounded-full text-sm font-semibold tracking-wide text-brand-black overflow-hidden transition-transform duration-300 ease-out hover:scale-[1.04] active:scale-[0.97]"
            style={{ background: KAWI_GREEN }}
          >
            <span>Explore Products</span>
            <svg
              className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2.5}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>

          {/* Ghost link */}
          <a
            href="/work"
            className="hover-reveal text-sm font-medium tracking-wide text-brand-white/50 hover:text-brand-white transition-colors duration-300"
          >
            My Work
          </a>
        </motion.div>
      </motion.div>

      {/* ── Scroll indicator — right side vertical ── */}
      <motion.div
        className="absolute right-8 bottom-12 z-30 flex flex-col items-center gap-3"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 2 }}
        style={{ opacity: fadeOut }}
      >
        <div
          className="text-[9px] font-semibold tracking-[0.35em] uppercase"
          style={{
            color: KAWI_GREEN,
            writingMode: 'vertical-rl',
            transform: 'rotate(180deg)',
          }}
        >
          Scroll
        </div>
        {/* Animated ticker line */}
        <div className="w-[1px] h-14 relative overflow-hidden" style={{ background: 'rgba(255,255,255,0.12)' }}>
          <motion.div
            className="absolute top-0 left-0 w-full"
            style={{ height: '40%', background: KAWI_GREEN }}
            animate={{ y: ['-100%', '300%'] }}
            transition={{ duration: 1.4, ease: 'linear', repeat: Infinity }}
          />
        </div>
      </motion.div>

      {/* ── Spec badges — top-right corner ── */}
      <motion.div
        className="absolute top-24 right-8 md:right-14 z-20 flex flex-col items-end gap-4"
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 1, ease: EASE_EXPO, delay: 1.6 }}
        style={{ opacity: fadeOut }}
      >
        {[
          { label: 'ENGINE', value: '636 cc' },
          { label: 'POWER',  value: '126 HP' },
          { label: 'WEIGHT', value: '194 kg' },
        ].map(({ label, value }) => (
          <div key={label} className="text-right">
            <div className="text-[9px] font-semibold tracking-[0.25em] uppercase text-brand-muted">
              {label}
            </div>
            <div className="text-lg font-bold tracking-tight text-brand-white/90">
              {value}
            </div>
          </div>
        ))}
      </motion.div>
    </section>
  );
}
