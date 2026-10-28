"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Bar, BarChart, CartesianGrid, ErrorBar, Legend, ResponsiveContainer, Scatter, ScatterChart, Tooltip, XAxis, YAxis, ZAxis } from "recharts";
import trialData from "@/content/data/trial.json";
import { ci95, fmt, mean, welchDiff } from "@/lib/stats";
import { ChartCard, Definitions, EmptyState, FilterSelect, Kpi, axisProps, chartColors, tooltipStyle } from "./shared";

type Row = { id: string; group: "control" | "intervention"; sex: string; age: number; baseline_score: number; followup_score: number | null };
const rows = trialData as Row[];

export default function TrialDashboard() {
  const t = useTranslations("dashboards.ui");
  const locale = useLocale();
  const [sex, setSex] = useState("all");

  const model = useMemo(() => {
    const sel = rows.filter((r) => sex === "all" || r.sex === sex);
    const complete = sel.filter((r) => r.followup_score !== null);
    const change = (g: string) => complete.filter((r) => r.group === g).map((r) => (r.followup_score as number) - r.baseline_score);
    const c = change("control");
    const i = change("intervention");
    const ok = c.length > 2 && i.length > 2;
    const cs = ok ? ci95(c) : null;
    const is = ok ? ci95(i) : null;
    return {
      n: sel.length,
      lost: sel.length - complete.length,
      bars: ok
        ? [
            { name: t("groups.control"), mean: Number(cs!.mean.toFixed(2)), err: Number(cs!.half.toFixed(2)), fill: chartColors.c1 },
            { name: t("groups.intervention"), mean: Number(is!.mean.toFixed(2)), err: Number(is!.half.toFixed(2)), fill: chartColors.c2 },
          ]
        : [],
      diff: ok ? welchDiff(c, i) : null,
      meanC: mean(c),
      meanI: mean(i),
      scatter: (g: string) => complete.filter((r) => r.group === g).map((r) => ({ x: r.baseline_score, y: r.followup_score as number })),
    };
  }, [sex, t]);

  const empty = model.bars.length === 0;
  const f1 = (n: number) => fmt(n, locale, 1);

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-4" role="group" aria-label={t("filters")}>
        <FilterSelect id="trial-sex" label="F / M" value={sex} onChange={setSex} options={[{ value: "all", label: t("all") }, { value: "F", label: "F" }, { value: "M", label: "M" }]} />
      </div>

      <div aria-live="polite" className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Kpi label={t("trial.n")} value={fmt(model.n, locale)} hint={t("trial.lostNote", { count: model.lost })} />
        <Kpi label={t("trial.lost")} value={String(model.lost)} />
        <Kpi label={t("trial.diff")} value={model.diff ? `${model.diff.diff >= 0 ? "+" : ""}${f1(model.diff.diff)}` : "—"} hint={t("trial.points")} />
        <Kpi label={t("trial.ci")} value={model.diff ? `[${f1(model.diff.lo)} ; ${f1(model.diff.hi)}]` : "—"} />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <ChartCard title={t("trial.meanTitle")} summary={model.diff ? `${t("trial.diff")}: ${f1(model.diff.diff)}` : undefined}>
          {empty ? (
            <EmptyState />
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={model.bars} margin={{ top: 12, right: 16, bottom: 0, left: 0 }}>
                <CartesianGrid stroke={chartColors.grid} vertical={false} />
                <XAxis dataKey="name" {...axisProps} />
                <YAxis {...axisProps} width={36} />
                <Tooltip {...tooltipStyle} formatter={(v) => `${f1(Number(v))} ${t("trial.points")}`} cursor={{ fill: "var(--brand-soft)" }} />
                <Bar dataKey="mean" name={t("trial.meanChange")} radius={[6, 6, 0, 0]} fill={chartColors.c1}>
                  <ErrorBar dataKey="err" stroke="var(--fg)" strokeWidth={2} width={8} />
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </ChartCard>

        <ChartCard title={t("trial.scatterTitle")}>
          {empty ? (
            <EmptyState />
          ) : (
            <ResponsiveContainer width="100%" height="100%">
              <ScatterChart margin={{ top: 8, right: 16, bottom: 16, left: 0 }}>
                <CartesianGrid stroke={chartColors.grid} />
                <XAxis type="number" dataKey="x" name={t("trial.baseline")} domain={["auto", "auto"]} {...axisProps} label={{ value: t("trial.baseline"), position: "insideBottom", offset: -8, fill: "var(--chart-axis)", fontSize: 12 }} />
                <YAxis type="number" dataKey="y" name={t("trial.followup")} domain={["auto", "auto"]} {...axisProps} width={40} />
                <ZAxis range={[36, 36]} />
                <Tooltip {...tooltipStyle} cursor={{ strokeDasharray: "3 3" }} formatter={(v) => f1(Number(v))} />
                <Legend verticalAlign="top" wrapperStyle={{ fontSize: 12, color: "var(--chart-axis)" }} />
                <Scatter name={t("groups.control")} data={model.scatter("control")} fill={chartColors.c1} fillOpacity={0.75} />
                <Scatter name={t("groups.intervention")} data={model.scatter("intervention")} fill={chartColors.c2} fillOpacity={0.75} shape="diamond" />
              </ScatterChart>
            </ResponsiveContainer>
          )}
        </ChartCard>
      </div>

      <Definitions items={[t("trial.defChange"), t("trial.defCi")]} />
    </div>
  );
}
