import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { siteConfig } from "@/config/site";
import { pageMetadata } from "@/lib/seo";
import { ButtonLink, ExternalButton, Notice, PageHeader, Section } from "@/components/ui";
import { serviceIcons, serviceKeys } from "@/components/ServiceCards";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  return pageMetadata(locale, "services", "/services");
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "services" });
  const tc = await getTranslations({ locale, namespace: "common" });
  const process = t.raw("process") as { title: string; text: string }[];

  return (
    <>
      <PageHeader title={t("title")} lead={t("lead")}>
        <div className="flex flex-wrap gap-3">
          <ButtonLink href="/contact?type=quote">{t("ctaQuote")}</ButtonLink>
          <ButtonLink href="/contact?type=collab" variant="secondary">
            {t("ctaCollab")}
          </ButtonLink>
        </div>
      </PageHeader>

      <Section>
        <ul className="grid gap-6 md:grid-cols-2">
          {serviceKeys.map((key) => {
            const Icon = serviceIcons[key];
            return (
              <li key={key} className="flex flex-col rounded-2xl border border-border bg-surface p-6">
                <span className="grid size-12 place-items-center rounded-xl bg-brand-soft text-brand">
                  <Icon aria-hidden className="size-6" />
                </span>
                <h2 className="mt-4 font-display text-xl font-bold">{t(`items.${key}.title`)}</h2>
                <p className="mt-2 flex-1 leading-relaxed text-muted">{t(`items.${key}.text`)}</p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <ButtonLink href={`/contact?type=service&service=${key}`}>{t("ctaService")}</ButtonLink>
                  <ButtonLink href={`/contact?type=quote&service=${key}`} variant="secondary">
                    {t("ctaQuote")}
                  </ButtonLink>
                  {key === "training" && siteConfig.trainingUrl && (
                    <ExternalButton href={siteConfig.trainingUrl} variant="ghost" newTabLabel={tc("externalLink")}>
                      {t("trainingLink")}
                    </ExternalButton>
                  )}
                </div>
              </li>
            );
          })}
        </ul>
      </Section>

      <Section tone="alt">
        <h2 className="font-display text-3xl font-bold tracking-tight">{t("processTitle")}</h2>
        <ol className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {process.map((p, i) => (
            <li key={p.title} className="rounded-2xl border border-border bg-surface p-5">
              <span aria-hidden className="font-display text-3xl font-extrabold text-brand/40">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="mt-2 font-display text-lg font-bold">{p.title}</h3>
              <p className="mt-1.5 text-sm leading-relaxed text-muted">{p.text}</p>
            </li>
          ))}
        </ol>
        <div className="mt-8">
          <Notice tone="info">{t("confidentiality")}</Notice>
        </div>
      </Section>
    </>
  );
}
