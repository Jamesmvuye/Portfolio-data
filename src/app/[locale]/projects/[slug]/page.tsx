import type { Metadata } from "next";
import type { ReactNode } from "react";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import Image from "next/image";
import { notFound } from "next/navigation";
import { ArrowLeft, Code2 } from "lucide-react";
import { routing, localeLabels, locales, type Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { alternatesFor, openGraphFor } from "@/lib/seo";
import { availableLocales, getProject, getRelated, projects, resolveText } from "@/content/projects";
import { toCard } from "@/lib/project-cards";
import { Badge, DisabledButton, ExternalButton, Notice } from "@/components/ui";
import { FileList } from "@/components/FileList";
import { ProjectCard } from "@/components/ProjectCard";
import { ProjectCover } from "@/components/ProjectCover";

type Params = { locale: string; slug: string };

export function generateStaticParams() {
  return locales.flatMap((locale) => projects.map((p) => ({ locale, slug: p.slug })));
}

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { locale, slug } = await params;
  const project = getProject(slug);
  if (!hasLocale(routing.locales, locale) || !project) return {};
  const { text, usedLocale, isFallback } = resolveText(project, locale);
  const path = `/projects/${slug}`;
  const alt = alternatesFor(locale, path) ?? {};
  const available = availableLocales(project);
  return {
    title: text.title,
    description: text.summary,
    alternates: {
      // Repli : la version canonique est celle de la langue réellement affichée (évite le contenu dupliqué).
      canonical: `/${isFallback ? usedLocale : locale}${path}`,
      languages: Object.fromEntries(Object.entries(alt.languages ?? {}).filter(([k]) => k === "x-default" || available.includes(k as Locale))),
    },
    openGraph: openGraphFor(locale, path, text.title, text.summary),
    twitter: { card: "summary_large_image", title: text.title, description: text.summary },
  };
}

function Block({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section aria-labelledby={`${id}-h`} className="scroll-mt-24">
      <h2 id={`${id}-h`} className="font-display text-2xl font-bold tracking-tight">
        {title}
      </h2>
      <div className="mt-4 space-y-4 leading-relaxed text-fg/90">{children}</div>
    </section>
  );
}

const List = ({ items }: { items: string[] }) => (
  <ul className="list-disc space-y-2 pl-5 marker:text-brand">
    {items.map((i) => (
      <li key={i}>{i}</li>
    ))}
  </ul>
);

