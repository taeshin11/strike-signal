import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'About Us',
  description: 'Learn about Strike Signal — our mission, methodology, and commitment to transparent conflict intelligence.',
  keywords: 'military strikes, airstrike monitor, kinetic operations, missile strikes, military action, bombing, about us, conflict intelligence',
}

export default function AboutPage() {
  return (
    <main className="bg-zinc-900 text-zinc-100 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <nav className="text-sm text-zinc-500 mb-8">
          <Link href="/" className="hover:text-zinc-300">Home</Link>
          <span className="mx-2">/</span>
          <span>About Us</span>
        </nav>
        <h1 className="text-4xl font-bold text-zinc-100 mb-4">About Strike Signal</h1>
        <p className="text-xl text-zinc-400 mb-10 leading-relaxed">Real-time monitoring of military strikes, airstrikes, and kinetic military operations in active conflict zones</p>
        <div className="space-y-8">
          <section className="bg-zinc-800 rounded-2xl border border-zinc-700 p-6">
            <h2 className="text-2xl font-semibold text-zinc-100 mb-4">Our Mission</h2>
            <p className="text-zinc-400 leading-relaxed mb-4">Strike Signal was built on the conviction that access to timely, accurate conflict intelligence should not be limited to governments, think tanks, or expensive subscription services. We believe that journalists, researchers, policy analysts, students, and engaged citizens deserve access to quality information to understand the world's most pressing security challenges.</p>
            <p className="text-zinc-400 leading-relaxed">In a world where armed conflicts shape economies, displace populations, and determine the course of history, we are committed to making conflict data accessible, transparent, and useful.</p>
          </section>
          <section className="bg-zinc-800 rounded-2xl border border-zinc-700 p-6">
            <h2 className="text-2xl font-semibold text-zinc-100 mb-4">What We Track</h2>
            <p className="text-zinc-400 leading-relaxed mb-4">Strike Signal provides real-time monitoring of military strikes, airstrikes, and kinetic military operations in active conflict zones. Our platform aggregates, verifies, and presents this data in a format designed for clarity, so users can quickly understand the current situation and track changes over time.</p>
            <p className="text-zinc-400 leading-relaxed">We cover active conflicts across multiple regions, providing visualizations, timelines, and analysis that contextualizes data within broader geopolitical realities.</p>
          </section>
          <section className="bg-zinc-800 rounded-2xl border border-zinc-700 p-6">
            <h2 className="text-2xl font-semibold text-zinc-100 mb-4">Our Data Sources &amp; Methodology</h2>
            <p className="text-zinc-400 leading-relaxed mb-4">Our data is compiled from publicly available sources: official government reports, United Nations agencies (OCHA, UNHCR, WFP), academic conflict databases (ACLED, SIPRI, Uppsala Conflict Data Program), verified open-source intelligence, and internationally recognized news organizations.</p>
            <p className="text-zinc-400 leading-relaxed">We prioritize source transparency and cross-reference multiple sources. Where sources disagree, we present the range of estimates rather than a single contested figure.</p>
          </section>
          <section className="bg-zinc-800 rounded-2xl border border-zinc-700 p-6">
            <h2 className="text-2xl font-semibold text-zinc-100 mb-4">Why This Matters</h2>
            <p className="text-zinc-400 leading-relaxed">Conflict data is inherently sensitive and contested. We strive to present information in a factual, non-partisan manner — to ensure accurate information supports informed discussion, humanitarian response, and evidence-based policy. The data we track represents real human lives, and that responsibility guides everything we do.</p>
          </section>
          <section className="bg-zinc-800 rounded-2xl border border-zinc-700 p-6">
            <h2 className="text-xl font-semibold text-zinc-100 mb-3">Contact Us</h2>
            <p className="text-zinc-400">For inquiries, corrections, or partnership opportunities, reach out at <strong className="text-zinc-200">contact@strike-signal.vercel.app</strong>.</p>
          </section>
        </div>
      </div>
    </main>
  )
}
