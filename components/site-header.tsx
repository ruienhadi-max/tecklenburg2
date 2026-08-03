"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Wordmark } from "./brand";
import { Container, cx, Arrow } from "./ui";
import { mainNav } from "@/lib/nav";
import { site } from "@/content/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Menü nach Navigation schließen und Body-Scroll wieder freigeben.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <>
      <a
        href="#hauptinhalt"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-full focus:bg-pine-800 focus:px-5 focus:py-3 focus:text-sm focus:text-white"
      >
        Zum Hauptinhalt springen
      </a>

      {/* Servicezeile: für Jugendämter zählt die direkte Erreichbarkeit. */}
      <div className="hidden bg-pine-900 text-sage-200 lg:block">
        <Container width="wide">
          <div className="flex h-9 items-center justify-between text-[0.78rem]">
            <p className="tracking-[0.02em]">
              Aufnahmeanfragen von Jugendämtern: Rückmeldung werktags innerhalb von 48
              Stunden
            </p>
            <div className="flex items-center gap-6">
              <a
                href={`tel:${site.contact.phone.replace(/\s/g, "")}`}
                className="transition-colors hover:text-white"
              >
                {site.contact.phoneDisplay}
              </a>
              <span aria-hidden className="h-3 w-px bg-sage-300/25" />
              <a
                href={`mailto:${site.contact.email}`}
                className="transition-colors hover:text-white"
              >
                {site.contact.email}
              </a>
            </div>
          </div>
        </Container>
      </div>

      <header
        className={cx(
          "sticky top-0 z-50 transition-all duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          scrolled || open
            ? "bg-white/80 backdrop-blur-xl backdrop-saturate-150 shadow-[0_1px_0_rgb(15_21_18/0.07)]"
            : "bg-white",
        )}
      >
        <Container width="wide">
          <div className="flex h-[4.5rem] items-center justify-between gap-8">
            <Wordmark />

            <nav
              aria-label="Hauptnavigation"
              className="hidden items-center gap-0.5 xl:flex"
            >
              {mainNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  aria-current={isActive(item.href) ? "page" : undefined}
                  className={cx(
                    "relative rounded-full px-3.5 py-2 text-[0.9rem] font-medium whitespace-nowrap transition-colors duration-200",
                    isActive(item.href)
                      ? "text-pine-800"
                      : "text-ink-600 hover:text-pine-800",
                  )}
                >
                  {item.short ?? item.label}
                  {isActive(item.href) ? (
                    <span
                      aria-hidden
                      className="absolute inset-x-3.5 -bottom-0.5 h-[2px] rounded-full bg-moss-500"
                    />
                  ) : null}
                </Link>
              ))}
            </nav>

            <div className="flex items-center gap-2">
              <Link
                href="/karriere"
                className="hidden rounded-full px-4 py-2.5 text-[0.9rem] font-medium text-pine-800 transition-colors hover:bg-mist-100 md:inline-flex xl:hidden"
              >
                Karriere
              </Link>
              <Link
                href="/fallanfrage"
                className="group hidden items-center gap-2 rounded-full bg-pine-800 px-5 py-2.5 text-[0.9rem] font-medium whitespace-nowrap text-white transition-all duration-300 hover:bg-pine-700 hover:shadow-[0_12px_28px_-14px_rgb(16_56_43/0.8)] sm:inline-flex"
              >
                Fallanfrage stellen
                <Arrow />
              </Link>

              <button
                type="button"
                onClick={() => setOpen((v) => !v)}
                aria-expanded={open}
                aria-controls="mobile-navigation"
                className="-mr-2 inline-flex h-11 w-11 items-center justify-center rounded-full text-pine-900 transition-colors hover:bg-mist-100 xl:hidden"
              >
                <span className="sr-only">
                  {open ? "Menü schließen" : "Menü öffnen"}
                </span>
                <svg
                  aria-hidden
                  viewBox="0 0 24 24"
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.6"
                  strokeLinecap="round"
                >
                  {open ? (
                    <path d="M6 6l12 12M18 6L6 18" />
                  ) : (
                    <path d="M3 7h18M3 12h18M3 17h18" />
                  )}
                </svg>
              </button>
            </div>
          </div>
        </Container>

        {/* Mobile Navigation */}
        <div
          id="mobile-navigation"
          hidden={!open}
          className="max-h-[calc(100dvh-4.5rem)] overflow-y-auto border-t border-ink-100 bg-white xl:hidden"
        >
          <Container className="py-6">
            <nav aria-label="Mobile Navigation" className="flex flex-col">
              {mainNav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cx(
                    "flex flex-col gap-0.5 border-b border-ink-100 py-4 last:border-0 sm:flex-row sm:items-baseline sm:justify-between sm:gap-4",
                    isActive(item.href) ? "text-pine-800" : "text-ink-800",
                  )}
                >
                  <span className="text-[1.05rem] font-medium">{item.label}</span>
                  {item.description ? (
                    <span className="text-[0.78rem] text-ink-400 sm:text-right">
                      {item.description}
                    </span>
                  ) : null}
                </Link>
              ))}
            </nav>

            <div className="mt-6 grid gap-3">
              <Link
                href="/fallanfrage"
                className="inline-flex items-center justify-center rounded-full bg-pine-800 px-6 py-3.5 font-medium text-white"
              >
                Fallanfrage stellen
              </Link>
              <Link
                href="/karriere"
                className="inline-flex items-center justify-center rounded-full bg-mist-100 px-6 py-3.5 font-medium text-pine-800"
              >
                Offene Stellen ansehen
              </Link>
            </div>

            <div className="mt-6 space-y-1 text-[0.9rem] text-ink-500">
              <a
                href={`tel:${site.contact.phone.replace(/\s/g, "")}`}
                className="block"
              >
                {site.contact.phoneDisplay}
              </a>
              <a href={`mailto:${site.contact.email}`} className="block">
                {site.contact.email}
              </a>
            </div>
          </Container>
        </div>
      </header>
    </>
  );
}
