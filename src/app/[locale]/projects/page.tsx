import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing, type Locale } from "@/i18n/routing";
import { pageMetadata } from "@/lib/seo";
import { allTools, projects } from "@/content/projects";
import { toCard } from "@/lib/project-cards";
import { ProjectsExplorer } from "@/components/ProjectsExplorer";
import { Notice, PageHeader, Section } from "@/components/ui";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  return pageMetadata(locale, "projects", "/projects");
}

export default async function ProjectsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "projectsPage" });
  const th = await getTranslations({ locale, namespace: "home" });

  return (
    <>
      <PageHeader title={t("title")} lead={t("lead")} />
      <Section>
        <div className="mb-6">
          <Notice tone="info">{th("syntheticNote")}</Notice>
        </div>
        <ProjectsExplorer projects={projects.map((p) => toCard(p, locale as Locale))} tools={allTools()} />
      </Section>
    </>
  );
}
