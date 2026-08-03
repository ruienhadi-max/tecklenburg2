import Link from "next/link";
import { Container, Section, SectionHeader, ButtonLink, TextLink, Tag, Arrow, Check } from "@/components/ui";
import { Reveal } from "@/components/reveal";
import { Portrait } from "@/components/person";
import { ContourField, AuraBlob, PhotoFrame } from "@/components/visuals";
import { angebote } from "@/content/angebote";
import { prinzipien, haltung } from "@/content/konzept";
import { kennzahlen, aufnahmeprozess } from "@/content/jugendaemter";
import { benefits } from "@/content/karriere";
import { leadership } from "@/content/site";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title:
    "Stationäre Kinder- und Jugendhilfe im Kreis Steinfurt",
  description:
    "Intensivwohngruppe, Betreute Wohnformen und Individualpädagogik nach SGB VIII im Kreis Steinfurt. Rückmeldung auf Fallanfragen werktags in 48 Stunden.",
  path: "/",
  keywords: [
    "Jugendhilfe Tecklenburg",
    "stationäre Jugendhilfe NRW",
    "Kinder- und Jugendhilfe Kreis Steinfurt",
    "Hilfe zur Erziehung Münsterland",
  ],
});

/** Vertrauensargumente für Jugendämter — die Kernbotschaft der Startseite. */
const vertrauen = [
  {
    title: "Erfahrenes, multiprofessionelles Team",
    body: "Sozialpädagog:innen, Erzieher:innen und Heilpädagog:innen arbeiten hier seit Jahren zusammen — mit erweiterten Führungszeugnissen, Supervision und verbindlicher Fortbildung.",
  },
  {
    title: "Individuelle Hilfen statt Standardpaket",
    body: "Drei Hilfeformate, die wir am Bedarf ausrichten — nicht am freien Platz. Wenn wir nicht passen, sagen wir das früh und begründet.",
  },
  {
    title: "Klare Strukturen im Alltag",
    body: "Verlässliche Abläufe, feste Bezugsbetreuung und nachvollziehbare Regeln. Struktur ist bei uns Entlastung, nicht Disziplinierung.",
  },
  {
    title: "Transparente Zusammenarbeit",
    body: "Benannte Fallverantwortung mit Direktdurchwahl, Entwicklungsberichte zum Hilfeplanturnus, Teilnahme an Hilfeplangesprächen vor Ort oder digital.",
  },
  {
    title: "Fachliche Qualität, überprüfbar",
    body: "Betriebserlaubnis über das Landesjugendamt Münster, Schutzkonzept nach § 45 SGB VIII, dokumentiertes Verfahren nach § 8a SGB VIII.",
  },
  {
    title: "Erreichbarkeit, auch in der Krise",
    body: "Rufbereitschaft der Leitung rund um die Uhr. Bei Krisen, Entweichungen oder Gefährdungsanhaltspunkten informieren wir Sie unverzüglich.",
  },
];

