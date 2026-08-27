'use client';
import { useCartStore } from '@/store/cartStore';
import { getCartOrderNoDetailsUrl } from '@/lib/whatsapp';
import Image from 'next/image';
import { X, Minus, Plus, ShoppingBag, ArrowRight, MessageCircle } from 'lucide-react';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, totalAmount, totalItems } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    setMounted(true);
    useCartStore.persist.rehydrate();
    
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
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

  const variants = {
    initial: isMobile ? { y: '100%', x: 0 } : { x: '100%', y: 0 },
    animate: { x: 0, y: 0 },
    exit: isMobile ? { y: '100%', x: 0 } : { x: '100%', y: 0 }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] bg-black/40 md:backdrop-blur-[2px]" 
            onClick={closeCart} 
          />

          {/* Drawer / Bottom Sheet */}
          <motion.div 
            variants={variants}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ type: 'spring', damping: 30, stiffness: 300 }}
            drag={isMobile ? "y" : false}
            dragConstraints={{ top: 0 }}
            dragElastic={0.1}
            onDragEnd={(_, info) => {
              if (info.offset.y > 80) closeCart();
            }}
            className={
              "fixed z-[200] bg-white flex flex-col shadow-modal overflow-hidden will-change-transform " +
              "bottom-0 left-0 right-0 h-[85vh] rounded-t-[32px] md:h-full md:left-auto md:w-full md:max-w-md md:rounded-none"
            }
          >
            {/* Header */}
            <div className="relative flex items-center justify-between p-6 border-b border-[#eee]">
              {/* Drag Handle for Mobile */}
              <div className="md:hidden absolute top-3 left-1/2 -translate-x-1/2 w-10 h-1 bg-[#ddd] rounded-full" />
              
              <div>
                <h2 className="text-[20px] font-semibold tracking-tight text-primary">Shopping Cart</h2>
                <p className="text-[13px] text-on-surface-variant mt-0.5">{count} item{count !== 1 ? 's' : ''}</p>
              </div>
              <button onClick={closeCart} className="p-2 hover:bg-[#F8F8F8] rounded-full transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Items */}
            <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 overscroll-contain">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full gap-4 text-on-surface-variant">
                  <ShoppingBag size={48} strokeWidth={1} />
                  <p className="text-body-md">Your cart is empty</p>
                </div>
              ) : (
                items.map((item) => (
                  <div key={item.id} className="flex gap-4 bg-white rounded-xl p-3 border border-[#eee] shadow-[0_2px_8px_rgba(0,0,0,0.04)] group">
                    <div className="w-20 h-20 bg-[#F9F9F9] rounded-lg overflow-hidden shrink-0">
                      <Image src={item.image} alt={item.name} width={80} height={80} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex justify-between items-start">
                        <p className="text-[14px] font-semibold text-primary leading-tight truncate pr-2">{item.name}</p>
                        <button onClick={() => removeItem(item.id)} className="text-[#ccc] hover:text-error transition-colors shrink-0">
                          <X size={16} />
                        </button>
                      </div>
                      <p className="text-[13px] text-on-surface-variant mt-1">₹{item.price.toLocaleString('en-IN')}</p>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-[#eee] rounded-full p-0.5">
                          <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="w-8 h-8 flex items-center justify-center hover:bg-[#F8F8F8] rounded-full">
                            <Minus size={14} />
                          </button>
                          <span className="text-[13px] w-8 text-center font-semibold">{item.quantity}</span>
                          <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="w-8 h-8 flex items-center justify-center hover:bg-[#F8F8F8] rounded-full">
                            <Plus size={14} />
                          </button>
                        </div>
                        <span className="text-[14px] font-bold text-primary">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Footer */}
            {items.length > 0 && (
              <div className="p-6 border-t border-[#eee] bg-white space-y-4 pb-[calc(1.5rem+env(safe-area-inset-bottom))]">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-[16px] text-primary font-medium">Subtotal</span>
                  <span className="text-[24px] font-bold text-primary tracking-tight">₹{total.toLocaleString('en-IN')}</span>
                </div>
                
                <button onClick={handleCheckout} className="w-full bg-wa-green text-white rounded-xl py-4 flex items-center justify-center gap-2 hover:bg-wa-green-dark transition-colors shadow-sm font-semibold">
                  <MessageCircle size={20} />
                  Order on WhatsApp
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
