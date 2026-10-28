"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ReferenceLine, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import epiData from "@/content/data/epi.json";
import { fmt, mean, sd, sum } from "@/lib/stats";
import { ChartCard, Definitions, EmptyState, FilterSelect, Kpi, axisProps, chartColors, tooltipStyle } from "./shared";

type Row = { week: number; zone: string; population: number; cases: number | null; tested: number | null };
const rows = epiData as Row[];
const zones = [...new Set(rows.map((r) => r.zone))];

interface Point {
  week: number;
  cases: number | null;
  incidence: number | null;
  ma4: number | null;
  alert: boolean;
}

export default function EpiDashboard() {
  const t = useTranslations("dashboards.ui");
  const locale = useLocale();
  const [zone, setZone] = useState("all");

  const { points, threshold, missing, totalCases, meanIncidence, alertCount } = useMemo(() => {
    const sel = rows.filter((r) => zone === "all" || r.zone === zone);
    const weeks = [...new Set(sel.map((r) => r.week))].sort((a, b) => a - b);
    const base = weeks.map((week) => {
      const wr = sel.filter((r) => r.week === week);
      const reported = wr.filter((r) => r.cases !== null);
      // Semaine sans aucun rapport : valeur manquante (null), jamais zéro.
      if (!reported.length) return { week, cases: null as number | null, incidence: null as number | null };
      const cases = sum(reported.map((r) => r.cases as number));
      const pop = sum(reported.map((r) => r.population));
      return { week, cases, incidence: (cases / pop) * 10000 };
    });
    const inc = base.map((b) => b.incidence).filter((v): v is number => v !== null);
    const thr = mean(inc) + 2 * sd(inc);
    const pts: Point[] = base.map((b, i) => {
      const win = base.slice(Math.max(0, i - 3), i + 1).map((x) => x.incidence).filter((v): v is number => v !== null);
      return { ...b, ma4: win.length >= 2 ? mean(win) : null, alert: b.incidence !== null && b.incidence > thr };
    });
    return {
      points: pts,
      threshold: thr,
      missing: sel.filter((r) => r.cases === null).length,
      totalCases: sum(sel.map((r) => r.cases ?? 0)),
      meanIncidence: mean(inc),
      alertCount: pts.filter((p) => p.alert).length,
    };
  }, [zone]);

  const empty = points.length === 0;
  const alertWeeks = points.filter((p) => p.alert).map((p) => p.week);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-4" role="group" aria-label={t("filters")}>
        <FilterSelect id="epi-zone" label={t("zone")} value={zone} onChange={setZone} options={[{ value: "all", label: t("all") }, ...zones.map((z) => ({ value: z, label: z }))]} />
      </div>

      <div aria-live="polite" className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Kpi label={t("epi.cases")} value={fmt(totalCases, locale)} />
        <Kpi label={t("epi.incidence")} value={fmt(meanIncidence, locale, 1)} hint={t("epi.per10k")} />
        <Kpi label={t("epi.alerts")} value={String(alertCount)} hint={alertWeeks.length ? `${t("epi.week")} ${alertWeeks.join(", ")}` : undefined} tone={alertCount ? "warn" : "default"} />
        <Kpi label={t("epi.missing")} value={String(missing)} tone={missing ? "warn" : "default"} />
      </div>

      <ChartCard title={t("epi.trendTitle")} summary={t("epi.threshold")}>
        {empty ? (
          <EmptyState />
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={points} margin={{ top: 8, right: 12, bottom: 0, left: 0 }}>
              <CartesianGrid stroke={chartColors.grid} vertical={false} />
              <XAxis dataKey="week" {...axisProps} minTickGap={16} />
              <YAxis {...axisProps} width={40} />
              <Tooltip {...tooltipStyle} labelFormatter={(w) => `${t("epi.week")} ${w}`} formatter={(v) => (v === null || v === undefined ? t("missingData") : fmt(Number(v), locale, 1))} />
              <Legend wrapperStyle={{ fontSize: 12, color: "var(--chart-axis)" }} />
              <ReferenceLine y={threshold} stroke={chartColors.c2} strokeDasharray="6 4" label={{ value: t("epi.threshold"), fill: "var(--chart-axis)", fontSize: 11, position: "insideTopRight" }} />
              <Line type="monotone" dataKey="incidence" name={t("epi.incidenceSeries")} stroke={chartColors.c1} strokeWidth={2} connectNulls={false} dot={false} activeDot={{ r: 4 }} />
              <Line type="monotone" dataKey="ma4" name={t("epi.movingAvg")} stroke={chartColors.c3} strokeWidth={2.5} dot={false} connectNulls={false} />
            </LineChart>
          </ResponsiveContainer>
        )}
      </ChartCard>

      <ChartCard title={t("epi.casesTitle")} height={200}>
        {empty ? (
          <EmptyState />
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={points} margin={{ top: 4, right: 12, bottom: 0, left: 0 }}>
              <CartesianGrid stroke={chartColors.grid} vertical={false} />
              <XAxis dataKey="week" {...axisProps} minTickGap={16} />
              <YAxis {...axisProps} width={40} />
              <Tooltip {...tooltipStyle} labelFormatter={(w) => `${t("epi.week")} ${w}`} formatter={(v) => (v === null || v === undefined ? t("missingData") : fmt(Number(v), locale))} cursor={{ fill: "var(--brand-soft)" }} />
              <Bar dataKey="cases" name={t("epi.cases")} fill={chartColors.c1} radius={[2, 2, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        )}
      </ChartCard>

      <p className="rounded-lg bg-surface-2 px-3 py-2 text-sm text-muted" aria-live="polite">
        {t("epi.missingNote", { count: missing })}
      </p>
      <Definitions items={[t("epi.defIncidence"), t("epi.defThreshold")]} />
    </div>
  );
}
