import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { siteConfig } from "@/config/site";
import { ContactLinks } from "./ContactLinks";

const nav = [
  ["/projects", "projects"],
  ["/dashboards", "dashboards"],
  ["/services", "services"],
  ["/about", "about"],
  ["/contact", "contact"],
] as const;

export async function Footer({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "footer" });
  const tn = await getTranslations({ locale, namespace: "nav" });
  const showTranslationNote = locale !== "fr";

  return (
    <footer className="border-t border-border bg-surface">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr_1.2fr]">
        <div>
          <p className="font-display text-lg font-bold">{siteConfig.brand}</p>
          <p className="mt-1 text-sm font-medium text-fg">{siteConfig.name}</p>
          <p className="mt-3 max-w-xs text-sm leading-relaxed text-muted">{t("tagline")}</p>
        </div>
        <nav aria-label={t("navTitle")}>
          <p className="text-sm font-semibold text-fg">{t("navTitle")}</p>
          <ul className="mt-3 space-y-2 text-sm">
            {nav.map(([href, key]) => (
              <li key={key}>
                <Link href={href} className="text-muted hover:text-brand">
                  {tn(key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <p className="mb-3 text-sm font-semibold text-fg">{t("contactTitle")}</p>
          <ContactLinks locale={locale} variant="inline" />
        </div>
      </div>
      <div className="border-t border-border">
        <div className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-5 text-xs text-muted sm:flex-row sm:justify-between sm:px-6">
          <p>
            © {new Date().getFullYear()} {siteConfig.name} — {siteConfig.brand}. {t("rights")}
          </p>
          {showTranslationNote && <p>{t("translationNote")}</p>}
        </div>
      </div>
    </footer>
  );
}
