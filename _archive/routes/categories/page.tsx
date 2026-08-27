import { Metadata } from 'next';
import Link from 'next/link';
import Image from 'next/image';
import { categories } from '@/lib/categories';
import CategoryCard from '@/components/CategoryCard';

export const metadata: Metadata = {
  title: 'All Categories | bymoe',
  description: 'Browse all categories at bymoe — IKEA deals, fashion, home essentials and more.',
};

export default function CategoriesPage() {
  return (
    <main className="min-h-screen pt-32 pb-20 bg-surface-container-lowest">
      <div className="max-w-container-max mx-auto px-6 md:px-margin-desktop">
        <div className="mb-12">
          <p className="text-label-sm text-on-surface-variant uppercase tracking-widest mb-2">Explore Our Collections</p>
          <h1 className="text-[32px] md:text-[48px] font-semibold tracking-tight text-primary">All Categories</h1>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          {categories.filter(c => c.slug !== 'all').map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </div>
    </main>
  );
}
