const TYPE_ICONS: Record<string, string> = {
  "ballistic-missile": "🚀",
  "cruise-missile": "✈",
  "drone": "🛸",
  "MLRS": "🔴",
  "airstrike": "⚡",
};

export default function TypeIcon({ type }: { type: string }) {
  return <span title={type}>{TYPE_ICONS[type] || "💥"}</span>;
}
