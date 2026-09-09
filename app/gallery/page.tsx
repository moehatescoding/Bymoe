'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  image: string;
  aspect: string;
}

const GALLERY_ITEMS: GalleryItem[] = [
  {
    id: 'g1',
    title: 'Kawasaki Lime Green Cockpit & Tank',
    category: 'Motorcycle',
    image: '/kawasaki-hero.jpg',
    aspect: 'aspect-[4/3]',
  },
  {
    id: 'g2',
    title: 'Z900 Aggressive Low Stance',
    category: 'Motorcycle',
    image: '/z900.png',
    aspect: 'aspect-[16/9]',
  },
  {
    id: 'g3',
    title: 'DIY Hydro Dip Carbon Weave',
    category: 'DIY & Custom',
    image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=1200&auto=format&fit=crop',
    aspect: 'aspect-square',
  },
  {
    id: 'g4',
    title: 'Yoshimura Works Exhaust Detail',
    category: 'Hardware',
    image: 'https://images.unsplash.com/photo-1558981001-5864b3250a69?q=80&w=800&auto=format&fit=crop',
    aspect: 'aspect-[4/5]',
  },
  {
    id: 'g5',
    title: 'Night Ride & Highway Amber',
    category: 'Cinematic',
    image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=800&auto=format&fit=crop',
    aspect: 'aspect-[4/3]',
  },
  {
    id: 'g6',
    title: 'Custom Build Workshop Bench',
    category: 'DIY & Custom',
    image: 'https://images.unsplash.com/photo-1449426468159-d96dbf08f19f?q=80&w=800&auto=format&fit=crop',
    aspect: 'aspect-[16/9]',
  },
];

export default function GalleryPage() {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const categories = ['All', 'Motorcycle', 'DIY & Custom', 'Hardware', 'Cinematic'];

  const filteredItems =
    activeCategory === 'All'
      ? GALLERY_ITEMS
      : GALLERY_ITEMS.filter((item) => item.category === activeCategory);

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
          <span className="w-2 h-2 rounded-full bg-[#00ff66] animate-pulse" />
          <p className="hud-tag">
            DARKROOM // 35MM & CINEMATIC FRAMES
          </p>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-tight text-white mb-4"
        >
          VISUAL <span className="text-[#00ff66]">ARCHIVE</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-lg text-white/60 max-w-xl font-light leading-relaxed"
        >
          Raw garage photography, high-speed shutter captures, mechanical details, and night-ride film stills.
        </motion.p>
      </div>

      {/* Filter Tabs (Telemetry Style) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none border-b border-white/[0.06]">
        {categories.map((cat) => {
          const isSelected = activeCategory === cat;
          return (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
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

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredItems.map((item, idx) => (
            <motion.div
              key={item.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, delay: idx * 0.05 }}
              onClick={() => setSelectedImage(item)}
              data-cursor="ZOOM"
              className="editorial-grade group relative rounded-2xl overflow-hidden bg-brand-surface border border-white/10 cursor-pointer hover:border-[#00ff66]/50 transition-all duration-300 shadow-xl aspect-[4/3]"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent opacity-75 group-hover:opacity-90 transition-opacity duration-300" />

              {/* Top Frame Counter */}
              <div className="absolute top-3.5 left-3.5 right-3.5 flex items-center justify-between font-mono text-[10px] text-white/60">
                <span className="bg-black/80 backdrop-blur-md px-2 py-0.5 rounded border border-white/10">
                  FRAME #{String(idx + 1).padStart(2, '0')}
                </span>
                <span className="hud-tag text-[9px]">
                  {item.category}
                </span>
              </div>

              {/* Bottom Title */}
              <div className="absolute bottom-0 left-0 right-0 p-5 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300">
                <h3 className="font-display text-xl font-bold uppercase text-white leading-tight group-hover:text-[#00ff66] transition-colors">
                  {item.title}
                </h3>
                <p className="font-mono text-[10px] text-white/40 mt-1 uppercase">CLICK TO EXPAND // 35MM STILL</p>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedImage(null)}
            data-cursor="CLOSE"
            className="fixed inset-0 z-[200] bg-black/95 backdrop-blur-2xl p-4 sm:p-10 flex flex-col items-center justify-center cursor-zoom-out"
          >
            <div className="relative max-w-5xl w-full max-h-[80vh] aspect-[16/10] rounded-2xl overflow-hidden border border-white/15 shadow-2xl">
              <Image
                src={selectedImage.image}
                alt={selectedImage.title}
                fill
                className="object-contain"
              />
            </div>
            <div className="mt-6 text-center max-w-xl">
              <span className="hud-tag text-[10px] mb-2 inline-block">
                {selectedImage.category}
              </span>
              <p className="font-display text-2xl font-black uppercase text-white tracking-wider">{selectedImage.title}</p>
              <p className="text-white/40 font-mono text-xs mt-2 uppercase tracking-widest">TAP ANYWHERE TO CLOSE FRAME</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}
