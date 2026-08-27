import type { Metadata } from 'next';
import Hero from '@/components/Hero';
import ClientMotorcycleViewer from '@/components/ClientMotorcycleViewer';

export const metadata: Metadata = {
  title: 'BYMOE',
  description: 'Life, built my way. Creator. Builder. Rider. Explorer.',
  alternates: {
    canonical: '/',
  },
};

export default function HomePage() {
  return (
    <main className="min-h-screen bg-brand-black">
      <Hero />
      
      {/* 3D Interactive Motorcycle Experience */}
      <section id="viewer" className="relative w-full h-screen border-t border-brand-white/5">
        <div className="absolute inset-0 z-0">
          <ClientMotorcycleViewer />
        </div>
      </section>
      
      {/* Spacer to allow scrolling past the viewer if we add more sections later */}
      <div className="h-[50vh] bg-brand-black w-full" />
    </main>
  );
}
