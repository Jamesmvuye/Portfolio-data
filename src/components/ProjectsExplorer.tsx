"use client";

import { useMemo, useState } from "react";
import { useTranslations } from "next-intl";
import { Search, X } from "lucide-react";
import clsx from "clsx";
import { domains, type Domain } from "@/content/types";
import { ProjectCard, type ProjectCardData } from "./ProjectCard";

const normalize = (s: string) => s.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase();

export function ProjectsExplorer({ projects, tools }: { projects: ProjectCardData[]; tools: string[] }) {
  const t = useTranslations();
  const [query, setQuery] = useState("");
  const [domain, setDomain] = useState<Domain | "all">("all");
  const [tool, setTool] = useState("all");

  const results = useMemo(() => {
    const q = normalize(query.trim());
    return projects.filter((p) => {
      if (domain !== "all" && p.domain !== domain) return false;
      if (tool !== "all" && !p.tools.includes(tool)) return false;
      if (!q) return true;
      const haystack = normalize([p.title, p.summary, p.tools.join(" "), t(`domains.${p.domain}`)].join(" "));
      return haystack.includes(q);
    });
  }, [projects, query, domain, tool, t]);

  const filtersActive = query !== "" || domain !== "all" || tool !== "all";
  const reset = () => {
    setQuery("");
    setDomain("all");
    setTool("all");
  };

  return (
    <div>
      <div className="space-y-4 rounded-2xl border border-border bg-surface p-4 sm:p-5">
        <div className="grid gap-4 sm:grid-cols-[1fr_auto]">
          <div>
            <label htmlFor="project-search" className="text-xs font-medium text-muted">
              {t("projectsPage.searchLabel")}
            </label>
            <div className="relative mt-1">
              <Search aria-hidden className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted" />
              <input
                id="project-search"
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder={t("projectsPage.search")}
                className="w-full rounded-lg border border-border bg-bg py-2.5 pl-9 pr-3 text-sm text-fg placeholder:text-muted"
              />
            </div>
          </div>
          <div>
            <label htmlFor="project-tool" className="text-xs font-medium text-muted">
              {t("projectsPage.filterTool")}
            </label>
            <select
              id="project-tool"
              value={tool}
              onChange={(e) => setTool(e.target.value)}
              className="mt-1 w-full rounded-lg border border-border bg-bg px-3 py-2.5 text-sm text-fg sm:w-52"
            >
              <option value="all">{t("projectsPage.allTools")}</option>
              {tools.map((x) => (
                <option key={x} value={x}>
                  {x}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div role="group" aria-label={t("projectsPage.filterDomain")} className="flex flex-wrap gap-2">
          {(["all", ...domains] as const).map((d) => {
            const active = domain === d;
            return (
              <button
                key={d}
                type="button"
                aria-pressed={active}
                onClick={() => setDomain(d)}
                className={clsx(
                  "rounded-full border px-3.5 py-1.5 text-sm font-medium transition-colors",
                  active ? "border-brand bg-brand text-on-brand" : "border-border bg-surface text-muted hover:border-brand hover:text-brand",
                )}
              >
                {d === "all" ? t("projectsPage.all") : t(`domains.${d}`)}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between gap-4">
        <p className="text-sm font-medium text-muted" role="status" aria-live="polite">
          {t("projectsPage.count", { count: results.length })}
        </p>
        {filtersActive && (
          <button type="button" onClick={reset} className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand hover:underline">
            <X aria-hidden className="size-4" />
            {t("projectsPage.reset")}
          </button>
        )}
      </div>

      {results.length === 0 ? (
        <p className="mt-10 rounded-2xl border border-dashed border-border p-10 text-center text-muted">{t("projectsPage.noResults")}</p>
      ) : (
        <ul className="mt-4 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {results.map((p) => (
            <li key={p.slug}>
              <ProjectCard project={p} />
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
