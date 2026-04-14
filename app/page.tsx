import type { Metadata } from 'next'
import { promises as fs } from "fs";
import path from "path";
import ImpactBadge from "@/components/ImpactBadge";
import TypeIcon from "@/components/TypeIcon";
import AdInContent from "@/components/ads/AdInContent";
import AdSidebar from "@/components/ads/AdSidebar";
import Link from "next/link";

export const metadata: Metadata = {
  title: 'Strike Signal | Real-Time Conflict Intelligence',
  description: 'Real-time monitoring of military strikes, airstrikes, and kinetic military operations in active conflict zones',
  keywords: 'military strikes, airstrike monitor, kinetic operations, missile strikes, military action, bombing',
}

type Incident = {
  id: string; date: string; time_utc: string; conflict: string;
  origin_country: string; origin_flag: string;
  target_country: string; target_flag: string; target_city: string;
  type: string; direction: string;
  impact_level: string; intercepted: boolean | string;
  description: string; source: string; source_url: string; tags: string[];
};

async function getIncidents(): Promise<Incident[]> {
  const raw = await fs.readFile(path.join(process.cwd(), "public/data/incidents.json"), "utf-8");
  return JSON.parse(raw).incidents;
}

export default async function Home() {
  const incidents = await getIncidents();
  const sorted = [...incidents].sort((a, b) => b.date.localeCompare(a.date) || b.time_utc.localeCompare(a.time_utc));
  const today = new Date("2026-04-14").toISOString().slice(0, 10);
  const todayCount = incidents.filter((i) => i.date === today).length;
  const interceptedCount = incidents.filter((i) => i.intercepted === true || i.intercepted === "partial").length;

  const typeCounts = incidents.reduce<Record<string, number>>((acc, i) => {
    acc[i.type] = (acc[i.type] || 0) + 1;
    return acc;
  }, {});

  const conflictSlugs = [...new Set(incidents.map((i) => i.conflict))];

  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-zinc-950 via-red-950/30 to-zinc-950 text-white py-12 px-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff05_1px,transparent_1px),linear-gradient(to_bottom,#ffffff05_1px,transparent_1px)] bg-[size:20px_20px]"></div>
        <div className="max-w-7xl mx-auto relative">
          <div className="font-mono text-red-400 text-xs uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-red-500 rounded-sm animate-pulse"></span> TRACKING ACTIVE STRIKES
          </div>
          <div className="flex flex-col lg:flex-row lg:items-end gap-8">
            <div>
              <h1 className="text-5xl font-black tracking-tight mb-4">Strike <span className="text-red-500">Signal</span></h1>
              <p className="text-zinc-400 text-base max-w-2xl">Every recorded missile and drone strike. Tracked by type, origin, target, and impact. Icon-only — no graphic imagery.</p>
            </div>
            <div className="flex flex-wrap gap-3">
              <div className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-center">
                <div className="text-3xl font-black text-red-500">{incidents.length}</div>
                <div className="text-xs text-zinc-400 mt-1">Total Incidents</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-center">
                <div className="text-3xl font-black text-red-500">{todayCount}</div>
                <div className="text-xs text-zinc-400 mt-1">Today</div>
              </div>
              <div className="bg-white/5 border border-white/10 rounded-2xl px-5 py-4 text-center">
                <div className="text-3xl font-black text-green-400">{interceptedCount}</div>
                <div className="text-xs text-zinc-400 mt-1">Intercepted</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="flex gap-8">
          <div className="flex-1 min-w-0">
            {/* Type stat cards */}
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 mb-8">
              {Object.entries(typeCounts).map(([type, count]) => (
                <div key={type} className="bg-zinc-800 border border-zinc-700 rounded-2xl p-4 text-center">
                  <div className="text-2xl mb-1"><TypeIcon type={type} /></div>
                  <div className="text-xl font-bold text-zinc-100">{count}</div>
                  <div className="text-xs text-zinc-500 mt-1 capitalize">{type.replace(/-/g, " ")}</div>
                </div>
              ))}
            </div>

            <AdInContent />

            {/* Incidents Table */}
            <div className="bg-zinc-800 rounded-2xl border border-zinc-700 overflow-hidden">
              <div className="px-6 py-4 border-b border-zinc-700 flex items-center justify-between bg-zinc-800/80">
                <h2 className="font-bold text-zinc-100 flex items-center gap-2">
                  <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
                  Latest Strikes
                </h2>
                <span className="text-xs text-zinc-500 font-mono">{incidents.length} incidents recorded</span>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-zinc-900/50 border-b border-zinc-700">
                    <tr>
                      <th className="text-left px-4 py-3 text-xs font-mono text-zinc-500 uppercase">Date/Time</th>
                      <th className="text-left px-4 py-3 text-xs font-mono text-zinc-500 uppercase">Type</th>
                      <th className="text-left px-4 py-3 text-xs font-mono text-zinc-500 uppercase">Route</th>
                      <th className="text-left px-4 py-3 text-xs font-mono text-zinc-500 uppercase">Impact</th>
                      <th className="text-left px-4 py-3 text-xs font-mono text-zinc-500 uppercase hidden md:table-cell">Notes</th>
                      <th className="px-4 py-3"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-zinc-700/50">
                    {sorted.map((incident) => (
                      <tr key={incident.id} className="hover:bg-zinc-700/30 transition-colors">
                        <td className="px-4 py-3.5 font-mono text-zinc-400 text-xs whitespace-nowrap">
                          {incident.date}
                          {incident.time_utc && <span className="text-zinc-600 block">{incident.time_utc} UTC</span>}
                        </td>
                        <td className="px-4 py-3.5">
                          <span className="flex items-center gap-2">
                            <span className="text-lg"><TypeIcon type={incident.type} /></span>
                            <span className="text-xs text-zinc-300 font-medium capitalize hidden sm:block">{incident.type.replace(/-/g, " ")}</span>
                          </span>
                        </td>
                        <td className="px-4 py-3.5">
                          <span className="text-zinc-300">{incident.origin_flag} → {incident.target_flag}</span>
                          <div className="text-xs text-zinc-500 mt-0.5">{incident.target_city}</div>
                        </td>
                        <td className="px-4 py-3.5">
                          <ImpactBadge level={incident.impact_level} />
                          {incident.intercepted === true && (
                            <span className="ml-1.5 text-xs text-green-400 font-mono">INTERCEPTED</span>
                          )}
                          {incident.intercepted === "partial" && (
                            <span className="ml-1.5 text-xs text-yellow-400 font-mono">PARTIAL</span>
                          )}
                        </td>
                        <td className="px-4 py-3.5 text-xs text-zinc-500 max-w-[200px] hidden md:table-cell">
                          {incident.description.slice(0, 80)}...
                        </td>
                        <td className="px-4 py-3.5">
                          <Link href={`/incident/${incident.id}`} className="text-xs text-red-400 hover:text-red-300 font-mono whitespace-nowrap">
                            Details →
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          <aside className="hidden lg:block w-[300px] shrink-0">
            <AdSidebar />
            <div className="mt-6 bg-zinc-800 border border-zinc-700 rounded-2xl p-5">
              <h3 className="font-bold text-zinc-100 mb-3 text-sm">By Conflict</h3>
              {conflictSlugs.map((slug) => {
                const count = incidents.filter((i) => i.conflict === slug).length;
                return (
                  <Link key={slug} href={`/conflict/${slug}`}
                    className="flex items-center justify-between py-2 text-sm hover:text-red-400 transition-colors border-b border-zinc-700/50 last:border-0">
                    <span className="text-zinc-300 capitalize">{slug.replace(/-/g, " ")}</span>
                    <span className="text-zinc-500 text-xs font-mono bg-zinc-900/50 px-2 py-0.5 rounded-full">{count}</span>
                  </Link>
                );
              })}
            </div>
            <div className="mt-4 bg-zinc-800 border border-zinc-700 rounded-2xl p-5">
              <h3 className="font-bold text-zinc-100 mb-3 text-sm">Impact Legend</h3>
              {["critical", "high", "medium", "low"].map((level) => (
                <div key={level} className="flex items-center gap-2 py-1.5 border-b border-zinc-700/50 last:border-0">
                  <ImpactBadge level={level} />
                  <span className="text-zinc-400 text-xs capitalize">{level} impact</span>
                </div>
              ))}
              <div className="mt-3 pt-3 border-t border-zinc-700 space-y-2">
                <div className="flex items-center gap-2 text-xs text-zinc-400">
                  <span className="text-green-400 font-mono font-semibold">INTERCEPTED</span>
                  <span>Fully intercepted</span>
                </div>
                <div className="flex items-center gap-2 text-xs text-zinc-400">
                  <span className="text-yellow-400 font-mono font-semibold">PARTIAL</span>
                  <span>Partially intercepted</span>
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
