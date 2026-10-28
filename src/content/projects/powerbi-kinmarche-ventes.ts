import type { Project } from "../types";

/** Rapport Power BI décrit d'après sa structure (visuels, segments, champs). Ajouter une capture : champs `images` et `cover`. */
export const project: Project = {
  slug: "powerbi-kinmarche-ventes",
  domain: "business",
  tools: ["Power BI"],
  files: [
    { id: "pbix", kind: "pbix", path: "/projects/powerbi-kinmarche-ventes/data/kinmarche.pbix", downloadable: true },
  ],
  sources: ["tbd"],
  related: ["dashboard-excel-ventes-interactif", "dashboard-excel-vente-2025"],
  translations: {
      "fr": {
          "title": "KinMarché : tableau de bord des ventes sous Power BI",
          "summary": "Rapport Power BI de pilotage des ventes : ventes totales, unités vendues, marge moyenne et bénéfice d'exploitation, par méthode de vente, région et mois, avec filtres par produit, détaillant, état et année.",
          "context": "Un rapport Power BI d'une page destiné à suivre les ventes d'une activité commerciale et à les explorer par produit, détaillant, état et année.",
          "objectives": [
              "Suivre les indicateurs clés : total des ventes, unités vendues, pourcentage de marge moyen, bénéfice d'exploitation.",
              "Comparer les ventes par méthode de vente, par région et par mois.",
              "Laisser l'utilisateur filtrer par produit, détaillant, état et année."
          ],
          "dataDescription": "Table de ventes intégrée au rapport, avec notamment produit, identifiant du détaillant, état, date de facture, méthode de vente, région, total des ventes, unités vendues, marge et bénéfice d'exploitation. La source des données est à préciser par l'auteur.",
          "methodology": [
              "Quatre cartes d'indicateurs (KPI).",
              "Anneau pour la méthode de vente, barres par région, aires empilées par mois.",
              "Quatre segments : produit, identifiant du détaillant, état, année (hiérarchie de dates).",
              "Mise en page avec zones de titre et image d'identité visuelle."
          ],
          "results": [
              "Un tableau de bord d'une page avec quatre indicateurs et trois graphiques, entièrement filtrable (fichier .pbix téléchargeable).",
              "Aucune conclusion chiffrée n'est présentée ici."
          ],
          "limitations": [
              "Description établie à partir de la structure du rapport ; aucune capture n'est encore affichée pour ce projet."
          ],
          "problem": "",
          "variables": [],
          "cleaning": [],
          "recommendations": []
      },
      "en": {
          "title": "KinMarché: sales dashboard in Power BI",
          "summary": "Power BI report for sales monitoring: total sales, units sold, average margin and operating profit, by sales method, region and month, with filters by product, retailer, state and year.",
          "context": "A one-page Power BI report built to monitor a commercial activity's sales and explore them by product, retailer, state and year.",
          "objectives": [
              "Track key indicators: total sales, units sold, average margin percentage, operating profit.",
              "Compare sales by sales method, region and month.",
              "Let users filter by product, retailer, state and year."
          ],
          "dataDescription": "Sales table loaded in the report, including product, retailer ID, state, invoice date, sales method, region, total sales, units sold, margin and operating profit. The data source is to be specified by the author.",
          "methodology": [
              "Four KPI cards.",
              "Donut for sales method, bars by region, stacked area by month.",
              "Four slicers: product, retailer ID, state, year (date hierarchy).",
              "Layout with title areas and a brand image."
          ],
          "results": [
              "A one-page dashboard with four indicators and three charts, fully filterable (.pbix file available to download).",
              "No numeric conclusion is presented here."
          ],
          "limitations": [
              "Description based on the report's structure; no screenshot is displayed yet for this project."
          ],
          "problem": "",
          "variables": [],
          "cleaning": [],
          "recommendations": []
      },
      "es": {
          "title": "KinMarché: panel de ventas en Power BI",
          "summary": "Informe de Power BI para el seguimiento de ventas: ventas totales, unidades vendidas, margen medio y beneficio de explotación, por método de venta, región y mes, con filtros por producto, minorista, estado y año.",
          "context": "Un informe de Power BI de una página para seguir las ventas de una actividad comercial y explorarlas por producto, minorista, estado y año.",
          "objectives": [
              "Seguir los indicadores clave: total de ventas, unidades vendidas, porcentaje de margen medio, beneficio de explotación.",
              "Comparar las ventas por método de venta, región y mes.",
              "Permitir filtrar por producto, minorista, estado y año."
          ],
          "dataDescription": "Tabla de ventas cargada en el informe, con producto, identificador del minorista, estado, fecha de factura, método de venta, región, total de ventas, unidades vendidas, margen y beneficio de explotación. La fuente de los datos debe ser precisada por el autor.",
          "methodology": [
              "Cuatro tarjetas de indicadores (KPI).",
              "Anillo para el método de venta, barras por región, áreas apiladas por mes.",
              "Cuatro segmentaciones: producto, identificador del minorista, estado, año (jerarquía de fechas).",
              "Diseño con zonas de título y una imagen de identidad visual."
          ],
          "results": [
              "Un panel de una página con cuatro indicadores y tres gráficos, totalmente filtrable (archivo .pbix descargable).",
              "Aquí no se presenta ninguna conclusión numérica."
          ],
          "limitations": [
              "Descripción basada en la estructura del informe; aún no se muestra ninguna captura de este proyecto."
          ],
          "problem": "",
          "variables": [],
          "cleaning": [],
          "recommendations": []
      },
      "de": {
          "title": "KinMarché: Vertriebs-Dashboard in Power BI",
          "summary": "Power-BI-Bericht zur Vertriebsüberwachung: Gesamtumsatz, verkaufte Einheiten, durchschnittliche Marge und Betriebsgewinn, nach Verkaufsart, Region und Monat, mit Filtern nach Produkt, Händler, Bundesstaat und Jahr.",
          "context": "Ein einseitiger Power-BI-Bericht zur Überwachung der Verkäufe einer Geschäftstätigkeit, erkundbar nach Produkt, Händler, Bundesstaat und Jahr.",
          "objectives": [
              "Wichtige Kennzahlen verfolgen: Gesamtumsatz, verkaufte Einheiten, durchschnittlicher Margenanteil, Betriebsgewinn.",
              "Verkäufe nach Verkaufsart, Region und Monat vergleichen.",
              "Nutzenden das Filtern nach Produkt, Händler, Bundesstaat und Jahr ermöglichen."
          ],
          "dataDescription": "Im Bericht geladene Verkaufstabelle mit u. a. Produkt, Händlerkennung, Bundesstaat, Rechnungsdatum, Verkaufsart, Region, Gesamtumsatz, verkauften Einheiten, Marge und Betriebsgewinn. Die Datenquelle ist vom Autor anzugeben.",
          "methodology": [
              "Vier Kennzahlenkarten (KPIs).",
              "Ring für die Verkaufsart, Balken nach Region, gestapelte Fläche nach Monat.",
              "Vier Datenschnitte: Produkt, Händlerkennung, Bundesstaat, Jahr (Datumshierarchie).",
              "Layout mit Titelbereichen und einem Markenbild."
          ],
          "results": [
              "Ein einseitiges, vollständig filterbares Dashboard mit vier Kennzahlen und drei Diagrammen (.pbix-Datei zum Download).",
              "Hier wird keine Zahlenaussage dargestellt."
          ],
          "limitations": [
              "Beschreibung auf Basis der Berichtsstruktur; für dieses Projekt wird noch kein Screenshot angezeigt."
          ],
          "problem": "",
          "variables": [],
          "cleaning": [],
          "recommendations": []
      }
  },
};
