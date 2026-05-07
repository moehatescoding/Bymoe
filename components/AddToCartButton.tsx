'use client';
import { useCartStore } from '@/store/cartStore';
import { Product } from '@/lib/products';
import { ShoppingCart } from 'lucide-react';

export default function AddToCartButton({ product }: { product: Product }) {
  const { addItem } = useCartStore();

  if (!product.inStock) {
    return (
      <button disabled className="w-full py-2.5 rounded-xl border border-surface-variant text-on-surface-variant text-label-sm font-semibold cursor-not-allowed opacity-60">
        Sold Out
      </button>
    );
  }

  return (
    <button
      onClick={() => addItem({ id: product.id, name: product.name, slug: product.slug, price: product.price, image: product.image })}
      className="w-full py-2 md:py-2.5 rounded-xl border border-outline-variant text-primary text-label-sm font-semibold hover:bg-surface-container-low transition-colors flex items-center justify-center gap-2"
    >
      <ShoppingCart size={14} />
      Add to Cart
    </button>
  );
}
