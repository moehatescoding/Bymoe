'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { useAudioStore } from '@/store/audioStore';
import { REELS_CONTENT } from '@/data/reels';
import ReelCard from '@/components/ReelCard';
import { projects } from '@/data/projects';

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { playHover, playClick } = useAudioStore();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  // Parallax calculations
  const yHeroText = useTransform(scrollYProgress, [0, 0.2], ["0vh", "50vh"]);
  const opacityHeroText = useTransform(scrollYProgress, [0, 0.15], [1, 0]);
  
  const yBike = useTransform(scrollYProgress, [0, 0.3], ["10vh", "-10vh"]);
  const scaleBike = useTransform(scrollYProgress, [0, 0.3], [1, 1.1]);
  const opacityBike = useTransform(scrollYProgress, [0, 0.1, 0.25], [0, 1, 0]);

  const yAbout = useTransform(scrollYProgress, [0.15, 0.35], ["20vh", "0vh"]);
  const opacityAbout = useTransform(scrollYProgress, [0.15, 0.25, 0.35], [0, 1, 0]);

  const yProjects = useTransform(scrollYProgress, [0.3, 0.6], ["20vh", "0vh"]);
  const opacityProjects = useTransform(scrollYProgress, [0.3, 0.4, 0.55], [0, 1, 0]);

  const yContent = useTransform(scrollYProgress, [0.5, 0.8], ["20vh", "0vh"]);
  const opacityContent = useTransform(scrollYProgress, [0.5, 0.6, 0.85], [0, 1, 0]);

  return (
    <main ref={containerRef} className="relative w-full h-[500vh] bg-brand-black overflow-hidden">
      
      {/* 1. HERO SCENE */}
      <motion.section 
        className="fixed inset-0 flex flex-col items-center justify-center z-10 pointer-events-none"
        style={{ y: yHeroText, opacity: opacityHeroText }}
      >
        <div className="relative w-64 h-24 md:w-96 md:h-32 mix-blend-screen overflow-hidden mb-6">
          <Image 
            src="/logo.png" 
            alt="BYMOE" 
            fill 
            sizes="(max-width: 768px) 256px, 384px"
            className="object-contain object-center"
            priority
          />
        </div>
        <h1 className="text-sm md:text-xl font-light tracking-[0.3em] text-brand-white/80 uppercase">
          Life, built my way.
        </h1>
        <p className="mt-4 text-[9px] md:text-xs tracking-widest text-brand-muted uppercase">
          Creator. Builder. Rider. Explorer.
        </p>
      </motion.section>

      {/* 2. THE Z900 REVEAL */}
      <motion.div 
        className="fixed inset-0 z-0 pointer-events-none flex items-center justify-center"
        style={{ y: yBike, scale: scaleBike, opacity: opacityBike }}
      >
        {/* Placeholder: A cinematic dark photo of the Z900 headlight/tank */}
        <div className="relative w-full h-full max-w-5xl max-h-[80vh]">
          <Image
            src="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=2000&auto=format&fit=crop"
            alt="[QUESTION FOR MOE: Upload the main Z900 dark cinematic image here]"
            fill
            className="object-cover object-center mix-blend-lighten opacity-60"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-transparent to-brand-black" />
          <div className="absolute inset-0 bg-gradient-to-r from-brand-black via-transparent to-brand-black" />
        </div>
      </motion.div>

      {/* 3. ABOUT REVEAL */}
      <motion.section
        className="fixed inset-0 z-20 flex flex-col items-center justify-center px-6 text-center pointer-events-auto"
        style={{ y: yAbout, opacity: opacityAbout }}
      >
        <p className="text-[10px] tracking-[0.3em] text-brand-muted uppercase mb-8">Who's Moe?</p>
        <h2 className="text-3xl md:text-6xl font-bold tracking-tighter leading-tight text-brand-white max-w-3xl">
          I make things, break things, ride things and occasionally figure them out.
        </h2>
        <p className="mt-8 text-sm md:text-lg text-brand-white/60 font-light max-w-2xl leading-relaxed">
          From motorcycles and technology to business, content and whatever catches my attention next — this is where it all comes together.
        </p>
        <Link 
          href="/about"
          onMouseEnter={playHover}
          onClick={playClick}
          className="mt-12 text-xs tracking-widest uppercase border-b border-brand-white/30 pb-1 hover:border-brand-white transition-colors"
          data-cursor="EXPLORE"
        >
          Read the Full Story
        </Link>
      </motion.section>

      {/* 4. PROJECTS REVEAL */}
      <motion.section
        className="fixed inset-0 z-20 flex flex-col items-center justify-center px-6 pointer-events-auto"
        style={{ y: yProjects, opacity: opacityProjects }}
      >
        <p className="text-[10px] tracking-[0.3em] text-brand-muted uppercase mb-12 text-center">Things I'm Building</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">
          {projects.slice(0, 2).map((project) => (
            <Link
              key={project.id}
              href="/projects"
              onMouseEnter={playHover}
              onClick={playClick}
              className="group block relative aspect-[4/3] bg-brand-surface rounded-sm overflow-hidden"
              data-cursor="VIEW"
            >
              <Image 
                src={project.images[0]} 
                alt={project.title} 
                fill 
                className="object-cover opacity-60 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-brand-black/90 to-transparent p-8 flex flex-col justify-end">
                <span className="text-[9px] text-brand-muted tracking-widest uppercase mb-2">{project.category}</span>
                <h3 className="text-xl md:text-2xl font-bold text-brand-white tracking-tight">{project.title}</h3>
              </div>
            </Link>
          ))}
        </div>
        <Link 
          href="/projects"
          onMouseEnter={playHover}
          onClick={playClick}
          className="mt-12 text-xs tracking-widest uppercase border-b border-brand-white/30 pb-1 hover:border-brand-white transition-colors"
          data-cursor="ALL"
        >
          View All Projects
        </Link>
      </motion.section>

      {/* 5. CONTENT / REELS REVEAL */}
      <motion.section
        className="fixed inset-0 z-20 flex flex-col items-center justify-center px-6 pointer-events-auto"
        style={{ y: yContent, opacity: opacityContent }}
      >
        <p className="text-[10px] tracking-[0.3em] text-brand-muted uppercase mb-4 text-center">What I'm Up To</p>
        <h2 className="text-xl md:text-3xl font-light text-brand-white/80 mb-12 text-center max-w-xl">
          Probably riding, filming, building or overthinking something.
        </h2>
        <div className="flex justify-center gap-4 w-full max-w-4xl">
          {REELS_CONTENT.slice(0, 3).map((reel, index) => (
            <div key={reel.id} className={`${index > 0 ? 'hidden md:block' : 'block'} w-full md:w-1/3`}>
              <ReelCard reel={reel} index={index} />
            </div>
          ))}
        </div>
        <Link 
          href="/content"
          onMouseEnter={playHover}
          onClick={playClick}
          className="mt-12 text-xs tracking-widest uppercase border-b border-brand-white/30 pb-1 hover:border-brand-white transition-colors"
          data-cursor="ALL"
        >
          View All Content
        </Link>
      </motion.section>

      {/* BOTTOM FOOTER LINK - appears at the very end of scroll */}
      <div className="absolute bottom-0 left-0 w-full h-screen flex flex-col items-center justify-end pb-32 px-6 z-30 pointer-events-auto">
        <h2 className="text-4xl md:text-7xl font-bold tracking-tighter text-brand-white mb-8 text-center">
          WANT TO BUILD <br className="hidden md:block" /> SOMETHING TOGETHER?
        </h2>
        <div className="flex flex-col md:flex-row gap-6">
          <a 
            href="https://instagram.com/moegical"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={playHover}
            onClick={playClick}
            className="px-8 py-4 bg-brand-surface border border-brand-white/10 text-xs tracking-widest text-brand-white uppercase hover:bg-brand-white/10 transition-colors"
          >
            Follow the Chaos →
          </a>
          <a 
            href="mailto:hello@bymoe.in"
            onMouseEnter={playHover}
            onClick={playClick}
            className="px-8 py-4 bg-brand-white text-brand-black text-xs font-bold tracking-widest uppercase hover:bg-brand-white/80 transition-colors"
          >
            Work With Me →
          </a>
        </div>
      </div>

    </main>
  );
}
