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
      <body className="min-h-full flex flex-col bg-zinc-900 text-zinc-100">
        <AdHeader />
        <header className="bg-zinc-950 text-white sticky top-0 z-50 border-b border-zinc-800">
          <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inset-0 rounded-full bg-red-500 opacity-75"></span>
                <span className="relative rounded-full h-2.5 w-2.5 bg-red-500"></span>
              </span>
              <Link href="/" className="text-lg font-bold">Strike <span className="text-red-500">Signal</span></Link>
              <span className="text-xs text-zinc-500 border border-zinc-700 rounded-full px-2 py-0.5 hidden sm:block font-mono">LIVE</span>
            </div>
            <nav className="flex gap-1">
              <Link href="/" className="text-zinc-300 hover:text-white hover:bg-zinc-700/50 px-3 py-2 rounded-lg text-sm">Latest</Link>
              <Link href="/about" className="text-zinc-300 hover:text-white hover:bg-zinc-700/50 px-3 py-2 rounded-lg text-sm">About</Link>
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="bg-zinc-950 text-zinc-500 border-t border-zinc-800 mt-auto">
          <div className="max-w-7xl mx-auto px-4 py-6 flex flex-col sm:flex-row items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="text-zinc-300 font-semibold">Strike Signal</span>
              <span className="text-zinc-700">·</span>
              <span className="text-xs">Data from ISW, IDF, CENTCOM, UKMTO. No graphic imagery.</span>
            </div>
            <VisitorCounter />
          </div>
        </footer>
        <AdMobileSticky />
      </body>
    </html>
  );
}
