import { promises as fs } from "fs";
import path from "path";
import { notFound } from "next/navigation";
import Link from "next/link";
import IncidentRow from "@/components/IncidentRow";
import type { Metadata } from "next";

type Incident = {
  id: string; date: string; time_utc: string; conflict: string;
  origin_country: string; origin_flag: string; target_country: string;
  target_flag: string; target_city: string; type: string; direction: string;
  impact_level: string; intercepted: boolean | string; description: string;
  source: string; source_url: string; tags: string[];
};

async function getIncidents(): Promise<Incident[]> {
  const raw = await fs.readFile(path.join(process.cwd(), "public/data/incidents.json"), "utf-8");
  return JSON.parse(raw).incidents;
}

export async function generateStaticParams() {
  const incidents = await getIncidents();
  const conflicts = [...new Set(incidents.map((i) => i.conflict))];
  return conflicts.map((slug) => ({ slug }));
}

export async function generateMetadata(props: PageProps<"/conflict/[slug]">): Promise<Metadata> {
  const { slug } = await props.params;
  return {
    title: `${slug.replace(/-/g, " ")} Strikes — Strike Signal`,
    description: `All missile, drone, and airstrike incidents for the ${slug.replace(/-/g, " ")} conflict.`,
  };
}

export default async function ConflictPage(props: PageProps<"/conflict/[slug]">) {
  const { slug } = await props.params;
  const incidents = await getIncidents();
  const filtered = incidents.filter((i) => i.conflict === slug).sort((a, b) => b.date.localeCompare(a.date));
  if (filtered.length === 0) notFound();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <Link href="/" className="text-sm text-red-400 hover:text-red-300 font-mono mb-6 inline-flex items-center gap-1">← All Incidents</Link>
      <h1 className="text-3xl font-bold text-zinc-100 mb-2 capitalize">{slug.replace(/-/g, " ")}</h1>
      <p className="text-zinc-400 mb-6 font-mono text-sm">{filtered.length} incidents recorded</p>
      <div className="bg-zinc-800 border border-zinc-700 rounded-2xl overflow-hidden">
        <div className="px-6 py-4 border-b border-zinc-700 flex items-center justify-between">
          <h2 className="font-bold text-zinc-100 flex items-center gap-2">
            <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
            Strike Log
          </h2>
          <span className="text-xs text-zinc-500 font-mono">{filtered.length} incidents</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-zinc-900/50 border-b border-zinc-700">
              <tr>
                <th className="text-left px-4 py-3 text-xs font-mono text-zinc-500 uppercase">Date</th>
                <th className="text-left px-4 py-3 text-xs font-mono text-zinc-500 uppercase">Type</th>
                <th className="text-left px-4 py-3 text-xs font-mono text-zinc-500 uppercase">Route</th>
                <th className="text-left px-4 py-3 text-xs font-mono text-zinc-500 uppercase">Impact</th>
                <th className="text-left px-4 py-3 text-xs font-mono text-zinc-500 uppercase hidden md:table-cell">Notes</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-700/50">
              {filtered.map((i) => <IncidentRow key={i.id} incident={i} />)}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
