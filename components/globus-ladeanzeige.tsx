"use client";

import { useEffect, useState } from "react";
import { Globus } from "./globus";
import { standorte } from "@/content/globus";
import { cx } from "./ui";

/**
 * Ladeanzeige mit dem Globus.
 *
 * Unter der Kugel läuft die Liste der Standorte durch — dasselbe Motiv wie auf
 * der bestehenden Globus-Seite. Der Wechsel ist rein zeitgesteuert und
 * behauptet keinen Fortschritt, den wir nicht kennen.
 */
export function GlobusLadeanzeige({
  text = "Einen Moment bitte …",
  size = 180,
  className,
}: {
  text?: string;
  size?: number;
  className?: string;
}) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = setInterval(
      () => setIndex((i) => (i + 1) % standorte.length),
      1100,
    );
    return () => clearInterval(timer);
  }, []);

  return (
    <div
      role="status"
      aria-live="polite"
      className={cx("flex flex-col items-center justify-center gap-6", className)}
    >
      <Globus size={size} label="" />

      <div className="text-center">
        <p className="text-[0.95rem] font-medium text-pine-900">{text}</p>
        <p
          aria-hidden
          className="mt-1.5 text-[0.78rem] tracking-[0.16em] text-moss-600 uppercase tabular-nums"
        >
          {standorte[index].name}
        </p>
      </div>
    </div>
  );
}
