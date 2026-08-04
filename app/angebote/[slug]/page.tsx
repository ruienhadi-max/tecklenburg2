import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Container,
  Section,
  SectionHeader,
  ButtonLink,
  Card,
  CheckList,
  Tag,
  Arrow,
} from "@/components/ui";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { PhotoFrame } from "@/components/visuals";
import { Weltkugel } from "@/components/weltkugel";
import { JsonLd, breadcrumbLd, serviceLd } from "@/lib/jsonld";
import { angebote, getAngebot } from "@/content/angebote";
import { standorte } from "@/content/globus";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return angebote.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const angebot = getAngebot(slug);
  if (!angebot) return {};

  return pageMetadata({
    title: angebot.title,
    // Auf Suchergebnis-Länge getrimmt: Kurzbeschreibung plus Ort.
    description: `${angebot.summary.slice(0, 125).trim()} — Jugendhilfe Tecklenburg, Kreis Steinfurt.`,
    path: `/angebote/${angebot.slug}`,
    keywords: [angebot.title, "Jugendhilfe NRW", ...angebot.legal],
    type: "article",
  });
}

export default async function AngebotPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const angebot = getAngebot(slug);
  if (!angebot) notFound();

  const weitere = angebote.filter((a) => a.slug !== angebot.slug);

  const facts = [
    { label: "Zielgruppe", value: angebot.targetGroup },
    { label: "Alter", value: angebot.age },
    { label: "Setting", value: angebot.setting },
    { label: "Betreuungsform", value: angebot.capacity },
    { label: "Pädagogischer Ansatz", value: angebot.approach },
  ];

  return (
    <>
      <JsonLd
        data={[
          serviceLd(angebot),
          breadcrumbLd([
            { name: "Start", path: "/" },
            { name: "Angebote", path: "/angebote" },
            { name: angebot.title, path: `/angebote/${angebot.slug}` },
          ]),
        ]}
      />

      <PageHero
        eyebrow={angebot.kicker}
        title={angebot.title}
        lead={angebot.summary}
        crumbs={[
          { name: "Start", path: "/" },
          { name: "Angebote", path: "/angebote" },
          { name: angebot.title, path: `/angebote/${angebot.slug}` },
        ]}
        actions={
          <>
            <ButtonLink
              href={`/fallanfrage?angebot=${angebot.slug}`}
              withArrow
            >
              Platzanfrage zu dieser Hilfe
            </ButtonLink>
            <ButtonLink
              href={`tel:${angebot.contact.phone.replace(/\s/g, "")}`}
              variant="secondary"
            >
              {angebot.contact.phoneDisplay}
            </ButtonLink>
          </>
        }
        aside={
          <div className="rounded-[var(--radius-xl3)] bg-mist-50 p-8 hairline">
            <h2 className="text-[0.78rem] font-semibold tracking-[0.14em] text-moss-600 uppercase">
              Auf einen Blick
            </h2>
            <dl className="mt-6 space-y-5">
              {facts.slice(1).map((f) => (
                <div key={f.label}>
                  <dt className="text-[0.82rem] text-ink-400">{f.label}</dt>
                  <dd className="prose-de mt-1 text-[0.95rem] leading-relaxed text-ink-800">
                    {f.value}
                  </dd>
                </div>
              ))}
              <div>
                <dt className="text-[0.82rem] text-ink-400">Rechtsgrundlagen</dt>
                <dd className="mt-2.5 flex flex-wrap gap-1.5">
                  {angebot.legal.map((l) => (
                    <Tag key={l}>{l}</Tag>
                  ))}
                </dd>
              </div>
            </dl>
          </div>
        }
      />

      {/* Fließtext */}
      <Section tone="soft">
        <Container width="wide">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-7">
              <Reveal>
                <SectionHeader eyebrow="Die Hilfe im Detail" title="Was wir hier tun." />
              </Reveal>
              <div className="mt-10 space-y-6">
                {angebot.body.map((p, i) => (
                  <Reveal key={i} delay={i * 70}>
                    <p className="prose-de text-[1.08rem] leading-relaxed text-ink-700">
                      {p}
                    </p>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={200}>
                <div className="mt-12 rounded-[var(--radius-xl2)] border-l-2 border-moss-500 bg-white p-7">
                  <p className="text-[0.78rem] font-semibold tracking-[0.14em] text-moss-600 uppercase">
                    Zielgruppe
                  </p>
                  <p className="prose-de mt-3 text-[1.02rem] leading-relaxed text-ink-700">
                    {angebot.targetGroup}
                  </p>
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-5">
              <Reveal delay={120}>
                <PhotoFrame
                  ratio="portrait"
                  tone={angebot.accent === "pine" ? "pine" : "sage"}
                  seed={angebot.slug.length % 5}
                  caption={`Bildplatz: Situation aus dem Bereich ${angebot.title} — dokumentarisch, ohne erkennbare Gesichter junger Menschen.`}
                  className="shadow-[var(--shadow-lift)]"
                />
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* Standorte — nur dort, wo es sie gibt. */}
      {angebot.slug === "individualpaedagogik" ? (
        <Section tone="deep">
          <Container width="wide" className="relative">
            <div className="grid items-center gap-14 lg:grid-cols-12 lg:gap-20">
              <div className="lg:col-span-6">
                <Reveal>
                  <SectionHeader
                    tone="light"
                    eyebrow="Standorte"
                    title="Ein Ort, der Abstand schafft."
                    lead="Unsere individualpädagogischen Maßnahmen finden an festen Standorten im europäischen Ausland und in Namibia statt. Jeder wird vor der Belegung geprüft und mindestens monatlich persönlich besucht."
                  />
                </Reveal>
                <Reveal delay={120}>
                  <ul className="mt-10 flex flex-wrap gap-2.5">
                    {standorte.map((s) => (
                      <li key={s.name}>
                        <Tag tone="light">{s.name}</Tag>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>

              <Reveal delay={100} className="lg:col-span-6">
                <div className="flex justify-center">
                  <Weltkugel size={380} />
                </div>
              </Reveal>
            </div>
          </Container>
        </Section>
      ) : null}

      {/* Alltag & Jugendamt-Perspektive */}
      <Section>
        <Container width="wide">
          <div className="grid gap-8 lg:grid-cols-2">
            <Reveal>
              <Card className="h-full">
                <h2 className="text-[1.5rem] font-semibold text-pine-900">
                  Was junge Menschen hier erleben
                </h2>
                <CheckList items={angebot.everyday} className="mt-7" />
              </Card>
            </Reveal>

            <Reveal delay={100}>
              <Card tone="soft" className="h-full">
                <h2 className="text-[1.5rem] font-semibold text-pine-900">
                  Was Sie als Jugendamt bekommen
                </h2>
                <CheckList items={angebot.forAuthority} className="mt-7" />
              </Card>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Ansprechperson */}
      <Section tone="deep" size="compact">
        <Container width="wide" className="relative">
          <div className="flex flex-col items-start justify-between gap-10 lg:flex-row lg:items-center">
            <Reveal>
              <div>
                <p className="text-[0.78rem] font-semibold tracking-[0.14em] text-sage-300 uppercase">
                  Ihre Ansprechperson für {angebot.title}
                </p>
                <p className="mt-4 text-[1.9rem] leading-tight font-semibold text-white">
                  {angebot.contact.name}
                </p>
                <p className="mt-1 text-sage-200/75">{angebot.contact.role}</p>
              </div>
            </Reveal>
            <Reveal delay={100}>
              <div className="flex flex-wrap gap-4">
                <ButtonLink
                  href={`tel:${angebot.contact.phone.replace(/\s/g, "")}`}
                  variant="onDark"
                >
                  {angebot.contact.phoneDisplay}
                </ButtonLink>
                <ButtonLink
                  href={`/fallanfrage?angebot=${angebot.slug}`}
                  variant="onDarkGhost"
                  withArrow
                >
                  Fallanfrage stellen
                </ButtonLink>
              </div>
            </Reveal>
          </div>
        </Container>
      </Section>

      {/* Weitere Hilfen */}
      <Section size="compact">
        <Container width="wide">
          <Reveal>
            <h2 className="text-[1.6rem] font-semibold text-pine-900">Weitere Hilfen</h2>
          </Reveal>
          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {weitere.map((a, i) => (
              <Reveal key={a.slug} delay={i * 80}>
                <Link
                  href={`/angebote/${a.slug}`}
                  className="group flex h-full flex-col rounded-[var(--radius-xl3)] bg-mist-50 p-8 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hairline hover:-translate-y-1 hover:bg-white hover:shadow-[var(--shadow-lift)]"
                >
                  <p className="text-[0.78rem] font-semibold tracking-[0.14em] text-moss-600 uppercase">
                    {a.kicker}
                  </p>
                  <h3 className="mt-3 text-[1.35rem] font-semibold text-pine-900">
                    {a.title}
                  </h3>
                  <p className="prose-de mt-3 flex-1 text-[0.96rem] leading-relaxed text-ink-600">
                    {a.summary}
                  </p>
                  <span className="mt-6 inline-flex items-center gap-2 text-[0.92rem] font-medium text-pine-800">
                    Ansehen
                    <Arrow />
                  </span>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
