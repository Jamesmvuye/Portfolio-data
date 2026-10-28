import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { ArrowRight, Database, LayoutDashboard, Map, Sigma, Sparkles } from "lucide-react";
import { routing, type Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { pageMetadata } from "@/lib/seo";
import { projects } from "@/content/projects";
import { toCard } from "@/lib/project-cards";
import { Hero } from "@/components/Hero";
import { ProjectCard } from "@/components/ProjectCard";
import { ButtonLink, Section, SectionHeading } from "@/components/ui";
import { serviceIcons, serviceKeys } from "@/components/ServiceCards";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  return pageMetadata(locale, "home", "/");
}

const skillCards = [
  { key: "analysis", icon: Database, tools: ["Python", "pandas", "SQL", "Excel"] },
  { key: "viz", icon: LayoutDashboard, tools: ["Power BI", "Excel", "Python"] },
  { key: "stats", icon: Sigma, tools: ["R", "Python"] },
  { key: "gis", icon: Map, tools: ["QGIS"] },
  { key: "ai", icon: Sparkles, tools: [] as string[] },
] as const;

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const l = locale as Locale;

  const t = await getTranslations({ locale, namespace: "home" });
  const tc = await getTranslations({ locale, namespace: "common" });
  const ts = await getTranslations({ locale, namespace: "skills" });
  const tsv = await getTranslations({ locale, namespace: "services.items" });
  const featured = projects.filter((p) => p.featured).slice(0, 3);

  return (
    <>
      <Hero locale={locale} />

      <Section id="projects">
        <SectionHeading
          title={t("featuredTitle")}
          lead={t("featuredLead")}
          action={
            <ButtonLink href="/projects" variant="secondary">
              {tc("seeAll")}
              <ArrowRight aria-hidden className="size-4" />
            </ButtonLink>
          }
        />
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <ProjectCard key={p.slug} project={toCard(p, l)} />
          ))}
        </div>
      </Section>

      <Section id="skills" tone="alt">
        <SectionHeading title={t("skillsTitle")} lead={t("skillsLead")} />
        <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {skillCards.map(({ key, icon: Icon, tools }) => (
            <li key={key} className="rounded-2xl border border-border bg-surface p-6">
              <span className="grid size-11 place-items-center rounded-xl bg-brand-soft text-brand">
                <Icon aria-hidden className="size-5" />
              </span>
              <h3 className="mt-4 font-display text-lg font-bold">{ts(`${key}.title`)}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{ts(`${key}.text`)}</p>
              {tools.length > 0 && (
                <ul className="mt-4 flex flex-wrap gap-1.5">
                  {tools.map((tool) => (
                    <li key={tool} className="rounded-md border border-border px-2 py-0.5 text-xs font-medium text-muted">
                      {tool}
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
        </ul>
      </Section>

      <Section id="services" tone="alt">
        <SectionHeading
          title={t("servicesTitle")}
          lead={t("servicesLead")}
          action={
            <ButtonLink href="/services" variant="secondary">
              {tc("seeAll")}
              <ArrowRight aria-hidden className="size-4" />
            </ButtonLink>
          }
        />
        <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {serviceKeys.map((key) => {
            const Icon = serviceIcons[key];
            return (
              <li key={key} className="rounded-2xl border border-border bg-surface p-5">
                <Icon aria-hidden className="size-6 text-brand" />
                <h3 className="mt-3 font-display text-base font-bold leading-snug">{tsv(`${key}.title`)}</h3>
              </li>
            );
          })}
        </ul>
      </Section>

      <Section id="about">
        <div className="grid items-center gap-8 lg:grid-cols-[1fr_auto]">
          <div className="max-w-3xl">
            <h2 className="font-display text-3xl font-bold tracking-tight sm:text-4xl">{t("aboutTitle")}</h2>
            <p className="mt-4 text-lg leading-relaxed text-muted">{t("aboutText")}</p>
          </div>
          <ButtonLink href="/about" variant="secondary">
            {t("aboutCta")}
            <ArrowRight aria-hidden className="size-4" />
          </ButtonLink>
        </div>
      </Section>

      <section className="border-t border-border bg-brand text-on-brand">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-4 py-14 sm:px-6 md:flex-row md:items-center">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl font-bold tracking-tight">{t("ctaTitle")}</h2>
            <p className="mt-2 text-lg opacity-90">{t("ctaText")}</p>
          </div>
          <Link
            href="/contact?type=collab"
            className="inline-flex items-center gap-2 rounded-lg bg-surface px-6 py-3 text-sm font-bold text-brand-strong shadow transition-transform hover:-translate-y-0.5"
          >
            {t("ctaButton")}
            <ArrowRight aria-hidden className="size-4" />
          </Link>
        </div>
      </section>
    </>
  );
}

