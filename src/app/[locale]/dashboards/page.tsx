import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/seo";
import { projects } from "@/content/projects";
import { toCard } from "@/lib/project-cards";
import { ProjectCard } from "@/components/ProjectCard";
import { PageHeader, Section } from "@/components/ui";

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

  return (
    <>
      <PageHeader title={t("title")} lead={t("lead")} />
      <Section>
        <h2 className="font-display text-3xl font-bold tracking-tight">{t("realTitle")}</h2>
        <p className="mt-3 max-w-2xl text-lg text-muted">{t("realLead")}</p>
        <ul className="mt-8 grid gap-6 md:grid-cols-2">
          {projects.map((p) => (
            <li key={p.slug}>
              <ProjectCard project={toCard(p, locale as Locale)} />
            </li>
          ))}
        </ul>
      </Section>
    </>
  );
}
