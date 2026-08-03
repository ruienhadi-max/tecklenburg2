"use client";

import { useEffect, useRef } from "react";
import { landRinge } from "@/content/globus-land";
import { standorte, type Standort } from "@/content/globus";
import { cx } from "./ui";

/**
 * Rotierender Globus mit den Standorten der Individualpädagogik.
 *
 * Bewusst ohne 3D-Bibliothek und ohne Texturen: Die Vorlage der bestehenden
 * Seite lädt three.js und rund 2,5 MB Bildmaterial. Als Ladeelement wäre das
 * das langsamste Element der Seite. Diese Fassung zeichnet stattdessen mit
 * dem 2D-Kontext auf ein Canvas — orthografische Projektion, Küstenlinien aus
 * einem eingebetteten Datensatz, keine einzige Netzwerkanfrage zur Laufzeit.
 *
 * Bei `prefers-reduced-motion` steht der Globus still, statt zu rotieren.
 */

const GRAD = Math.PI / 180;

/** Neigung der Blickachse — zeigt die Nordhalbkugel leicht von oben. */
const NEIGUNG = 18 * GRAD;

type Punkt = { x: number; y: number; sichtbar: boolean };

/** Orthografische Projektion auf den Einheitskreis. */
function projiziere(lng: number, lat: number, drehung: number): Punkt {
  const λ = lng * GRAD - drehung;
  const φ = lat * GRAD;
  const cosφ = Math.cos(φ);
  const sinφ = Math.sin(φ);
  const cosλ = Math.cos(λ);

  return {
    x: cosφ * Math.sin(λ),
    y: Math.cos(NEIGUNG) * sinφ - Math.sin(NEIGUNG) * cosφ * cosλ,
    sichtbar: Math.sin(NEIGUNG) * sinφ + Math.cos(NEIGUNG) * cosφ * cosλ > 0,
  };
}

/**
 * Punkt auf dem Horizont zwischen einem sichtbaren und einem verdeckten Punkt.
 * Ohne diesen Schritt würden Landflächen am Rand mit geraden Sehnen
 * abgeschnitten statt der Kugelkontur zu folgen.
 */
function horizont(
  a: [number, number],
  b: [number, number],
  drehung: number,
): Punkt {
  let lo = 0;
  let hi = 1;
  for (let i = 0; i < 12; i++) {
    const m = (lo + hi) / 2;
    const p = projiziere(a[0] + (b[0] - a[0]) * m, a[1] + (b[1] - a[1]) * m, drehung);
    if (p.sichtbar) lo = m;
    else hi = m;
  }
  const t = (lo + hi) / 2;
  return projiziere(a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, drehung);
}

/** Punkt auf dem Großkreis zwischen zwei Orten, Anteil t. */
function grosskreis(
  a: Standort,
  b: Standort,
  t: number,
): [number, number] {
  const φ1 = a.lat * GRAD;
  const λ1 = a.lng * GRAD;
  const φ2 = b.lat * GRAD;
  const λ2 = b.lng * GRAD;

  const d =
    2 *
    Math.asin(
      Math.sqrt(
        Math.sin((φ2 - φ1) / 2) ** 2 +
          Math.cos(φ1) * Math.cos(φ2) * Math.sin((λ2 - λ1) / 2) ** 2,
      ),
    );
  if (d === 0) return [a.lng, a.lat];

  const A = Math.sin((1 - t) * d) / Math.sin(d);
  const B = Math.sin(t * d) / Math.sin(d);
  const x = A * Math.cos(φ1) * Math.cos(λ1) + B * Math.cos(φ2) * Math.cos(λ2);
  const y = A * Math.cos(φ1) * Math.sin(λ1) + B * Math.cos(φ2) * Math.sin(λ2);
  const z = A * Math.sin(φ1) + B * Math.sin(φ2);

  return [
    Math.atan2(y, x) / GRAD,
    Math.atan2(z, Math.sqrt(x * x + y * y)) / GRAD,
  ];
}

const sitz = standorte.find((s) => s.sitz) ?? standorte[0];
const ziele = standorte.filter((s) => !s.sitz);

