'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { getAllPosts, getBlogCategories } from '@/data/blog';

export default function BlogIndexPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const posts = getAllPosts();
  const categories = getBlogCategories();

  const filteredPosts =
    selectedCategory === 'All'
      ? posts
      : posts.filter((p) => p.category === selectedCategory);

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
            DISPATCH // WORKSHOP LOGBOOK & FIELD REPORTS
          </p>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-tight text-white mb-4"
        >
          THE <span className="text-[#00ff66]">LOGBOOK</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-base sm:text-lg text-white/60 max-w-2xl font-light leading-relaxed"
        >
          Teardowns, DIY chemical dipping, long-distance tarmac runs, and raw mechanical lessons — straight from the garage bench to your screen.
        </motion.p>
      </div>

      {/* Category Tabs (Telemetry Style) */}
      {categories.length > 1 && (
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 scrollbar-none border-b border-white/[0.06]">
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
      )}

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
        <AnimatePresence mode="popLayout">
          {filteredPosts.map((post, idx) => {
            const isRideStory = post.category.toLowerCase().includes('ride') || post.category.toLowerCase().includes('travel') || post.category.toLowerCase().includes('story');
            return (
              <motion.article
                key={post.id}
                layout
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                data-cursor="READ"
                className="editorial-grade group flex flex-col rounded-2xl overflow-hidden border border-white/10 bg-brand-surface hover:border-[#00ff66]/40 transition-all duration-300 shadow-xl"
              >
                <Link href={`/blog/${post.slug}`} className="block flex flex-col h-full cursor-pointer">
                  {/* Cover Image */}
                  <div className="relative w-full aspect-[16/10] bg-black/40 overflow-hidden">
                    <Image
                      src={post.coverImage}
                      alt={post.title}
                      fill
                      className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-brand-surface via-transparent to-transparent" />
                    
                    {/* Category Pill */}
                    <div className="absolute top-3.5 left-3.5">
                      <span className={isRideStory ? 'hud-tag-amber' : 'hud-tag'}>
                        {post.category}
                      </span>
                    </div>

                    {post.isSample && (
                      <div className="absolute top-3.5 right-3.5 bg-black/80 backdrop-blur-md text-[9px] font-mono tracking-wider uppercase text-white/50 px-2.5 py-1 rounded-md border border-white/10">
                        SAMPLE
                      </div>
                    )}
                  </div>

                  {/* Post Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between">
                    <div>
                      {/* Meta info */}
                      <div className="flex items-center gap-2 text-[11px] font-mono text-white/40 mb-3">
                        <span>{post.date}</span>
                        <span>//</span>
                        <span className="text-[#00ff66]/80">{post.readTime}</span>
                      </div>

                      <h2 className="font-display text-2xl sm:text-3xl font-black uppercase text-white tracking-tight leading-tight mb-3 group-hover:text-[#00ff66] transition-colors">
                        {post.title}
                      </h2>

                      <p className="text-xs sm:text-sm text-white/50 font-light leading-relaxed line-clamp-3 mb-6">
                        {post.excerpt}
                      </p>
                    </div>

                    {/* Read article link */}
                    <div className="pt-4 border-t border-white/[0.08] flex items-center justify-between font-mono text-xs uppercase tracking-widest text-white/60 group-hover:text-white">
                      <span>OPEN FILE</span>
                      <span className="transform group-hover:translate-x-1.5 transition-transform text-[#00ff66] font-bold">
                        →
                      </span>
                    </div>
                  </div>
                </Link>
              </motion.article>
            );
          })}
        </AnimatePresence>
      </div>

    </main>
  );
}
