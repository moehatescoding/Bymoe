'use client';
import { useState } from 'react';
import { useCartStore } from '@/store/cartStore';
import { Product } from '@/lib/products';
import { getProductDetailUrl, getSingleOrderUrl } from '@/lib/whatsapp';
import { ShoppingCart, MessageCircle, Minus, Plus } from 'lucide-react';

export default function ProductActions({ product }: { product: Product }) {
  const [qty, setQty] = useState(1);
  const { addItem } = useCartStore();

  const handleAddToCart = () => {
    for (let i = 0; i < qty; i++) {
      addItem({ id: product.id, name: product.name, slug: product.slug, price: product.price, image: product.image });
    }
  };

  const handleWhatsApp = () => {
    window.open(getSingleOrderUrl(product.name, product.price, qty), '_blank');
  };

  const handleProductDetailWA = () => {
    window.open(getProductDetailUrl(product.name, product.price), '_blank');
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
          className="flex-1 bg-wa-green text-white rounded-xl py-4 text-[16px] font-semibold hover:bg-wa-green-dark transition-colors flex items-center justify-center gap-2 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <MessageCircle size={18} />
          Buy on WhatsApp
        </button>
      </div>

      {/* Mobile sticky bar - Above Bottom Nav */}
      {product.inStock && (
        <div className="fixed bottom-[calc(64px+env(safe-area-inset-bottom))] left-0 right-0 md:hidden z-40 bg-wa-green h-14">
          <button 
            onClick={handleProductDetailWA} 
            className="w-full h-full text-white text-[15px] font-medium flex items-center justify-center gap-2"
          >
            <MessageCircle size={20} /> Order on WhatsApp
          </button>
        </div>
      )}
    </div>
  );
}
