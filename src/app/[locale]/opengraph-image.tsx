import { ImageResponse } from "next/og";
import { getTranslations } from "next-intl/server";
import { siteConfig } from "@/config/site";
import { locales } from "@/i18n/routing";

export const alt = `${siteConfig.name} — ${siteConfig.brand}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function OpengraphImage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "hero" });

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, background: "linear-gradient(135deg,#0a1120 0%,#1e3a8a 100%)", color: "#fff" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 30, fontWeight: 700, letterSpacing: 4 }}>
          <div style={{ display: "flex", width: 56, height: 56, borderRadius: 14, background: "#6ea8ff", color: "#06122b", alignItems: "center", justifyContent: "center", fontSize: 28 }}>LM</div>
          {siteConfig.brand}
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 88, fontWeight: 800, lineHeight: 1.05 }}>{siteConfig.name}</div>
          <div style={{ marginTop: 20, fontSize: 36, color: "#a9c9ff" }}>{t("role")}</div>
        </div>
        <div style={{ display: "flex", gap: 14, alignItems: "flex-end", height: 90 }}>
          {[30, 52, 40, 70, 58, 86, 74].map((h, i) => (
            <div key={i} style={{ width: 34, height: h, borderRadius: 6, background: "#6ea8ff", opacity: 0.35 + i * 0.1 }} />
          ))}
        </div>
      </div>
    ),
    size,
  );
}
