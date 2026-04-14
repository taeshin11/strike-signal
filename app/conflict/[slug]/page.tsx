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
      <Link href="/" className="text-sm text-gray-400 hover:text-white mb-6 inline-block">← All Incidents</Link>
      <h1 className="text-3xl font-bold text-white mb-2 capitalize">{slug.replace(/-/g, " ")}</h1>
      <p className="text-gray-400 mb-6">{filtered.length} incidents</p>
      <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 overflow-x-auto">
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
            {filtered.map((i) => <IncidentRow key={i.id} incident={i} />)}
          </tbody>
        </table>
      </div>
    </div>
  );
}
