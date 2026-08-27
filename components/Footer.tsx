import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-brand-black text-brand-white pt-32 pb-12 px-6 md:px-12 border-t border-brand-border mt-32">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-16">
        
        {/* Left side: Brand */}
        <div className="flex flex-col">
          <div className="relative w-48 h-16 md:w-72 md:h-24 overflow-hidden mb-4">
            <Image 
              src="/logo.svg" 
              alt="BYMOE Logo" 
              fill 
              sizes="(max-width: 768px) 192px, 288px"
              className="object-contain object-left-bottom" 
            />
          </div>
          <p className="text-brand-muted text-[10px] tracking-[0.2em] uppercase">
            Designed & Built by Moe
          </p>
        </div>

        {/* Right side: Links */}
        <div className="flex flex-col md:flex-row gap-12 md:gap-24 pl-2 md:pl-0">
          <div className="flex flex-col gap-4">
            <span className="text-brand-muted text-[10px] uppercase tracking-widest mb-2">Social</span>
            <Link href="https://instagram.com/moegical" className="text-sm font-medium hover:text-brand-muted transition-colors hover-reveal inline-block" data-cursor="FOLLOW">Instagram</Link>
            <Link href="https://www.youtube.com/@Moegical" className="text-sm font-medium hover:text-brand-muted transition-colors hover-reveal inline-block" data-cursor="WATCH">YouTube</Link>
          </div>
          
          <div className="flex flex-col gap-4">
            <span className="text-brand-muted text-[10px] uppercase tracking-widest mb-2">Explore</span>
            <Link href="/products" className="text-sm font-medium hover:text-brand-muted transition-colors hover-reveal inline-block">Products</Link>
            <Link href="/blog" className="text-sm font-medium hover:text-brand-muted transition-colors hover-reveal inline-block">Blog</Link>
            <Link href="/projects" className="text-sm font-medium hover:text-brand-muted transition-colors hover-reveal inline-block">Projects</Link>
            <Link href="/gallery" className="text-sm font-medium hover:text-brand-muted transition-colors hover-reveal inline-block">Gallery</Link>
            <Link href="/work" className="text-sm font-medium hover:text-brand-muted transition-colors hover-reveal inline-block">Work</Link>
          </div>
          
          <div className="flex flex-col gap-4">
            <span className="text-brand-muted text-[10px] uppercase tracking-widest mb-2">Connect</span>
            <Link href="mailto:hello@bymoe.in" className="text-sm font-medium hover:text-brand-muted transition-colors hover-reveal inline-block" data-cursor="EMAIL">Contact</Link>
          </div>
        </div>
      </div>
      
      {/* Copyright / Easter Egg */}
      <div className="max-w-7xl mx-auto mt-24 flex justify-between items-center text-brand-muted text-xs group cursor-default">
        <p className="relative overflow-hidden h-4 w-40">
          <span className="absolute top-0 left-0 transition-transform duration-500 group-hover:-translate-y-full">
            &copy; {new Date().getFullYear()} BYMOE.
          </span>
          <span className="absolute top-0 left-0 translate-y-full transition-transform duration-500 group-hover:translate-y-0 text-brand-white font-semibold">
            Ride Safe.
          </span>
        </p>
        <p className="tracking-widest uppercase text-[10px]">All Rights Reserved.</p>
      </div>
    </footer>
  );
}
