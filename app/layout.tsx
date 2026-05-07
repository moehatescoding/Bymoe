import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Link from 'next/link';
import Image from 'next/image';
import { siteConfig } from '@/lib/config';
import './globals.css';
import Navbar from '@/components/Navbar';
import CartDrawer from '@/components/CartDrawer';
import BottomNav from '@/components/BottomNav';
import WhatsAppFAB from '@/components/WhatsAppFAB';

const inter = Inter({ subsets: ['latin'], weight: ['300','400','500','600','700'], display: 'swap' });

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.domain),
  title: {
    default: siteConfig.name,
    template: `%s | ${siteConfig.name}`
  },
  description: 'Curated fashion, home essentials & IKEA deals — ordered instantly via WhatsApp.',
  keywords: 'bymoe, fashion, home, IKEA deals, WhatsApp shopping, Hyderabad',
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  }
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={inter.className}>
      <head>
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-74G1WX3KGZ"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-74G1WX3KGZ');
          `
        }} />
      </head>
      <body className="bg-background text-on-background antialiased min-h-screen">
        <Navbar />
        <CartDrawer />
        {children}
        <BottomNav />
        <WhatsAppFAB />
        <footer className="w-full pt-20 pb-10 bg-[#f0ede8] border-t border-[#ddd] mt-20">
          <div className="max-w-container-max mx-auto px-6 md:px-margin-desktop text-[#1a1a1a]">
            {/* Top row */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-12 pb-16 border-b border-[#ddd]">
              {/* Brand */}
              <div className="flex flex-col gap-6">
                <Link href="/">
                  <Image src="/logo.svg" alt={siteConfig.name} width={320} height={120} style={{ width: 'auto', height: '120px' }} className="mb-8" />
                </Link>
                <p className="text-[0.875rem] text-[#666] max-w-xs leading-relaxed">
                  Curated fashion, home essentials & IKEA deals — ordered instantly via WhatsApp.
                </p>
                <div className="flex gap-4">
                  <a href={siteConfig.instagram} target="_blank" rel="noopener noreferrer" className="text-[#1a1a1a] hover:opacity-70 transition-opacity">
                    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg>
                  </a>
                </div>
              </div>

              {/* Shop */}
              <div className="flex flex-col gap-4">
                <p className="text-[0.7rem] uppercase tracking-[0.12em] text-[#888] font-medium">Shop</p>
                <div className="flex flex-col gap-3">
                  {[
                    { label: 'Men', href: '/category/men' },
                    { label: 'Women', href: '/category/women' },
                    { label: 'Kids', href: '/category/kids' },
                    { label: 'Home', href: '/category/home' },
                    { label: 'IKEA Deals', href: '/category/ikea' },
                  ].map(({ label, href }) => (
                    <Link key={label} href={href} className="text-[0.875rem] hover:underline underline-offset-4 transition-all">{label}</Link>
                  ))}
                </div>
              </div>

              {/* Info */}
              <div className="flex flex-col gap-4">
                <p className="text-[0.7rem] uppercase tracking-[0.12em] text-[#888] font-medium">Info</p>
                <div className="flex flex-col gap-3">
                  {[
                    { label: 'Bulk Orders', href: '/bulk' },
                    { label: 'Shipping Info', href: '/shipping' },
                    { label: 'Returns', href: '/returns' },
                    { label: 'Privacy Policy', href: '/privacy' },
                  ].map(({ label, href }) => (
                    <Link key={label} href={href} className="text-[0.875rem] hover:underline underline-offset-4 transition-all">{label}</Link>
                  ))}
                </div>
              </div>

              {/* Secure Shopping */}
              <div className="flex flex-col gap-4">
                <p className="text-[0.7rem] uppercase tracking-[0.12em] text-[#888] font-medium">Secure Shopping</p>
                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3 text-[0.875rem]">
                    <span className="text-[#25D366]">✓</span>
                    <span>100% SSL Secure</span>
                  </div>
                  <div className="flex items-center gap-3 text-[0.875rem]">
                    <span className="text-[#25D366]">✓</span>
                    <span>Safe Payment Verified</span>
                  </div>
                  <div className="flex items-center gap-3 text-[0.875rem]">
                    <span className="text-[#25D366]">✓</span>
                    <span>Direct WhatsApp Order</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom bar */}
            <div className="flex flex-col sm:flex-row justify-between items-center gap-6 pt-10">
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-8">
                <p className="text-[0.75rem] text-[#888]">© 2026 {siteConfig.name}. All rights reserved.</p>
                <div className="flex items-center gap-2">
                  <span className="text-[10px] text-[#aaa] border border-[#ddd] px-1.5 py-0.5 rounded uppercase font-bold tracking-tighter">SSL</span>
                  <span className="text-[#ddd]">•</span>
                  <span className="text-[10px] text-[#aaa] border border-[#ddd] px-1.5 py-0.5 rounded uppercase font-bold tracking-tighter">HTTPS</span>
                  <span className="text-[#ddd]">•</span>
                  <span className="text-[10px] text-[#aaa] border border-[#ddd] px-1.5 py-0.5 rounded uppercase font-bold tracking-tighter">SECURE</span>
                </div>
              </div>
              <div className="flex items-center gap-4 text-[0.75rem] text-[#888] font-medium">
                <span className="hidden sm:inline opacity-30">|</span>
                <span>Est. in the land of Haleem & hustle 🫕</span>
              </div>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}

