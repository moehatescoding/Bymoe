'use client';
import { motion } from 'framer-motion';
import { useAudioStore } from '@/store/audioStore';
import { trackEvent } from '@/lib/analytics';

export default function WorkPage() {
  const { playHover, playClick } = useAudioStore();

  const capabilities = [
    {
      num: '01',
      title: 'Automotive & Moto Campaigns',
      desc: 'Authentic track, tarmac, and garage brand narratives without corporate script-reading.'
    },
    {
      num: '02',
      title: 'Real-World Hardware Testing',
      desc: 'Exhausts, protective gear, oils, and bike accessories stress-tested under real Indian weather.'
    },
    {
      num: '03',
      title: 'Cinematic Motion & Reels',
      desc: 'High-speed rolling shots, sound design, and raw 4K vertical cuts with high viewer retention.'
    },
    {
      num: '04',
      title: 'Digital & Creative Architectures',
      desc: 'High-performance interactive web microsites, design systems, and digital brand experiences.'
    }
  ];

  return (
    <main className="min-h-screen bg-brand-black flex flex-col justify-center pt-32 pb-32 px-5 sm:px-8 md:px-12 max-w-7xl mx-auto overflow-x-hidden relative">
      
      {/* Background Glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-[#00ff66]/5 blur-[160px] rounded-full pointer-events-none" />
      
      <div className="w-full relative z-10 flex flex-col items-center text-center">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl mb-16"
        >
          <div className="flex items-center justify-center gap-2 mb-4">
            <span className="w-2 h-2 rounded-full bg-[#00ff66] animate-pulse" />
            <p className="hud-tag">
              COMMUNICATIONS // BRAND PARTNERSHIPS & SPECIAL PROJECTS
            </p>
          </div>
          <h1 className="font-display text-5xl sm:text-7xl md:text-8xl font-black uppercase tracking-tight text-white leading-none mb-6">
            PIT STOP <span className="text-[#00ff66]">COLLABORATION</span>
          </h1>
          <p className="text-base sm:text-xl font-light tracking-tight text-white/70 leading-relaxed max-w-2xl mx-auto">
            Partnering with brands, creators, and engineering shops that value mechanical authenticity, high-speed cinema, and honest storytelling.
          </p>
        </motion.div>

        {/* Capabilities Grid */}
        <motion.div 
          className="w-full max-w-5xl mb-20 text-left"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          <div className="flex items-center justify-between border-b border-white/10 pb-4 mb-8">
            <span className="font-mono text-xs uppercase tracking-widest text-[#00ff66]">
              // ACTIVE CAPABILITIES
            </span>
            <span className="font-mono text-[11px] text-white/40">
              CUSTOM SCOPES AVAILABLE
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {capabilities.map((cap) => (
              <div 
                key={cap.num}
                className="p-6 rounded-2xl bg-brand-surface border border-white/10 hover:border-[#00ff66]/40 transition-all duration-300 group"
              >
                <div className="font-mono text-xs text-[#00ff66] mb-2">
                  {cap.num} // SPEC
                </div>
                <h3 className="font-display text-2xl font-bold uppercase text-white mb-2 group-hover:text-[#00ff66] transition-colors">
                  {cap.title}
                </h3>
                <p className="text-xs sm:text-sm text-white/50 font-light leading-relaxed">
                  {cap.desc}
                </p>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Action Buttons CTA */}
        <motion.div 
          className="flex flex-wrap items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <a 
            href="mailto:hello@bymoe.in"
            onClick={() => {
              playClick();
              trackEvent('click_collaboration');
            }}
            onMouseEnter={playHover}
            className="inline-flex items-center gap-3 px-8 py-4 bg-[#00ff66] text-black rounded-xl font-display font-black text-sm uppercase tracking-wider hover:bg-[#22c55e] transition-all shadow-lg shadow-[#00ff66]/20 cursor-pointer"
            data-cursor="EMAIL"
          >
            <span>DISPATCH PROPOSAL // HELLO@BYMOE.IN</span>
            <svg className="w-4 h-4" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 7H13M13 7L7 1M13 7L7 13" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>

          <a 
            href="https://chat.whatsapp.com/G5qW40UqW3C9N5R1" 
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 px-6 py-4 rounded-xl bg-white/5 border border-white/15 text-white hover:bg-white/10 font-mono text-xs font-bold uppercase tracking-wider transition-all cursor-pointer"
            data-cursor="JOIN"
          >
            <span>JOIN WHATSAPP COLLECTIVE ↗</span>
          </a>
        </motion.div>

      </div>
    </main>
  );
}