export default async function ProjectPage({ params }: { params: Promise<Params> }) {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const project = getProject(slug);
  if (!project) notFound();
  setRequestLocale(locale);

  const t = await getTranslations({ locale, namespace: "project" });
  const tc = await getTranslations({ locale, namespace: "common" });
  const td = await getTranslations({ locale, namespace: "domains" });
  const { text, usedLocale, isFallback } = resolveText(project, locale as Locale);
  const related = getRelated(project);
  const date = project.date
    ? new Intl.DateTimeFormat(locale, { month: "long", year: "numeric", timeZone: "UTC" }).format(new Date(`${project.date}-01T00:00:00Z`))
    : null;
  const github = project.github || undefined;

  return (
    <article>
      <header className="border-b border-border bg-surface">
        <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6 sm:py-14">
          <Link href="/projects" className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline">
            <ArrowLeft aria-hidden className="size-4" />
            {tc("backToProjects")}
          </Link>
          <div className="mt-5 flex flex-wrap items-center gap-2">
            <Badge tone="brand">{td(project.domain)}</Badge>
          </div>
          <h1 className="mt-4 max-w-4xl font-display text-3xl font-extrabold tracking-tight sm:text-5xl">{text.title}</h1>
          <p className="mt-4 max-w-3xl text-lg leading-relaxed text-muted">{text.summary}</p>
          <dl className="mt-6 flex flex-wrap gap-x-10 gap-y-3 text-sm">
            {date && (
              <div>
                <dt className="text-muted">{t("projectDate")}</dt>
                <dd className="font-semibold capitalize">{date}</dd>
              </div>
            )}
            <div>
              <dt className="text-muted">{tc("tools")}</dt>
              <dd className="font-semibold">{project.tools.join(" · ")}</dd>
            </div>
            <div>
              <dt className="text-muted">{t("languages")}</dt>
              <dd className="font-semibold">{availableLocales(project).map((l) => localeLabels[l].short).join(" · ")}</dd>
            </div>
          </dl>
        </div>
      </header>

      <div className="mx-auto max-w-6xl space-y-12 px-4 py-12 sm:px-6">
        {isFallback && (
          <Notice tone="info" role="status">
            {t("fallbackNotice", { requested: localeLabels[locale as Locale].name, shown: localeLabels[usedLocale].name })}
          </Notice>
        )}

        {project.images?.length ? (
          <div className="space-y-4">
            {project.images.map((img, i) => (
              <figure key={img.src} className="overflow-hidden rounded-2xl border border-border bg-surface">
                <Image src={img.src} alt={`${t("captureAlt")} ${text.title}`} width={img.width} height={img.height} priority={i === 0} sizes="(min-width: 1152px) 1100px, 100vw" className="h-auto w-full" />
                <figcaption className="border-t border-border px-4 py-2 text-xs text-muted">{t("captureCaption")}</figcaption>
              </figure>
            ))}
          </div>
        ) : (
          <div className="overflow-hidden rounded-2xl border border-border">
            <ProjectCover domain={project.domain} cover={project.cover} priority />
          </div>
        )}

        <div className="grid gap-12 lg:grid-cols-[1fr_20rem]">
          <div className="min-w-0 space-y-12" lang={localeLabels[usedLocale].htmlLang}>
            {text.context && (
              <Block id="context" title={t("context")}>
                <p>{text.context}</p>
                {text.problem && (
                  <>
                    <h3 className="pt-2 font-display text-lg font-bold">{t("problem")}</h3>
                    <p>{text.problem}</p>
                  </>
                )}
              </Block>
            )}

            {text.objectives.length > 0 && (
              <Block id="objectives" title={t("objectives")}>
                <List items={text.objectives} />
              </Block>
            )}

            <Block id="data" title={t("data")}>
              <p>{text.dataDescription}</p>
              <p className="text-sm text-muted">
                <strong className="text-fg">{t("dataSources")} :</strong> {project.sources.map((s) => (s === "tbd" ? t("sourceTbd") : s)).join(" ")}
              </p>
              {text.variables.length > 0 && (
                <>
                  <h3 className="pt-2 font-display text-lg font-bold">{t("variables")}</h3>
                  <div className="overflow-x-auto rounded-xl border border-border">
                    <table className="w-full min-w-[32rem] text-left text-sm">
                      <thead className="bg-surface-2 text-xs uppercase tracking-wide text-muted">
                        <tr>
                          <th scope="col" className="px-4 py-2.5">{t("varName")}</th>
                          <th scope="col" className="px-4 py-2.5">{t("varType")}</th>
                          <th scope="col" className="px-4 py-2.5">{t("varDesc")}</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-border bg-surface">
                        {text.variables.map(([name, type, desc]) => (
                          <tr key={name}>
                            <th scope="row" className="px-4 py-2.5 font-mono text-xs font-semibold">{name}</th>
                            <td className="px-4 py-2.5 text-muted">{type}</td>
                            <td className="px-4 py-2.5">{desc}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </>
              )}
            </Block>

            {text.cleaning.length > 0 && (
              <Block id="cleaning" title={t("cleaning")}>
                <List items={text.cleaning} />
              </Block>
            )}

            <Block id="methodology" title={t("methodology")}>
              <List items={text.methodology} />
              <p className="pt-2 text-sm text-muted">
                <strong className="text-fg">{t("tools")} :</strong> {project.tools.join(", ")}
              </p>
            </Block>

            <Block id="results" title={t("results")}>
              <List items={text.results} />
            </Block>

            {text.recommendations.length > 0 && (
              <Block id="recommendations" title={t("recommendations")}>
                <List items={text.recommendations} />
              </Block>
            )}

            <Block id="limitations" title={t("limitations")}>
              <List items={text.limitations} />
            </Block>
          </div>

          <aside className="space-y-8 lg:sticky lg:top-24 lg:self-start" aria-label={t("files")}>
            <section aria-labelledby="files-h">
              <h2 id="files-h" className="font-display text-xl font-bold">
                {t("files")}
              </h2>
              <p className="mt-2 text-sm text-muted">{project.files.length > 0 ? t("filesLead") : t("noFiles")}</p>
              {project.files.length > 0 && (
                <div className="mt-4">
                  <FileList files={project.files} locale={locale} />
                </div>
              )}
              <div className="mt-4">
                {github ? (
                  <ExternalButton href={github} variant="secondary" newTabLabel={tc("externalLink")} className="w-full">
                    <Code2 aria-hidden className="size-4" />
                    {t("github")}
                  </ExternalButton>
                ) : (
                  <DisabledButton hint={tc("comingSoon")}>
                    <Code2 aria-hidden className="size-4" />
                    {t("githubSoon")}
                  </DisabledButton>
                )}
              </div>
            </section>
          </aside>
        </div>

        {related.length > 0 && (
          <section aria-labelledby="related-h" className="border-t border-border pt-12">
            <h2 id="related-h" className="font-display text-2xl font-bold tracking-tight">
              {t("related")}
            </h2>
            <ul className="mt-6 grid gap-6 md:grid-cols-2">
              {related.map((p) => (
                <li key={p.slug}>
                  <ProjectCard project={toCard(p, locale as Locale)} />
                </li>
              ))}
            </ul>
          </section>
        )}
      </div>
    </article>
  );
}

