import Image from "next/image";
import type { Domain } from "@/content/types";

/**
 * Couverture d'un projet : image fournie (public/…) sinon visuel abstrait généré selon le domaine.
 * Décoratif : l'alternative textuelle est portée par le titre de la carte.
 */
export function ProjectCover({ domain, cover, priority = false }: { domain: Domain; cover?: string; priority?: boolean }) {
  if (cover) {
    return <Image src={cover} alt="" width={800} height={450} priority={priority} className="aspect-video w-full object-cover" />;
  }
  return (
    <svg viewBox="0 0 320 180" role="presentation" aria-hidden className="aspect-video w-full bg-gradient-to-br from-brand-soft to-surface-2">
      <g stroke="var(--chart-grid)" strokeWidth="1">
        {[40, 80, 120, 160].map((y) => (
          <line key={y} x1="16" x2="304" y1={y} y2={y} />
        ))}
      </g>
      {domain === "health" && (
        <>
          <polyline points="16,130 52,118 88,124 124,96 160,70 196,42 232,78 268,92 304,84" fill="none" stroke="var(--chart-1)" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
          <polyline points="16,146 52,142 88,140 124,130 160,118 196,100 232,106 268,110 304,108" fill="none" stroke="var(--chart-2)" strokeWidth="2" strokeDasharray="5 4" />
          <circle cx="196" cy="42" r="6" fill="var(--chart-2)" />
        </>
      )}
      {domain === "business" && (
        <>
          {[44, 70, 56, 92, 78, 112, 100, 130].map((h, i) => (
            <rect key={i} x={28 + i * 34} y={160 - h} width="22" height={h} rx="3" fill={i % 2 ? "var(--chart-3)" : "var(--chart-1)"} />
          ))}
        </>
      )}
      {domain === "stats" && (
        <>
          {[
            [40, 130], [62, 118], [84, 122], [100, 100], [128, 104], [150, 84], [176, 88], [198, 66], [226, 70], [252, 46], [276, 52],
          ].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r="5" fill="var(--chart-1)" opacity="0.85" />
          ))}
          <line x1="30" y1="140" x2="290" y2="42" stroke="var(--chart-2)" strokeWidth="2.5" strokeLinecap="round" />
        </>
      )}
      {domain === "gis" && (
        <>
          <path d="M20 150 L90 100 L150 126 L220 60 L300 90" fill="none" stroke="var(--chart-3)" strokeWidth="2" strokeDasharray="4 4" />
          {[[70, 70], [130, 100], [200, 50], [250, 120], [110, 140], [275, 70]].map(([x, y], i) => (
            <circle key={i} cx={x} cy={y} r={i === 2 ? 30 : 6} fill={i === 2 ? "var(--chart-1)" : "var(--chart-2)"} opacity={i === 2 ? 0.2 : 0.9} stroke={i === 2 ? "var(--chart-1)" : "none"} />
          ))}
          <circle cx="200" cy="50" r="6" fill="var(--chart-1)" />
        </>
      )}
      {domain === "other" && (
        <>
          {[0, 1, 2, 3].map((r) =>
            [0, 1, 2, 3, 4].map((c) => (
              <rect key={`${r}${c}`} x={28 + c * 54} y={28 + r * 34} width="46" height="26" rx="3" fill={r === 0 ? "var(--chart-1)" : "var(--surface)"} stroke="var(--border)" opacity={r === 0 ? 0.9 : 1} />
            )),
          )}
        </>
      )}
    </svg>
  );
}
