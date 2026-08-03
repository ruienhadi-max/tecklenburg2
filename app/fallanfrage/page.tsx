import { Suspense } from "react";
import { Container, Section, Card, CheckList } from "@/components/ui";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { FallanfrageForm } from "@/components/fallanfrage-form";
import { JsonLd, breadcrumbLd } from "@/lib/jsonld";
import { site, leadership } from "@/content/site";
import { unterlagen } from "@/content/jugendaemter";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Fallanfrage stellen",
  description:
    "Fallanfrage an die Jugendhilfe Tecklenburg: Schildern Sie die Situation in wenigen Minuten. Rückmeldung werktags innerhalb von 48 Stunden — Zusage, Absage oder Alternativvorschlag.",
  path: "/fallanfrage",
  keywords: ["Platzanfrage Jugendhilfe NRW", "freie Plätze stationäre Jugendhilfe"],
});

const ablauf = [
  "Sie senden die Anfrage — Stichpunkte genügen, eine vollständige Akte ist nicht nötig.",
  "Wir prüfen im Leitungsteam gegen Bedarf, Gruppenkonstellation und Personalressourcen.",
  "Sie erhalten werktags innerhalb von 48 Stunden eine klare Rückmeldung.",
  "Bei Passung folgen Vorstellungstermin, Hilfeplangespräch und Aufnahme.",
];

export default function FallanfragePage() {
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: "Start", path: "/" },
          { name: "Fallanfrage", path: "/fallanfrage" },
        ])}
      />

      <PageHero
        eyebrow="Fallanfrage"
        title="Schildern Sie uns den Fall."
        lead="Wir fragen nur ab, was wir für eine erste fachliche Einschätzung wirklich brauchen — das dauert etwa drei Minuten. Eine vertrauliche Vorabklärung ohne Namensnennung ist ausdrücklich möglich."
        crumbs={[
          { name: "Start", path: "/" },
          { name: "Fallanfrage", path: "/fallanfrage" },
        ]}
      />

      <Section tone="soft" size="compact">
        <Container width="wide">
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14">
            <div className="lg:col-span-7">
              <Suspense
                fallback={
                  <div className="h-[42rem] animate-pulse rounded-[var(--radius-xl3)] bg-mist-100" />
                }
              >
                <FallanfrageForm />
              </Suspense>
            </div>

            <aside className="space-y-6 lg:col-span-5">
              <Reveal>
                <Card className="bg-pine-900 !text-sage-100 hairline-invert">
                  <p className="text-[0.78rem] font-semibold tracking-[0.14em] text-sage-300 uppercase">
                    Es eilt?
                  </p>
                  <p className="prose-de mt-4 leading-relaxed text-sage-100/80">
                    In akuten Fällen ist ein Anruf schneller als jedes Formular. Sie
                    erreichen die Einrichtungsleitung direkt.
                  </p>
                  <p className="mt-6 text-[1.1rem] font-medium text-white">
                    {leadership[1].name}
                  </p>
                  <p className="text-[0.9rem] text-sage-200/70">{leadership[1].role}</p>
                  <a
                    href={`tel:${site.contact.phone.replace(/\s/g, "")}`}
                    className="mt-4 inline-block text-[1.25rem] font-semibold text-white transition-colors hover:text-sage-200"
                  >
                    {site.contact.phoneDisplay}
                  </a>
                  <p className="mt-4 text-[0.85rem] text-sage-200/60">
                    {site.hours.office}
                    <br />
                    {site.hours.emergency}
                  </p>
                </Card>
              </Reveal>

              <Reveal delay={80}>
                <Card tone="soft">
                  <h2 className="text-[1.15rem] font-semibold text-pine-900">
                    So geht es weiter
                  </h2>
                  <ol className="mt-5 space-y-4">
                    {ablauf.map((step, i) => (
                      <li key={step} className="flex gap-4">
                        <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-white text-[0.75rem] font-semibold text-pine-800 hairline">
                          {i + 1}
                        </span>
                        <span className="prose-de text-[0.94rem] leading-relaxed text-ink-600">
                          {step}
                        </span>
                      </li>
                    ))}
                  </ol>
                </Card>
              </Reveal>

              <Reveal delay={140}>
                <Card tone="soft">
                  <h2 className="text-[1.15rem] font-semibold text-pine-900">
                    Unterlagen auf Anfrage
                  </h2>
                  <p className="mt-3 text-[0.92rem] text-ink-500">
                    Vermerken Sie einfach im Formular, was Sie benötigen.
                  </p>
                  <CheckList items={unterlagen} className="mt-5" />
                </Card>
              </Reveal>
            </aside>
          </div>
        </Container>
      </Section>
    </>
  );
}
