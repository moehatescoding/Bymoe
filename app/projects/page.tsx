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
    <main className="min-h-screen bg-brand-black pt-28 pb-32 px-5 sm:px-8 md:px-12 max-w-7xl mx-auto overflow-x-hidden">
      
      {/* Header */}
      <header className="mb-14 text-left border-b border-white/[0.08] pb-10">
        <motion.div 
          className="flex flex-col gap-4 max-w-3xl"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2 h-2 rounded-full bg-[#00ff66] animate-pulse" />
            <p className="hud-tag">
              PROTOCOLS // SOFTWARE, HARDWARE & HARD PARTS
            </p>
          </div>
          <h1 className="font-display text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-tight text-white leading-none">
            THINGS I'M <span className="text-[#00ff66]">BUILDING</span>
          </h1>
          <p className="text-base sm:text-lg text-white/60 font-light leading-relaxed">
            Software architectures, physical garage rigs, custom carbon experiments, and digital products.
          </p>
        </motion.div>
      </header>

      {/* Filter Tabs (Telemetry Style) */}
      <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-12 scrollbar-none border-b border-white/[0.06]">
        <button
          onClick={() => { playClick(); setActiveCategory('All'); }}
          onMouseEnter={playHover}
          className={`px-4 py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer whitespace-nowrap ${
            activeCategory === 'All'
              ? 'bg-[#00ff66] text-black font-bold shadow-lg shadow-[#00ff66]/20'
              : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/5'
          }`}
          data-cursor="FILTER"
        >
          [ALL BUILDS]
        </button>
        {categories.map(cat => (
          <button
            key={cat}
            onClick={() => { playClick(); setActiveCategory(cat); }}
            onMouseEnter={playHover}
            className={`px-4 py-2.5 rounded-xl font-mono text-xs uppercase tracking-wider transition-all duration-200 cursor-pointer whitespace-nowrap ${
              activeCategory === cat
                ? 'bg-[#00ff66] text-black font-bold shadow-lg shadow-[#00ff66]/20'
                : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white border border-white/5'
            }`}
            data-cursor="FILTER"
          >
            {`[${cat.toUpperCase()}]`}
          </button>
        ))}
      </div>

      {/* Projects Grid */}
      <section>
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project) => (
              <motion.article
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.5 }}
                data-cursor="INSPECT"
                className="editorial-grade flex flex-col rounded-2xl overflow-hidden border border-white/10 bg-brand-surface hover:border-[#00ff66]/40 p-6 md:p-8 transition-all duration-300 shadow-xl group"
              >
                {/* Project Image */}
                <div className="relative w-full aspect-[16/10] bg-brand-black rounded-xl overflow-hidden mb-6 border border-white/10">
                  {project.images.length > 0 ? (
                    <Image 
                      src={project.images[0]} 
                      alt={project.title} 
                      fill 
                      className="object-cover opacity-80 group-hover:opacity-100 group-hover:scale-105 transition-all duration-700 ease-out"
                    />
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center text-white/20 font-mono text-xs tracking-widest uppercase">
                      SYSTEM DATA // PENDING VISUAL
                    </div>
                  )}

                  {/* Status Badge */}
                  <div className="absolute top-3.5 right-3.5 flex items-center gap-2 bg-black/80 backdrop-blur-md border border-white/15 px-3 py-1 rounded-md">
                    {project.status === 'Live' && <span className="w-2 h-2 rounded-full bg-[#00ff66] animate-pulse" />}
                    {project.status === 'In Progress' && <span className="w-2 h-2 rounded-full bg-amber-500" />}
                    {project.status === 'Archived' && <span className="w-2 h-2 rounded-full bg-white/40" />}
                    <span className="text-[10px] font-mono tracking-widest text-white uppercase font-bold">
                      {project.status}
                    </span>
                  </div>
                </div>

                {/* Project Meta */}
                <div className="flex items-center gap-3 mb-3">
                  <span className="hud-tag text-[9px]">
                    {project.category}
                  </span>
                  <span className="text-[11px] font-mono text-white/40">
                    // {project.year}
                  </span>
                </div>

                {/* Project Header */}
                <h2 className="font-display text-2xl sm:text-3xl font-black uppercase text-white group-hover:text-[#00ff66] transition-colors mb-3 leading-tight">
                  {project.title}
                </h2>

                {/* Description */}
                <p className="text-xs sm:text-sm text-white/60 font-light leading-relaxed mb-6 flex-1">
                  {project.description}
                </p>

                {/* Footer / CTA */}
                <div className="flex items-center justify-between border-t border-white/[0.08] pt-5 mt-auto">
                  <span className="text-[11px] font-mono text-white/40 uppercase tracking-wider">
                    ROLE // {project.role || 'LEAD CREATOR'}
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
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-white/10 hover:bg-[#00ff66] text-white hover:text-black font-display text-xs font-black tracking-wider uppercase transition-all duration-200"
                      data-cursor="VISIT"
                    >
                      <span>EXPLORE</span>
                      <svg width="12" height="12" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M1 13L13 1M13 1H4M13 1V10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    </a>
                  ) : (
                    <span className="text-[10px] font-mono text-white/30 uppercase tracking-widest">
                      {project.status === 'In Progress' ? 'ACTIVE DEVELOPMENT' : 'INTERNAL ARCHIVE'}
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
