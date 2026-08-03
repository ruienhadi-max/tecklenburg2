import {
  Container,
  Section,
  SectionHeader,
  ButtonLink,
  Card,
  CheckList,
} from "@/components/ui";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { PhotoFrame } from "@/components/visuals";
import { JsonLd, breadcrumbLd } from "@/lib/jsonld";
import { prinzipien, haltung, qualitaet } from "@/content/konzept";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Pädagogisches Konzept",
  description:
    "Verhaltenstherapeutisch und systemisch fundiert, personzentriert nach Rogers: das pädagogische Konzept der Jugendhilfe Tecklenburg — Haltung, Methoden, Zielgruppen und Schutzkonzept nach SGB VIII.",
  path: "/paedagogisches-konzept",
  keywords: [
    "pädagogisches Konzept Jugendhilfe",
    "intensivpädagogische Betreuung Konzept",
    "systemische Jugendhilfe NRW",
  ],
});

/** Zielgruppen im Klartext — Jugendämter suchen genau nach dieser Passung. */
const zielgruppen = [
  {
    title: "Junge Menschen mit Beziehungsabbrüchen",
    body: "Wiederholte Wechsel von Pflegefamilien, Wohngruppen oder Klinikaufenthalten haben Misstrauen erzeugt. Wir setzen auf Kontinuität und halten Beziehung auch dann, wenn sie getestet wird.",
  },
  {
    title: "Herausforderndes und grenzverletzendes Verhalten",
    body: "Aggression, Regelverstöße, Weglaufen. Wir arbeiten mit klarer Struktur, transparenten Konsequenzen und dem Verständnis, dass Verhalten Funktion hat.",
  },
  {
    title: "Seelische Behinderung oder drohende Behinderung",
    body: "Hilfen nach § 35a SGB VIII in enger Abstimmung mit behandelnden Ärzt:innen, Therapeut:innen und Kliniken.",
  },
  {
    title: "Schulvermeidung und Bildungsabbrüche",
    body: "Schrittweiser Wiederaufbau von Beschulung — vom Lernen im geschützten Rahmen bis zur Rückführung in eine Regelbeschulung oder Ausbildung.",
  },
  {
    title: "Junge Volljährige in der Verselbstständigung",
    body: "Hilfen nach § 41 SGB VIII mit Fokus auf Wohnen, Ausbildung, Finanzen und tragfähige Netzwerke nach Hilfeende.",
  },
  {
    title: "Junge Menschen aus unterschiedlichen Kulturen",
    body: "Wir arbeiten mit jungen Menschen jeder Religion und kulturellen Prägung — mit Respekt für Herkunft und ohne Anpassungsforderung an eine Norm.",
  },
];

const methoden = [
  "Verhaltenstherapeutisch fundierte Arbeit an konkreten, beobachtbaren Zielen",
  "Systemische Sicht auf Familie, Schule, Peers und Helfernetz",
  "Personzentrierte Grundhaltung nach Rogers: Akzeptanz, Empathie, Kongruenz",
  "Bezugsbetreuungssystem mit fester Zuständigkeit",
  "Erlebnispädagogische Elemente in Natur, Sport und handwerklicher Arbeit",
  "Ritualisierte Tages- und Wochenstruktur als tragendes Element",
  "Partizipation: Gruppenrunden, Beteiligungsformate, dokumentierte Beschwerdewege",
  "Kollegiale Fallberatung und externe Supervision als feste Routine",
];

const grenzen = [
  "Akute Suizidalität oder unbehandelte akute psychiatrische Krisen — hier ist zuerst der klinische Rahmen zuständig",
  "Aktive, unbehandelte Suchtmittelabhängigkeit ohne Entzugsbereitschaft",
  "Bedarf an geschlossener Unterbringung nach § 1631b BGB",
];

