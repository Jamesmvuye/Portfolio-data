export const sum = (xs: number[]) => xs.reduce((a, b) => a + b, 0);
export const mean = (xs: number[]) => (xs.length ? sum(xs) / xs.length : NaN);

export function sd(xs: number[]) {
  if (xs.length < 2) return NaN;
  const m = mean(xs);
  return Math.sqrt(sum(xs.map((x) => (x - m) ** 2)) / (xs.length - 1));
}

/** Quantile 0,975 de la loi t de Student (développement de Cornish-Fisher, suffisant dès df ≥ 5). */
export function tCritical975(df: number) {
  const z = 1.959964;
  return z + (z ** 3 + z) / (4 * df) + (5 * z ** 5 + 16 * z ** 3 + 3 * z) / (96 * df ** 2);
}

/** Différence de moyennes (b − a) avec IC à 95 % de Welch. */
export function welchDiff(a: number[], b: number[]) {
  const va = sd(a) ** 2 / a.length;
  const vb = sd(b) ** 2 / b.length;
  const se = Math.sqrt(va + vb);
  const df = (va + vb) ** 2 / (va ** 2 / (a.length - 1) + vb ** 2 / (b.length - 1));
  const diff = mean(b) - mean(a);
  const t = tCritical975(df);
  return { diff, lo: diff - t * se, hi: diff + t * se, se };
}

export function ci95(xs: number[]) {
  const m = mean(xs);
  const half = tCritical975(Math.max(xs.length - 1, 1)) * (sd(xs) / Math.sqrt(xs.length));
  return { mean: m, half };
}

export const fmt = (n: number, locale: string, digits = 0) =>
  Number.isFinite(n) ? new Intl.NumberFormat(locale, { maximumFractionDigits: digits, minimumFractionDigits: digits }).format(n) : "—";

export const fmtCompact = (n: number, locale: string) =>
  Number.isFinite(n) ? new Intl.NumberFormat(locale, { notation: "compact", maximumFractionDigits: 1 }).format(n) : "—";

export const fmtPct = (n: number, locale: string, digits = 1) =>
  Number.isFinite(n) ? new Intl.NumberFormat(locale, { style: "percent", maximumFractionDigits: digits, minimumFractionDigits: digits }).format(n) : "—";
