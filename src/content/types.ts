import type { Locale } from "@/i18n/routing";

export type Domain = "health" | "business" | "stats" | "gis" | "other";
export const domains: Domain[] = ["health", "business", "stats", "gis", "other"];

export type FileKind = "csv" | "xlsx" | "xls" | "pdf" | "py" | "r" | "sql" | "pbix" | "doc";

export type Localized<T = string> = Record<Locale, T>;

export interface ProjectFile {
  id: string;
  kind: FileKind;
  /** Chemin public (relatif à /public), ex. "/projects/mon-projet/data/fichier.csv". */
  path: string;
  /** Si false : fichier consultable seulement (jamais proposé en téléchargement). */
  downloadable: boolean;
}

/** Texte éditorial d'un projet dans UNE langue. */
export interface ProjectText {
  title: string;
  summary: string;
  context: string;
  problem: string;
  objectives: string[];
  dataDescription: string;
  /** [nom, type, description] */
  variables: [string, string, string][];
  cleaning: string[];
  methodology: string[];
  results: string[];
  recommendations: string[];
  limitations: string[];
}

export interface Project {
  slug: string;
  domain: Domain;
  tools: string[];
  /** AAAA-MM. Facultatif : si absent, aucune date n'est affichée. */
  date?: string;
  /** Image de couverture (chemin public). Si absent : visuel généré selon le domaine. */
  cover?: string;
  /** Captures d'écran du travail réalisé (affichées en entier sur la page du projet). */
  images?: { src: string; width: number; height: number }[];
  featured?: boolean;
  files: ProjectFile[];
  /** URL du dépôt GitHub. Si absent : bouton désactivé (pas de faux lien). */
  github?: string;
  /** Sources des données : "tbd" (à préciser) ou texte libre. */
  sources: string[];
  related?: string[];
  /** Traductions disponibles. Une langue manquante déclenche le repli vers `defaultLocale`. */
  translations: Partial<Record<Locale, ProjectText>>;
}
