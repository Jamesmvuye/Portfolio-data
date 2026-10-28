"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import budgetData from "@/content/data/budget.json";
import { fmt, fmtCompact, fmtPct, sum } from "@/lib/stats";
import { ChartCard, Definitions, EmptyState, FilterSelect, Kpi, axisProps, chartColors, tooltipStyle } from "./shared";

type Row = { month: number; line: string; planned_usd: number; actual_usd: number | null };
const rows = budgetData as Row[];
const lines = [...new Set(rows.map((r) => r.line))];

export default function BudgetDashboard() {
  const t = useTranslations("dashboards.ui");
  const locale = useLocale();
  const [line, setLine] = useState("all");

  const model = useMemo(() => {
    const sel = rows.filter((r) => line === "all" || r.line === line);
    // Mois exécutés = mois où un réalisé existe ; les autres restent « manquants », jamais zéro.
    const executed = sel.filter((r) => r.actual_usd !== null);
    const planned = sum(executed.map((r) => r.planned_usd));
    const actual = sum(executed.map((r) => r.actual_usd as number));
    const byLine = lines
      .filter((l) => line === "all" || l === line)
      .map((l) => {
        const ex = executed.filter((r) => r.line === l);
        return { name: t(`lines.${l}`), planned: sum(ex.map((r) => r.planned_usd)), actual: sum(ex.map((r) => r.actual_usd as number)) };
      });
    const monthly: { month: number; planned: number; actual: number | null }[] = [];
    let cp = 0;
    let ca = 0;
    for (let m = 1; m <= 12; m++) {
      const mr = sel.filter((r) => r.month === m);
      cp += sum(mr.map((r) => r.planned_usd));
      const hasActual = mr.some((r) => r.actual_usd !== null);
      if (hasActual) ca += sum(mr.map((r) => r.actual_usd ?? 0));
      monthly.push({ month: m, planned: cp, actual: hasActual ? ca : null });
    }
    return { planned, actual, rate: planned ? actual / planned : NaN, variance: actual - planned, byLine, monthly, // Aperçu centré sur la fin d'exécution (mois 8 à 11) pour montrer les cellules de réalisé vides.
      table: sel.filter((r) => r.month >= 8 && r.month <= 11).sort((a, b) => lines.indexOf(a.line) - lines.indexOf(b.line) || a.month - b.month).slice(0, 8),
    };
  }, [line, t]);

  const usd = (n: number) => `$${fmtCompact(n, locale)}`;
  const monthName = (m: number) => new Intl.DateTimeFormat(locale, { month: "short", timeZone: "UTC" }).format(new Date(Date.UTC(2025, m - 1, 1)));
  const empty = model.byLine.length === 0;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-4" role="group" aria-label={t("filters")}>
        <FilterSelect id="budget-line" label={t("line")} value={line} onChange={setLine} options={[{ value: "all", label: t("all") }, ...lines.map((l) => ({ value: l, label: t(`lines.${l}`) }))]} />
      </div>

      <div aria-live="polite" className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Kpi label={t("budget.planned")} value={usd(model.planned)} />
        <Kpi label={t("budget.actual")} value={usd(model.actual)} />
        <Kpi label={t("budget.rate")} value={fmtPct(model.rate, locale)} />
        <Kpi label={t("budget.variance")} value={`${model.variance >= 0 ? "+" : "−"}${usd(Math.abs(model.variance))}`} />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <ChartCard title={t("budget.byLineTitle")}>
          {empty ? (
            <EmptyState />
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={model.byLine} margin={{ top: 8, right: 12, bottom: 0, left: 0 }}>
                <CartesianGrid stroke={chartColors.grid} vertical={false} />
                <XAxis dataKey="name" {...axisProps} interval={0} tick={{ fill: "var(--chart-axis)", fontSize: 11 }} />
                <YAxis tickFormatter={usd} {...axisProps} width={52} />
                <Tooltip {...tooltipStyle} formatter={(v) => `$${fmt(Number(v), locale)}`} cursor={{ fill: "var(--brand-soft)" }} />
                <Legend wrapperStyle={{ fontSize: 12, color: "var(--chart-axis)" }} />
                <Bar dataKey="planned" name={t("budget.planned_s")} fill={chartColors.c1} radius={[4, 4, 0, 0]} />
                <Bar dataKey="actual" name={t("budget.actual_s")} fill={chartColors.c2} radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          )}
        </ChartCard>

        <ChartCard title={t("budget.monthlyTitle")}>
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={model.monthly} margin={{ top: 8, right: 12, bottom: 0, left: 0 }}>
              <CartesianGrid stroke={chartColors.grid} vertical={false} />
              <XAxis dataKey="month" tickFormatter={monthName} {...axisProps} />
              <YAxis tickFormatter={usd} {...axisProps} width={52} />
              <Tooltip {...tooltipStyle} labelFormatter={(m) => monthName(Number(m))} formatter={(v) => (v === null || v === undefined ? t("missingData") : `$${fmt(Number(v), locale)}`)} />
              <Legend wrapperStyle={{ fontSize: 12, color: "var(--chart-axis)" }} />
              <Line type="monotone" dataKey="planned" name={t("budget.planned_s")} stroke={chartColors.c1} strokeWidth={2.5} dot={false} />
              <Line type="monotone" dataKey="actual" name={t("budget.actual_s")} stroke={chartColors.c2} strokeWidth={2.5} dot={{ r: 3 }} connectNulls={false} />
            </LineChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      <div className="overflow-hidden rounded-xl border border-border bg-surface">
        <p className="border-b border-border px-4 py-3 text-sm font-semibold">{t("budget.tableTitle")}</p>
        <div className="overflow-x-auto">
          <table className="w-full min-w-[28rem] text-left text-sm">
            <thead className="bg-surface-2 text-xs uppercase tracking-wide text-muted">
              <tr>
                <th scope="col" className="px-4 py-2">{t("budget.month")}</th>
                <th scope="col" className="px-4 py-2">{t("line")}</th>
                <th scope="col" className="px-4 py-2 text-right">{t("budget.planned_s")}</th>
                <th scope="col" className="px-4 py-2 text-right">{t("budget.actual_s")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border tabular-nums">
              {model.table.map((r) => (
                <tr key={`${r.line}-${r.month}`}>
                  <td className="px-4 py-2">{monthName(r.month)}</td>
                  <td className="px-4 py-2">{t(`lines.${r.line}`)}</td>
                  <td className="px-4 py-2 text-right">{fmt(r.planned_usd, locale)}</td>
                  <td className="px-4 py-2 text-right">{r.actual_usd === null ? <span className="text-muted">{t("missingData")}</span> : fmt(r.actual_usd, locale)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <Definitions items={[t("budget.defRate"), t("budget.defMissing")]} />
    </div>
  );
}
