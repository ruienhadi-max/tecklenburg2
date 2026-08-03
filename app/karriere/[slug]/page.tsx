import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Container,
  Section,
  ButtonLink,
  Card,
  CheckList,
  Tag,
  Arrow,
} from "@/components/ui";
import { PageHero } from "@/components/page-hero";
import { Reveal } from "@/components/reveal";
import { JsonLd, breadcrumbLd, jobPostingLd } from "@/lib/jsonld";
import { jobs, getJob, bewerbungsprozess } from "@/content/karriere";
import { site, leadership } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return jobs.map((j) => ({ slug: j.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const job = getJob(slug);
  if (!job) return {};

  return pageMetadata({
    title: job.title,
    description: `${job.summary} ${job.employmentTypeLabel}, ${job.location}. Vergütung nach VPK-NRW-Tarif bei der Jugendhilfe Tecklenburg.`,
    path: `/karriere/${job.slug}`,
    keywords: [job.title, "Stellenangebot Jugendhilfe NRW", job.area],
    type: "article",
  });
}

export default async function JobPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const job = getJob(slug);
  if (!job) notFound();

  const kontakt =
    leadership.find((p) => p.name === job.contactPerson) ?? leadership[1];
  const weitere = jobs.filter((j) => j.slug !== job.slug);
  const mailto = `mailto:${site.contact.email}?subject=${encodeURIComponent(`Bewerbung: ${job.title}`)}`;

  return (
    <>
      <JsonLd
        data={[
          jobPostingLd(job),
          breadcrumbLd([
            { name: "Start", path: "/" },
            { name: "Karriere", path: "/karriere" },
            { name: job.title, path: `/karriere/${job.slug}` },
          ]),
        ]}
      />

      <PageHero
        eyebrow="Offene Stelle"
        title={job.title}
        lead={job.summary}
        crumbs={[
          { name: "Start", path: "/" },
          { name: "Karriere", path: "/karriere" },
          { name: job.area, path: `/karriere/${job.slug}` },
        ]}
        actions={
          <>
            <ButtonLink href={mailto} withArrow>
              Jetzt bewerben
            </ButtonLink>
            <ButtonLink href="/karriere#stellen" variant="secondary">
              Alle Stellen
            </ButtonLink>
          </>
        }
        aside={
          <div className="rounded-[var(--radius-xl3)] bg-mist-50 p-8 hairline">
            <h2 className="text-[0.78rem] font-semibold tracking-[0.14em] text-moss-600 uppercase">
              Eckdaten
            </h2>
            <dl className="mt-6 space-y-5 text-[0.95rem]">
              <div>
                <dt className="text-[0.82rem] text-ink-400">Bereich</dt>
                <dd className="mt-1 text-ink-800">{job.area}</dd>
              </div>
              <div>
                <dt className="text-[0.82rem] text-ink-400">Umfang</dt>
                <dd className="mt-1 text-ink-800">{job.employmentTypeLabel}</dd>
              </div>
              <div>
                <dt className="text-[0.82rem] text-ink-400">Einsatzort</dt>
                <dd className="mt-1 text-ink-800">{job.location}</dd>
              </div>
              <div>
                <dt className="text-[0.82rem] text-ink-400">Vergütung</dt>
                <dd className="mt-1 text-ink-800">
                  VPK-NRW-Tarif, je nach Qualifikation
                </dd>
              </div>
              <div>
                <dt className="text-[0.82rem] text-ink-400">Ansprechperson</dt>
                <dd className="mt-1 text-ink-800">{kontakt.name}</dd>
              </div>
            </dl>
            <ButtonLink href={mailto} className="mt-8 w-full" withArrow>
              Bewerbung senden
            </ButtonLink>
          </div>
        }
      />

      <Section tone="soft">
        <Container width="wide">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-20">
            <div className="lg:col-span-7">
              <div className="space-y-6">
                {job.intro.map((p, i) => (
                  <Reveal key={i} delay={i * 70}>
                    <p className="prose-de text-[1.08rem] leading-relaxed text-ink-700">
                      {p}
                    </p>
                  </Reveal>
                ))}
              </div>

              <Reveal delay={140}>
                <div className="mt-14">
                  <h2 className="text-[1.5rem] font-semibold text-pine-900">
                    Ihre Aufgaben
                  </h2>
                  <CheckList items={job.tasks} className="mt-6" />
                </div>
              </Reveal>

              <Reveal delay={180}>
                <div className="mt-14">
                  <h2 className="text-[1.5rem] font-semibold text-pine-900">
                    Was Sie mitbringen
                  </h2>
                  <CheckList items={job.profile} className="mt-6" />
                </div>
              </Reveal>
            </div>

            <div className="lg:col-span-5">
              <Reveal delay={100}>
                <Card className="sticky top-28">
                  <h2 className="text-[1.5rem] font-semibold text-pine-900">
                    Was wir bieten
                  </h2>
                  <CheckList items={job.offer} className="mt-6" />

                  <div className="mt-8 border-t border-ink-100 pt-7">
                    <p className="text-[0.88rem] text-ink-500">Fragen vorab?</p>
                    <p className="mt-2 text-[1.05rem] font-medium text-pine-900">
                      {kontakt.name}
                    </p>
                    <p className="text-[0.9rem] text-ink-500">{kontakt.role}</p>
                    <a
                      href={`tel:${(kontakt.phone ?? site.contact.phone).replace(/\s/g, "")}`}
                      className="mt-3 inline-block font-medium text-pine-800 transition-colors hover:text-moss-600"
                    >
                      {kontakt.phoneDisplay ?? site.contact.phoneDisplay}
                    </a>
                  </div>

                  <ButtonLink href={mailto} className="mt-8 w-full" withArrow>
                    Jetzt bewerben
                  </ButtonLink>
                </Card>
              </Reveal>
            </div>
          </div>
        </Container>
      </Section>

      {/* Ablauf */}
      <Section size="compact">
        <Container width="wide">
          <Reveal>
            <h2 className="text-[1.7rem] font-semibold text-pine-900">
              So läuft die Bewerbung ab
            </h2>
          </Reveal>
          <ol className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {bewerbungsprozess.map((s, i) => (
              <Reveal key={s.step} delay={i * 70} as="li">
                <div className="h-full rounded-[var(--radius-xl3)] bg-mist-50 p-7 hairline">
                  <span className="text-[0.85rem] font-semibold text-moss-500 tabular-nums">
                    {s.step}
                  </span>
                  <h3 className="mt-3 text-[1.1rem] font-semibold text-pine-900">
                    {s.title}
                  </h3>
                  <p className="prose-de mt-2.5 text-[0.93rem] leading-relaxed text-ink-600">
                    {s.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </ol>
        </Container>
      </Section>

      {/* Weitere Stellen */}
      {weitere.length ? (
        <Section tone="soft" size="compact">
          <Container width="wide">
            <Reveal>
              <h2 className="text-[1.6rem] font-semibold text-pine-900">
                Weitere offene Stellen
              </h2>
            </Reveal>
            <div className="mt-8 grid gap-6 sm:grid-cols-2">
              {weitere.map((j, i) => (
                <Reveal key={j.slug} delay={i * 80}>
                  <Link
                    href={`/karriere/${j.slug}`}
                    className="group flex h-full flex-col rounded-[var(--radius-xl3)] bg-white p-8 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hairline hover:-translate-y-1 hover:shadow-[var(--shadow-lift)]"
                  >
                    <div className="flex flex-wrap gap-2">
                      <Tag>{j.area}</Tag>
                      <Tag>{j.location}</Tag>
                    </div>
                    <h3 className="mt-4 text-[1.25rem] leading-tight font-semibold text-pine-900">
                      {j.title}
                    </h3>
                    <p className="prose-de mt-3 flex-1 text-[0.95rem] leading-relaxed text-ink-600">
                      {j.summary}
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
      ) : null}
    </>
  );
}
