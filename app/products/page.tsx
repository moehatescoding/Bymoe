'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { PRODUCTS, Product } from '@/data/products';

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
      <div className="mb-10 text-left">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex items-center gap-2 mb-3"
        >
          <span className="w-2 h-2 rounded-full bg-[#39FF14] animate-pulse" />
          <p className="text-[10px] sm:text-xs font-semibold tracking-[0.3em] text-[#39FF14] uppercase">
            Curated Gear & DIY Kits
          </p>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          className="text-4xl sm:text-6xl font-bold tracking-tight text-white mb-3"
        >
          Products & Builds
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="text-sm sm:text-base text-white/50 max-w-2xl font-light leading-relaxed"
        >
          Custom DIY hydro dip materials, tested performance parts, and verified hardware links tested by Moe.
        </motion.p>
      </div>

      {/* ── FEATURED PRODUCT HERO: DIY HYDRO DIP ── */}
      {featuredProduct && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="relative mb-16 rounded-3xl overflow-hidden border border-white/15 bg-gradient-to-b from-[#151520] to-[#0a0a10] p-6 sm:p-10 shadow-2xl"
        >
          {/* Subtle Glow */}
          <div className="absolute -top-24 -right-24 w-96 h-96 bg-[#39FF14]/10 rounded-full blur-3xl pointer-events-none" />

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
            {/* Left Info */}
            <div className="lg:col-span-7 flex flex-col justify-center">
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <span className="px-3 py-1 rounded-full text-[10px] font-bold tracking-widest uppercase bg-[#39FF14]/20 text-[#39FF14] border border-[#39FF14]/30">
                  {featuredProduct.badge || 'HOT PRODUCT'}
                </span>
                <span className="text-xs text-white/40 uppercase tracking-widest">
                  {featuredProduct.category}
                </span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight mb-3">
                {featuredProduct.name}
              </h2>

              <p className="text-base sm:text-lg text-white/80 font-normal mb-4">
                {featuredProduct.tagline}
              </p>

              <p className="text-xs sm:text-sm text-white/50 font-light leading-relaxed mb-6">
                {featuredProduct.description}
              </p>

              {/* Feature bullets */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-8">
                {featuredProduct.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2.5 text-xs text-white/70">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#39FF14]" />
                    <span>{feat}</span>
                  </div>
                ))}
              </div>

              {/* Price & CTA */}
              <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-white/10">
                {featuredProduct.price && (
                  <div className="mr-3">
                    <div className="text-[10px] text-white/40 uppercase tracking-wider">Price</div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-2xl sm:text-3xl font-mono font-bold text-white">
                        {featuredProduct.price}
                      </span>
                      {featuredProduct.originalPrice && (
                        <span className="text-sm line-through text-white/30 font-mono">
                          {featuredProduct.originalPrice}
                        </span>
                      )}
                    </div>
                  </div>
                )}

                <a
                  href={`https://wa.me/?text=${encodeURIComponent(
                    featuredProduct.whatsappMessage || 'Hey Moe, I want to order the DIY Hydro Dip!'
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 px-7 py-3.5 rounded-full font-bold text-xs uppercase tracking-widest bg-[#25D366] text-black hover:bg-[#20bd5a] hover:scale-105 active:scale-95 transition-all duration-300 shadow-lg shadow-[#25D366]/20 cursor-pointer"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                  <span>Order via WhatsApp</span>
                </a>
              </div>
            </div>

            {/* Right Image */}
            <div className="lg:col-span-5 relative aspect-square rounded-2xl overflow-hidden border border-white/10 bg-black/60">
              <Image
                src={featuredProduct.image}
                alt={featuredProduct.name}
                fill
                className="object-cover object-center hover:scale-105 transition-transform duration-700"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/20" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-[11px] text-white/80 backdrop-blur-md bg-black/50 p-2.5 rounded-xl border border-white/10">
                <span>DIY Hydro Dip Finish</span>
                <span className="text-[#39FF14] font-semibold">100% Quality Kit</span>
              </div>
            </div>
          </div>
        </motion.div>
      )}

      {/* ── Category Filter Tabs ── */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold tracking-widest uppercase transition-all duration-200 cursor-pointer ${
              selectedCategory === cat
                ? 'bg-white text-black shadow-md'
                : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white border border-white/5'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* ── Products Grid ── */}
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
              className="group flex flex-col rounded-2xl overflow-hidden border border-white/10 bg-brand-surface hover:border-white/20 transition-all duration-300 shadow-xl"
            >
              {/* Product Image */}
              <div className="relative w-full aspect-[4/3] bg-black/40 overflow-hidden">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-brand-surface via-transparent to-transparent" />
                
                {product.badge && (
                  <div className="absolute top-3 left-3 bg-black/70 backdrop-blur-md text-[9px] font-bold tracking-widest uppercase text-[#39FF14] px-2.5 py-1 rounded-full border border-[#39FF14]/30">
                    {product.badge}
                  </div>
                )}
                
                <div className="absolute top-3 right-3 text-[10px] text-white/60 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 uppercase tracking-wider">
                  {product.category}
                </div>
              </div>

              {/* Product Details */}
              <div className="p-6 flex-1 flex flex-col justify-between">
                <div>
                  <h3 className="text-xl font-bold text-white mb-1.5 group-hover:text-[#39FF14] transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-xs text-white/50 line-clamp-2 font-light mb-4">
                    {product.description}
                  </p>

                  {/* Bullet points */}
                  <ul className="flex flex-col gap-1.5 mb-6">
                    {product.features.slice(0, 3).map((f, i) => (
                      <li key={i} className="text-[11px] text-white/60 flex items-center gap-2">
                        <span className="w-1 h-1 rounded-full bg-white/40" />
                        <span className="truncate">{f}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Footer price & CTA */}
                <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between gap-3">
                  {product.price && (
                    <div>
                      <span className="text-[9px] text-white/30 uppercase tracking-widest block">Price</span>
                      <span className="text-lg font-mono font-bold text-white">{product.price}</span>
                    </div>
                  )}

                  {product.externalUrl && (
                    <a
                      href={product.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white text-white hover:text-black text-xs font-bold tracking-wider uppercase transition-all duration-200 cursor-pointer"
                    >
                      <span>Get Link</span>
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M5 12h14M12 5l7 7-7 7" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

    </main>
  );
}
