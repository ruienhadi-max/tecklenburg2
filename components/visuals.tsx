import { cx } from "./ui";

/**
 * Bildsprache-Layer.
 *
 * Bis echtes Bildmaterial vorliegt, trägt die Seite eine eigenständige,
 * abstrakte Visualsprache: Höhenlinien und weiche organische Flächen, die an
 * die Landschaft des Tecklenburger Landes erinnern — ruhig, erwachsen und
 * bewusst frei von Stockfotos mit lachenden Kindern.
 *
 * `PhotoFrame` markiert die Stellen, an denen später echte Fotografien
 * eingesetzt werden. Die Komponente ist so gestaltet, dass sie auch ohne
 * Bild vollwertig aussieht — und mit `src` sofort das Foto ausspielt.
 */

/** Höhenlinien-Feld. Dekorativ, daher aria-hidden. */
export function ContourField({
  className,
  tone = "light",
}: {
  className?: string;
  tone?: "light" | "dark";
}) {
  const stroke = tone === "dark" ? "rgb(198 228 161 / 0.16)" : "rgb(72 115 23 / 0.13)";
  return (
    <svg
      aria-hidden
      className={cx("pointer-events-none absolute", className)}
      viewBox="0 0 1200 700"
      preserveAspectRatio="xMidYMid slice"
      fill="none"
    >
      {Array.from({ length: 13 }).map((_, i) => {
        const offset = i * 46;
        return (
          <path
            key={i}
            d={`M-60 ${300 + offset} C 180 ${210 + offset * 0.82}, 360 ${400 + offset * 0.9}, 620 ${300 + offset * 0.72} S 1020 ${150 + offset * 0.6}, 1280 ${240 + offset * 0.66}`}
            stroke={stroke}
            strokeWidth={i % 4 === 0 ? 1.5 : 1}
          />
        );
      })}
    </svg>
  );
}

/** Weiche, verlaufende Fläche als Hintergrundakzent. */
export function AuraBlob({
  className,
  tone = "moss",
}: {
  className?: string;
  tone?: "moss" | "sage" | "pine";
}) {
  // Farbwerte gespiegelt aus @theme in globals.css.
  const colors = {
    moss: ["#74ad2e", "#487317"],
    sage: ["#a8d46a", "#8bc53e"],
    pine: ["#2b5827", "#142c17"],
  } as const;
  const [from, to] = colors[tone];
  const id = `aura-${tone}`;

  return (
    <svg
      aria-hidden
      className={cx("pointer-events-none absolute blur-3xl", className)}
      viewBox="0 0 400 400"
      fill="none"
    >
      <defs>
        <radialGradient id={id} cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor={from} stopOpacity="0.55" />
          <stop offset="100%" stopColor={to} stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx="200" cy="200" rx="200" ry="180" fill={`url(#${id})`} />
    </svg>
  );
}

const frameRatios = {
  portrait: "aspect-[4/5]",
  landscape: "aspect-[16/10]",
  square: "aspect-square",
  wide: "aspect-[21/9]",
} as const;

/**
 * Bildplatz mit fertiger Gestaltung.
 *
 * `caption` beschreibt das vorgesehene Motiv — das ist zugleich die
 * Regieanweisung für das spätere Fotoshooting und der Alt-Text-Entwurf.
 */
