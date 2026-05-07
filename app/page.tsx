import Link from 'next/link';
import Image from 'next/image';
import { categories } from '@/lib/categories';
import { getFeaturedProducts, getIKEAProducts, getOurProducts } from '@/lib/products';
import CategoryCard from '@/components/CategoryCard';
import ProductCard from '@/components/ProductCard';
import { MessageCircle, ArrowRight, Package, Truck, Shield } from 'lucide-react';
import { getBulkWhatsAppUrl } from '@/lib/whatsapp';

const CHIPS = [
  { label: 'IKEA Deals', href: '/category/ikea' },
  { label: 'Fashion', href: '/category/men' },
  { label: 'Home', href: '/category/home' },
  { label: 'Bulk Orders', href: '/bulk' },
  { label: 'New Arrivals', href: '/category/our-products' },
];

export default function HomePage() {
  const featured = getFeaturedProducts();
  const ikea = getIKEAProducts().slice(0, 4);
  const ours = getOurProducts().slice(0, 4);

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="relative min-h-[80vh] md:min-h-[90vh] flex items-center bg-[#f0ede8] md:bg-surface-container-low overflow-hidden">
        {/* Desktop Video/Image */}
        <div className="hidden md:block absolute inset-0 img-zoom">
          <Image 
            src="https://picsum.photos/seed/hero-bymoe/1400/900" 
            alt="bymoe hero" 
            fill 
            className="object-cover opacity-30" 
            priority 
          />
        </div>
        
        {/* Mobile Static Image */}
        <div className="md:hidden absolute inset-0">
          <Image 
            src="https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?auto=format&fit=crop&q=80&w=1000" 
            alt="bymoe mobile hero" 
            fill 
            className="object-cover" 
            priority 
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>

        <div className="relative z-10 max-w-container-max mx-auto px-6 md:px-margin-desktop pt-24 md:pt-60 pb-12 md:pb-20 text-center md:text-left flex flex-col items-center md:items-start">
          <p className="text-[14px] font-semibold text-white md:text-on-surface-variant uppercase tracking-widest mb-4">New Collection 2026</p>
          <h1 className="text-[32px] md:text-[72px] font-bold md:font-semibold tracking-tight text-white md:text-primary leading-tight md:leading-[1.1] max-w-2xl">
            Curated for the<br className="md:hidden" />way you live.
          </h1>
          <p className="text-[14px] md:text-body-lg text-white/85 md:text-on-surface-variant mt-4 md:mt-6 max-w-lg">
            Premium fashion, home essentials, IKEA deals — all in one place. Order instantly via WhatsApp.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 mt-8 md:mt-10 w-full sm:w-auto items-center md:items-start">
            <Link href="/category/home" className="w-full sm:w-auto max-w-[280px] bg-black md:bg-primary text-white md:text-on-primary px-8 py-4 rounded-xl text-[16px] font-semibold tracking-wide hover:opacity-90 transition-opacity flex items-center justify-center gap-2">
              Shop Now <ArrowRight size={16} />
            </Link>
            <Link href="/bulk" className="w-full sm:w-auto max-w-[280px] bg-white text-black border border-black/10 md:border-outline-variant px-8 py-4 rounded-xl text-[16px] font-semibold tracking-wide hover:bg-surface-variant transition-colors flex items-center justify-center gap-2">
              <Package size={16} /> Bulk Orders
            </Link>
          </div>
        </div>
      </section>

      {/* Category Chips - Mobile Only */}
      <section className="md:hidden bg-white py-3 overflow-hidden border-b border-[#eee] sticky top-16 z-40">
        <div className="flex gap-2 px-4 overflow-x-auto hide-scrollbar snap-x">
          {CHIPS.map(chip => (
            <Link key={chip.label} href={chip.href} className="category-chip">
              {chip.label}
            </Link>
          ))}
        </div>
      </section>

      {/* Trust bar */}
      <section className="bg-surface border-b border-surface-variant py-6">
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

      {/* Featured */}
      <section className="bg-surface-container-low py-12 md:py-20">
        <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop">
          <div className="flex items-end justify-between mb-8 md:mb-10">
            <div>
              <p className="text-label-sm text-on-surface-variant uppercase tracking-widest mb-2">Handpicked</p>
              <h2 className="text-[24px] md:text-[32px] font-semibold tracking-tight text-primary">Featured Products</h2>
            </div>
            <Link href="/category/all" className="text-[13px] font-medium text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1">
              View All <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {featured.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* IKEA Spotlight */}
      <section className="max-w-container-max mx-auto px-4 md:px-margin-desktop py-12 md:py-20">
        <div className="bg-surface-container-low rounded-2xl overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-2">
            <div className="relative min-h-[240px] md:min-h-[300px]">
              <Image src="https://picsum.photos/seed/ikea-spot/800/600" alt="IKEA Deals" fill className="object-cover" loading="lazy" />
            </div>
            <div className="p-8 md:p-16 flex flex-col justify-center">
              <p className="text-label-sm text-on-surface-variant uppercase tracking-widest mb-3">Exclusive Deals</p>
              <h2 className="text-[28px] md:text-[36px] font-semibold tracking-tight text-primary leading-tight">IKEA Finds at Unbeatable Prices</h2>
              <p className="text-body-md text-on-surface-variant mt-4 mb-8">Authentic IKEA products — furniture, storage, lighting and more. Delivered to your door. Order via WhatsApp.</p>
              <Link href="/category/ikea" className="self-start bg-primary text-on-primary px-6 py-3 rounded-xl text-label-sm font-semibold hover:opacity-90 transition-opacity flex items-center gap-2">
                Shop IKEA <ArrowRight size={16} />
              </Link>
            </div>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6 p-4 md:p-6 border-t border-surface-variant">
            {ikea.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* Our Products */}
      <section className="bg-surface-container-low py-12 md:py-20">
        <div className="max-w-container-max mx-auto px-4 md:px-margin-desktop">
          <div className="flex items-end justify-between mb-8 md:mb-10">
            <div>
              <p className="text-label-sm text-on-surface-variant uppercase tracking-widest mb-2">bymoe Originals</p>
              <h2 className="text-[24px] md:text-[32px] font-semibold tracking-tight text-primary">Our Products</h2>
            </div>
            <Link href="/category/our-products" className="text-[13px] font-medium text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1">View All <ArrowRight size={14}/></Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {ours.map((p) => <ProductCard key={p.id} product={p} />)}
          </div>
        </div>
      </section>

      {/* Bulk CTA */}
      <section className="max-w-container-max mx-auto px-4 md:px-margin-desktop py-12 md:py-20">
        <div className="bg-primary text-on-primary rounded-2xl p-8 md:p-16 text-center">
          <p className="text-label-sm uppercase tracking-widest opacity-60 mb-4">For Businesses</p>
          <h2 className="text-[28px] md:text-[36px] font-semibold tracking-tight mb-4">Bulk Orders Welcome</h2>
          <p className="text-body-md md:text-body-lg opacity-70 max-w-xl mx-auto mb-10">Offices, cafes, designers — get bulk pricing on any product. Direct, fast, and transparent via WhatsApp.</p>
          <a href={getBulkWhatsAppUrl()} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-3 bg-wa-green text-white px-8 py-4 rounded-xl text-[16px] font-semibold hover:bg-wa-green-dark transition-colors">
            <MessageCircle size={20} /> Chat for Bulk Pricing
          </a>
        </div>
      </section>
    </main>
  );
}
