'use client';
import { useState, useEffect } from 'react';
import { useCartStore } from '@/store/cartStore';
import { getOrderWhatsAppUrl, UserDetails } from '@/lib/whatsapp';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowLeft, MessageCircle, Shield, Loader2 } from 'lucide-react';

export default function CheckoutPage() {
  const { items, totalAmount, clearCart } = useCartStore();
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [formData, setFormData] = useState<UserDetails>({
    name: '',
    phone: '',
    email: '',
    address: '',
    pincode: '',
  });

  const [errors, setErrors] = useState<Partial<UserDetails>>({});

  useEffect(() => {
    setMounted(true);
    useCartStore.persist.rehydrate();
    
    // Load saved details from localStorage
    const savedDetails = localStorage.getItem('bymoe_user_details');
    if (savedDetails) {
      try {
        setFormData(JSON.parse(savedDetails));
      } catch (e) {
        console.error('Failed to parse saved details');
      }
    }
  }, []);

  if (!mounted) return null;

  if (items.length === 0 && !loading) {
    return (
      <main className="pt-32 pb-20 max-w-container-max mx-auto px-6 text-center">
        <h1 className="text-[32px] font-semibold text-primary mb-4">Your cart is empty</h1>
        <p className="text-on-surface-variant mb-8">Add some products to your cart before checking out.</p>
        <Link href="/" className="inline-flex items-center gap-2 bg-primary text-white px-8 py-4 rounded-xl font-semibold">
          <ArrowLeft size={18} /> Back to Shopping
        </Link>
      </main>
    );
  }

  const validate = () => {
    const newErrors: Partial<UserDetails> = {};
    if (!formData.name.trim()) newErrors.name = 'Full name is required';
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone number is required';
    } else if (!/^\d{10,12}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid phone number';
    }
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }
    if (!formData.address.trim()) newErrors.address = 'Full address is required';
    if (!formData.pincode.trim()) {
      newErrors.pincode = 'Pincode is required';
    } else if (!/^\d{6}$/.test(formData.pincode)) {
      newErrors.pincode = 'Please enter a valid 6-digit pincode';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name as keyof UserDetails]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setLoading(true);
    
    // Save to localStorage for future use
    localStorage.setItem('bymoe_user_details', JSON.stringify(formData));

    // Simulate "Preparing order"
    await new Promise(resolve => setTimeout(resolve, 1500));

    const url = getOrderWhatsAppUrl(
      items.map(i => ({ name: i.name, quantity: i.quantity, price: i.price })),
      formData
    );

    window.open(url, '_blank');
    setLoading(false);
  };

  const total = totalAmount();

  return (
    <main className="pt-32 pb-20 max-w-container-max mx-auto px-6 md:px-margin-desktop">
      <div className="flex items-center gap-2 mb-8">
        <Link href="/" className="text-on-surface-variant hover:text-primary transition-colors flex items-center gap-1.5 text-label-sm uppercase tracking-wider font-semibold">
          <ArrowLeft size={16} /> Back to Shop
        </Link>
      </div>

      <h1 className="text-[32px] md:text-[40px] font-semibold tracking-tight text-primary mb-10">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left: Form */}
        <div className="lg:col-span-7">
          <div className="bg-surface-container-lowest rounded-2xl p-6 md:p-10 border border-surface-variant/50 shadow-card">
            <h2 className="text-[20px] font-semibold text-primary mb-8">Personal Details</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label className="text-[13px] font-semibold text-on-surface-variant/70 uppercase tracking-wider ml-1">Full Name</label>
                  <input
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="e.g. John Doe"
                    className={`w-full bg-surface-container-low border ${errors.name ? 'border-error' : 'border-surface-variant'} rounded-xl px-5 py-4 outline-none focus:border-primary transition-colors text-body-md`}
                  />
                  {errors.name && <span className="text-[12px] text-error ml-1">{errors.name}</span>}
                </div>
                <div className="flex flex-col gap-2">
                  <label className="text-[13px] font-semibold text-on-surface-variant/70 uppercase tracking-wider ml-1">Phone Number</label>
                  <input
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="e.g. 9876543210"
                    className={`w-full bg-surface-container-low border ${errors.phone ? 'border-error' : 'border-surface-variant'} rounded-xl px-5 py-4 outline-none focus:border-primary transition-colors text-body-md`}
                  />
                  {errors.phone && <span className="text-[12px] text-error ml-1">{errors.phone}</span>}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-semibold text-on-surface-variant/70 uppercase tracking-wider ml-1">Email Address</label>
                <input
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="e.g. john@email.com"
                  className={`w-full bg-surface-container-low border ${errors.email ? 'border-error' : 'border-surface-variant'} rounded-xl px-5 py-4 outline-none focus:border-primary transition-colors text-body-md`}
                />
                {errors.email && <span className="text-[12px] text-error ml-1">{errors.email}</span>}
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-[13px] font-semibold text-on-surface-variant/70 uppercase tracking-wider ml-1">Full Address</label>
                <textarea
                  name="address"
                  rows={3}
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Street name, apartment, area..."
                  className={`w-full bg-surface-container-low border ${errors.address ? 'border-error' : 'border-surface-variant'} rounded-xl px-5 py-4 outline-none focus:border-primary transition-colors text-body-md resize-none`}
                />
                {errors.address && <span className="text-[12px] text-error ml-1">{errors.address}</span>}
              </div>

              <div className="flex flex-col gap-2 md:w-1/2">
                <label className="text-[13px] font-semibold text-on-surface-variant/70 uppercase tracking-wider ml-1">Pincode</label>
                <input
                  name="pincode"
                  value={formData.pincode}
                  onChange={handleChange}
                  placeholder="e.g. 500001"
                  className={`w-full bg-surface-container-low border ${errors.pincode ? 'border-error' : 'border-surface-variant'} rounded-xl px-5 py-4 outline-none focus:border-primary transition-colors text-body-md`}
                />
                {errors.pincode && <span className="text-[12px] text-error ml-1">{errors.pincode}</span>}
              </div>

              <div className="pt-4 hidden lg:block">
                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full bg-wa-green text-white rounded-xl py-5 px-6 flex items-center justify-center gap-3 hover:bg-wa-green-dark transition-colors shadow-sm disabled:opacity-70"
                >
                  {loading ? (
                    <>
                      <Loader2 size={22} className="animate-spin" />
                      <span className="text-[16px] font-bold tracking-wide">Preparing your order...</span>
                    </>
                  ) : (
                    <>
                      <MessageCircle size={22} />
                      <span className="text-[16px] font-bold tracking-wide">Confirm & Continue to WhatsApp</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right: Summary */}
        <div className="lg:col-span-5">
          <div className="bg-surface-bright rounded-2xl p-6 md:p-8 border border-surface-variant/50 sticky top-32">
            <h2 className="text-[20px] font-semibold text-primary mb-6">Order Summary</h2>
            
            <div className="space-y-4 mb-8 max-h-[40vh] overflow-y-auto pr-2 custom-scrollbar">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 items-center">
                  <div className="w-16 h-16 bg-surface-container-low rounded-lg overflow-hidden shrink-0">
                    <Image src={item.image} alt={item.name} width={64} height={64} className="w-full h-full object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-body-md font-semibold text-primary truncate pr-2">{item.name}</p>
                    <p className="text-label-sm text-on-surface-variant mt-0.5">Qty: {item.quantity} × ₹{item.price.toLocaleString('en-IN')}</p>
                  </div>
                  <span className="text-body-md font-bold text-primary">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                </div>
              ))}
            </div>

            <div className="space-y-3 pt-6 border-t border-surface-variant/50 mb-8">
              <div className="flex justify-between text-on-surface-variant">
                <span>Subtotal</span>
                <span>₹{total.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between text-on-surface-variant">
                <span>Delivery</span>
                <span className="text-secondary font-medium">{total >= 999 ? 'FREE' : '₹99'}</span>
              </div>
              <div className="flex justify-between items-center pt-3 mt-3 border-t border-surface-variant">
                <span className="text-body-lg font-bold text-primary">Total Amount</span>
                <span className="text-[28px] font-bold text-primary tracking-tight">₹{(total >= 999 ? total : total + 99).toLocaleString('en-IN')}</span>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              <div className="bg-secondary/5 rounded-xl p-4 border border-secondary/10 flex items-center gap-3">
                <Shield size={20} className="text-secondary" />
                <div>
                  <p className="text-label-sm font-bold text-secondary uppercase tracking-wider">Secure Store</p>
                  <p className="text-[12px] text-on-surface-variant">Your details are only used for delivery.</p>
                </div>
              </div>
            </div>

            {/* Sticky Mobile Button */}
            <div className="lg:hidden fixed bottom-0 left-0 w-full p-4 bg-white border-t border-surface-variant shadow-[0_-10px_40px_rgba(0,0,0,0.05)] z-50">
              <button 
                onClick={handleSubmit}
                disabled={loading}
                className="w-full bg-wa-green text-white rounded-xl py-4 px-6 flex items-center justify-center gap-3 hover:bg-wa-green-dark transition-colors shadow-sm disabled:opacity-70"
              >
                {loading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    <span className="text-label-sm font-bold tracking-wider uppercase">Preparing...</span>
                  </>
                ) : (
                  <>
                    <MessageCircle size={20} />
                    <span className="text-label-sm font-bold tracking-wider uppercase">Continue to WhatsApp</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
