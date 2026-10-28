"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import clsx from "clsx";
import { Link, usePathname } from "@/i18n/navigation";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { ThemeToggle } from "./ThemeToggle";
import { siteConfig } from "@/config/site";

const items = [
  { href: "/", key: "home" },
  { href: "/projects", key: "projects" },
  { href: "/dashboards", key: "dashboards" },
  { href: "/services", key: "services" },
  { href: "/about", key: "about" },
  { href: "/contact", key: "contact" },
] as const;

export function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Le menu mobile se ferme au clic sur un lien (onClick) et avec la touche Échap.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <header className="sticky top-0 z-40 border-b border-border bg-bg/85 backdrop-blur supports-[backdrop-filter]:bg-bg/70">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5 font-display text-base font-bold tracking-tight">
          <span aria-hidden className="grid size-8 place-items-center rounded-lg bg-brand text-sm font-extrabold text-on-brand">
            LM
          </span>
          <span className="leading-none">
            {siteConfig.brand}
            <span className="sr-only"> — {siteConfig.name}</span>
          </span>
        </Link>

        <nav aria-label={t("main")} className="hidden items-center gap-1 lg:flex">
          {items.map(({ href, key }) => (
            <Link
              key={key}
              href={href}
              aria-current={isActive(href) ? "page" : undefined}
              className={clsx(
                "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                isActive(href) ? "bg-brand-soft text-brand-strong" : "text-muted hover:text-fg",
              )}
            >
              {t(key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <LanguageSwitcher className="hidden sm:inline-flex" />
          <ThemeToggle />
          <button
            type="button"
            className="inline-flex size-9 items-center justify-center rounded-lg border border-border bg-surface text-fg lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? t("closeMenu") : t("openMenu")}
            onClick={() => setOpen((o) => !o)}
          >
            {open ? <X aria-hidden className="size-5" /> : <Menu aria-hidden className="size-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div id="mobile-menu" className="border-t border-border bg-bg lg:hidden">
          <nav aria-label={t("main")} className="mx-auto flex max-w-6xl flex-col gap-1 px-4 py-4 sm:px-6">
            {items.map(({ href, key }) => (
              <Link
                key={key}
                href={href}
                aria-current={isActive(href) ? "page" : undefined}
                onClick={() => setOpen(false)}
                className={clsx(
                  "rounded-lg px-3 py-3 text-base font-medium",
                  isActive(href) ? "bg-brand-soft text-brand-strong" : "text-fg hover:bg-surface-2",
                )}
              >
                {t(key)}
              </Link>
            ))}
            <LanguageSwitcher className="mt-3 inline-flex self-start sm:hidden" />
          </nav>
        </div>
      )}
    </header>
  );
}
