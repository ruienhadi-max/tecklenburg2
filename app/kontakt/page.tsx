import { Container, Section, SectionHeader, ButtonLink, Card } from "@/components/ui";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { Portrait } from "@/components/person";
import { JsonLd, breadcrumbLd } from "@/lib/jsonld";
import { site, leadership } from "@/content/site";
import { angebote } from "@/content/angebote";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Kontakt",
  description:
    "Kontakt zur Jugendhilfe Tecklenburg: Verwaltung in Ibbenbüren, Ansprechpartner:innen nach Hilfeform, Rufbereitschaft rund um die Uhr. Telefon, E-Mail und Anfahrt auf einen Blick.",
  path: "/kontakt",
  keywords: ["Jugendhilfe Tecklenburg Kontakt", "Jugendhilfe Ibbenbüren"],
});

const wege = [
  {
    title: "Jugendämter & Fachstellen",
    body: "Fallanfragen, Hilfeplanung, Unterlagen und laufende Fälle.",
    action: { label: "Fallanfrage stellen", href: "/fallanfrage" },
    contact: site.contact.phoneDisplay,
    tel: site.contact.phone,
  },
  {
    title: "Bewerber:innen",
    body: "Offene Stellen, Initiativbewerbungen, Hospitationen.",
    action: { label: "Zum Karrierebereich", href: "/karriere" },
    contact: site.contact.email,
  },
  {
    title: "Eltern & Sorgeberechtigte",
    body: "Fragen zur Hilfe, zum Kontakt und zum Alltag in unseren Angeboten.",
    action: { label: "Angebote ansehen", href: "/angebote" },
    contact: site.contact.phoneDisplay,
    tel: site.contact.phone,
  },
];

