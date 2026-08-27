'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

// ── Clean SVG Icons with uniform sizing & crisp strokes ──
function HomeIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
}

function ProductsIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  );
}

function BlogIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" />
      <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z" />
    </svg>
  );
}

function ReelsIcon({ size = 18 }: { size?: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="2.18" ry="2.18" />
      <line x1="7" y1="2" x2="7" y2="22" />
      <line x1="17" y1="2" x2="17" y2="22" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <line x1="2" y1="7" x2="7" y2="7" />
      <line x1="2" y1="17" x2="7" y2="17" />
      <line x1="17" y1="17" x2="22" y2="17" />
      <line x1="17" y1="7" x2="22" y2="7" />
    </svg>
  );
}

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-[100] px-4 pb-[max(0.75rem,env(safe-area-inset-bottom))] pointer-events-none">
      <div className="pointer-events-auto bg-[#0a0a0d]/95 backdrop-blur-2xl border border-white/10 rounded-2xl px-1.5 py-1.5 flex items-center justify-between shadow-[0_10px_30px_rgba(0,0,0,0.8)]">
        
        {/* 1. Home */}
        <Link
          href="/"
          className={`flex-1 flex flex-col items-center justify-center py-1.5 rounded-xl transition-all duration-200 cursor-pointer ${
            pathname === '/' ? 'text-[#39FF14] bg-white/[0.06]' : 'text-white/40 hover:text-white'
          }`}
        >
          <HomeIcon size={17} />
          <span className="text-[8.5px] font-bold tracking-widest uppercase mt-1">Home</span>
        </Link>

        {/* 2. Products */}
        <Link
          href="/products"
          className={`flex-1 flex flex-col items-center justify-center py-1.5 rounded-xl transition-all duration-200 cursor-pointer ${
            pathname === '/products' ? 'text-[#39FF14] bg-white/[0.06]' : 'text-white/40 hover:text-white'
          }`}
        >
          <ProductsIcon size={17} />
          <span className="text-[8.5px] font-bold tracking-widest uppercase mt-1">Gear</span>
        </Link>

        {/* 3. Center: bymoe Brand Logo */}
        <Link
          href="/"
          className="flex-shrink-0 w-12 h-10 mx-1 flex items-center justify-center rounded-xl bg-white/[0.04] border border-white/10 hover:border-white/30 transition-all cursor-pointer overflow-hidden group"
          aria-label="Home"
        >
          <div className="relative w-8 h-4">
            <Image
              src="/logo.svg"
              alt="bymoe"
              fill
              className="object-contain object-center group-hover:scale-105 transition-transform"
            />
          </div>
        </Link>

        {/* 4. Blog / Logbook */}
        <Link
          href="/blog"
          className={`flex-1 flex flex-col items-center justify-center py-1.5 rounded-xl transition-all duration-200 cursor-pointer ${
            pathname.startsWith('/blog') ? 'text-[#39FF14] bg-white/[0.06]' : 'text-white/40 hover:text-white'
          }`}
        >
          <BlogIcon size={17} />
          <span className="text-[8.5px] font-bold tracking-widest uppercase mt-1">Blog</span>
        </Link>

        {/* 5. Reels */}
        <Link
          href="/content"
          className={`flex-1 flex flex-col items-center justify-center py-1.5 rounded-xl transition-all duration-200 cursor-pointer ${
            pathname === '/content' ? 'text-[#39FF14] bg-white/[0.06]' : 'text-white/40 hover:text-white'
          }`}
        >
          <ReelsIcon size={17} />
          <span className="text-[8.5px] font-bold tracking-widest uppercase mt-1">Reels</span>
        </Link>

      </div>
    </nav>
  );
}
