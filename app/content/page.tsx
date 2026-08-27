'use client';
import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { socialLinks, placeholderFeed } from '@/data/social';
import { useAudioStore } from '@/store/audioStore';
import { FRIENDS_CONTENT } from '@/data/friends';
import FriendReelCard from '@/components/FriendReelCard';

export default function ContentPage() {
  const { playHover, playClick } = useAudioStore();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } 
    }
  };

  return (
    <main className="min-h-screen bg-brand-black pt-32 pb-32">
      
      {/* Header */}
      <header className="max-w-7xl mx-auto px-6 md:px-12 w-full mb-20 md:mb-32 mt-12 md:mt-24">
        <motion.div 
          className="flex flex-col gap-6 max-w-3xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-4xl md:text-7xl font-bold tracking-tighter leading-none text-brand-white uppercase">
            What I'm <br className="hidden md:block" /> Up To
          </h1>
          <p className="text-lg md:text-2xl text-brand-white/70 font-light leading-relaxed">
            Probably building, riding, filming or overthinking something.
          </p>
        </motion.div>
      </header>

      {/* Social Links Row */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 w-full mb-32">
        <h2 className="text-[10px] tracking-[0.3em] text-brand-white/40 uppercase mb-8">Platforms</h2>
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-4 gap-4"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {socialLinks.map((link) => (
            <motion.a
              key={link.id}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              variants={itemVariants}
              onMouseEnter={playHover}
              onClick={playClick}
              className="flex flex-col gap-1 p-6 border border-brand-white/10 bg-brand-surface/30 hover:bg-brand-surface hover:border-brand-white/30 transition-colors group"
              data-cursor="VISIT"
            >
              <span className="text-sm font-semibold text-brand-white group-hover:text-brand-white transition-colors tracking-wide">
                {link.platform}
              </span>
              <span className="text-[10px] tracking-widest text-brand-muted uppercase truncate">
                {link.handle}
              </span>
            </motion.a>
          ))}
        </motion.div>
      </section>

      {/* The Feed */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-brand-white/10 pb-6">
          <div>
            <h2 className="text-[10px] tracking-[0.3em] text-brand-white/40 uppercase">The Feed</h2>
          </div>
          <a 
            href="https://instagram.com/moegical" 
            target="_blank" 
            rel="noopener noreferrer"
            onMouseEnter={playHover}
            onClick={playClick}
            className="inline-flex items-center gap-2 py-4 -my-4 text-xs tracking-[0.2em] font-bold text-brand-white uppercase hover:text-brand-white/70 transition-colors"
            data-cursor="FOLLOW"
          >
            FOLLOW @MOEGICAL
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 7H13M13 7L7 1M13 7L7 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

        {/* 
          Grid layout designed to gracefully accept Instagram API data. 
          When real data arrives, map over it here instead of placeholderFeed. 
        */}
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-1 md:gap-4"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {placeholderFeed.map((post) => (
            <motion.a
              key={post.id}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              variants={itemVariants}
              onMouseEnter={playHover}
              onClick={playClick}
              className="group relative aspect-square bg-brand-surface overflow-hidden"
              data-cursor="VIEW"
            >
              <Image 
                src={post.imageUrl} 
                alt={`Instagram post from ${post.date}: ${post.caption.slice(0, 50)}...`} 
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
              />
              
              {/* Hover Overlay for Caption */}
              <div className="absolute inset-0 bg-brand-black/80 opacity-0 group-hover:opacity-100 transition-opacity duration-300 p-6 flex flex-col justify-end pointer-events-none">
                <p className="text-xs text-brand-white font-light leading-relaxed line-clamp-4">
                  {post.caption}
                </p>
                <p className="text-[9px] text-brand-muted tracking-widest uppercase mt-4">
                  {post.date}
                </p>
              </div>
            </motion.a>
          ))}
        </motion.div>
      </section>

      {/* Friends & Creators Section */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 w-full mt-32 mb-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-brand-white/10 pb-6">
          <div>
            <h2 className="text-[10px] tracking-[0.3em] text-brand-white/40 uppercase">Creators & Friends</h2>
          </div>
        </div>

        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {FRIENDS_CONTENT.map((friend, index) => (
            <FriendReelCard key={friend.id} friend={friend} index={index} />
          ))}
        </motion.div>
      </section>

    </main>
  );
}
