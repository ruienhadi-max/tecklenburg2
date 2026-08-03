"use client";

import { useState } from "react";
import { cx } from "./ui";

/**
 * Einwandbehandlung als Accordion.
 * Nutzt bewusst Buttons statt <details>, damit der geöffnete Zustand
 * kontrolliert bleibt und die Höhe sauber animiert werden kann.
 */
export function Accordion({
  items,
  tone = "dark",
}: {
  items: { frage: string; antwort: string }[];
  tone?: "dark" | "light";
}) {
  const [open, setOpen] = useState<number | null>(0);
  const isLight = tone === "light";

  return (
    <div
      className={cx(
        "divide-y",
        isLight ? "divide-white/12 border-y border-white/12" : "divide-ink-100 border-y border-ink-100",
      )}
    >
      {items.map((item, i) => {
        const expanded = open === i;
        return (
          <div key={item.frage}>
            <h3>
              <button
                type="button"
                onClick={() => setOpen(expanded ? null : i)}
                aria-expanded={expanded}
                aria-controls={`accordion-panel-${i}`}
                className="flex w-full items-start justify-between gap-6 py-6 text-left"
              >
                <span
                  className={cx(
                    "text-[1.08rem] font-medium transition-colors",
                    isLight
                      ? expanded
                        ? "text-white"
                        : "text-sage-100/85"
                      : expanded
                        ? "text-pine-900"
                        : "text-ink-800",
                  )}
                >
                  {item.frage}
                </span>
                <span
                  aria-hidden
                  className={cx(
                    "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-all duration-300",
                    isLight ? "bg-white/10 text-sage-200" : "bg-mist-100 text-moss-600",
                    expanded && "rotate-45",
                  )}
                >
                  <svg
                    viewBox="0 0 16 16"
                    className="h-3.5 w-3.5"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    strokeLinecap="round"
                  >
                    <path d="M8 3v10M3 8h10" />
                  </svg>
                </span>
              </button>
            </h3>
            <div
              id={`accordion-panel-${i}`}
              hidden={!expanded}
              className="grid pb-7"
            >
              <p
                className={cx(
                  "prose-de max-w-3xl leading-relaxed",
                  isLight ? "text-sage-100/75" : "text-ink-600",
                )}
              >
                {item.antwort}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
