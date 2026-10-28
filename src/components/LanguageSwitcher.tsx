"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { locales, localeLabels } from "@/i18n/routing";
import clsx from "clsx";

/**
 * Sélecteur de langue : conserve la page courante (y compris /projects/[slug]).
 * Les pages de projet gèrent elles-mêmes le repli si une traduction est absente.
 */
export function LanguageSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("nav");

  return (
    <nav aria-label={t("language")} className={clsx("rounded-lg border border-border bg-surface p-0.5", className ?? "inline-flex")}>
      {locales.map((l) => {
        const active = l === locale;
        return (
          <Link
            key={l}
            href={pathname}
            locale={l}
            lang={localeLabels[l].htmlLang}
            hrefLang={localeLabels[l].htmlLang}
            title={localeLabels[l].name}
            aria-label={localeLabels[l].name}
            aria-current={active ? "true" : undefined}
            className={clsx(
              "rounded-md px-2.5 py-1.5 text-xs font-bold tracking-wide transition-colors",
              active ? "bg-brand text-on-brand" : "text-muted hover:bg-brand-soft hover:text-brand",
            )}
          >
            {localeLabels[l].short}
          </Link>
        );
      })}
    </nav>
  );
}
