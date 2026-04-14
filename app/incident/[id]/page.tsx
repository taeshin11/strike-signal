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
      <Link href="/" className="text-sm text-red-400 hover:text-red-300 font-mono mb-6 inline-flex items-center gap-1">← All Incidents</Link>

      <div className="bg-zinc-800 border border-zinc-700 rounded-2xl p-6">
        <div className="flex items-center gap-3 mb-4">
          <span className="text-4xl"><TypeIcon type={incident.type} /></span>
          <div>
            <h1 className="text-2xl font-bold text-zinc-100 capitalize">{incident.type.replace(/-/g, " ")} Strike</h1>
            <p className="text-zinc-400 text-sm font-mono">{incident.date} · {incident.time_utc} UTC</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-6">
          <div className="bg-zinc-900/60 rounded-xl p-3 border border-zinc-700">
            <div className="text-xs text-zinc-500 mb-1 font-mono uppercase">Origin</div>
            <div className="text-lg">{incident.origin_flag}</div>
            <div className="text-sm text-zinc-200">{incident.origin_country}</div>
          </div>
          <div className="bg-zinc-900/60 rounded-xl p-3 border border-zinc-700">
            <div className="text-xs text-zinc-500 mb-1 font-mono uppercase">Target</div>
            <div className="text-lg">{incident.target_flag}</div>
            <div className="text-sm text-zinc-200">{incident.target_country} — {incident.target_city}</div>
          </div>
        </div>

        <div className="flex flex-wrap gap-3 mb-4">
          <ImpactBadge level={incident.impact_level} />
          {incident.intercepted === true && (
            <span className="text-xs text-green-400 font-mono font-semibold">INTERCEPTED</span>
          )}
          {incident.intercepted === "partial" && (
            <span className="text-xs text-yellow-400 font-mono font-semibold">PARTIAL INTERCEPT</span>
          )}
          {incident.intercepted === false && (
            <span className="text-xs text-red-400 font-mono font-semibold">STRUCK TARGET</span>
          )}
        </div>

        <p className="text-zinc-300 mb-4 leading-relaxed">{incident.description}</p>

        <div className="text-sm text-zinc-400 mb-4">
          <span className="text-zinc-500">Conflict: </span>
          <Link href={`/conflict/${incident.conflict}`} className="text-red-400 hover:text-red-300 capitalize">
            {incident.conflict.replace(/-/g, " ")}
          </Link>
        </div>

        <div className="text-sm text-zinc-400 mb-4">
          <span className="text-zinc-500">Source: </span>
          {incident.source_url ? (
            <a href={incident.source_url} target="_blank" rel="noopener noreferrer" className="text-red-400 hover:text-red-300">
              {incident.source}
            </a>
          ) : (
            <span>{incident.source}</span>
          )}
        </div>

        <div className="flex flex-wrap gap-1.5">
          {incident.tags.map((t) => (
            <span key={t} className="text-xs bg-zinc-900 border border-zinc-700 px-2 py-0.5 rounded-full text-zinc-500 font-mono">
              #{t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
