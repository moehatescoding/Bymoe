'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAudioStore } from '@/store/audioStore';
import Image from 'next/image';

const MOBILE_LINKS = [
  { label: 'HOME', href: '/' },
  { label: 'GARAGE', href: '/garage' },
  { label: 'REELS', href: '/content' },
  { label: 'MORE', href: '/work' },
];

export default function BottomNav() {
  const pathname = usePathname();
  const { playHover, playClick } = useAudioStore();

  return (
    <nav className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-sm z-[100] bg-brand-black/80 backdrop-blur-xl border border-brand-white/10 rounded-full px-2 py-2 flex items-center justify-between shadow-2xl">
      {MOBILE_LINKS.map((link) => {
        const isActive = pathname === link.href;
        
        // Inject the logo in the middle of the nav
        if (link.label === 'REELS') {
          return (
            <div key="logo-center" className="flex items-center">
              <Link 
                href="/"
                onClick={playClick}
                className="mx-2 relative w-12 h-6 mix-blend-screen"
              >
                <Image src="/logo.png" alt="BYMOE" fill className="object-contain" />
              </Link>
              <Link
                href={link.href}
                onClick={playClick}
                className={`relative px-4 py-3 text-[10px] font-bold tracking-widest uppercase transition-colors rounded-full ${
                  isActive ? 'bg-brand-white text-brand-black' : 'text-brand-white/60 hover:text-brand-white'
                }`}
              >
                {link.label}
              </Link>
            </div>
          );
        }

        return (
          <Link
            key={link.label}
            href={link.href}
            onClick={playClick}
            className={`relative px-4 py-3 text-[10px] font-bold tracking-widest uppercase transition-colors rounded-full ${
              isActive ? 'bg-brand-white text-brand-black' : 'text-brand-white/60 hover:text-brand-white'
            }`}
          >
            {link.label}
          </Link>
        );
      })}
    </nav>
  );
}
