/**
 * Leistungsangebote. Jede Leistung trägt genug Substanz für eine eigene
 * Detailseite unter /angebote/[slug] und für strukturierte Daten (Service).
 */

export type Angebot = {
  slug: string;
  title: string;
  kicker: string;
  /** Ein Satz, der in Listen und Teasern steht. */
  summary: string;
  /** Rechtsgrundlagen — für Jugendämter das erste Prüfkriterium. */
  legal: string[];
  targetGroup: string;
  age: string;
  capacity: string;
  setting: string;
  approach: string;
  /** Längere Beschreibung, Absatzweise. */
  body: string[];
  /** Was der junge Mensch konkret erlebt. */
  everyday: string[];
  /** Was das Jugendamt konkret bekommt. */
  forAuthority: string[];
  contact: {
    name: string;
    role: string;
    phone: string;
    phoneDisplay: string;
  };
  accent: "moss" | "sage" | "pine";
};

export const angebote: Angebot[] = [
  {
    slug: "intensivwohngruppe",
    title: "Intensivwohngruppe",
    kicker: "Stationäre Hilfe",
    summary:
      "Rund-um-die-Uhr-Betreuung in einer kleinen Gruppe — für junge Menschen, die einen sehr verlässlichen, eng begleiteten Rahmen brauchen.",
    legal: ["§ 27 ff. SGB VIII", "§ 34 SGB VIII", "§ 35a SGB VIII", "§ 41 SGB VIII"],
    targetGroup:
      "Kinder und Jugendliche mit erhöhtem Betreuungsbedarf, herausforderndem Verhalten, Bindungs- und Beziehungsabbrüchen oder Vorerfahrungen mit gescheiterten Hilfen.",
    age: "ab 10 Jahren, Verlängerung als Hilfe für junge Volljährige möglich",
    capacity: "Kleine Gruppe mit erhöhtem Personalschlüssel",
    setting: "Wohngruppe im ländlichen Raum, Kreis Steinfurt",
    approach: "Verhaltenstherapeutisch und systemisch fundiert, Bezugsbetreuung",
    body: [
      "Junge Menschen, die zu uns in die Intensivwohngruppe kommen, haben in der Regel bereits mehrere Hilfen erlebt — und oft auch mehrere Abbrüche. Genau deshalb ist unser wichtigstes Angebot Verlässlichkeit: dieselben Gesichter, dieselben Regeln, dieselben Abläufe, auch dann, wenn es schwierig wird.",
      "Wir verstehen herausforderndes Verhalten nicht als Störung, sondern als erlernte soziale Technik, die einmal eine Schutz- oder Bewältigungsfunktion hatte. Das verändert die Frage im Team: nicht „Wie stellen wir das ab?“, sondern „Wofür war das einmal sinnvoll — und was braucht dieser junge Mensch, um es nicht mehr zu brauchen?“",
      "Der Alltag ist bewusst klar strukturiert. Struktur ist hier kein Selbstzweck, sondern Entlastung: Wer weiß, was als Nächstes passiert, muss weniger Energie in Kontrolle stecken und hat mehr Kapazität für Entwicklung, Schule und Beziehung.",
    ],
    everyday: [
      "Feste Bezugsbetreuung mit regelmäßigen Einzelgesprächen",
      "Verlässlicher Tagesrhythmus mit Schule, Aufgaben und freier Zeit",
      "Anbindung an Schule, Ausbildung oder tagesstrukturierende Angebote",
      "Begleitung zu Terminen bei Ärzt:innen, Therapie und Behörden",
      "Elternarbeit und Kontaktgestaltung zur Herkunftsfamilie, wo dies dem Kind dient",
    ],
    forAuthority: [
      "Aufnahmeentscheidung in der Regel innerhalb von 48 Stunden",
      "Benannte Fallverantwortung mit direkter Durchwahl",
      "Entwicklungsberichte zum Hilfeplanturnus, auf Wunsch häufiger",
      "Sofortige Information bei Krisen, Entweichungen oder Gefährdungsanhaltspunkten",
    ],
    contact: {
      name: "Dorothee Ludwig",
      role: "Bereichsleitung Stationäre Hilfen",
      phone: "+49 151 20749582",
      phoneDisplay: "+49 151 207 495 82",
    },
    accent: "pine",
  },
  {
    slug: "betreute-wohnformen",
    title: "Betreute Wohnformen",
    kicker: "Verselbstständigung",
    summary:
      "Der Schritt in die eigene Wohnung — mit so viel Selbstständigkeit wie möglich und so viel Begleitung wie nötig.",
    legal: ["§ 27 ff. SGB VIII", "§ 34 SGB VIII", "§ 35a SGB VIII", "§ 41 SGB VIII"],
    targetGroup:
      "Jugendliche und junge Volljährige, die perspektivisch selbstständig leben werden und dabei noch verlässliche pädagogische Begleitung brauchen.",
    age: "ab 16 Jahren, regelhaft als Hilfe für junge Volljährige",
    capacity: "Einzelappartements und Trainingswohnen",
    setting: "Eigener Wohnraum mit flexibler Betreuungsdichte",
    approach: "Ressourcenorientiert, Kompetenztraining, schrittweise Ablösung",
    body: [
      "Verselbstständigung ist kein Datum im Hilfeplan, sondern ein Prozess. Wir beginnen ihn früh und in kleinen Schritten: eigener Einkauf, eigener Termin, eigenes Konto, eigene Bewerbung — jeweils zuerst begleitet, dann beobachtet, dann selbst verantwortet.",
      "Die Betreuungsdichte wird im Verlauf ausdrücklich verändert. Sie startet hoch und wird reduziert, sobald der junge Mensch tragfähige Routinen aufgebaut hat. Diese Veränderungen halten wir im Hilfeplanverfahren transparent fest, damit sie nachvollziehbar und überprüfbar bleiben.",
      "Wir bereiten den Übergang aus der Jugendhilfe bewusst vor: Anschlusswohnraum, Anträge, Ausbildungsplatz, Netzwerk vor Ort. Care Leaver sollen nicht am Tag der Hilfebeendigung vor dem Nichts stehen.",
    ],
    everyday: [
      "Feste wöchentliche Betreuungskontakte, dazu Erreichbarkeit bei Bedarf",
      "Training von Haushalt, Behördengängen, Geld- und Terminmanagement",
      "Begleitung bei Schule, Ausbildung, Praktikum und Bewerbungen",
      "Aufbau eines tragfähigen sozialen Netzes außerhalb der Jugendhilfe",
      "Strukturierte Übergangsplanung vor Hilfeende",
    ],
    forAuthority: [
      "Nachvollziehbare Dokumentation der Betreuungsintensität",
      "Klare Kriterien für Steigerung oder Reduzierung der Fachleistungsstunden",
      "Übergangsplanung als fester Bestandteil des Berichtswesens",
      "Ansprechpartner:in mit Fallkenntnis, keine wechselnde Zuständigkeit",
    ],
    contact: {
      name: "Dorothee Ludwig",
      role: "Bereichsleitung Stationäre Hilfen",
      phone: "+49 151 20749582",
      phoneDisplay: "+49 151 207 495 82",
    },
    accent: "moss",
  },
  {
    slug: "individualpaedagogik",
    title: "Individualpädagogik",
    kicker: "1:1-Betreuung im In- und Ausland",
    summary:
      "Ein eigener Ort, eine feste Bezugsperson, ein klarer Rahmen — für junge Menschen, für die Gruppensettings derzeit nicht tragen.",
    legal: [
      "§ 27 ff. SGB VIII",
      "§ 34 SGB VIII",
      "§ 35 SGB VIII",
      "§ 35a SGB VIII",
      "§ 38 SGB VIII",
      "§ 41 SGB VIII",
    ],
    targetGroup:
      "Junge Menschen in verfestigten Krisen, mit Systemsprengerdynamik, massiven Schulvermeidungslagen oder wiederholten Abbrüchen in Gruppensettings.",
    age: "ab 12 Jahren, im Einzelfall früher",
    capacity: "1:1-Setting, ein junger Mensch pro Standort",
    setting: "Standorte in Deutschland und im europäischen Ausland",
    approach: "Erlebnis- und individualpädagogisch, Alltag als Lernfeld",
    body: [
      "Individualpädagogische Maßnahmen nach § 35 SGB VIII sind kein Ausweg, wenn nichts anderes mehr geht — sie sind ein eigenständiges fachliches Setting. Ihr Kern ist die Reduktion von Reizen und Konfliktflächen auf ein Maß, in dem ein junger Mensch wieder handlungsfähig wird.",
      "Ein junger Mensch, eine feste Betreuungsperson, ein überschaubarer Ort. Der Alltag selbst wird zum Lernfeld: Versorgung, Tagesstruktur, Verantwortung für Tiere oder Garten, körperliche Arbeit, Schule in angepasster Form. Erfolge sind hier klein und konkret — und genau deshalb erfahrbar.",
      "Die Standorte im europäischen Ausland betreuen wir mit einer eigenen Koordination von Ibbenbüren aus. Sie werden regelmäßig persönlich besucht, mindestens monatlich, dazu kommen engmaschige fachliche Rücksprachen. Auslandsmaßnahmen führen wir ausschließlich unter Beachtung der Voraussetzungen des § 38 SGB VIII durch.",
    ],
    everyday: [
      "Feste Bezugsperson im gemeinsamen Alltag",
      "Klarer, ritualisierter Tagesablauf mit realen Aufgaben",
      "Schulische Beschulung bzw. individuell angepasste Lernangebote",
      "Erlebnispädagogische Elemente: Natur, Tiere, handwerkliche Arbeit",
      "Strukturierte Rückführungs- oder Anschlussplanung von Beginn an",
    ],
    forAuthority: [
      "Standortprüfung und Vorstellung der Betreuungsperson vor Belegung",
      "Regelmäßige persönliche Standortbesuche durch unsere Koordination",
      "Verfahren nach § 38 SGB VIII bei Auslandsmaßnahmen vollständig dokumentiert",
      "Engmaschige Berichterstattung, Videokonferenzen zur Hilfeplanung möglich",
    ],
    contact: {
      name: "Eva Poelmeyer",
      role: "Koordination Individualpädagogik",
      phone: "+49 5451 5496266",
      phoneDisplay: "+49 5451 549 62 66",
    },
    accent: "sage",
  },
];

export function getAngebot(slug: string) {
  return angebote.find((a) => a.slug === slug);
}
