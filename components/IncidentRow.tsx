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
    <tr className="border-b border-gray-800 hover:bg-gray-900 transition-colors">
      <td className="py-2.5 pr-3 text-gray-400 whitespace-nowrap text-sm">{incident.date}</td>
      <td className="py-2.5 pr-3 text-xl"><TypeIcon type={incident.type} /></td>
      <td className="py-2.5 pr-3 whitespace-nowrap text-sm">
        <span title={incident.origin_country}>{incident.origin_flag}</span>
        <span className="text-gray-400 mx-1">→</span>
        <span title={incident.target_country}>{incident.target_flag}</span>
      </td>
      <td className="py-2.5 pr-3 text-gray-300 text-sm">{incident.target_city}</td>
      <td className="py-2.5 pr-3"><ImpactBadge level={incident.impact_level} /></td>
      <td className="py-2.5 pr-3 text-xs">
        {incident.intercepted === true && (
          <span className="bg-green-900 text-green-300 border border-green-700 px-1.5 py-0.5 rounded text-xs">intercepted</span>
        )}
        {incident.intercepted === "partial" && (
          <span className="bg-yellow-900 text-yellow-300 border border-yellow-700 px-1.5 py-0.5 rounded text-xs">partial</span>
        )}
        {incident.intercepted === false && (
          <span className="bg-red-900 text-red-300 border border-red-700 px-1.5 py-0.5 rounded text-xs">hit</span>
        )}
      </td>
      <td className="py-2.5 text-xs text-gray-400 max-w-[200px] hidden md:table-cell">{incident.description.slice(0, 80)}...</td>
      <td className="py-2.5 pl-2">
        <Link href={`/incident/${incident.id}`} className="text-xs text-blue-400 hover:text-blue-300">
          Details →
        </Link>
      </td>
    </tr>
  );
}
