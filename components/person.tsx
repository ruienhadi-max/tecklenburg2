import type { Person } from "@/content/site";
import { cx } from "./ui";

/**
 * Porträt einer Person. Liegt kein Foto vor, erscheinen die Initialen —
 * so bleibt das Raster geschlossen, auch wenn jemand neu dazukommt.
 */
export function Portrait({
  person,
  size = 96,
  className,
}: {
  person: Person;
  size?: number;
  className?: string;
}) {
  if (!person.foto) {
    return (
      <div
        style={{ width: size, height: size }}
        className={cx(
          "flex shrink-0 items-center justify-center rounded-full bg-mist-100 font-semibold text-pine-700",
          className,
        )}
      >
        <span style={{ fontSize: size * 0.3 }}>{person.initials}</span>
      </div>
    );
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={`/bilder/${person.foto}.webp`}
      srcSet={`/bilder/${person.foto}.webp 1x, /bilder/${person.foto}@2x.webp 2x`}
      alt={`${person.name}, ${person.role}`}
      width={size}
      height={size}
      loading="lazy"
      decoding="async"
      className={cx("shrink-0 rounded-full object-cover", className)}
      style={{ width: size, height: size }}
    />
  );
}

/** Kachel für das Teamraster. */
export function PersonCard({ person }: { person: Person }) {
  return (
    <div className="group flex h-full flex-col rounded-[var(--radius-xl3)] bg-white p-7 text-center hairline">
      <Portrait
        person={person}
        size={112}
        className="mx-auto transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-[1.04]"
      />
      <h3 className="mt-5 text-[1.08rem] leading-tight font-semibold text-pine-900">
        {person.name}
      </h3>
      {person.rolleOffen ? (
        // Sichtbar als Platzhalter gekennzeichnet, damit die fehlende
        // Funktionsbezeichnung nicht unbemerkt live geht.
        <p
          className="mt-1.5 text-[0.9rem] text-ink-400 italic"
          title="Platzhalter — Funktionsbezeichnung liegt noch nicht vor"
        >
          {person.role}
        </p>
      ) : (
        <p className="mt-1.5 text-[0.9rem] text-moss-600">{person.role}</p>
      )}
      {person.focus ? (
        <p className="mt-2 flex-1 text-[0.85rem] leading-relaxed text-ink-500">
          {person.focus}
        </p>
      ) : (
        <div className="flex-1" />
      )}
      {person.phoneDisplay ? (
        <a
          href={`tel:${person.phone?.replace(/\s/g, "")}`}
          className="mt-4 text-[0.9rem] font-medium text-pine-800 transition-colors hover:text-moss-600"
        >
          {person.phoneDisplay}
        </a>
      ) : null}
    </div>
  );
}
