import type { Metadata, Viewport } from 'next';
import { Outfit } from 'next/font/google';
import { Toaster } from '@/components/ui/sonner';
import './globals.css';

const outfit = Outfit({
  variable: '--font-outfit',
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  title: {
    default: 'UK Setup Guide - Your Complete Settlement Companion',
    template: '%s | UK Setup Guide',
  },
  description:
    'Navigate UK life with confidence. Personalized roadmaps, scam protection, and essential resources for international arrivals.',
  keywords: [
    'UK settlement',
    'visa guide',
    'scam protection',
    'bank account UK',
    'GP registration',
    'international students',
    'skilled worker visa',
  ],
  authors: [{ name: 'UK Setup Guide' }],
  creator: 'UK Setup Guide',
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: 'https://uksetupguide.com',
    siteName: 'UK Setup Guide',
    title: 'UK Setup Guide - Your Complete Settlement Companion',
    description:
      'Navigate UK life with confidence. Personalized roadmaps, scam protection, and essential resources for international arrivals.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'UK Setup Guide - Your Complete Settlement Companion',
    description:
      'Navigate UK life with confidence. Personalized roadmaps, scam protection, and essential resources.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#0d4f6e' },
    { media: '(prefers-color-scheme: dark)', color: '#1a2744' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${outfit.variable} font-sans antialiased`}>
        {children}
        <Toaster position="top-right" richColors closeButton />
      </body>
    </html>
  );
}
