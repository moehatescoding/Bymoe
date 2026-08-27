'use client';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { getPublicProjects, getActiveCategories, ProjectCategory } from '@/data/projects';
import { useAudioStore } from '@/store/audioStore';
import { trackEvent } from '@/lib/analytics';

export default function ProjectsPage() {
  const [activeCategory, setActiveCategory] = useState<ProjectCategory | 'All'>('All');
  const { playHover, playClick } = useAudioStore();

  const projects = getPublicProjects();
  const categories = getActiveCategories();

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <main className="min-h-screen bg-brand-black pt-32 pb-32">
      
      {/* Header */}
      <header className="max-w-7xl mx-auto px-6 md:px-12 w-full mb-16 md:mb-24 mt-12 md:mt-24">
        <motion.div 
          className="flex flex-col gap-6 max-w-3xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h1 className="text-4xl md:text-7xl font-bold tracking-tighter leading-none text-brand-white uppercase">
            THINGS I'M <br className="hidden md:block" /> BUILDING
          </h1>
          <p className="text-lg md:text-2xl text-brand-white/70 font-light leading-relaxed">
            Software, hardware, brands, and whatever else keeps me up at night.
          </p>
        </motion.div>
      </header>

      {/* Filter Tabs */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full mb-12">
        <div className="flex flex-wrap gap-4 border-b border-brand-white/10 pb-6">
          <button
            onClick={() => { playClick(); setActiveCategory('All'); }}
            onMouseEnter={playHover}
            className={`text-[10px] tracking-widest uppercase transition-colors ${
              activeCategory === 'All' ? 'text-brand-white font-bold' : 'text-brand-white/40 hover:text-brand-white'
            }`}
            data-cursor="FILTER"
          >
            All
          </button>
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => { playClick(); setActiveCategory(cat); }}
              onMouseEnter={playHover}
              className={`text-[10px] tracking-widest uppercase transition-colors ${
                activeCategory === cat ? 'text-brand-white font-bold' : 'text-brand-white/40 hover:text-brand-white'
              }`}
              data-cursor="FILTER"
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Projects Grid */}
      <section className="max-w-7xl mx-auto px-6 md:px-12 w-full">
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-24">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col group"
              >
                {/* Project Image */}
                <div className="relative w-full aspect-[4/3] bg-brand-surface overflow-hidden mb-8 border border-brand-white/5">
                  {project.images.length > 0 ? (
                    <Image 
                      src={project.images[0]} 
                      alt={project.title} 
                      fill 
                      className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out grayscale group-hover:grayscale-0"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-brand-white/10 font-mono text-sm tracking-widest uppercase">
                      NO ASSETS AVAILABLE
                    </div>
                  )}

                  {/* Status Badge */}
                  <div className="absolute top-4 right-4 flex items-center gap-2 bg-brand-black/80 backdrop-blur-md border border-brand-white/10 px-3 py-1.5 rounded-sm">
                    {project.status === 'Live' && <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />}
                    {project.status === 'In Progress' && <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />}
                    {project.status === 'Archived' && <span className="w-1.5 h-1.5 rounded-full bg-brand-white/40" />}
                    <span className="text-[9px] tracking-widest text-brand-white uppercase font-semibold">
                      {project.status}
                    </span>
                  </div>
                </div>

                {/* Project Meta */}
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-[10px] tracking-[0.2em] text-brand-white uppercase bg-brand-white/10 px-2 py-1 rounded-sm font-semibold">
                    {project.category}
                  </span>
                  <span className="text-[10px] tracking-[0.2em] text-brand-muted font-mono">
                    {project.year}
                  </span>
                </div>

                {/* Project Header */}
                <h2 className="text-3xl font-bold tracking-tight text-brand-white mb-4 leading-tight">
                  {project.title}
                </h2>

                {/* Description */}
                <p className="text-sm md:text-base text-brand-white/70 font-light leading-relaxed mb-8 flex-1">
                  {project.description}
                </p>

                {/* Footer / CTA */}
                <div className="flex items-center justify-between border-t border-brand-white/10 pt-6 mt-auto">
                  <span className="text-[10px] tracking-widest text-brand-muted uppercase font-semibold">
                    {project.role || 'Creator'}
                  </span>
                  
                  {project.externalUrl ? (
                    <a
                      href={project.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseEnter={playHover}
                      onClick={() => {
                        playClick();
                        trackEvent('click_project', { project_title: project.title });
                      }}
                      className="inline-flex items-center gap-2 text-[10px] tracking-widest text-brand-white uppercase hover:text-brand-white/70 transition-colors py-4 -my-4"
                      data-cursor="VISIT"
                    >
                      Explore Project
                      <svg width="10" height="10" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 13L13 1M13 1H4M13 1V10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                  ) : (
                    <span className="text-[10px] tracking-widest text-brand-white/20 uppercase cursor-not-allowed">
                      {project.status === 'In Progress' ? 'Coming Soon' : 'Internal'}
                    </span>
                  )}
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </motion.div>
      </section>
    </main>
  );
}
