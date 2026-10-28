import { defineRouting } from "next-intl/routing";

export const locales = ["fr", "en", "es", "de"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "fr";

export const localeLabels: Record<Locale, { short: string; name: string; htmlLang: string; og: string }> = {
  fr: { short: "FR", name: "Français", htmlLang: "fr", og: "fr_FR" },
  en: { short: "EN", name: "English", htmlLang: "en", og: "en_US" },
  es: { short: "ES", name: "Español", htmlLang: "es", og: "es_ES" },
  de: { short: "DE", name: "Deutsch", htmlLang: "de", og: "de_DE" },
};

export const routing = defineRouting({
  locales,
  defaultLocale,
  localePrefix: "always",
});

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}
