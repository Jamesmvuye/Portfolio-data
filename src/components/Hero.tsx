import { getTranslations } from "next-intl/server";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/config/site";
import { ButtonLink } from "./ui";
import { ProfilePhoto } from "./ProfilePhoto";

export async function Hero({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "hero" });

  return (
    <section aria-labelledby="hero-title" className="relative overflow-hidden border-b border-border bg-surface">
      <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1.2fr_0.8fr] lg:py-24">
        <div>
          <p className="fade-up inline-flex items-center gap-2 rounded-full border border-border bg-brand-soft px-3 py-1 text-xs font-bold uppercase tracking-widest text-brand-strong">
            <span aria-hidden className="size-1.5 rounded-full bg-brand" />
            {t("eyebrow")}
          </p>
          <h1 id="hero-title" className="fade-up fade-up-2 mt-5 font-display text-4xl font-extrabold tracking-tight text-fg sm:text-5xl lg:text-6xl">
            {siteConfig.name}
          </h1>
          <p className="fade-up fade-up-2 mt-3 font-display text-lg font-semibold text-brand sm:text-xl">{t("role")}</p>
          <p className="fade-up fade-up-3 mt-5 max-w-xl text-lg leading-relaxed text-muted">{t("intro")}</p>
          <p className="fade-up fade-up-3 mt-3 text-sm text-muted">{t("audience")}</p>
          <div className="fade-up fade-up-3 mt-8 flex flex-wrap gap-3">
            <ButtonLink href="/projects">
              {t("ctaProjects")}
              <ArrowRight aria-hidden className="size-4" />
            </ButtonLink>
            <ButtonLink href="/contact" variant="secondary">
              {t("ctaContact")}
            </ButtonLink>
          </div>
        </div>

        {/* À droite sur ordinateur ; sous le texte (nom et boutons d'abord) sur mobile */}
        <ProfilePhoto locale={locale} />
      </div>
    </section>
  );
}
