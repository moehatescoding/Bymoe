'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';

const NAV_LINKS = [
  { label: 'Products', href: '/products' },
  { label: 'Blog',     href: '/blog' },
  { label: 'Projects', href: '/projects' },
  { label: 'Content',  href: '/content' },
  { label: 'Gallery',  href: '/gallery' },
  { label: 'Work',     href: '/work' },
];

// ── Instagram icon SVG ──
function IgIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  );
}

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
      {/* Logo → home */}
      <Link
        href="/"
        className="relative w-32 h-10 block cursor-pointer overflow-hidden"
        data-cursor="HOME"
      >
        <Image
          src="/logo.svg"
          alt="bymoe"
          fill
          sizes="128px"
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

        {/* ── Instagram link — icon + arrow ── */}
        <a
          href="https://instagram.com/moegical"
          target="_blank"
          rel="noopener noreferrer"
          className="group ml-2 flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-bold tracking-widest uppercase text-white/40 hover:text-white hover:bg-white/5 transition-all cursor-pointer"
          aria-label="Visit @moegical on Instagram"
        >
          <IgIcon size={14} />
          <span>@moegical</span>
          {/* Arrow that slides right on hover */}
          <svg
            className="w-3 h-3 opacity-0 -translate-x-1 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M7 17L17 7M17 7H7M17 7v10" />
          </svg>
        </a>
      </nav>
    </header>
  );
}