export default function KontaktPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: "Start", path: "/" },
          { name: "Kontakt", path: "/kontakt" },
        ])}
      />

      <PageHero
        eyebrow="Kontakt"
        title="Kurze Wege, echte Menschen am Telefon."
        lead="Bei uns landen Sie nicht in einer Warteschleife und nicht in einem Sammelpostfach. Wählen Sie den Weg, der zu Ihrem Anliegen passt."
        crumbs={[
          { name: "Start", path: "/" },
          { name: "Kontakt", path: "/kontakt" },
        ]}
        actions={
          <>
            <ButtonLink
              href={`tel:${site.contact.phone.replace(/\s/g, "")}`}
              withArrow
            >
              {site.contact.phoneDisplay}
            </ButtonLink>
            <ButtonLink href={`mailto:${site.contact.email}`} variant="secondary">
              E-Mail schreiben
            </ButtonLink>
          </>
        }
        aside={
          <Card tone="soft">
            <h2 className="text-[0.78rem] font-semibold tracking-[0.14em] text-moss-600 uppercase">
              Verwaltung
            </h2>
            <address className="mt-5 space-y-4 text-[1rem] not-italic text-ink-700">
              <p>
                {site.office.street}
                <br />
                {site.office.postalCode} {site.office.city}
              </p>
              <p className="space-y-1">
                <a
                  href={`tel:${site.contact.phone.replace(/\s/g, "")}`}
                  className="block font-medium text-pine-800 transition-colors hover:text-moss-600"
                >
                  {site.contact.phoneDisplay}
                </a>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="block break-all text-pine-800 transition-colors hover:text-moss-600"
                >
                  {site.contact.email}
                </a>
                <span className="block text-[0.92rem] text-ink-500">
                  Fax {site.contact.faxDisplay}
                </span>
              </p>
            </address>
            <dl className="mt-6 space-y-3 border-t border-ink-100 pt-6 text-[0.92rem]">
              <div>
                <dt className="text-ink-400">Bürozeiten</dt>
                <dd className="mt-1 text-ink-700">{site.hours.office}</dd>
              </div>
              <div>
                <dt className="text-ink-400">Krisen & Notfälle</dt>
                <dd className="mt-1 text-ink-700">{site.hours.emergency}</dd>
              </div>
            </dl>
          </Card>
        }
      />

      {/* Kontaktwege */}
      <Section tone="soft">
        <Container width="wide">
          <Reveal>
            <SectionHeader
              eyebrow="Kontaktwege"
              title="Wer Sie am schnellsten weiterbringt."
            />
          </Reveal>

          <div className="mt-14 grid gap-6 lg:grid-cols-3">
            {wege.map((w, i) => (
              <Reveal key={w.title} delay={i * 80}>
                <Card className="flex h-full flex-col">
                  <h3 className="text-[1.25rem] font-semibold text-pine-900">
                    {w.title}
                  </h3>
                  <p className="prose-de mt-3 flex-1 text-[0.96rem] leading-relaxed text-ink-600">
                    {w.body}
                  </p>
                  <a
                    href={w.tel ? `tel:${w.tel.replace(/\s/g, "")}` : `mailto:${w.contact}`}
                    className="mt-6 block break-all text-[1.02rem] font-medium text-pine-800 transition-colors hover:text-moss-600"
                  >
                    {w.contact}
                  </a>
                  <ButtonLink
                    href={w.action.href}
                    variant="secondary"
                    className="mt-6 w-full"
                    withArrow
                  >
                    {w.action.label}
                  </ButtonLink>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Ansprechpartner:innen */}
      <Section>
        <Container width="wide">
          <Reveal>
            <SectionHeader
              eyebrow="Ansprechpartner:innen"
              title="Direktkontakte nach Zuständigkeit."
            />
          </Reveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {leadership.map((p, i) => (
              <Reveal key={p.slug} delay={i * 70}>
                <Card tone="soft" className="flex h-full flex-col !p-7">
                  <Portrait person={p} size={64} />
                  <h3 className="mt-5 text-[1.1rem] leading-tight font-semibold text-pine-900">
                    {p.name}
                  </h3>
                  <p className="mt-1.5 text-[0.9rem] text-moss-600">{p.role}</p>
                  <p className="mt-3 flex-1 text-[0.88rem] leading-relaxed text-ink-500">
                    {p.focus}
                  </p>
                  {p.phoneDisplay ? (
                    <a
                      href={`tel:${p.phone?.replace(/\s/g, "")}`}
                      className="mt-5 block font-medium text-pine-800 transition-colors hover:text-moss-600"
                    >
                      {p.phoneDisplay}
                    </a>
                  ) : (
                    <a
                      href={`mailto:${site.contact.email}`}
                      className="mt-5 block break-all text-[0.92rem] font-medium text-pine-800 transition-colors hover:text-moss-600"
                    >
                      {site.contact.email}
                    </a>
                  )}
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Anfahrt */}
      <Section tone="sage" size="compact">
        <Container width="wide">
          <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-5">
              <Reveal>
                <SectionHeader
                  eyebrow="Anfahrt"
                  title="So finden Sie uns."
                  lead={`Unsere Verwaltung liegt in ${site.office.city} im Kreis Steinfurt — gut erreichbar aus dem gesamten Münsterland und dem westlichen Niedersachsen.`}
                />
              </Reveal>
              <Reveal delay={120}>
                <div className="mt-10">
                  <ButtonLink
                    href={`https://www.openstreetmap.org/search?query=${encodeURIComponent(
                      `${site.office.street}, ${site.office.postalCode} ${site.office.city}`,
                    )}`}
                    variant="primary"
                    withArrow
                    target="_blank"
                    rel="noreferrer noopener"
                  >
                    Route planen
                  </ButtonLink>
                </div>
              </Reveal>
            </div>

            <Reveal delay={80} className="lg:col-span-7">
              {/* Statische Karte ohne externe Einbindung — kein Tracking, kein Consent nötig. */}
              <div className="overflow-hidden rounded-[var(--radius-xl3)] bg-white p-10 hairline">
                <svg
                  aria-hidden
                  viewBox="0 0 600 320"
                  className="h-auto w-full"
                  fill="none"
                >
                  {Array.from({ length: 7 }).map((_, i) => (
                    <path
                      key={`h${i}`}
                      d={`M0 ${40 + i * 45} H600`}
                      stroke="var(--color-mist-100)"
                      strokeWidth="1"
                    />
                  ))}
                  {Array.from({ length: 9 }).map((_, i) => (
                    <path
                      key={`v${i}`}
                      d={`M${30 + i * 70} 0 V320`}
                      stroke="var(--color-mist-100)"
                      strokeWidth="1"
                    />
                  ))}
                  <path
                    d="M0 200 C 120 190, 200 120, 320 140 S 500 90, 600 120"
                    stroke="var(--color-sage-300)"
                    strokeWidth="8"
                    strokeLinecap="round"
                  />
                  <path
                    d="M180 320 C 200 240, 260 200, 300 150"
                    stroke="var(--color-sage-200)"
                    strokeWidth="6"
                    strokeLinecap="round"
                  />
                  <circle cx="300" cy="150" r="26" fill="var(--color-sage-100)" />
                  <circle cx="300" cy="150" r="9" fill="var(--color-moss-600)" />
                  <text
                    x="300"
                    y="205"
                    textAnchor="middle"
                    className="fill-[var(--color-pine-800)] text-[15px] font-semibold"
                  >
                    {site.office.city}
                  </text>
                </svg>
                <p className="mt-6 text-[0.92rem] text-ink-500">
                  {site.office.street}, {site.office.postalCode} {site.office.city} ·
                  Parkplätze direkt am Haus
                </p>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Hinweis Angebotskontakte */}
      <Section size="compact">
        <Container width="wide">
          <Reveal>
            <div className="rounded-[var(--radius-xl4)] bg-mist-50 p-10 hairline sm:p-12">
              <h2 className="text-[1.5rem] font-semibold text-pine-900">
                Direkt zur Hilfeform
              </h2>
              <div className="mt-8 grid gap-6 sm:grid-cols-3">
                {angebote.map((a) => (
                  <div key={a.slug}>
                    <p className="text-[0.78rem] font-semibold tracking-[0.14em] text-moss-600 uppercase">
                      {a.title}
                    </p>
                    <p className="mt-3 font-medium text-pine-900">{a.contact.name}</p>
                    <a
                      href={`tel:${a.contact.phone.replace(/\s/g, "")}`}
                      className="mt-1 block text-ink-600 transition-colors hover:text-moss-600"
                    >
                      {a.contact.phoneDisplay}
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
