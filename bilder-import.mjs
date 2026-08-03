import sharp from "sharp";
import { mkdirSync } from "node:fs";
import path from "node:path";

/**
 * Übernimmt die ausgewählten Aufnahmen aus dem Shooting in die Website.
 *
 * Die Originale liegen bei ~19 MB pro Datei und bleiben unangetastet. Hier
 * entstehen daraus zugeschnittene, komprimierte WebP-Dateien in genau den
 * Seitenverhältnissen, die das Layout verwendet — jeweils in einfacher und
 * doppelter Auflösung für Retina-Displays.
 *
 * Aufruf: node bilder-import.mjs
 */

const SRC = "/Users/ruienhadi/Downloads/Bilder-Tecklenburg";
const OUT = "public/bilder";

/** Zielformate des Layouts. */
const FORMATE = {
  portraet: { w: 760, h: 950 }, // 4:5 — Hero, Angebotsseiten
  quer: { w: 1000, h: 625 }, // 16:10 — Team-, Karriere-, Konzeptbilder
  kopf: { w: 440, h: 440 }, // 1:1 — Personenporträts
};

const bilder = [
  // --- Personenporträts -------------------------------------------------
  { q: "Ingo Heming Geschaeftsführer InhaberDSC02861.jpg", z: "ingo-heming", f: "kopf", pos: "centre", kopfY: 0.18 },
  { q: "Thomas Bernholt Einrichtungsleitung stellvertretende GeschaeftsführungDSC02913.jpg", z: "thomas-bernholt", f: "kopf", pos: "centre", kopfY: 0.24 },
  { q: "Dorothee Ludwig Paedagogische Leitung SozialarbeiterinDSC02835.jpg", z: "dorothee-ludwig", f: "kopf", pos: "centre", kopfY: 0.2 },
  { q: "Malin Schmitz Fachbereichsleitung ErzieherinDSC02815.jpg", z: "malin-schmitz", f: "kopf", pos: "centre", kopfY: 0.21 },
  { q: "Linda Hövel Sozialarbeiterin DSC02713.jpg", z: "linda-hoevel", f: "kopf", pos: "centre", kopfY: 0.25 },
  { q: "Marlene Gerighausen paedagogische FachkraftDSC02733.jpg", z: "marlene-gerighausen", f: "kopf", pos: "centre", kopfY: 0.27 },
  { q: "Johannes Boesling ErzieherDSC02784.jpg", z: "johannes-boesling", f: "kopf", pos: "centre", kopfY: 0.18 },
  { q: "Stephan Keuter ErzieherDSC02628.jpg", z: "stephan-keuter", f: "kopf", pos: "centre", kopfY: 0.25 },
  { q: "Sonia Gorny VerwaltungDSC02803.jpg", z: "sonia-gorny", f: "kopf", pos: "centre", kopfY: 0.23 },

  // --- Szenen -----------------------------------------------------------
  // Zwei Kolleg:innen im Gespräch am Besprechungstisch
  { q: "Situationsarbeit im Team Einrichtungsleitung 2.jpg", z: "gespraech-leitung", f: "portraet", pos: "attention" },
  { q: "Situationsarbeit im Team Einrichtungsleitung 2.jpg", z: "gespraech-leitung-quer", f: "quer", pos: "attention" },
  // Fachliche Arbeit am Tisch, Whiteboard im Hintergrund
  { q: "Situationsarbeit im Team.jpg", z: "fachliche-arbeit", f: "quer", pos: "attention" },
  { q: "Situationsarbeit im Team.jpg", z: "fachliche-arbeit-hoch", f: "portraet", pos: "attention" },
  // Büroalltag mit Bürohund
  { q: "Situationsarbeit im Team hinten.jpg", z: "bueroalltag", f: "quer", pos: "attention" },
  // Kollegiale Beratung im Sitzkreis
  { q: "Situationsarbeit im Team4.jpg", z: "kollegiale-beratung", f: "quer", pos: "attention" },
  // Besprechung mit mehreren Personen
  { q: "Situationsarbeit im Team wieder.jpg", z: "besprechung", f: "quer", pos: "attention" },
  { q: "Situationsarbeit im Team again.jpg", z: "besprechung-laptop", f: "portraet", pos: "attention" },
  // Gesamtes Team vor dem Haus
  { q: "Teamfoto vor dem BueroDSC02523.jpg", z: "team-vor-dem-haus", f: "quer", pos: "attention" },
  // Gesamtes Team auf der Terrasse
  { q: "TeamfotosDSC02477.jpg", z: "team-terrasse", f: "quer", pos: "attention" },
  { q: "TeamfotosDSC02477.jpg", z: "team-terrasse-hoch", f: "portraet", pos: "attention" },
  // Team am Konferenztisch
  { q: "Teamfoto am KonferenztischDSC02561.jpg", z: "team-konferenztisch", f: "quer", pos: "attention" },
];

mkdirSync(OUT, { recursive: true });

for (const b of bilder) {
  const { w, h } = FORMATE[b.f];
  const position = b.pos === "attention" ? sharp.strategy.attention : b.pos;

  for (const faktor of [1, 2]) {
    let bild = sharp(path.join(SRC, b.q)).rotate();

    // Porträts: Die Serie ist durchgehend gleich gerahmt — der Kopf sitzt
    // bei rund 42 % der Breite und 18-27 % der Höhe, nicht in der Mitte.
    // Ein zentrierter Zuschnitt verfehlt ihn, deshalb wird der quadratische
    // Ausschnitt auf diese abgelesenen Werte gesetzt.
    if (b.f === "kopf") {
      const m = await sharp(path.join(SRC, b.q)).rotate().metadata();
      const seite = Math.round(m.height * 0.34);
      const mitteX = (b.kopfX ?? 0.42) * m.width;
      const mitteY = (b.kopfY ?? 0.21) * m.height;
      bild = bild.extract({
        left: Math.max(0, Math.min(m.width - seite, Math.round(mitteX - seite / 2))),
        top: Math.max(0, Math.min(m.height - seite, Math.round(mitteY - seite * 0.42))),
        width: seite,
        height: seite,
      });
    }

    await bild
      .resize(w * faktor, h * faktor, { fit: "cover", position })
      .webp({ quality: faktor === 2 ? 72 : 80 })
      .toFile(`${OUT}/${b.z}${faktor === 2 ? "@2x" : ""}.webp`);
  }
  console.log(`${b.z.padEnd(26)} ${b.f.padEnd(9)} ← ${b.q}`);
}

console.log(`\n${bilder.length} Bilder à 2 Auflösungen nach ${OUT}/ geschrieben.`);
