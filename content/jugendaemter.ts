/**
 * Bereich „Für Jugendämter“ — aufgebaut wie eine B2B-Conversion-Strecke:
 * Anforderungen spiegeln → Prozess zeigen → Einwände vorwegnehmen → Kontakt.
 */

/** Die harten Zahlen, die eine Fallzuweisung entscheiden. Oben, ohne Umweg. */
export const kennzahlen = [
  { value: "48 h", label: "Rückmeldung zur Aufnahmeanfrage", note: "werktags, verbindlich" },
  { value: "seit 2009", label: "Trägererfahrung", note: "durchgehend im Kreis Steinfurt" },
  { value: "3", label: "Hilfeformate nach SGB VIII", note: "§ 34 · § 35 · § 41" },
  { value: "24/7", label: "Rufbereitschaft der Leitung", note: "auch an Wochenenden" },
];

export type ProzessSchritt = {
  step: string;
  title: string;
  duration: string;
  body: string;
  detail: string[];
};

export const aufnahmeprozess: ProzessSchritt[] = [
  {
    step: "01",
    title: "Anfrage",
    duration: "Tag 0",
    body: "Sie schildern den Fall telefonisch oder über das Fallanfrage-Formular. Es genügen die Eckdaten — Alter, Anlass, gewünschtes Setting, Dringlichkeit.",
    detail: [
      "Direkte Durchwahl zur Einrichtungsleitung, keine Warteschleife",
      "Formular mit strukturierter Fallabfrage, auch ohne vollständige Akte nutzbar",
      "Auf Wunsch vertrauliche Vorabklärung ohne Namensnennung",
    ],
  },
  {
    step: "02",
    title: "Fachliche Prüfung",
    duration: "innerhalb von 48 Stunden",
    body: "Wir prüfen im Leitungsteam, ob wir dem jungen Menschen mit unserem Setting und der aktuellen Gruppenkonstellation gerecht werden können.",
    detail: [
      "Prüfung von Betreuungsbedarf, Gruppenpassung und Personalressourcen",
      "Klare Rückmeldung: Zusage, Absage oder Alternativvorschlag",
      "Bei Absage nennen wir den Grund — keine unbeantworteten Anfragen",
    ],
  },
  {
    step: "03",
    title: "Vorstellung & Kennenlernen",
    duration: "Tag 3 – 10",
    body: "Der junge Mensch besucht die Einrichtung bzw. den Standort. Sorgeberechtigte und Fallführung sind eingebunden.",
    detail: [
      "Besichtigung, Gespräch mit der künftigen Bezugsbetreuung",
      "Bei Individualpädagogik: Vorstellung der konkreten Betreuungsperson und des Standorts",
      "Transparente Klärung von Regeln, Rechten und Beschwerdewegen",
    ],
  },
  {
    step: "04",
    title: "Hilfeplangespräch & Aufnahme",
    duration: "nach Absprache",
    body: "Ziele, Indikatoren und Berichtsturnus werden gemeinsam festgelegt. Danach erfolgt die Aufnahme.",
    detail: [
      "Leistungs-, Entgelt- und Qualitätsvereinbarung nach §§ 78a ff. SGB VIII",
      "Benennung der Fallverantwortung mit Direktkontakt",
      "In Eilfällen ist eine Inobhutnahme-nahe Aufnahme kurzfristig möglich",
    ],
  },
  {
    step: "05",
    title: "Laufende Zusammenarbeit",
    duration: "fortlaufend",
    body: "Sie bekommen Entwicklungsberichte zum vereinbarten Turnus und eine sofortige Meldung, wenn etwas Relevantes passiert.",
    detail: [
      "Entwicklungsberichte rechtzeitig vor dem Hilfeplangespräch",
      "Unverzügliche Information bei Krise, Entweichung oder § 8a-Anhaltspunkten",
      "Teilnahme an Hilfeplangesprächen vor Ort oder per Videokonferenz",
    ],
  },
];

/** Einwandbehandlung — das, was in der Fallkonferenz wirklich gefragt wird. */
export type Einwand = { frage: string; antwort: string };

export const einwaende: Einwand[] = [
  {
    frage: "Wie schnell bekommen wir eine belastbare Rückmeldung?",
    antwort:
      "Werktags innerhalb von 48 Stunden — mit einer klaren Aussage, nicht mit einer Zwischennachricht. Wenn wir absagen, sagen wir warum, damit Sie die Suche nicht doppelt führen müssen.",
  },
  {
    frage: "Was passiert nachts, am Wochenende oder in der Krise?",
    antwort:
      "Es gibt eine durchgehende Rufbereitschaft der Leitung. Bei Entweichung, Eskalation oder Gefährdungsanhaltspunkten informieren wir die Fallführung unverzüglich und dokumentieren den Vorgang schriftlich.",
  },
  {
    frage: "Wie sieht Ihr Berichtswesen aus?",
    antwort:
      "Entwicklungsberichte zum vereinbarten Hilfeplanturnus, strukturiert nach Zielen aus dem Hilfeplan, mit Einschätzung zur Zielerreichung und Empfehlung zur Fortschreibung. Auf Wunsch in Ihrem Berichtsformat.",
  },
  {
    frage: "Wie gehen Sie mit § 8a SGB VIII um?",
    antwort:
      "Wir arbeiten mit einer insoweit erfahrenen Fachkraft, haben ein verbindliches Verfahren hinterlegt und informieren das zuständige Jugendamt unverzüglich. Das Verfahren legen wir Ihnen auf Anfrage vollständig vor.",
  },
  {
    frage: "Nehmen Sie auch Fälle mit mehreren Abbrüchen in der Vorgeschichte?",
    antwort:
      "Ja — das ist ein Kernteil unserer Arbeit. Wir prüfen aber ehrlich, ob unser Setting passt. Eine Zusage, die nach sechs Wochen scheitert, hilft weder dem jungen Menschen noch Ihnen.",
  },
  {
    frage: "Was gilt bei Maßnahmen im europäischen Ausland?",
    antwort:
      "Auslandsmaßnahmen führen wir ausschließlich unter Beachtung des § 38 SGB VIII durch, mit dokumentierter Standortprüfung, benannter Betreuungsperson und mindestens monatlichen persönlichen Besuchen durch unsere Koordination.",
  },
  {
    frage: "Wie ist die Entgeltsituation geregelt?",
    antwort:
      "Über Leistungs-, Entgelt- und Qualitätsentwicklungsvereinbarungen nach §§ 78a ff. SGB VIII. Die aktuellen Vereinbarungen stellen wir Ihnen auf Anfrage direkt zur Verfügung.",
  },
  {
    frage: "Wer ist unsere Ansprechperson im laufenden Fall?",
    antwort:
      "Eine namentlich benannte Fachkraft mit Fallkenntnis und Direktdurchwahl — plus die Bereichsleitung als Vertretung. Keine wechselnden Zuständigkeiten, keine Sammelpostfächer.",
  },
];

/** Unterlagen, die wir ohne Rückfrage bereitstellen. Senkt die Hemmschwelle. */
export const unterlagen = [
  "Einrichtungskonzeption der angefragten Hilfeform",
  "Leistungs-, Entgelt- und Qualitätsentwicklungsvereinbarung",
  "Schutzkonzept nach § 45 SGB VIII",
  "Verfahrensbeschreibung nach § 8a SGB VIII",
  "Musterbericht für die Hilfeplanfortschreibung",
  "Nachweis Betriebserlaubnis, Landesjugendamt Münster",
];
