import type { Metadata, Viewport } from "next";
import "./globals.css";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { JsonLd, organizationLd, websiteLd } from "@/lib/jsonld";
import { site } from "@/content/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default:
      "Jugendhilfe Tecklenburg — Stationäre Kinder- und Jugendhilfe im Kreis Steinfurt",
    template: "%s — Jugendhilfe Tecklenburg",
  },
  description: site.shortDescription,
  applicationName: site.name,
  authors: [{ name: site.name }],
  creator: site.name,
  publisher: site.name,
  formatDetection: { telephone: true, address: true, email: true },
  keywords: [
    "Jugendhilfe Tecklenburg",
    "Kinder- und Jugendhilfe Tecklenburg",
    "stationäre Jugendhilfe NRW",
    "Jugendhilfe Münsterland",
    "Jugendhilfe Einrichtung NRW",
    "intensivpädagogische Betreuung",
    "individualpädagogische Maßnahmen",
    "Hilfe zur Erziehung",
    "SGB VIII",
    "Jugendhilfe Kreis Steinfurt",
    "Sozialpädagoge Jugendhilfe Stellenangebote",
    "pädagogische Fachkraft Jugendhilfe NRW",
  ],
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: site.name,
    url: site.url,
  },
  category: "Kinder- und Jugendhilfe",
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#142c17" },
  ],
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de">
      <body className="min-h-dvh bg-paper antialiased">
        <JsonLd data={[organizationLd(), websiteLd()]} />
        <SiteHeader />
        <main id="hauptinhalt">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
