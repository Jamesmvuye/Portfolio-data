import fs from "node:fs";
import path from "node:path";
import { getTranslations } from "next-intl/server";
import { Download, FileCode2, FileSpreadsheet, FileText } from "lucide-react";
import type { FileKind, ProjectFile } from "@/content/types";
import { Badge, buttonClass } from "./ui";

const PUBLIC_DIR = path.join(process.cwd(), "public");
const TEXT_KINDS: FileKind[] = ["csv", "py", "r", "sql", "doc"];

/** Résout un chemin public en chemin disque, en refusant toute sortie du dossier public. */
function resolvePublic(rel: string): string | null {
  const full = path.resolve(PUBLIC_DIR, "." + rel);
  return full.startsWith(PUBLIC_DIR + path.sep) ? full : null;
}

function readPreview(full: string, kind: FileKind) {
  const maxLines = kind === "csv" ? 9 : 70;
  const lines = fs.readFileSync(full, "utf8").split(/\r?\n/);
  const shown = lines.slice(0, maxLines).join("\n");
  return { text: shown, truncated: lines.length > maxLines, total: lines.length };
}

function formatSize(bytes: number, locale: string) {
  const kb = bytes / 1024;
  return kb < 1024 ? `${new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format(kb)} KB` : `${new Intl.NumberFormat(locale, { maximumFractionDigits: 1 }).format(kb / 1024)} MB`;
}

const icon = (kind: FileKind) => (kind === "xlsx" || kind === "xls" || kind === "csv" ? FileSpreadsheet : kind === "py" || kind === "r" || kind === "sql" ? FileCode2 : FileText);

export async function FileList({ files, locale }: { files: ProjectFile[]; locale: string }) {
  const t = await getTranslations({ locale, namespace: "project" });
  const tc = await getTranslations({ locale, namespace: "common" });

  return (
    <ul className="space-y-3">
      {files.map((f) => {
        const full = resolvePublic(f.path);
        const exists = Boolean(full && fs.existsSync(full));
        const Icon = icon(f.kind);
        const name = path.basename(f.path);
        const preview = exists && full && TEXT_KINDS.includes(f.kind) ? readPreview(full, f.kind) : null;
        const size = exists && full ? formatSize(fs.statSync(full).size, locale) : null;

        return (
          <li key={f.id} className="rounded-xl border border-border bg-surface p-4">
            <div className="flex flex-wrap items-center gap-3">
              <span className="grid size-10 place-items-center rounded-lg bg-brand-soft text-brand">
                <Icon aria-hidden className="size-5" />
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate font-mono text-sm font-semibold text-fg">{name}</p>
                <p className="mt-0.5 flex flex-wrap items-center gap-2 text-xs text-muted">
                  <Badge tone="brand">{f.kind.toUpperCase()}</Badge>
                  <span>{t(`fileKind.${f.kind}`)}</span>
                  {size && (
                    <span>
                      · {tc("size")} : {size}
                    </span>
                  )}
                </p>
              </div>
              {exists && f.downloadable ? (
                <a href={f.path} download className={buttonClass("primary", "!px-4 !py-2")}>
                  <Download aria-hidden className="size-4" />
                  {tc("download")}
                  <span className="sr-only"> {name}</span>
                </a>
              ) : (
                <Badge tone="warn">{t("fileMissing")}</Badge>
              )}
            </div>

            {preview && (
              <details className="group mt-3">
                <summary className="inline-flex cursor-pointer select-none items-center gap-1 text-sm font-semibold text-brand hover:underline">
                  <span className="group-open:hidden">{tc("view")}</span>
                  <span className="hidden group-open:inline">{tc("hide")}</span>
                  <span className="sr-only"> {name}</span>
                </summary>
                <pre tabIndex={0} aria-label={`${t("preview")} ${name}`} className="mt-2 max-h-80 overflow-auto rounded-lg border border-border bg-surface-2 p-3 text-xs leading-relaxed text-fg">
                  <code>{preview.text}</code>
                  {preview.truncated && `\n… (${preview.total})`}
                </pre>
              </details>
            )}
          </li>
        );
      })}
    </ul>
  );
}
