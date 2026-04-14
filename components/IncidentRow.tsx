import Link from "next/link";
import TypeIcon from "./TypeIcon";
import ImpactBadge from "./ImpactBadge";

type Incident = {
  id: string;
  date: string;
  time_utc: string;
  conflict: string;
  origin_country: string;
  origin_flag: string;
  target_country: string;
  target_flag: string;
  target_city: string;
  type: string;
  impact_level: string;
  intercepted: boolean | string;
  description: string;
};

export default function IncidentRow({ incident }: { incident: Incident }) {
  return (
    <tr className="border-b border-zinc-700/50 hover:bg-zinc-700/30 transition-colors">
      <td className="px-4 py-3.5 font-mono text-zinc-400 text-xs whitespace-nowrap">{incident.date}</td>
      <td className="px-4 py-3.5 text-xl"><TypeIcon type={incident.type} /></td>
      <td className="px-4 py-3.5 whitespace-nowrap">
        <span className="text-zinc-300">
          <span title={incident.origin_country}>{incident.origin_flag}</span>
          <span className="text-zinc-500 mx-1">→</span>
          <span title={incident.target_country}>{incident.target_flag}</span>
        </span>
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
      <td className="px-4 py-3.5 text-xs text-zinc-500 max-w-[200px] hidden md:table-cell">{incident.description.slice(0, 80)}...</td>
      <td className="px-4 py-3.5">
        <Link href={`/incident/${incident.id}`} className="text-xs text-red-400 hover:text-red-300 font-mono">
          Details →
        </Link>
      </td>
    </tr>
  );
}