export default function HomePage() {
  return (
    <>
      {/* ---------------------------------------------------------------- Hero */}
      <section className="relative overflow-hidden bg-paper">
        <ContourField className="inset-0 h-full w-full" />
        <AuraBlob className="-top-40 -right-32 h-[38rem] w-[38rem]" tone="sage" />
        <AuraBlob className="-bottom-56 -left-40 h-[34rem] w-[34rem]" tone="moss" />

        <Container width="wide" className="relative">
          <div className="grid items-center gap-14 pt-16 pb-20 sm:pt-24 lg:grid-cols-12 lg:gap-12 lg:pt-28 lg:pb-28">
            {/* Der Hero läuft bewusst ohne Scroll-Reveal — er ist immer sichtbar
                und darf das Rendern der Hauptüberschrift nicht verzögern. */}
            <div className="lg:col-span-7">
              <div className="mb-8 inline-flex items-center gap-2.5 rounded-full bg-mist-100 px-4 py-2 text-[0.82rem] font-medium text-pine-700">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-moss-400 opacity-60" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-moss-500" />
                </span>
                Aktuell freie Plätze — sprechen Sie uns an
              </div>

              <h1 className="text-[2.15rem] leading-[1.08] font-semibold tracking-[-0.028em] text-pine-950 sm:text-[3.2rem] lg:text-[4.05rem]">
                Verlässliche Kinder- und Jugendhilfe mit Haltung, Fachlichkeit und
                Menschlichkeit.
              </h1>

              <p className="prose-de mt-8 max-w-2xl text-lg leading-relaxed text-ink-600 sm:text-xl">
                Jugendhilfe Tecklenburg begleitet junge Menschen individuell,
                professionell und mit einem klaren pädagogischen Konzept. Wir schaffen
                sichere Entwicklungsräume und arbeiten partnerschaftlich mit
                Jugendämtern, Familien und Fachstellen zusammen.
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <ButtonLink href="/fallanfrage" withArrow>
                  Fallanfrage stellen
                </ButtonLink>
                <ButtonLink href="/paedagogisches-konzept" variant="secondary">
                  Unser Konzept kennenlernen
                </ButtonLink>
              </div>

              <dl className="mt-14 grid max-w-2xl grid-cols-2 gap-x-6 gap-y-8 border-t border-ink-100 pt-10 sm:grid-cols-4">
                {kennzahlen.map((k) => (
                  <div key={k.label}>
                    <dt className="text-[1.7rem] leading-none font-semibold text-pine-800">
                      {k.value}
                    </dt>
                    <dd className="mt-2.5 text-[0.82rem] leading-snug text-ink-500">
                      {k.label}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>

            <div className="lg:col-span-5">
              <div className="relative">
                <PhotoFrame
                  ratio="portrait"
                  bild="gespraech-leitung"
                  alt="Zwei Mitarbeitende der Jugendhilfe Tecklenburg im Gespräch am Besprechungstisch"
                  priority
                  className="shadow-[var(--shadow-lift)]"
                />
                {/* Eingeschobene Karte bricht das Bild auf und trägt eine Aussage.
                    Vertikal mittig platziert, damit sie die Bildunterschrift
                    am unteren Rand nicht überdeckt. */}
                <div className="absolute top-1/2 -left-8 hidden max-w-[17rem] -translate-y-1/2 rounded-[var(--radius-xl2)] bg-white p-6 shadow-[var(--shadow-lift)] hairline lg:block">
                  <p className="prose-de text-[0.92rem] leading-relaxed text-ink-700">
                    „{haltung.lead}“
                  </p>
                  <p className="mt-3 text-[0.78rem] tracking-[0.1em] text-ink-400 uppercase">
                    Leitsatz seit {site.founded}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* -------------------------------------------- Vertrauen für Jugendämter */}
      <Section tone="soft" id="vertrauen">
        <Container width="wide">
          <Reveal>
            <SectionHeader
              eyebrow="Für öffentliche Auftraggeber"
              title="Warum Jugendämter mit uns arbeiten"
              lead="Eine Belegungsentscheidung ist eine Vertrauensentscheidung. Deshalb legen wir offen, worauf Sie sich bei uns verlassen können — bevor Sie fragen müssen."
            />
          </Reveal>

          <div className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {vertrauen.map((item, i) => (
              <Reveal key={item.title} delay={i * 70}>
                <div className="group">
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-white text-moss-600 shadow-[var(--shadow-soft)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105">
                    <Check className="h-5 w-5" />
                  </div>
                  <h3 className="text-[1.12rem] font-semibold text-pine-900">
                    {item.title}
                  </h3>
                  <p className="prose-de mt-3 text-[0.97rem] leading-relaxed text-ink-600">
                    {item.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={120}>
            <div className="mt-16 flex flex-wrap items-center gap-x-8 gap-y-4">
              <TextLink href="/fuer-jugendaemter">
                Alles zur Zusammenarbeit mit Jugendämtern
              </TextLink>
              <TextLink href="/fallanfrage">Direkt zur Fallanfrage</TextLink>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* ------------------------------------------------ Pädagogische Arbeit */}
      <Section>
        <Container width="wide">
          <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-5">
              <Reveal>
                <SectionHeader
                  eyebrow="Unsere pädagogische Arbeit"
                  title="Verhalten hat immer einen Grund."
                  lead={haltung.body}
                />
              </Reveal>
              <Reveal delay={120}>
                <div className="mt-10">
                  <TextLink href="/paedagogisches-konzept">
                    Das vollständige Konzept lesen
                  </TextLink>
                </div>
              </Reveal>
              <Reveal delay={180}>
                <PhotoFrame
                  ratio="landscape"
                  bild="kollegiale-beratung"
                  alt="Kollegiale Fallberatung im Sitzkreis"
                  className="mt-12 hidden lg:block"
                />
              </Reveal>
            </div>

            <div className="lg:col-span-7">
              <ul className="divide-y divide-ink-100 border-y border-ink-100">
                {prinzipien.map((p, i) => (
                  <Reveal key={p.title} delay={i * 60} as="li">
                    <div className="grid gap-4 py-8 sm:grid-cols-[auto_1fr] sm:gap-8">
                      <span className="text-[0.85rem] font-semibold text-moss-500 tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <div>
                        <h3 className="text-[1.2rem] font-semibold text-pine-900">
                          {p.title}
                        </h3>
                        <p className="prose-de mt-2.5 leading-relaxed text-ink-600">
                          {p.body}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* -------------------------------------------------------- Angebote */}
      <Section tone="sage" id="angebote">
        <Container width="wide">
          <Reveal>
            <SectionHeader
              eyebrow="Angebote"
              title="Drei Hilfeformen. Ein fachlicher Anspruch."
              lead="Wir arbeiten nicht mit einem Standardsetting, sondern wählen die Hilfeform passend zum jungen Menschen — und benennen offen, wo unsere Grenzen liegen."
            />
          </Reveal>

          <div className="mt-16 grid gap-6 lg:grid-cols-3">
            {angebote.map((a, i) => (
              <Reveal key={a.slug} delay={i * 90}>
                <Link
                  href={`/angebote/${a.slug}`}
                  className="group flex h-full flex-col rounded-[var(--radius-xl3)] bg-white p-8 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hairline hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
                >
                  <p className="text-[0.78rem] font-semibold tracking-[0.14em] text-moss-600 uppercase">
                    {a.kicker}
                  </p>
                  <h3 className="mt-4 text-[1.55rem] leading-tight font-semibold text-pine-900">
                    {a.title}
                  </h3>
                  <p className="prose-de mt-4 flex-1 text-[0.97rem] leading-relaxed text-ink-600">
                    {a.summary}
                  </p>

                  <dl className="mt-7 space-y-2.5 border-t border-ink-100 pt-6 text-[0.88rem]">
                    <div className="flex gap-3">
                      <dt className="w-24 shrink-0 text-ink-400">Zielgruppe</dt>
                      <dd className="text-ink-700">{a.age}</dd>
                    </div>
                    <div className="flex gap-3">
                      <dt className="w-24 shrink-0 text-ink-400">Setting</dt>
                      <dd className="text-ink-700">{a.capacity}</dd>
                    </div>
                  </dl>

                  <div className="mt-6 flex flex-wrap gap-1.5">
                    {a.legal.slice(0, 3).map((l) => (
                      <Tag key={l}>{l}</Tag>
                    ))}
                  </div>

                  <span className="mt-7 inline-flex items-center gap-2 text-[0.92rem] font-medium text-pine-800">
                    Leistung ansehen
                    <Arrow />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* ------------------------------------------------ Für Jugendämter (B2B) */}
      <Section tone="deep">
        <ContourField className="inset-0 h-full w-full" tone="dark" />
        <Container width="wide" className="relative">
          <div className="grid gap-16 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-5">
              <Reveal>
                <SectionHeader
                  tone="light"
                  eyebrow="Für Jugendämter"
                  title="Vom Anruf bis zur Aufnahme — in klaren Schritten."
                  lead="Sie wissen bei uns jederzeit, woran Sie sind: wer zuständig ist, wann Sie eine Antwort bekommen und was Sie an Unterlagen erhalten."
                />
              </Reveal>

              <Reveal delay={140}>
                <div className="mt-10 flex flex-wrap gap-4">
                  <ButtonLink href="/fuer-jugendaemter" variant="onDark" withArrow>
                    Zusammenarbeit im Detail
                  </ButtonLink>
                  <ButtonLink href="/fallanfrage" variant="onDarkGhost">
                    Fallanfrage stellen
                  </ButtonLink>
                </div>
              </Reveal>

              <Reveal delay={200}>
                <div className="mt-12 rounded-[var(--radius-xl2)] bg-white/[0.06] p-6 hairline-invert">
                  <p className="text-[0.78rem] font-semibold tracking-[0.14em] text-sage-300 uppercase">
                    Direkter Draht
                  </p>
                  <p className="mt-3 text-[1.05rem] font-medium text-white">
                    {leadership[1].name}
                  </p>
                  <p className="text-[0.9rem] text-sage-200/70">{leadership[1].role}</p>
                  <a
                    href={`tel:${site.contact.phone.replace(/\s/g, "")}`}
                    className="mt-4 inline-block text-[1.05rem] font-medium text-sage-200 transition-colors hover:text-white"
                  >
                    {site.contact.phoneDisplay}
                  </a>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-7">
              <ol className="relative space-y-1">
                {aufnahmeprozess.map((s, i) => (
                  <Reveal key={s.step} delay={i * 80} as="li">
                    <div className="relative grid grid-cols-[auto_1fr] gap-6 rounded-[var(--radius-xl2)] p-6 transition-colors duration-300 hover:bg-white/[0.05]">
                      <div className="flex flex-col items-center">
                        <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-[0.85rem] font-semibold text-sage-200 hairline-invert">
                          {s.step}
                        </span>
                        {i < aufnahmeprozess.length - 1 ? (
                          <span
                            aria-hidden
                            className="mt-2 w-px flex-1 bg-gradient-to-b from-white/20 to-transparent"
                          />
                        ) : null}
                      </div>
                      <div className="pb-4">
                        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                          <h3 className="text-[1.2rem] font-semibold text-white">
                            {s.title}
                          </h3>
                          <span className="text-[0.82rem] text-sage-300/80">
                            {s.duration}
                          </span>
                        </div>
                        <p className="prose-de mt-2.5 leading-relaxed text-sage-100/75">
                          {s.body}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </ol>
            </div>
          </div>
        </Container>
      </Section>

      {/* ------------------------------------------------------------- Team */}
      <Section>
        <Container width="wide">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
            <Reveal className="lg:col-span-5">
              <PhotoFrame
                ratio="landscape"
                bild="team-terrasse"
                alt="Das Team der Jugendhilfe Tecklenburg vor dem Haus in Ibbenbüren"
                className="shadow-[var(--shadow-lift)]"
              />
            </Reveal>

            <div className="lg:col-span-7">
              <Reveal>
                <SectionHeader
                  eyebrow="Team"
                  title="Die Arbeit ist so gut wie die Menschen, die sie machen."
                  lead="Bei uns arbeiten Fachkräfte, die geblieben sind. Das ist in der stationären Jugendhilfe keine Selbstverständlichkeit — und für junge Menschen mit Beziehungsabbrüchen der entscheidende Unterschied."
                />
              </Reveal>

              <div className="mt-12 space-y-8">
                {leadership.slice(0, 2).map((p, i) => (
                  <Reveal key={p.slug} delay={i * 100}>
                    <figure className="grid grid-cols-[auto_1fr] gap-6">
                      <Portrait person={p} size={64} />
                      <div>
                        <blockquote className="prose-de text-[1.05rem] leading-relaxed text-ink-700">
                          „{p.zitatEntwurf}“
                        </blockquote>
                        <figcaption className="mt-3 text-[0.88rem] text-ink-500">
                          <span className="font-medium text-pine-800">{p.name}</span> ·{" "}
                          {p.role}
                        </figcaption>
                      </div>
                    </figure>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={200}>
                <div className="mt-12">
                  <TextLink href="/team">Das gesamte Team kennenlernen</TextLink>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* ---------------------------------------------------------- Karriere */}
      <Section tone="soft">
        <Container width="wide">
          <Reveal>
            <SectionHeader
              eyebrow="Karriere"
              title="Verändere Leben. Mit einem Team, das dich trägt."
              lead="Bei Jugendhilfe Tecklenburg arbeitest du nicht einfach in einer Einrichtung — du gestaltest Beziehungen, Entwicklung und Zukunft."
            />
          </Reveal>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b, i) => (
              <Reveal key={b.title} delay={i * 70}>
                <div className="h-full rounded-[var(--radius-xl3)] bg-white p-8 hairline">
                  <h3 className="text-[1.12rem] font-semibold text-pine-900">
                    {b.title}
                  </h3>
                  <p className="prose-de mt-3 text-[0.97rem] leading-relaxed text-ink-600">
                    {b.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>

          <Reveal delay={140}>
            <div className="mt-14 flex flex-wrap items-center gap-4">
              <ButtonLink href="/karriere#stellen" withArrow>
                Offene Stellen ansehen
              </ButtonLink>
              <ButtonLink href="/karriere" variant="secondary">
                Wie der Arbeitsalltag aussieht
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
