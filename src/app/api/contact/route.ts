import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/contact-schema";

export const runtime = "nodejs";

/**
 * Envoi du formulaire de contact via Resend (https://resend.com).
 * Variables d'environnement requises (voir .env.example) :
 *   RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL
 * Si l'une manque : réponse 503 « not_configured » — jamais de faux succès.
 */

// Limitation de débit « au mieux » en mémoire (par instance serverless) : 5 envois / 10 min / IP.
const WINDOW_MS = 10 * 60 * 1000;
const MAX_HITS = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW_MS);
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) for (const [k, v] of hits) if (v.every((t) => now - t >= WINDOW_MS)) hits.delete(k);
  return recent.length > MAX_HITS;
}

const json = (body: Record<string, unknown>, status: number) => NextResponse.json(body, { status, headers: { "Cache-Control": "no-store" } });

export async function POST(request: Request) {
  // Protection CSRF élémentaire : l'origine doit correspondre à l'hôte du site.
  const origin = request.headers.get("origin");
  const host = request.headers.get("host");
  if (origin) {
    try {
      if (new URL(origin).host !== host) return json({ error: "forbidden" }, 403);
    } catch {
      return json({ error: "forbidden" }, 403);
    }
  }

  if (Number(request.headers.get("content-length") ?? 0) > 20_000) return json({ error: "too_large" }, 413);

  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || "unknown";
  if (rateLimited(ip)) return json({ error: "too_many" }, 429);

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return json({ error: "invalid" }, 400);
  }

  const parsed = contactSchema.safeParse(payload);
  if (!parsed.success) {
    return json({ error: "invalid", fields: [...new Set(parsed.error.issues.map((i) => String(i.path[0])))] }, 422);
  }
  const data = parsed.data;

  // Honeypot rempli : on répond comme si tout allait bien, sans rien envoyer.
  if (data.website) return json({ ok: true }, 200);

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO_EMAIL;
  const from = process.env.CONTACT_FROM_EMAIL;
  if (!apiKey || !to || !from) return json({ error: "not_configured" }, 503);

  // Texte brut uniquement (pas de HTML) : aucune injection possible depuis les champs saisis.
  const text = [
    `Type: ${data.type}`,
    data.service ? `Service: ${data.service}` : null,
    `Nom: ${data.name}`,
    `E-mail: ${data.email}`,
    data.organization ? `Organisation: ${data.organization}` : null,
    "",
    data.message,
  ]
    .filter((l) => l !== null)
    .join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: data.email,
        subject: `[Portfolio] ${data.type} — ${data.name}`.replace(/[\r\n]+/g, " ").slice(0, 150),
        text,
      }),
      signal: AbortSignal.timeout(10_000),
    });
    if (!res.ok) return json({ error: "send_failed" }, 502);
    return json({ ok: true }, 200);
  } catch {
    return json({ error: "send_failed" }, 502);
  }
}

// Toute autre méthode est refusée.
export function GET() {
  return json({ error: "method_not_allowed" }, 405);
}
