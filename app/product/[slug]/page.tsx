import { notFound } from 'next/navigation';
import { getProductBySlug, products } from '@/lib/products';
import Image from 'next/image';
import Link from 'next/link';
import ProductActions from './ProductActions';
import ProductGallery from './ProductGallery';
import { Shield } from 'lucide-react';

export async function generateStaticParams() {
  return products.map(p => ({ slug: p.slug }));
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const { name, category, price, originalPrice, discount, images, description, inStock } = product;

  return (
    <main className="pt-48 pb-20 max-w-container-max mx-auto px-6 md:px-margin-desktop">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 mb-8 text-label-sm text-on-surface-variant">
        <Link href="/" className="hover:text-primary transition-colors">Home</Link>
        <span>›</span>
        <Link href={`/category/${category}`} className="hover:text-primary transition-colors capitalize">{category.replace('-', ' ')}</Link>
        <span>›</span>
        <span className="text-primary">{name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-card-gap">
        {/* Gallery */}
        <div className="lg:col-span-7">
          <ProductGallery images={images} name={name} inStock={inStock} />
        </div>

        {/* Info */}
        <div className="lg:col-span-5 flex flex-col gap-6">

          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2 flex-wrap">
              {discount > 0 && <span className="bg-sale-orange text-white px-3 py-1 rounded-full text-label-sm font-semibold uppercase">{discount}% OFF</span>}
              <span className="bg-surface-variant text-on-surface px-3 py-1 rounded-full text-label-sm font-semibold uppercase capitalize">{category.replace('-', ' ')}</span>
            </div>
            <h1 className="text-[28px] md:text-[40px] font-semibold tracking-tight text-primary leading-tight">{name}</h1>
            {product.subtitle && <p className="text-[17px] md:text-body-lg text-on-surface-variant">{product.subtitle}</p>}
            {product.sku && (
              <p className="text-label-sm text-on-surface-variant">
                Article No: <span className="font-medium">{product.sku}</span>
                {product.madeIn && <span className="ml-4">Made in: <span className="font-medium">{product.madeIn}</span></span>}
              </p>
            )}
          </div>

          {/* Price */}
          <div className="flex flex-col gap-1 border-b border-surface-variant pb-6">
            <div className="flex items-end gap-4">
              <span className="text-[36px] md:text-[48px] font-semibold text-primary leading-none">₹{price.toLocaleString('en-IN')}</span>
              {originalPrice > price && (
                <span className="text-[20px] md:text-[24px] text-outline-variant line-through mb-1">₹{originalPrice.toLocaleString('en-IN')}</span>
              )}
            </div>
            <div className="flex items-center gap-2 mt-2">
              <span className="flex items-center gap-1.5 text-[11px] font-bold text-secondary bg-secondary/10 px-2 py-0.5 rounded-full uppercase tracking-wider">
                <Shield size={12}/> 100% Secure Checkout
              </span>
              <span className="text-[11px] text-on-surface-variant opacity-60 font-medium italic">Verified secure store</span>
            </div>
          </div>

          {/* Trust */}
          <div className="flex flex-col gap-3 py-2">
            {!inStock && (
              <div className="flex items-center gap-2 text-error text-label-sm font-semibold">
                <span>⚠</span> Currently out of stock
              </div>
            )}
            {inStock && (
              <div className="flex items-center gap-2 text-wa-green text-label-sm font-semibold">
                <span>⚡</span> Only a few left in stock
              </div>
            )}
            <div className="flex items-center gap-2 text-on-surface-variant text-label-sm">
              <span>🚚</span> Cash on Delivery Available
            </div>
          </div>

          {/* Actions — client component */}
          <ProductActions product={product} />

          {/* Accordions */}
          <div className="flex flex-col gap-2 mt-2">

            {/* Description */}
            <details className="border border-surface-variant rounded-xl bg-surface group" open>
              <summary className="flex items-center justify-between p-4 cursor-pointer list-none hover:bg-surface-variant/50 transition-colors rounded-xl">
                <span className="text-[18px] font-semibold text-primary">Description</span>
                <span className="text-on-surface-variant group-open:rotate-180 transition-transform">▾</span>
              </summary>
              <div className="px-4 pb-4 text-body-md text-on-surface-variant whitespace-pre-line">{description}</div>
            </details>

            {/* Key Features */}
            {product.features && product.features.length > 0 && (
              <details className="border border-surface-variant rounded-xl bg-surface group" open>
                <summary className="flex items-center justify-between p-4 cursor-pointer list-none hover:bg-surface-variant/50 transition-colors rounded-xl">
                  <span className="text-[18px] font-semibold text-primary">Key Features</span>
                  <span className="text-on-surface-variant group-open:rotate-180 transition-transform">▾</span>
                </summary>
                <ul className="px-4 pb-4 space-y-2">
                  {product.features.map((f, i) => (
                    <li key={i} className="flex items-start gap-3 text-body-md text-on-surface-variant">
                      <span className="mt-1 w-2 h-2 rounded-full bg-primary shrink-0" />
                      {f}
                    </li>
                  ))}
                </ul>
              </details>
            )}

            {/* Dimensions */}
            {product.dimensions && product.dimensions.length > 0 && (
              <details className="border border-surface-variant rounded-xl bg-surface group">
                <summary className="flex items-center justify-between p-4 cursor-pointer list-none hover:bg-surface-variant/50 transition-colors rounded-xl">
                  <span className="text-[18px] font-semibold text-primary">Dimensions</span>
                  <span className="text-on-surface-variant group-open:rotate-180 transition-transform">▾</span>
                </summary>
                <div className="px-4 pb-4 divide-y divide-surface-variant">
                  {product.dimensions.map((d) => (
                    <div key={d.label} className="flex justify-between py-3 text-body-md">
                      <span className="text-on-surface-variant">{d.label}</span>
                      <span className="text-primary font-medium">{d.value}</span>
                    </div>
                  ))}
                </div>
              </details>
            )}

            {/* Materials */}
            {product.materials && product.materials.length > 0 && (
              <details className="border border-surface-variant rounded-xl bg-surface group">
                <summary className="flex items-center justify-between p-4 cursor-pointer list-none hover:bg-surface-variant/50 transition-colors rounded-xl">
                  <span className="text-[18px] font-semibold text-primary">Materials</span>
                  <span className="text-on-surface-variant group-open:rotate-180 transition-transform">▾</span>
                </summary>
                <div className="px-4 pb-4 divide-y divide-surface-variant">
                  {product.materials.map((m) => (
                    <div key={m.label} className="flex justify-between py-3 text-body-md">
                      <span className="text-on-surface-variant">{m.label}</span>
                      <span className="text-primary font-medium text-right max-w-[60%]">{m.value}</span>
                    </div>
                  ))}
                </div>
              </details>
            )}

            {/* Care Instructions */}
            {product.careInstructions && product.careInstructions.length > 0 && (
              <details className="border border-surface-variant rounded-xl bg-surface group">
                <summary className="flex items-center justify-between p-4 cursor-pointer list-none hover:bg-surface-variant/50 transition-colors rounded-xl">
                  <span className="text-[18px] font-semibold text-primary">Care Instructions</span>
                  <span className="text-on-surface-variant group-open:rotate-180 transition-transform">▾</span>
                </summary>
                <ul className="px-4 pb-4 space-y-2">
                  {product.careInstructions.map((c, i) => (
                    <li key={i} className="flex items-start gap-3 text-body-md text-on-surface-variant">
                      <span className="mt-1 text-primary">✓</span>
                      {c}
                    </li>
                  ))}
                </ul>
              </details>
            )}

            {/* Delivery & Returns */}
            <details className="border border-surface-variant rounded-xl bg-surface group">
              <summary className="flex items-center justify-between p-4 cursor-pointer list-none hover:bg-surface-variant/50 transition-colors rounded-xl">
                <span className="text-[18px] font-semibold text-primary">Delivery & Returns</span>
                <span className="text-on-surface-variant group-open:rotate-180 transition-transform">▾</span>
              </summary>
              <div className="px-4 pb-4 text-body-md text-on-surface-variant space-y-2">
                <p>Standard delivery in 3-7 business days. Free delivery on orders above ₹999.</p>
                <p>Cash on Delivery available. Easy 7-day returns via WhatsApp.</p>
              </div>
            </details>

          </div>
        </div>
      </div>
    </main>
  );
}
