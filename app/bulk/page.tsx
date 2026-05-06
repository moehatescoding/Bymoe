import { MessageCircle, Package, Users, Building2, Coffee } from 'lucide-react';
import { getBulkWhatsAppUrl } from '@/lib/whatsapp';

export default function BulkPage() {
  const segments = [
    { icon: <Building2 size={28}/>, title: 'Offices', desc: 'Furnish your workspace with premium IKEA products at bulk pricing.' },
    { icon: <Coffee size={28}/>, title: 'Cafes & Restaurants', desc: 'Decor, furniture, kitchenware — we supply everything you need.' },
    { icon: <Users size={28}/>, title: 'Designers & Architects', desc: 'Partner pricing for interior design professionals.' },
    { icon: <Package size={28}/>, title: 'Retailers', desc: 'Source products in bulk for your retail store.' },
  ];

  return (
    <main className="pt-32 pb-20">
      {/* Hero */}
      <section className="max-w-container-max mx-auto px-6 md:px-margin-desktop text-center py-16">
        <p className="text-[14px] font-semibold text-on-surface-variant uppercase tracking-widest mb-4">For Businesses</p>
        <h1 className="text-[48px] md:text-[64px] font-semibold tracking-tight text-primary leading-tight">Bulk Orders,<br />Made Simple.</h1>
        <p className="text-body-lg text-on-surface-variant mt-6 max-w-xl mx-auto">
          Get wholesale pricing on fashion, home decor, IKEA products and more. Fast, direct, and transparent — all via WhatsApp.
        </p>
        <a href={getBulkWhatsAppUrl()} target="_blank" rel="noopener noreferrer"
          className="mt-10 inline-flex items-center gap-3 bg-wa-green text-white px-8 py-4 rounded-xl text-[16px] font-semibold hover:bg-wa-green-dark transition-colors shadow-sm">
          <MessageCircle size={20} /> Start a Bulk Enquiry
        </a>
      </section>

      {/* Segments */}
      <section className="bg-surface-container-low py-20">
        <div className="max-w-container-max mx-auto px-6 md:px-margin-desktop">
          <h2 className="text-[32px] font-semibold tracking-tight text-primary text-center mb-12">Who We Work With</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {segments.map(s => (
              <div key={s.title} className="bg-surface-container-lowest rounded-xl p-8 shadow-card border border-surface-variant/50">
                <div className="text-primary mb-4">{s.icon}</div>
                <h3 className="text-[18px] font-semibold text-primary mb-2">{s.title}</h3>
                <p className="text-body-md text-on-surface-variant">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="max-w-container-max mx-auto px-6 md:px-margin-desktop py-20">
        <h2 className="text-[32px] font-semibold tracking-tight text-primary text-center mb-12">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { step: '01', title: 'Send Enquiry', desc: 'WhatsApp us your product list, quantities, and delivery location.' },
            { step: '02', title: 'Get a Quote', desc: "We'll send you the best bulk pricing within a few hours." },
            { step: '03', title: 'Confirm & Deliver', desc: 'Confirm the order and we arrange delivery at your convenience.' },
          ].map(({ step, title, desc }) => (
            <div key={step} className="text-center">
              <p className="text-[56px] font-semibold text-surface-variant leading-none mb-4">{step}</p>
              <h3 className="text-[20px] font-semibold text-primary mb-2">{title}</h3>
              <p className="text-body-md text-on-surface-variant">{desc}</p>
            </div>
          ))}
        </div>
        <div className="text-center mt-16">
          <a href={getBulkWhatsAppUrl()} target="_blank" rel="noopener noreferrer"
            className="inline-flex items-center gap-3 bg-wa-green text-white px-10 py-5 rounded-xl text-[16px] font-semibold hover:bg-wa-green-dark transition-colors shadow-sm">
            <MessageCircle size={20} /> Contact Us on WhatsApp
          </a>
        </div>
      </section>
    </main>
  );
}
