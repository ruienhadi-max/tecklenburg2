import { feature } from "topojson-client";
import { readFileSync, writeFileSync } from "node:fs";

/**
 * Erzeugt die Landumrisse für den Globus.
 *
 * Quelle ist der Natural-Earth-Datensatz 110m aus `world-atlas`. Der wird auf
 * das Nötige eingedampft: nur Landflächen, Koordinaten auf eine
 * Nachkommastelle gerundet, Ringe mit sehr wenigen Punkten oder winziger
 * Fläche entfernt. Bei einem Globus mit rund 300 px Durchmesser entspricht
 * eine Nachkommastelle deutlich weniger als einem Pixel — feiner aufzulösen
 * würde die Datei vergrößern, ohne sichtbar zu werden.
 *
 * Ergebnis ist eine reine Datendatei, die als Modul importiert wird. Damit
 * bleibt der Globus ohne Netzwerkanfrage und ohne Bibliothek zur Laufzeit.
 *
 * Aufruf: node globus-daten.mjs
 */

const topo = JSON.parse(
  readFileSync("node_modules/world-atlas/land-110m.json", "utf8"),
);
const land = feature(topo, topo.objects.land);

/** Grobe Flächenschätzung eines Rings in Quadratgrad. */
function flaeche(ring) {
  let s = 0;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    s += ring[j][0] * ring[i][1] - ring[i][0] * ring[j][1];
  }
  return Math.abs(s / 2);
}

const ringe = [];
for (const f of land.features) {
  const polygone =
    f.geometry.type === "Polygon" ? [f.geometry.coordinates] : f.geometry.coordinates;

  for (const polygon of polygone) {
    // Nur der äußere Ring — Löcher (Binnenseen) sind bei dieser Größe unsichtbar.
    const ring = polygon[0];
    if (ring.length < 5) continue;
    if (flaeche(ring) < 3) continue;

    const gerundet = ring.map(([x, y]) => [
      Math.round(x * 10) / 10,
      Math.round(y * 10) / 10,
    ]);

    // Aufeinanderfolgende Duplikate nach dem Runden entfernen.
    const knapp = gerundet.filter(
      (p, i) => i === 0 || p[0] !== gerundet[i - 1][0] || p[1] !== gerundet[i - 1][1],
    );
    if (knapp.length >= 4) ringe.push(knapp);
  }
}

ringe.sort((a, b) => flaeche(b) - flaeche(a));

const punkte = ringe.reduce((a, r) => a + r.length, 0);
const inhalt = `// Automatisch erzeugt von globus-daten.mjs — nicht von Hand bearbeiten.
// Natural Earth 110m, Landflächen, auf 0,1° gerundet.
// ${ringe.length} Ringe, ${punkte} Punkte.

/** Landumrisse als [Längengrad, Breitengrad]-Paare. */
export const landRinge: [number, number][][] = ${JSON.stringify(ringe)};
`;

writeFileSync("content/globus-land.ts", inhalt);
console.log(
  `content/globus-land.ts: ${ringe.length} Ringe, ${punkte} Punkte, ${(inhalt.length / 1024).toFixed(1)} KB`,
);