export function Globus({
  size = 260,
  className,
  /** Beschriftung für Screenreader. Der Globus selbst ist rein dekorativ. */
  label = "Standorte der individualpädagogischen Maßnahmen",
}: {
  size?: number;
  className?: string;
  label?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const kontext = canvas.getContext("2d");
    if (!kontext) return;
    // Explizit typisiert, damit die Einengung auch in der Zeichenschleife gilt.
    const ctx: CanvasRenderingContext2D = kontext;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);

    const ruhig = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mitte = size / 2;
    const radius = size / 2 - 2;

    let drehung = -0.35;
    let laufend = true;
    let letzte = performance.now();
    let frame = 0;

    const zuBildschirm = (p: Punkt) => ({
      x: mitte + p.x * radius,
      y: mitte - p.y * radius,
    });

    function zeichne(zeit: number) {
      const dt = Math.min((zeit - letzte) / 1000, 0.1);
      letzte = zeit;
      if (!ruhig) drehung += dt * 0.16;

      ctx.clearRect(0, 0, size, size);

      // Kugelkörper
      const verlauf = ctx.createRadialGradient(
        mitte - radius * 0.35,
        mitte - radius * 0.4,
        radius * 0.1,
        mitte,
        mitte,
        radius,
      );
      verlauf.addColorStop(0, "#22461f");
      verlauf.addColorStop(1, "#0d2011");
      ctx.beginPath();
      ctx.arc(mitte, mitte, radius, 0, Math.PI * 2);
      ctx.fillStyle = verlauf;
      ctx.fill();

      ctx.save();
      ctx.clip();

      // Gradnetz
      ctx.strokeStyle = "rgba(168, 212, 106, 0.13)";
      ctx.lineWidth = 0.6;
      for (let lat = -60; lat <= 60; lat += 30) {
        ctx.beginPath();
        let ab = true;
        for (let lng = -180; lng <= 180; lng += 4) {
          const p = projiziere(lng, lat, drehung);
          if (!p.sichtbar) {
            ab = true;
            continue;
          }
          const s = zuBildschirm(p);
          if (ab) ctx.moveTo(s.x, s.y);
          else ctx.lineTo(s.x, s.y);
          ab = false;
        }
        ctx.stroke();
      }
      for (let lng = -180; lng < 180; lng += 30) {
        ctx.beginPath();
        let ab = true;
        for (let lat = -90; lat <= 90; lat += 4) {
          const p = projiziere(lng, lat, drehung);
          if (!p.sichtbar) {
            ab = true;
            continue;
          }
          const s = zuBildschirm(p);
          if (ab) ctx.moveTo(s.x, s.y);
          else ctx.lineTo(s.x, s.y);
          ab = false;
        }
        ctx.stroke();
      }

      // Landflächen
      ctx.fillStyle = "rgba(139, 197, 62, 0.82)";
      for (const ring of landRinge) {
        let offen = false;
        ctx.beginPath();
        for (let i = 0; i < ring.length; i++) {
          const vorher = ring[(i - 1 + ring.length) % ring.length];
          const p = projiziere(ring[i][0], ring[i][1], drehung);
          const vorherP = projiziere(vorher[0], vorher[1], drehung);

          if (p.sichtbar) {
            // Beim Eintritt zuerst den Punkt auf der Kontur setzen.
            if (!vorherP.sichtbar) {
              const h = zuBildschirm(horizont(ring[i], vorher, drehung));
              if (offen) ctx.lineTo(h.x, h.y);
              else ctx.moveTo(h.x, h.y);
              offen = true;
            }
            const s = zuBildschirm(p);
            if (offen) ctx.lineTo(s.x, s.y);
            else {
              ctx.moveTo(s.x, s.y);
              offen = true;
            }
          } else if (vorherP.sichtbar) {
            const h = zuBildschirm(horizont(vorher, ring[i], drehung));
            ctx.lineTo(h.x, h.y);
          }
        }
        if (offen) ctx.fill();
      }

      // Verbindungsbögen vom Sitz zu den Standorten
      ctx.lineWidth = 1.1;
      for (const ziel of ziele) {
        ctx.strokeStyle = "rgba(198, 228, 161, 0.5)";
        ctx.beginPath();
        let ab = true;
        for (let i = 0; i <= 48; i++) {
          const [lng, lat] = grosskreis(sitz, ziel, i / 48);
          const p = projiziere(lng, lat, drehung);
          if (!p.sichtbar) {
            ab = true;
            continue;
          }
          const s = zuBildschirm(p);
          if (ab) ctx.moveTo(s.x, s.y);
          else ctx.lineTo(s.x, s.y);
          ab = false;
        }
        ctx.stroke();
      }

      // Standortmarken
      const puls = ruhig ? 0.5 : (Math.sin(zeit / 620) + 1) / 2;
      for (const ort of standorte) {
        const p = projiziere(ort.lng, ort.lat, drehung);
        if (!p.sichtbar) continue;
        const s = zuBildschirm(p);
        const r = ort.sitz ? 3.4 : 2.4;

        ctx.beginPath();
        ctx.arc(s.x, s.y, r + puls * (ort.sitz ? 5 : 3.5), 0, Math.PI * 2);
        ctx.fillStyle = `rgba(139, 197, 62, ${0.28 * (1 - puls)})`;
        ctx.fill();

        ctx.beginPath();
        ctx.arc(s.x, s.y, r, 0, Math.PI * 2);
        ctx.fillStyle = ort.sitz ? "#ffffff" : "#c6e4a1";
        ctx.fill();
      }

      ctx.restore();

      // Kante und Lichtsaum
      ctx.beginPath();
      ctx.arc(mitte, mitte, radius, 0, Math.PI * 2);
      ctx.strokeStyle = "rgba(139, 197, 62, 0.4)";
      ctx.lineWidth = 1;
      ctx.stroke();

      if (laufend) frame = requestAnimationFrame(zeichne);
    }

    frame = requestAnimationFrame(zeichne);
    return () => {
      laufend = false;
      cancelAnimationFrame(frame);
    };
  }, [size]);

  return (
    <canvas
      ref={canvasRef}
      role="img"
      aria-label={label}
      style={{ width: size, height: size }}
      className={cx("block", className)}
    />
  );
}
