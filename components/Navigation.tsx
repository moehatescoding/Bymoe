'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { useAudioStore } from '@/store/audioStore';
import { trackEvent } from '@/lib/analytics';

const NAV_LINKS = [
  { label: 'ABOUT', href: '/about' },
  { label: 'GARAGE', href: '/garage' },
  { label: 'PROJECTS', href: '/projects' },
  { label: 'CONTENT', href: '/content' },
  { label: 'WORK', href: '/work' },
];

export default function Navigation() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  // Audio state
  const { isMuted, toggleMute, playHover } = useAudioStore();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 w-full z-[100] transition-all duration-500 flex items-center justify-between px-6 md:px-12 ${
          isScrolled ? 'h-20 glass-panel' : 'h-32 bg-transparent'
        }`}
      >
        <div className="flex items-center gap-8 relative z-[110]">
          <Link 
            href="/" 
            className="text-2xl font-bold tracking-tighter text-brand-white mix-blend-difference"
            data-cursor="HOME"
          >
            BYMOE
          </Link>
          
          {/* Sound Toggle */}
          <button
            aria-label={isMuted ? 'Unmute sound' : 'Mute sound'}
            onClick={toggleMute}
            onMouseEnter={playHover}
            className="hidden md:flex items-center gap-2 mix-blend-difference opacity-70 hover:opacity-100 transition-opacity"
            data-cursor={isMuted ? 'SOUND ON' : 'SOUND OFF'}
          >
            <div className="flex items-end gap-[2px] h-3">
              <motion.div animate={{ height: isMuted ? 2 : [2, 8, 4, 12, 6, 2] }} transition={{ repeat: Infinity, duration: 1.2, ease: "linear" }} className="w-[2px] bg-brand-white rounded-full" />
              <motion.div animate={{ height: isMuted ? 2 : [6, 2, 10, 4, 8, 6] }} transition={{ repeat: Infinity, duration: 1.0, ease: "linear" }} className="w-[2px] bg-brand-white rounded-full" />
              <motion.div animate={{ height: isMuted ? 2 : [4, 12, 2, 8, 4, 4] }} transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }} className="w-[2px] bg-brand-white rounded-full" />
            </div>
            <span className="text-[9px] tracking-widest uppercase font-semibold text-brand-white">
              {isMuted ? 'Off' : 'On'}
            </span>
          </button>
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-10">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              onMouseEnter={playHover}
              className="text-[11px] font-semibold tracking-[0.2em] text-brand-white/80 hover:text-brand-white transition-colors uppercase hover-reveal"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        {/* Mobile Actions (Sound + Menu) */}
        <div className="flex md:hidden items-center gap-6 relative z-[110]">
          <button
            aria-label={isMuted ? 'Unmute sound' : 'Mute sound'}
            onClick={toggleMute}
            className="flex items-center gap-2 mix-blend-difference opacity-80"
          >
            <div className="flex items-end gap-[2px] h-3">
              <motion.div animate={{ height: isMuted ? 2 : [2, 8, 4, 12, 6, 2] }} transition={{ repeat: Infinity, duration: 1.2 }} className="w-[2px] bg-brand-white rounded-full" />
              <motion.div animate={{ height: isMuted ? 2 : [6, 2, 10, 4, 8, 6] }} transition={{ repeat: Infinity, duration: 1.0 }} className="w-[2px] bg-brand-white rounded-full" />
              <motion.div animate={{ height: isMuted ? 2 : [4, 12, 2, 8, 4, 4] }} transition={{ repeat: Infinity, duration: 1.5 }} className="w-[2px] bg-brand-white rounded-full" />
            </div>
          </button>

          {/* Mobile Toggle */}
          <button
            aria-expanded={isOpen}
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
            className="w-10 h-10 flex flex-col items-center justify-center gap-1.5 mix-blend-difference"
            onClick={() => setIsOpen(!isOpen)}
          >
            <motion.span
              animate={isOpen ? { rotate: 45, y: 7 } : { rotate: 0, y: 0 }}
              className="w-6 h-[1px] bg-brand-white block transition-transform"
            />
            <motion.span
              animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
              className="w-6 h-[1px] bg-brand-white block"
            />
            <motion.span
              animate={isOpen ? { rotate: -45, y: -7 } : { rotate: 0, y: 0 }}
              className="w-6 h-[1px] bg-brand-white block transition-transform"
            />
          </button>
        </div>
      </header>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-[105] bg-brand-navy flex flex-col justify-center px-6"
          >
            <nav className="flex flex-col gap-8">
              {NAV_LINKS.map((link, i) => (
                <motion.div
                  key={link.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1 }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className="block py-3 text-4xl font-light tracking-tight text-brand-white"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
            </nav>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.8 }}
              className="absolute bottom-12 left-6 right-6 flex justify-between text-brand-muted text-[10px] tracking-widest uppercase"
            >
              <span>Moe © 2026</span>
              <a 
                href="https://instagram.com/moegical"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackEvent('click_instagram', { source: 'mobile_nav' })}
                className="p-4 -m-4"
              >
                Instagram
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
