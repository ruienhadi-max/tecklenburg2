/**
 * Zentrale Stammdaten der Einrichtung.
 *
 * Diese Datei ist die einzige Quelle für Adressen, Rufnummern und
 * Ansprechpartner:innen. Sie wird von Metadaten, JSON-LD, Header, Footer,
 * Kontaktseite und Formularen gelesen — eine Änderung hier wirkt überall.
 */

export const site = {
  name: "Jugendhilfe Tecklenburg",
  legalName: "Jugendhilfe Tecklenburg",
  /** Produktions-Domain. Bei Deploy auf eigene Domain hier anpassen. */
  url: "https://www.jugendhilfe-tecklenburg.de",
  locale: "de-DE",
  founded: "2009",
  claim: "Wertschätzung · Struktur · Zukunft",
  shortDescription:
    "Träger der stationären Kinder- und Jugendhilfe in Ibbenbüren / Kreis Steinfurt. Intensivwohngruppe, Betreute Wohnformen und Individualpädagogik nach SGB VIII.",

  /** Verwaltung — hier laufen Anfragen und Post zusammen. */
  office: {
    label: "Verwaltung",
    street: "Waldfrieden 15",
    postalCode: "49477",
    city: "Ibbenbüren",
    region: "Nordrhein-Westfalen",
    country: "DE",
    geo: { lat: 52.2716, lng: 7.7136 },
  },

  /** Anschrift laut Impressum. */
  legalAddress: {
    street: "Käthe-Kollwitz-Straße 31",
    postalCode: "49479",
    city: "Ibbenbüren",
    country: "DE",
  },

  contact: {
    phone: "+49 5451 5419750",
    phoneDisplay: "+49 5451 541 97 50",
    mobile: "+49 170 1992688",
    mobileDisplay: "+49 170 199 26 88",
    fax: "+49 5451 5419751",
    faxDisplay: "+49 5451 541 97 51",
    email: "info@jugendhilfe-tecklenburg.de",
    /** Direktkanal für Jugendämter — bewusst getrennt kommuniziert. */
    caseEmail: "aufnahme@jugendhilfe-tecklenburg.de",
    careerEmail: "bewerbung@jugendhilfe-tecklenburg.de",
  },

  hours: {
    office: "Mo – Fr, 08:00 – 16:30 Uhr",
    /** Rufbereitschaft der pädagogischen Leitung. */
    emergency: "Rufbereitschaft rund um die Uhr, 365 Tage im Jahr",
  },

  supervisoryAuthority: "Landesjugendamt Münster (LWL)",
  memberships: ["VPK Nordrhein-Westfalen", "BE — Bundesverband", "AIM"],

  legal: {
    managingDirector: "Ingo Heming",
    deputy: "Thomas Bernholt",
    liabilityInsurer:
      "Provinzial Versicherung — Mindrup & Franz oHG, Kirchpl. 10, 49525 Lengerich",
  },
} as const;

export type Person = {
  slug: string;
  name: string;
  role: string;
  qualification: string;
  focus: string;
  since?: string;
  phone?: string;
  phoneDisplay?: string;
  email?: string;
  /** Kurzes Zitat — gibt dem Team eine Haltung statt einer Liste. */
  quote?: string;
  initials: string;
};

export const leadership: Person[] = [
  {
    slug: "ingo-heming",
    name: "Ingo Heming",
    role: "Geschäftsführung",
    qualification: "Gründer der Einrichtung",
    focus: "Trägerentwicklung, Qualitätssicherung, Betriebserlaubnisrecht",
    since: "2009",
    email: "info@jugendhilfe-tecklenburg.de",
    initials: "IH",
    quote:
      "Wir haben 2009 klein angefangen — mit der Überzeugung, dass junge Menschen nicht in Konzepte passen müssen, sondern Konzepte zu jungen Menschen.",
  },
  {
    slug: "thomas-bernholt",
    name: "Thomas Bernholt",
    role: "Einrichtungsleitung, stv. Geschäftsführung",
    qualification: "Pädagogische Gesamtleitung",
    focus: "Aufnahmeverfahren, Hilfeplanung, Zusammenarbeit mit Jugendämtern",
    phone: "+49 5451 5419750",
    phoneDisplay: "+49 5451 541 97 50",
    email: "info@jugendhilfe-tecklenburg.de",
    initials: "TB",
    quote:
      "Ein Jugendamt muss wissen, woran es bei uns ist. Deshalb sagen wir früh und klar, ob wir einem jungen Menschen gerecht werden können — auch wenn die Antwort Nein lautet.",
  },
  {
    slug: "dorothee-ludwig",
    name: "Dorothee Ludwig",
    role: "Bereichsleitung Stationäre Hilfen",
    qualification: "Pädagogische Fachkraft",
    focus: "Intensivwohngruppe, Betreute Wohnformen, Verselbstständigung",
    phone: "+49 151 20749582",
    phoneDisplay: "+49 151 207 495 82",
    initials: "DL",
    quote:
      "Beziehung ist keine Methode, die man anwendet. Sie ist die Bedingung dafür, dass alle anderen Methoden überhaupt wirken.",
  },
  {
    slug: "eva-poelmeyer",
    name: "Eva Poelmeyer",
    role: "Koordination Individualpädagogik",
    qualification: "Pädagogische Fachkraft",
    focus: "1:1-Maßnahmen im In- und europäischen Ausland, Standortbetreuung",
    phone: "+49 5451 5496266",
    phoneDisplay: "+49 5451 549 62 66",
    initials: "EP",
    quote:
      "Manche junge Menschen brauchen erst Abstand vom Bekannten, um sich selbst wieder in den Blick zu bekommen.",
  },
];

/** Zusammensetzung des multiprofessionellen Teams — bewusst als Struktur, nicht als Namensliste. */
export const teamComposition = [
  {
    label: "Sozialpädagog:innen / Sozialarbeiter:innen (B.A. / M.A.)",
    note: "Fallverantwortung, Hilfeplanung, Berichtswesen",
  },
  {
    label: "Erzieher:innen",
    note: "Alltagsbegleitung, Bezugsbetreuung, Gruppendienst",
  },
  {
    label: "Heilpädagog:innen",
    note: "Entwicklungsförderung bei besonderem Unterstützungsbedarf",
  },
  {
    label: "Erlebnispädagogische Fachkräfte",
    note: "Individualpädagogische Settings im In- und Ausland",
  },
  {
    label: "Externe Supervision & Fachberatung",
    note: "Regelmäßig, fallbezogen und teambezogen",
  },
  {
    label: "Verwaltung & Leitung",
    note: "Erreichbarkeit, Dokumentation, Schnittstelle zum Jugendamt",
  },
];
