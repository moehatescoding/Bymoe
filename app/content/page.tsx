'use client';
import { motion, Variants } from 'framer-motion';
import { REELS_CONTENT } from '@/data/reels';
import ReelCard from '@/components/ReelCard';

export default function ContentPage() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  return (
    <main className="min-h-screen bg-brand-black pt-32 pb-32">
      
      {/* Header */}
      <header className="max-w-7xl mx-auto px-6 md:px-12 w-full mb-16 mt-12 md:mt-24 text-center flex flex-col items-center">
        <motion.p 
          className="text-[10px] tracking-[0.3em] text-brand-muted uppercase mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          What I'm up to
        </motion.p>
        <motion.h1 
          className="text-4xl md:text-6xl font-light text-brand-white tracking-tight mb-8 max-w-2xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          Probably riding, filming, building or overthinking something.
        </motion.h1>
        <motion.a 
          href="https://instagram.com/moegical"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-6 py-3 bg-brand-surface border border-brand-white/10 text-[10px] font-bold tracking-widest text-brand-white uppercase hover:bg-brand-white hover:text-brand-black transition-colors"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Follow @moegical
        </motion.a>
      </header>

      {/* Cinematic Reels Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
        >
          {REELS_CONTENT.map((reel, index) => (
            <div key={reel.id} className={index === 0 ? 'sm:col-span-2 sm:row-span-2' : ''}>
              <ReelCard reel={reel} index={index} />
            </div>
          ))}
        </motion.div>
      </section>

    </main>
  );
}
