"use client";

import { useState } from "react";
import { cx } from "./ui";

/**
 * YouTube-Einbettung nach dem Zwei-Klick-Prinzip.
 *
 * Vor dem Klick lädt die Seite nichts von Google: Es erscheint nur ein lokal
 * gespeichertes Standbild. Erst wenn jemand aktiv startet, wird der iframe
 * eingehängt — über youtube-nocookie.com und mit `autoplay`, damit der Klick
 * nicht doppelt nötig ist.
 *
 * Das erhält die Cookie- und Trackingfreiheit der übrigen Seite: Ohne
 * Interaktion entsteht kein Drittanbieter-Kontakt, der eine Einwilligung
 * erfordern würde.
 */
export function VideoEinbettung({
  videoId,
  titel,
  standbild,
  className,
}: {
  videoId: string;
  titel: string;
  /** Dateiname in public/bilder ohne Endung. */
  standbild: string;
  className?: string;
}) {
  const [gestartet, setGestartet] = useState(false);

  return (
    <figure className={cx("group relative", className)}>
      <div className="relative aspect-video overflow-hidden rounded-[var(--radius-xl3)] bg-pine-900 hairline">
        {gestartet ? (
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`}
            title={titel}
            allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="absolute inset-0 h-full w-full border-0"
          />
        ) : (
          <button
            type="button"
            onClick={() => setGestartet(true)}
            className="absolute inset-0 h-full w-full cursor-pointer"
          >
            <span className="sr-only">
              Video „{titel}“ abspielen — dabei wird eine Verbindung zu YouTube
              hergestellt
            </span>

            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={`/bilder/${standbild}.webp`}
              srcSet={`/bilder/${standbild}.webp 1x, /bilder/${standbild}@2x.webp 2x`}
              alt=""
              aria-hidden
              loading="lazy"
              decoding="async"
              className="h-full w-full object-cover transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.03]"
            />

            <span
              aria-hidden
              className="absolute inset-0 bg-gradient-to-t from-pine-950/70 via-pine-950/10 to-transparent"
            />

            <span
              aria-hidden
              className="absolute top-1/2 left-1/2 flex h-20 w-20 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white/95 shadow-[var(--shadow-lift)] transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-110"
            >
              <svg viewBox="0 0 24 24" className="ml-1 h-8 w-8 fill-pine-800">
                <path d="M8 5.5v13l11-6.5z" />
              </svg>
            </span>

            <span
              aria-hidden
              className="absolute inset-x-0 bottom-0 flex flex-col gap-1 p-6 text-left sm:p-8"
            >
              <span className="text-[1.05rem] font-semibold text-white sm:text-[1.2rem]">
                {titel}
              </span>
              <span className="text-[0.82rem] text-sage-200/85">
                Video ansehen — wird erst auf Klick von YouTube geladen
              </span>
            </span>
          </button>
        )}
      </div>

      <figcaption className="mt-3 text-[0.82rem] leading-relaxed text-ink-500">
        Beim Start wird das Video von YouTube (Google Ireland Limited) geladen.
        Dabei werden Ihre IP-Adresse und Geräteinformationen an YouTube
        übertragen. Näheres in unserer{" "}
        <a
          href="/datenschutz"
          className="font-medium text-pine-800 underline underline-offset-4"
        >
          Datenschutzerklärung
        </a>
        .
      </figcaption>
    </figure>
  );
}
