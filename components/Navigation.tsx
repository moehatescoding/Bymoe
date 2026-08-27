'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { label: 'Garage', href: '/garage' },
  { label: 'Projects', href: '/projects' },
  { label: 'Content', href: '/content' },
  { label: 'Work', href: '/work' },
];

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 30);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={`hidden md:flex fixed top-0 left-0 w-full z-[100] transition-all duration-500 items-center justify-between px-12 h-20 ${
        isScrolled
          ? 'bg-brand-black/90 backdrop-blur-xl border-b border-white/[0.06]'
          : 'bg-transparent'
      }`}
    >
      {/* Logo */}
      <Link
        href="/"
        className="relative w-28 h-9 block cursor-pointer overflow-hidden mix-blend-screen"
        data-cursor="HOME"
      >
        <Image
          src="/logo.png"
          alt="bymoe"
          fill
          sizes="112px"
          className="object-contain object-left"
          priority
        />
      </Link>

      {/* Nav Links */}
      <nav className="flex items-center gap-1">
        {NAV_LINKS.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.label}
              href={link.href}
              data-cursor="EXPLORE"
              className={`px-4 py-2 rounded-lg text-xs font-bold tracking-widest uppercase transition-all cursor-pointer ${
                isActive
                  ? 'text-white bg-white/10'
                  : 'text-white/40 hover:text-white hover:bg-white/5'
              }`}
            >
              {link.label}
            </Link>
          );
        })}
        <a
          href="https://instagram.com/moegical"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-3 px-4 py-2 rounded-lg text-xs font-bold tracking-widest uppercase text-white/40 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
        >
          @moegical
        </a>
      </nav>
    </header>
  );
}
