import type { Dashboard } from "./types";

/**
 * REGISTRE DES DASHBOARDS.
 * - `demo` : démonstration interactive intégrée (données SYNTHÉTIQUES, composants Recharts).
 * - `powerBiEmbedUrl` : URL d'intégration Power BI officielle (laisser vide tant que le rapport n'est pas publié).
 * - `externalAppUrl` : URL d'une application Python/R hébergée ailleurs (Streamlit Community Cloud, shinyapps.io...).
 * Les textes (titre, objectifs, indicateurs) sont dans messages/<locale>.json > dashboards.items.<id>
 */
export const dashboards: Dashboard[] = [
  {
    id: "sales",
    tool: "powerbi",
    demo: "sales",
    tools: ["Power BI", "SQL", "DAX"],
    projectSlug: "bi-ventes-multi-regions",
    powerBiEmbedUrl: "",
  },
  {
    id: "epi",
    tool: "python",
    demo: "epi",
    tools: ["Python", "pandas"],
    projectSlug: "epidemio-surveillance-hebdomadaire",
    externalAppUrl: "",
  },
  {
    id: "trial",
    tool: "r",
    demo: "trial",
    tools: ["R"],
    projectSlug: "etude-statistique-deux-groupes",
    externalAppUrl: "",
  },
  {
    id: "budget",
    tool: "excel",
    demo: "budget",
    tools: ["Excel"],
    projectSlug: "tableau-bord-excel-budget",
    downloadPath: "/projects/tableau-bord-excel-budget/data/budget_synthetique.xlsx",
  },
];

export function getDashboard(id: string): Dashboard | undefined {
  return dashboards.find((d) => d.id === id);
}
