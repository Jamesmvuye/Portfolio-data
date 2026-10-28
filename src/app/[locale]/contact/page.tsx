import type { Metadata } from "next";
import { Suspense } from "react";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { pageMetadata } from "@/lib/seo";
import { ContactForm } from "@/components/ContactForm";
import { ContactLinks } from "@/components/ContactLinks";
import { PageHeader, Section } from "@/components/ui";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  return pageMetadata(locale, "contact", "/contact");
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "contact" });

  return (
    <>
      <PageHeader title={t("title")} lead={t("lead")} />
      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr]">
          {/* useSearchParams (préremplissage type/service) exige Suspense pour garder la page statique */}
          <Suspense fallback={<div className="h-96 animate-pulse rounded-2xl bg-surface-2" />}>
            <ContactForm />
          </Suspense>
          <aside aria-labelledby="links-h">
            <h2 id="links-h" className="font-display text-xl font-bold">
              {t("linksTitle")}
            </h2>
            <div className="mt-4">
              <ContactLinks locale={locale} />
            </div>
          </aside>
        </div>
      </Section>
    </>
  );
}
