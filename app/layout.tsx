import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Image from 'next/image';
import './globals.css';
import Navbar from '@/components/Navbar';
import CartDrawer from '@/components/CartDrawer';
import WhatsAppFAB from '@/components/WhatsAppFAB';

const inter = Inter({ subsets: ['latin'], weight: ['300','400','500','600','700'], display: 'swap' });

export const metadata: Metadata = {
  title: 'bymoe — Premium Multi-Category Store',
  description: 'Shop premium fashion, home decor, IKEA deals and more. Order instantly via WhatsApp.',
  keywords: 'bymoe, fashion, home, IKEA deals, WhatsApp shopping',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <body className="bg-background text-on-background antialiased min-h-screen">
        <Navbar />
        <CartDrawer />
        {children}
        <WhatsAppFAB />
        <footer className="w-full pt-16 pb-10 bg-surface-container-low mt-20">
          <div className="max-w-container-max mx-auto px-6 md:px-margin-desktop">
            {/* Top row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 pb-12 border-b border-surface-variant">
              {/* Brand */}
              <div className="flex flex-col gap-4">
                <Image src="/logo.svg" alt="bymoe" width={100} height={28} style={{ width: 'auto', height: '28px' }} className="mb-3" />
                <p className="text-body-md text-on-surface-variant max-w-xs">
                  Curated fashion, home essentials & IKEA deals — ordered instantly via WhatsApp.
                </p>
                {/* Instagram */}
                <a
                  href="https://www.instagram.com/bymoe.in/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-label-sm text-on-surface-variant hover:text-primary transition-colors group w-fit"
                >
                  <svg className="w-5 h-5 group-hover:scale-110 transition-transform" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                  @bymoe.in
                </a>
              </div>

              {/* Shop */}
              <div className="flex flex-col gap-3">
                <p className="text-label-sm text-on-surface-variant uppercase tracking-widest mb-1">Shop</p>
                {[
                  { label: 'Men', href: '/category/men' },
                  { label: 'Women', href: '/category/women' },
                  { label: 'Kids', href: '/category/kids' },
                  { label: 'Home', href: '/category/home' },
                  { label: 'IKEA Deals', href: '/category/ikea' },
                  { label: 'Our Products', href: '/category/our-products' },
                ].map(({ label, href }) => (
                  <a key={label} href={href} className="text-body-md text-on-surface-variant hover:text-primary transition-colors">{label}</a>
                ))}
              </div>

              {/* Info */}
              <div className="flex flex-col gap-3">
                <p className="text-label-sm text-on-surface-variant uppercase tracking-widest mb-1">Info</p>
                {[
                  { label: 'Bulk Orders', href: '/bulk' },
                  { label: 'Shipping Info', href: '#' },
                  { label: 'Returns', href: '#' },
                  { label: 'Privacy Policy', href: '#' },
                  { label: 'Terms of Service', href: '#' },
                ].map(({ label, href }) => (
                  <a key={label} href={href} className="text-body-md text-on-surface-variant hover:text-primary transition-colors">{label}</a>
                ))}
              </div>
            </div>

            {/* Bottom row */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-4 pt-8">
              <p className="text-label-sm text-on-surface-variant">© 2026 bymoe. All rights reserved.</p>
              <a
                href="https://www.instagram.com/bymoe.in/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-label-sm text-on-surface-variant hover:text-primary transition-colors"
              >
                Instagram: @bymoe.in
              </a>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
