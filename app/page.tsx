import { promises as fs } from "fs";
import path from "path";
import IncidentRow from "@/components/IncidentRow";
import ImpactBadge from "@/components/ImpactBadge";
import TypeIcon from "@/components/TypeIcon";
import AdInContent from "@/components/ads/AdInContent";
import AdSidebar from "@/components/ads/AdSidebar";
import Link from "next/link";

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

  const typeCounts = incidents.reduce<Record<string, number>>((acc, i) => {
    acc[i.type] = (acc[i.type] || 0) + 1;
    return acc;
  }, {});

  const conflictSlugs = [...new Set(incidents.map((i) => i.conflict))];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Strike Signal</h1>
        <p className="text-gray-400">Missile, drone, and airstrike incidents — {incidents.length} total</p>
      </div>

      <div className="flex gap-8">
        <div className="flex-1 min-w-0">
          {/* Stat cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <div className="bg-red-950 border border-red-800 rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-red-300">{todayCount}</div>
              <div className="text-xs text-red-400 mt-1">Today&apos;s Incidents</div>
            </div>
            {Object.entries(typeCounts).slice(0, 3).map(([type, count]) => (
              <div key={type} className="bg-gray-900 border border-gray-700 rounded-lg p-4 text-center">
                <div className="text-2xl mb-1"><TypeIcon type={type} /></div>
                <div className="text-xl font-bold text-white">{count}</div>
                <div className="text-xs text-gray-400 mt-1 capitalize">{type.replace(/-/g, " ")}</div>
              </div>
            ))}
          </div>

          <AdInContent />

          {/* Table */}
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
            <h2 className="font-semibold text-white mb-4">Latest Incidents (newest first)</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-gray-700 text-left text-gray-400 text-xs">
                    <th className="pb-2 pr-3">Date</th>
                    <th className="pb-2 pr-3">Type</th>
                    <th className="pb-2 pr-3">Route</th>
                    <th className="pb-2 pr-3">City</th>
                    <th className="pb-2 pr-3">Impact</th>
                    <th className="pb-2 pr-3">Status</th>
                    <th className="pb-2 pr-3 hidden md:table-cell">Description</th>
                    <th className="pb-2"></th>
                  </tr>
                </thead>
                <tbody>
                  {sorted.map((incident) => (
                    <IncidentRow key={incident.id} incident={incident} />
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <aside className="hidden lg:block w-[300px] shrink-0">
          <AdSidebar />
          <div className="mt-6 bg-gray-900 border border-gray-700 rounded-lg p-4">
            <h3 className="font-semibold text-white mb-3 text-sm">By Conflict</h3>
            {conflictSlugs.map((slug) => {
              const count = incidents.filter((i) => i.conflict === slug).length;
              return (
                <Link key={slug} href={`/conflict/${slug}`}
                  className="flex items-center justify-between py-1.5 text-sm hover:text-red-400 transition-colors">
                  <span className="text-gray-300 capitalize">{slug.replace(/-/g, " ")}</span>
                  <span className="text-gray-500 text-xs">{count}</span>
                </Link>
              );
            })}
          </div>
          <div className="mt-4 bg-gray-900 border border-gray-700 rounded-lg p-4">
            <h3 className="font-semibold text-white mb-3 text-sm">Impact Legend</h3>
            {["critical", "high", "medium", "low"].map((level) => (
              <div key={level} className="flex items-center gap-2 py-1">
                <ImpactBadge level={level} />
                <span className="text-gray-400 text-xs capitalize">{level} impact</span>
              </div>
            ))}
            <div className="mt-2 pt-2 border-t border-gray-700 space-y-1">
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <span className="bg-green-900 text-green-300 border border-green-700 px-1.5 py-0.5 rounded text-xs">intercepted</span>
                <span>Fully intercepted</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <span className="bg-yellow-900 text-yellow-300 border border-yellow-700 px-1.5 py-0.5 rounded text-xs">partial</span>
                <span>Partially intercepted</span>
              </div>
              <div className="flex items-center gap-2 text-xs text-gray-400">
                <span className="bg-red-900 text-red-300 border border-red-700 px-1.5 py-0.5 rounded text-xs">hit</span>
                <span>Struck target</span>
              </div>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
