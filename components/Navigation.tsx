'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const NAV_LINKS = [
  { num: '01', label: 'Logbook',  href: '/blog' },
  { num: '02', label: 'Gear',     href: '/products' },
  { num: '03', label: 'Reels',    href: '/content' },
  { num: '04', label: 'Projects', href: '/projects' },
  { num: '05', label: 'Gallery',  href: '/gallery' },
  { num: '06', label: 'Collab',   href: '/work' },
  { num: '07', label: 'About',    href: '/about' },
];

function IgIcon({ size = 16 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/>
    </svg>
  );
}

function YtIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
      <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
    </svg>
  );
}

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on page transition
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      {/* ── DESKTOP HEADER (md and above) ── */}
      <header
        className={`hidden md:flex fixed top-0 left-0 w-full z-[100] transition-all duration-300 items-center justify-between px-8 lg:px-12 h-20 ${
          isScrolled
            ? 'bg-[#08080a]/90 backdrop-blur-xl border-b border-white/[0.08] shadow-2xl'
            : 'bg-gradient-to-b from-[#08080a]/70 to-transparent'
        }`}
      >
        {/* Brand Logo with the new by/moe mark */}
        <Link
          href="/"
          className="relative w-36 h-12 block cursor-pointer group transition-transform duration-200 hover:scale-[1.03]"
          data-cursor="HOME"
        >
          <Image
            src="/logo.png"
            alt="by/moe"
            fill
            sizes="144px"
            className="object-contain object-left"
            priority
          />
        </Link>

        {/* Desktop Nav Links */}
        <nav className="flex items-center gap-1">
          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === '/'
                ? pathname === '/'
                : pathname.startsWith(link.href);

            return (
              <Link
                key={link.label}
                href={link.href}
                data-cursor="EXPLORE"
                className={`relative px-3.5 py-2 rounded-lg text-[11px] font-bold tracking-[0.18em] uppercase transition-all cursor-pointer font-sans ${
                  isActive
                    ? 'text-white bg-white/[0.07]'
                    : 'text-white/45 hover:text-white hover:bg-white/[0.04]'
                }`}
              >
                <span>{link.label}</span>
                {isActive && (
                  <span className="absolute bottom-1 left-3.5 right-3.5 h-[2px] bg-[#00ff66] rounded-full shadow-[0_0_8px_#00ff66]" />
                )}
              </Link>
            );
          })}

          {/* Telemetry Separator */}
          <div className="h-4 w-px bg-white/10 mx-2" />

          {/* Social Icons */}
          <a
            href="https://instagram.com/moegical"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-9 h-9 rounded-lg text-white/50 hover:text-white hover:bg-white/10 transition-all duration-200 cursor-pointer"
            aria-label="Instagram @moegical"
            data-cursor="FOLLOW"
          >
            <IgIcon size={17} />
          </a>

          <a
            href="https://www.youtube.com/@Moegical"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center w-9 h-9 rounded-lg text-white/50 hover:text-[#ef4444] hover:bg-white/10 transition-all duration-200 cursor-pointer"
            aria-label="YouTube @Moegical"
            data-cursor="WATCH"
          >
            <YtIcon size={18} />
          </a>
        </nav>
      </header>

      {/* ── MOBILE TOP BAR (< md) ── */}
      <header
        className={`md:hidden fixed top-0 left-0 right-0 z-[90] h-16 px-4 flex items-center justify-between transition-all duration-300 ${
          isScrolled
            ? 'bg-[#08080a]/95 backdrop-blur-xl border-b border-white/[0.08] shadow-lg'
            : 'bg-gradient-to-b from-[#08080a]/80 to-transparent'
        }`}
      >
        {/* Mobile Logo */}
        <Link href="/" className="relative w-28 h-8 block cursor-pointer" aria-label="by/moe Home">
          <Image
            src="/logo.png"
            alt="by/moe"
            fill
            sizes="112px"
            className="object-contain object-left"
            priority
          />
        </Link>

        {/* Telemetry Indicator + Menu Toggle */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-black/60 border border-white/10 text-[9px] font-mono text-[#00ff66]">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00ff66] animate-pulse" />
            <span>HYD · IN</span>
          </div>

          <button
            onClick={() => setMobileMenuOpen(true)}
            className="px-2.5 py-1 rounded-md bg-white/10 active:bg-[#00ff66] text-white active:text-black font-mono text-xs uppercase tracking-wider transition-all flex items-center gap-1.5 cursor-pointer"
            aria-label="Open Navigation Menu"
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
              <line x1="3" y1="6" x2="21" y2="6" />
              <line x1="3" y1="12" x2="21" y2="12" />
              <line x1="3" y1="18" x2="21" y2="18" />
            </svg>
            <span className="text-[10px] font-bold">MENU</span>
          </button>
        </div>
      </header>

      {/* ── FULLSCREEN MOBILE NAVIGATION DRAWER ── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-[200] bg-[#08080a]/98 backdrop-blur-2xl px-6 pt-5 pb-8 flex flex-col justify-between overflow-y-auto"
          >
            {/* Top Bar inside Drawer */}
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <div className="relative w-28 h-8">
                <Image
                  src="/logo.png"
                  alt="by/moe"
                  fill
                  sizes="112px"
                  className="object-contain object-left"
                />
              </div>

              <button
                onClick={() => setMobileMenuOpen(false)}
                className="px-3 py-1.5 rounded-md bg-white/10 text-white font-mono text-xs uppercase tracking-widest font-bold flex items-center gap-1 cursor-pointer"
              >
                <span>[✕ CLOSE]</span>
              </button>
            </div>

            {/* Navigation Links */}
            <nav className="my-auto py-8 flex flex-col gap-4">
              {NAV_LINKS.map((link) => {
                const isActive =
                  link.href === '/'
                    ? pathname === '/'
                    : pathname.startsWith(link.href);

                return (
                  <Link
                    key={link.label}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-baseline justify-between py-2 border-b border-white/[0.06] transition-colors ${
                      isActive ? 'text-[#00ff66]' : 'text-white/80 active:text-white'
                    }`}
                  >
                    <span className="font-display text-4xl font-black uppercase tracking-tight">
                      {link.label}
                    </span>
                    <span className="font-mono text-xs text-[#00ff66] tracking-widest">
                      {link.num} //
                    </span>
                  </Link>
                );
              })}
            </nav>

            {/* Bottom Drawer Footer */}
            <div className="pt-4 border-t border-white/10">
              <div className="flex items-center justify-between mb-4">
                <a
                  href="https://instagram.com/moegical"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono font-bold text-white/70 hover:text-white uppercase"
                >
                  IG // @MOEGICAL
                </a>
                <a
                  href="https://www.youtube.com/@Moegical"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xs font-mono font-bold text-white/70 hover:text-[#ef4444] uppercase"
                >
                  YT // @MOEGICAL
                </a>
              </div>

              <div className="flex items-center justify-between text-[10px] font-mono text-white/40">
                <span>TELEMETRY: HYD · IN</span>
                <span className="text-[#00ff66]">SYSTEM ONLINE</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
