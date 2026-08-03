import type { MetadataRoute } from "next";
import { site } from "@/content/site";
import { angebote } from "@/content/angebote";
import { jobs } from "@/content/karriere";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const statisch: { path: string; priority: number; freq: MetadataRoute.Sitemap[number]["changeFrequency"] }[] = [
    { path: "/", priority: 1, freq: "weekly" },
    { path: "/fuer-jugendaemter", priority: 0.95, freq: "monthly" },
    { path: "/angebote", priority: 0.9, freq: "monthly" },
    { path: "/karriere", priority: 0.9, freq: "weekly" },
    { path: "/fallanfrage", priority: 0.85, freq: "monthly" },
    { path: "/paedagogisches-konzept", priority: 0.8, freq: "yearly" },
    { path: "/ueber-uns", priority: 0.7, freq: "yearly" },
    { path: "/team", priority: 0.7, freq: "monthly" },
    { path: "/kontakt", priority: 0.7, freq: "yearly" },
    { path: "/impressum", priority: 0.2, freq: "yearly" },
    { path: "/datenschutz", priority: 0.2, freq: "yearly" },
  ];

  return [
    ...statisch.map((s) => ({
      url: `${site.url}${s.path === "/" ? "" : s.path}`,
      lastModified: now,
      changeFrequency: s.freq,
      priority: s.priority,
    })),
    ...angebote.map((a) => ({
      url: `${site.url}/angebote/${a.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.85,
    })),
    ...jobs.map((j) => ({
      url: `${site.url}/karriere/${j.slug}`,
      lastModified: new Date(j.datePosted),
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
