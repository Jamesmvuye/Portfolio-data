import fs from "node:fs";
import path from "node:path";
import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { UserRound } from "lucide-react";
import { siteConfig } from "@/config/site";

/** Cherche la photo dans public/images (james-mvuye.jpg | .jpeg | .png | .webp). Exécuté au build/rendu serveur. */
export function findPhoto(): string | null {
  const dir = path.join(process.cwd(), "public", "images");
  for (const ext of siteConfig.photo.extensions) {
    const file = `${siteConfig.photo.basename}.${ext}`;
    if (fs.existsSync(path.join(dir, file))) return `/images/${file}`;
  }
  return null;
}

export async function ProfilePhoto({ locale }: { locale: string }) {
  const t = await getTranslations({ locale, namespace: "hero" });
  const src = findPhoto();

  return (
    <figure className="relative mx-auto w-full max-w-sm">
      {/* Halo décoratif */}
      <div aria-hidden className="absolute -inset-3 rounded-[2rem] bg-gradient-to-br from-brand/25 via-transparent to-brand/10 blur-xl" />
      <div className="relative aspect-[4/5] overflow-hidden rounded-[1.75rem] border border-border bg-surface shadow-xl shadow-brand/10">
        {src ? (
          <Image
            src={src}
            alt={t("photoAlt")}
            fill
            priority
            sizes="(min-width: 1024px) 384px, (min-width: 640px) 384px, 90vw"
            className="object-cover object-top"
          />
        ) : (
          <div className="flex size-full flex-col items-center justify-center gap-4 bg-gradient-to-b from-brand-soft to-surface-2 p-8 text-center">
            <span className="grid size-28 place-items-center rounded-full border border-border bg-surface text-brand">
              <UserRound aria-hidden className="size-14" strokeWidth={1.25} />
            </span>
            <div>
              <p className="font-display text-lg font-bold text-fg">{t("placeholderTitle")}</p>
              <p className="mt-1 break-all font-mono text-xs text-muted">{t("placeholderHint")}</p>
            </div>
          </div>
        )}
      </div>
      <figcaption className="sr-only">{siteConfig.name}</figcaption>

      {/* Carte décorative : illustre l'esprit « données → décisions » (aucune donnée réelle) */}
      <div aria-hidden className="absolute -bottom-5 -left-4 hidden rounded-2xl border border-border bg-surface p-3 shadow-lg sm:block">
        <svg width="112" height="48" viewBox="0 0 112 48" fill="none">
          {[10, 22, 16, 30, 24, 38, 44].map((h, i) => (
            <rect key={i} x={i * 16} y={48 - h} width="10" rx="2" height={h} fill="var(--chart-1)" opacity={0.35 + i * 0.1} />
          ))}
        </svg>
      </div>
    </figure>
  );
}
