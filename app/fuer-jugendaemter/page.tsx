import {
  Container,
  Section,
  SectionHeader,
  ButtonLink,
  Card,
  CheckList,
  Check,
} from "@/components/ui";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { Accordion } from "@/components/accordion";
import { JsonLd, breadcrumbLd, faqLd } from "@/lib/jsonld";
import {
  kennzahlen,
  aufnahmeprozess,
  einwaende,
  unterlagen,
} from "@/content/jugendaemter";
import { angebote } from "@/content/angebote";
import { site, leadership } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Für Jugendämter",
  description:
    "Aufnahmeprozess, Berichtswesen, Krisenkommunikation und Ansprechpartner:innen der Jugendhilfe Tecklenburg. Rückmeldung auf Fallanfragen werktags innerhalb von 48 Stunden, Rufbereitschaft rund um die Uhr.",
  path: "/fuer-jugendaemter",
  keywords: [
    "Jugendamt Belegung Jugendhilfe NRW",
    "Aufnahmeverfahren stationäre Jugendhilfe",
    "Hilfeplanung SGB VIII Träger",
    "freie Plätze Jugendhilfe Kreis Steinfurt",
  ],
});

/** Was Fallführungen in der Praxis wirklich brauchen — gespiegelt in ihrer Sprache. */
const anforderungen = [
  {
    title: "Sie brauchen eine schnelle, belastbare Antwort",
    body: "Sie bekommen werktags innerhalb von 48 Stunden eine verbindliche Aussage — Zusage, Absage oder ein konkreter Alternativvorschlag. Keine Wochen der Ungewissheit.",
  },
  {
    title: "Sie brauchen eine ehrliche Passungsprüfung",
    body: "Wir prüfen im Leitungsteam gegen Betreuungsbedarf, Gruppenkonstellation und Personalressourcen. Wenn es nicht passt, sagen wir es mit Begründung.",
  },
  {
    title: "Sie brauchen eine Person, keine Sammeladresse",
    body: "Zu jedem Fall gehört eine namentlich benannte Fachkraft mit Direktdurchwahl — plus Bereichsleitung als Vertretung.",
  },
  {
    title: "Sie brauchen Berichte, die zum Hilfeplan passen",
    body: "Entwicklungsberichte sind an den Zielen aus Ihrem Hilfeplan ausgerichtet, kommen rechtzeitig vor dem Gespräch und enthalten eine klare Empfehlung.",
  },
  {
    title: "Sie brauchen Sicherheit in der Krise",
    body: "Rufbereitschaft rund um die Uhr, unverzügliche Meldung bei Entweichung, Eskalation oder § 8a-Anhaltspunkten, schriftliche Dokumentation im Anschluss.",
  },
  {
    title: "Sie brauchen prüffähige Unterlagen",
    body: "Konzeption, Entgeltvereinbarung, Schutzkonzept und § 8a-Verfahren erhalten Sie auf Anfrage vollständig — ohne Nachfassen.",
  },
];

