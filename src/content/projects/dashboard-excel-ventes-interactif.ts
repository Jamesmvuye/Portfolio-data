import type { Project } from "../types";

/** Travail réalisé : présenté par captures d'écran. Fichiers sources non publiés (les ajouter dans `files` s'ils sont autorisés). */
export const project: Project = {
  slug: "dashboard-excel-ventes-interactif",
  domain: "business",
  tools: ["Excel"],
  synthetic: false,
  cover: "/projects/dashboard-excel-ventes-interactif/images/capture.webp",
  images: [{ src: "/projects/dashboard-excel-ventes-interactif/images/capture.webp", width: 1360, height: 681 }],
  files: [
    { id: "xlsx", kind: "xlsx", path: "/projects/dashboard-excel-ventes-interactif/data/tableau-de-bord-ventes.xlsx", downloadable: true },
  ],
  sources: ["tbd"],
  related: ["dashboard-excel-vente-2025","bi-ventes-multi-regions"],
  translations: {
      "fr": {
          "title": "Tableau de bord interactif des ventes sous Excel (2020-2021)",
          "summary": "Tableau de bord Excel interactif : ventes en dollars par mois, par détaillant, par méthode de vente et par région, filtrables par année, région et produit.",
          "context": "Un classeur Excel structuré en feuilles d'analyse (données, détaillants, méthode de vente, ventes par région, tendances) et en un tableau de bord interactif pour explorer les ventes des années 2020 et 2021.",
          "objectives": [
              "Suivre l'évolution mensuelle des ventes en dollars.",
              "Comparer les détaillants, les méthodes de vente et les régions.",
              "Permettre à l'utilisateur de filtrer lui-même par année, région et produit."
          ],
          "dataDescription": "Table de ventes (feuille « Données ») sur les années 2020 et 2021, avec région, produit, détaillant et méthode de vente. La source des données est à préciser par l'auteur.",
          "methodology": [
              "Tableaux croisés dynamiques et graphiques croisés dynamiques, un par feuille d'analyse.",
              "Segments (filtres visuels) pour les années, les régions et les produits.",
              "Courbe mensuelle, anneau (méthode de vente), barres (détaillants) et carte des ventes par région."
          ],
          "results": [
              "Un tableau de bord sur une page, entièrement filtrable, qui rassemble quatre visualisations (voir la capture).",
              "Aucune conclusion chiffrée n'est tirée ici : la capture est filtrée par des segments."
          ],
          "limitations": [
              "La capture est filtrée par des segments : les chiffres affichés ne représentent qu'une sélection."
          ],
          "problem": "",
          "variables": [],
          "cleaning": [],
          "recommendations": []
      },
      "en": {
          "title": "Interactive sales dashboard in Excel (2020-2021)",
          "summary": "Interactive Excel dashboard: sales in dollars by month, retailer, sales method and region, filterable by year, region and product.",
          "context": "An Excel workbook organised into analysis sheets (data, retailers, sales method, sales by region, trends) and an interactive dashboard to explore sales for 2020 and 2021.",
          "objectives": [
              "Track monthly sales in dollars.",
              "Compare retailers, sales methods and regions.",
              "Let users filter by year, region and product themselves."
          ],
          "dataDescription": "Sales table (“Données” sheet) covering 2020 and 2021, with region, product, retailer and sales method. The data source is to be specified by the author.",
          "methodology": [
              "PivotTables and PivotCharts, one per analysis sheet.",
              "Slicers (visual filters) for years, regions and products.",
              "Monthly line chart, donut (sales method), bars (retailers) and a map of sales by region."
          ],
          "results": [
              "A one-page, fully filterable dashboard combining four visualisations (see the screenshot).",
              "No numeric conclusion is drawn here: the screenshot is filtered by slicers."
          ],
          "limitations": [
              "The screenshot is filtered by slicers: figures shown represent only a selection."
          ],
          "problem": "",
          "variables": [],
          "cleaning": [],
          "recommendations": []
      },
      "es": {
          "title": "Panel interactivo de ventas en Excel (2020-2021)",
          "summary": "Panel interactivo de Excel: ventas en dólares por mes, minorista, método de venta y región, filtrables por año, región y producto.",
          "context": "Un libro de Excel organizado en hojas de análisis (datos, minoristas, método de venta, ventas por región, tendencias) y un panel interactivo para explorar las ventas de 2020 y 2021.",
          "objectives": [
              "Seguir la evolución mensual de las ventas en dólares.",
              "Comparar minoristas, métodos de venta y regiones.",
              "Permitir que el usuario filtre por año, región y producto."
          ],
          "dataDescription": "Tabla de ventas (hoja «Données») de 2020 y 2021, con región, producto, minorista y método de venta. La fuente de los datos debe ser precisada por el autor.",
          "methodology": [
              "Tablas y gráficos dinámicos, uno por hoja de análisis.",
              "Segmentaciones (filtros visuales) para años, regiones y productos.",
              "Curva mensual, anillo (método de venta), barras (minoristas) y mapa de ventas por región."
          ],
          "results": [
              "Un panel de una página, totalmente filtrable, que reúne cuatro visualizaciones (véase la captura).",
              "Aquí no se extrae ninguna conclusión numérica: la captura está filtrada por segmentaciones."
          ],
          "limitations": [
              "La captura está filtrada por segmentaciones: las cifras mostradas representan solo una selección."
          ],
          "problem": "",
          "variables": [],
          "cleaning": [],
          "recommendations": []
      },
      "de": {
          "title": "Interaktives Vertriebs-Dashboard in Excel (2020-2021)",
          "summary": "Interaktives Excel-Dashboard: Umsatz in Dollar nach Monat, Händler, Verkaufsart und Region, filterbar nach Jahr, Region und Produkt.",
          "context": "Eine Excel-Arbeitsmappe mit Analyseblättern (Daten, Händler, Verkaufsart, Umsatz nach Region, Trends) und einem interaktiven Dashboard zur Erkundung der Umsätze 2020 und 2021.",
          "objectives": [
              "Den monatlichen Umsatz in Dollar verfolgen.",
              "Händler, Verkaufsarten und Regionen vergleichen.",
              "Nutzenden ermöglichen, selbst nach Jahr, Region und Produkt zu filtern."
          ],
          "dataDescription": "Verkaufstabelle (Blatt „Données“) für 2020 und 2021 mit Region, Produkt, Händler und Verkaufsart. Die Datenquelle ist vom Autor anzugeben.",
          "methodology": [
              "PivotTables und PivotCharts, je eines pro Analyseblatt.",
              "Datenschnitte (visuelle Filter) für Jahre, Regionen und Produkte.",
              "Monatslinie, Ring (Verkaufsart), Balken (Händler) und Karte des Umsatzes nach Region."
          ],
          "results": [
              "Ein einseitiges, vollständig filterbares Dashboard mit vier Visualisierungen (siehe Screenshot).",
              "Hier wird keine Zahlenaussage abgeleitet: Der Screenshot ist durch Datenschnitte gefiltert."
          ],
          "limitations": [
              "Der Screenshot ist durch Datenschnitte gefiltert: Die gezeigten Zahlen stellen nur eine Auswahl dar."
          ],
          "problem": "",
          "variables": [],
          "cleaning": [],
          "recommendations": []
      }
  },
};
