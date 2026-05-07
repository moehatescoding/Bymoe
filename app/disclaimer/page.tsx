import { Metadata } from 'next';
import React from 'react';

export const metadata: Metadata = {
  title: 'Copyright & Disclaimer | bymoe',
  description: 'bymoe is an independent reseller. All product trademarks belong to their respective owners. We are not affiliated with IKEA or any brand.',
};

export default function DisclaimerPage() {
  return (
    <main className="pt-32 pb-20 max-w-4xl mx-auto px-6">
      <h1 className="text-display-sm font-bold text-primary mb-8 uppercase tracking-widest">Copyright & Disclaimer</h1>
      
      <div className="prose prose-lg max-w-none text-on-surface-variant leading-relaxed space-y-6">
        <p className="font-semibold text-primary">
          bymoe is an independent reseller and is not affiliated with, endorsed by, or officially connected to any brand, manufacturer, or retailer listed on this website, including IKEA or any fashion label.
        </p>
        
        <p>
          All product names, trademarks, images, and descriptions are the property of their respective owners and are used here solely for identification and informational purposes. We source and resell products as a third-party service provider.
        </p>
        
        <p>
          Prices listed on bymoe may differ from official retail prices. Product availability is subject to stock and may change without notice.
        </p>
        
        <p>
          If you are a brand or rights holder and have concerns regarding any content on this site, please contact us directly and we will address it promptly.
        </p>
        
        <div className="pt-8 border-t border-surface-variant text-label-sm text-on-surface-variant">
          © 2026 bymoe. All rights reserved.
        </div>
      </div>
    </main>
  );
}
