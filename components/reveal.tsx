"use client";

import { useEffect, useRef, useState, type ElementType, type ReactNode } from "react";

/**
 * Blendet Inhalte beim Scrollen sehr dezent ein.
 *
 * Bewusst mit IntersectionObserver statt einer Animationsbibliothek:
 * kein zusätzliches Bundle, und Inhalte sind auch ohne JS sichtbar,
 * sobald `reveal` nicht angewendet werden kann.
 */
export function Reveal({
  children,
  delay = 0,
  as: Tag = "div",
  className,
}: {
  children: ReactNode;
  delay?: number;
  as?: ElementType;
  className?: string;
}) {
  const ref = useRef<HTMLElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Ohne Observer-Unterstützung sofort anzeigen statt dauerhaft verstecken.
    if (typeof IntersectionObserver === "undefined") {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.05 },
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <Tag
      ref={ref}
      className={["reveal", className].filter(Boolean).join(" ")}
      data-visible={visible ? "true" : "false"}
      style={{ "--reveal-delay": `${delay}ms` } as React.CSSProperties}
    >
      {children}
    </Tag>
  );
}
