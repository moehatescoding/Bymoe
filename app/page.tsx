'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { REELS_CONTENT } from '@/data/reels';
import { accessoriesByBike } from '@/data/accessories';

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

// ─────────────────────────────────────────
// Inline Reel Card (no iframe on homepage preview)
// ─────────────────────────────────────────
function HomeReelCard({ reel, index }: { reel: typeof REELS_CONTENT[0]; index: number }) {
  return (
    <motion.a
      href={reel.instagramUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex-shrink-0 w-[200px] sm:w-[220px] aspect-[9/16] bg-brand-surface rounded-xl overflow-hidden border border-white/10 cursor-pointer"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileTap={{ scale: 0.97 }}
    >
      {/* Dark cinematic bg */}
      <div className="absolute inset-0 bg-gradient-to-br from-zinc-900 to-black" />
      
      {/* Reel icon */}
      <div className="absolute top-3 right-3 z-10">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="white" className="opacity-80">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
        </svg>
      </div>

      {/* Category pill */}
      <div className="absolute bottom-3 left-3 z-10">
        <span className="inline-block px-2 py-1 bg-black/60 backdrop-blur-md text-[9px] tracking-widest uppercase text-white rounded-full border border-white/10">
          {reel.category}
        </span>
      </div>

      {/* Hover overlay */}
      <div className="absolute inset-0 bg-white/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
        <span className="text-[10px] font-bold tracking-widest uppercase text-white">Watch →</span>
      </div>
    </motion.a>
  );
}

export default function Home() {
  const z900Accessories = accessoriesByBike['z900'] || [];

  return (
    <main className="min-h-screen bg-brand-black overflow-x-hidden">

      {/* ═══════════════════════════════════════════
          HERO — MOTORCYCLE ATMOSPHERE
      ═══════════════════════════════════════════ */}
      <section className="relative min-h-screen flex flex-col overflow-hidden">

        {/* Background: cinematic motorcycle image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/z900.png"
            alt="Kawasaki Z900 — bymoe"
            fill
            className="object-cover object-center"
            priority
          />
          {/* Heavy dark vignette so text is readable */}
          <div className="absolute inset-0 bg-gradient-to-b from-brand-black/80 via-brand-black/50 to-brand-black" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-black/70 via-transparent to-brand-black/70" />
        </div>

        {/* Hero Content */}
        <div className="relative z-10 flex flex-col min-h-screen px-5 sm:px-8 md:px-12 pt-28 pb-10">

          {/* Identity */}
          <motion.div
            className="flex flex-col items-start"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            {/* Logo */}
            <div className="relative w-44 h-14 sm:w-56 sm:h-16 mb-4 overflow-hidden">
              <Image
                src="/logo.png"
                alt="bymoe"
                fill
                sizes="(max-width: 640px) 176px, 224px"
                className="object-contain object-left"
                priority
              />
              {/* Black bg knockout — since logo has black bg */}
              <div className="absolute inset-0 mix-blend-multiply bg-brand-black" />
            </div>

            <p className="text-xs sm:text-sm tracking-[0.25em] text-white/50 uppercase font-light mb-1">
              Life, built my way.
            </p>
            <p className="text-[10px] tracking-[0.2em] text-white/30 uppercase">
              Kawasaki Z900 · Creator · Rider · Builder
            </p>
          </motion.div>

          {/* Push to bottom on mobile */}
          <div className="flex-1" />

          {/* ─── WHATSAPP COMMUNITY CTA ─── FIRST PROMINENT BOX */}
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
              className="group flex items-center gap-4 w-full p-5 sm:p-6 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-md hover:bg-[#25D366]/10 hover:border-[#25D366]/40 active:scale-[0.98] transition-all duration-300 cursor-pointer"
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
                href="/garage"
                className="flex-1 flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 active:scale-[0.97] transition-all cursor-pointer text-xs font-bold tracking-widest uppercase text-white/70 hover:text-white"
              >
                The Garage
              </Link>
              <Link
                href="/content"
                className="flex-1 flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 active:scale-[0.97] transition-all cursor-pointer text-xs font-bold tracking-widest uppercase text-white/70 hover:text-white"
              >
                Reels
              </Link>
              <a
                href="https://instagram.com/moegical"
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-white/5 border border-white/10 hover:bg-white/10 active:scale-[0.97] transition-all cursor-pointer text-xs font-bold tracking-widest uppercase text-white/70 hover:text-white"
              >
                Instagram
              </a>
            </div>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          <motion.div
            className="w-px h-10 bg-gradient-to-b from-white/0 to-white/30"
            animate={{ scaleY: [0, 1, 0], transformOrigin: 'top' }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════
          ABOUT
      ═══════════════════════════════════════════ */}
      <section className="px-5 sm:px-8 md:px-12 py-20 sm:py-24 max-w-4xl mx-auto w-full">
        <motion.p
          className="text-[10px] tracking-[0.3em] text-white/30 uppercase mb-4"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          Who's Moe?
        </motion.p>
        <motion.h2
          className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tighter leading-tight text-white mb-6"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          I make things, break things, ride things and occasionally figure them out.
        </motion.h2>
        <motion.p
          className="text-base sm:text-lg text-white/50 font-light leading-relaxed mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          From motorcycles and technology to business, content and whatever catches my attention next — this is where it all comes together.
        </motion.p>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
        >
          <Link
            href="/about"
            className="inline-flex items-center gap-2 text-xs font-bold tracking-widest uppercase text-white/60 hover:text-white transition-colors cursor-pointer group"
          >
            Read the full story
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </motion.div>
      </section>

      {/* ═══════════════════════════════════════════
          Z900 SNAPSHOT
      ═══════════════════════════════════════════ */}
      <section className="px-5 sm:px-8 md:px-12 pb-20 sm:pb-24 max-w-4xl mx-auto w-full">
        <Link href="/garage" className="group block relative w-full aspect-[16/9] sm:aspect-[21/9] rounded-2xl overflow-hidden border border-white/10 cursor-pointer">
          <Image
            src="/z900.png"
            alt="Kawasaki Z900 — The Build"
            fill
            className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 p-5 sm:p-8">
            <p className="text-[9px] tracking-[0.3em] text-white/40 uppercase mb-1">Kawasaki · 2018</p>
            <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tighter text-white">Z900 — The Build</h3>
            <p className="text-xs sm:text-sm text-white/50 mt-1 font-light">11 mods · Full DIY build</p>
          </div>
          <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-md text-[9px] font-bold tracking-widest uppercase text-white/60 px-3 py-1.5 rounded-full border border-white/10 group-hover:text-white transition-colors">
            Open Garage →
          </div>
        </Link>
      </section>

      {/* ═══════════════════════════════════════════
          REELS PREVIEW
      ═══════════════════════════════════════════ */}
      <section className="pb-20 sm:pb-24">
        <div className="px-5 sm:px-8 md:px-12 mb-6 flex items-end justify-between max-w-4xl mx-auto w-full">
          <div>
            <p className="text-[10px] tracking-[0.3em] text-white/30 uppercase mb-1">Latest</p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter text-white">Reels</h2>
          </div>
          <Link
            href="/content"
            className="text-[10px] font-bold tracking-widest uppercase text-white/40 hover:text-white transition-colors cursor-pointer"
          >
            View All →
          </Link>
        </div>

        {/* Horizontal scroll on mobile */}
        <div className="flex gap-4 overflow-x-auto scrollbar-none px-5 sm:px-8 md:px-12 pb-2">
          {REELS_CONTENT.map((reel, i) => (
            <HomeReelCard key={reel.id} reel={reel} index={i} />
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          ACCESSORIES PEEK
      ═══════════════════════════════════════════ */}
      <section className="px-5 sm:px-8 md:px-12 pb-20 sm:pb-24 max-w-4xl mx-auto w-full">
        <div className="mb-6 flex items-end justify-between">
          <div>
            <p className="text-[10px] tracking-[0.3em] text-white/30 uppercase mb-1">Z900 Build</p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tighter text-white">What's on the bike</h2>
          </div>
          <Link
            href="/garage"
            className="text-[10px] font-bold tracking-widest uppercase text-white/40 hover:text-white transition-colors cursor-pointer"
          >
            Full List →
          </Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {z900Accessories.slice(0, 4).map((acc, i) => (
            <motion.a
              key={acc.id}
              href={acc.externalUrl || '#'}
              target={acc.externalUrl ? '_blank' : undefined}
              rel="noopener noreferrer"
              className="group flex items-start gap-4 p-4 rounded-xl bg-brand-surface border border-white/[0.06] hover:border-white/20 active:scale-[0.98] transition-all duration-200 cursor-pointer"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.07 }}
            >
              <div className="flex-shrink-0 w-10 h-10 rounded-lg bg-white/5 flex items-center justify-center border border-white/10">
                <span className="text-[10px] font-bold tracking-wider uppercase text-white/30">{acc.category.slice(0, 3)}</span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-white leading-tight truncate">{acc.name}</p>
                <p className="text-[10px] text-white/40 mt-0.5 uppercase tracking-wider">{acc.brand} · {acc.category}</p>
              </div>
              {acc.externalUrl && (
                <div className="flex-shrink-0 text-white/20 group-hover:text-white/60 group-hover:translate-x-0.5 transition-all text-xs">→</div>
              )}
            </motion.a>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FOOTER CTA
      ═══════════════════════════════════════════ */}
      <section className="px-5 sm:px-8 md:px-12 pb-32 sm:pb-24 max-w-4xl mx-auto w-full">
        <div className="rounded-2xl border border-white/10 bg-brand-surface p-8 sm:p-12 flex flex-col items-center text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tighter text-white mb-3">
            Want to build something together?
          </h2>
          <p className="text-sm text-white/40 mb-8 font-light">Get in touch or follow the chaos.</p>
          <div className="flex flex-col sm:flex-row gap-3 w-full max-w-sm">
            <a
              href="https://instagram.com/moegical"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 flex items-center justify-center py-4 px-6 rounded-xl bg-white/5 border border-white/10 text-xs font-bold tracking-widest uppercase text-white hover:bg-white/10 active:scale-[0.97] transition-all cursor-pointer"
            >
              Instagram →
            </a>
            <a
              href="mailto:hello@bymoe.in"
              className="flex-1 flex items-center justify-center py-4 px-6 rounded-xl bg-white text-black text-xs font-bold tracking-widest uppercase hover:bg-white/90 active:scale-[0.97] transition-all cursor-pointer"
            >
              Email Me →
            </a>
          </div>
        </div>
      </section>

    </main>
  );
}
