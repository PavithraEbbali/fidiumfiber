import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

import { FAQ, PLANS, SITE, formatSpeed, siteUrl } from '@/lib/content';
import { IMAGES, imageSrc } from '@/lib/images';
import { hasImage } from '@/lib/images.server';
import DisclosureBar from '@/components/layout/DisclosureBar';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import LenisProvider from '@/components/providers/LenisProvider';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sans',
  weight: ['400', '500', '600', '700', '800'],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    default: SITE.seo.title,
    template: `%s | ${SITE.entity}`,
  },
  description: SITE.seo.description,
  keywords: [...SITE.seo.keywords],
  applicationName: SITE.entity,
  authors: [{ name: SITE.entity }],
  robots: { index: true, follow: true },
  alternates: { canonical: '/' },
  openGraph: {
    type: 'website',
    siteName: SITE.entity,
    title: SITE.seo.title,
    description: SITE.seo.description,
    url: '/',
    locale: 'en_US',
    ...(hasImage('og')
      ? {
          images: [
            {
              url: imageSrc('og'),
              width: IMAGES.og.width,
              height: IMAGES.og.height,
              alt: SITE.seo.title,
            },
          ],
        }
      : {}),
  },
  twitter: {
    card: 'summary_large_image',
    title: SITE.seo.title,
    description: SITE.seo.description,
    ...(hasImage('og') ? { images: [imageSrc('og')] } : {}),
  },
  icons: {
    icon: [{ url: '/icon.svg', type: 'image/svg+xml' }],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#00AE42',
  colorScheme: 'light',
};

/* -------------------------------------------------------------------------- */
/*  Structured data — generated from lib/content.ts, never hand-maintained    */
/* -------------------------------------------------------------------------- */

function StructuredData() {
  const graph = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${siteUrl()}/#organization`,
        name: SITE.entity,
        description: SITE.disclosure,
        url: siteUrl(),
        telephone: SITE.phoneDisplay,
      },
      {
        '@type': 'WebSite',
        '@id': `${siteUrl()}/#website`,
        url: siteUrl(),
        name: SITE.entity,
        publisher: { '@id': `${siteUrl()}/#organization` },
        inLanguage: 'en-US',
      },
      ...PLANS.map((plan) => ({
        '@type': 'Product',
        name: plan.name,
        description: plan.blurb,
        category: 'Fiber internet service',
        ...(typeof plan.price === 'number'
          ? {
              offers: {
                '@type': 'Offer',
                price: plan.price,
                priceCurrency: 'USD',
                availability: 'https://schema.org/InStock',
                seller: { '@id': `${siteUrl()}/#organization` },
              },
            }
          : {}),
        additionalProperty: [
          {
            '@type': 'PropertyValue',
            name: 'Download speed',
            value: formatSpeed(plan.speedDown),
          },
          {
            '@type': 'PropertyValue',
            name: 'Upload speed',
            value: formatSpeed(plan.speedUp),
          },
        ],
      })),
      {
        '@type': 'FAQPage',
        mainEntity: FAQ.map((item) => ({
          '@type': 'Question',
          name: item.q,
          acceptedAnswer: { '@type': 'Answer', text: item.a },
        })),
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      // Generated from trusted local content, not user input.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(graph) }}
    />
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/*
          Entrance animations start from opacity 0, so they are only armed when
          JavaScript is actually running and motion is welcome. Without this
          class every section renders in its final, visible state — the page can
          never end up blank because a script failed to load.

          Runs before first paint to avoid a flash of finished content.
        */}
        <script
          dangerouslySetInnerHTML={{
            __html:
              "try{if(!matchMedia('(prefers-reduced-motion: reduce)').matches){document.documentElement.classList.add('anim')}}catch(e){}",
          }}
        />
      </head>
      <body className="font-sans antialiased">
        <a
          href="#hero"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-ink focus:px-5 focus:py-3 focus:text-sm focus:font-bold focus:text-white"
        >
          Skip to content
        </a>

        <DisclosureBar />
        <Header />

        <main>{children}</main>

        <Footer />

        <LenisProvider />
        <StructuredData />
      </body>
    </html>
  );
}
