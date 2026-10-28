import type { Metadata } from "next";
import { hasLocale } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { pageMetadata } from "@/lib/seo";
import { siteConfig } from "@/config/site";
import { ExternalButton, PageHeader, Section } from "@/components/ui";
import { ProfilePhoto } from "@/components/ProfilePhoto";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) return {};
  return pageMetadata(locale, "about", "/about");
}

const tools = ["Python", "R", "SQL", "Excel", "Power BI", "QGIS", "Jupyter"];

function Placeholder({ text }: { text: string }) {
  return <p className="rounded-xl border border-dashed border-border bg-surface-2/60 px-4 py-3 text-sm text-muted">{text}</p>;
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations({ locale, namespace: "about" });
  const tc = await getTranslations({ locale, namespace: "common" });
  const profile = t.raw("profile") as string[];
  const approach = t.raw("approach") as { title: string; text: string }[];
  const { languages, education, certifications } = siteConfig.profile;

  return (
    <>
      <PageHeader title={t("title")} lead={t("lead")} />

      <Section>
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_20rem]">
          <div className="space-y-12">
            <div>
              <h2 className="font-display text-2xl font-bold">{t("profileTitle")}</h2>
              <div className="mt-4 space-y-4 text-lg leading-relaxed text-fg/90">
                {profile.map((p) => (
                  <p key={p}>{p}</p>
                ))}
              </div>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold">{t("approachTitle")}</h2>
              <ul className="mt-5 grid gap-4 sm:grid-cols-2">
                {approach.map((a) => (
                  <li key={a.title} className="rounded-2xl border border-border bg-surface p-5">
                    <h3 className="font-display font-bold text-brand-strong">{a.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-muted">{a.text}</p>
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h2 className="font-display text-2xl font-bold">{t("toolsTitle")}</h2>
              <p className="mt-3 text-muted">{t("toolsLead")}</p>
              <ul className="mt-4 flex flex-wrap gap-2">
                {tools.map((x) => (
                  <li key={x} className="rounded-lg border border-border bg-surface px-3.5 py-1.5 text-sm font-semibold">
                    {x}
                  </li>
                ))}
              </ul>
            </div>

            <div className="grid gap-8 md:grid-cols-3">
              <div>
                <h2 className="font-display text-xl font-bold">{t("languagesTitle")}</h2>
                <div className="mt-3">
                  {languages.length ? (
                    <ul className="space-y-1.5">
                      {languages.map((l) => (
                        <li key={l.code}>
                          {l.code}
                          {l.level && <span className="text-muted"> — {l.level}</span>}
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <Placeholder text={t("placeholder")} />
                  )}
                </div>
              </div>
              <div>
                <h2 className="font-display text-xl font-bold">{t("educationTitle")}</h2>
                <div className="mt-3">
                  {education.length ? (
                    <ul className="space-y-2">
                      {education.map((e) => (
                        <li key={e.title}>
                          <span className="font-semibold">{e.title}</span>
                          <span className="block text-sm text-muted">
                            {e.org}
                            {e.year && ` · ${e.year}`}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <Placeholder text={t("placeholder")} />
                  )}
                </div>
              </div>
              <div>
                <h2 className="font-display text-xl font-bold">{t("certificationsTitle")}</h2>
                <div className="mt-3">
                  {certifications.length ? (
                    <ul className="space-y-2">
                      {certifications.map((c) => (
                        <li key={c.title}>
                          <span className="font-semibold">{c.title}</span>
                          <span className="block text-sm text-muted">
                            {c.org}
                            {c.year && ` · ${c.year}`}
                          </span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <Placeholder text={t("placeholder")} />
                  )}
                </div>
              </div>
            </div>

            <div className="rounded-3xl border border-border bg-brand-soft p-6 sm:p-8">
              <h2 className="font-display text-2xl font-bold text-brand-strong">{t("trainingTitle")}</h2>
              <p className="mt-3 max-w-2xl leading-relaxed text-fg/90">{t("trainingText")}</p>
              <div className="mt-5">
                <ExternalButton href={siteConfig.trainingUrl} variant="primary" newTabLabel={tc("externalLink")}>
                  {t("trainingCta")}
                </ExternalButton>
              </div>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold">{t("siteLanguagesTitle")}</h2>
              <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted">{t("siteLanguagesText")}</p>
            </div>
          </div>

          <div className="lg:sticky lg:top-24">
            <ProfilePhoto locale={locale} />
          </div>
        </div>
      </Section>
    </>
  );
}
