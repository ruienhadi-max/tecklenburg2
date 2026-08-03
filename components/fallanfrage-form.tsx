"use client";

import { useState, type FormEvent } from "react";
import { useSearchParams } from "next/navigation";
import { cx, Check, Arrow } from "./ui";
import { GlobusLadeanzeige } from "./globus-ladeanzeige";
import { angebote } from "@/content/angebote";

/**
 * Fallanfrage-Formular für Jugendämter.
 *
 * Bewusst kurz gehalten: abgefragt wird nur, was für eine erste fachliche
 * Einschätzung nötig ist. Alles Weitere klärt das Telefonat. Pflichtfelder
 * sind auf ein Minimum reduziert — jedes zusätzliche Pflichtfeld kostet
 * messbar Anfragen.
 *
 * Datensparsamkeit: Es wird ausdrücklich darum gebeten, keine Klarnamen und
 * keine Gesundheitsdaten der jungen Menschen zu übermitteln.
 */

const dringlichkeiten = [
  { value: "akut", label: "Akut — Aufnahme innerhalb weniger Tage" },
  { value: "kurzfristig", label: "Kurzfristig — innerhalb von 2 bis 4 Wochen" },
  { value: "planbar", label: "Planbar — mittelfristige Perspektive" },
  { value: "vorabklaerung", label: "Vertrauliche Vorabklärung" },
];

type Status = "idle" | "sending" | "success" | "error";

const fieldClass =
  "w-full rounded-2xl border-0 bg-white px-5 py-3.5 text-[0.98rem] text-ink-800 shadow-[inset_0_0_0_1px_rgb(15_21_18/0.1)] outline-none transition-shadow placeholder:text-ink-300 focus:shadow-[inset_0_0_0_2px_var(--color-moss-500)]";

const labelClass = "mb-2 block text-[0.88rem] font-medium text-ink-700";

