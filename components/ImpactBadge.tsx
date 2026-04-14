const IMPACT_STYLES: Record<string, string> = {
  critical: "bg-red-900 text-red-300 border-red-700",
  high: "bg-orange-900 text-orange-300 border-orange-700",
  medium: "bg-yellow-900 text-yellow-300 border-yellow-700",
  low: "bg-green-900 text-green-300 border-green-700",
};

export default function ImpactBadge({ level }: { level: string }) {
  const style = IMPACT_STYLES[level] || "bg-gray-800 text-gray-400 border-gray-600";
  return (
    <span className={`text-xs px-2 py-0.5 rounded border font-medium ${style}`}>
      {level}
    </span>
  );
}
