'use client';
import { motion, Variants } from 'framer-motion';
import Image from 'next/image';
import { useAudioStore } from '@/store/audioStore';
import { trackEvent } from '@/lib/analytics';

export default function AboutPage() {
  const { playHover, playClick } = useAudioStore();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.15
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 25 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.7, 
        ease: [0.16, 1, 0.3, 1] 
      } 
    }
  };

  const bikeSpecs = [
    { label: 'MACHINE', value: 'Kawasaki Ninja Z900 (MY24)' },
    { label: 'POWERPLANT', value: '948cc Liquid-Cooled Inline-Four' },
    { label: 'OUTPUT', value: '125 PS @ 9,500 RPM // 98.6 Nm' },
    { label: 'EXHAUST', value: 'Yoshimura Alpha T Works Slip-On' },
    { label: 'ARMOR', value: 'Puig Pro High-Density Delrin Sliders' },
    { label: 'AIRFLOW', value: 'BMC Multi-Layer Cotton High-Flow' },
    { label: 'FUEL TREATMENT', value: 'IFTEX Clean System 23 Every Fill' },
    { label: 'TERRITORY', value: 'Bengaluru · South India Circuits' },
  ];

  return (
    <main className="min-h-screen bg-brand-black pt-32 pb-32 px-5 sm:px-8 md:px-12 max-w-7xl mx-auto overflow-x-hidden">
      
      {/* Subtle Ambient Glow */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-[#00ff66]/10 blur-[140px] rounded-full pointer-events-none" />

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
            DOSSIER // RIDER PROFILE 01
          </p>
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="font-display text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-tight text-white mb-4"
        >
          WHO'S <span className="text-[#00ff66]">MOE?</span>
        </motion.h1>
        <p className="text-base sm:text-lg text-white/60 max-w-2xl font-light leading-relaxed">
          Rider, builder, creator, and mechanical tinkerer. Living life at 10,000 RPM between Bangalore's traffic and wide-open southern highways.
        </p>
      </div>

      <motion.div 
        className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        
        {/* Left Column: Manifesto & Narrative */}
        <motion.div className="lg:col-span-7 flex flex-col gap-8" variants={itemVariants}>
          <div className="p-8 rounded-2xl bg-brand-surface border border-white/10 relative overflow-hidden">
            <div className="text-[10px] font-mono tracking-widest text-[#00ff66] uppercase mb-3">
              // MANIFESTO
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-black uppercase text-white leading-tight mb-5">
              "LIFE, BUILT MY WAY. I DON'T DO STOCK."
            </h2>
            <p className="text-base sm:text-lg text-white/70 font-light leading-relaxed mb-4">
              I make things, break things, tune things, and occasionally figure them out. Whether it's hydro-dipping motorcycle bodywork in a backyard tub or dialing in an inline-four on highway dynos, I believe in mechanical honesty over corporate polish.
            </p>
            <p className="text-sm sm:text-base text-white/50 font-light leading-relaxed">
              This space is an unfiltered record of everything I test, ride, and build. If it's on this site, I bought it, bolted it on, rode it hard, and stood by it.
            </p>
          </div>

          {/* Quick Pillars */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="p-5 rounded-xl bg-white/[0.03] border border-white/[0.08]">
              <div className="font-mono text-xs text-[#00ff66] mb-1">01 // ETHOS</div>
              <div className="font-display text-lg font-bold uppercase text-white mb-1">Built, Not Bought</div>
              <div className="text-xs text-white/50">Hands-on garage engineering over showroom off-the-shelf.</div>
            </div>
            <div className="p-5 rounded-xl bg-white/[0.03] border border-white/[0.08]">
              <div className="font-mono text-xs text-[#00ff66] mb-1">02 // TARMAC</div>
              <div className="font-display text-lg font-bold uppercase text-white mb-1">100% Verified</div>
              <div className="text-xs text-white/50">Real world stress testing across thousands of monsoon kilometres.</div>
            </div>
            <div className="p-5 rounded-xl bg-white/[0.03] border border-white/[0.08]">
              <div className="font-mono text-xs text-[#00ff66] mb-1">03 // COLLECTIVE</div>
              <div className="font-display text-lg font-bold uppercase text-white mb-1">Rider Community</div>
              <div className="text-xs text-white/50">No gatekeeping. Pure knowledge share for passionate riders.</div>
            </div>
          </div>

          {/* Contact / CTA buttons */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <a 
              href="mailto:hello@bymoe.in" 
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-[#00ff66] text-black font-display text-sm font-black tracking-wider uppercase hover:bg-[#22c55e] transition-all cursor-pointer shadow-lg shadow-[#00ff66]/20"
              onMouseEnter={playHover}
              onClick={() => {
                playClick();
                trackEvent('click_contact', { location: 'about' });
              }}
              data-cursor="EMAIL"
            >
              <span>DISPATCH TRANSMISSION // HELLO@BYMOE.IN</span>
            </a>
            <a 
              href="https://chat.whatsapp.com/G5qW40UqW3C9N5R1" 
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-xl bg-white/5 border border-white/15 text-white hover:bg-white/10 font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
              data-cursor="JOIN"
            >
              <span>JOIN WHATSAPP COLLECTIVE ↗</span>
            </a>
          </div>
        </motion.div>

        {/* Right Column: Bike Telemetry Spec Sheet */}
        <motion.div className="lg:col-span-5 flex flex-col gap-6" variants={itemVariants}>
          <div className="p-6 rounded-2xl bg-brand-surface border border-white/15 shadow-2xl relative">
            <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-5">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#00ff66] animate-pulse" />
                <span className="font-mono text-xs uppercase tracking-widest text-[#00ff66] font-bold">
                  PRIMARY RIG SPECIFICATION
                </span>
              </div>
              <span className="font-mono text-[10px] text-white/40">VIN: KA-Z900-24</span>
            </div>

            {/* Bike Photo Container */}
            <div className="relative w-full aspect-[16/10] rounded-xl overflow-hidden mb-6 border border-white/10">
              <Image
                src="/kawasaki-hero.jpg"
                alt="Moe Kawasaki Z900"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-[11px] font-mono text-white/90">
                <span>KAWASAKI Z900</span>
                <span className="text-[#00ff66]">ACTIVE RIDER</span>
              </div>
            </div>

            {/* Telemetry Spec Rows */}
            <div className="flex flex-col divide-y divide-white/[0.06]">
              {bikeSpecs.map((spec, i) => (
                <div key={i} className="py-2.5 flex items-center justify-between text-xs">
                  <span className="font-mono text-white/40 tracking-wider text-[11px]">
                    {spec.label}
                  </span>
                  <span className="font-mono text-white/90 font-medium text-right text-[11px]">
                    {spec.value}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

      </motion.div>
    </main>
  );
}
