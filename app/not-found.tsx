import { Container, ButtonLink } from "@/components/ui";
import { ContourField } from "@/components/visuals";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden bg-paper py-28 sm:py-36">
      <ContourField className="inset-0 h-full w-full" />
      <Container width="narrow" className="relative text-center">
        <p className="text-[0.78rem] font-semibold tracking-[0.16em] text-moss-600 uppercase">
          Seite nicht gefunden
        </p>
        <h1 className="mt-6 text-[2.4rem] leading-tight font-semibold text-pine-950 sm:text-[3.2rem]">
          Hier geht es leider nicht weiter.
        </h1>
        <p className="prose-de mx-auto mt-6 max-w-xl text-lg leading-relaxed text-ink-600">
          Die aufgerufene Seite existiert nicht oder wurde verschoben. Über die
          folgenden Wege finden Sie schnell wieder zum Ziel.
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-4">
          <ButtonLink href="/" withArrow>
            Zur Startseite
          </ButtonLink>
          <ButtonLink href="/angebote" variant="secondary">
            Angebote ansehen
          </ButtonLink>
          <ButtonLink href="/kontakt" variant="ghost">
            Kontakt
          </ButtonLink>
        </div>
      </Container>
    </section>
  );
}
