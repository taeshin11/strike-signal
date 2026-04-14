import type { Metadata } from "next";
export const metadata: Metadata = { title: "About — Strike Signal", description: "About Strike Signal incident tracker." };
export default function AboutPage() {
  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-white mb-4">About Strike Signal</h1>
      <div className="space-y-4 text-gray-300">
        <p>Strike Signal tracks missile, drone, and airstrike incidents from active conflict zones using open-source data.</p>
        <h2 className="text-lg font-semibold text-white mt-6">Type Icons</h2>
        <ul className="space-y-2 text-sm">
          <li>🚀 Ballistic missile</li>
          <li>✈ Cruise missile / airstrike</li>
          <li>🛸 Drone (UAV / one-way attack)</li>
          <li>🔴 MLRS (rocket artillery)</li>
          <li>⚡ Tactical airstrike</li>
        </ul>
        <p className="text-gray-400 text-sm">No graphic imagery used. All visual elements are emoji and text only.</p>
      </div>
    </div>
  );
}
