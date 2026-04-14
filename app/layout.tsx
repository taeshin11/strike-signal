import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import AdHeader from "@/components/ads/AdHeader";
import AdMobileSticky from "@/components/ads/AdMobileSticky";
import VisitorCounter from "@/components/VisitorCounter";
import Link from "next/link";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Strike Signal — Missile & Drone Strike Dashboard 2026",
  description: "Real-time missile, drone, and airstrike incident tracker for Ukraine, Gaza, Houthi attacks, and Iran.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geistSans.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-gray-950 text-gray-100">
        <AdHeader />
        <header className="border-b border-gray-800 px-4 py-3 flex items-center justify-between flex-wrap gap-2">
          <Link href="/" className="text-lg font-bold text-white hover:text-red-400 transition-colors">
            Strike Signal
          </Link>
          <nav className="flex gap-4 text-sm text-gray-400">
            <Link href="/" className="hover:text-white">Latest</Link>
            <Link href="/about" className="hover:text-white">About</Link>
          </nav>
          <VisitorCounter />
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-gray-800 px-4 py-4 text-center text-xs text-gray-500">
          Strike Signal © 2026 — Data from ISW, IDF, CENTCOM, UKMTO. No graphic imagery.
        </footer>
        <AdMobileSticky />
      </body>
    </html>
  );
}
