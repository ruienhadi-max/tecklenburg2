import type { Metadata } from "next";
import { site } from "@/content/site";

type PageMetaInput = {
  title: string;
  description: string;
  path: string;
  keywords?: string[];
  /** Für Stellenanzeigen und Detailseiten sinnvoll. */
  type?: "website" | "article";
};

/**
 * Einheitliche Metadaten inkl. Canonical und Open Graph.
 * Das OG-Bild wird von app/opengraph-image.tsx generiert und greift
 * für alle Seiten, die kein eigenes Bild definieren.
 */
export function pageMetadata({
  title,
  description,
  path,
  keywords,
  type = "website",
}: PageMetaInput): Metadata {
  const url = path === "/" ? site.url : `${site.url}${path}`;

  return {
    title,
    description,
    keywords,
    alternates: { canonical: url },
    openGraph: {
      type,
      url,
      siteName: site.name,
      title: `${title} — ${site.name}`,
      description,
      locale: "de_DE",
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — ${site.name}`,
      description,
    },
  };
}
