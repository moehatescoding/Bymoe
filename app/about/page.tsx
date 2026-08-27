'use client';
import { motion, Variants } from 'framer-motion';
import { useAudioStore } from '@/store/audioStore';
import { trackEvent } from '@/lib/analytics';

export default function AboutPage() {
  const { playHover, playClick } = useAudioStore();

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        duration: 0.8, 
        ease: [0.16, 1, 0.3, 1] 
      } 
    }
  };

  return (
    <main className="min-h-screen bg-brand-black flex items-center pt-32 pb-24 relative overflow-hidden">
      
      {/* Subtle Background Elements */}
      <div className="absolute top-1/4 right-0 w-[800px] h-[800px] bg-brand-white/5 blur-[120px] rounded-full pointer-events-none translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-brand-navy/30 blur-[100px] rounded-full pointer-events-none -translate-x-1/2 translate-y-1/2" />
      
      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full relative z-10">
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24 items-center"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          
          {/* Header Column */}
          <motion.div className="md:col-span-5" variants={itemVariants}>
            <span className="text-[10px] tracking-[0.3em] text-brand-muted uppercase font-bold mb-6 block">
              Identity
            </span>
            <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-[0.85] text-brand-white">
              WHO'S <br />
              <span className="text-brand-white/40">MOE?</span>
            </h1>
          </motion.div>

          {/* Copy Column */}
          <motion.div className="md:col-span-7 flex flex-col gap-8 md:gap-12" variants={itemVariants}>
            <motion.p 
              className="text-3xl md:text-5xl font-light tracking-tight text-brand-white leading-tight"
              variants={itemVariants}
            >
              I'm Moe. <br />
              <span className="text-brand-white/70">
                I make things, break things, ride things and occasionally figure them out.
              </span>
            </motion.p>
            
            <motion.div 
              className="text-lg md:text-2xl text-brand-white/50 leading-relaxed font-light max-w-2xl"
              variants={itemVariants}
            >
              From motorcycles and technology to business, content and whatever catches my attention next — this is where it all comes together.
              <div className="mt-8">
                <span className="text-[9px] tracking-widest text-brand-muted uppercase block mb-1">Get in Touch</span>
                <a 
                  href="mailto:hello@bymoe.in" 
                  className="inline-block py-4 -my-4 text-lg hover:text-brand-white/70 transition-colors"
                  onMouseEnter={playHover}
                  onClick={() => {
                    playClick();
                    trackEvent('click_contact', { location: 'about' });
                  }}
                  data-cursor="EMAIL"
                >
                  hello@bymoe.in
                </a>
              </div>
            </motion.div>
          </motion.div>

        </motion.div>
      </div>
    </main>
  );
}
