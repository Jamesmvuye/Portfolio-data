"use client";

import type { ReactNode } from "react";
import { useTranslations } from "next-intl";

export const chartColors = {
  c1: "var(--chart-1)",
  c2: "var(--chart-2)",
  c3: "var(--chart-3)",
  c4: "var(--chart-4)",
  grid: "var(--chart-grid)",
  axis: "var(--chart-axis)",
};

export const axisProps = { tick: { fill: "var(--chart-axis)", fontSize: 12 }, stroke: "var(--chart-grid)" } as const;

export const tooltipStyle = {
  contentStyle: {
    background: "var(--surface)",
    border: "1px solid var(--border)",
    borderRadius: 10,
    color: "var(--fg)",
    fontSize: 13,
    boxShadow: "0 8px 24px rgb(0 0 0 / 0.12)",
  },
  labelStyle: { color: "var(--fg)", fontWeight: 600 },
  itemStyle: { color: "var(--fg)" },
} as const;

export function Kpi({ label, value, hint, tone = "default" }: { label: string; value: string; hint?: string; tone?: "default" | "warn" }) {
  return (
    <div className="rounded-xl border border-border bg-surface p-4">
      <p className="text-xs font-medium uppercase tracking-wide text-muted">{label}</p>
      <p className={`mt-1.5 font-display text-2xl font-bold tabular-nums ${tone === "warn" ? "text-warn-fg" : "text-fg"}`}>{value}</p>
      {hint && <p className="mt-0.5 text-xs text-muted">{hint}</p>}
    </div>
  );
}

export function ChartCard({ title, children, height = 288, summary }: { title: string; children: ReactNode; height?: number; summary?: string }) {
  return (
    <figure className="rounded-xl border border-border bg-surface p-4">
      <figcaption className="mb-3 text-sm font-semibold text-fg">{title}</figcaption>
      {/* role="img" + libellé : les lecteurs d'écran reçoivent un résumé, le détail est dans les KPI et définitions */}
      <div role="img" aria-label={summary ? `${title}. ${summary}` : title} style={{ height }}>
        {children}
      </div>
    </figure>
  );
}

export function FilterSelect({ id, label, value, onChange, options }: { id: string; label: string; value: string; onChange: (v: string) => void; options: { value: string; label: string }[] }) {
  return (
    <div className="flex flex-col gap-1">
      <label htmlFor={id} className="text-xs font-medium text-muted">
        {label}
      </label>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="min-w-36 rounded-lg border border-border bg-surface px-3 py-2 text-sm text-fg focus-visible:outline-brand"
      >
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
}

export function Definitions({ items }: { items: string[] }) {
  const t = useTranslations("dashboards.ui");
  return (
    <details className="rounded-xl border border-border bg-surface-2/50 p-4 text-sm text-muted">
      <summary className="cursor-pointer font-semibold text-fg">{t("definitions")}</summary>
      <ul className="mt-3 list-disc space-y-1.5 pl-5 leading-relaxed">
        {items.map((d) => (
          <li key={d}>{d}</li>
        ))}
      </ul>
    </details>
  );
}

export function EmptyState() {
  const t = useTranslations("dashboards.ui");
  return <p className="grid h-full place-items-center text-sm text-muted">{t("noData")}</p>;
}
