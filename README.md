# Jugendhilfe Tecklenburg — Website

Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4.
Alle Seiten werden statisch vorgerendert; dynamisch ist nur der Formular-Endpunkt.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
npm start
```

## Inhalte pflegen

Sämtliche Texte liegen in typisierten Dateien unter `content/`. Es gibt keine
Texte, die nur in Komponenten stehen — eine Änderung dort wirkt überall
(Seiten, Navigation, Metadaten, strukturierte Daten).

| Datei | Inhalt |
| --- | --- |
| `content/site.ts` | Adressen, Rufnummern, E-Mail, Leitung, Team-Zusammensetzung |
| `content/angebote.ts` | Die drei Hilfeformen inkl. Detailseiten und Ansprechpartner:innen |
| `content/konzept.ts` | Haltung, Grundsätze, Werte, Historie, Qualitätssicherung |
| `content/jugendaemter.ts` | Kennzahlen, Aufnahmeprozess, Einwandbehandlung, Unterlagenliste |
| `content/karriere.ts` | Stellenanzeigen, Benefits, Arbeitsalltag, Bewerbungsprozess |
| `lib/nav.ts` | Navigationspunkte |

Eine neue Stelle anlegen: Eintrag in `content/karriere.ts` ergänzen — Detailseite,
Übersicht, Sitemap und `JobPosting`-Auszeichnung entstehen automatisch. Dasselbe
gilt für ein neues Angebot in `content/angebote.ts`.

### Umstellung auf ein CMS

Die Content-Dateien exportieren reine Daten mit klaren Typen. Für ein Headless-CMS
(Sanity, Payload, Storyblok) genügt es, die Exporte durch einen `async`-Fetch zu
ersetzen; die Seitenkomponenten bleiben unverändert.

## Fallanfrage-Formular

`app/api/fallanfrage/route.ts` validiert serverseitig (Pflichtfelder, E-Mail-Format,
Honeypot gegen Bots). Der Versand steckt gekapselt in `deliverAnfrage()`.

**Vor dem Livegang zu erledigen:** `ANFRAGE_EMPFAENGER` setzen (siehe `.env.example`)
und in `deliverAnfrage()` den Mailversand einhängen — im Code ist ein Resend-Beispiel
als Kommentar hinterlegt. Solange nichts konfiguriert ist, antwortet der Endpunkt
bewusst mit einem Fehler, statt Absender:innen einen Eingang vorzutäuschen.

## SEO

- Pro Seite Title, Description und Canonical über `lib/seo.ts`
- Strukturierte Daten in `lib/jsonld.tsx`: `NGO`/`SocialService`, `WebSite`,
  `Service` je Angebot, `JobPosting` je Stelle, `FAQPage`, `BreadcrumbList`
- `app/sitemap.ts` und `app/robots.ts` erzeugen sich aus den Content-Dateien
- Open-Graph-Bild wird in `app/opengraph-image.tsx` gerendert

**Vor dem Livegang:** `site.url` in `content/site.ts` auf die Zieldomain setzen —
davon hängen Canonicals, Sitemap und JSON-LD ab.

## Logo und Farbwelt

Quelle ist die einzige verfügbare Logodatei: **266 × 83 px, PNG auf weißem Grund** —
dieselbe Fassung liegt auch auf der bestehenden Website. Sie wurde freigestellt und
liegt in zwei Fassungen vor:

| Datei | Verwendung |
| --- | --- |
| `public/logo.png` | Schrift in Markenschwarz — helle Flächen, Header |
| `public/logo-invers.png` | Schrift in Weiß, Signet bleibt grün — dunkle Flächen, Footer |
| `app/icon.png`, `app/apple-icon.png` | Signet allein (Reiher über Burgtor) |

Die Anzeigebreite bleibt bewusst unter der halben Originalbreite, damit die Marke auf
Retina-Displays scharf bleibt. **Eine Vektorfassung (SVG, EPS oder AI) beim Gestalter
anfragen** — damit ließe sich das Logo in jeder Größe scharf ausspielen und die
Aufbereitung in `public/` entfiele.

Die Farbpalette in `app/globals.css` ist am Logo ausgerichtet:

- **`#8bc53e`** (Token `sage-400`) ist exakt das Markengrün. Es hat auf Weiß nur 2:1
  Kontrast und wird deshalb ausschließlich als Flächen- und Grafikakzent eingesetzt.
- **`moss-600` `#487317`** ist die dunkelste Stufe desselben Farbtons und die einzige,
  die als Textfarbe auf hellem Grund zulässig ist (5,6:1).
- Alle Grünstufen folgen dem Farbton des Logos (86°). Die tiefen `pine`-Töne für dunkle
  Sektionen sind bewusst warm gehalten, damit das Logo nicht als Fremdkörper wirkt.
- **`ink-900` `#231f20`** ist das Schwarz aus der Wortmarke.

Alle Text-/Hintergrund-Paare wurden gegen WCAG AA (4,5:1) geprüft.

## Bildsprache

Statt Stockfotos trägt die Seite eine eigene abstrakte Visualsprache
(`components/visuals.tsx`): Höhenlinien und geschichtete Horizonte, angelehnt an die
Landschaft des Tecklenburger Landes.

`<PhotoFrame>` markiert jede Stelle, an der später ein echtes Foto steht. Das Attribut
`caption` beschreibt das vorgesehene Motiv und dient zugleich als Regieanweisung fürs
Shooting. Sobald Bilder vorliegen: `src` und `alt` ergänzen — das Layout bleibt gleich.

## Datenschutz

Die Seite lädt keine externen Ressourcen: keine Cookies, keine Google Fonts, keine
Kartendienste, kein Tracking. Deshalb ist kein Consent-Banner nötig. Wird später ein
externer Dienst eingebunden, müssen `app/datenschutz/page.tsx` und die
Consent-Frage neu bewertet werden.

## Offene Punkte vor dem Livegang

- `site.url` auf die Zieldomain setzen
- `ANFRAGE_EMPFAENGER` konfigurieren und Mailversand einhängen
- Anschriften prüfen: `office` (Waldfrieden 15) und `legalAddress`
  (Käthe-Kollwitz-Straße 31) stammen aus unterschiedlichen Quellen der Altseite
- Die E-Mail-Adressen `aufnahme@` und `bewerbung@` in `content/site.ts` sind
  Vorschläge und aktuell nirgends verlinkt — einrichten oder entfernen
- Kennzahlen („48 h“, „24/7“, freie Plätze im Hero) fachlich bestätigen lassen
- Impressum und Datenschutzerklärung juristisch prüfen lassen
- Vektorfassung des Logos besorgen (aktuell nur 266 × 83 px verfügbar)
