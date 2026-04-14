import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'How to Use & FAQ',
  description: 'How to use Strike Signal. Frequently asked questions about data, methodology, and features.',
  keywords: 'military strikes, airstrike monitor, kinetic operations, missile strikes, military action, bombing, FAQ, how to use, guide',
}

export default function FaqPage() {
  const faqs = [
    { q: 'What is Strike Signal and who is it for?', a: 'Strike Signal is a free, publicly accessible platform that provides real-time monitoring of military strikes, airstrikes, and kinetic military operations in active conflict zones. Designed for journalists, researchers, policy analysts, students, and NGO workers. No registration or payment required.' },
    { q: 'Where does the data come from?', a: 'Data is sourced from ACLED, SIPRI, Uppsala Conflict Data Program, UN agencies, official government sources, and verified open-source intelligence. Primary sources are cited where available.' },
    { q: 'How often is data updated?', a: 'Breaking events are updated within 24-48 hours of verification. Statistical summaries are reviewed weekly or monthly. Each section shows its last updated timestamp.' },
    { q: 'Is this platform free?', a: 'Strike Signal is entirely free with no registration required. It is sustained through advertising revenue. There are no paywalls or premium tiers.' },
    { q: 'Can I cite this data in my research?', a: 'Yes, with attribution to the platform and original primary source. For academic publications, cross-reference against primary sources. For partnerships or bulk access, contact us at contact@strike-signal.vercel.app.' }
  ]
  return (
    <main className="bg-zinc-900 text-zinc-100 min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-12">
        <nav className="text-sm text-zinc-500 mb-8">
          <Link href="/" className="hover:text-zinc-300">Home</Link>
          <span className="mx-2">/</span>
          <span>How to Use &amp; FAQ</span>
        </nav>
        <h1 className="text-4xl font-bold text-zinc-100 mb-4">How to Use Strike Signal</h1>
        <p className="text-xl text-zinc-400 mb-10">A guide to navigating the platform and getting the most from our data.</p>
        <section className="mb-12">
          <h2 className="text-2xl font-semibold text-zinc-100 mb-6">Getting Started in 3 Steps</h2>
          <div className="grid gap-4">
            {[
              { step: '1', title: 'Explore the Dashboard', desc: 'Start on the homepage to get a high-level overview of current activity. Key metrics, recent events, and interactive visualizations update regularly.' },
              { step: '2', title: 'Filter & Drill Down', desc: 'Use filter controls to narrow data by region, date range, type, or severity. Click on any event or data point for detailed information and sources.' },
              { step: '3', title: 'Track Changes Over Time', desc: 'Use timeline and historical views to understand trends. Bookmark pages to stay current on developments that matter to you.' }
            ].map(({ step, title, desc }) => (
              <div key={step} className="bg-zinc-800 rounded-2xl border border-zinc-700 p-5 flex gap-4">
                <div className="w-10 h-10 rounded-full bg-zinc-100 text-zinc-900 flex items-center justify-center font-bold text-lg shrink-0">{step}</div>
                <div><h3 className="font-semibold text-zinc-100 mb-1">{title}</h3><p className="text-zinc-400 text-sm">{desc}</p></div>
              </div>
            ))}
          </div>
        </section>
        <section>
          <h2 className="text-2xl font-semibold text-zinc-100 mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map(({ q, a }, i) => (
              <div key={i} className="bg-zinc-800 rounded-2xl border border-zinc-700 p-6">
                <h3 className="font-semibold text-zinc-100 mb-3">{q}</h3>
                <p className="text-zinc-400 leading-relaxed text-sm">{a}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  )
}
