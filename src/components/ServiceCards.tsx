import type { ComponentType, SVGProps } from "react";
import { Database, FlaskConical, GraduationCap, HeartPulse, LayoutDashboard, Map, Sigma } from "lucide-react";

export const serviceKeys = ["analysis", "dashboards", "stats", "research", "health", "gis", "training"] as const;
export type ServiceKey = (typeof serviceKeys)[number];

export const serviceIcons: Record<ServiceKey, ComponentType<SVGProps<SVGSVGElement>>> = {
  analysis: Database,
  dashboards: LayoutDashboard,
  stats: Sigma,
  research: FlaskConical,
  health: HeartPulse,
  gis: Map,
  training: GraduationCap,
};
