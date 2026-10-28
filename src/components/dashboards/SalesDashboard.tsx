"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Bar, BarChart, CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import salesData from "@/content/data/sales.json";
import { fmt, fmtCompact, fmtPct, sum } from "@/lib/stats";
import { ChartCard, Definitions, EmptyState, FilterSelect, Kpi, axisProps, chartColors, tooltipStyle } from "./shared";

type Row = (typeof salesData)[number];
const rows = salesData as Row[];
const regions = ["North", "South", "East", "West"];
const categories = ["Hardware", "Software", "Services", "Training"];

export default function SalesDashboard() {
  const t = useTranslations("dashboards.ui");
  const locale = useLocale();
  const [year, setYear] = useState("all");
  const [region, setRegion] = useState("all");
  const [category, setCategory] = useState("all");

  const filtered = useMemo(
    () => rows.filter((r) => (year === "all" || r.month.startsWith(year)) && (region === "all" || r.region === region) && (category === "all" || r.category === category)),
    [year, region, category],
  );

  const kpi = useMemo(() => {
    const revenue = sum(filtered.map((r) => r.revenue_usd));
    const cost = sum(filtered.map((r) => r.cost_usd));
    const orders = sum(filtered.map((r) => r.orders));
    let yoy: number | null = null;
    if (year === "2025") {
      const prev = sum(rows.filter((r) => r.month.startsWith("2024") && (region === "all" || r.region === region) && (category === "all" || r.category === category)).map((r) => r.revenue_usd));
      yoy = prev ? revenue / prev - 1 : null;
    }
    return { revenue, margin: revenue - cost, rate: revenue ? (revenue - cost) / revenue : NaN, orders, aov: orders ? revenue / orders : NaN, yoy };
  }, [filtered, year, region, category]);

  const monthly = useMemo(() => {
    const map = new Map<string, { month: string; revenue: number; margin: number }>();
    for (const r of filtered) {
      const m = map.get(r.month) ?? { month: r.month, revenue: 0, margin: 0 };
      m.revenue += r.revenue_usd;
      m.margin += r.revenue_usd - r.cost_usd;
      map.set(r.month, m);
    }
    return [...map.values()].sort((a, b) => a.month.localeCompare(b.month)).map((m) => ({ ...m, revenue: Math.round(m.revenue), margin: Math.round(m.margin) }));
  }, [filtered]);

  const byCategory = useMemo(
    () => categories.map((c) => ({ name: t(`categories.${c}`), revenue: Math.round(sum(filtered.filter((r) => r.category === c).map((r) => r.revenue_usd))) })).filter((d) => d.revenue > 0),
    [filtered, t],
  );
  const byRegion = useMemo(
    () => regions.map((g) => ({ name: t(`regions.${g}`), margin: Math.round(sum(filtered.filter((r) => r.region === g).map((r) => r.revenue_usd - r.cost_usd))) })).filter((d) => d.margin !== 0),
    [filtered, t],
  );

  const monthLabel = (m: string) => new Intl.DateTimeFormat(locale, { month: "short", year: "2-digit", timeZone: "UTC" }).format(new Date(`${m}-01T00:00:00Z`));
  const usd = (n: number) => `$${fmtCompact(n, locale)}`;
  const empty = filtered.length === 0;

  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-4" role="group" aria-label={t("filters")}>
        <FilterSelect id="sales-year" label={t("year")} value={year} onChange={setYear} options={[{ value: "all", label: t("all") }, { value: "2024", label: "2024" }, { value: "2025", label: "2025" }]} />
        <FilterSelect id="sales-region" label={t("region")} value={region} onChange={setRegion} options={[{ value: "all", label: t("all") }, ...regions.map((r) => ({ value: r, label: t(`regions.${r}`) }))]} />
        <FilterSelect id="sales-cat" label={t("category")} value={category} onChange={setCategory} options={[{ value: "all", label: t("all") }, ...categories.map((c) => ({ value: c, label: t(`categories.${c}`) }))]} />
      </div>

      <div aria-live="polite" className="grid grid-cols-2 gap-3 lg:grid-cols-5">
        <Kpi label={t("sales.revenue")} value={usd(kpi.revenue)} hint={kpi.yoy !== null ? `${kpi.yoy >= 0 ? "+" : ""}${fmtPct(kpi.yoy, locale)} vs 2024` : undefined} />
        <Kpi label={t("sales.margin")} value={usd(kpi.margin)} />
        <Kpi label={t("sales.marginRate")} value={fmtPct(kpi.rate, locale)} />
        <Kpi label={t("sales.orders")} value={fmt(kpi.orders, locale)} />
        <Kpi label={t("sales.aov")} value={`$${fmt(kpi.aov, locale)}`} />
      </div>

      <div className="grid gap-4 lg:grid-cols-5">
        <div className="lg:col-span-3">
          <ChartCard title={t("sales.monthlyTitle")} summary={`${t("sales.revenue")}, ${t("sales.margin")}`}>
            {empty ? (
              <EmptyState />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthly} margin={{ top: 8, right: 12, bottom: 0, left: 0 }}>
                  <CartesianGrid stroke={chartColors.grid} vertical={false} />
                  <XAxis dataKey="month" tickFormatter={monthLabel} {...axisProps} minTickGap={24} />
                  <YAxis tickFormatter={usd} {...axisProps} width={56} />
                  <Tooltip {...tooltipStyle} labelFormatter={(l) => monthLabel(String(l))} formatter={(v) => `$${fmt(Number(v), locale)}`} />
                  <Legend wrapperStyle={{ fontSize: 12, color: "var(--chart-axis)" }} />
                  <Line type="monotone" dataKey="revenue" name={t("sales.revenue")} stroke={chartColors.c1} strokeWidth={2.5} dot={false} />
                  <Line type="monotone" dataKey="margin" name={t("sales.margin")} stroke={chartColors.c2} strokeWidth={2} strokeDasharray="5 4" dot={false} />
                </LineChart>
              </ResponsiveContainer>
            )}
          </ChartCard>
        </div>
        <div className="grid gap-4 lg:col-span-2">
          <ChartCard title={t("sales.categoryTitle")} height={140}>
            {empty ? (
              <EmptyState />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={byCategory} margin={{ top: 4, right: 8, bottom: 0, left: 0 }}>
                  <CartesianGrid stroke={chartColors.grid} vertical={false} />
                  <XAxis dataKey="name" {...axisProps} interval={0} />
                  <YAxis tickFormatter={usd} {...axisProps} width={52} />
                  <Tooltip {...tooltipStyle} formatter={(v) => `$${fmt(Number(v), locale)}`} cursor={{ fill: "var(--brand-soft)" }} />
                  <Bar dataKey="revenue" name={t("sales.revenue")} fill={chartColors.c1} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </ChartCard>
          <ChartCard title={t("sales.regionTitle")} height={140}>
            {empty ? (
              <EmptyState />
            ) : (
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={byRegion} margin={{ top: 4, right: 8, bottom: 0, left: 0 }}>
                  <CartesianGrid stroke={chartColors.grid} vertical={false} />
                  <XAxis dataKey="name" {...axisProps} interval={0} />
                  <YAxis tickFormatter={usd} {...axisProps} width={52} />
                  <Tooltip {...tooltipStyle} formatter={(v) => `$${fmt(Number(v), locale)}`} cursor={{ fill: "var(--brand-soft)" }} />
                  <Bar dataKey="margin" name={t("sales.margin")} fill={chartColors.c3} radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            )}
          </ChartCard>
        </div>
      </div>

      <Definitions items={[t("sales.defRevenue"), t("sales.defMargin"), t("sales.defAov")]} />
    </div>
  );
}
