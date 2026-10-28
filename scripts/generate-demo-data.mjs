/**
 * Génère les jeux de données SYNTHÉTIQUES de démonstration (aucune donnée réelle).
 * Sorties :
 *  - public/projects/<slug>/data/*.csv   (fichiers téléchargeables)
 *  - public/projects/<slug>/data/*.xlsx  (classeur Excel de démonstration)
 *  - src/content/data/*.json             (données consommées par les dashboards)
 * Usage : npm run generate:data
 */
import { mkdirSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import ExcelJS from "exceljs";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");

// PRNG déterministe (mulberry32) : mêmes données à chaque exécution.
function rng(seed) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
function normal(r) {
  const u = Math.max(r(), 1e-9);
  const v = r();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
}
const round = (x, d = 0) => Math.round(x * 10 ** d) / 10 ** d;

function write(rel, content) {
  const full = join(root, rel);
  mkdirSync(dirname(full), { recursive: true });
  writeFileSync(full, content);
  console.log("écrit", rel);
}
function toCsv(rows, columns) {
  const esc = (v) => (v === null || v === undefined ? "" : String(v));
  return [columns.join(","), ...rows.map((row) => columns.map((c) => esc(row[c])).join(","))].join("\n") + "\n";
}

// ---------------------------------------------------------------- 1. Ventes (BI)
{
  const r = rng(2025);
  const regions = { North: 1.15, South: 0.95, East: 0.85, West: 1.05 };
  const categories = { Hardware: [42000, 0.68], Software: [30000, 0.35], Services: [26000, 0.52], Training: [14000, 0.4] };
  const rows = [];
  for (const year of [2024, 2025]) {
    for (let m = 1; m <= 12; m++) {
      const growth = 1 + ((year - 2024) * 12 + m) * 0.006;
      const season = 1 + 0.12 * Math.sin(((m - 3) / 12) * 2 * Math.PI);
      for (const [region, rf] of Object.entries(regions)) {
        for (const [category, [base, costRatio]] of Object.entries(categories)) {
          const revenue = base * rf * growth * season * (1 + normal(r) * 0.06);
          const orders = Math.max(1, Math.round(revenue / (category === "Hardware" ? 820 : category === "Training" ? 350 : 540)));
          rows.push({
            month: `${year}-${String(m).padStart(2, "0")}`,
            region,
            category,
            orders,
            revenue_usd: round(revenue),
            cost_usd: round(revenue * costRatio * (1 + normal(r) * 0.03)),
          });
        }
      }
    }
  }
  const cols = ["month", "region", "category", "orders", "revenue_usd", "cost_usd"];
  write("public/projects/bi-ventes-multi-regions/data/ventes_synthetiques.csv", toCsv(rows, cols));
  write("src/content/data/sales.json", JSON.stringify(rows));
}

// ---------------------------------------------------------------- 2. Épidémiologie
{
  const r = rng(77);
  const zones = [
    { zone: "Zone A", pop: 82000, base: 11 },
    { zone: "Zone B", pop: 64000, base: 8 },
    { zone: "Zone C", pop: 120000, base: 14 },
    { zone: "Zone D", pop: 47000, base: 6 },
    { zone: "Zone E", pop: 95000, base: 10 },
  ];
  const rows = [];
  for (const z of zones) {
    const phase = r() * 6;
    for (let week = 1; week <= 52; week++) {
      const wave = 1 + 0.55 * Math.sin(((week + phase - 8) / 52) * 2 * Math.PI);
      const outbreak = z.zone === "Zone C" && week >= 30 && week <= 36 ? 1.9 : 1;
      const expected = (z.base * wave * outbreak * z.pop) / 10000 / 4;
      const cases = Math.max(0, Math.round(expected + normal(r) * Math.sqrt(expected)));
      const tested = Math.round(cases * (2.1 + r() * 0.6) + 40);
      const missing = r() < 0.03; // ~3 % de semaines non rapportées
      rows.push({
        week,
        zone: z.zone,
        population: z.pop,
        cases: missing ? null : cases,
        tested: missing ? null : tested,
      });
    }
  }
  write("public/projects/epidemio-surveillance-hebdomadaire/data/surveillance_synthetique.csv", toCsv(rows, ["week", "zone", "population", "cases", "tested"]));
  write("src/content/data/epi.json", JSON.stringify(rows));
}

// ---------------------------------------------------------------- 3. Essai à deux groupes
{
  const r = rng(314);
  const rows = [];
  for (let i = 1; i <= 120; i++) {
    const group = i % 2 === 0 ? "intervention" : "control";
    const baseline = round(50 + normal(r) * 9, 1);
    const effect = group === "intervention" ? 6 : 1.5;
    const follow = round(baseline * 0.55 + 22 + effect + normal(r) * 6, 1);
    rows.push({
      id: `S${String(i).padStart(3, "0")}`,
      group,
      sex: r() < 0.5 ? "F" : "M",
      age: Math.round(28 + r() * 40),
      baseline_score: baseline,
      followup_score: r() < 0.05 ? null : follow, // ~5 % de perdus de vue
    });
  }
  write("public/projects/etude-statistique-deux-groupes/data/essai_synthetique.csv", toCsv(rows, ["id", "group", "sex", "age", "baseline_score", "followup_score"]));
  write("src/content/data/trial.json", JSON.stringify(rows));
}

// ---------------------------------------------------------------- 4. Accessibilité (coordonnées fictives)
{
  const r = rng(9);
  // Coordonnées purement fictives dans un carré arbitraire (pas de lieu réel).
  const facilities = Array.from({ length: 12 }, (_, i) => ({
    facility_id: `F${String(i + 1).padStart(2, "0")}`,
    type: i % 4 === 0 ? "hospital" : "health_center",
    lat: round(-1 + r() * 0.6, 4),
    lon: round(28 + r() * 0.6, 4),
  }));
  const villages = Array.from({ length: 60 }, (_, i) => ({
    village_id: `V${String(i + 1).padStart(3, "0")}`,
    lat: round(-1 + r() * 0.6, 4),
    lon: round(28 + r() * 0.6, 4),
    population: Math.round(150 + r() * 1800),
  }));
  const dir = "public/projects/cartographie-accessibilite-qgis/data/";
  write(dir + "etablissements_fictifs.csv", toCsv(facilities, ["facility_id", "type", "lat", "lon"]));
  write(dir + "villages_fictifs.csv", toCsv(villages, ["village_id", "lat", "lon", "population"]));
  write("src/content/data/gis.json", JSON.stringify({ facilities, villages }));
}

// ---------------------------------------------------------------- 5. Budget Excel
{
  const r = rng(5);
  const lines = [
    ["Personnel", 9000],
    ["Transport", 3200],
    ["Equipment", 4500],
    ["Training", 2600],
    ["Communication", 1500],
    ["Other", 1100],
  ];
  const rows = [];
  for (const [line, base] of lines) {
    for (let m = 1; m <= 12; m++) {
      const planned = round(base * (1 + 0.08 * Math.sin((m / 12) * 2 * Math.PI)), 0);
      const actual = m <= 9 ? round(planned * (0.88 + r() * 0.3), 0) : null; // exécution jusqu'à septembre
      rows.push({ month: m, line, planned_usd: planned, actual_usd: actual });
    }
  }
  const dir = "public/projects/tableau-bord-excel-budget/data/";
  write(dir + "budget_synthetique.csv", toCsv(rows, ["month", "line", "planned_usd", "actual_usd"]));
  write("src/content/data/budget.json", JSON.stringify(rows));

  const wb = new ExcelJS.Workbook();
  wb.creator = "LEARNMORE-DATA (données synthétiques)";
  const ws = wb.addWorksheet("Budget");
  ws.addRow(["month", "line", "planned_usd", "actual_usd", "variance_usd", "execution_rate"]);
  rows.forEach((row, i) => {
    const n = i + 2;
    ws.addRow([
      row.month,
      row.line,
      row.planned_usd,
      row.actual_usd,
      { formula: `IF(D${n}="","",D${n}-C${n})` },
      { formula: `IF(OR(D${n}="",C${n}=0),"",D${n}/C${n})` },
    ]);
  });
  // Mise en forme conditionnelle : exécution > 110 % (orange) ou < 85 % (bleu clair)
  ws.addConditionalFormatting({
    ref: `F2:F${rows.length + 1}`,
    rules: [
      { type: "cellIs", operator: "greaterThan", formulae: [1.1], style: { fill: { type: "pattern", pattern: "solid", bgColor: { argb: "FFFDBA74" } } } },
      { type: "cellIs", operator: "lessThan", formulae: [0.85], style: { fill: { type: "pattern", pattern: "solid", bgColor: { argb: "FFBFDBFE" } } } },
    ],
  });
  ws.getRow(1).font = { bold: true, color: { argb: "FFFFFFFF" } };
  ws.getRow(1).fill = { type: "pattern", pattern: "solid", fgColor: { argb: "FF1D4ED8" } };
  ws.getColumn("F").numFmt = "0.0%";
  ["C", "D", "E"].forEach((c) => (ws.getColumn(c).numFmt = "#,##0"));
  ws.columns.forEach((c) => (c.width = 16));
  ws.views = [{ state: "frozen", ySplit: 1 }];
  ws.autoFilter = "A1:F" + (rows.length + 1);

  const note = wb.addWorksheet("README");
  note.addRow(["DONNÉES SYNTHÉTIQUES — jeu de démonstration, aucune donnée réelle."]);
  note.addRow(["Variance = réalisé - prévu ; taux d'exécution = réalisé / prévu (colonnes calculées par formules)."]);
  note.getColumn(1).width = 100;
  await wb.xlsx.writeFile(join(root, dir + "budget_synthetique.xlsx"));
  console.log("écrit", dir + "budget_synthetique.xlsx");
}
