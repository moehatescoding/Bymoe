'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Search, Menu, X, ChevronDown } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { cn } from '@/lib/utils';

const navConfig = [
  { 
    label: 'Home', 
    href: '/', 
    dropdown: [
      { label: 'Furniture', href: '/category/home?sub=furniture' },
      { label: 'Lighting', href: '/category/home?sub=lighting' },
      { label: 'Decor', href: '/category/home?sub=decor' },
      { label: 'Storage', href: '/category/home?sub=storage' },
      { label: 'Kitchen', href: '/category/home?sub=kitchen' },
      { label: 'Outdoor', href: '/category/home?sub=outdoor' },
    ]
  },
  { 
    label: 'IKEA', 
    href: '/category/ikea', 
    prominent: true,
    dropdown: [
      { label: 'Furniture', href: '/category/ikea?sub=furniture' },
      { label: 'Storage', href: '/category/ikea?sub=storage' },
      { label: 'Lighting', href: '/category/ikea?sub=lighting' },
      { label: 'Best Deals', href: '/category/ikea?sub=deals' },
    ]
  },
  { 
    label: 'Our Products', 
    href: '/category/our-products', 
    dropdown: [
      { label: 'Featured', href: '/category/our-products?filter=featured' },
      { label: 'New Arrivals', href: '/category/our-products?filter=new' },
      { label: 'Best Sellers', href: '/category/our-products?filter=best' },
    ]
  },
  { 
    label: 'Explore', 
    href: '/explore', 
    dropdown: [
      { label: 'Men', href: '/category/men' },
      { label: 'Women', href: '/category/women' },
      { label: 'Kids', href: '/category/kids' },
      { label: 'Home Essentials', href: '/category/home-essentials' },
      { label: 'Accessories', href: '/category/accessories' },
    ]
  },
  { label: 'Bulk', href: '/bulk' },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [query, setQuery] = useState('');
  
  const { openCart, totalItems } = useCartStore();
  const dropdownTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setMounted(true);
    useCartStore.persist.rehydrate();
    
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMouseEnter = (label: string) => {
    if (dropdownTimer.current) clearTimeout(dropdownTimer.current);
    setActiveDropdown(label);
  };

  const handleMouseLeave = () => {
    dropdownTimer.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const itemCount = mounted ? totalItems() : 0;

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 w-full z-50 transition-all duration-500",
        isScrolled 
          ? "h-16 md:h-20 bg-white/90 backdrop-blur-xl border-b border-black/5 shadow-sm py-2" 
          : "h-20 md:h-28 bg-transparent py-4"
      )}
    >
      <div className="max-w-container-max mx-auto px-6 md:px-margin-desktop flex justify-between items-center h-full">
        
        {/* Left: Logo */}
        <div className="flex items-center">
          <Link href="/" className="relative z-50">
            <div className="flex flex-col">
              <Image 
                src="/logo.svg" 
                alt="bymoe" 
                width={320} 
                height={120} 
                className="h-12 md:h-16 w-auto transition-transform duration-500 hover:scale-105"
                priority
              />
            </div>
          </Link>
        </div>

        {/* Center: Primary Nav */}
        <div className="hidden md:flex items-center gap-12">
          {navConfig.map((item) => (
            <div 
              key={item.label}
              className="relative py-2"
              onMouseEnter={() => item.dropdown && handleMouseEnter(item.label)}
              onMouseLeave={() => item.dropdown && handleMouseLeave()}
            >
              <Link 
                href={item.href}
                className={cn(
                  "text-[18px] font-medium tracking-[0.05em] transition-all duration-300 relative group",
                  item.prominent ? "text-primary font-medium" : "text-[#111] opacity-70 hover:opacity-100"
                )}
              >
                {item.label}
                {item.prominent && (
                  <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
                {/* Underline animation */}
                {!item.prominent && (
                  <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-primary transition-all duration-300 group-hover:w-full" />
                )}
              </Link>

              {/* Dropdown Menu */}
              <AnimatePresence>
                {activeDropdown === item.label && item.dropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 5 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-4"
                  >
                    <div className="bg-white shadow-[0_10px_40px_rgba(0,0,0,0.1)] border border-surface-variant rounded-xl py-4 min-w-[200px] overflow-hidden">
                      {item.dropdown.map((subItem) => (
                        <Link
                          key={subItem.label}
                          href={subItem.href}
                          className="block px-6 py-2.5 text-[14px] text-[#444] hover:text-primary hover:bg-[#F8F8F8] transition-colors"
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>

        {/* Right: Actions */}
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setSearchOpen(!searchOpen)}
            className="p-2 text-[#111] hover:text-primary transition-all hover:scale-110"
            aria-label="Search"
          >
            <Search size={22} strokeWidth={1.5} />
          </button>
          
          <button 
            onClick={() => openCart()}
            className="p-3 hover:bg-black/5 rounded-full transition-colors text-[#111] hover:text-primary transition-all relative group"
            aria-label="Cart"
          >
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <ShoppingBag size={24} strokeWidth={1.5} />
            </motion.div>
            <AnimatePresence>
              {itemCount > 0 && (
                <motion.span 
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  exit={{ scale: 0 }}
                  className="absolute top-0 right-0 bg-primary text-white text-[10px] font-bold h-4.5 w-4.5 rounded-full flex items-center justify-center border-2 border-white"
                >
                  {itemCount}
                </motion.span>
              )}
            </AnimatePresence>
          </button>

          <button 
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden p-2 text-[#111] hover:text-primary transition-colors"
            aria-label="Menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </div>

      {/* Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white border-t border-surface-variant overflow-hidden"
          >
            <div className="max-w-container-max mx-auto px-6 md:px-margin-desktop py-6">
              <div className="relative">
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => { 
                    if (e.key === 'Enter' && query.trim()) {
                      window.location.href = `/search?q=${encodeURIComponent(query.trim())}`;
                    }
                  }}
                  placeholder="Search curated products..."
                  className="w-full text-[24px] md:text-[32px] font-medium bg-transparent border-none outline-none placeholder:text-[#ccc] text-primary"
                />
                <button 
                  onClick={() => setSearchOpen(false)}
                  className="absolute right-0 top-1/2 -translate-y-1/2 p-2 text-[#999] hover:text-primary transition-colors"
                >
                  <X size={24} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="fixed inset-0 z-[200] bg-white md:hidden overflow-y-auto"
          >
            <div className="p-6 flex justify-between items-center border-b border-surface-variant">
              <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                <Image src="/logo.svg" alt="bymoe" width={120} height={32} className="h-8 w-auto" />
              </Link>
              <button onClick={() => setMobileMenuOpen(false)} className="p-2">
                <X size={28} />
              </button>
            </div>

            <div className="p-6 flex flex-col gap-8">
              {navConfig.map((item) => (
                <div key={item.label} className="flex flex-col">
                  {item.dropdown ? (
                    <details className="group">
                      <summary className="list-none flex items-center justify-between text-[20px] font-semibold text-primary py-2 cursor-pointer">
                        {item.label}
                        <ChevronDown size={20} className="group-open:rotate-180 transition-transform" />
                      </summary>
                      <div className="flex flex-col gap-4 pl-4 mt-4 border-l-2 border-surface-variant">
                        {item.dropdown.map((sub) => (
                          <Link 
                            key={sub.label} 
                            href={sub.href}
                            onClick={() => setMobileMenuOpen(false)}
                            className="text-[16px] text-[#444] hover:text-primary"
                          >
                            {sub.label}
                          </Link>
                        ))}
                      </div>
                    </details>
                  ) : (
                    <Link 
                      href={item.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-[20px] font-semibold text-primary py-2"
                    >
                      {item.label}
                    </Link>
                  )}
                </div>
              ))}
              
              <div className="mt-12 border-t border-surface-variant pt-8">
                <p className="text-label-sm text-on-surface-variant uppercase tracking-widest mb-6">Connect</p>
                <a 
                  href="https://www.instagram.com/bymoe.in/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-[18px] text-[#111] font-medium"
                >
                  <span className="w-10 h-10 rounded-full bg-[#F8F8F8] flex items-center justify-center">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                    </svg>
                  </span>
                  @bymoe.in
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
