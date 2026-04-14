const IMPACT_STYLES: Record<string, string> = {
  critical: "bg-red-500/20 text-red-400 border border-red-500/30",
  high: "bg-orange-500/20 text-orange-400 border border-orange-500/30",
  medium: "bg-yellow-500/20 text-yellow-400 border border-yellow-500/30",
  low: "bg-green-500/20 text-green-400 border border-green-500/30",
};

export default function ImpactBadge({ level }: { level: string }) {
  const style = IMPACT_STYLES[level] || "bg-zinc-700 text-zinc-400 border border-zinc-600";
  return (
    <span className={`text-xs px-2 py-0.5 rounded font-medium font-mono ${style}`}>
      {level}
    </span>
  );
}
