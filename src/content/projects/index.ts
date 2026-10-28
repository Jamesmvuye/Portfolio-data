import { defaultLocale, locales, type Locale } from "@/i18n/routing";
import type { Domain, Project, ProjectText } from "../types";
import { project as epi } from "./epidemio-surveillance-hebdomadaire";
import { project as sales } from "./bi-ventes-multi-regions";
import { project as trial } from "./etude-statistique-deux-groupes";
import { project as gis } from "./cartographie-accessibilite-qgis";
import { project as budget } from "./tableau-bord-excel-budget";

/**
 * REGISTRE CENTRAL DES PROJETS.
 * Pour ajouter un projet : créer un fichier dans ce dossier et l'ajouter à la liste ci-dessous.
 * Voir README.md > « Ajouter un projet ».
 */
export const projects: Project[] = [epi, sales, trial, gis, budget].sort((a, b) => b.date.localeCompare(a.date));

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}

export function getRelated(project: Project): Project[] {
  return (project.related ?? []).map(getProject).filter((p): p is Project => Boolean(p));
}

export interface ResolvedText {
  text: ProjectText;
  /** Langue réellement utilisée pour le texte. */
  usedLocale: Locale;
  /** true si la langue demandée n'existe pas pour ce projet. */
  isFallback: boolean;
}

/** Texte du projet dans la langue demandée, avec repli explicite (langue par défaut, puis autre langue disponible). */
export function resolveText(project: Project, locale: Locale): ResolvedText {
  const order: Locale[] = [locale, defaultLocale, ...locales];
  for (const l of order) {
    const text = project.translations[l];
    if (text) return { text, usedLocale: l, isFallback: l !== locale };
  }
  throw new Error(`Projet "${project.slug}" sans aucune traduction.`);
}

export function availableLocales(project: Project): Locale[] {
  return locales.filter((l) => project.translations[l]);
}

export function allTools(): string[] {
  return [...new Set(projects.flatMap((p) => p.tools))].sort((a, b) => a.localeCompare(b));
}

export type { Domain };
