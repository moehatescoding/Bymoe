import { notFound } from 'next/navigation';
import { getCategoryBySlug } from '@/lib/categories';
import { getProductsByCategory } from '@/lib/products';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';

export async function generateStaticParams() {
  return ['men','women','kids','home','ikea','our-products','all'].map(slug => ({ slug }));
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();
  const products = getProductsByCategory(slug);

  return (
    <main className="pt-20 md:pt-40 pb-20 max-w-container-max mx-auto px-4 md:px-margin-desktop">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-6 md:mb-8 text-label-sm text-on-surface-variant">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <span>›</span>
        <span className="text-primary">{category.name}</span>
      </div>

      {/* Header */}
      <div className="mb-8 md:mb-12">
        <h1 className="text-[32px] md:text-[40px] font-semibold tracking-tight text-primary">{category.name}</h1>
        <p className="text-body-md md:text-body-lg text-on-surface-variant mt-2">{category.description}</p>
        <p className="text-label-sm text-on-surface-variant mt-1">{products.length} products</p>
      </div>

      {/* Grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      ) : (
        <div className="text-center py-20 text-on-surface-variant">
          <p className="text-body-lg">No products found.</p>
        </div>
      )}
    </main>
  );
}
