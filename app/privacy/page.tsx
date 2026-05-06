import React from 'react';

export default function PrivacyPage() {
  return (
    <main className="pt-32 pb-20 max-w-4xl mx-auto px-6">
      <h1 className="text-display-sm font-bold text-primary mb-8 uppercase tracking-widest">Privacy Policy</h1>
      
      <div className="prose prose-lg max-w-none text-on-surface-variant leading-relaxed space-y-6">
        <p>
          At bymoe, your privacy matters. We collect only the information necessary to process your order — including your name, contact number, and delivery address — shared voluntarily through WhatsApp. 
        </p>
        
        <p>
          We do not store payment details, sell your data to third parties, or use it for any purpose beyond fulfilling your order.
        </p>
        
        <p>
          All conversations on WhatsApp are encrypted end-to-end. By placing an order with us, you consent to us using your contact information solely for order communication and delivery updates.
        </p>
        
        <p>
          For any privacy concerns, reach us on WhatsApp or Instagram.
        </p>
      </div>
    </main>
  );
}
