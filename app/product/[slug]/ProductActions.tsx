'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCartStore } from '@/store/cartStore';
import { Product } from '@/lib/products';
import { ShoppingCart, Minus, Plus } from 'lucide-react';

export default function ProductActions({ product }: { product: Product }) {
  const [qty, setQty] = useState(1);
  const { addItem } = useCartStore();
  const router = useRouter();

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) {
      addItem({ id: product.id, name: product.name, slug: product.slug, price: product.price, image: product.image });
    }
  };

  const handleWhatsApp = () => {
    // Add to cart and redirect to checkout for a structured flow
    handleAddToCart();
    router.push('/checkout');
  };

  return (
    <div className="flex flex-col gap-4">
      {/* Qty */}
      <div className="flex items-center justify-between bg-surface-variant rounded-xl p-1 w-32 border border-transparent hover:border-outline-variant transition-colors">
        <button onClick={() => setQty(Math.max(1, qty-1))} className="p-2 text-on-surface-variant hover:text-primary transition-colors">
          <Minus size={16} />
        </button>
        <span className="text-body-md font-semibold w-8 text-center">{qty}</span>
        <button onClick={() => setQty(qty+1)} className="p-2 text-on-surface-variant hover:text-primary transition-colors">
          <Plus size={16} />
        </button>
      </div>

      {/* Buttons */}
      <div className="flex gap-4">
        <button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className="flex-1 bg-white border border-outline-variant text-primary rounded-xl py-4 text-[16px] font-semibold hover:bg-surface-variant transition-colors flex items-center justify-center gap-2 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ShoppingCart size={18} />
          {product.inStock ? 'Add to Cart' : 'Sold Out'}
        </button>
        <button
          onClick={handleWhatsApp}
          disabled={!product.inStock}
          className="flex-1 bg-primary text-white rounded-xl py-4 text-[16px] font-semibold hover:opacity-90 transition-opacity flex items-center justify-center gap-2 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <ShoppingCart size={18} />
          Buy Now
        </button>
      </div>

      {/* Mobile sticky bar */}
      {product.inStock && (
        <div className="fixed bottom-0 left-0 right-0 md:hidden z-40 p-4 bg-surface/80 backdrop-blur-[12px] border-t border-surface-variant">
          <button onClick={handleWhatsApp} className="w-full bg-primary text-white rounded-xl py-4 text-[16px] font-semibold flex items-center justify-center gap-2">
            <ShoppingCart size={18} /> Buy Now — ₹{product.price.toLocaleString('en-IN')}
          </button>
        </div>
      )}
    </div>
  );
}
