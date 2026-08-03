import Link from "next/link";
import { Container, Arrow } from "./ui";
import { Logo } from "./brand";
import { site } from "@/content/site";
import { mainNav, legalNav } from "@/lib/nav";
import { angebote } from "@/content/angebote";
import { ContourField } from "./visuals";

export function SiteFooter() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative overflow-hidden bg-pine-950 text-sage-200">
      <ContourField className="inset-0 h-full w-full opacity-60" tone="dark" />

      <Container width="wide" className="relative">
        {/* Abschluss-CTA — die letzte Chance auf beide Zielgruppen. */}
        <div className="grid gap-10 border-b border-white/10 py-16 lg:grid-cols-2 lg:gap-16 lg:py-20">
          <div>
            <h2 className="text-[1.8rem] leading-tight font-semibold text-white sm:text-[2.2rem]">
              Sie haben einen Fall,
              <br />
              für den es schnell gehen muss?
            </h2>
            <p className="prose-de mt-4 max-w-md text-sage-200/75">
              Schildern Sie uns die Situation. Sie erhalten werktags innerhalb von 48
              Stunden eine belastbare Rückmeldung — Zusage, Absage oder Alternative.
            </p>
            <Link
              href="/fallanfrage"
              className="group mt-7 inline-flex items-center gap-2.5 rounded-full bg-white px-7 py-3.5 font-medium text-pine-900 transition-colors hover:bg-sage-100"
            >
              Fallanfrage stellen
              <Arrow />
            </Link>
          </div>

          <div className="lg:border-l lg:border-white/10 lg:pl-16">
            <h2 className="text-[1.8rem] leading-tight font-semibold text-white sm:text-[2.2rem]">
              Sie suchen Arbeit,
              <br />
              die etwas verändert?
            </h2>
            <p className="prose-de mt-4 max-w-md text-sage-200/75">
              Kleine Teams, verlässliche Strukturen, Supervision als Arbeitszeit. Sehen
              Sie sich an, wie der Alltag bei uns wirklich aussieht.
            </p>
            <Link
              href="/karriere"
              className="group mt-7 inline-flex items-center gap-2.5 rounded-full px-7 py-3.5 font-medium text-white transition-colors hairline-invert hover:bg-white/10"
            >
              Zum Karrierebereich
              <Arrow />
            </Link>
          </div>
        </div>

        {/* Informationsebene */}
        <div className="grid gap-12 py-14 sm:grid-cols-2 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <Logo tone="light" className="w-[152px]" />
            <p className="prose-de mt-5 max-w-xs text-[0.92rem] leading-relaxed text-sage-200/70">
              Träger der stationären Kinder- und Jugendhilfe im Kreis Steinfurt. Seit{" "}
              {site.founded} an der Seite junger Menschen — mit Haltung, Fachlichkeit
              und Verlässlichkeit.
            </p>
            <p className="mt-6 text-[0.8rem] tracking-[0.14em] text-sage-300/60 uppercase">
              {site.claim}
            </p>
          </div>

          <nav aria-label="Footer — Bereiche" className="lg:col-span-3">
            <h3 className="text-[0.78rem] font-semibold tracking-[0.16em] text-sage-300/70 uppercase">
              Bereiche
            </h3>
            <ul className="mt-5 space-y-3">
              {mainNav.slice(1).map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-[0.94rem] text-sage-200/80 transition-colors hover:text-white"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <nav aria-label="Footer — Angebote" className="lg:col-span-2">
            <h3 className="text-[0.78rem] font-semibold tracking-[0.16em] text-sage-300/70 uppercase">
              Angebote
            </h3>
            <ul className="mt-5 space-y-3">
              {angebote.map((a) => (
                <li key={a.slug}>
                  <Link
                    href={`/angebote/${a.slug}`}
                    className="text-[0.94rem] text-sage-200/80 transition-colors hover:text-white"
                  >
                    {a.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link
                  href="/fallanfrage"
                  className="text-[0.94rem] text-sage-200/80 transition-colors hover:text-white"
                >
                  Fallanfrage
                </Link>
              </li>
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <h3 className="text-[0.78rem] font-semibold tracking-[0.16em] text-sage-300/70 uppercase">
              Kontakt
            </h3>
            <address className="mt-5 space-y-3 text-[0.94rem] not-italic text-sage-200/80">
              <p>
                {site.office.street}
                <br />
                {site.office.postalCode} {site.office.city}
              </p>
              <p className="space-y-1">
                <a
                  href={`tel:${site.contact.phone.replace(/\s/g, "")}`}
                  className="block transition-colors hover:text-white"
                >
                  {site.contact.phoneDisplay}
                </a>
                <a
                  href={`mailto:${site.contact.email}`}
                  className="block break-all transition-colors hover:text-white"
                >
                  {site.contact.email}
                </a>
              </p>
              <p className="text-sage-200/60">{site.hours.office}</p>
            </address>
          </div>
        </div>

        <div className="flex flex-col gap-5 border-t border-white/10 py-8 text-[0.85rem] text-sage-200/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {site.legalName}. Aufsichtsbehörde: {site.supervisoryAuthority}.
          </p>
          <ul className="flex flex-wrap gap-6">
            {legalNav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="transition-colors hover:text-white">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  );
}
