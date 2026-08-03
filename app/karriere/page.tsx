import Link from "next/link";
import {
  Container,
  Section,
  SectionHeader,
  ButtonLink,
  Card,
  Tag,
  Arrow,
} from "@/components/ui";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { PhotoFrame } from "@/components/visuals";
import { JsonLd, breadcrumbLd, jobPostingLd } from "@/lib/jsonld";
import { jobs, benefits, arbeitsalltag, bewerbungsprozess } from "@/content/karriere";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Karriere",
  description:
    "Arbeiten in der Jugendhilfe im Kreis Steinfurt: offene Stellen für Sozialpädagog:innen, Erzieher:innen und pädagogische Fachkräfte. Vergütung nach VPK-NRW, Supervision als Arbeitszeit, kleine Teams.",
  path: "/karriere",
  keywords: [
    "Sozialpädagoge Jobs NRW",
    "Erzieher Stellenangebote Kreis Steinfurt",
    "pädagogische Fachkraft Jugendhilfe",
    "Arbeiten in der Jugendhilfe",
    "Sozialpädagoge Jugendhilfe Stellenangebote",
  ],
});

export default function KarrierePage() {
  return (
    <>
      <JsonLd
        data={[
          breadcrumbLd([
            { name: "Start", path: "/" },
            { name: "Karriere", path: "/karriere" },
          ]),
          ...jobs.map(jobPostingLd),
        ]}
      />

      <PageHero
        tone="deep"
        eyebrow="Karriere"
        title="Verändere Leben. Mit einem Team, das dich trägt."
        lead="Bei Jugendhilfe Tecklenburg arbeitest du nicht einfach in einer Einrichtung — du gestaltest Beziehungen, Entwicklung und Zukunft. Und du machst das nicht allein."
        crumbs={[
          { name: "Start", path: "/" },
          { name: "Karriere", path: "/karriere" },
        ]}
        actions={
          <>
            <ButtonLink href="#stellen" variant="onDark" withArrow>
              Offene Stellen
            </ButtonLink>
            <ButtonLink
              href={`mailto:${site.contact.email}?subject=Initiativbewerbung`}
              variant="onDarkGhost"
            >
              Jetzt bewerben
            </ButtonLink>
          </>
        }
        aside={
          <PhotoFrame
            ratio="landscape"
            tone="pine"
            seed={8}
            caption="Bildplatz: Kolleg:innen bei der Übergabe — echte Arbeitssituation, kein Gruppenfoto."
          />
        }
      />

      {/* Warum hier */}
      <Section>
        <Container width="wide">
          <Reveal>
            <SectionHeader
              eyebrow="Warum Jugendhilfe Tecklenburg"
              title="Sechs Gründe, die im Alltag tatsächlich einen Unterschied machen."
              lead="Wir listen hier keine Obstkörbe. Was folgt, sind die Punkte, die in der stationären Jugendhilfe darüber entscheiden, ob man den Beruf lange und gern macht."
            />
          </Reveal>

          <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {benefits.map((b, i) => (
              <Reveal key={b.title} delay={i * 65}>
                <Card tone="soft" className="h-full">
                  <h3 className="text-[1.12rem] font-semibold text-pine-900">
                    {b.title}
                  </h3>
                  <p className="prose-de mt-3 text-[0.97rem] leading-relaxed text-ink-600">
                    {b.body}
                  </p>
                </Card>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Arbeitsalltag */}
      <Section tone="soft">
        <Container width="wide">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-5">
              <Reveal>
                <SectionHeader
                  eyebrow="Arbeitsalltag"
                  title="Wie ein Dienst wirklich aussieht."
                  lead="Damit Sie wissen, worauf Sie sich einlassen — und wir wissen, dass Sie es wissen. Das erspart beiden Seiten eine Enttäuschung nach drei Monaten."
                />
              </Reveal>
              <Reveal delay={140}>
                <PhotoFrame
                  ratio="landscape"
                  tone="mist"
                  seed={9}
                  caption="Bildplatz: Küche am Abend — gemeinsames Kochen als typische Alltagssituation."
                  className="mt-12 hidden lg:block"
                />
              </Reveal>
            </div>

            <div className="lg:col-span-7">
              <ol className="space-y-4">
                {arbeitsalltag.map((a, i) => (
                  <Reveal key={a.time} delay={i * 70} as="li">
                    <div className="grid gap-4 rounded-[var(--radius-xl3)] bg-white p-8 hairline sm:grid-cols-[7.5rem_1fr] sm:gap-8">
                      <span className="text-[0.82rem] font-semibold tracking-[0.12em] text-moss-600 uppercase">
                        {a.time}
                      </span>
                      <div>
                        <h3 className="text-[1.15rem] font-semibold text-pine-900">
                          {a.title}
                        </h3>
                        <p className="prose-de mt-2.5 leading-relaxed text-ink-600">
                          {a.body}
                        </p>
                      </div>
                    </div>
                  </Reveal>
                ))}
              </ol>

              <Reveal delay={280}>
                <div className="mt-8 rounded-[var(--radius-xl3)] border-l-2 border-moss-500 bg-white p-8">
                  <h3 className="text-[1.05rem] font-semibold text-pine-900">
                    Ehrlich gesagt
                  </h3>
                  <p className="prose-de mt-3 leading-relaxed text-ink-600">
                    Es gibt Tage, an denen nichts gelingt. Es gibt Eskalationen, Rückfälle
                    und Abschiede, die wehtun. Wir versprechen nicht, dass das ausbleibt —
                    wir versprechen, dass Sie damit nicht allein bleiben. Dafür gibt es
                    Supervision, Fallberatung und eine Leitung, die auch nachts rangeht.
                  </p>
                </div>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* Offene Stellen */}
      <Section id="stellen">
        <Container width="wide">
          <Reveal>
            <SectionHeader
              eyebrow="Offene Stellen"
              title="Aktuell suchen wir Verstärkung."
              lead="Sie finden nicht das Passende? Initiativbewerbungen sind bei uns ausdrücklich erwünscht — wir schauen ernsthaft, ob sich etwas einrichten lässt."
            />
          </Reveal>

          <div className="mt-14 space-y-5">
            {jobs.map((job, i) => (
              <Reveal key={job.slug} delay={i * 80}>
                <Link
                  href={`/karriere/${job.slug}`}
                  className="group block rounded-[var(--radius-xl3)] bg-mist-50 p-8 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hairline hover:-translate-y-1 hover:bg-white hover:shadow-[var(--shadow-lift)] sm:p-10"
                >
                  <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
                    <div className="max-w-2xl">
                      <div className="flex flex-wrap gap-2">
                        <Tag>{job.area}</Tag>
                        <Tag>{job.employmentTypeLabel}</Tag>
                        <Tag>{job.location}</Tag>
                      </div>
                      <h3 className="mt-5 text-[1.5rem] leading-tight font-semibold text-pine-900 sm:text-[1.75rem]">
                        {job.title}
                      </h3>
                      <p className="prose-de mt-3 leading-relaxed text-ink-600">
                        {job.summary}
                      </p>
                    </div>
                    <span className="inline-flex shrink-0 items-center gap-2 rounded-full bg-pine-800 px-6 py-3 text-[0.92rem] font-medium text-white transition-colors group-hover:bg-pine-700">
                      Stelle ansehen
                      <Arrow />
                    </span>
                  </div>
                </Link>
              </Reveal>
            ))}
          </div>
        </Container>
      </Section>

      {/* Bewerbungsprozess */}
      <Section tone="deep">
        <Container width="wide" className="relative">
          <Reveal>
            <SectionHeader
              tone="light"
              eyebrow="Bewerbungsprozess"
              title="Vier Schritte. Kein Assessment-Center."
              lead="Wir wollen wissen, wie Sie denken und wie Sie mit jungen Menschen umgehen. Dafür braucht es keine Testverfahren, sondern ein Gespräch und einen echten Dienst."
            />
          </Reveal>

          <ol className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {bewerbungsprozess.map((s, i) => (
              <Reveal key={s.step} delay={i * 80} as="li">
                <div className="h-full rounded-[var(--radius-xl3)] bg-white/[0.06] p-8 hairline-invert">
                  <span className="text-[0.85rem] font-semibold text-sage-300 tabular-nums">
                    {s.step}
                  </span>
                  <h3 className="mt-4 text-[1.2rem] font-semibold text-white">
                    {s.title}
                  </h3>
                  <p className="prose-de mt-3 text-[0.95rem] leading-relaxed text-sage-100/75">
                    {s.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>

          <Reveal delay={200}>
            <div className="mt-14 flex flex-wrap items-center gap-4">
              <ButtonLink
                href={`mailto:${site.contact.email}?subject=Bewerbung`}
                variant="onDark"
                withArrow
              >
                Jetzt bewerben
              </ButtonLink>
              <ButtonLink href="/kontakt" variant="onDarkGhost">
                Erst einmal Fragen stellen
              </ButtonLink>
            </div>
          </Reveal>
        </Container>
      </Section>
    </>
  );
}
