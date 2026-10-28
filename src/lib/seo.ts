import type { Metadata } from "next";
import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/config/site";
import { locales, localeLabels, type Locale } from "@/i18n/routing";

export type PageKey = "home" | "projects" | "dashboards" | "about" | "services" | "contact";

/** Alternates canoniques + hreflang pour une page donnée (path sans préfixe de langue, ex. "/projects"). */
export function alternatesFor(locale: Locale, path: string): Metadata["alternates"] {
  const p = path === "/" ? "" : path;
  return {
    canonical: `/${locale}${p}`,
    languages: {
      ...Object.fromEntries(locales.map((l) => [localeLabels[l].htmlLang, `/${l}${p}`])),
      "x-default": `/fr${p}`,
    },
  };
}

export function openGraphFor(locale: Locale, path: string, title: string, description: string): Metadata["openGraph"] {
  const p = path === "/" ? "" : path;
  return {
    type: "website",
    siteName: siteConfig.brand,
    title,
    description,
    url: `/${locale}${p}`,
    locale: localeLabels[locale].og,
    alternateLocale: locales.filter((l) => l !== locale).map((l) => localeLabels[l].og),
  };
}

export async function pageMetadata(locale: Locale, page: PageKey, path: string): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: `meta.${page}` });
  const title = t("title");
  const description = t("description");
  return {
    title: page === "home" ? { absolute: title } : title,
    description,
    alternates: alternatesFor(locale, path),
    openGraph: openGraphFor(locale, path, title, description),
    twitter: { card: "summary_large_image", title, description },
  };
}
