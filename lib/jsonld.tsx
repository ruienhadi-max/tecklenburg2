import { site } from "@/content/site";
import type { Angebot } from "@/content/angebote";
import type { Job } from "@/content/karriere";

const address = {
  "@type": "PostalAddress",
  streetAddress: site.office.street,
  postalCode: site.office.postalCode,
  addressLocality: site.office.city,
  addressRegion: site.office.region,
  addressCountry: site.office.country,
};

/**
 * Basis-Entität. Als NGO ausgezeichnet, weil das den Trägercharakter
 * korrekter abbildet als LocalBusiness und trotzdem lokale Signale trägt.
 */
export function organizationLd() {
  return {
    "@context": "https://schema.org",
    "@type": ["NGO", "SocialService"],
    "@id": `${site.url}/#organization`,
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    description: site.shortDescription,
    foundingDate: site.founded,
    address,
    geo: {
      "@type": "GeoCoordinates",
      latitude: site.office.geo.lat,
      longitude: site.office.geo.lng,
    },
    telephone: site.contact.phone,
    faxNumber: site.contact.fax,
    email: site.contact.email,
    areaServed: [
      { "@type": "AdministrativeArea", name: "Kreis Steinfurt" },
      { "@type": "AdministrativeArea", name: "Münsterland" },
      { "@type": "State", name: "Nordrhein-Westfalen" },
    ],
    knowsAbout: [
      "Stationäre Jugendhilfe",
      "Hilfen zur Erziehung nach SGB VIII",
      "Intensivpädagogische Betreuung",
      "Individualpädagogische Maßnahmen",
      "Verselbstständigung junger Volljähriger",
    ],
    memberOf: site.memberships.map((m) => ({ "@type": "Organization", name: m })),
    contactPoint: [
      {
        "@type": "ContactPoint",
        contactType: "Fallanfragen Jugendämter",
        telephone: site.contact.phone,
        email: site.contact.email,
        availableLanguage: ["de"],
        areaServed: "DE",
      },
      {
        "@type": "ContactPoint",
        contactType: "Bewerbungen",
        email: site.contact.email,
        availableLanguage: ["de"],
      },
    ],
  };
}

export function websiteLd() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${site.url}/#website`,
    url: site.url,
    name: site.name,
    inLanguage: "de-DE",
    publisher: { "@id": `${site.url}/#organization` },
  };
}

export function serviceLd(angebot: Angebot) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name: angebot.title,
    serviceType: angebot.kicker,
    description: angebot.summary,
    url: `${site.url}/angebote/${angebot.slug}`,
    provider: { "@id": `${site.url}/#organization` },
    audience: { "@type": "Audience", audienceType: angebot.targetGroup },
    areaServed: { "@type": "State", name: "Nordrhein-Westfalen" },
    termsOfService: angebot.legal.join(", "),
  };
}

export function jobPostingLd(job: Job) {
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: [job.summary, ...job.intro].join(" "),
    datePosted: job.datePosted,
    employmentType: job.employmentType,
    hiringOrganization: {
      "@type": "Organization",
      name: site.name,
      sameAs: site.url,
    },
    jobLocation: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: job.location,
        addressRegion: "NRW",
        addressCountry: "DE",
      },
    },
    industry: "Kinder- und Jugendhilfe",
    occupationalCategory: "Sozialpädagogik / Erziehung",
    directApply: true,
  };
}

export function faqLd(items: { frage: string; antwort: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((i) => ({
      "@type": "Question",
      name: i.frage,
      acceptedAnswer: { "@type": "Answer", text: i.antwort },
    })),
  };
}

export function breadcrumbLd(trail: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((t, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: t.name,
      item: `${site.url}${t.path === "/" ? "" : t.path}`,
    })),
  };
}

/** Rendert ein JSON-LD-Script. Kein Client-JS nötig. */
export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      // Statische, selbst erzeugte Daten — kein Nutzerinput.
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
