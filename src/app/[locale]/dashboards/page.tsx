import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { ArrowRight } from "lucide-react";
import { routing } from "@/i18n/routing";
import { pageMetadata } from "@/lib/seo";
import { dashboards } from "@/content/dashboards";
import { Badge, Notice, PageHeader, Section } from "@/components/ui";
import { DashboardSection } from "@/components/dashboards/DashboardSection";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  return pageMetadata(locale, "dashboards", "/dashboards");
}

export default async function DashboardsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "dashboards" });
  const tc = await getTranslations({ locale, namespace: "common" });

  return (
    <>
      <PageHeader title={t("title")} lead={t("lead")} />
      <Section>
        <Notice role="status">{t("syntheticBanner")}</Notice>

        {/* Galerie : aperçu de chaque dashboard, avec ancre vers la démonstration */}
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {dashboards.map((d) => (
            <li key={d.id} className="group relative flex flex-col rounded-2xl border border-border bg-surface p-5 transition-all hover:-translate-y-1 hover:border-brand/60 hover:shadow-lg hover:shadow-brand/10">
              <div className="flex flex-wrap gap-2">
                <Badge tone="brand">{t(`tool${d.tool.charAt(0).toUpperCase()}${d.tool.slice(1)}` as "toolPowerbi")}</Badge>
                <Badge tone="warn">{tc("synthetic")}</Badge>
              </div>
              <h2 className="mt-3 font-display text-lg font-bold leading-snug">
                <a href={`#${d.id}`} className="after:absolute after:inset-0 after:content-[''] focus-visible:after:rounded-2xl">
                  {t(`items.${d.id}.title`)}
                </a>
              </h2>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{t(`items.${d.id}.summary`)}</p>
              <p className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                {t("openDemo")}
                <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
              </p>
            </li>
          ))}
        </ul>

        <div className="mt-12 space-y-10">
          {dashboards.map((d) => (
            <DashboardSection key={d.id} dashboard={d} locale={locale} />
          ))}
        </div>
      </Section>
    </>
  );
}
