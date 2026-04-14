import type { MetadataRoute } from "next";
import { promises as fs } from "fs";
import path from "path";
const BASE_URL = "https://strike-signal.vercel.app";
const LOCALES = ["en", "ar", "zh", "ru", "fr", "de", "es", "uk"];
type Incident = { id: string; conflict: string };
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const raw = await fs.readFile(path.join(process.cwd(), "public/data/incidents.json"), "utf-8");
  const incidents: Incident[] = JSON.parse(raw).incidents;
  const conflicts = [...new Set(incidents.map((i) => i.conflict))];
  const routes = ["", "/about", ...conflicts.map((c) => `/conflict/${c}`), ...incidents.map((i) => `/incident/${i.id}`)];
  return LOCALES.flatMap((locale) =>
    routes.map((r) => ({ url: `${BASE_URL}/${locale}${r}`, lastModified: new Date("2026-04-14"), changeFrequency: "daily" as const, priority: r === "" ? 1 : 0.8 }))
  );
}
