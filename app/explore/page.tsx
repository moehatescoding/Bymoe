import { Metadata } from 'next';
import { products } from '@/lib/products';
import ProductCard from '@/components/ProductCard';

export const metadata: Metadata = {
  title: 'Explore Curated Picks — Fashion & Home | bymoe',
  description: 'Discover hand-picked fashion, home decor and lifestyle products curated by bymoe. Order anything instantly via WhatsApp.',
  alternates: {
    canonical: '/explore',
  }
};

export default function ExplorePage() {
  const explorePicks = products.slice(0, 12);
  return (
    <main className="pt-32 pb-20 max-w-container-max mx-auto px-6 md:px-margin-desktop">
      <h1 className="text-[32px] md:text-[48px] font-semibold text-primary mb-8 uppercase tracking-tight">Explore Curated Picks</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
        {explorePicks.map(p => <ProductCard key={p.id} product={p} />)}
      </div>
    </main>
  );
}
