import { Container, Section } from "@/components/ui";
import { PageHero } from "@/components/page-hero";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = {
  ...pageMetadata({
    title: "Impressum",
    description: "Impressum und Anbieterkennzeichnung der Jugendhilfe Tecklenburg.",
    path: "/impressum",
  }),
  robots: { index: true, follow: false },
};

const blocks = [
  {
    title: "Angaben gemäß § 5 DDG",
    lines: [
      site.legalName,
      site.legalAddress.street,
      `${site.legalAddress.postalCode} ${site.legalAddress.city}`,
    ],
  },
  {
    title: "Vertreten durch",
    lines: [`${site.legal.managingDirector}, Geschäftsführer`, `${site.legal.deputy}, Einrichtungsleitung und stellvertretende Geschäftsführung`],
  },
  {
    title: "Kontakt",
    lines: [
      `Telefon: ${site.contact.phoneDisplay}`,
      `Mobil: ${site.contact.mobileDisplay}`,
      `Fax: ${site.contact.faxDisplay}`,
      `E-Mail: ${site.contact.email}`,
    ],
  },
  {
    title: "Aufsichtsbehörde",
    lines: [site.supervisoryAuthority],
  },
  {
    title: "Berufshaftpflichtversicherung",
    lines: [site.legal.liabilityInsurer, "Räumlicher Geltungsbereich: Deutschland"],
  },
  {
    title: "Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV",
    lines: [
      site.legal.managingDirector,
      site.legalAddress.street,
      `${site.legalAddress.postalCode} ${site.legalAddress.city}`,
    ],
  },
];

export default function ImpressumPage() {
  return (
    <>
      <PageHero
        eyebrow="Rechtliches"
        title="Impressum"
        crumbs={[
          { name: "Start", path: "/" },
          { name: "Impressum", path: "/impressum" },
        ]}
      />

      <Section tone="soft" size="compact">
        <Container width="narrow">
          <div className="space-y-10">
            {blocks.map((b) => (
              <section key={b.title}>
                <h2 className="text-[1.15rem] font-semibold text-pine-900">
                  {b.title}
                </h2>
                <div className="mt-3 space-y-1 text-[1rem] leading-relaxed text-ink-600">
                  {b.lines.map((l) => (
                    <p key={l}>{l}</p>
                  ))}
                </div>
              </section>
            ))}

            <section>
              <h2 className="text-[1.15rem] font-semibold text-pine-900">
                Streitschlichtung
              </h2>
              <p className="prose-de mt-3 leading-relaxed text-ink-600">
                Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren
                vor einer Verbraucherschlichtungsstelle teilzunehmen.
              </p>
            </section>

            <section>
              <h2 className="text-[1.15rem] font-semibold text-pine-900">
                Haftung für Inhalte und Links
              </h2>
              <p className="prose-de mt-3 leading-relaxed text-ink-600">
                Als Diensteanbieter sind wir für eigene Inhalte auf diesen Seiten nach den
                allgemeinen Gesetzen verantwortlich. Für Inhalte externer Links ist stets
                der jeweilige Anbieter der verlinkten Seiten verantwortlich. Zum Zeitpunkt
                der Verlinkung waren keine rechtswidrigen Inhalte erkennbar. Bei Bekanntwerden
                von Rechtsverletzungen entfernen wir entsprechende Links umgehend.
              </p>
            </section>

            <section>
              <h2 className="text-[1.15rem] font-semibold text-pine-900">
                Urheberrecht
              </h2>
              <p className="prose-de mt-3 leading-relaxed text-ink-600">
                Die durch die Betreiber erstellten Inhalte und Werke auf diesen Seiten
                unterliegen dem deutschen Urheberrecht. Beiträge Dritter sind als solche
                gekennzeichnet.
              </p>
            </section>
          </div>
        </Container>
      </Section>
    </>
  );
}
