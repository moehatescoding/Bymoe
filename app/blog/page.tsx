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
      <div className="mb-12 text-left">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 mb-3"
        >
          <span className="w-2 h-2 rounded-full bg-[#39FF14] animate-pulse" />
          <p className="text-[10px] sm:text-xs font-semibold tracking-[0.3em] text-[#39FF14] uppercase">
            Field Notes & Logbook
          </p>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl sm:text-6xl font-bold tracking-tight text-white mb-3"
        >
          The Logbook
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="text-sm sm:text-base text-white/50 max-w-2xl font-light leading-relaxed"
        >
          Repairs, builds, rides, and technical experiments — documented straight from the workshop.
        </motion.p>
      </div>

      {/* Category Tabs */}
      {categories.length > 1 && (
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
      )}

      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <AnimatePresence mode="popLayout">
          {filteredPosts.map((post, idx) => (
            <motion.article
              key={post.id}
              layout
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, delay: idx * 0.08 }}
              className="group flex flex-col rounded-2xl overflow-hidden border border-white/10 bg-brand-surface hover:border-white/20 transition-all duration-300 shadow-xl"
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
                  <div className="absolute top-3.5 left-3.5 bg-black/70 backdrop-blur-md text-[9px] font-bold tracking-widest uppercase text-[#39FF14] px-3 py-1 rounded-full border border-[#39FF14]/30">
                    {post.category}
                  </div>

                  {post.isSample && (
                    <div className="absolute top-3.5 right-3.5 bg-white/10 backdrop-blur-md text-[9px] font-mono tracking-wider uppercase text-white/60 px-2.5 py-1 rounded-full border border-white/10">
                      Sample Content
                    </div>
                  )}
                </div>

                {/* Post Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    {/* Meta info */}
                    <div className="flex items-center gap-2 text-[11px] font-mono text-white/40 mb-2.5">
                      <span>{post.date}</span>
                      <span>•</span>
                      <span>{post.readTime}</span>
                    </div>

                    <h2 className="text-xl font-bold text-white tracking-tight leading-snug mb-3 group-hover:text-[#39FF14] transition-colors">
                      {post.title}
                    </h2>

                    <p className="text-xs sm:text-sm text-white/50 font-light leading-relaxed line-clamp-3">
                      {post.excerpt}
                    </p>
                  </div>

                  {/* Read article link */}
                  <div className="pt-5 mt-6 border-t border-white/[0.08] flex items-center justify-between text-xs font-bold tracking-widest uppercase text-white/70 group-hover:text-white">
                    <span>Read Article</span>
                    <span className="transform group-hover:translate-x-1 transition-transform text-[#39FF14]">
                      →
                    </span>
                  </div>
                </div>
              </Link>
            </motion.article>
          ))}
        </AnimatePresence>
      </div>

    </main>
  );
}
