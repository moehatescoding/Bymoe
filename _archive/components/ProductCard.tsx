'use client';
import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/products';
import AddToCartButton from './AddToCartButton';
import { MessageCircle, Share2, Check } from 'lucide-react';
import { getSingleOrderUrl } from '@/lib/whatsapp';

interface Props { product: Product; }

export default function ProductCard({ product }: Props) {
  const { name, slug, price, originalPrice, discount, image, inStock, category } = product;
  const [copied, setCopied] = useState(false);

  const handleShare = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const url = `${typeof window !== 'undefined' ? window.location.origin : 'https://bymoe.in'}/product/${slug}`;
    if (navigator.share) {
      try {
        await navigator.share({ title: name, url });
      } catch {/* user cancelled */}
    } else {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="product-card group rounded-xl md:rounded-xl overflow-hidden bg-surface-container-lowest border border-surface-variant/50 shadow-[0_2px_8px_rgba(0,0,0,0.06)] md:shadow-card transition-all duration-300">
      <Link href={`/product/${slug}`} className="block">
        <div className="relative overflow-hidden aspect-square bg-[#F9F9F9] md:img-zoom">
          <Image 
            src={image} 
            alt={name} 
            fill 
            className="object-cover md:object-contain p-0 md:p-4" 
            sizes="(max-width:768px) 50vw, 25vw" 
            loading="lazy" 
          />
          {/* Badges */}
          <div className="absolute top-2 left-2 md:top-3 md:left-3 flex flex-col gap-1.5">
            {!inStock && (
              <span className="bg-primary text-on-primary text-[10px] md:text-[11px] font-semibold px-2 py-0.5 md:px-2.5 md:py-1 rounded-full">Sold Out</span>
            )}
            {inStock && discount > 0 && (
              <span className="bg-sale-orange text-white text-[10px] md:text-[11px] font-semibold px-2 py-0.5 md:px-2.5 md:py-1 rounded-full">{discount}% OFF</span>
            )}
          </div>
        </div>
      </Link>

      <div className="p-3 md:p-4 flex flex-col flex-1">
        <Link href={`/product/${slug}`} className="flex-1">
          <p className="hidden md:block text-label-sm text-on-surface-variant uppercase mb-1">{category.replace('-', ' ')}</p>
          <h3 className="text-[13px] md:text-body-md font-normal md:font-semibold text-primary leading-tight line-clamp-2 md:group-hover:underline underline-offset-2">
            {name}
          </h3>
        </Link>

        <div className="flex items-center justify-between mt-2 md:mt-3">
          <div className="flex items-baseline gap-1.5 md:gap-2">
            <span className="text-[15px] md:text-body-lg font-semibold text-primary">₹{price.toLocaleString('en-IN')}</span>
            {originalPrice > price && (
              <span className="text-[12px] md:text-label-sm text-on-surface-variant/50 line-through">₹{originalPrice.toLocaleString('en-IN')}</span>
            )}
          </div>
          {/* Share Button */}
          <button
            onClick={handleShare}
            aria-label="Share product"
            className="p-1.5 rounded-full text-on-surface-variant/60 hover:text-primary hover:bg-black/5 transition-all duration-200 relative"
          >
            {copied ? (
              <>
                <Check size={15} className="text-green-600" />
                <span className="absolute -top-7 left-1/2 -translate-x-1/2 bg-black/80 text-white text-[10px] px-2 py-0.5 rounded whitespace-nowrap">Copied!</span>
              </>
            ) : (
              <Share2 size={15} />
            )}
          </button>
        </div>

        {/* Desktop Button */}
        <div className="hidden md:block mt-3">
          <AddToCartButton product={product} />
        </div>

        {/* Mobile WhatsApp Button */}
        <div className="md:hidden mt-3">
          <a
            href={getSingleOrderUrl(name, price, 1)}
            target="_blank"
            rel="noopener noreferrer"
            className={`w-full h-10 bg-wa-green text-white rounded-lg flex items-center justify-center gap-2 text-[14px] font-semibold transition-colors ${!inStock ? 'opacity-50 pointer-events-none' : 'hover:bg-wa-green-dark'}`}
          >
            <MessageCircle size={16} />
            {inStock ? 'Order on WhatsApp' : 'Sold Out'}
          </a>
        </div>
      </div>
    </div>
  );
}
