'use client';
import Link from 'next/link';
import Image from 'next/image';
import { useCartStore } from '@/store/cartStore';
import { ShoppingCart, Search, Menu, X } from 'lucide-react';
import { useEffect, useState } from 'react';

const navLinks = [
  { label: 'Men', href: '/category/men' },
  { label: 'Women', href: '/category/women' },
  { label: 'Kids', href: '/category/kids' },
  { label: 'Home', href: '/category/home' },
  { label: 'IKEA', href: '/category/ikea' },
  { label: 'Our Products', href: '/category/our-products' },
  { label: 'Bulk', href: '/bulk' },
];

export default function Navbar() {
  const { openCart, totalItems } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState('');

  useEffect(() => { setMounted(true); useCartStore.persist.rehydrate(); }, []);

  const count = mounted ? totalItems() : 0;

  return (
    <nav className="fixed top-0 w-full z-50 bg-surface/80 backdrop-blur-[24px] border-b border-surface-variant/60">
      <div className="max-w-container-max mx-auto px-6 md:px-margin-desktop flex justify-between items-center h-24">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image src="/logo.svg" alt="bymoe" width={220} height={64} style={{ width: 'auto', height: '64px' }} priority />
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} className="text-[16px] font-semibold text-on-surface hover:text-primary transition-colors">{l.label}</Link>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button onClick={() => setSearchOpen(!searchOpen)} className="p-2 text-on-surface-variant hover:text-primary transition-colors">
            <Search size={20} />
          </button>
          <button onClick={() => openCart()} className="p-2 text-on-surface-variant hover:text-primary transition-colors relative">
            <ShoppingCart size={20} />
            {count > 0 && (
              <span className="absolute -top-1 -right-1 bg-wa-green text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">{count}</span>
            )}
          </button>
          <button onClick={() => setMobileOpen(!mobileOpen)} className="md:hidden p-2 text-on-surface-variant hover:text-primary transition-colors">
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Search bar */}
      {searchOpen && (
        <div className="border-t border-surface-variant bg-surface px-6 md:px-margin-desktop py-4">
          <input
            autoFocus
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter' && query.trim()) window.location.href = `/search?q=${encodeURIComponent(query.trim())}`; }}
            placeholder="Search products..."
            className="w-full max-w-lg bg-surface-container-low border border-outline-variant rounded-xl px-4 py-3 text-body-md text-primary placeholder:text-on-surface-variant outline-none focus:border-primary transition-colors"
          />
        </div>
      )}

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden border-t border-surface-variant bg-surface px-6 py-4 flex flex-col gap-4">
          {navLinks.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setMobileOpen(false)} className="text-body-md text-on-surface-variant hover:text-primary transition-colors py-1">{l.label}</Link>
          ))}
          <div className="border-t border-surface-variant pt-4 mt-1">
            <a
              href="https://www.instagram.com/bymoe.in/"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 text-body-md text-on-surface-variant hover:text-primary transition-colors py-1"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
              @bymoe.in
            </a>
          </div>
        </div>
      )}
    </nav>
  );
}
