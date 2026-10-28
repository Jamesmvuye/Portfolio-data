import { getTranslations } from "next-intl/server";
import { Mail, MessageCircle, Link2, Code2, ArrowUpRight } from "lucide-react";
import clsx from "clsx";
import { siteConfig } from "@/config/site";

/** Construit l'URL réelle de chaque canal, ou null si le lien n'est pas configuré (aucun faux lien). */
export function contactHrefs() {
  const { linkedin, github, whatsapp, email } = siteConfig.links;
  return {
    linkedin: linkedin || null,
    github: github || null,
    whatsapp: whatsapp ? `https://wa.me/${whatsapp.replace(/\D/g, "")}` : null,
    email: email ? `mailto:${email}` : null,
  };
}

const icons = { linkedin: Link2, github: Code2, whatsapp: MessageCircle, email: Mail } as const;

export async function ContactLinks({ locale, variant = "list" }: { locale: string; variant?: "list" | "inline" }) {
  const t = await getTranslations({ locale, namespace: "contact" });
  const tc = await getTranslations({ locale, namespace: "common" });
  const hrefs = contactHrefs();
  const keys = ["email", "linkedin", "github", "whatsapp"] as const;

  return (
    <ul className={clsx(variant === "list" ? "space-y-3" : "flex flex-wrap gap-3")}>
      {keys.map((key) => {
        const Icon = icons[key];
        const href = hrefs[key];
        const label = t(`links.${key}`);
        const base = "flex items-center gap-3 rounded-xl border px-4 py-3 text-sm font-medium transition-colors";
        return (
          <li key={key}>
            {href ? (
              <a
                href={href}
                {...(key === "email" ? {} : { target: "_blank", rel: "noopener noreferrer" })}
                className={clsx(base, "border-border bg-surface text-fg hover:border-brand hover:text-brand")}
              >
                <Icon aria-hidden className="size-5 text-brand" />
                <span>{label}</span>
                {key !== "email" && (
                  <>
                    <ArrowUpRight aria-hidden className="ml-auto size-4" />
                    <span className="sr-only">({tc("externalLink")})</span>
                  </>
                )}
              </a>
            ) : (
              <span aria-disabled="true" className={clsx(base, "cursor-not-allowed border-dashed border-border bg-surface-2 text-muted")}>
                <Icon aria-hidden className="size-5" />
                <span>{label}</span>
                <span className="ml-auto text-xs">{t("linkSoon")}</span>
              </span>
            )}
          </li>
        );
      })}
    </ul>
  );
}
