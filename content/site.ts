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
  /**
   * ACHTUNG — noch nicht freigegeben.
   *
   * Diese Zitate sind Entwürfe der Agentur, keine Aussagen der genannten
   * Personen. Vor dem Livegang müssen sie von den Zitierten bestätigt,
   * ersetzt oder entfernt werden. Der Feldname sagt das bewusst deutlich,
   * damit sie in einem CMS nicht versehentlich als echte Zitate gelten.
   */
  zitatEntwurf?: string;
  /** Dateiname in public/bilder ohne Endung. Fehlt er, greifen die Initialen. */
  foto?: string;
  initials: string;
  /** Leitung erscheint prominenter und mit Direktkontakt. */
  leitung?: boolean;
  /**
   * Funktionsbezeichnung ist noch ein Platzhalter. Die Teamseite kennzeichnet
   * diese Einträge sichtbar, damit sie nicht unbemerkt live gehen.
   */
  rolleOffen?: boolean;
};

export const team: Person[] = [
  {
    slug: "ingo-heming",
    name: "Ingo Heming",
    role: "Geschäftsführung",
    qualification: "Gründer und Inhaber",
    focus: "Trägerentwicklung, Qualitätssicherung, Betriebserlaubnisrecht",
    since: "2009",
    email: "info@jugendhilfe-tecklenburg.de",
    foto: "ingo-heming",
    initials: "IH",
    leitung: true,
    zitatEntwurf:
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
    foto: "thomas-bernholt",
    initials: "TB",
    leitung: true,
    zitatEntwurf:
      "Ein Jugendamt muss wissen, woran es bei uns ist. Deshalb sagen wir früh und klar, ob wir einem jungen Menschen gerecht werden können — auch wenn die Antwort Nein lautet.",
  },
  {
    slug: "dorothee-ludwig",
    name: "Dorothee Ludwig",
    role: "Pädagogische Leitung",
    qualification: "Sozialarbeiterin",
    focus: "Intensivwohngruppe, Betreute Wohnformen, Verselbstständigung",
    phone: "+49 151 20749582",
    phoneDisplay: "+49 151 207 495 82",
    foto: "dorothee-ludwig",
    initials: "DL",
    leitung: true,
    zitatEntwurf:
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
    leitung: true,
    zitatEntwurf:
      "Manche junge Menschen brauchen erst Abstand vom Bekannten, um sich selbst wieder in den Blick zu bekommen.",
  },
  {
    slug: "malin-schmitz",
    name: "Malin Schmitz",
    role: "Fachbereichsleitung",
    qualification: "Erzieherin",
    focus: "Fachliche Steuerung im Gruppendienst",
    foto: "malin-schmitz",
    initials: "MS",
  },
  {
    slug: "linda-hoevel",
    name: "Linda Hövel",
    role: "Sozialarbeiterin",
    qualification: "Sozialarbeiterin",
    focus: "Fallverantwortung, Hilfeplanung, Elternarbeit",
    foto: "linda-hoevel",
    initials: "LH",
  },
  {
    slug: "marlene-gerighausen",
    name: "Marlene Gerighausen",
    role: "Pädagogische Fachkraft",
    qualification: "Pädagogische Fachkraft",
    focus: "Bezugsbetreuung im Gruppenalltag",
    foto: "marlene-gerighausen",
    initials: "MG",
  },
  {
    slug: "johannes-boesling",
    name: "Johannes Bösling",
    role: "Erzieher",
    qualification: "Erzieher",
    focus: "Alltagsbegleitung, Schule und Freizeit",
    foto: "johannes-boesling",
    initials: "JB",
  },
  {
    slug: "stephan-keuter",
    name: "Stephan Keuter",
    role: "Erzieher",
    qualification: "Erzieher",
    focus: "Bezugsbetreuung, Krisenbegleitung",
    foto: "stephan-keuter",
    initials: "SK",
  },
  {
    slug: "sonia-gorny",
    name: "Sonia Gorny",
    role: "Verwaltung",
    qualification: "Verwaltung",
    focus: "Erreichbarkeit, Dokumentation, Schnittstelle zum Jugendamt",
    foto: "sonia-gorny",
    initials: "SG",
  },

  // Für die folgenden vier Personen lag keine Funktionsbezeichnung vor.
  // `rolleOffen` markiert das — vor dem Livegang ersetzen.
  {
    slug: "mandy-rautenberg",
    name: "Mandy Rautenberg",
    role: "Funktion folgt",
    qualification: "",
    focus: "",
    foto: "mandy-rautenberg",
    initials: "MR",
    rolleOffen: true,
  },
  {
    slug: "udo-kraemer",
    name: "Udo Krämer",
    role: "Funktion folgt",
    qualification: "",
    focus: "",
    foto: "udo-kraemer",
    initials: "UK",
    rolleOffen: true,
  },
  {
    slug: "mathis-petersen",
    name: "Mathis Petersen",
    role: "Funktion folgt",
    qualification: "",
    focus: "",
    foto: "mathis-petersen",
    initials: "MP",
    rolleOffen: true,
  },
  {
    slug: "stephan-bogdanow",
    name: "Stephan Bogdanow",
    role: "Funktion folgt",
    qualification: "",
    focus: "",
    foto: "stephan-bogdanow",
    initials: "SB",
    rolleOffen: true,
  },
];

/** Leitungskreis — für Startseite, Kontaktseite und den Jugendamtsbereich. */
export const leadership: Person[] = team.filter((p) => p.leitung);

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
