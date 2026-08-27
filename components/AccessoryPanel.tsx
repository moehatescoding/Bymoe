'use client';
import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Accessory } from '@/data/accessories';
import { useAudioStore } from '@/store/audioStore';
import { trackEvent } from '@/lib/analytics';
import Image from 'next/image';

interface AccessoryPanelProps {
  accessory: Accessory | null;
  onClose: () => void;
}

export default function AccessoryPanel({ accessory, onClose }: AccessoryPanelProps) {
  const { playHover, playClick } = useAudioStore();

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && accessory) {
        playClick();
        onClose();
      }
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [accessory, onClose, playClick]);

  return (
    <AnimatePresence>
      {accessory && (
        <motion.div
          initial={{ opacity: 0, x: '100%' }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: '100%' }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={{ left: 0, right: 1 }} // Only allow dragging to the right
          onDragEnd={(e, info) => {
            if (info.offset.x > 100 || info.velocity.x > 500) {
              playClick();
              onClose();
            }
          }}
          className="absolute top-0 right-0 w-full md:w-[420px] h-full bg-brand-navy/95 border-l border-brand-white/10 backdrop-blur-2xl z-40 flex flex-col pointer-events-auto shadow-2xl"
        >
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-brand-white/10">
            <span className="text-[10px] tracking-[0.2em] text-brand-muted uppercase font-semibold">
              Component Details
            </span>
            <button 
              aria-label="Close details panel"
              onClick={(e) => {
                playClick();
                onClose();
              }}
              onMouseEnter={playHover}
              className="text-brand-white/60 hover:text-brand-white p-2 -mr-2 transition-colors focus-visible:ring-2 focus-visible:ring-brand-white rounded-sm"
              data-cursor="CLOSE"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L13 13M1 13L13 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
              </svg>
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto hide-scrollbar p-6 flex flex-col gap-8 pb-12">
            
            {/* Image Asset */}
            <div className="w-full aspect-[4/3] relative rounded-lg overflow-hidden bg-brand-black border border-brand-white/5">
              <Image 
                src={accessory.image} 
                alt={accessory.name} 
                fill
                sizes="(max-width: 768px) 100vw, 420px"
                className="object-cover opacity-80"
              />
            </div>

            {/* Title & Brand */}
            <div>
              <div className="flex justify-between items-start gap-4 mb-2">
                <p className="text-brand-muted text-xs tracking-widest uppercase">{accessory.brand}</p>
                {accessory.price && (
                  <p className="text-brand-white font-mono text-sm tracking-tight">{accessory.price}</p>
                )}
              </div>
              <h3 className="text-2xl font-semibold tracking-tight text-brand-white leading-tight">
                {accessory.name}
              </h3>
            </div>

            {/* Specifications */}
            {accessory.specs && accessory.specs.length > 0 && (
              <div className="grid grid-cols-2 gap-4 py-4 border-y border-brand-white/10">
                {accessory.specs.map((spec, i) => (
                  <div key={i} className="flex flex-col gap-1">
                    <span className="text-[9px] tracking-[0.1em] text-brand-muted uppercase">{spec.label}</span>
                    <span className="text-xs text-brand-white font-medium">{spec.value}</span>
                  </div>
                ))}
              </div>
            )}

            {/* Details */}
            <div className="flex flex-col gap-8">
              <div>
                <h4 className="text-[10px] text-brand-white/40 tracking-[0.2em] uppercase mb-3">Description</h4>
                <p className="text-sm text-brand-white/80 leading-relaxed font-light">
                  {accessory.description}
                </p>
              </div>

              <div>
                <h4 className="text-[10px] text-brand-white/40 tracking-[0.2em] uppercase mb-3">Why I Run It</h4>
                <div className="pl-4 border-l-2 border-brand-white/20">
                  <p className="text-sm text-brand-white/90 leading-relaxed italic">
                    "{accessory.reason}"
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Footer Action */}
          <div className="p-6 border-t border-brand-white/10 bg-brand-black/50">
            {accessory.externalUrl ? (
              <a 
                href={accessory.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={playHover}
                onClick={() => {
                  playClick();
                  trackEvent('click_product', { product_name: accessory.name, brand: accessory.brand });
                }}
                className="w-full flex items-center justify-center gap-2 py-4 bg-brand-white text-brand-black text-xs font-bold tracking-widest uppercase rounded hover:bg-brand-white/80 transition-colors"
                data-cursor="EXPLORE"
              >
                View Product
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 11L11 1M11 1H3.5M11 1V8.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            ) : (
              <div className="w-full flex items-center justify-center gap-2 py-4 border border-brand-white/20 text-brand-white/40 text-xs font-bold tracking-widest uppercase rounded cursor-not-allowed">
                Link Unavailable
              </div>
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
