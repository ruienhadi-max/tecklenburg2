import Link from "next/link";
import { cx } from "./ui";

/**
 * Wortmarke mit Signet. Das Signet kombiniert zwei Bögen: eine schützende
 * Form und ein aufstrebendes Blatt — Sicherheit und Entwicklung in einem
 * Zeichen, ohne bildhafte Kinderdarstellung.
 */
/** Größe wird immer von außen gesetzt, damit keine konkurrierenden
 *  Tailwind-Größenklassen im selben class-Attribut landen. */
export function Mark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      role="img"
      aria-label="Signet Jugendhilfe Tecklenburg"
    >
      <path
        d="M20 3.5c7.2 3.1 11.5 4.2 15.5 4.4v13.2c0 7.9-6 13.4-15.5 15.9C10.5 34.5 4.5 29 4.5 21.1V7.9C8.5 7.7 12.8 6.6 20 3.5Z"
        fill="currentColor"
        opacity="0.12"
      />
      <path
        d="M20 3.5c7.2 3.1 11.5 4.2 15.5 4.4v13.2c0 7.9-6 13.4-15.5 15.9C10.5 34.5 4.5 29 4.5 21.1V7.9C8.5 7.7 12.8 6.6 20 3.5Z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path
        d="M20 29.5V16.8"
        stroke="currentColor"
        strokeWidth="1.9"
        strokeLinecap="round"
      />
      <path
        d="M20 17.4c0-4.2 2.6-6.9 6.6-7.6.5 4.6-1.9 7.9-6.6 7.6Z"
        fill="currentColor"
      />
      <path
        d="M20 22.2c0-3.3-2.1-5.5-5.3-6.1-.4 3.7 1.5 6.3 5.3 6.1Z"
        fill="currentColor"
        opacity="0.55"
      />
    </svg>
  );
}

export function Wordmark({
  tone = "dark",
  className,
  href = "/",
}: {
  tone?: "dark" | "light";
  className?: string;
  href?: string;
}) {
  return (
    <Link
      href={href}
      className={cx("group flex items-center gap-3", className)}
      aria-label="Jugendhilfe Tecklenburg — zur Startseite"
    >
      <Mark
        className={cx(
          "h-8 w-8 shrink-0 transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105 sm:h-9 sm:w-9",
          tone === "light" ? "text-sage-200" : "text-pine-700",
        )}
      />
      <span className="leading-tight">
        <span
          className={cx(
            "block text-[0.95rem] font-semibold tracking-[-0.015em] whitespace-nowrap sm:text-[1.02rem]",
            tone === "light" ? "text-white" : "text-pine-900",
          )}
        >
          Jugendhilfe Tecklenburg
        </span>
        {/* Auf sehr schmalen Displays weggelassen — der Name trägt allein. */}
        <span
          className={cx(
            "hidden text-[0.68rem] font-medium tracking-[0.12em] whitespace-nowrap uppercase sm:block",
            tone === "light" ? "text-sage-300/80" : "text-ink-400",
          )}
        >
          Hilfen zur Erziehung · SGB VIII
        </span>
      </span>
    </Link>
  );
}
