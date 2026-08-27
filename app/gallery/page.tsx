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
    title: 'Kawasaki Lime Green Tank & Cockpit',
    category: 'Motorcycle',
    image: '/kawasaki-hero.jpg',
    aspect: 'aspect-[4/3]',
  },
  {
    id: 'g2',
    title: 'Z900 Aggressive Stance',
    category: 'Motorcycle',
    image: '/z900.png',
    aspect: 'aspect-[16/9]',
  },
  {
    id: 'g3',
    title: 'DIY Hydro Dip Carbon Finish',
    category: 'DIY & Custom',
    image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=1200&auto=format&fit=crop',
    aspect: 'aspect-square',
  },
  {
    id: 'g4',
    title: 'Yoshimura Exhaust Detail',
    category: 'Hardware',
    image: 'https://images.unsplash.com/photo-1558981001-5864b3250a69?q=80&w=800&auto=format&fit=crop',
    aspect: 'aspect-[4/5]',
  },
  {
    id: 'g5',
    title: 'Night Ride & City Lights',
    category: 'Cinematic',
    image: 'https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=800&auto=format&fit=crop',
    aspect: 'aspect-[4/3]',
  },
  {
    id: 'g6',
    title: 'Custom Build Workshop',
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
      <div className="mb-10 text-left">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-[10px] sm:text-xs font-semibold tracking-[0.3em] text-[#39FF14] uppercase mb-2"
        >
          Visual Archive
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl font-bold tracking-tight text-white mb-3"
        >
          Gallery & Stills
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-sm sm:text-base text-white/50 max-w-xl font-light"
        >
          Captured on the road, in the garage, and during DIY projects.
        </motion.p>
      </div>

      {/* Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8 scrollbar-none">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-xl text-xs font-bold tracking-widest uppercase transition-all duration-200 cursor-pointer ${
              activeCategory === cat
                ? 'bg-white text-black shadow-md'
                : 'bg-white/5 text-white/50 hover:bg-white/10 hover:text-white border border-white/5'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
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
              className="group relative rounded-2xl overflow-hidden bg-brand-surface border border-white/10 cursor-pointer hover:border-white/30 transition-all duration-300 shadow-xl aspect-[4/3]"
            >
              <Image
                src={item.image}
                alt={item.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-90 transition-opacity duration-300" />

              <div className="absolute bottom-0 left-0 right-0 p-5 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <span className="inline-block px-2.5 py-0.5 rounded-full text-[9px] font-bold tracking-widest uppercase bg-white/10 text-white/80 backdrop-blur-md mb-1.5">
                  {item.category}
                </span>
                <h3 className="text-sm font-semibold text-white leading-tight">
                  {item.title}
                </h3>
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
            className="fixed inset-0 z-[200] bg-black/90 backdrop-blur-xl p-4 sm:p-10 flex flex-col items-center justify-center cursor-zoom-out"
          >
            <div className="relative max-w-5xl w-full max-h-[85vh] aspect-[16/10] rounded-2xl overflow-hidden border border-white/10">
              <Image
                src={selectedImage.image}
                alt={selectedImage.title}
                fill
                className="object-contain"
              />
            </div>
            <div className="mt-4 text-center">
              <p className="text-white font-bold text-base">{selectedImage.title}</p>
              <p className="text-white/40 text-xs mt-1 uppercase tracking-widest">{selectedImage.category}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </main>
  );
}
