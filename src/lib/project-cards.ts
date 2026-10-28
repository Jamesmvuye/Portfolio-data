import type { Locale } from "@/i18n/routing";
import type { Project } from "@/content/types";
import { resolveText } from "@/content/projects";
import type { ProjectCardData } from "@/components/ProjectCard";

export function toCard(project: Project, locale: Locale): ProjectCardData {
  const { text, isFallback } = resolveText(project, locale);
  return {
    slug: project.slug,
    domain: project.domain,
    tools: project.tools,
    title: text.title,
    summary: text.summary,
    date: project.date,
    cover: project.cover,
    partial: isFallback,
  };
}
