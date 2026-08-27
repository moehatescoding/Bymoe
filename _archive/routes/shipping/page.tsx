import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Shipping Information | bymoe',
  description: "Learn about bymoe's delivery timelines, shipping charges and areas covered across Hyderabad.",
  alternates: {
    canonical: '/shipping',
  }
};

export default function ShippingPage() {
  return (
    <main className="pt-32 pb-20 max-w-4xl mx-auto px-6">
      <h1 className="text-[32px] md:text-[48px] font-semibold text-primary mb-8 uppercase tracking-tight">Shipping Information</h1>
      <div className="prose prose-lg max-w-none text-on-surface-variant space-y-6">
        <p>We deliver across Hyderabad — fast, reliable, and straight to your door.</p>
        <h2 className="text-[20px] font-semibold text-primary">Delivery Area</h2>
        <p>We currently deliver across <strong>Hyderabad</strong>. Orders are fulfilled and dispatched promptly after confirmation via WhatsApp.</p>
        <h2 className="text-[20px] font-semibold text-primary">Delivery Timelines</h2>
        <p>Standard delivery takes 1–3 business days within Hyderabad. We&apos;ll keep you updated via WhatsApp once your order is on its way.</p>
        <h2 className="text-[20px] font-semibold text-primary">Shipping Charges</h2>
        <p><strong>Free delivery</strong> on all orders above ₹999. For orders below ₹999, a flat shipping fee of <strong>₹99</strong> applies.</p>
      </div>
    </main>
  );
}