export function PhotoFrame({
  ratio = "landscape",
  caption,
  bild,
  alt,
  priority = false,
  tone = "sage",
  className,
  seed = 1,
}: {
  ratio?: keyof typeof frameRatios;
  caption?: string;
  /**
   * Dateiname in public/bilder ohne Endung. Die zugehörige @2x-Fassung wird
   * automatisch als srcSet ergänzt. Fehlt der Wert, erscheint die abstrakte
   * Ersatzgrafik mit `caption` als Regieanweisung fürs Shooting.
   */
  bild?: string;
  alt?: string;
  priority?: boolean;
  tone?: "sage" | "pine" | "mist";
  className?: string;
  seed?: number;
}) {
  const palettes = {
    sage: ["#e4f1d1", "#a8d46a", "#74ad2e"],
    pine: ["#224622", "#2b5827", "#5c9022"],
    mist: ["#f6faf1", "#e4f1d1", "#c6e4a1"],
  } as const;
  const [bg, mid, fg] = palettes[tone];

  return (
    <figure
      className={cx(
        "relative overflow-hidden rounded-[var(--radius-xl3)] hairline",
        frameRatios[ratio],
        className,
      )}
    >
      {bild ? (
        // Bewusst ohne next/image: Die Dateien liegen bereits in genau der
        // benötigten Größe und als WebP vor, eine zweite Optimierung brächte
        // nichts und würde nur Serverarbeit kosten.
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={`/bilder/${bild}.webp`}
          srcSet={`/bilder/${bild}.webp 1x, /bilder/${bild}@2x.webp 2x`}
          alt={alt ?? ""}
          className="h-full w-full object-cover"
          loading={priority ? "eager" : "lazy"}
          fetchPriority={priority ? "high" : undefined}
          decoding="async"
        />
      ) : (
        <>
          {/*
            Abstrakte Landschaft: geschichtete Horizonte, Höhenlinien und eine
            Lichtscheibe. Der `seed` verschiebt die Komposition, damit mehrere
            Bildplätze auf einer Seite nicht identisch wirken.
          */}
          <svg
            aria-hidden
            className="h-full w-full"
            viewBox="0 0 800 600"
            preserveAspectRatio="xMidYMid slice"
          >
            <defs>
              <linearGradient id={`sky-${tone}-${seed}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={bg} />
                <stop offset="100%" stopColor={mid} stopOpacity="0.35" />
              </linearGradient>
              <linearGradient id={`hill-${tone}-${seed}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={fg} stopOpacity="0.55" />
                <stop offset="100%" stopColor={fg} stopOpacity="0.22" />
              </linearGradient>
            </defs>

            <rect width="800" height="600" fill={`url(#sky-${tone}-${seed})`} />

            {/* Lichtscheibe */}
            <circle
              cx={560 - seed * 25}
              cy={150 + seed * 12}
              r="86"
              fill={bg}
              opacity="0.75"
            />

            {/* Höhenlinien im oberen Bereich */}
            <g opacity="0.55">
              {Array.from({ length: 7 }).map((_, i) => (
                <path
                  key={i}
                  d={`M-40 ${90 + i * 34 + seed * 9} C 180 ${40 + i * 30}, 380 ${170 + i * 26}, 560 ${100 + i * 32} S 780 ${50 + i * 28}, 860 ${95 + i * 30}`}
                  stroke={fg}
                  strokeWidth={i % 3 === 0 ? 1.8 : 1}
                  fill="none"
                  opacity="0.4"
                />
              ))}
            </g>

            {/* Geschichtete Horizonte */}
            <path
              d={`M-20 ${400 + seed * 8} C 160 ${340 + seed * 6}, 320 ${430}, 500 ${385} S 760 ${330}, 820 ${372} L820 620 L-20 620 Z`}
              fill={mid}
              opacity="0.45"
            />
            <path
              d={`M-20 ${470 + seed * 6} C 180 ${420}, 380 ${505}, 560 ${455} S 780 ${412}, 820 ${448} L820 620 L-20 620 Z`}
              fill={`url(#hill-${tone}-${seed})`}
            />
            <path
              d={`M-20 ${540} C 200 ${498 + seed * 5}, 420 ${560}, 620 ${520} S 800 ${498}, 820 ${512} L820 620 L-20 620 Z`}
              fill={fg}
              opacity="0.6"
            />
          </svg>
          {caption ? (
            <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-pine-900/70 to-transparent p-6 pt-14">
              <span className="text-[0.82rem] leading-snug font-medium text-white/90">
                {caption}
              </span>
            </figcaption>
          ) : null}
        </>
      )}
    </figure>
  );
}
