'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Search, X, ShoppingCart, ChevronDown, Menu } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';
import { cn } from '@/lib/utils';
import { searchProducts } from '@/lib/products';
import ProductCard from './ProductCard';

const navConfig = [
  { 
    label: 'Home', 
    href: '/', 
    dropdown: [
      { label: 'Furniture', href: '/category/home?sub=furniture' },
      { label: 'Lighting', href: '/category/home?sub=lighting' },
      { label: 'Decor', href: '/category/home?sub=decor' },
      { label: 'Storage', href: '/category/home?sub=storage' },
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
    ]
  },
  { 
    label: 'Our Products', 
    href: '/category/our-products',
    dropdown: [
      { label: 'Featured', href: '/category/our-products?filter=featured' },
      { label: 'New Arrivals', href: '/category/our-products?filter=new' },
    ]
  },
  { label: 'Bulk', href: '/bulk' },
];

const POPULAR_SEARCHES = ['IKEA', 'Privacy Screen', 'Home Decor', 'Fashion'];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [query, setQuery] = useState('');
  
  const { openCart, totalItems } = useCartStore();
  const dropdownTimer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    setMounted(true);
    useCartStore.persist.rehydrate();
    
    const handleScroll = () => {
      if (window.scrollY > 10) {
        if (!isScrolled) setIsScrolled(true);
      } else {
        if (isScrolled) setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isScrolled]);

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
  
  // Real-time search results
  const searchResults = query.trim().length >= 2 
    ? searchProducts(query).slice(0, 4) 
    : [];

  return (
    <>
      <header 
        className={cn(
          "fixed top-0 left-0 w-full z-[100] transition-all duration-300 will-change-transform",
          "h-16 md:h-40", 
          isScrolled 
            ? "bg-white border-b border-[#ddd] shadow-sm md:h-24 md:bg-white/90 md:backdrop-blur-xl" 
            : "bg-[#f0ede8] md:bg-transparent border-b border-[#ddd] md:border-none"
        )}
      >
        <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop flex justify-between items-center h-full">
          
          {/* Left: Logo */}
          <div className="flex items-center">
            <Link href="/" className="relative z-50">
              <span className="md:hidden text-[26px] font-medium lowercase tracking-tighter text-primary">bymoe</span>
              <Image 
                src="/logo.svg" 
                alt="bymoe" 
                width={240} 
                height={100} 
                className="hidden md:block h-20 md:h-32 w-auto transition-transform duration-500 hover:scale-105"
                priority
              />
            </Link>
          </div>

          {/* Center: Desktop Nav */}
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
                  {item.prominent && <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-primary rounded-full" />}
                  {!item.prominent && <span className="absolute -bottom-1 left-0 w-0 h-[1.5px] bg-primary transition-all duration-300 group-hover:w-full" />}
                </Link>

                <AnimatePresence>
                  {activeDropdown === item.label && item.dropdown && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 5 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 pt-4"
                    >
                      <div className="bg-white shadow-modal border border-[#eee] rounded-xl py-4 min-w-[200px]">
                        {item.dropdown.map((sub) => (
                          <Link key={sub.label} href={sub.href} className="block px-6 py-2.5 text-[14px] text-[#444] hover:text-primary hover:bg-[#F8F8F8]">
                            {sub.label}
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
          <div className="flex items-center gap-2 md:gap-4">
            <button 
              onClick={() => setSearchOpen(!searchOpen)}
              className="p-2 text-[#111] hover:text-primary transition-all tap-target"
              aria-label="Search"
            >
              <Search size={24} strokeWidth={1.5} />
            </button>
            
            <button 
              onClick={() => openCart()}
              className="p-2 md:p-3 hover:bg-black/5 rounded-full transition-colors text-[#111] hover:text-primary relative tap-target"
              aria-label="Cart"
            >
              <ShoppingCart size={24} strokeWidth={1.5} />
              <AnimatePresence>
                {itemCount > 0 && (
                  <motion.span 
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                    className="absolute top-1 right-1 bg-error text-white text-[10px] font-bold h-4.5 w-4.5 rounded-full flex items-center justify-center border-2 border-white"
                  >
                    {itemCount}
                  </motion.span>
                )}
              </AnimatePresence>
            </button>

            <button 
              onClick={() => setMobileMenuOpen(true)}
              className="md:hidden p-2 text-[#111] hover:text-primary transition-colors tap-target"
              aria-label="Menu"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>
      </header>

      {/* Search Overlay */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="fixed top-16 left-0 w-full z-[150] bg-white border-b border-[#eee] overflow-hidden shadow-modal"
          >
            <div className="max-w-container-max mx-auto px-6 py-6 flex flex-col gap-4">
              <div className="relative">
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full text-[20px] font-medium outline-none placeholder:text-[#ccc]"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && query.trim()) {
                      setSearchOpen(false);
                      window.location.href = `/category/all?q=${encodeURIComponent(query.trim())}`;
                    }
                  }}
                />
                <button onClick={() => setSearchOpen(false)} className="absolute right-0 top-1/2 -translate-y-1/2 p-2">
                  <X size={20} />
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
            <div className="p-6 flex justify-between items-center border-b border-[#eee]">
              <span className="text-[26px] font-medium lowercase tracking-tighter text-primary">bymoe</span>
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
                      <div className="flex flex-col gap-4 pl-4 mt-4 border-l-2 border-[#eee]">
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
              
              <div className="mt-12 border-t border-[#eee] pt-8">
                <p className="text-label-sm text-on-surface-variant uppercase tracking-widest mb-6">Connect</p>
                <a 
                  href="https://www.instagram.com/bymoe.in/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 text-[18px] text-[#111] font-medium"
                >
                  Instagram
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

