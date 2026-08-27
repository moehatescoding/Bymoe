'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Image from 'next/image';
import { useAudioStore } from '@/store/audioStore';
import { BIKES } from '@/data/bikes';
import { accessoriesByBike } from '@/data/accessories';

export default function GaragePage() {
  const { playHover, playClick } = useAudioStore();
  const z900 = BIKES.find(b => b.id === 'z900');
  
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const yHero = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacityHero = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  if (!z900) return null;

  return (
    <main ref={containerRef} className="min-h-screen bg-brand-black pb-32">
      
      {/* 1. CINEMATIC HERO */}
      <div className="relative w-full h-screen overflow-hidden">
        <motion.div 
          className="absolute inset-0 w-full h-full"
          style={{ y: yHero, opacity: opacityHero }}
        >
          <Image
            src="https://images.unsplash.com/photo-1568772585407-9361f9bf3a87?q=80&w=2000&auto=format&fit=crop"
            alt="[QUESTION FOR MOE: Upload the main Z900 hero image]"
            fill
            className="object-cover object-center opacity-80"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-brand-black via-brand-black/20 to-transparent" />
        </motion.div>

        <div className="absolute inset-0 z-10 flex flex-col justify-end px-6 md:px-12 pb-24 max-w-7xl mx-auto w-full">
          <p className="text-[10px] tracking-[0.3em] text-brand-muted uppercase mb-4">The Garage</p>
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-none text-brand-white mb-6">
            MACHINES I'VE <br /> LOVED & BROKEN.
          </h1>
          <p className="text-sm md:text-lg text-brand-white/70 font-light max-w-xl leading-relaxed">
            {z900.story}
          </p>
          <div className="flex flex-col md:flex-row gap-8 mt-12 border-t border-brand-white/10 pt-8">
            <div>
              <span className="block text-[9px] text-brand-muted tracking-widest uppercase mb-1">Model Year</span>
              <span className="text-lg font-mono text-brand-white">{z900.year}</span>
            </div>
            <div>
              <span className="block text-[9px] text-brand-muted tracking-widest uppercase mb-1">Acquired</span>
              <span className="text-lg font-mono text-brand-white">2026</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. THE SETUP & MODS */}
      <section className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 w-full mt-24">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-[10px] tracking-[0.3em] text-brand-white/40 uppercase mb-4">The Setup</h2>
            <p className="text-sm text-brand-white/70 font-light leading-relaxed">
              {z900.setup}
            </p>
            <p className="text-sm text-brand-white/70 font-light leading-relaxed mt-4">
              {z900.notes}
            </p>
          </div>
          <div>
            <h2 className="text-[10px] tracking-[0.3em] text-brand-white/40 uppercase mb-4">Top Mods</h2>
            <ul className="flex flex-col gap-4">
              {z900.modifications.map((mod, i) => (
                <li key={i} className="flex items-center gap-4 text-sm font-light text-brand-white">
                  <div className="w-1 h-1 bg-brand-white rounded-full opacity-50" />
                  {mod}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* 3. THE BUILD & ACCESSORIES */}
      <section className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 w-full mt-24">
        <div className="mb-16">
          <h2 className="text-[10px] tracking-[0.3em] text-brand-white/40 uppercase mb-4">What's on my Z900</h2>
          <p className="text-2xl md:text-4xl font-light text-brand-white tracking-tight max-w-2xl">
            Everything currently installed on the bike. No fakes.
          </p>
        </div>

        {/* 2D Accessory Scroll List */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 md:gap-16">
          
          {/* Left Column: sticky visual */}
          <div className="md:col-span-5 hidden md:block">
            <div className="sticky top-32 w-full aspect-[3/4] bg-brand-surface rounded-sm overflow-hidden border border-brand-white/5">
              <Image 
                src="https://images.unsplash.com/photo-1558981403-c5f9899a28bc?q=80&w=1200&auto=format&fit=crop"
                alt="[QUESTION FOR MOE: Z900 Details Image]"
                fill
                className="object-cover opacity-60"
              />
              <div className="absolute inset-0 bg-brand-black/30 mix-blend-multiply" />
            </div>
          </div>

          {/* Right Column: Scrolling Accessories */}
          <div className="md:col-span-7 flex flex-col gap-12">
            {(accessoriesByBike['z900'] || []).map((accessory) => (
              <div key={accessory.id} className="flex flex-col gap-6 p-6 border border-brand-white/10 bg-brand-surface/30 rounded-sm">
                <div className="flex gap-6 items-start">
                  <div className="relative w-24 h-24 md:w-32 md:h-32 bg-brand-black rounded flex-shrink-0 overflow-hidden border border-brand-white/5">
                    <Image 
                      src={accessory.image} 
                      alt={accessory.name}
                      fill
                      className="object-cover opacity-80"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[9px] text-brand-muted tracking-widest uppercase mb-1">{accessory.category}</span>
                    <h3 className="text-xl font-bold tracking-tight text-brand-white mb-2">{accessory.name}</h3>
                    <p className="text-xs text-brand-white/60 font-light leading-relaxed line-clamp-3">
                      {accessory.description}
                    </p>
                  </div>
                </div>
                
                {accessory.externalUrl && (
                  <div className="border-t border-brand-white/10 pt-4 mt-2">
                    <a 
                      href={accessory.externalUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      onMouseEnter={playHover}
                      onClick={playClick}
                      className="inline-flex items-center gap-2 py-2 text-[10px] font-bold tracking-widest text-brand-white uppercase hover:text-brand-white/60 transition-colors"
                      data-cursor="EXPLORE"
                    >
                      View Product ↗
                    </a>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. WHATSAPP COMMUNITY CTA */}
      <section className="relative z-20 max-w-7xl mx-auto px-6 md:px-12 w-full mt-32">
        <div className="p-12 md:p-24 bg-brand-surface border border-brand-white/5 rounded-sm text-center flex flex-col items-center">
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-brand-white mb-6 max-w-2xl">
            Ride around Hyderabad? You're probably not the only idiot doing it.
          </h2>
          <p className="text-sm text-brand-white/60 mb-12 font-light">
            Join the community. Or don't. I'm not your boss.
          </p>
          <a
            href="https://chat.whatsapp.com/ENrb0phc8sT32tMnwnoqiw?s=cl&p=i&mlu=0"
            target="_blank"
            rel="noopener noreferrer"
            onMouseEnter={playHover}
            onClick={playClick}
            className="px-8 py-4 bg-brand-white text-brand-black text-xs font-bold tracking-widest uppercase hover:bg-brand-white/80 transition-colors"
          >
            Join WhatsApp Group →
          </a>
        </div>
      </section>

    </main>
  );
}