export function FallanfrageForm() {
  const searchParams = useSearchParams();
  const preselected = searchParams.get("angebot") ?? "";

  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setStatus("sending");
    setError(null);

    const form = event.currentTarget;
    const data = Object.fromEntries(new FormData(form).entries());

    try {
      const res = await fetch("/api/fallanfrage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!res.ok) {
        const body = await res.json().catch(() => null);
        throw new Error(body?.message ?? "Die Anfrage konnte nicht gesendet werden.");
      }

      setStatus("success");
      form.reset();
    } catch (err) {
      setStatus("error");
      setError(
        err instanceof Error
          ? err.message
          : "Die Anfrage konnte nicht gesendet werden.",
      );
    }
  }

  if (status === "sending") {
    return (
      <div className="flex min-h-[32rem] items-center justify-center rounded-[var(--radius-xl3)] bg-mist-50 p-10 hairline">
        <GlobusLadeanzeige text="Ihre Anfrage wird übermittelt …" size={200} />
      </div>
    );
  }

  if (status === "success") {
    return (
      <div className="rounded-[var(--radius-xl3)] bg-white p-10 text-center hairline sm:p-14">
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-sage-100 text-moss-600">
          <Check className="h-7 w-7" />
        </div>
        <h2 className="mt-7 text-[1.6rem] font-semibold text-pine-900">
          Ihre Anfrage ist eingegangen.
        </h2>
        <p className="prose-de mx-auto mt-4 max-w-lg leading-relaxed text-ink-600">
          Wir prüfen den Fall im Leitungsteam und melden uns werktags innerhalb von 48
          Stunden mit einer belastbaren Rückmeldung — Zusage, Absage oder einem
          Alternativvorschlag.
        </p>
        <p className="mt-6 text-[0.9rem] text-ink-500">
          Muss es schneller gehen? Rufen Sie uns direkt an.
        </p>
        <button
          type="button"
          onClick={() => setStatus("idle")}
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-mist-100 px-6 py-3 text-[0.92rem] font-medium text-pine-800 transition-colors hover:bg-sage-100"
        >
          Weitere Anfrage stellen
        </button>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      noValidate={false}
      className="rounded-[var(--radius-xl3)] bg-mist-50 p-8 hairline sm:p-10"
    >
      {/* Honeypot — für Menschen unsichtbar, für einfache Bots verlockend. */}
      <div aria-hidden className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="website">Bitte nicht ausfüllen</label>
        <input id="website" name="website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      {/* Kein disabled nötig: Während des Sendens rendert die Komponente
          oben die Ladeanzeige statt des Formulars. */}
      <fieldset className="space-y-8">
        <legend className="sr-only">Fallanfrage</legend>

        {/* Jugendamt */}
        <div>
          <h2 className="text-[0.78rem] font-semibold tracking-[0.14em] text-moss-600 uppercase">
            Ihre Angaben
          </h2>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="jugendamt" className={labelClass}>
                Jugendamt / Institution <span className="text-moss-600">*</span>
              </label>
              <input
                id="jugendamt"
                name="jugendamt"
                type="text"
                required
                autoComplete="organization"
                className={fieldClass}
                placeholder="z. B. Jugendamt Kreis Steinfurt"
              />
            </div>
            <div>
              <label htmlFor="name" className={labelClass}>
                Ihr Name <span className="text-moss-600">*</span>
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                autoComplete="name"
                className={fieldClass}
                placeholder="Vor- und Nachname"
              />
            </div>
            <div>
              <label htmlFor="email" className={labelClass}>
                E-Mail <span className="text-moss-600">*</span>
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                autoComplete="email"
                className={fieldClass}
                placeholder="name@jugendamt.de"
              />
            </div>
            <div>
              <label htmlFor="telefon" className={labelClass}>
                Telefon <span className="text-ink-400">(empfohlen)</span>
              </label>
              <input
                id="telefon"
                name="telefon"
                type="tel"
                autoComplete="tel"
                className={fieldClass}
                placeholder="Für schnelle Rückfragen"
              />
            </div>
          </div>
        </div>

        {/* Fall */}
        <div className="border-t border-ink-200/60 pt-8">
          <h2 className="text-[0.78rem] font-semibold tracking-[0.14em] text-moss-600 uppercase">
            Zum Fall
          </h2>
          <div className="mt-5 grid gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="angebot" className={labelClass}>
                Gewünschte Hilfeform
              </label>
              <select
                id="angebot"
                name="angebot"
                defaultValue={preselected}
                className={cx(fieldClass, "appearance-none bg-white pr-10")}
              >
                <option value="">Noch offen / bitte beraten</option>
                {angebote.map((a) => (
                  <option key={a.slug} value={a.slug}>
                    {a.title}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="dringlichkeit" className={labelClass}>
                Dringlichkeit <span className="text-moss-600">*</span>
              </label>
              <select
                id="dringlichkeit"
                name="dringlichkeit"
                required
                defaultValue=""
                className={cx(fieldClass, "appearance-none bg-white pr-10")}
              >
                <option value="" disabled>
                  Bitte wählen
                </option>
                {dringlichkeiten.map((d) => (
                  <option key={d.value} value={d.value}>
                    {d.label}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label htmlFor="alter" className={labelClass}>
                Alter des jungen Menschen <span className="text-moss-600">*</span>
              </label>
              <input
                id="alter"
                name="alter"
                type="text"
                required
                inputMode="numeric"
                className={fieldClass}
                placeholder="z. B. 14"
              />
            </div>
            <div>
              <label htmlFor="rechtsgrundlage" className={labelClass}>
                Rechtsgrundlage <span className="text-ink-400">(falls geklärt)</span>
              </label>
              <input
                id="rechtsgrundlage"
                name="rechtsgrundlage"
                type="text"
                className={fieldClass}
                placeholder="z. B. § 34 SGB VIII"
              />
            </div>
          </div>

          <div className="mt-5">
            <label htmlFor="situation" className={labelClass}>
              Kurze Falldarstellung <span className="text-moss-600">*</span>
            </label>
            <textarea
              id="situation"
              name="situation"
              required
              rows={6}
              className={cx(fieldClass, "resize-y")}
              placeholder="Anlass der Hilfe, bisheriger Hilfeverlauf, besondere Bedarfe, angestrebtes Ziel. Stichpunkte genügen."
            />
            <p className="mt-3 text-[0.85rem] leading-relaxed text-ink-500">
              Bitte übermitteln Sie an dieser Stelle{" "}
              <strong className="font-medium text-ink-700">keine Klarnamen</strong> und
              keine Gesundheitsdaten. Für personenbezogene Unterlagen stimmen wir im
              Telefonat einen sicheren Übermittlungsweg ab.
            </p>
          </div>
        </div>

        {/* Einwilligung */}
        <div className="border-t border-ink-200/60 pt-8">
          <label className="flex cursor-pointer gap-4">
            <input
              type="checkbox"
              name="einwilligung"
              required
              className="mt-1 h-5 w-5 shrink-0 rounded-md border-ink-300 text-moss-600 accent-[var(--color-moss-600)]"
            />
            <span className="text-[0.92rem] leading-relaxed text-ink-600">
              Ich bin damit einverstanden, dass meine Angaben zur Bearbeitung dieser
              Anfrage gespeichert und verarbeitet werden. Hinweise dazu finden sich in
              der{" "}
              <a
                href="/datenschutz"
                className="font-medium text-pine-800 underline underline-offset-4"
              >
                Datenschutzerklärung
              </a>
              . <span className="text-moss-600">*</span>
            </span>
          </label>
        </div>

        {error ? (
          <p
            role="alert"
            className="rounded-2xl bg-white px-5 py-4 text-[0.92rem] text-ink-700 shadow-[inset_0_0_0_1px_rgb(180_60_50/0.25)]"
          >
            {error} Bitte versuchen Sie es erneut oder rufen Sie uns an.
          </p>
        ) : null}

        <div className="flex flex-wrap items-center gap-5">
          <button
            type="submit"
            className="group inline-flex items-center gap-2.5 rounded-full bg-pine-800 px-8 py-4 font-medium text-white transition-all duration-300 hover:bg-pine-700 hover:shadow-[0_12px_28px_-14px_rgb(16_56_43/0.8)]"
          >
            Fallanfrage absenden
            <Arrow />
          </button>
          <p className="text-[0.88rem] text-ink-500">
            Rückmeldung werktags innerhalb von 48 Stunden.
          </p>
        </div>
      </fieldset>
    </form>
  );
}
