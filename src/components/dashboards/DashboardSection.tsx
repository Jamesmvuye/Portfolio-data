import { getTranslations } from "next-intl/server";
import { Download } from "lucide-react";
import type { Dashboard } from "@/content/types";
import { getProject } from "@/content/projects";
import { Link } from "@/i18n/navigation";
import { Badge, ExternalButton, Notice } from "../ui";
import { LazyDashboard } from "./LazyDashboard";

/** Hôtes autorisés pour les intégrations (cohérents avec la CSP frame-src de next.config.ts). */
const EMBED_HOSTS = [/^app\.powerbi\.com$/, /\.streamlit\.app$/, /\.shinyapps\.io$/, /\.hf\.space$/];

export function isEmbeddable(url?: string): url is string {
  if (!url) return false;
  try {
    const u = new URL(url);
    return u.protocol === "https:" && EMBED_HOSTS.some((re) => re.test(u.hostname));
  } catch {
    return false;
  }
}

export async function DashboardSection({ dashboard, locale }: { dashboard: Dashboard; locale: string }) {
  const t = await getTranslations({ locale, namespace: "dashboards" });
  const tc = await getTranslations({ locale, namespace: "common" });
  const key = `items.${dashboard.id}` as const;
  const indicators = t.raw(`${key}.indicators`) as string[];
  const project = dashboard.projectSlug ? getProject(dashboard.projectSlug) : undefined;
  const toolLabel = t(`tool${dashboard.tool.charAt(0).toUpperCase()}${dashboard.tool.slice(1)}` as "toolPowerbi");

  const embed = dashboard.powerBiEmbedUrl;
  const external = dashboard.externalAppUrl;

  return (
    <section id={dashboard.id} aria-labelledby={`${dashboard.id}-title`} className="scroll-mt-24 rounded-3xl border border-border bg-surface p-5 sm:p-8">
      <div className="flex flex-wrap items-center gap-2">
        <Badge tone="brand">{toolLabel}</Badge>
        <Badge tone="warn">{tc("synthetic")}</Badge>
      </div>
      <h2 id={`${dashboard.id}-title`} className="mt-3 font-display text-2xl font-bold sm:text-3xl">
        {t(`${key}.title`)}
      </h2>

      <dl className="mt-5 grid gap-5 text-sm sm:grid-cols-3">
        <div>
          <dt className="font-semibold text-fg">{t("objectives")}</dt>
          <dd className="mt-1 leading-relaxed text-muted">{t(`${key}.objectives`)}</dd>
        </div>
        <div>
          <dt className="font-semibold text-fg">{t("indicators")}</dt>
          <dd className="mt-1">
            <ul className="list-disc space-y-0.5 pl-5 text-muted">
              {indicators.map((i) => (
                <li key={i}>{i}</li>
              ))}
            </ul>
          </dd>
        </div>
        <div>
          <dt className="font-semibold text-fg">{t("source")}</dt>
          <dd className="mt-1 leading-relaxed text-muted">
            {t("sourceValue")}
            {project && (
              <>
                {" "}
                <Link href={`/projects/${project.slug}`} className="font-medium text-brand underline underline-offset-2">
                  {t("relatedProject")}
                </Link>
              </>
            )}
          </dd>
        </div>
      </dl>

      <div className="mt-6">
        <LazyDashboard demo={dashboard.demo} />
      </div>

      <div className="mt-6 space-y-4">
        {dashboard.tool === "powerbi" &&
          (isEmbeddable(embed) ? (
            <div>
              <p className="mb-2 text-sm font-semibold">{t("official")}</p>
              <iframe
                title={t(`${key}.title`)}
                src={embed}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer"
                className="h-[28rem] w-full rounded-xl border border-border"
              />
            </div>
          ) : (
            <Notice tone="info">{t("powerbiMissing")}</Notice>
          ))}
        {(dashboard.tool === "python" || dashboard.tool === "r") &&
          (isEmbeddable(external) ? (
            <ExternalButton href={external} variant="primary" newTabLabel={tc("externalLink")}>
              {t("openExternal")}
            </ExternalButton>
          ) : (
            <Notice tone="info">{t("externalMissing")}</Notice>
          ))}
        {dashboard.tool === "excel" && dashboard.downloadPath && (
          <ExternalButton href={dashboard.downloadPath} download variant="primary">
            <Download aria-hidden className="size-4" />
            {t("downloadXlsx")}
          </ExternalButton>
        )}
      </div>
    </section>
  );
}
