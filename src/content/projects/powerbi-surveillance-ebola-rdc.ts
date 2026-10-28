import type { Project } from "../types";

/** Travail réalisé : présenté par captures d'écran. Fichiers sources non publiés (les ajouter dans `files` s'ils sont autorisés). */
export const project: Project = {
  slug: "powerbi-surveillance-ebola-rdc",
  domain: "health",
  tools: ["Power BI"],
  date: "2026-05",
  featured: true,
  cover: "/projects/powerbi-surveillance-ebola-rdc/images/capture.webp",
  images: [{ src: "/projects/powerbi-surveillance-ebola-rdc/images/capture.webp", width: 1366, height: 723 }],
  files: [
    { id: "pbix", kind: "pbix", path: "/projects/powerbi-surveillance-ebola-rdc/data/ebola-25mai.pbix", downloadable: true },
  ],
  sources: ["tbd"],
  related: ["powerbi-resultats-academiques-2024-2025", "dashboard-excel-vente-2025"],
  translations: {
      "fr": {
          "title": "Surveillance des cas d'Ebola en RDC : rapport Power BI",
          "summary": "Rapport Power BI de suivi de la situation épidémiologique d'Ebola en RDC (situation au 25 mai 2026) : cas suspects et confirmés, décès, évolution par province et répartition par zone de santé.",
          "context": "Ce rapport Power BI présente en une page la situation d'Ebola en République démocratique du Congo à la date du 25 mai 2026, pour permettre un suivi rapide par province et par zone de santé.",
          "objectives": [
              "Afficher les indicateurs clés : cas suspects, cas confirmés, décès suspects, guéris.",
              "Comparer l'évolution entre provinces.",
              "Détailler la répartition des cas par zone de santé avec un filtre interactif."
          ],
          "dataDescription": "Données épidémiologiques agrégées par province et par zone de santé, intégrées dans Power BI. La source précise des données est à indiquer par l'auteur.",
          "methodology": [
              "Cartes d'indicateurs (KPI) pour les cas et décès.",
              "Courbe d'évolution comparant les provinces.",
              "Barres groupées par zone de santé : cas suspects, cas confirmés, décès suspects.",
              "Carte par province et filtre (segment) sur la zone de santé."
          ],
          "results": [
              "Un tableau de bord d'une page, interactif, regroupant indicateurs, évolution, carte et détail par zone de santé (voir la capture).",
              "Les chiffres affichés sont ceux du rapport à la date indiquée dans son titre."
          ],
          "limitations": [
              "Capture d'écran d'un rapport à une date donnée : elle ne reflète pas la situation actuelle."
          ],
          "problem": "",
          "variables": [],
          "cleaning": [],
          "recommendations": []
      },
      "en": {
          "title": "Ebola case surveillance in the DRC: Power BI report",
          "summary": "Power BI report tracking the Ebola situation in the DRC (situation as of 25 May 2026): suspected and confirmed cases, deaths, trends by province and breakdown by health zone.",
          "context": "This one-page Power BI report presents the Ebola situation in the Democratic Republic of the Congo as of 25 May 2026, enabling quick monitoring by province and health zone.",
          "objectives": [
              "Display key indicators: suspected cases, confirmed cases, suspected deaths, recoveries.",
              "Compare trends between provinces.",
              "Break down cases by health zone with an interactive filter."
          ],
          "dataDescription": "Epidemiological data aggregated by province and health zone, loaded into Power BI. The exact data source is to be stated by the author.",
          "methodology": [
              "KPI cards for cases and deaths.",
              "Trend line comparing provinces.",
              "Grouped bars by health zone: suspected cases, confirmed cases, suspected deaths.",
              "Province map and slicer on health zone."
          ],
          "results": [
              "A one-page interactive dashboard combining indicators, trends, a map and health-zone detail (see the screenshot).",
              "Figures shown are those of the report at the date given in its title."
          ],
          "limitations": [
              "Screenshot of a report at a given date: it does not reflect the current situation."
          ],
          "problem": "",
          "variables": [],
          "cleaning": [],
          "recommendations": []
      },
      "es": {
          "title": "Vigilancia de casos de ébola en la RDC: informe de Power BI",
          "summary": "Informe de Power BI de seguimiento de la situación del ébola en la RDC (situación al 25 de mayo de 2026): casos sospechosos y confirmados, fallecimientos, evolución por provincia y desglose por zona de salud.",
          "context": "Este informe de Power BI de una página presenta la situación del ébola en la República Democrática del Congo a fecha de 25 de mayo de 2026, para un seguimiento rápido por provincia y zona de salud.",
          "objectives": [
              "Mostrar los indicadores clave: casos sospechosos, casos confirmados, fallecimientos sospechosos, curados.",
              "Comparar la evolución entre provincias.",
              "Detallar los casos por zona de salud con un filtro interactivo."
          ],
          "dataDescription": "Datos epidemiológicos agregados por provincia y zona de salud, cargados en Power BI. La fuente exacta de los datos debe ser indicada por el autor.",
          "methodology": [
              "Tarjetas de indicadores (KPI) para casos y fallecimientos.",
              "Curva de evolución que compara las provincias.",
              "Barras agrupadas por zona de salud: casos sospechosos, confirmados y fallecimientos sospechosos.",
              "Mapa por provincia y segmentación por zona de salud."
          ],
          "results": [
              "Un panel interactivo de una página que reúne indicadores, evolución, mapa y detalle por zona de salud (véase la captura).",
              "Las cifras mostradas son las del informe en la fecha indicada en su título."
          ],
          "limitations": [
              "Captura de un informe en una fecha concreta: no refleja la situación actual."
          ],
          "problem": "",
          "variables": [],
          "cleaning": [],
          "recommendations": []
      },
      "de": {
          "title": "Überwachung der Ebola-Fälle in der DR Kongo: Power-BI-Bericht",
          "summary": "Power-BI-Bericht zur Ebola-Lage in der DR Kongo (Stand 25. Mai 2026): Verdachts- und bestätigte Fälle, Todesfälle, Entwicklung nach Provinz und Aufschlüsselung nach Gesundheitszone.",
          "context": "Dieser einseitige Power-BI-Bericht stellt die Ebola-Lage in der Demokratischen Republik Kongo zum Stand 25. Mai 2026 dar und ermöglicht eine schnelle Beobachtung nach Provinz und Gesundheitszone.",
          "objectives": [
              "Wichtige Kennzahlen anzeigen: Verdachtsfälle, bestätigte Fälle, Verdachts-Todesfälle, Genesene.",
              "Die Entwicklung zwischen Provinzen vergleichen.",
              "Die Fälle nach Gesundheitszone mit interaktivem Filter aufschlüsseln."
          ],
          "dataDescription": "Epidemiologische Daten, nach Provinz und Gesundheitszone aggregiert und in Power BI geladen. Die genaue Datenquelle ist vom Autor anzugeben.",
          "methodology": [
              "Kennzahlenkarten (KPI) für Fälle und Todesfälle.",
              "Verlaufslinie zum Vergleich der Provinzen.",
              "Gruppierte Balken je Gesundheitszone: Verdachtsfälle, bestätigte Fälle, Verdachts-Todesfälle.",
              "Provinzkarte und Datenschnitt nach Gesundheitszone."
          ],
          "results": [
              "Ein einseitiges interaktives Dashboard mit Kennzahlen, Verlauf, Karte und Detail je Gesundheitszone (siehe Screenshot).",
              "Die gezeigten Zahlen entsprechen dem Bericht zum im Titel genannten Datum."
          ],
          "limitations": [
              "Screenshot eines Berichts zu einem bestimmten Datum: Er spiegelt nicht die aktuelle Lage wider."
          ],
          "problem": "",
          "variables": [],
          "cleaning": [],
          "recommendations": []
      }
  },
};
