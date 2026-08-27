import type { Metadata } from 'next';
import { BIKES } from '@/data/bikes';
import BikeCard from '@/components/BikeCard';

export const metadata: Metadata = {
  title: 'The Garage',
  description: "Machines I've owned, modified, crashed, fixed and fallen in love with.",
};

export default function GaragePage() {

  return (
    <main className="min-h-screen bg-brand-black pt-32 pb-24">
      {/* Garage Header */}
      <header className="max-w-7xl mx-auto px-6 md:px-12 w-full mb-16 md:mb-32">
        <div className="flex flex-col gap-6 max-w-2xl">
          <h1 className="text-5xl md:text-8xl font-bold tracking-tighter leading-none text-brand-white">
            THE <br className="hidden md:block" /> GARAGE
          </h1>
          <p className="text-lg md:text-xl text-brand-white/70 font-light leading-relaxed">
            Machines I've owned, modified, crashed, fixed and fallen in love with.
          </p>
        </div>
      </header>

      {/* Roster of Bikes */}
      <section className="flex flex-col">
        {BIKES.map((bike, index) => (
          <BikeCard key={bike.id} bike={bike} index={index} />
        ))}
      </section>
    </main>
  );
}
