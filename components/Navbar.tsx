'use client';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Search, X, ShoppingCart, ChevronDown } from 'lucide-react';
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
          "h-20 md:h-40", 
          isScrolled 
            ? "bg-white border-b border-[#ddd] shadow-sm md:h-24 md:bg-white/90 md:backdrop-blur-xl" 
            : "bg-[#f0ede8] md:bg-transparent border-b border-[#ddd] md:border-none"
        )}
      >
        <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop flex justify-between items-center h-full">
          
          {/* Left: Logo */}
          <div className="flex items-center">
            <Link href="/" className="relative z-50">
              <Image 
                src="/logo.svg" 
                alt="bymoe" 
                width={200} 
                height={60} 
                className="h-20 md:h-32 w-auto transition-transform duration-500 hover:scale-105"
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
              id="mobile-search-trigger"
              onClick={() => setSearchOpen(true)}
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
          </div>
        </div>
      </header>

      {/* Search Overlay - Mobile & Desktop */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div 
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            className="fixed top-20 left-0 w-full z-[150] bg-white border-b border-[#eee] overflow-hidden shadow-modal"
          >
            <div className="sticky top-0 bg-white z-10 p-4 md:p-6 flex items-center gap-4 border-b border-[#eee]">
              <div className="flex-1 relative">
                <Search className="absolute left-0 top-1/2 -translate-y-1/2 text-[#ccc]" size={20} />
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search products..."
                  className="w-full pl-8 pr-4 py-2 text-[20px] font-medium outline-none placeholder:text-[#ccc]"
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' && query.trim()) {
                      setSearchOpen(false);
                      window.location.href = `/category/all?q=${encodeURIComponent(query.trim())}`;
                    }
                  }}
                />
              </div>
              <button onClick={() => setSearchOpen(false)} className="p-2 text-primary">
                <X size={24} />
              </button>
            </div>
            
            <div className="p-6">
              {!query.trim() ? (
                <>
                  <p className="text-[12px] font-semibold uppercase tracking-wider text-[#888] mb-4">Popular Searches</p>
                  <div className="flex flex-wrap gap-2">
                    {POPULAR_SEARCHES.map(tag => (
                      <button 
                        key={tag}
                        onClick={() => {
                          setSearchOpen(false);
                          window.location.href = `/category/all?q=${encodeURIComponent(tag)}`;
                        }}
                        className="category-chip"
                      >
                        {tag}
                      </button>
                    ))}
                  </div>
                </>
              ) : (
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {searchResults.map(p => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                  {searchResults.length === 0 && (
                    <p className="col-span-full text-center py-10 text-on-surface-variant">No results found for "{query}"</p>
                  )}
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
