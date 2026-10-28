import type { Project } from "../types";

/** Travail réalisé : présenté par captures d'écran. Fichiers sources non publiés (les ajouter dans `files` s'ils sont autorisés). */
export const project: Project = {
  slug: "dashboard-excel-vente-2025",
  domain: "business",
  tools: ["Excel"],
  synthetic: false,
  featured: true,
  cover: "/projects/dashboard-excel-vente-2025/images/capture.webp",
  images: [{ src: "/projects/dashboard-excel-vente-2025/images/capture.webp", width: 1360, height: 687 }],
  files: [
    { id: "xlsx", kind: "xlsx", path: "/projects/dashboard-excel-vente-2025/data/ventes-2025.xlsx", downloadable: true },
  ],
  sources: ["tbd"],
  related: ["dashboard-excel-ventes-interactif","powerbi-resultats-academiques-2024-2025"],
  translations: {
      "fr": {
          "title": "Tableau de bord Excel « Vente 2025 » : gérants, produits et paiements",
          "summary": "Tableau de bord Excel de ventes 2025 : performance par gérant et par produit, moyens de paiement et tendance de vente journalière selon la période de la journée.",
          "context": "Un classeur Excel organisé en feuilles de questions d'analyse (Question 2 à 5), d'une base de ventes et d'un tableau de bord interactif qui les rassemble.",
          "objectives": [
              "Comparer les gérants et les produits.",
              "Analyser les moyens de paiement utilisés.",
              "Suivre la tendance journalière par période de la journée (matin, après-midi, soir)."
          ],
          "dataDescription": "Base de ventes 2025 (feuille « BD VENTE ») comportant notamment gérant, produit, moyen de paiement, jour de la semaine, période de la journée et total acheté. La source des données est à préciser par l'auteur.",
          "methodology": [
              "Une feuille par question, avec tableaux et graphiques croisés dynamiques.",
              "Segments pour le moyen de paiement, le gérant et le jour de la semaine.",
              "Graphiques : meilleur gérant, produits, moyens de paiement, tendance journalière."
          ],
          "results": [
              "Un tableau de bord interactif qui rassemble les analyses des questions dans une seule page (voir la capture).",
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
          "title": "Excel dashboard “Sales 2025”: managers, products and payments",
          "summary": "Excel sales dashboard for 2025: performance by manager and product, payment methods and daily sales trend by period of the day.",
          "context": "An Excel workbook organised into analysis question sheets (Question 2 to 5), a sales database and an interactive dashboard bringing them together.",
          "objectives": [
              "Compare managers and products.",
              "Analyse the payment methods used.",
              "Follow the daily trend by period of the day (morning, afternoon, evening)."
          ],
          "dataDescription": "2025 sales database (“BD VENTE” sheet) including manager, product, payment method, weekday, period of the day and total purchase. The data source is to be specified by the author.",
          "methodology": [
              "One sheet per question, with PivotTables and PivotCharts.",
              "Slicers for payment method, manager and weekday.",
              "Charts: top manager, products, payment methods, daily trend."
          ],
          "results": [
              "An interactive dashboard that gathers the analyses of the question sheets on one page (see the screenshot).",
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
          "title": "Panel de Excel «Ventas 2025»: gerentes, productos y pagos",
          "summary": "Panel de ventas 2025 en Excel: rendimiento por gerente y producto, medios de pago y tendencia diaria de ventas según el momento del día.",
          "context": "Un libro de Excel organizado en hojas de preguntas de análisis (Pregunta 2 a 5), una base de ventas y un panel interactivo que las reúne.",
          "objectives": [
              "Comparar gerentes y productos.",
              "Analizar los medios de pago utilizados.",
              "Seguir la tendencia diaria por momento del día (mañana, tarde, noche)."
          ],
          "dataDescription": "Base de ventas de 2025 (hoja «BD VENTE») que incluye gerente, producto, medio de pago, día de la semana, momento del día y total comprado. La fuente de los datos debe ser precisada por el autor.",
          "methodology": [
              "Una hoja por pregunta, con tablas y gráficos dinámicos.",
              "Segmentaciones para medio de pago, gerente y día de la semana.",
              "Gráficos: mejor gerente, productos, medios de pago, tendencia diaria."
          ],
          "results": [
              "Un panel interactivo que reúne en una sola página los análisis de las hojas de preguntas (véase la captura).",
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
          "title": "Excel-Dashboard „Verkauf 2025“: Manager, Produkte und Zahlungen",
          "summary": "Excel-Vertriebs-Dashboard 2025: Leistung nach Manager und Produkt, Zahlungsarten und täglicher Verkaufstrend nach Tageszeit.",
          "context": "Eine Excel-Arbeitsmappe mit Analyseblättern zu Fragen (Frage 2 bis 5), einer Verkaufsdatenbank und einem interaktiven Dashboard, das sie zusammenführt.",
          "objectives": [
              "Manager und Produkte vergleichen.",
              "Die genutzten Zahlungsarten analysieren.",
              "Den täglichen Trend nach Tageszeit verfolgen (Morgen, Nachmittag, Abend)."
          ],
          "dataDescription": "Verkaufsdatenbank 2025 (Blatt „BD VENTE“) mit u. a. Manager, Produkt, Zahlungsart, Wochentag, Tageszeit und Gesamteinkauf. Die Datenquelle ist vom Autor anzugeben.",
          "methodology": [
              "Ein Blatt je Frage, mit PivotTables und PivotCharts.",
              "Datenschnitte für Zahlungsart, Manager und Wochentag.",
              "Diagramme: bester Manager, Produkte, Zahlungsarten, Tagestrend."
          ],
          "results": [
              "Ein interaktives Dashboard, das die Analysen der Fragenblätter auf einer Seite zusammenführt (siehe Screenshot).",
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
