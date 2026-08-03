import { Container, Section } from "@/components/ui";
import { PageHero } from "@/components/page-hero";
import { site } from "@/content/site";
import { pageMetadata } from "@/lib/seo";

export const metadata = {
  ...pageMetadata({
    title: "Datenschutzerklärung",
    description:
      "Informationen zur Verarbeitung personenbezogener Daten auf der Website der Jugendhilfe Tecklenburg nach Art. 13 DSGVO.",
    path: "/datenschutz",
  }),
  robots: { index: true, follow: false },
};

/**
 * Diese Erklärung bildet den tatsächlichen Stand dieser Website ab:
 * keine Cookies, keine Analyse-Tools, keine externen Einbindungen.
 * Wird ein solcher Dienst später ergänzt, muss dieser Text erweitert werden.
 */
const sections = [
  {
    title: "1. Verantwortlicher",
    paragraphs: [
      `Verantwortlich für die Datenverarbeitung auf dieser Website ist ${site.legalName}, ${site.legalAddress.street}, ${site.legalAddress.postalCode} ${site.legalAddress.city}, vertreten durch ${site.legal.managingDirector}.`,
      `Sie erreichen uns telefonisch unter ${site.contact.phoneDisplay} und per E-Mail unter ${site.contact.email}.`,
    ],
  },
  {
    title: "2. Grundsatz der Datensparsamkeit",
    paragraphs: [
      "Diese Website setzt keine Cookies, bindet keine externen Schriftarten, Karten, Videos oder Social-Media-Dienste ein und verwendet keine Analyse- oder Tracking-Werkzeuge. Es findet kein Profiling und keine automatisierte Entscheidungsfindung statt.",
    ],
  },
  {
    title: "3. Server-Logdateien",
    paragraphs: [
      "Beim Aufruf dieser Website verarbeitet der Hosting-Dienstleister automatisch übermittelte Informationen in sogenannten Server-Logfiles: aufgerufene Seite, Zeitpunkt des Zugriffs, übertragene Datenmenge, Referrer, Browsertyp und -version, Betriebssystem sowie die IP-Adresse in gekürzter Form.",
      "Rechtsgrundlage ist Art. 6 Abs. 1 lit. f DSGVO. Unser berechtigtes Interesse liegt im technisch fehlerfreien Betrieb und in der Sicherheit der Website. Die Daten werden nicht mit anderen Datenquellen zusammengeführt und nach kurzer Zeit gelöscht.",
    ],
  },
  {
    title: "4. Kontaktaufnahme und Fallanfrage",
    paragraphs: [
      "Wenn Sie uns über das Fallanfrage-Formular, per E-Mail oder telefonisch kontaktieren, verarbeiten wir die von Ihnen übermittelten Angaben zur Bearbeitung Ihres Anliegens und für den Fall von Anschlussfragen.",
      "Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO, soweit die Anfrage der Anbahnung oder Durchführung eines Vertrags- bzw. Leistungsverhältnisses dient, im Übrigen Art. 6 Abs. 1 lit. f DSGVO sowie Ihre Einwilligung nach Art. 6 Abs. 1 lit. a DSGVO.",
      "Wir bitten ausdrücklich darum, über das Formular keine Klarnamen junger Menschen und keine Gesundheitsdaten zu übermitteln. Für die Übermittlung personenbezogener Fallunterlagen stimmen wir mit Ihnen einen gesicherten Weg ab.",
      "Ihre Angaben werden gelöscht, sobald sie für den Zweck der Verarbeitung nicht mehr erforderlich sind und keine gesetzlichen Aufbewahrungspflichten entgegenstehen.",
    ],
  },
  {
    title: "5. Bewerbungen",
    paragraphs: [
      "Bewerbungsunterlagen, die Sie uns per E-Mail zusenden, verarbeiten wir ausschließlich zur Durchführung des Bewerbungsverfahrens. Rechtsgrundlage ist § 26 BDSG in Verbindung mit Art. 6 Abs. 1 lit. b DSGVO.",
      "Kommt ein Beschäftigungsverhältnis nicht zustande, löschen wir die Unterlagen spätestens sechs Monate nach Abschluss des Verfahrens, sofern Sie einer längeren Speicherung nicht ausdrücklich zugestimmt haben.",
    ],
  },
  {
    title: "6. Hosting",
    paragraphs: [
      "Diese Website wird bei einem Dienstleister innerhalb der Europäischen Union gehostet. Mit dem Anbieter besteht ein Vertrag zur Auftragsverarbeitung nach Art. 28 DSGVO.",
    ],
  },
  {
    title: "7. Ihre Rechte",
    paragraphs: [
      "Sie haben jederzeit das Recht auf Auskunft (Art. 15 DSGVO), Berichtigung (Art. 16 DSGVO), Löschung (Art. 17 DSGVO), Einschränkung der Verarbeitung (Art. 18 DSGVO) und Datenübertragbarkeit (Art. 20 DSGVO).",
      "Sie können einer Verarbeitung, die auf Art. 6 Abs. 1 lit. f DSGVO beruht, aus Gründen Ihrer besonderen Situation widersprechen (Art. 21 DSGVO). Eine erteilte Einwilligung können Sie jederzeit mit Wirkung für die Zukunft widerrufen.",
      "Unabhängig davon steht Ihnen ein Beschwerderecht bei einer Aufsichtsbehörde zu. Zuständig ist die Landesbeauftragte für Datenschutz und Informationsfreiheit Nordrhein-Westfalen.",
    ],
  },
  {
    title: "8. SSL-/TLS-Verschlüsselung",
    paragraphs: [
      "Diese Website nutzt aus Sicherheitsgründen eine TLS-Verschlüsselung. Eine verschlüsselte Verbindung erkennen Sie an „https://“ in der Adresszeile Ihres Browsers.",
    ],
  },
  {
    title: "9. Änderungen dieser Erklärung",
    paragraphs: [
      "Wir passen diese Datenschutzerklärung an, sobald Änderungen der Website oder der Rechtslage dies erforderlich machen. Es gilt jeweils die auf dieser Seite veröffentlichte Fassung.",
    ],
  },
];

export default function DatenschutzPage() {
  return (
    <>
      <PageHero
        eyebrow="Rechtliches"
        title="Datenschutzerklärung"
        lead="Informationen zur Verarbeitung personenbezogener Daten gemäß Art. 13 DSGVO. Diese Website kommt ohne Cookies, ohne Tracking und ohne externe Einbindungen aus."
        crumbs={[
          { name: "Start", path: "/" },
          { name: "Datenschutz", path: "/datenschutz" },
        ]}
      />

      <Section tone="soft" size="compact">
        <Container width="narrow">
          <div className="space-y-12">
            {sections.map((s) => (
              <section key={s.title}>
                <h2 className="text-[1.2rem] font-semibold text-pine-900">{s.title}</h2>
                <div className="mt-4 space-y-4">
                  {s.paragraphs.map((p, i) => (
                    <p
                      key={i}
                      className="prose-de text-[1rem] leading-relaxed text-ink-600"
                    >
                      {p}
                    </p>
                  ))}
                </div>
              </section>
            ))}
          </div>
        </Container>
      </Section>
    </>
  );
}
