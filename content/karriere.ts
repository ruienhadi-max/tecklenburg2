/** Inhalte des Karrierebereichs inkl. Stellenanzeigen für JobPosting-JSON-LD. */

export type Job = {
  slug: string;
  title: string;
  employmentType: "FULL_TIME" | "PART_TIME" | "OTHER";
  employmentTypeLabel: string;
  location: string;
  area: string;
  /** ISO-Datum der Veröffentlichung — fließt in strukturierte Daten ein. */
  datePosted: string;
  summary: string;
  intro: string[];
  tasks: string[];
  profile: string[];
  offer: string[];
  contactPerson: string;
};

export const jobs: Job[] = [
  {
    slug: "paedagogische-fachkraft-koordination-individualpaedagogik",
    title: "Pädagogische Fachkraft — Koordination Individualpädagogik (m/w/d)",
    employmentType: "FULL_TIME",
    employmentTypeLabel: "Vollzeit · unbefristet",
    location: "Ibbenbüren",
    area: "Individualpädagogik",
    datePosted: "2026-06-02",
    summary:
      "Sie koordinieren unsere individualpädagogischen 1:1-Maßnahmen im Inland und im europäischen Ausland — vom Schreibtisch in Ibbenbüren und regelmäßig vor Ort.",
    intro: [
      "Individualpädagogik ist unser fachlich anspruchsvollstes Format: ein junger Mensch, eine feste Betreuungsperson, ein Standort. Damit das trägt, braucht es jemanden, der den Überblick behält — fachlich, organisatorisch und menschlich.",
      "Diese Stelle ist bewusst kein Schichtdienst. Sie arbeiten zu festen Bürozeiten in Ibbenbüren und besuchen die Standorte etwa einmal im Monat persönlich.",
    ],
    tasks: [
      "Fachliche Begleitung und Steuerung laufender individualpädagogischer Maßnahmen",
      "Auswahl, Anleitung und Begleitung der Betreuungspersonen an den Standorten",
      "Regelmäßige Standortbesuche im Inland und im europäischen Ausland",
      "Berichtswesen, Hilfeplanvorbereitung und Kommunikation mit den Jugendämtern",
      "Sicherstellung der Verfahren nach § 38 SGB VIII bei Auslandsmaßnahmen",
    ],
    profile: [
      "Abgeschlossene pädagogische Ausbildung oder ein pädagogisches Studium",
      "Sehr gute Kenntnisse in bzw. ausgeprägte Bereitschaft zur Verwaltungsarbeit",
      "Bereitschaft zu regelmäßigen Reisen zu den europäischen Standorten",
      "Klare, verbindliche Kommunikation gegenüber Behörden und Fachkräften",
      "Führerschein Klasse B",
    ],
    offer: [
      "Vergütung nach VPK-NRW-Tarif, entsprechend Ihrer Qualifikation",
      "Unbefristeter Arbeitsvertrag",
      "Kostenfreie betriebliche Zusatzkrankenversicherung",
      "Möglichkeit der Entgeltumwandlung",
      "Feste Bürozeiten — kein Schicht- und kein Nachtdienst",
      "Kleines Team mit kurzen Entscheidungswegen",
    ],
    contactPerson: "Thomas Bernholt",
  },
  {
    slug: "paedagogische-fachkraft-intensivwohngruppe",
    title: "Pädagogische Fachkraft für die Intensivwohngruppe (m/w/d)",
    employmentType: "FULL_TIME",
    employmentTypeLabel: "Voll- oder Teilzeit · unbefristet",
    location: "Kreis Steinfurt",
    area: "Stationäre Hilfen",
    datePosted: "2026-06-02",
    summary:
      "Sie begleiten junge Menschen im Gruppenalltag — als verlässliche Bezugsperson in einem Team, das sich gegenseitig trägt.",
    intro: [
      "In der Intensivwohngruppe arbeiten Sie mit jungen Menschen, die viel erlebt haben und wenig Grund hatten, Erwachsenen zu vertrauen. Ihre wichtigste Aufgabe ist deshalb nicht, Verhalten zu korrigieren, sondern verlässlich zu bleiben.",
      "Dafür sorgen wir für den Rahmen: erhöhter Personalschlüssel, regelmäßige Supervision, erreichbare Leitung — auch nachts.",
    ],
    tasks: [
      "Bezugsbetreuung für einzelne junge Menschen im Gruppenkontext",
      "Gestaltung eines verlässlich strukturierten Alltags",
      "Begleitung zu Schule, Therapie, Ärzt:innen und Behörden",
      "Elternarbeit und Kontaktgestaltung zur Herkunftsfamilie",
      "Dokumentation und Mitwirkung an Entwicklungsberichten",
    ],
    profile: [
      "Erzieher:in, Sozialpädagog:in, Sozialarbeiter:in, Heilpädagog:in oder vergleichbar",
      "Bereitschaft zum Schichtdienst inkl. Wochenend- und Nachtbereitschaft",
      "Belastbarkeit und die Fähigkeit, in Konflikten ruhig zu bleiben",
      "Interesse an verhaltenstherapeutischen und systemischen Ansätzen",
      "Führerschein Klasse B",
    ],
    offer: [
      "Vergütung nach VPK-NRW-Tarif",
      "Unbefristeter Arbeitsvertrag",
      "Regelmäßige externe Supervision und kollegiale Fallberatung",
      "Fortbildungsbudget und Freistellung für Weiterbildungen",
      "Kostenfreie betriebliche Zusatzkrankenversicherung",
      "Verlässliche Dienstplanung mit Vorlauf",
    ],
    contactPerson: "Dorothee Ludwig",
  },
  {
    slug: "erzieher-betreute-wohnformen",
    title: "Erzieher:in / Sozialpädagog:in Betreute Wohnformen (m/w/d)",
    employmentType: "PART_TIME",
    employmentTypeLabel: "Teilzeit möglich · unbefristet",
    location: "Ibbenbüren und Umgebung",
    area: "Verselbstständigung",
    datePosted: "2026-06-02",
    summary:
      "Sie begleiten Jugendliche und junge Volljährige auf dem Weg in die eigene Wohnung — mit viel Eigenverantwortung in der Fallführung.",
    intro: [
      "Betreutes Wohnen heißt: Sie arbeiten eigenständig, planen Ihre Termine selbst und sind für Ihre Fälle wirklich verantwortlich. Wer Gestaltungsspielraum sucht, findet ihn hier.",
      "Gleichzeitig sind Sie nie allein: feste Teamzeiten, Fallberatung und eine erreichbare Leitung gehören dazu.",
    ],
    tasks: [
      "Fallverantwortliche Begleitung junger Menschen im eigenen Wohnraum",
      "Training von Alltagskompetenzen, Behördengängen und Finanzen",
      "Begleitung bei Schule, Ausbildung und Bewerbungen",
      "Vorbereitung und Durchführung von Hilfeplangesprächen",
      "Planung des Übergangs aus der Jugendhilfe (Care Leaving)",
    ],
    profile: [
      "Abgeschlossene pädagogische Ausbildung oder pädagogisches Studium",
      "Selbstständige, strukturierte Arbeitsweise",
      "Freude an Beziehungsarbeit auf Augenhöhe mit jungen Erwachsenen",
      "Sicherheit im Umgang mit Ämtern und Dokumentation",
      "Führerschein Klasse B",
    ],
    offer: [
      "Vergütung nach VPK-NRW-Tarif",
      "Hohe Eigenverantwortung und flexible Zeiteinteilung",
      "Unbefristeter Arbeitsvertrag, Teilzeit gut möglich",
      "Supervision, Fortbildung und kollegiale Beratung",
      "Kostenfreie betriebliche Zusatzkrankenversicherung",
    ],
    contactPerson: "Dorothee Ludwig",
  },
];

