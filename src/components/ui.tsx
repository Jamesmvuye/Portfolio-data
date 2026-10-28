import type { ComponentProps, ReactNode } from "react";
import clsx from "clsx";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@/i18n/navigation";

type Variant = "primary" | "secondary" | "ghost";

const base =
  "inline-flex items-center justify-center gap-2 rounded-lg px-5 py-2.5 text-sm font-semibold transition-colors duration-200 disabled:cursor-not-allowed disabled:opacity-60";
const variants: Record<Variant, string> = {
  primary: "bg-brand text-on-brand hover:bg-brand-strong hover:text-on-brand shadow-sm",
  secondary: "border border-border bg-surface text-fg hover:border-brand hover:text-brand",
  ghost: "text-brand hover:bg-brand-soft",
};

export function buttonClass(variant: Variant = "primary", extra?: string) {
  return clsx(base, variants[variant], extra);
}

/** Lien interne localisé stylé en bouton. */
export function ButtonLink({
  variant = "primary",
  className,
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant }) {
  return <Link className={buttonClass(variant, className)} {...props} />;
}

/** Lien externe (nouvel onglet, rel sécurisé). Le libellé indique l'ouverture dans un nouvel onglet aux lecteurs d'écran. */
export function ExternalButton({
  href,
  children,
  variant = "secondary",
  newTabLabel,
  className,
  download,
}: {
  href: string;
  children: ReactNode;
  variant?: Variant;
  newTabLabel?: string;
  className?: string;
  download?: boolean;
}) {
  return (
    <a
      href={href}
      className={buttonClass(variant, className)}
      {...(download ? { download: true } : { target: "_blank", rel: "noopener noreferrer" })}
    >
      {children}
      {!download && (
        <>
          <ArrowUpRight aria-hidden className="size-4" />
          {newTabLabel && <span className="sr-only">({newTabLabel})</span>}
        </>
      )}
    </a>
  );
}

/** Bouton désactivé explicite (aucun faux lien). */
export function DisabledButton({ children, hint }: { children: ReactNode; hint?: string }) {
  return (
    <span
      role="link"
      aria-disabled="true"
      title={hint}
      className={clsx(base, "cursor-not-allowed border border-dashed border-border bg-surface-2 text-muted")}
    >
      {children}
    </span>
  );
}

export function Badge({ children, tone = "neutral", className }: { children: ReactNode; tone?: "neutral" | "brand" | "warn"; className?: string }) {
  return (
    <span
      className={clsx(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        tone === "neutral" && "bg-surface-2 text-muted",
        tone === "brand" && "bg-brand-soft text-brand-strong",
        tone === "warn" && "bg-warn-bg text-warn-fg",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function Section({ id, children, className, tone = "default" }: { id?: string; children: ReactNode; className?: string; tone?: "default" | "alt" }) {
  return (
    <section id={id} className={clsx("py-16 sm:py-20", tone === "alt" && "border-y border-border bg-surface-2/50", className)}>
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">{children}</div>
    </section>
  );
}

export function SectionHeading({ title, lead, as: Tag = "h2", action }: { title: string; lead?: string; as?: "h1" | "h2"; action?: ReactNode }) {
  return (
    <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
      <div className="max-w-2xl">
        <Tag className="font-display text-3xl font-bold tracking-tight text-fg sm:text-4xl">{title}</Tag>
        {lead && <p className="mt-3 text-lg leading-relaxed text-muted">{lead}</p>}
      </div>
      {action}
    </div>
  );
}

export function Notice({ children, tone = "warn", role }: { children: ReactNode; tone?: "warn" | "info"; role?: "status" | "alert" }) {
  return (
    <div
      role={role}
      className={clsx(
        "rounded-xl border px-4 py-3 text-sm leading-relaxed",
        tone === "warn" ? "border-warn-fg/25 bg-warn-bg text-warn-fg" : "border-border bg-brand-soft text-brand-strong",
      )}
    >
      {children}
    </div>
  );
}

export function PageHeader({ title, lead, children }: { title: string; lead?: string; children?: ReactNode }) {
  return (
    <header className="relative overflow-hidden border-b border-border bg-surface">
      <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden />
      <div className="relative mx-auto max-w-6xl px-4 py-14 sm:px-6 sm:py-20">
        <h1 className="fade-up font-display text-4xl font-bold tracking-tight text-fg sm:text-5xl">{title}</h1>
        {lead && <p className="fade-up fade-up-2 mt-4 max-w-3xl text-lg leading-relaxed text-muted">{lead}</p>}
        {children && <div className="fade-up fade-up-3 mt-6">{children}</div>}
      </div>
    </header>
  );
}
