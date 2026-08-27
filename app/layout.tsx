import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { siteConfig } from '@/lib/config';
import './globals.css';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import EasterEggs from '@/components/EasterEggs';
import LoadingScreen from '@/components/LoadingScreen';
import FilmGrain from '@/components/FilmGrain';
import BottomNav from '@/components/BottomNav';

const inter = Inter({ subsets: ['latin'], weight: ['300','400','500','600','700'], display: 'swap', variable: '--font-sans' });

export const metadata: Metadata = {
  metadataBase: new URL('https://www.bymoe.in'),
  title: {
    default: 'BYMOE — Moe',
    template: '%s | BYMOE'
  },
  description: 'BYMOE is the personal website of Moe — creator, builder, motorcycle enthusiast and entrepreneur.',
  keywords: 'bymoe, moegical, moe, personal brand, creator, builder',
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    title: 'BYMOE — Moe',
    description: 'BYMOE is the personal website of Moe — creator, builder, motorcycle enthusiast and entrepreneur.',
    url: 'https://www.bymoe.in',
    siteName: 'BYMOE',
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BYMOE — Moe',
    description: 'BYMOE is the personal website of Moe — creator, builder, motorcycle enthusiast and entrepreneur.',
    creator: '@moegical',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable}`} style={{ colorScheme: 'dark' }}>
      <head>
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-74G1WX3KGZ"></script>
        <script dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-74G1WX3KGZ');
          `
        }} />
        <script type="application/ld+json" dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Person",
            "name": "Moe",
            "url": "https://www.bymoe.in",
            "sameAs": [
              "https://instagram.com/moegical"
            ],
            "jobTitle": "Creator & Builder",
            "description": "Creator, builder, motorcycle enthusiast and entrepreneur."
          })
        }} />
      </head>
      <body className="bg-brand-black text-brand-white antialiased min-h-screen flex flex-col selection:bg-brand-white selection:text-brand-black">
        <FilmGrain />
        <LoadingScreen />
        <EasterEggs />
        <Navigation />
        <BottomNav />
        <div className="flex-1">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
