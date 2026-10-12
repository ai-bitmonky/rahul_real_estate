import type { MetadataRoute } from "next";
import { guides } from "@/data/guides";
import { projects } from "@/data/projects";
import { site } from "@/data/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  return [
    { url: `${site.url}/`, lastModified: now, changeFrequency: "weekly", priority: 1 },
    ...projects.map((p) => ({
      url: `${site.url}/projects/${p.slug}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
    ...guides.map((g) => ({
      url: `${site.url}/guides/${g.slug}`,
      lastModified: new Date(g.iso),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
