import { ImageResponse } from "next/og";

/** Fallback-Vorschaubild für alle Seiten ohne eigenes OG-Bild. */
export const alt = "Jugendhilfe Tecklenburg — Kinder- und Jugendhilfe im Kreis Steinfurt";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background:
            "radial-gradient(120% 80% at 10% 0%, #226b4c 0%, transparent 60%), radial-gradient(90% 70% at 100% 100%, #1c583f 0%, transparent 55%), #0b2d23",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              width: 18,
              height: 18,
              borderRadius: 999,
              background: "#6fae91",
            }}
          />
          <div
            style={{
              color: "#98c6ae",
              fontSize: 26,
              letterSpacing: 4,
              textTransform: "uppercase",
            }}
          >
            Hilfen zur Erziehung · SGB VIII
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              color: "#ffffff",
              fontSize: 78,
              lineHeight: 1.08,
              letterSpacing: -2,
              fontWeight: 600,
            }}
          >
            Jugendhilfe Tecklenburg
          </div>
          <div
            style={{
              color: "#c3ddcf",
              fontSize: 34,
              marginTop: 28,
              lineHeight: 1.3,
              maxWidth: 900,
            }}
          >
            Verlässliche Kinder- und Jugendhilfe mit Haltung, Fachlichkeit und
            Menschlichkeit.
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            color: "#98c6ae",
            fontSize: 24,
            borderTop: "1px solid rgba(255,255,255,0.15)",
            paddingTop: 32,
          }}
        >
          <span>Ibbenbüren · Kreis Steinfurt · NRW</span>
          <span>Wertschätzung · Struktur · Zukunft</span>
        </div>
      </div>
    ),
    size,
  );
}
