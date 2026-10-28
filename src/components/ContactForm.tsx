"use client";

import { useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { CheckCircle2, TriangleAlert } from "lucide-react";
import { contactSchema, requestTypes, serviceChoices } from "@/lib/contact-schema";
import { buttonClass } from "./ui";

type Status = "idle" | "sending" | "success" | "error" | "not_configured";
const field = "mt-1 w-full rounded-lg border bg-bg px-3 py-2.5 text-sm text-fg placeholder:text-muted";

export function ContactForm() {
  const t = useTranslations("contact");
  const ts = useTranslations("services.items");
  const params = useSearchParams();

  const initialType = requestTypes.find((x) => x === params.get("type")) ?? "service";
  const initialService = serviceChoices.find((x) => x === params.get("service")) ?? "";

  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formError, setFormError] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const raw = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      organization: String(fd.get("organization") ?? ""),
      type: String(fd.get("type") ?? ""),
      service: String(fd.get("service") ?? ""),
      message: String(fd.get("message") ?? ""),
      consent: fd.get("consent") === "on",
      website: String(fd.get("website") ?? ""),
    };

    const parsed = contactSchema.safeParse(raw);
    if (!parsed.success) {
      const next: Record<string, string> = {};
      for (const issue of parsed.error.issues) {
        const k = String(issue.path[0]);
        if (!next[k]) next[k] = issue.message;
      }
      setErrors(next);
      setFormError("fixFields");
      setStatus("error");
      // Place le focus sur le premier champ invalide (accessibilité).
      const first = Object.keys(next)[0];
      (form.elements.namedItem(first) as HTMLElement | null)?.focus();
      return;
    }

    setErrors({});
    setFormError(null);
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(parsed.data),
      });
      if (res.ok) {
        setStatus("success");
        form.reset();
      } else if (res.status === 503) {
        setStatus("not_configured");
      } else if (res.status === 429) {
        setFormError("tooMany");
        setStatus("error");
      } else {
        setFormError("server");
        setStatus("error");
      }
    } catch {
      setFormError("network");
      setStatus("error");
    }
  }

  const err = (k: string) => (errors[k] ? t(`errors.${errors[k]}` as "errors.name") : null);
  const invalid = (k: string) => (errors[k] ? "border-red-600" : "border-border");

  if (status === "success") {
    return (
      <div role="status" className="rounded-2xl border border-ok/40 bg-surface p-8 text-center">
        <CheckCircle2 aria-hidden className="mx-auto size-10 text-ok" />
        <p className="mt-3 text-lg font-semibold">{t("success")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} noValidate aria-labelledby="contact-form-title" className="space-y-5 rounded-2xl border border-border bg-surface p-5 sm:p-7">
      <h2 id="contact-form-title" className="font-display text-xl font-bold">
        {t("formTitle")}
      </h2>

      {status === "not_configured" && (
        <div role="alert" className="flex gap-3 rounded-xl border border-warn-fg/25 bg-warn-bg p-4 text-sm text-warn-fg">
          <TriangleAlert aria-hidden className="mt-0.5 size-5 shrink-0" />
          <p>{t("notConfigured")}</p>
        </div>
      )}
      {status === "error" && formError && (
        <div role="alert" className="flex gap-3 rounded-xl border border-red-600/40 bg-red-600/10 p-4 text-sm text-red-700 dark:text-red-300">
          <TriangleAlert aria-hidden className="mt-0.5 size-5 shrink-0" />
          <p>{t(`errors.${formError}` as "errors.server")}</p>
        </div>
      )}

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="text-sm font-medium">{t("fields.name")}</label>
          <input id="name" name="name" autoComplete="name" required aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? "name-err" : undefined} className={`${field} ${invalid("name")}`} />
          {err("name") && <p id="name-err" className="mt-1 text-sm text-red-700 dark:text-red-300">{err("name")}</p>}
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-medium">{t("fields.email")}</label>
          <input id="email" name="email" type="email" autoComplete="email" required aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? "email-err" : undefined} className={`${field} ${invalid("email")}`} />
          {err("email") && <p id="email-err" className="mt-1 text-sm text-red-700 dark:text-red-300">{err("email")}</p>}
        </div>
      </div>

      <div>
        <label htmlFor="organization" className="text-sm font-medium">{t("fields.organization")}</label>
        <input id="organization" name="organization" autoComplete="organization" className={`${field} border-border`} />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="type" className="text-sm font-medium">{t("fields.type")}</label>
          <select id="type" name="type" defaultValue={initialType} aria-invalid={Boolean(errors.type)} className={`${field} ${invalid("type")}`}>
            {requestTypes.map((x) => (
              <option key={x} value={x}>{t(`types.${x}`)}</option>
            ))}
          </select>
          {err("type") && <p className="mt-1 text-sm text-red-700 dark:text-red-300">{err("type")}</p>}
        </div>
        <div>
          <label htmlFor="service" className="text-sm font-medium">{t("fields.service")}</label>
          <select id="service" name="service" defaultValue={initialService} className={`${field} border-border`}>
            <option value="">{t("anyService")}</option>
            {serviceChoices.map((x) => (
              <option key={x} value={x}>{ts(`${x}.title`)}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="text-sm font-medium">{t("fields.message")}</label>
        <textarea id="message" name="message" rows={6} required aria-invalid={Boolean(errors.message)} aria-describedby={errors.message ? "message-err" : undefined} className={`${field} ${invalid("message")}`} />
        {err("message") && <p id="message-err" className="mt-1 text-sm text-red-700 dark:text-red-300">{err("message")}</p>}
      </div>

      {/* Champ piège anti-spam : masqué aux humains et aux lecteurs d'écran */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="website">Website</label>
        <input id="website" name="website" tabIndex={-1} autoComplete="off" />
      </div>

      <div>
        <label className="flex items-start gap-3 text-sm">
          <input type="checkbox" name="consent" aria-invalid={Boolean(errors.consent)} className="mt-0.5 size-4 accent-[var(--brand)]" />
          <span>{t("fields.consent")}</span>
        </label>
        {err("consent") && <p className="mt-1 text-sm text-red-700 dark:text-red-300">{err("consent")}</p>}
      </div>

      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" disabled={status === "sending"} className={buttonClass("primary")}>
          {status === "sending" ? t("sending") : t("send")}
        </button>
        <p className="text-xs text-muted">{t("privacy")}</p>
      </div>
    </form>
  );
}
