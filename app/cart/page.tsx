'use client';
import { useCartStore } from '@/store/cartStore';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Minus, Plus, X, ShoppingBag, ArrowRight, MessageCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { getCartOrderNoDetailsUrl } from '@/lib/whatsapp';

export default function CartPage() {
  const { items, removeItem, updateQuantity, clearCart, totalAmount, totalItems } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => { setMounted(true); useCartStore.persist.rehydrate(); }, []);
  if (!mounted) return null;

  const total = totalAmount();
  const count = totalItems();

  const handleCheckout = () => {
    const url = getCartOrderNoDetailsUrl(
      items.map(i => ({ name: i.name, quantity: i.quantity, price: i.price }))
    );
    window.open(url, '_blank');
  };

  return (
    <main className="pt-32 pb-20 min-h-screen">
      <div className="max-w-container-max mx-auto px-6 md:px-margin-desktop">
        <div className="mb-10">
          <h1 className="text-[32px] font-semibold tracking-tight text-primary">Shopping Cart</h1>
          <p className="text-body-md text-on-surface-variant mt-1">Review your items before WhatsApp checkout.</p>
        </div>

        {items.length === 0 ? (
          <div className="text-center py-24 flex flex-col items-center gap-6">
            <ShoppingBag size={56} strokeWidth={1} className="text-on-surface-variant" />
            <p className="text-body-lg text-on-surface-variant">Your cart is empty</p>
            <Link href="/" className="bg-primary text-on-primary px-6 py-3 rounded-xl text-label-sm font-semibold hover:opacity-90 transition-opacity">Continue Shopping</Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
            {/* Items */}
            <div className="lg:col-span-8 flex flex-col gap-6">
              {items.map(item => (
                <div key={item.id} className="flex flex-col sm:flex-row items-start sm:items-center bg-surface-container-lowest rounded-xl p-6 shadow-card border border-surface-variant/50 group">
                  <div className="w-full sm:w-32 h-32 bg-surface-container-low rounded-lg overflow-hidden shrink-0 mb-4 sm:mb-0 sm:mr-6">
                    <Image src={item.image} alt={item.name} width={128} height={128} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                  </div>
                  <div className="flex-grow">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="text-body-lg font-semibold text-primary">{item.name}</h3>
                        <p className="text-label-sm text-on-surface-variant mt-0.5">₹{item.price.toLocaleString('en-IN')} each</p>
                      </div>
                      <button onClick={() => removeItem(item.id)} className="text-outline hover:text-error transition-colors p-1">
                        <X size={18} />
                      </button>
                    </div>
                    <div className="flex justify-between items-end mt-6">
                      <div className="flex items-center border border-outline-variant rounded-full p-1 bg-surface-bright">
                        <button onClick={() => updateQuantity(item.id, item.quantity-1)} className="w-8 h-8 flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low rounded-full transition-colors">
                          <Minus size={14} />
                        </button>
                        <span className="text-label-sm w-8 text-center text-primary font-semibold">{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.quantity+1)} className="w-8 h-8 flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low rounded-full transition-colors">
                          <Plus size={14} />
                        </button>
                      </div>
                      <span className="text-body-lg font-semibold text-primary">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>
              ))}
              <button onClick={clearCart} className="text-label-sm text-on-surface-variant hover:text-error transition-colors self-start">Clear Cart</button>
            </div>

            {/* Summary */}
            <div className="lg:col-span-4">
              <div className="bg-surface-container-low rounded-xl p-8 sticky top-28 shadow-sticky space-y-6">
                <h2 className="text-[24px] font-semibold text-primary">Order Summary</h2>
                <div className="space-y-4">
                  <div className="flex justify-between text-body-md text-on-surface-variant">
                    <span>Subtotal ({count} item{count!==1?'s':''})</span>
                    <span>₹{total.toLocaleString('en-IN')}</span>
                  </div>
                  <div className="flex justify-between text-body-md text-on-surface-variant">
                    <span>Shipping</span>
                    <span className="text-secondary font-medium">Free</span>
                  </div>
                </div>
                <div className="border-t border-outline-variant/30 pt-6">
                  <div className="flex justify-between items-end mb-8">
                    <span className="text-body-lg text-primary font-medium">Estimated Total</span>
                    <span className="text-[32px] font-semibold text-primary tracking-tight">₹{total.toLocaleString('en-IN')}</span>
                  </div>
                  
                  <button onClick={handleCheckout} className="w-full bg-wa-green text-white rounded-xl py-4 px-6 flex items-center justify-center gap-3 hover:bg-wa-green-dark transition-colors shadow-sm group">
                    <MessageCircle size={22} />
                    <span className="text-[16px] font-bold tracking-wide">Order on WhatsApp</span>
                    <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
                <p className="text-[13px] text-center text-on-surface-variant opacity-80">Secure, instant support from our team.</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
