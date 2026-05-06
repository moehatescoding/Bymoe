import Link from 'next/link';
import Image from 'next/image';
import { categories } from '@/lib/categories';
import { getFeaturedProducts, getIKEAProducts, getOurProducts } from '@/lib/products';
import CategoryCard from '@/components/CategoryCard';
import ProductCard from '@/components/ProductCard';
import { MessageCircle, ArrowRight, Package, Truck, Shield } from 'lucide-react';
import { getBulkWhatsAppUrl } from '@/lib/whatsapp';

export default function HomePage() {
  const featured = getFeaturedProducts();
  const ikea = getIKEAProducts().slice(0, 4);
  const ours = getOurProducts().slice(0, 4);

  return (
    <main className="pt-60 min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center bg-surface-container-low overflow-hidden">
        <div className="absolute inset-0 img-zoom">
          <Image src="https://picsum.photos/seed/hero-bymoe/1400/900" alt="bymoe hero" fill className="object-cover opacity-30" priority />
        </div>
        <div className="relative z-10 max-w-container-max mx-auto px-6 md:px-margin-desktop py-12 md:py-20 text-center md:text-left flex flex-col items-center md:items-start">
          <p className="text-[14px] font-semibold text-on-surface-variant uppercase tracking-widest mb-4">New Collection 2026</p>
          <h1 className="text-[36px] md:text-[72px] font-semibold tracking-tight text-primary leading-[1.1] max-w-2xl">
            Curated for the&nbsp;way you&nbsp;live.
          </h1>
          <p className="text-[17px] md:text-body-lg text-on-surface-variant mt-6 max-w-lg">
            Premium fashion, home essentials, IKEA deals — all in one place. Order instantly via WhatsApp.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-10 w-full sm:w-auto">
            <Link href="/category/home" className="bg-primary text-on-primary px-8 py-4 rounded-xl text-[16px] font-semibold tracking-wide hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
              Shop Now <ArrowRight size={16} />
            </Link>
            <Link href="/bulk" className="bg-surface border border-outline-variant text-primary px-8 py-4 rounded-xl text-[16px] font-semibold tracking-wide hover:bg-surface-variant transition-colors flex items-center justify-center gap-2">
              <Package size={16} /> Bulk Orders
            </Link>
          </div>
        </div>
      </section>

      {/* Trust bar */}
      <section className="bg-surface border-y border-surface-variant py-6">
        <div className="max-w-container-max mx-auto px-6 md:px-margin-desktop flex flex-col md:flex-row justify-center items-center gap-6 md:gap-16">
          {[
            { icon: <Truck size={18}/>, text: 'Free Delivery on orders ₹999+' },
            { icon: <MessageCircle size={18}/>, text: 'Instant WhatsApp Support' },
            { icon: <Shield size={18}/>, text: 'Cash on Delivery Available' },
          ].map(({ icon, text }) => (
            <div key={text} className="flex items-center gap-3 text-on-surface-variant text-[13px] md:text-label-sm font-medium">
              <span className="text-primary">{icon}</span>
              <span>{text}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Categories */}
      <section className="max-w-container-max mx-auto px-6 md:px-margin-desktop py-12 md:py-20">
        <div className="flex items-end justify-between mb-8 md:mb-10">
          <div className="text-center md:text-left w-full md:w-auto">
            <p className="text-label-sm text-on-surface-variant uppercase tracking-widest mb-2">Explore</p>
            <h2 className="text-[28px] md:text-[32px] font-semibold tracking-tight text-primary">Shop by Category</h2>
          </div>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {categories.map((cat) => <CategoryCard key={cat.id} category={cat} />)}
        </div>
      </section>

      {/* Featured */}
      <section className="bg-surface-container-low py-20">
        <div className="max-w-container-max mx-auto px-6 md:px-margin-desktop">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-label-sm text-on-surface-variant uppercase tracking-widest mb-2">Handpicked</p>
              <h2 className="text-[32px] font-semibold tracking-tight text-primary">Featured Products</h2>
            </div>
            <Link href="/category/home" className="text-label-sm text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1">
              View All <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {featured.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* IKEA Spotlight */}
      <section className="max-w-container-max mx-auto px-6 md:px-margin-desktop py-20">
        <div className="bg-surface-container-low rounded-2xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="relative min-h-[300px] img-zoom">
              <Image src="https://picsum.photos/seed/ikea-spot/800/600" alt="IKEA Deals" fill className="object-cover" />
            </div>
            <div className="p-10 md:p-16 flex flex-col justify-center">
              <p className="text-label-sm text-on-surface-variant uppercase tracking-widest mb-3">Exclusive Deals</p>
              <h2 className="text-[36px] font-semibold tracking-tight text-primary leading-tight">IKEA Finds at Unbeatable Prices</h2>
              <p className="text-body-md text-on-surface-variant mt-4 mb-8">Authentic IKEA products — furniture, storage, lighting and more. Delivered to your door. Order via WhatsApp.</p>
              <Link href="/category/ikea" className="self-start bg-primary text-on-primary px-6 py-3 rounded-xl text-label-sm font-semibold hover:opacity-90 transition-opacity flex items-center gap-2">
                Shop IKEA <ArrowRight size={16} />
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 p-6 border-t border-surface-variant">
            {ikea.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* Our Products */}
      <section className="bg-surface-container-low py-20">
        <div className="max-w-container-max mx-auto px-6 md:px-margin-desktop">
          <div className="flex items-end justify-between mb-10">
            <div>
              <p className="text-label-sm text-on-surface-variant uppercase tracking-widest mb-2">bymoe Originals</p>
              <h2 className="text-[32px] font-semibold tracking-tight text-primary">Our Products</h2>
            </div>
            <Link href="/category/our-products" className="text-label-sm text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1">View All <ArrowRight size={14}/></Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {ours.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* Bulk CTA */}
      <section className="max-w-container-max mx-auto px-6 md:px-margin-desktop py-20">
        <div className="bg-primary text-on-primary rounded-2xl p-10 md:p-16 text-center">
          <p className="text-label-sm uppercase tracking-widest opacity-60 mb-4">For Businesses</p>
          <h2 className="text-[36px] font-semibold tracking-tight mb-4">Bulk Orders Welcome</h2>
          <p className="text-body-lg opacity-70 max-w-xl mx-auto mb-10">Offices, cafes, designers — get bulk pricing on any product. Direct, fast, and transparent via WhatsApp.</p>
          <a href={getBulkWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-wa-green text-white px-8 py-4 rounded-xl text-[16px] font-semibold hover:bg-wa-green-dark transition-colors">
            <MessageCircle size={20} /> Chat for Bulk Pricing
          </a>
        </div>
      </section>
    </main>
  );
}