export function getJob(slug: string) {
  return jobs.find((j) => j.slug === slug);
}

/**
 * Imagefilm der Einrichtung. Wird über die Zwei-Klick-Einbettung geladen,
 * damit ohne Interaktion keine Verbindung zu YouTube entsteht.
 */
export const karriereVideo = {
  videoId: "ehkNdBB0ogQ",
  titel: "Wir stellen uns vor! Wir sind die Jugendhilfe Tecklenburg!",
  standbild: "karrierevideo-standbild",
};

/** Argumente für die Arbeitgebermarke — konkret statt Floskel. */
export const benefits = [
  {
    title: "Ein Team, das dich trägt",
    body: "Kleine Teams, feste Ansprechpartner:innen und eine Leitung, die man tatsächlich erreicht. Niemand steht in der Krise allein im Flur.",
  },
  {
    title: "Supervision ist Arbeitszeit",
    body: "Regelmäßige externe Supervision und kollegiale Fallberatung — verbindlich terminiert, nicht „wenn es passt“.",
  },
  {
    title: "Fortbildung mit Freistellung",
    body: "Wir finanzieren Weiterbildungen und stellen dafür frei. Fachlichkeit, die stehen bleibt, hilft niemandem.",
  },
  {
    title: "Vergütung nach VPK-NRW",
    body: "Transparente Eingruppierung nach Tarif, unbefristete Verträge, Entgeltumwandlung und kostenfreie Zusatzkrankenversicherung.",
  },
  {
    title: "Dienstpläne mit Vorlauf",
    body: "Planung mit ausreichend Vorlauf, verlässliche Freizeiten und ein ehrlicher Umgang mit Überstunden.",
  },
  {
    title: "Kurze Wege, echte Mitsprache",
    body: "Als kleiner Träger entscheiden wir schnell. Gute Ideen aus dem Team landen nicht in einer Gremienschleife.",
  },
];

