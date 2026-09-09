'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { PRODUCTS } from '@/data/products';

export default function ProductsPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');

  const categories = ['All', ...Array.from(new Set(PRODUCTS.map((p) => p.category)))];

  const filteredProducts =
    selectedCategory === 'All'
      ? PRODUCTS
      : PRODUCTS.filter((p) => p.category === selectedCategory);

  const featuredProduct = PRODUCTS.find((p) => p.id === 'diy-hydro-dip') || PRODUCTS[0];

  return (
    <main className="min-h-screen bg-brand-black pb-32 pt-28 px-5 sm:px-8 md:px-12 max-w-7xl mx-auto overflow-x-hidden">
      
      {/* Header */}
      <div className="mb-14 text-left border-b border-white/[0.08] pb-10">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2 mb-3"
        >
          <span className="w-2 h-2 rounded-full bg-[#00ff66] animate-pulse" />
          <p className="hud-tag">
            TELEMETRY // VERIFIED HARDWARE & PIT GEAR
          </p>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="font-display text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-tight text-white mb-4"
        >
          TESTED <span className="text-[#00ff66]">GEAR</span> & BUILDS
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-base sm:text-lg text-white/60 max-w-2xl font-light leading-relaxed"
        >
          No sponsor fluff. The exact chemical treatments, carbon films, performance exhausts, and protection sliders bolted to the Z900 and tested on Indian tarmac.
        </motion.p>
      </div>

      {/* ── FEATURED RECOMMENDATION HERO: DIY HYDRO DIP ── */}
      {featuredProduct && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          data-cursor="INSPECT"
          className="relative mb-16 rounded-3xl overflow-hidden border border-white/15 bg-gradient-to-b from-[#151520] to-[#08080c] p-6 sm:p-10 shadow-2xl group"
        >
          {/* Subtle Glow */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#00ff66]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Info */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="hud-tag">
                  {featuredProduct.badge || 'FEATURED RECOMMENDATION'}
                </span>
                <span className="text-[11px] font-mono tracking-widest text-white/40 uppercase">
                  CAT // {featuredProduct.category}
                </span>
              </div>

              <h2 className="font-display text-3xl sm:text-5xl md:text-6xl font-black uppercase text-white tracking-tight leading-none mb-3">
                {featuredProduct.name}
              </h2>

              <p className="text-base sm:text-lg text-white/80 font-medium mb-3">
                {featuredProduct.tagline}
              </p>

              <p className="text-xs sm:text-sm text-white/50 font-light leading-relaxed mb-6">
                {featuredProduct.description}
              </p>

              {/* Feature bullets */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8 p-4 rounded-xl bg-black/40 border border-white/[0.06]">
                {featuredProduct.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs text-white/70">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#00ff66] flex-shrink-0" />
                    <span className="font-mono text-[11px]">{feat}</span>
                  </div>
                ))}
              </div>

              {/* Buy Link CTA */}
              <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/10">
                <a
                  href={featuredProduct.externalUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="BUY"
                  className="flex items-center gap-3 px-8 py-4 rounded-xl font-display font-black text-sm uppercase tracking-wider bg-[#00ff66] text-black hover:bg-[#22c55e] hover:scale-[1.02] active:scale-95 transition-all duration-300 shadow-lg shadow-[#00ff66]/20 cursor-pointer"
                >
                  <span>{featuredProduct.sourceLabel ? `GET VIA ${featuredProduct.sourceLabel.toUpperCase()}` : 'SOURCE VERIFIED LINK'}</span>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    <polyline points="15 3 21 3 21 9" />
                    <line x1="10" y1="14" x2="21" y2="3" />
                  </svg>
                </a>
                <span className="text-[11px] font-mono text-white/40 tracking-wider">
                  VERIFIED DIRECT OUTLET
                </span>
              </div>
            </div>

            {/* Right Image Container */}
            <div className="lg:col-span-5 relative aspect-square rounded-2xl overflow-hidden border border-white/15 bg-gradient-to-b from-[#1c1c28] to-[#0c0c12] p-4 flex items-center justify-center shadow-inner group">
              <div className="relative w-full h-full">
                <Image
                  src={featuredProduct.image}
                  alt={featuredProduct.name}
                  fill
                  className="object-contain p-2 group-hover:scale-105 transition-transform duration-700"
                  priority
                />
              </div>
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-white/80 backdrop-blur-md bg-black/80 px-3 py-2 rounded-xl border border-white/10">
                <span>CF074B Carbon Combo Pack</span>
                <span className="text-[#00ff66] font-bold">HGI Official</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ── Category Filter Tabs (Telemetry Style) ── */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none border-b border-white/[0.06]">
        {categories.map((cat) => {
          const isSelected = selectedCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer whitespace-nowrap ${
                isSelected
                  ? 'bg-[#00ff66] text-black font-bold shadow-lg shadow-[#00ff66]/20'
                  : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/5'
              }`}
            >
              {`[${cat.toUpperCase()}]`}
            </button>
          );
        })}
      </div>

      {/* ── Products Recommendation Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredProducts.map((product, idx) => (
            <motion.div
              key={product.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              data-cursor="INSPECT"
              className="editorial-grade group flex flex-col rounded-2xl overflow-hidden border border-white/10 bg-brand-surface hover:border-[#00ff66]/40 transition-all duration-300 shadow-xl"
            >
              {/* Product Image Box */}
              <div className="relative w-full aspect-[4/3] bg-gradient-to-b from-[#161622] to-[#0b0b10] border-b border-white/[0.06] overflow-hidden flex items-center justify-center p-4">
                <div className="relative w-full h-full">
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-contain p-3 group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                
                {product.badge && (
                  <div className="absolute top-3 left-3">
                    <span className="hud-tag text-[9px]">
                      {product.badge}
                    </span>
                  </div>
                )}
                
                <div className="absolute top-3 right-3 text-[10px] font-mono text-white/70 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-md border border-white/10 uppercase tracking-wider">
                  {product.category}
                </div>
              </div>

              {/* Product Details */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="font-display text-2xl font-black uppercase text-white mb-2 group-hover:text-[#00ff66] transition-colors leading-tight">
                    {product.name}
                  </h3>
                  <p className="text-xs text-white/50 line-clamp-2 font-light mb-4 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Bullet points */}
                  <ul className="flex flex-col gap-1.5 mb-6 border-l-2 border-[#00ff66]/30 pl-3">
                    {product.features.slice(0, 3).map((f, i) => (
                      <li key={i} className="text-[11px] font-mono text-white/70 truncate">
                        › {f}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer Link Button */}
                <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between gap-3">
                  <span className="text-[10px] text-white/40 uppercase tracking-wider font-mono">
                    {product.sourceLabel || 'Verified Link'}
                  </span>

                  <a
                    href={product.externalUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="BUY"
                    className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-[#00ff66] text-white hover:text-black font-display text-xs font-black tracking-wider uppercase transition-all duration-200 cursor-pointer"
                  >
                    <span>BUY LINK</span>
                    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                      <polyline points="15 3 21 3 21 9" />
                      <line x1="10" y1="14" x2="21" y2="3" />
                    </svg>
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

    </main>
  );
}
