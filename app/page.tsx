'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import Hero from '@/components/Hero';
import { REELS_CONTENT } from '@/data/reels';
import { PRODUCTS } from '@/data/products';
import { BLOG_POSTS } from '@/data/blog';
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
// Inline Custom Reel Card (Moto-Vlog Film Frame)
// ─────────────────────────────────────────
function HomeReelCard({ reel, index }: { reel: typeof REELS_CONTENT[0]; index: number }) {
  const [imgError, setImgError] = useState(false);

  return (
    <motion.a
      href={reel.instagramUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex-shrink-0 w-[210px] sm:w-[240px] aspect-[9/16] bg-[#111116] rounded-2xl overflow-hidden border border-white/10 hover:border-[#00ff66]/50 cursor-pointer shadow-2xl transition-all duration-300 select-none"
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      whileTap={{ scale: 0.97 }}
      data-cursor="PLAY"
    >
      {/* Cover image */}
      {reel.coverUrl && !imgError ? (
        <div className="absolute inset-0 w-full h-full">
          <Image
            src={reel.coverUrl}
            alt={`${reel.category} reel`}
            fill
            className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 editorial-grade transition-all duration-700"
            onError={() => setImgError(true)}
            sizes="240px"
          />
        </div>
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-[#181822] to-[#08080a]" />
      )}

      {/* Dark cinematic vignette */}
      <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-[#08080a]/30 to-[#08080a]/60 z-[1]" />

      {/* Top telemetry bar */}
      <div className="absolute top-3 left-3 right-3 flex items-center justify-between z-10 text-[9px] font-mono">
        <div className="flex items-center gap-1.5 bg-black/75 backdrop-blur-md px-2 py-0.5 rounded border border-white/10 text-white/80">
          <span className="w-1.5 h-1.5 rounded-full bg-[#ef4444] animate-pulse" />
          <span>REC 00:{20 + index * 4}</span>
        </div>
        <span className="hud-tag text-[8px] py-0.5 px-1.5">
          {reel.category}
        </span>
      </div>

      {/* Center Play Button trigger on hover */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="w-12 h-12 rounded-full bg-black/65 backdrop-blur-md border border-white/20 flex items-center justify-center text-white group-hover:bg-[#00ff66] group-hover:text-black group-hover:scale-110 group-hover:border-[#00ff66] transition-all duration-300 shadow-xl">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" className="ml-0.5">
            <path d="M8 5v14l11-7z"/>
          </svg>
        </div>
      </div>

      {/* Bottom info */}
      <div className="absolute bottom-3 left-3 right-3 z-10 flex items-center justify-between text-[10px] font-mono text-white/60">
        <span>60 FPS // UHD</span>
        <span className="text-[#00ff66] group-hover:translate-x-1 transition-transform">Watch →</span>
      </div>
    </motion.a>
  );
}

export default function Home() {
  const featuredProduct = PRODUCTS.find((p) => p.id === 'diy-hydro-dip') || PRODUCTS[0];

  return (
    <main className="min-h-screen bg-[#08080a] text-[#f3f2ee] overflow-x-hidden">

      {/* ═══════════════════════════════════════════
          CINEMATIC KAWASAKI HERO
      ═══════════════════════════════════════════ */}
      <Hero />

      {/* ═══════════════════════════════════════════
          RIDER DOSSIER — "WHO'S MOE?"
      ═══════════════════════════════════════════ */}
      <section className="px-6 sm:px-10 md:px-16 py-24 sm:py-32 max-w-7xl mx-auto w-full border-b border-white/[0.06]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Dossier Photography & Telemetry */}
          <motion.div 
            className="lg:col-span-5 relative"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden border border-white/15 bg-[#111116] shadow-2xl">
              <Image
                src="/kawasaki-hero.jpg"
                alt="Moe with Kawasaki Z900"
                fill
                className="object-cover object-center editorial-grade hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#08080a] via-transparent to-transparent opacity-80" />
              
              {/* Telemetry Stamps */}
              <div className="absolute top-4 left-4 flex flex-col gap-1.5">
                <span className="hud-tag text-[9px]">
                  RIDER SPEC: MOE
                </span>
                <span className="text-[9px] font-mono text-white/50 tracking-widest uppercase bg-black/60 backdrop-blur-md px-2 py-0.5 rounded border border-white/10">
                  BASE: BENGALURU, INDIA
                </span>
              </div>

              {/* Machine Hardware Pill */}
              <div className="absolute bottom-4 left-4 right-4 bg-black/80 backdrop-blur-xl p-4 rounded-2xl border border-white/10">
                <div className="flex items-center justify-between text-[10px] font-mono text-white/50 mb-1">
                  <span>PRIMARY RIG</span>
                  <span className="text-[#00ff66]">ACTIVE</span>
                </div>
                <p className="text-sm font-bold text-white tracking-wide">
                  Kawasaki Z900 · Yoshimura Alpha-T
                </p>
                <div className="flex items-center gap-3 mt-2 text-[10px] font-mono text-white/60">
                  <span>948cc Inline-4</span>
                  <span>·</span>
                  <span>125 HP</span>
                  <span>·</span>
                  <span>Full Titanium</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Pull-Quote & Manifesto */}
          <motion.div 
            className="lg:col-span-7 flex flex-col justify-center"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            <div className="flex items-center gap-2 mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00ff66]" />
              <span className="text-xs font-mono tracking-[0.25em] text-[#00ff66] uppercase font-bold">
                WHO IS MOE?
              </span>
            </div>

            {/* Oversized Pull-Quote */}
            <blockquote className="text-editorial-lead text-4xl sm:text-5xl md:text-6xl text-white font-bold leading-[0.95] tracking-tight mb-8">
              "I make things, break things, ride fast, and occasionally figure them out."
            </blockquote>

            <div className="space-y-4 text-base sm:text-lg text-white/60 font-light leading-relaxed mb-8 max-w-2xl">
              <p>
                No corporate playbook. No sterile aesthetic. From tore-down motorcycle engines and bespoke carbon hydro-dipping to software systems and cinematic content — this is the workshop where ideas meet asphalt.
              </p>
              <p className="text-sm sm:text-base text-white/45">
                Every modification, product recommendation, and ride note on this site is tested with zero compromise under real throttle and real rain.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/[0.08]">
              <Link
                href="/about"
                className="inline-flex items-center gap-3 px-6 py-3 rounded-xl bg-white text-black text-xs font-bold tracking-[0.18em] uppercase hover:bg-[#00ff66] hover:text-black transition-all cursor-pointer font-sans"
                data-cursor="ABOUT"
              >
                <span>Read Full Story</span>
                <span>→</span>
              </Link>
              <Link
                href="/work"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/[0.05] border border-white/10 text-white/70 hover:text-white hover:bg-white/[0.08] text-xs font-bold tracking-[0.18em] uppercase transition-all cursor-pointer font-sans"
                data-cursor="COLLAB"
              >
                <span>Collaborations</span>
                <span>↗</span>
              </Link>
            </div>
          </motion.div>

        </div>
      </section>

      {/* ═══════════════════════════════════════════
          FEATURED GEAR SHOWCASE — EDITORIAL BREAKDOWN
      ═══════════════════════════════════════════ */}
      <section className="px-6 sm:px-10 md:px-16 py-24 sm:py-32 max-w-7xl mx-auto w-full border-b border-white/[0.06]">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00ff66]" />
              <span className="text-xs font-mono tracking-[0.25em] text-[#00ff66] uppercase font-bold">
                WORKSHOP // VERIFIED RIG
              </span>
            </div>
            <h2 className="text-editorial-lead text-4xl sm:text-6xl font-extrabold text-white">
              Featured Gear & Builds
            </h2>
          </div>
          <Link
            href="/products"
            className="text-xs font-mono tracking-widest uppercase text-white/50 hover:text-[#00ff66] transition-colors inline-flex items-center gap-2"
          >
            <span>View All Tested Hardware</span>
            <span>→</span>
          </Link>
        </div>

        {/* Lead Editorial Hero: DIY Hydro Dip Kit */}
        {featuredProduct && (
          <Link
            href="/products"
            className="group block relative w-full rounded-3xl overflow-hidden border border-white/15 bg-gradient-to-b from-[#151520] to-[#09090e] p-6 sm:p-10 mb-12 shadow-2xl transition-all duration-300 hover:border-[#00ff66]/50"
            data-cursor="INSPECT"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-7 flex flex-col justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <span className="hud-tag text-[9px]">
                      [GEAR // 01] · FEATURED RIG
                    </span>
                    <span className="text-xs font-mono text-white/40 uppercase tracking-widest">
                      CUSTOM COMPOSITE
                    </span>
                  </div>

                  <h3 className="text-editorial-lead text-3xl sm:text-5xl font-extrabold text-white mb-3 group-hover:text-[#00ff66] transition-colors">
                    {featuredProduct.name}
                  </h3>

                  <p className="text-base sm:text-lg text-white/80 font-normal mb-4">
                    "{featuredProduct.tagline}"
                  </p>

                  <p className="text-xs sm:text-sm text-white/50 font-light leading-relaxed mb-6 max-w-xl">
                    {featuredProduct.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                    {featuredProduct.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-xs font-mono text-white/70">
                        <span className="text-[#00ff66]">/</span>
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="inline-flex items-center gap-2 text-xs font-bold tracking-[0.2em] uppercase text-[#00ff66] group-hover:translate-x-1.5 transition-transform font-sans">
                  <span>Explore Kit Specs & Verified Purchase</span>
                  <span>→</span>
                </div>
              </div>

              {/* Product Image Frame with Duotone Tone */}
              <div className="lg:col-span-5 relative aspect-square sm:aspect-[4/3] rounded-2xl overflow-hidden border border-white/10 bg-[#0c0c12] p-6 flex items-center justify-center">
                <div className="relative w-full h-full">
                  <Image
                    src={featuredProduct.image}
                    alt={featuredProduct.name}
                    fill
                    className="object-contain p-2 editorial-grade group-hover:scale-105 transition-transform duration-700"
                  />
                </div>
                <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-md px-3 py-1 rounded text-[10px] font-mono text-[#00ff66] border border-white/10">
                  CF074B // VERIFIED KIT
                </div>
              </div>
            </div>
          </Link>
        )}

        {/* 4-Item Magazine Gear Strip */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PRODUCTS.slice(0, 4).map((prod, idx) => (
            <Link
              key={prod.id}
              href="/products"
              className="group flex flex-col justify-between p-5 rounded-2xl bg-[#111116] border border-white/10 hover:border-[#00ff66]/40 transition-all duration-300 shadow-xl cursor-pointer"
              data-cursor="INSPECT"
            >
              <div>
                <div className="relative w-full aspect-[4/3] rounded-xl bg-[#09090d] border border-white/[0.06] overflow-hidden mb-4 flex items-center justify-center p-3">
                  <Image
                    src={prod.image}
                    alt={prod.name}
                    fill
                    className="object-contain p-2 editorial-grade group-hover:scale-105 transition-transform duration-500"
                  />
                  <span className="absolute top-2 left-2 text-[8px] font-mono text-white/40 bg-black/60 px-1.5 py-0.5 rounded">
                    [0{idx + 2}]
                  </span>
                </div>

                <div className="text-[10px] font-mono text-[#00ff66] tracking-wider uppercase mb-1">
                  {prod.category}
                </div>
                <h4 className="text-base font-bold text-white group-hover:text-[#00ff66] transition-colors leading-snug line-clamp-1 mb-2">
                  {prod.name}
                </h4>
                <p className="text-xs text-white/50 font-light line-clamp-2 mb-4">
                  {prod.description}
                </p>
              </div>

              <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between text-[10px] font-mono text-white/40 group-hover:text-white transition-colors">
                <span>{prod.sourceLabel || 'Recommended'}</span>
                <span className="text-[#00ff66] group-hover:translate-x-1 transition-transform">→</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          CUSTOM REELS GRID — RAW NIGHT RUNS
      ═══════════════════════════════════════════ */}
      <section className="py-24 sm:py-32 border-b border-white/[0.06] overflow-hidden">
        <div className="px-6 sm:px-10 md:px-16 mb-8 flex flex-col sm:flex-row sm:items-end justify-between max-w-7xl mx-auto w-full gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00ff66]" />
              <span className="text-xs font-mono tracking-[0.25em] text-[#00ff66] uppercase font-bold">
                KINETIC DISPATCHES
              </span>
            </div>
            <h2 className="text-editorial-lead text-4xl sm:text-6xl font-extrabold text-white">
              Raw Reels & Motion
            </h2>
          </div>
          <Link
            href="/content"
            className="text-xs font-mono tracking-widest uppercase text-white/50 hover:text-[#00ff66] transition-colors inline-flex items-center gap-2"
          >
            <span>Browse Full Video Archive</span>
            <span>→</span>
          </Link>
        </div>

        {/* Horizontal Film-Scrub Track */}
        <div className="flex gap-5 overflow-x-auto scrollbar-none px-6 sm:px-10 md:px-16 pb-4">
          {REELS_CONTENT.map((reel, i) => (
            <HomeReelCard key={reel.id} reel={reel} index={i} />
          ))}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          THE LOGBOOK — TECHNICAL FIELD NOTES
      ═══════════════════════════════════════════ */}
      <section className="px-6 sm:px-10 md:px-16 py-24 sm:py-32 max-w-7xl mx-auto w-full border-b border-white/[0.06]">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00ff66]" />
              <span className="text-xs font-mono tracking-[0.25em] text-[#00ff66] uppercase font-bold">
                THE LOGBOOK // DISPATCHES
              </span>
            </div>
            <h2 className="text-editorial-lead text-4xl sm:text-6xl font-extrabold text-white">
              Field Notes & Deep-Dives
            </h2>
          </div>
          <Link
            href="/blog"
            className="text-xs font-mono tracking-widest uppercase text-white/50 hover:text-[#00ff66] transition-colors inline-flex items-center gap-2"
          >
            <span>All Articles ({BLOG_POSTS.length})</span>
            <span>→</span>
          </Link>
        </div>

        {/* 3-Column Editorial Split with Differentiated Taxonomy */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {BLOG_POSTS.slice(0, 3).map((post, i) => {
            const isTechnical = post.category.toLowerCase().includes('gear') || post.category.toLowerCase().includes('maintenance');

            return (
              <Link
                key={post.id}
                href={`/blog/${post.slug}`}
                className="group flex flex-col rounded-3xl overflow-hidden border border-white/10 bg-[#111116] hover:border-[#00ff66]/50 transition-all duration-300 shadow-2xl cursor-pointer"
                data-cursor="READ"
              >
                {/* Article Cover */}
                <div className="relative w-full aspect-[16/10] bg-[#09090d] overflow-hidden">
                  <Image
                    src={post.coverImage}
                    alt={post.title}
                    fill
                    className="object-cover object-center editorial-grade group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#111116] via-transparent to-transparent" />
                  
                  {/* Taxonomy Badge */}
                  <div className="absolute top-3.5 left-3.5">
                    {isTechnical ? (
                      <span className="hud-tag text-[9px]">
                        TECH DEEP-DIVE · {post.category}
                      </span>
                    ) : (
                      <span className="hud-tag-amber text-[9px]">
                        RIDE STORY · {post.category}
                      </span>
                    )}
                  </div>
                </div>

                {/* Article Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="text-[10px] font-mono text-white/40 mb-3 flex items-center gap-2">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>

                    <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-[#00ff66] transition-colors leading-snug line-clamp-2 mb-3">
                      {post.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-white/50 font-light line-clamp-2 leading-relaxed">
                      {post.excerpt}
                    </p>
                  </div>

                  <div className="pt-5 mt-5 border-t border-white/[0.08] flex items-center justify-between text-[11px] font-mono uppercase tracking-widest text-white/60 group-hover:text-white">
                    <span>Read Field Note</span>
                    <span className="text-[#00ff66] group-hover:translate-x-1.5 transition-transform">→</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      {/* ═══════════════════════════════════════════
          PIT-STOP COLLABORATION CTA
      ═══════════════════════════════════════════ */}
      <section className="px-6 sm:px-10 md:px-16 py-24 sm:py-32 max-w-7xl mx-auto w-full">
        <div className="rounded-3xl border border-white/10 bg-gradient-to-b from-[#151520] to-[#0a0a10] p-8 sm:p-14 relative overflow-hidden shadow-2xl">
          {/* Subtle Ambient Glow */}
          <div className="absolute -top-32 -right-32 w-80 h-80 bg-[#00ff66]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="max-w-2xl">
            <div className="flex items-center gap-2 mb-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00ff66] animate-pulse" />
              <span className="text-xs font-mono tracking-[0.25em] text-[#00ff66] uppercase font-bold">
                PARTNERSHIPS // COLLABORATION
              </span>
            </div>

            <h2 className="text-editorial-lead text-4xl sm:text-6xl md:text-7xl font-extrabold text-white mb-4">
              Want to build something together?
            </h2>

            <p className="text-base sm:text-lg text-white/60 font-light leading-relaxed mb-8">
              Working with motorcycle brands, high-performance manufacturers, technology platforms, and creators who want something memorable and kinetic.
            </p>

            <div className="flex flex-wrap gap-4">
              <a
                href="mailto:hello@bymoe.in"
                className="px-8 py-4 rounded-xl bg-white text-black text-xs font-bold tracking-[0.2em] uppercase hover:bg-[#00ff66] hover:text-black transition-all cursor-pointer font-sans"
                data-cursor="EMAIL"
              >
                <span>Initiate Project</span>
                <span className="ml-2">→</span>
              </a>

              <a
                href="https://instagram.com/moegical"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-4 rounded-xl bg-white/[0.05] border border-white/10 text-white hover:bg-white/[0.1] text-xs font-bold tracking-[0.2em] uppercase transition-all cursor-pointer font-sans"
                data-cursor="INSTAGRAM"
              >
                <span>Instagram @moegical</span>
              </a>

              <a
                href="https://www.youtube.com/@Moegical"
                target="_blank"
                rel="noopener noreferrer"
                className="px-6 py-4 rounded-xl bg-[#ef4444]/10 border border-[#ef4444]/30 text-white hover:bg-[#ef4444]/20 text-xs font-bold tracking-[0.2em] uppercase transition-all cursor-pointer font-sans"
                data-cursor="YOUTUBE"
              >
                <span>YouTube @Moegical</span>
              </a>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
}
