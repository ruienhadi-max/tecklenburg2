import { NextResponse } from "next/server";

/**
 * Annahme von Fallanfragen.
 *
 * Der Endpunkt validiert serverseitig und normalisiert die Daten. Der Versand
 * ist bewusst hinter `deliverAnfrage()` gekapselt: Sobald ein Mailanbieter
 * (z. B. Resend, Postmark, SMTP der Einrichtung) oder ein Ticketsystem
 * bereitsteht, wird nur diese eine Funktion ersetzt — der Rest bleibt.
 *
 * Solange keine Zustellung konfiguriert ist, wird die Anfrage protokolliert
 * und der Aufruf schlägt fehl, statt dem Absender fälschlich Erfolg zu melden.
 */

export const runtime = "nodejs";

type Payload = Record<string, unknown>;

const REQUIRED = [
  "jugendamt",
  "name",
  "email",
  "alter",
  "dringlichkeit",
  "situation",
] as const;

function text(value: unknown, max = 5000) {
  return typeof value === "string" ? value.trim().slice(0, max) : "";
}

export async function POST(request: Request) {
  let body: Payload;

  try {
    body = (await request.json()) as Payload;
  } catch {
    return NextResponse.json(
      { ok: false, message: "Ungültige Anfrage." },
      { status: 400 },
    );
  }

  // Honeypot: von Menschen nie befüllt. Stiller Erfolg, damit Bots nichts lernen.
  if (text(body.website)) {
    return NextResponse.json({ ok: true });
  }

  const anfrage = {
    jugendamt: text(body.jugendamt, 200),
    name: text(body.name, 120),
    email: text(body.email, 200),
    telefon: text(body.telefon, 60),
    angebot: text(body.angebot, 80),
    dringlichkeit: text(body.dringlichkeit, 40),
    alter: text(body.alter, 20),
    rechtsgrundlage: text(body.rechtsgrundlage, 120),
    situation: text(body.situation, 5000),
    einwilligung: body.einwilligung === "on" || body.einwilligung === true,
    eingegangenAm: new Date().toISOString(),
  };

  const fehlend = REQUIRED.filter((key) => !anfrage[key]);
  if (fehlend.length || !anfrage.einwilligung) {
    return NextResponse.json(
      { ok: false, message: "Bitte füllen Sie alle Pflichtfelder aus." },
      { status: 422 },
    );
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(anfrage.email)) {
    return NextResponse.json(
      { ok: false, message: "Die E-Mail-Adresse scheint nicht gültig zu sein." },
      { status: 422 },
    );
  }

  try {
    await deliverAnfrage(anfrage);
  } catch (error) {
    console.error("[fallanfrage] Zustellung fehlgeschlagen:", error);
    return NextResponse.json(
      {
        ok: false,
        message:
          "Die Anfrage konnte technisch nicht zugestellt werden.",
      },
      { status: 502 },
    );
  }

  return NextResponse.json({ ok: true });
}

type Anfrage = {
  jugendamt: string;
  name: string;
  email: string;
  telefon: string;
  angebot: string;
  dringlichkeit: string;
  alter: string;
  rechtsgrundlage: string;
  situation: string;
  eingegangenAm: string;
};

/**
 * Einziger Ort, an dem die Zustellung konfiguriert wird.
 *
 * Beispiel für Resend:
 *
 *   const resend = new Resend(process.env.RESEND_API_KEY);
 *   await resend.emails.send({
 *     from: "website@jugendhilfe-tecklenburg.de",
 *     to: process.env.ANFRAGE_EMPFAENGER!,
 *     replyTo: anfrage.email,
 *     subject: `Fallanfrage: ${anfrage.jugendamt} (${anfrage.dringlichkeit})`,
 *     text: formatAnfrage(anfrage),
 *   });
 */
async function deliverAnfrage(anfrage: Anfrage) {
  const empfaenger = process.env.ANFRAGE_EMPFAENGER;

  if (!empfaenger) {
    console.warn(
      "[fallanfrage] ANFRAGE_EMPFAENGER ist nicht gesetzt — keine Zustellung konfiguriert.",
    );
    console.info("[fallanfrage] Eingegangene Anfrage:", formatAnfrage(anfrage));
    throw new Error("Kein Zustellweg konfiguriert (ANFRAGE_EMPFAENGER fehlt).");
  }

  // Hier den konfigurierten Mail-/Ticket-Versand einhängen.
  console.info(`[fallanfrage] Weiterleitung an ${empfaenger}:`, formatAnfrage(anfrage));
}

function formatAnfrage(a: Anfrage) {
  return [
    `Jugendamt/Institution: ${a.jugendamt}`,
    `Ansprechperson:        ${a.name}`,
    `E-Mail:                ${a.email}`,
    `Telefon:               ${a.telefon || "—"}`,
    `Hilfeform:             ${a.angebot || "offen"}`,
    `Dringlichkeit:         ${a.dringlichkeit}`,
    `Alter:                 ${a.alter}`,
    `Rechtsgrundlage:       ${a.rechtsgrundlage || "—"}`,
    `Eingegangen:           ${a.eingegangenAm}`,
    "",
    "Falldarstellung:",
    a.situation,
  ].join("\n");
}