export default function KonzeptPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: "Start", path: "/" },
          { name: "Pädagogisches Konzept", path: "/paedagogisches-konzept" },
        ])}
      />

      <PageHero
        eyebrow="Pädagogisches Konzept"
        title="Wie wir arbeiten — und warum wir es so tun."
        lead={haltung.body}
        crumbs={[
          { name: "Start", path: "/" },
          { name: "Pädagogisches Konzept", path: "/paedagogisches-konzept" },
        ]}
        actions={
          <>
            <ButtonLink href="/angebote" withArrow>
              Unsere Angebote
            </ButtonLink>
            <ButtonLink href="/fallanfrage" variant="secondary">
              Fallanfrage stellen
            </ButtonLink>
          </>
        }
      />

      {/* Grundsätze */}
      <Section tone="soft">
        <Container width="wide">
          <Reveal>
            <SectionHeader
              eyebrow="Grundsätze"
              title="Sechs Sätze, an denen wir uns messen lassen."
              lead="Diese Grundsätze stehen nicht nur in der Konzeption. Sie sind die Kriterien, an denen wir in Fallberatung und Supervision unsere eigene Arbeit prüfen."
            />
          </Reveal>

          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {prinzipien.map((p, i) => (
              <Reveal key={p.title} delay={i * 70}>
                <Card className="h-full">
                  <span className="text-[0.85rem] font-semibold text-moss-500 tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-4 text-[1.25rem] font-semibold text-pine-900">
                    {p.title}
                  </h3>
                  <p className="prose-de mt-3 leading-relaxed text-ink-600">{p.body}</p>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Zielgruppen */}
      <Section>
        <Container width="wide">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-5">
              <Reveal>
                <SectionHeader
                  eyebrow="Zielgruppen"
                  title="Für wen unsere Hilfen gedacht sind."
                  lead="Damit Sie die Passung schnell einschätzen können, benennen wir die Zielgruppen konkret — statt in Formulierungen, die auf jeden zutreffen."
                />
              </Reveal>
              <Reveal delay={140}>
                <PhotoFrame
                  ratio="landscape"
                  bild="fachliche-arbeit"
                  alt="Zwei Fachkräfte bei der Fallarbeit am Besprechungstisch"
                  className="mt-12"
                />
              </Reveal>
            </div>

            <div className="lg:col-span-7">
              <ul className="divide-y divide-ink-100 border-y border-ink-100">
                {zielgruppen.map((z, i) => (
                  <Reveal key={z.title} delay={i * 55} as="li">
                    <div className="py-7">
                      <h3 className="text-[1.12rem] font-semibold text-pine-900">
                        {z.title}
                      </h3>
                      <p className="prose-de mt-2.5 leading-relaxed text-ink-600">
                        {z.body}
                      </p>
                    </div>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* Methoden + Grenzen */}
      <Section tone="deep">
        <Container width="wide" className="relative">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-7">
              <Reveal>
                <SectionHeader
                  tone="light"
                  eyebrow="Methodik"
                  title="Womit wir konkret arbeiten."
                />
              </Reveal>
              <Reveal delay={100}>
                <CheckList items={methoden} tone="light" className="mt-10" />
              </Reveal>
            </div>

            <div className="lg:col-span-5">
              <Reveal delay={140}>
                <div className="rounded-[var(--radius-xl3)] bg-white/[0.06] p-8 hairline-invert">
                  <h3 className="text-[1.3rem] font-semibold text-white">
                    Wo unsere Grenzen liegen
                  </h3>
                  <p className="prose-de mt-4 leading-relaxed text-sage-100/75">
                    Eine ehrliche Absage ist für Sie wertvoller als eine Aufnahme, die
                    nach wenigen Wochen scheitert. In diesen Konstellationen sagen wir
                    ab und benennen, was aus unserer Sicht zuerst gebraucht wird:
                  </p>
                  <ul className="mt-6 space-y-4">
                    {grenzen.map((g) => (
                      <li
                        key={g}
                        className="prose-de border-l-2 border-sage-300/30 pl-4 text-[0.95rem] leading-relaxed text-sage-100/80"
                      >
                        {g}
                      </li>
                    ))}
                  </ul>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* Schutz & Qualität */}
      <Section>
        <Container width="wide">
          <Reveal>
            <SectionHeader
              eyebrow="Schutz & Qualitätssicherung"
              title="Kinderschutz ist ein Verfahren, keine Absichtserklärung."
              lead="Alle hier genannten Verfahren sind schriftlich hinterlegt, den Mitarbeitenden bekannt und werden regelmäßig überprüft."
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
        </Container>
      </Section>
    </>
  );
}
