'use client';
import { Html } from '@react-three/drei';
import { motion, AnimatePresence } from 'framer-motion';
import { useAudioStore } from '@/store/audioStore';

interface HotspotProps {
  position: [number, number, number];
  label: string;
  description?: string;
  onClick: () => void;
  active?: boolean;
  visible?: boolean;
}

export default function Hotspot({ position, label, description, onClick, active, visible = true }: HotspotProps) {
  const { playHover, playClick } = useAudioStore();

  return (
    <Html position={position} center zIndexRange={[100, 0]}>
      <AnimatePresence>
        {visible && (
          <motion.button
            aria-label={`Inspect ${label}`}
            className={`relative group cursor-pointer flex flex-col items-center focus:outline-none focus-visible:ring-4 focus-visible:ring-brand-white focus-visible:ring-offset-4 focus-visible:ring-offset-brand-black rounded-full ${active ? 'z-50' : 'z-10'}`}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.5, type: 'spring' }}
            onMouseEnter={() => {
              if (!active) playHover();
            }}
            onClick={(e: React.MouseEvent) => {
              e.stopPropagation();
              playClick();
              onClick();
            }}
          >
            {/* The Hotspot Dot with Expanded Touch Target */}
            <div className="p-4 -m-4 flex items-center justify-center">
              <div className={`w-6 h-6 md:w-8 md:h-8 rounded-full border-[1.5px] flex items-center justify-center transition-all duration-300 ${
                active 
                  ? 'border-brand-white bg-brand-white/20 scale-110' 
                  : 'border-brand-white/30 bg-brand-black/40 hover:border-brand-white hover:bg-brand-white/20'
              }`}>
                <div className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-colors duration-300 ${
                  active ? 'bg-brand-white' : 'bg-brand-white/50 group-hover:bg-brand-white'
                }`} />
              </div>
            </div>

            {/* The Label */}
            <div className={`absolute top-full mt-2 left-1/2 -translate-x-1/2 w-max px-3 py-2 rounded bg-brand-black/95 border border-brand-white/10 backdrop-blur-xl pointer-events-none transition-all duration-400 origin-top ${
              active 
                ? 'opacity-100 scale-100 translate-y-0' 
                : 'opacity-0 scale-95 -translate-y-2 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-y-0'
            }`}>
              <div className="text-[9px] tracking-[0.2em] text-brand-white uppercase font-bold">{label}</div>
              {description && active && (
                <div className="text-[11px] text-brand-muted mt-1.5 max-w-[200px] whitespace-normal leading-relaxed">
                  {description}
                </div>
              )}
            </div>
          </motion.button>
        )}
      </AnimatePresence>
    </Html>
  );
}
