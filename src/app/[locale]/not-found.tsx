import { useTranslations } from "next-intl";
import { ButtonLink } from "@/components/ui";

export default function NotFound() {
  const t = useTranslations("errors");
  return (
    <div className="mx-auto flex max-w-2xl flex-col items-center px-4 py-28 text-center">
      <p className="font-display text-7xl font-extrabold text-brand">404</p>
      <h1 className="mt-4 font-display text-3xl font-bold">{t("notFoundTitle")}</h1>
      <p className="mt-3 text-muted">{t("notFoundText")}</p>
      <ButtonLink href="/" className="mt-8">
        {t("backHome")}
      </ButtonLink>
    </div>
  );
}
