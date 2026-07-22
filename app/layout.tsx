import './globals.css';
import type { Metadata, Viewport } from 'next';
import Script from 'next/script';
import { Fraunces, Inter, JetBrains_Mono, IBM_Plex_Sans_Arabic } from 'next/font/google';
import { Analytics } from '@vercel/analytics/next';
import Nav from '@/components/layout/Nav';
import Footer from '@/components/layout/Footer';
import JsonLd from '@/components/shared/JsonLd';
import { globalSchema } from '@/lib/schema';
import { SITE } from '@/lib/site';

const display = Fraunces({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-display-next',
  display: 'swap',
});
const body = Inter({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-body-next',
  display: 'swap',
});
const mono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-mono-next',
  display: 'swap',
});
const arabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['400', '500', '600'],
  variable: '--font-arabic-next',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: `${SITE.name} — ${SITE.tagline}`,
    template: `%s · ${SITE.name}`,
  },
  description: SITE.positioning,
  applicationName: SITE.name,
  authors: [{ name: SITE.founder, url: SITE.founderUrl }],
  creator: SITE.founder,
  publisher: SITE.companyName,
  category: 'business software and AI implementation',
  keywords: [
    'AI operating system',
    'business process automation',
    'revenue operations',
    'AI implementation',
    'AOS-001',
  ],
  openGraph: {
    title: `${SITE.name} — ${SITE.motto}`,
    description: SITE.positioning,
    url: SITE.url,
    siteName: SITE.name,
    locale: 'en_US',
    type: 'website',
    images: [
      {
        url: SITE.socialImage,
        width: 1200,
        height: 630,
        alt: `${SITE.name} — ${SITE.motto}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE.name} — ${SITE.motto}`,
    description: SITE.positioning,
    images: [SITE.socialImage],
  },
  robots: { index: true, follow: true },
  verification: { google: 'kKAcTOHisk8LJXjpzteUCTTAYXGz3wmhe0lOjLRphq0' },
  alternates: { canonical: SITE.url },
};

export const viewport: Viewport = {
  themeColor: '#EEE6D4',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const gtm = process.env.NEXT_PUBLIC_GTM_ID;
  const cookieyes = process.env.NEXT_PUBLIC_COOKIEYES_ID;

  // Bind next/font outputs to the CSS variables the inline styles reference
  // (the original bundle uses bare names like `var(--font-display)`, so we
  // map next/font's hashed variables onto those base names via a wrapper).
  const fontVars = `${display.variable} ${body.variable} ${mono.variable} ${arabic.variable}`;

  return (
    <html
      lang="en"
      className={fontVars}
      style={
        {
          // Map next/font's per-instance variables onto the names the CSS uses.
          ['--font-display' as string]: `var(--font-display-next), "Fraunces", "Times New Roman", serif`,
          ['--font-body' as string]: `var(--font-body-next), "Inter", -apple-system, system-ui, sans-serif`,
          ['--font-mono' as string]: `var(--font-mono-next), "JetBrains Mono", "SF Mono", monospace`,
          ['--font-arabic' as string]: `var(--font-arabic-next), "IBM Plex Sans Arabic", "Tajawal", sans-serif`,
        } as React.CSSProperties
      }
    >
      <head>
        {cookieyes && (
          <Script
            id="cookieyes"
            strategy="beforeInteractive"
            src={`https://cdn-cookieyes.com/client_data/${cookieyes}/script.js`}
          />
        )}
        {gtm && (
          <Script id="gtm" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${gtm}');`}
          </Script>
        )}
      </head>
      <body>
        {gtm && (
          <noscript>
            <iframe
              src={`https://www.googletagmanager.com/ns.html?id=${gtm}`}
              height="0"
              width="0"
              style={{ display: 'none', visibility: 'hidden' }}
            />
          </noscript>
        )}
        <a href="#main" className="skip-link">Skip to content</a>
        <JsonLd data={globalSchema()} />
        <Nav />
        <main id="main">{children}</main>
        <Footer />
        <Analytics />
      </body>
    </html>
  );
}
