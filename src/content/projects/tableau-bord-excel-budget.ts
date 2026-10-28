import type { Project } from "../types";

const base = "/projects/tableau-bord-excel-budget";

export const project: Project = {
  slug: "tableau-bord-excel-budget",
  domain: "other",
  tools: ["Excel", "XLSX"],
  date: "2025-10",
  synthetic: true,
  dashboardId: "budget",
  files: [
    { id: "xlsx", kind: "xlsx", path: `${base}/data/budget_synthetique.xlsx`, downloadable: true },
    { id: "csv", kind: "csv", path: `${base}/data/budget_synthetique.csv`, downloadable: true },
  ],
  sources: ["synthetic"],
  related: ["bi-ventes-multi-regions", "cartographie-accessibilite-qgis"],
  translations: {
    fr: {
      title: "Suivi budgétaire d'un programme : tableau de bord Excel",
      summary: "Classeur Excel de suivi prévu/réalisé par ligne budgétaire, avec écarts et taux d'exécution calculés par formules.",
      context: "Un programme fictif suit son budget mensuel par ligne de dépense. Les équipes de terrain et les bailleurs ont besoin d'un outil simple, sans logiciel spécialisé.",
      problem: "Comment visualiser rapidement l'exécution budgétaire et repérer les lignes qui dérapent, avec un outil que tout le monde sait ouvrir ?",
      objectives: [
        "Structurer les données en table propre (une ligne par mois et par ligne budgétaire).",
        "Calculer écart et taux d'exécution par formules vérifiables.",
        "Proposer une lecture visuelle par ligne et par mois.",
      ],
      dataDescription: "Jeu SYNTHÉTIQUE de 72 lignes : 6 lignes budgétaires × 12 mois. Le réalisé est renseigné jusqu'en septembre ; octobre à décembre sont volontairement vides.",
      variables: [
        ["month", "entier", "Mois (1 à 12)."],
        ["line", "texte", "Ligne budgétaire (Personnel, Transport, Equipment, Training, Communication, Other)."],
        ["planned_usd", "entier", "Montant prévu en dollars."],
        ["actual_usd", "entier (manquant possible)", "Montant réalisé en dollars."],
        ["variance_usd", "calculé", "Réalisé − prévu (formule Excel)."],
        ["execution_rate", "calculé", "Réalisé / prévu (formule Excel)."],
      ],
      cleaning: [
        "Table à plat sans cellules fusionnées pour permettre filtres et tableaux croisés dynamiques.",
        "Cellules de réalisé laissées vides (et non à zéro) pour les mois non encore exécutés.",
        "Formules protégées contre la division par zéro et les cellules vides.",
      ],
      methodology: [
        "Écart = réalisé − prévu ; taux d'exécution = réalisé / prévu.",
        "Mise en forme conditionnelle pour repérer les dépassements.",
        "Tableau croisé dynamique par ligne budgétaire et par mois (à construire à partir du classeur fourni).",
      ],
      results: [
        "Le classeur contient la table, les colonnes calculées par formules et une feuille README précisant que les données sont synthétiques.",
        "Le dashboard de ce site reproduit la lecture prévu/réalisé par ligne et par mois.",
        "Les montants sont fictifs et ne décrivent aucun budget réel.",
      ],
      recommendations: [
        "Fixer des seuils d'alerte (par exemple, exécution inférieure ou supérieure à une fourchette) validés par le responsable du programme.",
        "Verrouiller les formules et documenter chaque feuille.",
        "Passer à Power BI ou à une base partagée si le nombre d'utilisateurs ou de lignes augmente.",
      ],
      limitations: [
        "Données synthétiques sans engagements ni paiements différés.",
        "Excel n'offre ni historique des modifications ni contrôle d'accès fin.",
        "Le classeur ne contient pas de graphiques natifs Excel ; la visualisation est fournie par le dashboard du site.",
      ],
    },
    en: {
      title: "Programme budget tracking: Excel dashboard",
      summary: "Excel workbook tracking planned vs actual spend by budget line, with variance and execution rate calculated by formulas.",
      context: "A fictitious programme tracks its monthly budget by expense line. Field teams and donors need a simple tool that requires no specialised software.",
      problem: "How can budget execution be visualised quickly and lines that are drifting be spotted, using a tool everyone can open?",
      objectives: [
        "Structure the data as a clean table (one row per month and budget line).",
        "Compute variance and execution rate with verifiable formulas.",
        "Offer a visual reading by line and by month.",
      ],
      dataDescription: "SYNTHETIC dataset of 72 rows: 6 budget lines × 12 months. Actuals are filled in up to September; October to December are deliberately empty.",
      variables: [
        ["month", "integer", "Month (1 to 12)."],
        ["line", "text", "Budget line (Personnel, Transport, Equipment, Training, Communication, Other)."],
        ["planned_usd", "integer", "Planned amount in US dollars."],
        ["actual_usd", "integer (may be missing)", "Actual amount in US dollars."],
        ["variance_usd", "calculated", "Actual − planned (Excel formula)."],
        ["execution_rate", "calculated", "Actual / planned (Excel formula)."],
      ],
      cleaning: [
        "Flat table without merged cells so that filters and pivot tables work.",
        "Actual cells left empty (not zero) for months not yet executed.",
        "Formulas protected against division by zero and empty cells.",
      ],
      methodology: [
        "Variance = actual − planned; execution rate = actual / planned.",
        "Conditional formatting to spot overruns.",
        "Pivot table by budget line and month (to be built from the provided workbook).",
      ],
      results: [
        "The workbook contains the table, the formula-calculated columns and a README sheet stating that the data are synthetic.",
        "The dashboard on this site reproduces the planned vs actual reading by line and by month.",
        "Amounts are fictitious and describe no real budget.",
      ],
      recommendations: [
        "Set alert thresholds (for example execution below or above a range) validated by the programme manager.",
        "Lock formulas and document each sheet.",
        "Move to Power BI or a shared database if the number of users or lines grows.",
      ],
      limitations: [
        "Synthetic data without commitments or deferred payments.",
        "Excel offers no change history or fine-grained access control.",
        "The workbook contains no native Excel charts; visualisation is provided by the site dashboard.",
      ],
    },
    es: {
      title: "Seguimiento presupuestario de un programa: panel en Excel",
      summary: "Libro de Excel de seguimiento previsto/realizado por partida presupuestaria, con desviaciones y tasa de ejecución calculadas mediante fórmulas.",
      context: "Un programa ficticio sigue su presupuesto mensual por partida de gasto. Los equipos de campo y los donantes necesitan una herramienta sencilla, sin software especializado.",
      problem: "¿Cómo visualizar rápidamente la ejecución presupuestaria y detectar las partidas que se desvían, con una herramienta que todos saben abrir?",
      objectives: [
        "Estructurar los datos en una tabla limpia (una fila por mes y partida).",
        "Calcular desviación y tasa de ejecución con fórmulas verificables.",
        "Ofrecer una lectura visual por partida y por mes.",
      ],
      dataDescription: "Conjunto SINTÉTICO de 72 filas: 6 partidas × 12 meses. Lo realizado está informado hasta septiembre; de octubre a diciembre queda vacío deliberadamente.",
      variables: [
        ["month", "entero", "Mes (1 a 12)."],
        ["line", "texto", "Partida (Personnel, Transport, Equipment, Training, Communication, Other)."],
        ["planned_usd", "entero", "Importe previsto en dólares."],
        ["actual_usd", "entero (puede faltar)", "Importe realizado en dólares."],
        ["variance_usd", "calculado", "Realizado − previsto (fórmula de Excel)."],
        ["execution_rate", "calculado", "Realizado / previsto (fórmula de Excel)."],
      ],
      cleaning: [
        "Tabla plana sin celdas combinadas para que funcionen filtros y tablas dinámicas.",
        "Celdas de realizado vacías (no a cero) en los meses aún no ejecutados.",
        "Fórmulas protegidas frente a la división por cero y las celdas vacías.",
      ],
      methodology: [
        "Desviación = realizado − previsto; tasa de ejecución = realizado / previsto.",
        "Formato condicional para detectar sobrecostes.",
        "Tabla dinámica por partida y mes (por construir a partir del libro proporcionado).",
      ],
      results: [
        "El libro contiene la tabla, las columnas calculadas con fórmulas y una hoja README que indica que los datos son sintéticos.",
        "El panel de este sitio reproduce la lectura previsto/realizado por partida y por mes.",
        "Los importes son ficticios y no describen ningún presupuesto real.",
      ],
      recommendations: [
        "Fijar umbrales de alerta (por ejemplo, ejecución por debajo o por encima de un rango) validados por la persona responsable del programa.",
        "Bloquear las fórmulas y documentar cada hoja.",
        "Pasar a Power BI o a una base compartida si aumenta el número de usuarios o de partidas.",
      ],
      limitations: [
        "Datos sintéticos sin compromisos ni pagos diferidos.",
        "Excel no ofrece historial de cambios ni control de acceso detallado.",
        "El libro no contiene gráficos nativos de Excel; la visualización la aporta el panel del sitio.",
      ],
    },
    de: {
      title: "Budgetverfolgung eines Programms: Excel-Dashboard",
      summary: "Excel-Arbeitsmappe zur Verfolgung von Plan und Ist je Budgetposition, mit per Formel berechneten Abweichungen und Ausführungsquoten.",
      context: "Ein fiktives Programm verfolgt sein Monatsbudget je Ausgabenposition. Feldteams und Geldgeber brauchen ein einfaches Werkzeug ohne Spezialsoftware.",
      problem: "Wie lässt sich die Budgetausführung schnell visualisieren und erkennen, welche Positionen aus dem Ruder laufen – mit einem Werkzeug, das jede Person öffnen kann?",
      objectives: [
        "Die Daten als saubere Tabelle strukturieren (eine Zeile je Monat und Budgetposition).",
        "Abweichung und Ausführungsquote mit nachprüfbaren Formeln berechnen.",
        "Eine visuelle Lesart je Position und Monat anbieten.",
      ],
      dataDescription: "SYNTHETISCHER Datensatz mit 72 Zeilen: 6 Budgetpositionen × 12 Monate. Die Ist-Werte sind bis September eingetragen; Oktober bis Dezember sind absichtlich leer.",
      variables: [
        ["month", "Ganzzahl", "Monat (1 bis 12)."],
        ["line", "Text", "Budgetposition (Personnel, Transport, Equipment, Training, Communication, Other)."],
        ["planned_usd", "Ganzzahl", "Geplanter Betrag in US-Dollar."],
        ["actual_usd", "Ganzzahl (kann fehlen)", "Tatsächlicher Betrag in US-Dollar."],
        ["variance_usd", "berechnet", "Ist − Plan (Excel-Formel)."],
        ["execution_rate", "berechnet", "Ist / Plan (Excel-Formel)."],
      ],
      cleaning: [
        "Flache Tabelle ohne verbundene Zellen, damit Filter und Pivot-Tabellen funktionieren.",
        "Ist-Zellen bleiben leer (nicht null) für noch nicht ausgeführte Monate.",
        "Formeln gegen Division durch null und leere Zellen abgesichert.",
      ],
      methodology: [
        "Abweichung = Ist − Plan; Ausführungsquote = Ist / Plan.",
        "Bedingte Formatierung, um Überschreitungen zu erkennen.",
        "Pivot-Tabelle nach Budgetposition und Monat (aus der bereitgestellten Mappe zu erstellen).",
      ],
      results: [
        "Die Mappe enthält die Tabelle, die per Formel berechneten Spalten und ein README-Blatt, das die Daten als synthetisch ausweist.",
        "Das Dashboard dieser Website bildet die Plan-Ist-Ansicht je Position und Monat nach.",
        "Die Beträge sind fiktiv und beschreiben kein reales Budget.",
      ],
      recommendations: [
        "Alarmschwellen festlegen (z. B. Ausführung unter oder über einer Spanne), von der Programmleitung validiert.",
        "Formeln sperren und jedes Blatt dokumentieren.",
        "Auf Power BI oder eine gemeinsame Datenbank wechseln, wenn Nutzerzahl oder Positionen wachsen.",
      ],
      limitations: [
        "Synthetische Daten ohne Verpflichtungen oder zeitversetzte Zahlungen.",
        "Excel bietet weder Änderungsverlauf noch feine Zugriffskontrolle.",
        "Die Mappe enthält keine nativen Excel-Diagramme; die Visualisierung liefert das Website-Dashboard.",
      ],
    },
  },
};