/** Ehrlicher Blick auf den Arbeitsalltag — schafft Vertrauen und filtert vor. */
export const arbeitsalltag = [
  {
    time: "Frühdienst",
    title: "Ankommen und Struktur geben",
    body: "Wecken, Frühstück, Schulweg. Die ersten neunzig Minuten entscheiden oft über den ganzen Tag — hier ist Ruhe die wichtigste Fachkompetenz.",
  },
  {
    time: "Vormittag",
    title: "Fallarbeit und Absprachen",
    body: "Telefonate mit Schule, Jugendamt und Ärzt:innen, Dokumentation, Vorbereitung von Berichten, Übergabe im Team.",
  },
  {
    time: "Nachmittag",
    title: "Beziehung im Alltag",
    body: "Hausaufgaben, Einkauf, Sport, Konflikte klären, Einzelgespräche. Das ist die Zeit, in der die eigentliche Arbeit passiert.",
  },
  {
    time: "Abend",
    title: "Zur Ruhe kommen",
    body: "Kochen, gemeinsames Essen, Rituale zum Tagesabschluss. Und manchmal das Gespräch, auf das man den ganzen Tag gewartet hat.",
  },
];

export const bewerbungsprozess = [
  {
    step: "01",
    title: "Bewerbung senden",
    body: "Lebenslauf genügt zunächst. Kein Anschreiben-Zwang, kein Bewerbungsportal mit Pflichtfeldern.",
  },
  {
    step: "02",
    title: "Kennenlernen",
    body: "Ein Gespräch ohne Assessment-Center. Wir wollen wissen, wie Sie denken — nicht, wie gut Sie sich verkaufen.",
  },
  {
    step: "03",
    title: "Hospitation",
    body: "Sie erleben einen Dienst mit, lernen das Team kennen und sehen den echten Alltag. Bezahlt.",
  },
  {
    step: "04",
    title: "Start im Team",
    body: "Strukturierte Einarbeitung mit fester Mentorin oder festem Mentor in den ersten Monaten.",
  },
];
