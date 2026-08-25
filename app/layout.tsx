import type { Metadata, Viewport } from 'next';
import { Inter, Inter_Tight, JetBrains_Mono } from 'next/font/google';
import { site } from '@/lib/site';
import { Navbar } from '@/components/nav/Navbar';
import { Footer } from '@/components/nav/Footer';
import { PageTransition } from '@/components/motion/PageTransition';
import './globals.css';

const sans = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const display = Inter_Tight({
  subsets: ['latin'],
  variable: '--font-display',
  weight: ['400', '500', '600'],
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  weight: ['400', '500'],
  display: 'swap',
});

export const viewport: Viewport = {
  themeColor: '#0A0F1A',
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Surgical instruments, Ireland`,
    template: `%s · ${site.shortName}`,
  },
  description: site.tagline,
  applicationName: site.name,
  keywords: [
    'HSK Surgical',
    'surgical instruments Ireland',
    'endoscopy',
    'gynaecology',
    'ENT',
    'electrosurgery',
    'ClearView anti-fog',
    'laparoscope warmer',
    'single-use surgical instruments',
  ],
  authors: [{ name: site.legalName }],
  openGraph: {
    type: 'website',
    locale: site.locale,
    url: site.url,
    siteName: site.name,
    title: `${site.name} — Surgical instruments, Ireland`,
    description: site.tagline,
  },
  twitter: {
    card: 'summary_large_image',
    title: `${site.name} — Surgical instruments, Ireland`,
    description: site.tagline,
  },
  robots: { index: true, follow: true },
};

const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: site.legalName,
  alternateName: site.shortName,
  url: site.url,
  email: site.contact.email,
  telephone: site.contact.phone,
  address: { '@type': 'PostalAddress', addressCountry: 'IE' },
  sameAs: [site.contact.linkedin],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sans.variable} ${display.variable} ${mono.variable}`}>
      <body className="min-h-screen bg-paper text-ink antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded focus:bg-ink focus:px-3 focus:py-2 focus:text-paper"
        >
          Skip to content
        </a>
        <Navbar />
        <PageTransition>
          <main id="main">{children}</main>
        </PageTransition>
        <Footer />
      </body>
    </html>
  );
}
