import Link from "next/link";
import {
  Container,
  Section,
  SectionHeader,
  ButtonLink,
  Tag,
  Arrow,
} from "@/components/ui";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { JsonLd, breadcrumbLd, serviceLd } from "@/lib/jsonld";
import { angebote } from "@/content/angebote";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Angebote",
  description:
    "Intensivwohngruppe, Betreute Wohnformen und Individualpädagogik: die Hilfeformen der Jugendhilfe Tecklenburg nach §§ 27 ff., 34, 35, 35a, 38 und 41 SGB VIII — mit Zielgruppe, Ansatz und Ansprechpartner.",
  path: "/angebote",
  keywords: [
    "stationäre Jugendhilfe",
    "individualpädagogische Maßnahmen",
    "intensivpädagogische Betreuung",
    "Betreutes Wohnen Jugendhilfe NRW",
  ],
});

export default function AngebotePage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbLd([
            { name: "Start", path: "/" },
            { name: "Angebote", path: "/angebote" },
          ]),
          ...angebote.map(serviceLd),
        ]}
      />

      <PageHero
        eyebrow="Angebote"
        title="Drei Hilfeformen für unterschiedliche Bedarfe."
        lead="Welche Hilfe passt, entscheidet sich am jungen Menschen — nicht an unserer Auslastung. Auf den Detailseiten finden Sie Zielgruppe, Rechtsgrundlage, pädagogischen Ansatz und die direkte Ansprechperson."
        crumbs={[
          { name: "Start", path: "/" },
          { name: "Angebote", path: "/angebote" },
        ]}
        actions={
          <>
            <ButtonLink href="/fallanfrage" withArrow>
              Fallanfrage stellen
            </ButtonLink>
            <ButtonLink href="/fuer-jugendaemter" variant="secondary">
              Aufnahmeprozess ansehen
            </ButtonLink>
          </>
        }
      />

      <Section tone="soft" size="compact">
        <Container width="wide">
          <div className="space-y-6">
            {angebote.map((a, i) => (
              <Reveal key={a.slug} delay={i * 80}>
                <Link
                  href={`/angebote/${a.slug}`}
                  className="group block rounded-[var(--radius-xl4)] bg-white p-8 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hairline hover:-translate-y-1 hover:shadow-[var(--shadow-lift)] sm:p-10"
                >
                  <div className="grid gap-8 lg:grid-cols-12 lg:gap-12">
                    <div className="lg:col-span-7">
                      <p className="text-[0.78rem] font-semibold tracking-[0.14em] text-moss-600 uppercase">
                        {a.kicker}
                      </p>
                      <h2 className="mt-3 text-[1.9rem] leading-tight font-semibold text-pine-900 sm:text-[2.3rem]">
                        {a.title}
                      </h2>
                      <p className="prose-de mt-4 max-w-xl text-[1.02rem] leading-relaxed text-ink-600">
                        {a.summary}
                      </p>
                      <span className="mt-7 inline-flex items-center gap-2 text-[0.95rem] font-medium text-pine-800">
                        Zur Leistung
                        <Arrow />
                      </span>
                    </div>

                    <div className="lg:col-span-5">
                      <dl className="space-y-4 rounded-[var(--radius-xl2)] bg-mist-50 p-6 text-[0.9rem]">
                        <div>
                          <dt className="text-ink-400">Alter</dt>
                          <dd className="mt-1 text-ink-800">{a.age}</dd>
                        </div>
                        <div>
                          <dt className="text-ink-400">Setting</dt>
                          <dd className="mt-1 text-ink-800">{a.setting}</dd>
                        </div>
                        <div>
                          <dt className="text-ink-400">Rechtsgrundlagen</dt>
                          <dd className="mt-2 flex flex-wrap gap-1.5">
                            {a.legal.map((l) => (
                              <Tag key={l}>{l}</Tag>
                            ))}
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      <Section>
        <Container width="wide">
          <Reveal>
            <SectionHeader
              align="center"
              eyebrow="Nicht sicher, was passt?"
              title="Rufen Sie an, bevor Sie ein Formular ausfüllen."
              lead="Eine kurze fachliche Einschätzung am Telefon spart in der Regel mehr Zeit als jede Anfrage per E-Mail. Auch eine vertrauliche Vorabklärung ohne Namensnennung ist möglich."
            />
          </Reveal>
          <Reveal delay={120}>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <ButtonLink href="/kontakt" withArrow>
                Ansprechpartner:innen ansehen
              </ButtonLink>
              <ButtonLink href="/fallanfrage" variant="secondary">
                Fallanfrage stellen
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