export default function FuerJugendaemterPage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbLd([
            { name: "Start", path: "/" },
            { name: "Für Jugendämter", path: "/fuer-jugendaemter" },
          ]),
          faqLd(einwaende),
        ]}
      />

      <PageHero
        tone="deep"
        eyebrow="Für Jugendämter"
        title="Ein Träger, der Ihre Anforderungen kennt — und sie schriftlich hat."
        lead="Sie treffen eine Entscheidung, für die Sie einstehen müssen. Deshalb finden Sie hier vorab alles, wonach Sie sonst fragen müssten: Prozess, Fristen, Zuständigkeiten, Unterlagen."
        crumbs={[
          { name: "Start", path: "/" },
          { name: "Für Jugendämter", path: "/fuer-jugendaemter" },
        ]}
        actions={
          <>
            <ButtonLink href="/fallanfrage" variant="onDark" withArrow>
              Fallanfrage stellen
            </ButtonLink>
            <ButtonLink
              href={`tel:${site.contact.phone.replace(/\s/g, "")}`}
              variant="onDarkGhost"
            >
              {site.contact.phoneDisplay}
            </ButtonLink>
          </>
        }
        aside={
          <div className="grid grid-cols-2 gap-4">
            {kennzahlen.map((k) => (
              <div
                key={k.label}
                className="rounded-[var(--radius-xl2)] bg-white/[0.07] p-6 hairline-invert"
              >
                <p className="text-[1.35rem] leading-none font-semibold text-white sm:text-[1.6rem]">
                  {k.value}
                </p>
                <p className="mt-3 text-[0.85rem] leading-snug text-sage-100/80">
                  {k.label}
                </p>
                <p className="mt-1 text-[0.78rem] text-sage-300/80">{k.note}</p>
              </div>
            ))}
          </div>
        }
      />

      {/* Anforderungen spiegeln */}
      <Section tone="soft">
        <Container width="wide">
          <Reveal>
            <SectionHeader
              eyebrow="Ihre Anforderungen"
              title="Was Sie von einem Träger erwarten — und wie wir es lösen."
              lead="Diese sechs Punkte entscheiden in der Praxis darüber, ob eine Zusammenarbeit funktioniert. Wir haben sie deshalb nicht in die Konzeption verschoben, sondern nach vorn geholt."
            />
          </Reveal>

          <div className="mt-16 grid gap-x-10 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {anforderungen.map((a, i) => (
              <Reveal key={a.title} delay={i * 65}>
                <div>
                  <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-white text-moss-600 shadow-[var(--shadow-soft)]">
                    <Check className="h-5 w-5" />
                  </div>
                  <h3 className="text-[1.1rem] leading-snug font-semibold text-pine-900">
                    {a.title}
                  </h3>
                  <p className="prose-de mt-3 text-[0.96rem] leading-relaxed text-ink-600">
                    {a.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Aufnahmeprozess */}
      <Section id="aufnahme">
        <Container width="wide">
          <Reveal>
            <SectionHeader
              eyebrow="Aufnahmeprozess"
              title="Fünf Schritte, kalkulierbare Fristen."
              lead="So läuft eine Anfrage bei uns ab — von der ersten Schilderung bis zur laufenden Zusammenarbeit."
            />
          </Reveal>

          <ol className="mt-16 space-y-6">
            {aufnahmeprozess.map((s, i) => (
              <Reveal key={s.step} delay={i * 70} as="li">
                <div className="grid gap-8 rounded-[var(--radius-xl3)] bg-mist-50 p-8 hairline lg:grid-cols-12 lg:p-10">
                  <div className="lg:col-span-5">
                    <div className="flex items-center gap-4">
                      <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white text-[0.85rem] font-semibold text-pine-800 hairline">
                        {s.step}
                      </span>
                      <span className="rounded-full bg-white px-3 py-1 text-[0.78rem] font-medium text-moss-600">
                        {s.duration}
                      </span>
                    </div>
                    <h3 className="mt-6 text-[1.5rem] font-semibold text-pine-900">
                      {s.title}
                    </h3>
                    <p className="prose-de mt-3 leading-relaxed text-ink-600">
                      {s.body}
                    </p>
                  </div>
                  <div className="lg:col-span-7 lg:border-l lg:border-ink-200/60 lg:pl-10">
                    <CheckList items={s.detail} />
                  </div>
                </div>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      {/* Unterlagen */}
      <Section tone="sage">
        <Container width="wide">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-5">
              <Reveal>
                <SectionHeader
                  eyebrow="Unterlagen"
                  title="Was Sie ohne Nachfassen bekommen."
                  lead="Sie müssen bei uns nicht dreimal erinnern. Auf Anfrage senden wir das komplette Paket in der Regel am selben Werktag."
                />
              </Reveal>
              <Reveal delay={120}>
                <div className="mt-10">
                  <ButtonLink href="/kontakt" withArrow>
                    Unterlagen anfordern
                  </ButtonLink>
                </div>
              </Reveal>
            </div>
            <div className="lg:col-span-7">
              <Reveal delay={80}>
                <Card className="h-full">
                  <CheckList items={unterlagen} />
                </Card>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* Einwandbehandlung */}
      <Section tone="deep">
        <Container width="wide" className="relative">
          <Reveal>
            <SectionHeader
              tone="light"
              eyebrow="Häufige Fragen aus der Fallkonferenz"
              title="Die Fragen, die Sie uns ohnehin stellen würden."
              lead="Vorab beantwortet, damit Sie in der Fallkonferenz auskunftsfähig sind — auch ohne vorher bei uns anzurufen."
            />
          </Reveal>
          <Reveal delay={100}>
            <div className="mt-14">
              <Accordion items={einwaende} tone="light" />
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Ansprechpartner nach Hilfeform */}
      <Section>
        <Container width="wide">
          <Reveal>
            <SectionHeader
              eyebrow="Ansprechpartner:innen"
              title="Direkt zur richtigen Person."
              lead="Kein Sekretariat dazwischen, keine Weiterleitungskette. Wählen Sie nach Hilfeform."
            />
          </Reveal>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {angebote.map((a, i) => (
              <Reveal key={a.slug} delay={i * 80}>
                <Card className="flex h-full flex-col">
                  <p className="text-[0.78rem] font-semibold tracking-[0.14em] text-moss-600 uppercase">
                    {a.title}
                  </p>
                  <p className="mt-4 text-[1.25rem] font-semibold text-pine-900">
                    {a.contact.name}
                  </p>
                  <p className="mt-1 flex-1 text-[0.92rem] text-ink-500">
                    {a.contact.role}
                  </p>
                  <a
                    href={`tel:${a.contact.phone.replace(/\s/g, "")}`}
                    className="mt-6 inline-block text-[1.05rem] font-medium text-pine-800 transition-colors hover:text-moss-600"
                  >
                    {a.contact.phoneDisplay}
                  </a>
                </Card>
              </Reveal>
            ))}
          </div>

          <Reveal delay={140}>
            <div className="mt-8 grid gap-6 lg:grid-cols-2">
              <Card tone="soft">
                <p className="text-[0.78rem] font-semibold tracking-[0.14em] text-moss-600 uppercase">
                  Gesamtleitung & Aufnahmeentscheidung
                </p>
                <p className="mt-4 text-[1.25rem] font-semibold text-pine-900">
                  {leadership[1].name}
                </p>
                <p className="mt-1 text-[0.92rem] text-ink-500">{leadership[1].role}</p>
                <a
                  href={`tel:${site.contact.phone.replace(/\s/g, "")}`}
                  className="mt-6 inline-block text-[1.05rem] font-medium text-pine-800 transition-colors hover:text-moss-600"
                >
                  {site.contact.phoneDisplay}
                </a>
              </Card>
              <Card tone="soft">
                <p className="text-[0.78rem] font-semibold tracking-[0.14em] text-moss-600 uppercase">
                  Erreichbarkeit
                </p>
                <p className="prose-de mt-4 leading-relaxed text-ink-700">
                  {site.hours.office}
                </p>
                <p className="prose-de mt-2 leading-relaxed text-ink-700">
                  {site.hours.emergency}
                </p>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="mt-6 inline-block break-all text-[1.02rem] font-medium text-pine-800 transition-colors hover:text-moss-600"
                >
                  {site.contact.email}
                </a>
              </Card>
            </div>
          </Reveal>
        </Container>
      </Section>

      {/* Abschluss-CTA */}
      <Section tone="soft" size="compact">
        <Container width="wide">
          <Reveal>
            <div className="rounded-[var(--radius-xl4)] bg-white p-10 text-center hairline sm:p-14">
              <SectionHeader
                align="center"
                eyebrow="Nächster Schritt"
                title="Schildern Sie uns den Fall."
                lead="Das Formular ist auf die Angaben ausgelegt, die wir für eine erste fachliche Einschätzung wirklich brauchen — es dauert etwa drei Minuten. Eine vertrauliche Vorabklärung ohne Namensnennung ist ausdrücklich möglich."
              />
              <div className="mt-10 flex flex-wrap justify-center gap-4">
                <ButtonLink href="/fallanfrage" withArrow>
                  Fallanfrage stellen
                </ButtonLink>
                <ButtonLink
                  href={`tel:${site.contact.phone.replace(/\s/g, "")}`}
                  variant="secondary"
                >
                  Lieber telefonisch: {site.contact.phoneDisplay}
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
