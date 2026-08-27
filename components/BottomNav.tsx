'use client';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

const LINKS = [
  { label: 'Home', href: '/', icon: '⌂' },
  { label: 'Garage', href: '/garage', icon: '🏍' },
  { label: 'Reels', href: '/content', icon: '▶' },
  { label: 'Work', href: '/work', icon: '◈' },
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-[100] px-4 pb-safe">
      <div className="mb-3 bg-brand-black/90 backdrop-blur-xl border border-white/10 rounded-2xl px-2 py-2 flex items-center justify-around shadow-2xl">
        {LINKS.map((link, i) => {
          const isActive = pathname === link.href;

          // Logo in the middle
          if (i === 2) {
            return (
              <div key="mid" className="flex items-center gap-1">
                {/* Logo Home Button */}
                <Link href="/" className="flex-shrink-0 relative w-10 h-6 mx-1 cursor-pointer overflow-hidden mix-blend-screen">
                  <Image src="/logo.png" alt="bymoe" fill className="object-contain" />
                </Link>
                {/* Reels link */}
                <Link
                  href={link.href}
                  className={`flex flex-col items-center gap-0.5 px-4 py-2 rounded-xl transition-all cursor-pointer min-w-[56px] ${
                    isActive ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white'
                  }`}
                >
                  <span className="text-xs leading-none">{link.icon}</span>
                  <span className="text-[9px] font-bold tracking-widest uppercase">{link.label}</span>
                </Link>
              </div>
            );
          }

          return (
            <Link
              key={link.label}
              href={link.href}
              className={`flex flex-col items-center gap-0.5 px-4 py-2 rounded-xl transition-all cursor-pointer min-w-[56px] ${
                isActive ? 'bg-white/10 text-white' : 'text-white/40 hover:text-white active:bg-white/5'
              }`}
            >
              <span className="text-xs leading-none">{link.icon}</span>
              <span className="text-[9px] font-bold tracking-widest uppercase">{link.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
