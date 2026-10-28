import { useTranslations } from "next-intl";
import { ArrowRight } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { Badge } from "./ui";
import { ProjectCover } from "./ProjectCover";
import type { Domain } from "@/content/types";

export interface ProjectCardData {
  slug: string;
  domain: Domain;
  tools: string[];
  title: string;
  summary: string;
  date: string;
  synthetic: boolean;
  cover?: string;
  /** Langue demandée absente : le texte affiché est un repli. */
  partial?: boolean;
}

export function ProjectCard({ project }: { project: ProjectCardData }) {
  const t = useTranslations();
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-surface transition-all duration-300 hover:-translate-y-1 hover:border-brand/60 hover:shadow-lg hover:shadow-brand/10">
      <div className="overflow-hidden border-b border-border">
        <ProjectCover domain={project.domain} cover={project.cover} />
      </div>
      <div className="flex flex-1 flex-col p-5">
        <div className="flex flex-wrap items-center gap-2">
          <Badge tone="brand">{t(`domains.${project.domain}`)}</Badge>
          {project.synthetic && <Badge tone="warn">{t("common.synthetic")}</Badge>}
          {project.partial && <Badge>{t("projectsPage.translationPartial")}</Badge>}
        </div>
        <h3 className="mt-3 font-display text-lg font-bold leading-snug text-fg">
          {/* Le lien couvre toute la carte (zone cliquable large) */}
          <Link href={`/projects/${project.slug}`} className="after:absolute after:inset-0 after:content-[''] focus-visible:after:rounded-2xl">
            {project.title}
          </Link>
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted">{project.summary}</p>
        <ul className="mt-4 flex flex-wrap gap-1.5" aria-label={t("common.tools")}>
          {project.tools.map((tool) => (
            <li key={tool} className="rounded-md border border-border px-2 py-0.5 text-xs font-medium text-muted">
              {tool}
            </li>
          ))}
        </ul>
        <p className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
          {t("projectsPage.readMore")}
          <ArrowRight aria-hidden className="size-4 transition-transform group-hover:translate-x-1" />
        </p>
      </div>
    </article>
  );
}
