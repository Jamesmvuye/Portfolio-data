"use client";

import { useTranslations } from "next-intl";
import { buttonClass } from "@/components/ui";

export default function ErrorPage({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const t = useTranslations("errors");
  return (
    <div role="alert" className="mx-auto flex max-w-2xl flex-col items-center px-4 py-28 text-center">
      <h1 className="font-display text-3xl font-bold">{t("errorTitle")}</h1>
      <p className="mt-3 text-muted">{t("errorText")}</p>
      <button type="button" onClick={reset} className={buttonClass("primary", "mt-8")}>
        {t("retry")}
      </button>
    </div>
  );
}
