import type { Locale } from "@/i18n/routing";

export type Domain = "health" | "business" | "stats" | "gis" | "other";
export const domains: Domain[] = ["health", "business", "stats", "gis", "other"];

export type DashboardTool = "powerbi" | "python" | "r" | "excel";
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
  /** true = données fictives de démonstration (bandeau d'avertissement affiché). */
  synthetic: boolean;
  featured?: boolean;
  /** Identifiant d'un dashboard de src/content/dashboards.ts */
  dashboardId?: string;
  files: ProjectFile[];
  /** URL du dépôt GitHub. Si absent : bouton désactivé (pas de faux lien). */
  github?: string;
  /** Sources des données : "synthetic" (jeu fictif), "tbd" (à préciser), ou texte libre. */
  sources: string[];
  related?: string[];
  /** Traductions disponibles. Une langue manquante déclenche le repli vers `defaultLocale`. */
  translations: Partial<Record<Locale, ProjectText>>;
}

export interface Dashboard {
  id: string;
  tool: DashboardTool;
  /** Type de démonstration intégrée au site (composant dans src/components/dashboards). */
  demo: "sales" | "epi" | "trial" | "budget";
  tools: string[];
  projectSlug?: string;
  /** URL d'intégration officielle (Power BI « Publier sur le web » ou rapport embarqué autorisé). Vide = non configuré. */
  powerBiEmbedUrl?: string;
  /** URL d'une application externe hébergée (Streamlit Community Cloud, shinyapps.io, Hugging Face Spaces...). Vide = non configuré. */
  externalAppUrl?: string;
  /** Fichier téléchargeable associé (ex. classeur Excel). */
  downloadPath?: string;
}
