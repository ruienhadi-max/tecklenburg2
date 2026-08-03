export type NavItem = {
  href: string;
  label: string;
  /** Kürzere Variante für die Desktop-Leiste, wo Platz knapp ist. */
  short?: string;
  description?: string;
};

export const mainNav: NavItem[] = [
  { href: "/", label: "Start" },
  { href: "/ueber-uns", label: "Über uns", description: "Träger, Historie, Haltung" },
  {
    href: "/paedagogisches-konzept",
    label: "Pädagogisches Konzept",
    short: "Konzept",
    description: "Wie wir arbeiten und warum",
  },
  { href: "/angebote", label: "Angebote", description: "Drei Hilfeformen nach SGB VIII" },
  {
    href: "/fuer-jugendaemter",
    label: "Für Jugendämter",
    description: "Aufnahme, Berichte, Ansprechpartner",
  },
  { href: "/team", label: "Team", description: "Die Menschen hinter der Arbeit" },
  { href: "/karriere", label: "Karriere", description: "Offene Stellen und Arbeitsalltag" },
  { href: "/kontakt", label: "Kontakt" },
];

export const legalNav: NavItem[] = [
  { href: "/impressum", label: "Impressum" },
  { href: "/datenschutz", label: "Datenschutz" },
];
