import type { Project } from "../types";

/** Travail réalisé : présenté par captures d'écran. Fichiers sources non publiés (les ajouter dans `files` s'ils sont autorisés). */
export const project: Project = {
  slug: "powerbi-resultats-academiques-2024-2025",
  domain: "other",
  tools: ["Power BI"],
  synthetic: false,
  featured: true,
  cover: "/projects/powerbi-resultats-academiques-2024-2025/images/capture.webp",
  images: [{ src: "/projects/powerbi-resultats-academiques-2024-2025/images/capture.webp", width: 1360, height: 711 }],
  files: [],
  sources: ["tbd"],
  related: ["powerbi-surveillance-ebola-rdc","dashboard-excel-vente-2025"],
  translations: {
      "fr": {
          "title": "Résultats académiques 2024-2025 : rapport Power BI",
          "summary": "Rapport Power BI sur l'année académique 2024-2025 : effectifs, notes (moyenne, minimum, maximum), statut admis/ajourné, répartition par département, pays et sexe.",
          "context": "Ce rapport Power BI synthétise les résultats d'une année académique pour aider à lire rapidement les effectifs et les performances par département, pays et sexe.",
          "objectives": [
              "Résumer les indicateurs clés : nombre d'étudiants, note moyenne, note maximale et minimale, âge moyen.",
              "Comparer les départements et les pays.",
              "Visualiser la part d'admis et d'ajournés et la répartition par sexe."
          ],
          "dataDescription": "Données agrégées sur les étudiants de l'année 2024-2025 (département, pays, sexe, statut, note, âge) chargées dans Power BI. La source des données est à préciser par l'auteur ; aucune donnée individuelle n'est publiée ici.",
          "methodology": [
              "Cartes de synthèse (KPI) : effectif, moyennes, minimum et maximum.",
              "Histogramme par département et barres par pays.",
              "Graphique en secteurs pour le statut (admis/ajourné).",
              "Barres groupées par département et par sexe."
          ],
          "results": [
              "Un tableau de bord d'une page regroupant cinq indicateurs et quatre visualisations (voir la capture).",
              "Les valeurs affichées sont celles du rapport lui-même."
          ],
          "limitations": [
              "Capture d'écran : le fichier du rapport et les données ne sont pas publiés sur ce site.",
              "Aucune interprétation statistique (tests, comparaisons) n'est présentée ici."
          ],
          "problem": "",
          "variables": [],
          "cleaning": [],
          "recommendations": []
      },
      "en": {
          "title": "Academic results 2024-2025: Power BI report",
          "summary": "Power BI report on the 2024-2025 academic year: headcount, scores (mean, minimum, maximum), admitted/deferred status, breakdown by department, country and sex.",
          "context": "This Power BI report summarises an academic year's results to give a quick read of headcounts and performance by department, country and sex.",
          "objectives": [
              "Summarise key indicators: number of students, mean, maximum and minimum score, mean age.",
              "Compare departments and countries.",
              "Visualise the share of admitted and deferred students and the breakdown by sex."
          ],
          "dataDescription": "Aggregated student data for 2024-2025 (department, country, sex, status, score, age) loaded into Power BI. The data source is to be specified by the author; no individual data is published here.",
          "methodology": [
              "Summary cards (KPIs): headcount, means, minimum and maximum.",
              "Column chart by department and bar chart by country.",
              "Pie chart for status (admitted/deferred).",
              "Grouped bars by department and sex."
          ],
          "results": [
              "A one-page dashboard with five indicators and four visualisations (see the screenshot).",
              "Displayed values are those of the report itself."
          ],
          "limitations": [
              "Screenshot only: the report file and data are not published on this site.",
              "No statistical interpretation (tests, comparisons) is presented here."
          ],
          "problem": "",
          "variables": [],
          "cleaning": [],
          "recommendations": []
      },
      "es": {
          "title": "Resultados académicos 2024-2025: informe de Power BI",
          "summary": "Informe de Power BI sobre el año académico 2024-2025: efectivos, notas (media, mínima, máxima), estado admitido/aplazado, desglose por departamento, país y sexo.",
          "context": "Este informe de Power BI resume los resultados de un año académico para leer rápidamente los efectivos y el rendimiento por departamento, país y sexo.",
          "objectives": [
              "Resumir los indicadores clave: número de estudiantes, nota media, máxima y mínima, edad media.",
              "Comparar departamentos y países.",
              "Visualizar la proporción de admitidos y aplazados y el desglose por sexo."
          ],
          "dataDescription": "Datos agregados de estudiantes de 2024-2025 (departamento, país, sexo, estado, nota, edad) cargados en Power BI. La fuente de los datos debe ser precisada por el autor; aquí no se publica ningún dato individual.",
          "methodology": [
              "Tarjetas de resumen (KPI): efectivos, medias, mínima y máxima.",
              "Gráfico de columnas por departamento y de barras por país.",
              "Gráfico circular para el estado (admitido/aplazado).",
              "Barras agrupadas por departamento y sexo."
          ],
          "results": [
              "Un panel de una página con cinco indicadores y cuatro visualizaciones (véase la captura).",
              "Los valores mostrados son los del propio informe."
          ],
          "limitations": [
              "Solo captura: el archivo del informe y los datos no se publican en este sitio.",
              "Aquí no se presenta ninguna interpretación estadística (pruebas, comparaciones)."
          ],
          "problem": "",
          "variables": [],
          "cleaning": [],
          "recommendations": []
      },
      "de": {
          "title": "Akademische Ergebnisse 2024-2025: Power-BI-Bericht",
          "summary": "Power-BI-Bericht zum Studienjahr 2024-2025: Studierendenzahl, Noten (Mittel, Minimum, Maximum), Status zugelassen/vertagt, Aufschlüsselung nach Fachbereich, Land und Geschlecht.",
          "context": "Dieser Power-BI-Bericht fasst die Ergebnisse eines Studienjahres zusammen, um Studierendenzahlen und Leistungen nach Fachbereich, Land und Geschlecht schnell lesbar zu machen.",
          "objectives": [
              "Wichtige Kennzahlen zusammenfassen: Anzahl der Studierenden, Durchschnitts-, Höchst- und Mindestnote, Durchschnittsalter.",
              "Fachbereiche und Länder vergleichen.",
              "Den Anteil zugelassener und vertagter Studierender und die Verteilung nach Geschlecht visualisieren."
          ],
          "dataDescription": "Aggregierte Studierendendaten 2024-2025 (Fachbereich, Land, Geschlecht, Status, Note, Alter), in Power BI geladen. Die Datenquelle ist vom Autor anzugeben; hier werden keine Einzeldaten veröffentlicht.",
          "methodology": [
              "Zusammenfassungskarten (KPIs): Anzahl, Mittelwerte, Minimum und Maximum.",
              "Säulendiagramm nach Fachbereich und Balkendiagramm nach Land.",
              "Kreisdiagramm für den Status (zugelassen/vertagt).",
              "Gruppierte Balken nach Fachbereich und Geschlecht."
          ],
          "results": [
              "Ein einseitiges Dashboard mit fünf Kennzahlen und vier Visualisierungen (siehe Screenshot).",
              "Die angezeigten Werte sind die des Berichts selbst."
          ],
          "limitations": [
              "Nur Screenshot: Berichtsdatei und Daten werden auf dieser Website nicht veröffentlicht.",
              "Hier wird keine statistische Interpretation (Tests, Vergleiche) dargestellt."
          ],
          "problem": "",
          "variables": [],
          "cleaning": [],
          "recommendations": []
      }
  },
};
