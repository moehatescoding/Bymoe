'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { BIKES } from '@/data/bikes';
import { accessoriesByBike } from '@/data/accessories';

export default function GaragePage() {
  const z900 = BIKES.find(b => b.id === 'z900');
  const accessories = accessoriesByBike['z900'] || [];

  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ['start start', 'end start'] });
  const heroY = useTransform(scrollYProgress, [0, 1], ['0%', '30%']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  if (!z900) return null;

  // Group accessories by category
  const categories = Array.from(new Set(accessories.map(a => a.category)));

  return (
    <main className="min-h-screen bg-brand-black pb-32 overflow-x-hidden">

      {/* ─── CINEMATIC HERO ─── */}
      <div ref={heroRef} className="relative w-full h-[80vh] sm:h-screen overflow-hidden">
        <motion.div className="absolute inset-0" style={{ y: heroY }}>
          <Image
            src="https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=2000&auto=format&fit=crop"
            alt="Kawasaki Z900 — The Build"
            fill
            className="object-cover object-center"
            priority
          />
        </motion.div>
        {/* Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/30 to-brand-black/60" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-black/50 via-transparent to-brand-black/50" />

        {/* Hero Text */}
        <motion.div
          className="absolute inset-0 flex flex-col justify-end px-5 sm:px-8 md:px-12 pb-10 sm:pb-16"
          style={{ opacity: heroOpacity }}
        >
          <p className="text-[9px] sm:text-[10px] tracking-[0.3em] text-white/40 uppercase mb-3">
            Kawasaki · 2018 · Hyderabad
          </p>
          <h1 className="text-5xl sm:text-7xl md:text-8xl font-bold tracking-tighter leading-none text-white mb-4">
            Z900
          </h1>
          <p className="text-base sm:text-lg md:text-xl text-white/60 font-light max-w-xl leading-relaxed">
            {z900.story}
          </p>

          {/* Stats row */}
          <div className="flex gap-6 sm:gap-10 mt-8 pt-6 border-t border-white/10">
            <div>
              <span className="block text-[9px] text-white/30 tracking-widest uppercase mb-1">Year</span>
              <span className="text-lg font-mono font-bold text-white">{z900.year}</span>
            </div>
            <div>
              <span className="block text-[9px] text-white/30 tracking-widest uppercase mb-1">Acquired</span>
              <span className="text-lg font-mono font-bold text-white">2026</span>
            </div>
            <div>
              <span className="block text-[9px] text-white/30 tracking-widest uppercase mb-1">Status</span>
              <span className="text-lg font-mono font-bold text-white">{z900.status}</span>
            </div>
            <div>
              <span className="block text-[9px] text-white/30 tracking-widest uppercase mb-1">Mods</span>
              <span className="text-lg font-mono font-bold text-white">{accessories.length}</span>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ─── STORY & SETUP ─── */}
      <section className="px-5 sm:px-8 md:px-12 py-16 sm:py-24 max-w-3xl">
        <p className="text-[10px] tracking-[0.3em] text-white/30 uppercase mb-4">The Setup</p>
        <p className="text-sm sm:text-base text-white/60 font-light leading-relaxed mb-6">
          {z900.setup}
        </p>
        <p className="text-sm sm:text-base text-white/50 font-light leading-relaxed italic">
          {z900.notes}
        </p>
      </section>

      {/* ─── TOP MODS ─── */}
      <section className="px-5 sm:px-8 md:px-12 pb-16 sm:pb-24 max-w-3xl">
        <p className="text-[10px] tracking-[0.3em] text-white/30 uppercase mb-6">Top Modifications</p>
        <ul className="flex flex-col gap-3">
          {z900.modifications.map((mod, i) => (
            <li key={i} className="flex items-center gap-4 py-3.5 border-b border-white/[0.06] last:border-0">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-[9px] font-bold text-white/30">
                {i + 1}
              </span>
              <span className="text-sm sm:text-base font-medium text-white/80">{mod}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* ─── ALL ACCESSORIES ─── */}
      <section className="px-5 sm:px-8 md:px-12 pb-16 sm:pb-24">
        <div className="mb-8">
          <p className="text-[10px] tracking-[0.3em] text-white/30 uppercase mb-2">Full Build List</p>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tighter text-white">
            Everything on the Z900
          </h2>
          <p className="text-sm text-white/40 mt-2 font-light">{accessories.length} accessories · No fakes</p>
        </div>

        {/* By Category */}
        {categories.map((cat) => {
          const items = accessories.filter(a => a.category === cat);
          return (
            <div key={cat} className="mb-10">
              <p className="text-[9px] tracking-[0.3em] text-white/30 uppercase mb-4 px-0">{cat}</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {items.map((acc) => (
                  <a
                    key={acc.id}
                    href={acc.externalUrl || '#'}
                    target={acc.externalUrl ? '_blank' : undefined}
                    rel="noopener noreferrer"
                    className="group flex items-start gap-4 p-4 rounded-xl bg-brand-surface border border-white/[0.06] hover:border-white/20 active:scale-[0.98] transition-all duration-200 cursor-pointer"
                  >
                    {/* Category initial badge */}
                    <div className="flex-shrink-0 w-11 h-11 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center">
                      <span className="text-[9px] font-bold tracking-wider uppercase text-white/30">{acc.brand.slice(0, 3)}</span>
                    </div>

                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-semibold text-white leading-snug">{acc.name}</p>
                      <p className="text-[10px] text-white/40 mt-0.5 uppercase tracking-wider">{acc.brand}</p>
                      <p className="text-xs text-white/40 mt-1.5 leading-relaxed line-clamp-2">{acc.description}</p>
                    </div>

                    {acc.externalUrl && (
                      <div className="flex-shrink-0 mt-1 text-white/20 group-hover:text-white/60 group-hover:translate-x-0.5 transition-all">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M5 12h14M12 5l7 7-7 7"/>
                        </svg>
                      </div>
                    )}
                  </a>
                ))}
              </div>
            </div>
          );
        })}
      </section>

      {/* ─── WHATSAPP COMMUNITY CTA ─── */}
      <section className="px-5 sm:px-8 md:px-12 pb-8">
        <a
          href="https://chat.whatsapp.com/ENrb0phc8sT32tMnwnoqiw?s=cl&p=i&mlu=0"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center gap-4 w-full max-w-2xl p-5 sm:p-6 rounded-2xl border border-white/10 bg-brand-surface hover:bg-[#25D366]/10 hover:border-[#25D366]/40 active:scale-[0.98] transition-all duration-300 cursor-pointer"
        >
          <div className="flex-shrink-0 w-12 h-12 rounded-full bg-[#25D366]/10 border border-[#25D366]/30 flex items-center justify-center group-hover:bg-[#25D366]/20 transition-colors">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" className="text-[#25D366]">
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
            </svg>
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-white font-bold text-base">Ride around Hyderabad?</p>
            <p className="text-white/50 text-sm font-light">You're probably not the only idiot doing it. Join the community.</p>
          </div>
          <div className="flex-shrink-0 text-white/30 group-hover:text-[#25D366] group-hover:translate-x-1 transition-all">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M12 5l7 7-7 7"/>
            </svg>
          </div>
        </a>
      </section>

    </main>
  );
}
