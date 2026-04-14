import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: 'Strike Signal | Real-Time Intelligence',
    template: '%s | Strike Signal'
  },
  description: 'Real-time monitoring of military strikes, airstrikes, and kinetic military operations in active conflict zones',
  keywords: 'military strikes, airstrike monitor, kinetic operations, missile strikes, military action, bombing',
  openGraph: {
    type: 'website',
    siteName: 'Strike Signal',
    title: 'Strike Signal | Real-Time Intelligence',
    description: 'Real-time monitoring of military strikes, airstrikes, and kinetic military operations in active conflict zones',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Strike Signal',
    description: 'Real-time monitoring of military strikes, airstrikes, and kinetic military operations in active conflict zones',
  },
  verification: {
    google: 'add-your-google-site-verification-here',
  },
  other: {
    'google-adsense-account': 'ca-pub-add-your-publisher-id-here',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html suppressHydrationWarning className={`${geistSans.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              "name": "Strike Signal",
              "url": "https://strike-signal.vercel.app",
              "description": "Real-time monitoring of military strikes, airstrikes, and kinetic military operations",
              "publisher": { "@type": "Organization", "name": "Strike Signal", "url": "https://strike-signal.vercel.app" }
            })
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
