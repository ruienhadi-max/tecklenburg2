import Image from "next/image";
import Link from "next/link";
import { cx } from "./ui";

/**
 * Wort-Bild-Marke der Einrichtung.
 *
 * Quelle ist die einzige verfügbare Logodatei (266 × 83 px). Sie wurde
 * freigestellt und liegt in zwei Fassungen vor:
 *   public/logo.png         — Schrift in Markenschwarz, für helle Flächen
 *   public/logo-invers.png  — Schrift in Weiß, Signet bleibt grün, für dunkle Flächen
 *
 * Die Anzeigebreite bleibt bewusst unter der halben Originalbreite, damit die
 * Marke auf Retina-Displays scharf bleibt. Sobald eine Vektorfassung vorliegt,
 * genügt es, hier auf die SVG-Datei zu wechseln.
 */

const ORIGINAL = { width: 266, height: 83 } as const;

export function Logo({
  tone = "dark",
  className = "w-[136px] sm:w-[162px]",
  priority = false,
}: {
  /** "dark" = Marke auf hellem Grund, "light" = Marke auf dunklem Grund. */
  tone?: "dark" | "light";
  /** Steuert die Breite; die Höhe folgt über `h-auto`. */
  className?: string;
  priority?: boolean;
}) {
  return (
    <Image
      src={tone === "light" ? "/logo-invers.png" : "/logo.png"}
      alt="Jugendhilfe Tecklenburg"
      width={ORIGINAL.width}
      height={ORIGINAL.height}
      priority={priority}
      unoptimized
      className={cx("h-auto", className)}
    />
  );
}

export function Wordmark({
  tone = "dark",
  className,
  logoClassName,
  href = "/",
  priority = false,
}: {
  tone?: "dark" | "light";
  className?: string;
  logoClassName?: string;
  href?: string;
  priority?: boolean;
}) {
  return (
    <Link
      href={href}
      className={cx(
        "inline-flex shrink-0 items-center transition-opacity duration-300 hover:opacity-80",
        className,
      )}
      aria-label="Jugendhilfe Tecklenburg — zur Startseite"
    >
      <Logo tone={tone} priority={priority} {...(logoClassName ? { className: logoClassName } : {})} />
    </Link>
  );
}
