import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-[#08080a] text-[#f3f2ee] pt-24 pb-12 px-6 sm:px-10 md:px-16 border-t border-white/[0.08] mt-24">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start md:items-end gap-12">
        
        {/* Left side: Brand */}
        <div className="flex flex-col">
          <div className="relative w-44 h-14 sm:w-56 sm:h-16 overflow-hidden mb-4">
            <Image 
              src="/logo.png" 
              alt="by/moe" 
              fill 
              sizes="(max-width: 768px) 176px, 224px"
              className="object-contain object-left-bottom" 
            />
          </div>
          <p className="text-[#8e8e9a] text-[11px] font-mono tracking-[0.2em] uppercase mb-2">
            Motorsport Editorial · Custom Builds · Cinematic Dispatch
          </p>
          <div className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-[#00ff66] animate-pulse" />
            <span className="text-[10px] font-mono text-white/40 tracking-wider">
              TELEMETRY: HYD · IN // READY FOR ROLLOUT
            </span>
          </div>
        </div>

        {/* Right side: Links */}
        <div className="flex flex-wrap md:flex-nowrap gap-10 md:gap-16">
          <div className="flex flex-col gap-3">
            <span className="text-[#8e8e9a] text-[10px] font-mono uppercase tracking-[0.25em] mb-1">Social</span>
            <Link href="https://instagram.com/moegical" target="_blank" rel="noopener noreferrer" className="text-xs font-bold uppercase tracking-widest text-white/70 hover:text-[#00ff66] transition-colors" data-cursor="FOLLOW">Instagram</Link>
            <Link href="https://www.youtube.com/@Moegical" target="_blank" rel="noopener noreferrer" className="text-xs font-bold uppercase tracking-widest text-white/70 hover:text-[#ef4444] transition-colors" data-cursor="WATCH">YouTube</Link>
            <Link href="https://chat.whatsapp.com/ENrb0phc8sT32tMnwnoqiw?s=cl&p=i&mlu=0" target="_blank" rel="noopener noreferrer" className="text-xs font-bold uppercase tracking-widest text-white/70 hover:text-[#00ff66] transition-colors" data-cursor="JOIN">WhatsApp Collective</Link>
          </div>
          
          <div className="flex flex-col gap-3">
            <span className="text-[#8e8e9a] text-[10px] font-mono uppercase tracking-[0.25em] mb-1">Navigation</span>
            <Link href="/blog" className="text-xs font-bold uppercase tracking-widest text-white/70 hover:text-white transition-colors">Logbook</Link>
            <Link href="/products" className="text-xs font-bold uppercase tracking-widest text-white/70 hover:text-white transition-colors">Gear & Builds</Link>
            <Link href="/content" className="text-xs font-bold uppercase tracking-widest text-white/70 hover:text-white transition-colors">Reels</Link>
            <Link href="/projects" className="text-xs font-bold uppercase tracking-widest text-white/70 hover:text-white transition-colors">Projects</Link>
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-[#8e8e9a] text-[10px] font-mono uppercase tracking-[0.25em] mb-1">Direct</span>
            <Link href="/gallery" className="text-xs font-bold uppercase tracking-widest text-white/70 hover:text-white transition-colors">Gallery</Link>
            <Link href="/work" className="text-xs font-bold uppercase tracking-widest text-white/70 hover:text-white transition-colors">Collab</Link>
            <Link href="/about" className="text-xs font-bold uppercase tracking-widest text-white/70 hover:text-white transition-colors">About</Link>
            <Link href="mailto:hello@bymoe.in" className="text-xs font-bold uppercase tracking-widest text-white/70 hover:text-[#00ff66] transition-colors" data-cursor="EMAIL">hello@bymoe.in</Link>
          </div>
        </div>
      </div>
      
      {/* Copyright / Easter Egg */}
      <div className="max-w-7xl mx-auto mt-16 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row justify-between items-center gap-4 text-[#8e8e9a] text-xs font-mono">
        <p className="flex items-center gap-2">
          <span>&copy; {new Date().getFullYear()} by/moe.</span>
          <span className="text-white/20">/</span>
          <span className="text-white font-semibold hover:text-[#00ff66] transition-colors cursor-default">
            Ride Safe.
          </span>
        </p>
        <p className="tracking-[0.2em] uppercase text-[10px] text-white/40">
          ALL SYSTEMS OPERATIONAL
        </p>
      </div>
    </footer>
  );
}
