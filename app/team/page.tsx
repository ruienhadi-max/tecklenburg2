import { Container, Section, SectionHeader, ButtonLink, Card } from "@/components/ui";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { PhotoFrame } from "@/components/visuals";
import { JsonLd, breadcrumbLd } from "@/lib/jsonld";
import { leadership, teamComposition, site } from "@/content/site";
import { werte } from "@/content/konzept";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Team",
  description:
    "Das multiprofessionelle Team der Jugendhilfe Tecklenburg: Leitung, Bereichsleitungen und Fachkräfte aus Sozialpädagogik, Erziehung und Heilpädagogik — mit Supervision und verbindlicher Fortbildung.",
  path: "/team",
  keywords: ["Team Jugendhilfe Tecklenburg", "pädagogische Fachkräfte NRW"],
});

export default function TeamPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbLd([
          { name: "Start", path: "/" },
          { name: "Team", path: "/team" },
        ])}
      />

      <PageHero
        eyebrow="Team"
        title="Menschen, die bleiben."
        lead="Für junge Menschen mit Beziehungsabbrüchen ist Personalfluktuation kein Verwaltungsthema, sondern eine Wiederholung ihrer Erfahrung. Deshalb ist ein stabiles Team bei uns die erste fachliche Anforderung — an uns selbst."
        crumbs={[
          { name: "Start", path: "/" },
          { name: "Team", path: "/team" },
        ]}
        actions={
          <>
            <ButtonLink href="/karriere" withArrow>
              Teil des Teams werden
            </ButtonLink>
            <ButtonLink href="/kontakt" variant="secondary">
              Kontakt aufnehmen
            </ButtonLink>
          </>
        }
        aside={
          <PhotoFrame
            ratio="landscape"
            tone="sage"
            seed={7}
            caption="Bildplatz: Team im Gespräch — natürliche Situation, gedecktes Licht, keine gestellte Aufstellung."
            className="shadow-[var(--shadow-lift)]"
          />
        }
      />

      {/* Leitung */}
      <Section tone="soft">
        <Container width="wide">
          <Reveal>
            <SectionHeader
              eyebrow="Leitung & Koordination"
              title="Wer Verantwortung trägt."
              lead="Bei uns entscheiden die Menschen, die die jungen Menschen persönlich kennen. Das ist der Vorteil eines kleinen Trägers — und der Grund, warum wir klein bleiben."
            />
          </Reveal>

          <div className="mt-16 grid gap-6 md:grid-cols-2">
            {leadership.map((p, i) => (
              <Reveal key={p.slug} delay={i * 80}>
                <Card className="flex h-full flex-col">
                  <div className="flex items-start gap-5">
                    <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-mist-100 text-[1.05rem] font-semibold text-pine-700">
                      {p.initials}
                    </div>
                    <div>
                      <h3 className="text-[1.3rem] leading-tight font-semibold text-pine-900">
                        {p.name}
                      </h3>
                      <p className="mt-1.5 text-[0.95rem] text-moss-600">{p.role}</p>
                      <p className="mt-0.5 text-[0.88rem] text-ink-400">
                        {p.qualification}
                        {p.since ? ` · seit ${p.since}` : ""}
                      </p>
                    </div>
                  </div>

                  {p.quote ? (
                    <blockquote className="prose-de mt-7 border-l-2 border-sage-300 pl-5 text-[1rem] leading-relaxed text-ink-700">
                      „{p.quote}“
                    </blockquote>
                  ) : null}

                  <dl className="mt-7 flex-1 space-y-3 border-t border-ink-100 pt-6 text-[0.9rem]">
                    <div>
                      <dt className="text-ink-400">Schwerpunkte</dt>
                      <dd className="mt-1 text-ink-700">{p.focus}</dd>
                    </div>
                  </dl>

                  {p.phoneDisplay ? (
                    <a
                      href={`tel:${p.phone?.replace(/\s/g, "")}`}
                      className="mt-6 inline-block text-[1rem] font-medium text-pine-800 transition-colors hover:text-moss-600"
                    >
                      {p.phoneDisplay}
                    </a>
                  ) : null}
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Zusammensetzung */}
      <Section>
        <Container width="wide">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
            <Reveal className="lg:col-span-5">
              <SectionHeader
                eyebrow="Multiprofessionell"
                title="Verschiedene Blicke auf denselben Fall."
                lead="Ein pädagogisches Team, das nur aus einer Ausbildungsrichtung besteht, sieht immer dasselbe. Deshalb setzen wir bewusst auf unterschiedliche Fachlichkeiten — und auf externe Perspektiven von außen."
              />
            </Reveal>

            <div className="lg:col-span-7">
              <ul className="divide-y divide-ink-100 border-y border-ink-100">
                {teamComposition.map((t, i) => (
                  <Reveal key={t.label} delay={i * 55} as="li">
                    <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1 py-6">
                      <h3 className="text-[1.05rem] font-medium text-pine-900">
                        {t.label}
                      </h3>
                      <p className="text-[0.9rem] text-ink-500">{t.note}</p>
                    </div>
                  </Reveal>
                ))}
              </ul>
            </div>
          </div>
        </Container>
      </Section>

      {/* Werte im Team */}
      <Section tone="deep">
        <Container width="wide" className="relative">
          <Reveal>
            <SectionHeader
              tone="light"
              eyebrow="Gemeinsame Werte"
              title="Woran wir uns im Team orientieren."
              lead="Diese Werte gelten nicht nur gegenüber jungen Menschen. Sie gelten auch untereinander — sonst wären sie nicht glaubwürdig."
            />
          </Reveal>

          <div className="mt-16 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
            {werte.map((w, i) => (
              <Reveal key={w.label} delay={i * 60}>
                <div className="border-t border-white/12 pt-6">
                  <h3 className="text-[1.08rem] font-semibold text-white">{w.label}</h3>
                  <p className="prose-de mt-2.5 text-[0.95rem] leading-relaxed text-sage-100/75">
                    {w.note}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* CTA */}
      <Section tone="soft" size="compact">
        <Container width="wide">
          <Reveal>
            <div className="flex flex-col items-start justify-between gap-8 rounded-[var(--radius-xl4)] bg-white p-10 hairline lg:flex-row lg:items-center sm:p-12">
              <div>
                <h2 className="text-[1.7rem] leading-tight font-semibold text-pine-900">
                  Wir suchen Kolleg:innen, die bleiben wollen.
                </h2>
                <p className="prose-de mt-3 max-w-xl text-ink-600">
                  Wenn Sie Beziehungsarbeit ernst meinen und ein Team suchen, das Sie
                  trägt: Wir freuen uns auf Ihre Bewerbung — auch initiativ.
                </p>
              </div>
              <div className="flex flex-wrap gap-4">
                <ButtonLink href="/karriere#stellen" withArrow>
                  Offene Stellen
                </ButtonLink>
                <ButtonLink
                  href={`mailto:${site.contact.email}`}
                  variant="secondary"
                >
                  Initiativ bewerben
                </ButtonLink>
              </div>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
