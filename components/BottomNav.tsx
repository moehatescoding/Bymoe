'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, ShoppingBag, Search, ShoppingCart, MessageCircle } from 'lucide-react';
import { useCartStore } from '@/store/cartStore';

export default function BottomNav() {
  const pathname = usePathname();
  const { totalItems, openCart } = useCartStore();
  const cartCount = totalItems();

  const navItems = [
    { label: 'Home', icon: Home, href: '/' },
    { label: 'Shop', icon: ShoppingBag, href: '/category/all' },
    { label: 'Search', icon: Search, onClick: () => {
      // Find and click the search button in the main navbar
      const searchBtn = document.querySelector('[aria-label="Search"]') as HTMLButtonElement;
      searchBtn?.click();
    } },
    { label: 'Cart', icon: ShoppingCart, onClick: openCart, badge: cartCount },
    { label: 'WhatsApp', icon: MessageCircle, href: 'https://wa.me/918919377794' },
  ];

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-[#eee] h-16 z-[100] flex items-center justify-around px-2 pb-[env(safe-area-inset-bottom)]">
      {navItems.map((item) => {
        const isActive = item.href === pathname;
        const Icon = item.icon;

        const content = (
          <div className="flex flex-col items-center gap-1 min-w-[64px] py-2">
            <div className="relative">
              <Icon 
                size={22} 
                className={isActive ? 'text-black' : 'text-[#aaa]'} 
              />
              {item.badge > 0 && (
                <span className="absolute -top-1.5 -right-1.5 bg-error text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                  {item.badge}
                </span>
              )}
            </div>
            <span className={`text-[10px] uppercase font-medium tracking-[0.05em] ${isActive ? 'text-black' : 'text-[#aaa]'}`}>
              {item.label}
            </span>
          </div>
        );

        if (item.href) {
          if (item.href.startsWith('http')) {
            return (
              <a key={item.label} href={item.href} target="_blank" rel="noopener noreferrer" className="tap-target">
                {content}
              </a>
            );
          }
          return (
            <Link key={item.label} href={item.href} className="tap-target">
              {content}
            </Link>
          );
        }

        return (
          <button 
            key={item.label} 
            onClick={item.onClick} 
            className="tap-target focus:outline-none"
          >
            {content}
          </button>
        );
      })}
    </nav>
  );
}
