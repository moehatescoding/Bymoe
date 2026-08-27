'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useAudioStore } from '@/store/audioStore';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { label: 'GARAGE', href: '/garage' },
  { label: 'PROJECTS', href: '/projects' },
  { label: 'CONTENT', href: '/content' },
  { label: 'WORK', href: '/work' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { isMuted, toggleMute, playHover, playClick } = useAudioStore();
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`hidden md:flex fixed top-0 left-0 w-full z-[100] transition-all duration-500 items-center justify-between px-12 ${
        isScrolled ? 'h-20 bg-brand-black/90 backdrop-blur-xl border-b border-brand-white/10' : 'h-32 bg-transparent'
      }`}
    >
      <div className="flex items-center gap-8 relative z-[110]">
        <Link 
          href="/" 
          onClick={playClick}
          className="relative w-32 h-10 mix-blend-screen overflow-hidden"
          data-cursor="HOME"
        >
          <Image 
            src="/logo.png" 
            alt="BYMOE Logo" 
            fill 
            sizes="128px"
            className="object-contain object-left" 
            priority
          />
        </Link>
        
        {/* Sound Toggle */}
        <button
          aria-label={isMuted ? 'Unmute sound' : 'Mute sound'}
          onClick={() => {
            playClick();
            toggleMute();
          }}
          onMouseEnter={playHover}
          className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-brand-white/10 transition-colors group mix-blend-difference"
        >
          <div className="flex items-center justify-center gap-[3px]">
            {[1, 2, 3, 4].map((bar) => (
              <div
                key={bar}
                className={`w-[2px] bg-brand-white rounded-full transition-all duration-300 ${
                  isMuted 
                    ? 'h-[2px]' 
                    : `h-[${bar === 1 || bar === 4 ? '12px' : '16px'}] group-hover:h-[${bar === 1 || bar === 4 ? '8px' : '12px'}]`
                }`}
              />
            ))}
          </div>
        </button>
      </div>

      <nav className="flex items-center gap-8 relative z-[110]">
        {NAV_LINKS.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.label}
              href={link.href}
              onClick={playClick}
              onMouseEnter={playHover}
              className={`text-[10px] tracking-[0.2em] font-bold uppercase transition-colors p-4 -m-4 ${
                isActive ? 'text-brand-white' : 'text-brand-muted hover:text-brand-white'
              }`}
              data-cursor="EXPLORE"
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
