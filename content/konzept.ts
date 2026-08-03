/** Inhalte für „Über uns“ und „Pädagogisches Konzept“. */

export const haltung = {
  lead: "Der junge Mensch steht im Mittelpunkt.",
  body: "Wir bieten jungen Menschen ein Lebensfeld, das von Akzeptanz und Wertschätzung geprägt ist — unabhängig von Herkunft, Religion und Vorgeschichte. Das ist kein Leitbildsatz für die Wand, sondern eine Arbeitsanweisung an uns selbst.",
};

export type Prinzip = {
  title: string;
  body: string;
};

export const prinzipien: Prinzip[] = [
  {
    title: "Verhalten hat einen Grund",
    body: "Wir betrachten herausforderndes Verhalten als erlernte soziale Technik, die einmal eine Schutz- oder Bewältigungsfunktion erfüllt hat. Diese Sichtweise nimmt Schuld aus dem Raum und macht Veränderung überhaupt erst planbar.",
  },
  {
    title: "Beziehung vor Methode",
    body: "Nach Rogers arbeiten wir mit Akzeptanz, Empathie und Kongruenz. Erst wenn ein junger Mensch spürt, dass er sich zeigen darf, ohne dafür bestraft zu werden, entsteht der Raum, in dem pädagogische Arbeit wirkt.",
  },
  {
    title: "Struktur entlastet",
    body: "Verlässliche Abläufe, klare Regeln und Rituale reduzieren Unsicherheit. Wer nicht ständig einschätzen muss, was als Nächstes kommt, hat Kapazität frei für Schule, Kontakte und Entwicklung.",
  },
  {
    title: "Systemisch denken",
    body: "Kein junger Mensch existiert ohne sein System. Herkunftsfamilie, Schule, Jugendamt, Peers und Helfernetz werden mitgedacht — auch dann, wenn eine Rückführung nicht das Ziel ist.",
  },
  {
    title: "Alltag ist das Lernfeld",
    body: "Kochen, Wecken, Streit, Busfahrplan, Hausaufgaben, Versöhnung. Die entscheidenden Lernerfahrungen entstehen nicht im Setting-Termin, sondern zwischen den Terminen.",
  },
  {
    title: "Haltung ist überprüfbar",
    body: "Supervision, kollegiale Fallberatung und Fortbildung sind bei uns keine Zusatzleistung, sondern Bestandteil der Arbeitszeit. Fachlichkeit, die nicht regelmäßig hinterfragt wird, veraltet.",
  },
];

/** Die Grundwerte aus dem bestehenden Konzept — bewusst schlicht gehalten. */
export const werte = [
  { label: "Humor und Lebensfreude", note: "Ein Ort, an dem gelacht wird, trägt mehr als ein Ort, an dem alles richtig ist." },
  { label: "Gastfreundschaft", note: "Wer zu uns kommt, kommt an — nicht in eine Maßnahme, sondern zu Menschen." },
  { label: "Lernen am Modell", note: "Was wir von jungen Menschen erwarten, leben wir selbst vor." },
  { label: "Rituale und Sicherheit", note: "Wiederholung schafft Vertrauen. Vertrauen schafft Entwicklung." },
  { label: "Ressourcen im Team", note: "Die wichtigste Ressource der Einrichtung sind ihre Mitarbeitenden." },
  { label: "Toleranz und Offenheit", note: "Wir arbeiten mit jungen Menschen jeder Religion und kulturellen Prägung." },
];

export type Meilenstein = { year: string; text: string };

export const historie: Meilenstein[] = [
  { year: "2009", text: "Gründung der Jugendhilfe Tecklenburg im Januar — mit der ersten stationären Wohngruppe." },
  { year: "2014", text: "Aufbau individualpädagogischer Einzelmaßnahmen nach § 35 SGB VIII." },
  { year: "2017", text: "Erweiterung um betreute Wohnformen für die Verselbstständigung junger Volljähriger." },
  { year: "2020", text: "Verlagerung der Verwaltung nach Ibbenbüren — kürzere Wege, bessere Erreichbarkeit." },
  { year: "2023", text: "Ausbau der individualpädagogischen Standorte im europäischen Ausland mit eigener Koordination." },
  { year: "heute", text: "Drei Hilfeformate, ein multiprofessionelles Team, eine durchgehende fachliche Linie." },
];

export const qualitaet = [
  {
    title: "Betriebserlaubnis & Aufsicht",
    body: "Alle stationären Angebote werden nach den Vorgaben des Landesjugendamtes Münster (LWL) betrieben und regelmäßig überprüft.",
  },
  {
    title: "Schutzkonzept",
    body: "Verbindliches Schutzkonzept nach § 45 SGB VIII mit Präventionsmaßnahmen, Beschwerdewegen und einem definierten Verfahren bei Verdachtsfällen.",
  },
  {
    title: "Beteiligung & Beschwerde",
    body: "Junge Menschen haben interne und externe Beschwerdewege, die ihnen bei Aufnahme erklärt und schriftlich ausgehändigt werden.",
  },
  {
    title: "Insoweit erfahrene Fachkraft",
    body: "Bei Anhaltspunkten für eine Kindeswohlgefährdung ziehen wir nach § 8a SGB VIII die insoweit erfahrene Fachkraft hinzu und informieren das Jugendamt unverzüglich.",
  },
  {
    title: "Führungszeugnisse",
    body: "Erweiterte Führungszeugnisse nach § 72a SGB VIII für alle Mitarbeitenden, inklusive turnusmäßiger Wiedervorlage.",
  },
  {
    title: "Fachverbände",
    body: "Mitgliedschaft im VPK Nordrhein-Westfalen sowie in weiteren Fachverbänden — mit Zugang zu Fachtagen und aktueller Rechtsentwicklung.",
  },
];
