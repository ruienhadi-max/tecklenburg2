import Link from "next/link";
import type { ReactNode } from "react";
import { Container, Eyebrow, cx } from "./ui";
import { ContourField, AuraBlob } from "./visuals";

export type Crumb = { name: string; path: string };

/**
 * Einheitlicher Seitenkopf für alle Unterseiten.
 * Hält Rhythmus und Typografie über die gesamte Site konstant.
 */
export function PageHero({
  eyebrow,
  title,
  lead,
  crumbs,
  actions,
  tone = "light",
  aside,
}: {
  eyebrow: string;
  title: ReactNode;
  lead?: ReactNode;
  crumbs?: Crumb[];
  actions?: ReactNode;
  tone?: "light" | "deep";
  aside?: ReactNode;
}) {
  const isDeep = tone === "deep";

  return (
    <section
      className={cx(
        "relative overflow-hidden",
        isDeep ? "surface-deep grain text-sage-100" : "bg-paper",
      )}
    >
      <ContourField
        className="inset-0 h-full w-full"
        tone={isDeep ? "dark" : "light"}
      />
      {!isDeep ? (
        <AuraBlob className="-top-52 -right-40 h-[34rem] w-[34rem]" tone="sage" />
      ) : null}

      <Container width="wide" className="relative">
        <div
          className={cx(
            "pt-12 pb-16 sm:pt-16 sm:pb-20 lg:pt-20 lg:pb-24",
            aside && "grid gap-12 lg:grid-cols-12 lg:gap-16",
          )}
        >
          <div className={cx(aside && "lg:col-span-7")}>
            {crumbs?.length ? (
              <nav aria-label="Breadcrumb" className="mb-8">
                <ol className="flex flex-wrap items-center gap-2 text-[0.82rem]">
                  {crumbs.map((c, i) => (
                    <li key={c.path} className="flex items-center gap-2">
                      {i > 0 ? (
                        <span
                          aria-hidden
                          className={isDeep ? "text-sage-300/40" : "text-ink-300"}
                        >
                          /
                        </span>
                      ) : null}
                      {i === crumbs.length - 1 ? (
                        <span
                          aria-current="page"
                          className={isDeep ? "text-sage-200" : "text-ink-500"}
                        >
                          {c.name}
                        </span>
                      ) : (
                        <Link
                          href={c.path}
                          className={cx(
                            "transition-colors",
                            isDeep
                              ? "text-sage-300/70 hover:text-white"
                              : "text-ink-400 hover:text-pine-800",
                          )}
                        >
                          {c.name}
                        </Link>
                      )}
                    </li>
                  ))}
                </ol>
              </nav>
            ) : null}

            {/* Bewusst ohne Scroll-Reveal: der Seitenkopf ist immer im Viewport
                und darf die größte Textdarstellung (LCP) nicht verzögern. */}
            <Eyebrow tone={isDeep ? "light" : "dark"}>{eyebrow}</Eyebrow>

            <h1
              className={cx(
                "max-w-4xl text-[2.05rem] leading-[1.1] font-semibold tracking-[-0.026em] sm:text-[2.9rem] lg:text-[3.6rem]",
                isDeep ? "text-white" : "text-pine-950",
              )}
            >
              {title}
            </h1>

            {lead ? (
              <p
                className={cx(
                  "prose-de mt-7 max-w-2xl text-lg leading-relaxed sm:text-xl",
                  isDeep ? "text-sage-100/80" : "text-ink-600",
                )}
              >
                {lead}
              </p>
            ) : null}

            {actions ? (
              <div className="mt-10 flex flex-wrap items-center gap-4">{actions}</div>
            ) : null}
          </div>

          {aside ? <div className="lg:col-span-5">{aside}</div> : null}
        </div>
      </Container>
    </section>
  );
}
