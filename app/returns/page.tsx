import { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Returns & Refunds Policy | bymoe',
  description: "Read bymoe's returns and refund policy. Easy returns initiated via WhatsApp. Customer satisfaction is our priority.",
};

export default function ReturnsPage() {
  return (
    <main className="pt-32 pb-20 max-w-4xl mx-auto px-6">
      <h1 className="text-[32px] md:text-[48px] font-semibold text-primary mb-8 uppercase tracking-tight">Returns & Refunds</h1>
      <div className="prose prose-lg max-w-none text-on-surface-variant space-y-6">
        <p>At bymoe, customer satisfaction is our priority. If you're not happy with your purchase, we're here to help.</p>
        <h2 className="text-[20px] font-semibold text-primary">Easy 7-Day Returns</h2>
        <p>You can initiate a return within 7 days of receiving your order by contacting us on WhatsApp. Items must be unused and in their original packaging.</p>
        <h2 className="text-[20px] font-semibold text-primary">Refunds</h2>
        <p>Once your return is received and inspected, we will process your refund back to your original payment method or UPI.</p>
      </div>
    </main>
  );
}
