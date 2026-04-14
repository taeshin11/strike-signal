import type { Metadata } from "next";
export const metadata: Metadata = { title: "About — Strike Signal", description: "About Strike Signal incident tracker." };
export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-zinc-100 mb-6">About Strike Signal</h1>
      <div className="space-y-4">
        <p className="text-zinc-400 leading-relaxed">Strike Signal tracks missile, drone, and airstrike incidents from active conflict zones using open-source data.</p>

        <div className="bg-zinc-800 rounded-2xl border border-zinc-700 p-5">
          <h2 className="text-lg font-bold text-zinc-100 mb-3">Type Icons</h2>
          <ul className="space-y-2 text-sm">
            <li className="flex items-center gap-3 text-zinc-300"><span className="text-lg">🚀</span> Ballistic missile</li>
            <li className="flex items-center gap-3 text-zinc-300"><span className="text-lg">✈</span> Cruise missile</li>
            <li className="flex items-center gap-3 text-zinc-300"><span className="text-lg">🛸</span> Drone (UAV / one-way attack)</li>
            <li className="flex items-center gap-3 text-zinc-300"><span className="text-lg">🔴</span> MLRS (rocket artillery)</li>
            <li className="flex items-center gap-3 text-zinc-300"><span className="text-lg">⚡</span> Tactical airstrike</li>
          </ul>
        </div>

        <div className="bg-zinc-800 rounded-2xl border border-zinc-700 p-5">
          <h2 className="text-lg font-bold text-zinc-100 mb-3">Data Sources</h2>
          <ul className="space-y-1.5 text-sm text-zinc-400">
            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0"></span>ISW — Institute for the Study of War</li>
            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0"></span>IDF — Israel Defense Forces</li>
            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0"></span>CENTCOM — US Central Command</li>
            <li className="flex items-center gap-2"><span className="w-1.5 h-1.5 rounded-full bg-red-500 flex-shrink-0"></span>UKMTO — UK Maritime Trade Operations</li>
          </ul>
        </div>

        <p className="text-zinc-500 text-sm font-mono">No graphic imagery used. All visual elements are emoji and text only.</p>
      </div>
    </div>
  );
}
