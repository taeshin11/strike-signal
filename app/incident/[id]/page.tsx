import { promises as fs } from "fs";
import path from "path";
import { notFound } from "next/navigation";
import Link from "next/link";
import TypeIcon from "@/components/TypeIcon";
import ImpactBadge from "@/components/ImpactBadge";
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
  return incidents.map((i) => ({ id: i.id }));
}

export async function generateMetadata(props: PageProps<"/incident/[id]">): Promise<Metadata> {
  const { id } = await props.params;
  const incidents = await getIncidents();
  const incident = incidents.find((i) => i.id === id);
  if (!incident) return {};
  return {
    title: `${incident.type} - ${incident.target_city} ${incident.date} — Strike Signal`,
    description: incident.description,
  };
}

export default async function IncidentPage(props: PageProps<"/incident/[id]">) {
  const { id } = await props.params;
  const incidents = await getIncidents();
  const incident = incidents.find((i) => i.id === id);
  if (!incident) notFound();

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <Link href="/" className="text-sm text-gray-400 hover:text-white mb-6 inline-block">← All Incidents</Link>

      <div className="bg-gray-900 border border-gray-700 rounded-lg p-6">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-4xl"><TypeIcon type={incident.type} /></span>
          <div>
            <h1 className="text-2xl font-bold text-white capitalize">{incident.type.replace(/-/g, " ")} Strike</h1>
            <p className="text-gray-400 text-sm">{incident.date} · {incident.time_utc} UTC</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-gray-800 rounded-lg p-3">
            <div className="text-xs text-gray-400 mb-1">Origin</div>
            <div className="text-lg">{incident.origin_flag}</div>
            <div className="text-sm text-white">{incident.origin_country}</div>
          </div>
          <div className="bg-gray-800 rounded-lg p-3">
            <div className="text-xs text-gray-400 mb-1">Target</div>
            <div className="text-lg">{incident.target_flag}</div>
            <div className="text-sm text-white">{incident.target_country} — {incident.target_city}</div>
          </div>
        </div>

        <div className="flex gap-3 mb-4">
          <ImpactBadge level={incident.impact_level} />
          {incident.intercepted === true && (
            <span className="bg-green-900 text-green-300 border border-green-700 px-2 py-0.5 rounded text-xs">Intercepted</span>
          )}
          {incident.intercepted === "partial" && (
            <span className="bg-yellow-900 text-yellow-300 border border-yellow-700 px-2 py-0.5 rounded text-xs">Partially Intercepted</span>
          )}
          {incident.intercepted === false && (
            <span className="bg-red-900 text-red-300 border border-red-700 px-2 py-0.5 rounded text-xs">Struck Target</span>
          )}
        </div>

        <p className="text-gray-300 mb-4">{incident.description}</p>

        <div className="text-sm text-gray-400 mb-4">
          <span className="text-gray-500">Conflict: </span>
          <Link href={`/conflict/${incident.conflict}`} className="text-blue-400 hover:text-blue-300 capitalize">
            {incident.conflict.replace(/-/g, " ")}
          </Link>
        </div>

        <div className="text-sm text-gray-400 mb-4">
          <span className="text-gray-500">Source: </span>
          {incident.source_url ? (
            <a href={incident.source_url} target="_blank" rel="noopener noreferrer" className="text-blue-400 hover:text-blue-300">
              {incident.source}
            </a>
          ) : (
            <span>{incident.source}</span>
          )}
        </div>

        <div className="flex flex-wrap gap-1">
          {incident.tags.map((t) => (
            <span key={t} className="text-xs bg-gray-800 border border-gray-700 px-2 py-0.5 rounded text-gray-400">
              #{t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
