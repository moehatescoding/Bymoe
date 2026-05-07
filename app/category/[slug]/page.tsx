import { notFound } from 'next/navigation';
import { getCategoryBySlug } from '@/lib/categories';
import { getProductsByCategory, searchProducts } from '@/lib/products';
import ProductCard from '@/components/ProductCard';
import Link from 'next/link';

export async function generateStaticParams() {
  return ['men','women','kids','home','ikea','our-products','all'].map(slug => ({ slug }));
}

interface PageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ q?: string }>;
}

export default async function CategoryPage({ params, searchParams }: PageProps) {
  const { slug } = await params;
  const { q } = await searchParams;
  
  let products = [];
  let title = '';
  let description = '';

  if (q) {
    products = searchProducts(q);
    title = `Search results for "${q}"`;
    description = `Found ${products.length} products matching your search.`;
  } else {
    const category = getCategoryBySlug(slug);
    if (!category) notFound();
    products = getProductsByCategory(slug);
    title = category.name;
    description = category.description;
  }

  return (
    <main className="pt-20 md:pt-40 pb-20 max-w-container-max mx-auto px-4 md:px-margin-desktop">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-6 md:mb-8 text-label-sm text-on-surface-variant">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <span>›</span>
        {q ? (
          <span className="text-primary">Search</span>
        ) : (
          <span className="text-primary">{title}</span>
        )}
      </div>

      {/* Header */}
      <div className="mb-8 md:mb-12">
        <h1 className="text-[32px] md:text-[40px] font-semibold tracking-tight text-primary leading-tight">{title}</h1>
        <p className="text-body-md md:text-body-lg text-on-surface-variant mt-2">{description}</p>
        <p className="text-label-sm text-on-surface-variant mt-1">{products.length} products</p>
      </div>

      {/* Grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {products.map(p => <ProductCard key={p.id} product={p} />)}
        </div>
      ) : (
        <div className="text-center py-20 text-on-surface-variant border-2 border-dashed border-surface-variant rounded-3xl">
          <p className="text-body-lg">No products found matching your criteria.</p>
          <Link href="/category/all" className="inline-block mt-4 text-primary font-semibold hover:underline">
            Browse all products
          </Link>
        </div>
      )}
    </main>
  );
}
