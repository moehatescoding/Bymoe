import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shipping Information | bymoe',
  description: "Learn about bymoe's delivery timelines, shipping charges and areas covered across India.",
};

export default function ShippingPage() {
  return (
    <main className="pt-32 pb-20 max-w-4xl mx-auto px-6">
      <h1 className="text-[32px] md:text-[48px] font-semibold text-primary mb-8 uppercase tracking-tight">Shipping Information</h1>
      <div className="prose prose-lg max-w-none text-on-surface-variant space-y-6">
        <p>We strive to deliver your curated finds as fast as possible across India.</p>
        <h2 className="text-[20px] font-semibold text-primary">Delivery Timelines</h2>
        <p>Standard delivery takes 3-7 business days depending on your location. We'll provide updates via WhatsApp once your order is shipped.</p>
        <h2 className="text-[20px] font-semibold text-primary">Shipping Charges</h2>
        <p>Free delivery on all orders above ₹999. For orders below ₹999, a flat shipping fee of ₹99 applies.</p>
      </div>
    </main>
  );
}
