import Link from 'next/link';
import Image from 'next/image';
import { Product } from '@/lib/products';
import AddToCartButton from './AddToCartButton';

interface Props { product: Product; }

export default function ProductCard({ product }: Props) {
  const { name, slug, price, originalPrice, discount, image, inStock, category } = product;

  return (
    <div className="product-card group rounded-xl overflow-hidden bg-surface-container-lowest border border-surface-variant/50">
      <Link href={`/product/${slug}`} className="block">
        <div className="relative overflow-hidden aspect-square bg-[#F9F9F9] img-zoom">
          <Image src={image} alt={name} fill className="object-contain p-4" sizes="(max-width:768px) 50vw, 25vw" loading="lazy" />
          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-1.5">
            {!inStock && (
              <span className="bg-primary text-on-primary text-[11px] font-semibold px-2.5 py-1 rounded-full">Sold Out</span>
            )}
            {inStock && discount > 0 && (
              <span className="bg-sale-orange text-white text-[11px] font-semibold px-2.5 py-1 rounded-full">{discount}% OFF</span>
            )}
          </div>
        </div>
      </Link>
      <div className="p-4">
        <Link href={`/product/${slug}`}>
          <p className="text-label-sm text-on-surface-variant uppercase mb-1">{category.replace('-', ' ')}</p>
          <h3 className="text-body-md font-semibold text-primary leading-tight line-clamp-2 hover:underline underline-offset-2">{name}</h3>
        </Link>
        <div className="flex items-center justify-between mt-3">
          <div className="flex items-baseline gap-2">
            <span className="text-body-lg font-semibold text-primary">₹{price.toLocaleString('en-IN')}</span>
            {originalPrice > price && (
              <span className="text-label-sm text-outline-variant line-through">₹{originalPrice.toLocaleString('en-IN')}</span>
            )}
          </div>
        </div>
        <div className="mt-3">
          <AddToCartButton product={product} />
        </div>
      </div>
    </div>
  );
}
