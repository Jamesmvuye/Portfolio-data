import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { locales, localeLabels, type Locale } from "@/i18n/routing";
import { availableLocales, projects } from "@/content/projects";

const staticPaths = ["", "/projects", "/dashboards", "/services", "/about", "/contact"];

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url.replace(/\/$/, "");
  const alt = (path: string, ls: readonly Locale[]) => ({
    languages: Object.fromEntries(ls.map((l) => [localeLabels[l].htmlLang, `${base}/${l}${path}`])),
  });

  const pages = staticPaths.flatMap((path) =>
    locales.map((l) => ({
      url: `${base}/${l}${path}`,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.7,
      alternates: alt(path, locales),
    })),
  );

  const projectPages = projects.flatMap((p) => {
    const avail = availableLocales(p);
    return avail.map((l) => ({
      url: `${base}/${l}/projects/${p.slug}`,
      ...(p.date ? { lastModified: new Date(`${p.date}-01`) } : {}),
      changeFrequency: "yearly" as const,
      priority: 0.6,
      alternates: alt(`/projects/${p.slug}`, avail),
    }));
  });

  return [...pages, ...projectPages];
}
