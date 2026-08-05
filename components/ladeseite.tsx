"use client";

import { useEffect, useRef, useState } from "react";
import { Weltkugel } from "./weltkugel";
import { standorte } from "@/content/globus";
import { Logo } from "./brand";
import { cx } from "./ui";

/**
 * Ganzflächige Ladeseite mit der Weltkugel.
 *
 * Wird beim Aufruf der Startseite angezeigt und beim Absenden der Fallanfrage.
 *
 * Zur Umsetzung:
 * - Die Überlagerung wird bereits serverseitig gerendert, damit die Startseite
 *   nicht kurz aufblitzt, bevor sie verdeckt wird.
 * - Der Seiteninhalt bleibt vollständig im Dokument; die Überlagerung liegt nur
 *   darüber. Suchmaschinen sehen also weiterhin die gesamte Seite.
 * - Sie verschwindet, sobald die Kugel das erste Bild gezeichnet hat und eine
 *   Mindestdauer verstrichen ist — spätestens aber nach `maxDauer`. Ohne diese
 *   Obergrenze bliebe die Seite bei fehlendem WebGL hängen.
 * - „Überspringen“ und die Esc-Taste beenden sie sofort. Eine Ladeseite, die
 *   man nicht wegklicken kann, ist eine Barriere.
 */

/**
 * Mindestdauer der Anzeige. Die Texturen sind meist nach deutlich unter einer
 * Sekunde da — ohne diese Untergrenze wäre die Kugel nur ein Aufblitzen und
 * würde gar nicht als Auftritt wahrgenommen.
 */
const MIN_DAUER = 2500;

/** Notausstieg, falls die Kugel nie meldet (kein WebGL, Textur fehlt). */
const MAX_DAUER = 5000;

export function Ladeseite({
  text = "Jugendhilfe Tecklenburg",
  unterzeile = "Einen Moment bitte …",
  /** Steuert die Anzeige von außen. Ohne Wert blendet sie sich selbst aus. */
  offen,
  onFertig,
  className,
}: {
  text?: string;
  unterzeile?: string;
  offen?: boolean;
  onFertig?: () => void;
  className?: string;
}) {
  const gesteuert = offen !== undefined;
  const [selbstSichtbar, setSelbstSichtbar] = useState(true);
  const [verlassend, setVerlassend] = useState(false);
  const [index, setIndex] = useState(0);
  const bereitRef = useRef(false);
  const startRef = useRef<number>(0);

  const sichtbar = gesteuert ? offen : selbstSichtbar;

  // Startzeit erst im Browser setzen, nicht beim Serverrendern.
  useEffect(() => {
    startRef.current = performance.now();
  }, []);

  function schliesse() {
    if (gesteuert) {
      onFertig?.();
      return;
    }
    setVerlassend(true);
    // Erst nach der Ausblendung aus dem Dokument nehmen.
    window.setTimeout(() => {
      setSelbstSichtbar(false);
      onFertig?.();
    }, 520);
  }

  /** Wird von der Kugel gemeldet, sobald das erste Bild steht. */
  function kugelBereit() {
    if (bereitRef.current) return;
    bereitRef.current = true;
    if (gesteuert) return;
    const verstrichen = performance.now() - startRef.current;
    window.setTimeout(schliesse, Math.max(0, MIN_DAUER - verstrichen));
  }

  // Notausstieg: Die Ladeseite darf unter keinen Umständen stehen bleiben.
  useEffect(() => {
    if (gesteuert || !selbstSichtbar) return;
    const timer = window.setTimeout(schliesse, MAX_DAUER);
    return () => window.clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gesteuert, selbstSichtbar]);

  // Esc beendet die Ladeseite.
  useEffect(() => {
    if (!sichtbar || gesteuert) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") schliesse();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sichtbar, gesteuert]);

  // Scrollsperre, solange die Ladeseite liegt.
  useEffect(() => {
    if (!sichtbar) return;
    const vorher = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = vorher;
    };
  }, [sichtbar]);

  // Standortnamen durchlaufen lassen.
  useEffect(() => {
    if (!sichtbar) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(
      () => setIndex((i) => (i + 1) % standorte.length),
      900,
    );
    return () => window.clearInterval(timer);
  }, [sichtbar]);

  if (!sichtbar) return null;

  return (
    <>
      {/* Ohne JavaScript gäbe es niemanden, der die Ladeseite wieder entfernt. */}
      <noscript>
        <style>{`#ladeseite{display:none !important}`}</style>
      </noscript>

      <div
        id="ladeseite"
        role="status"
        aria-live="polite"
        aria-label={unterzeile}
        // Sehr tiefer Grund statt der üblichen surface-deep-Fläche: Der
        // grüne Verlauf würde mit der dunklen Kugel konkurrieren.
        style={{
          background:
            "radial-gradient(120% 90% at 50% 42%, #102a16 0%, #071409 55%, #040d06 100%)",
        }}
        className={cx(
          "grain fixed inset-0 z-[200] flex flex-col items-center justify-center gap-8 px-6 transition-opacity duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          verlassend ? "pointer-events-none opacity-0" : "opacity-100",
          className,
        )}
      >
        <Logo tone="light" className="w-[150px]" />

        <Weltkugel size={340} onReady={kugelBereit} className="max-w-[70vw]" />

        <div className="text-center">
          <p className="text-[1.05rem] font-medium text-white">{text}</p>
          <p className="mt-1 text-[0.9rem] text-sage-200/70">{unterzeile}</p>
          <p
            aria-hidden
            className="mt-4 text-[0.78rem] tracking-[0.18em] text-sage-300 uppercase"
          >
            {standorte[index].name}
          </p>
        </div>

        {!gesteuert ? (
          <button
            type="button"
            onClick={schliesse}
            className="absolute right-6 bottom-6 rounded-full px-5 py-2.5 text-[0.85rem] font-medium text-sage-200 transition-colors hairline-invert hover:bg-white/10 hover:text-white"
          >
            Überspringen
          </button>
        ) : null}
      </div>
    </>
  );
}
