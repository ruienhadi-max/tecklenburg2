import { Container, Section, SectionHeader, ButtonLink, Card, Tag } from "@/components/ui";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { PhotoFrame } from "@/components/visuals";
import { JsonLd, breadcrumbLd } from "@/lib/jsonld";
import { haltung, historie, werte, qualitaet } from "@/content/konzept";
import { site, teamComposition } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Über uns",
  description:
    "Jugendhilfe Tecklenburg: freier Träger der Kinder- und Jugendhilfe seit 2009 im Kreis Steinfurt. Haltung, Historie, Qualitätssicherung und Aufsicht durch das Landesjugendamt Münster.",
  path: "/ueber-uns",
  keywords: ["Jugendhilfe Träger NRW", "freier Träger Jugendhilfe Kreis Steinfurt"],
});

export default function UeberUnsPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: "Start", path: "/" },
          { name: "Über uns", path: "/ueber-uns" },
        ])}
      />

      <PageHero
        eyebrow="Über uns"
        title="Ein Träger, der seit 2009 dieselbe Linie hält."
        lead="Wir sind ein kleiner, inhabergeführter Träger der Kinder- und Jugendhilfe im Kreis Steinfurt. Klein zu bleiben ist bei uns eine fachliche Entscheidung: Es hält Entscheidungswege kurz und sorgt dafür, dass die Leitung die jungen Menschen persönlich kennt."
        crumbs={[
          { name: "Start", path: "/" },
          { name: "Über uns", path: "/ueber-uns" },
        ]}
        actions={
          <>
            <ButtonLink href="/paedagogisches-konzept" withArrow>
              Pädagogisches Konzept
            </ButtonLink>
            <ButtonLink href="/team" variant="secondary">
              Unser Team
            </ButtonLink>
          </>
        }
        aside={
          <PhotoFrame
            ratio="portrait"
            tone="sage"
            seed={3}
            caption="Bildplatz: Außenansicht des Hauses im Grünen — Tageslicht, ruhige Perspektive."
            className="shadow-[var(--shadow-lift)]"
          />
        }
      />

      {/* Haltung */}
      <Section tone="soft">
        <Container width="wide">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
            <Reveal className="lg:col-span-5">
              <SectionHeader eyebrow="Haltung" title={haltung.lead} />
            </Reveal>
            <div className="lg:col-span-7">
              <Reveal delay={80}>
                <p className="prose-de text-lg leading-relaxed text-ink-600">
                  {haltung.body}
                </p>
              </Reveal>
              <div className="mt-12 grid gap-x-10 gap-y-8 sm:grid-cols-2">
                {werte.map((w, i) => (
                  <Reveal key={w.label} delay={i * 60}>
                    <h3 className="text-[1.05rem] font-semibold text-pine-900">
                      {w.label}
                    </h3>
                    <p className="prose-de mt-2 text-[0.95rem] leading-relaxed text-ink-600">
                      {w.note}
                    </p>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Historie */}
      <Section>
        <Container width="wide">
          <Reveal>
            <SectionHeader
              eyebrow="Entwicklung"
              title="Gewachsen, nicht skaliert."
              lead="Jede Erweiterung der letzten Jahre kam aus einem konkreten Bedarf — nicht aus einem Wachstumsplan."
            />
          </Reveal>

          <ol className="mt-16 border-t border-ink-100">
            {historie.map((m, i) => (
              <Reveal key={m.year} delay={i * 60} as="li">
                <div className="grid gap-3 border-b border-ink-100 py-8 sm:grid-cols-[9rem_1fr] sm:gap-10">
                  <span className="text-[1.15rem] font-semibold text-moss-600 tabular-nums">
                    {m.year}
                  </span>
                  <p className="prose-de text-[1.02rem] leading-relaxed text-ink-700">
                    {m.text}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      {/* Team-Zusammensetzung */}
      <Section tone="sage">
        <Container width="wide">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
            <Reveal className="lg:col-span-5">
              <SectionHeader
                eyebrow="Multiprofessionalität"
                title="Wer hier zusammenarbeitet."
                lead="Unterschiedliche Ausbildungen, ein gemeinsames Fallverständnis. Die Perspektivenvielfalt im Team ist kein Nebeneffekt, sondern Teil des Konzepts."
              />
            </Reveal>
            <div className="lg:col-span-7">
              <div className="grid gap-4 sm:grid-cols-2">
                {teamComposition.map((t, i) => (
                  <Reveal key={t.label} delay={i * 60}>
                    <Card className="h-full !p-6">
                      <h3 className="text-[1rem] leading-snug font-semibold text-pine-900">
                        {t.label}
                      </h3>
                      <p className="mt-2 text-[0.9rem] text-ink-500">{t.note}</p>
                    </Card>
                  </Reveal>
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Qualität & Aufsicht */}
      <Section>
        <Container width="wide">
          <Reveal>
            <SectionHeader
              eyebrow="Qualität & Aufsicht"
              title="Fachlichkeit, die man prüfen kann."
              lead="Vertrauen entsteht nicht durch Selbstbeschreibung, sondern durch überprüfbare Verfahren. Diese Unterlagen legen wir Jugendämtern auf Anfrage vollständig vor."
            />
          </Reveal>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {qualitaet.map((q, i) => (
              <Reveal key={q.title} delay={i * 70}>
                <Card tone="soft" className="h-full">
                  <h3 className="text-[1.08rem] font-semibold text-pine-900">
                    {q.title}
                  </h3>
                  <p className="prose-de mt-3 text-[0.95rem] leading-relaxed text-ink-600">
                    {q.body}
                  </p>
                </Card>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120}>
            <div className="mt-14 flex flex-wrap items-center gap-3">
              <span className="text-[0.88rem] text-ink-500">Mitgliedschaften:</span>
              {site.memberships.map((m) => (
                <Tag key={m}>{m}</Tag>
              ))}
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
