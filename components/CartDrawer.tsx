'use client';
import { useCartStore } from '@/store/cartStore';
import { getOrderWhatsAppUrl, getCartOrderNoDetailsUrl } from '@/lib/whatsapp';
import Image from 'next/image';
import { X, Minus, Plus, ShoppingBag, ArrowRight, Shield, MessageCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalAmount, totalItems } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
    useCartStore.persist.rehydrate();
  }, []);

  if (!mounted) return null;

  const total = totalAmount();
  const count = totalItems();

  const handleCheckout = () => {
    closeCart();
    const url = getCartOrderNoDetailsUrl(
      items.map(i => ({ name: i.name, quantity: i.quantity, price: i.price }))
    );
    window.open(url, '_blank');
  };

  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-40 bg-primary/20 md:backdrop-blur-sm transition-opacity duration-300" 
          onClick={closeCart} 
        />
      )}

      {/* Drawer */}
      <div 
        className={`fixed right-0 top-0 h-full w-full max-w-md bg-surface z-50 flex flex-col shadow-modal transition-all duration-300 ease-[cubic-bezier(0.32,0,0.67,0)] will-change-transform ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-surface-variant">
          <div>
            <h2 className="text-[24px] font-semibold tracking-tight text-primary">Shopping Cart</h2>
            <p className="text-label-sm text-on-surface-variant mt-0.5">{count} item{count !== 1 ? 's' : ''}</p>
          </div>
          <button onClick={closeCart} className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-on-surface-variant hover:bg-surface-variant transition-colors">
            <X size={18} />
          </button>
        </div>

        {/* Items */}
        <div className="flex-1 overflow-y-auto p-6 space-y-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full gap-4 text-on-surface-variant">
              <ShoppingBag size={48} strokeWidth={1} />
              <p className="text-body-md">Your cart is empty</p>
            </div>
          ) : (
            items.map((item) => (
              <div key={item.id} className="flex gap-4 bg-surface-container-lowest rounded-xl p-4 shadow-card border border-surface-variant/50 group">
                <div className="w-20 h-20 bg-surface-container-low rounded-lg overflow-hidden shrink-0">
                  <Image src={item.image} alt={item.name} width={80} height={80} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-start">
                    <p className="text-body-md font-semibold text-primary leading-tight truncate pr-2">{item.name}</p>
                    <button onClick={() => removeItem(item.id)} className="text-outline hover:text-error transition-colors shrink-0">
                      <X size={16} />
                    </button>
                  </div>
                  <p className="text-label-sm text-on-surface-variant mt-1">₹{item.price.toLocaleString('en-IN')}</p>
                  <div className="flex items-center justify-between mt-3">
                    <div className="flex items-center border border-outline-variant rounded-full p-1 bg-surface-bright">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-7 h-7 flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low rounded-full transition-colors">
                        <Minus size={14} />
                      </button>
                      <span className="text-label-sm w-7 text-center text-primary font-semibold">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-7 h-7 flex items-center justify-center text-on-surface-variant hover:bg-surface-container-low rounded-full transition-colors">
                        <Plus size={14} />
                      </button>
                    </div>
                    <span className="text-body-md font-semibold text-primary">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="p-6 border-t border-surface-variant bg-surface-bright space-y-4">
            <div className="flex justify-between items-center mb-2">
              <span className="text-body-lg text-primary font-medium">Total</span>
              <span className="text-[24px] font-semibold text-primary tracking-tight">₹{total.toLocaleString('en-IN')}</span>
            </div>
            
            <button onClick={handleCheckout} className="w-full bg-wa-green text-white rounded-xl py-4 px-6 flex items-center justify-center gap-3 hover:bg-wa-green-dark transition-colors shadow-sm group">
              <MessageCircle size={20} />
              <span className="text-label-sm font-semibold tracking-wider">Order on WhatsApp</span>
              <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="flex items-center justify-center gap-4 mt-4 text-[11px] font-semibold text-on-surface-variant opacity-60 uppercase tracking-widest">
              <span className="flex items-center gap-1.5"><Shield size={12}/> Secure SSL</span>
              <span className="flex items-center gap-1.5"><Shield size={12}/> Certified Store</span>
            </div>
          </div>
        )}
      </div>


    </>
  );
}
