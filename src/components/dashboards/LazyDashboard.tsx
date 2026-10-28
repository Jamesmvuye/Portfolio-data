"use client";

import dynamic from "next/dynamic";
import { useTranslations } from "next-intl";

function Loading() {
  const t = useTranslations("dashboards");
  return (
    <div role="status" className="grid h-72 place-items-center rounded-xl border border-border bg-surface text-sm text-muted">
      {t("loadingChart")}
    </div>
  );
}

// Les graphiques (Recharts) sont chargés à la demande, côté navigateur uniquement : pas de poids sur le premier affichage.
const demos = {
  sales: dynamic(() => import("./SalesDashboard"), { ssr: false, loading: Loading }),
  epi: dynamic(() => import("./EpiDashboard"), { ssr: false, loading: Loading }),
  trial: dynamic(() => import("./TrialDashboard"), { ssr: false, loading: Loading }),
  budget: dynamic(() => import("./BudgetDashboard"), { ssr: false, loading: Loading }),
};

export type DemoKey = keyof typeof demos;

export function LazyDashboard({ demo }: { demo: DemoKey }) {
  const Demo = demos[demo];
  return <Demo />;
}
