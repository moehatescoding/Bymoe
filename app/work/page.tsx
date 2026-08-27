'use client';
import { motion } from 'framer-motion';
import { useAudioStore } from '@/store/audioStore';
import { trackEvent } from '@/lib/analytics';

export default function WorkPage() {
  const { playHover, playClick } = useAudioStore();

  const services = [
    'Brand Collaborations',
    'Content Creation',
    'Campaigns',
    'Product Integrations',
    'Creative Partnerships',
    'Technology Projects'
  ];

  return (
    <main className="min-h-screen bg-brand-black flex flex-col justify-center pt-32 pb-24 relative overflow-hidden">
      
      {/* Subtle Background Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-brand-white/5 blur-[120px] rounded-full pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10 flex flex-col items-center text-center">
        
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-4xl"
        >
          <span className="text-[10px] tracking-[0.3em] text-brand-muted uppercase font-bold mb-8 block">
            Collaboration
          </span>
          <h1 className="text-4xl md:text-6xl lg:text-8xl font-bold tracking-tighter leading-[0.9] text-brand-white uppercase mb-8">
            Want to build <br className="hidden md:block" />
            <span className="text-brand-white/40">something together?</span>
          </h1>
          <p className="text-xl md:text-3xl font-light tracking-tight text-brand-white/80 leading-relaxed max-w-2xl mx-auto">
            Working with brands, businesses and people who want to create something worth remembering.
          </p>
        </motion.div>

        {/* Services List (Typographical instead of generic bullets) */}
        <motion.div 
          className="mt-20 md:mt-32 w-full max-w-5xl"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 1 }}
        >
          <h2 className="text-[9px] tracking-[0.3em] text-brand-white/30 uppercase mb-8">Capabilities</h2>
          <div className="flex flex-wrap justify-center gap-x-8 gap-y-4 md:gap-y-8">
            {services.map((service, index) => (
              <span 
                key={index}
                className="text-lg md:text-3xl font-medium tracking-tight text-brand-muted hover:text-brand-white transition-colors duration-500 cursor-default"
              >
                {service}
                {index < services.length - 1 && (
                  <span className="text-brand-white/10 ml-8 hidden md:inline-block">/</span>
                )}
              </span>
            ))}
          </div>
        </motion.div>

        {/* CTA */}
        <motion.div 
          className="mt-24 md:mt-32"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <a 
            href="mailto:hello@bymoe.in"
            onClick={() => {
              playClick();
              trackEvent('click_collaboration');
            }}
            onMouseEnter={playHover}
            className="group relative inline-flex items-center justify-center gap-4 px-12 py-6 bg-brand-white text-brand-black overflow-hidden rounded-sm"
            data-cursor="EMAIL"
          >
            {/* Button Hover Fill Effect */}
            <div className="absolute inset-0 bg-brand-white/80 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
            
            <span className="relative text-sm md:text-base tracking-[0.2em] font-bold uppercase z-10">
              Work With Me
            </span>
            <svg className="relative z-10 w-4 h-4 md:w-5 md:h-5 group-hover:translate-x-1 transition-transform duration-300" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 7H13M13 7L7 1M13 7L7 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </motion.div>

      </div>
    </main>
  );
}
