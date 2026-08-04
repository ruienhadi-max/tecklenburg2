"use client";

import { useEffect, useRef, useState } from "react";
import { standorte } from "@/content/globus";
import { cx } from "./ui";

/**
 * Fotorealistische Weltkugel — die Vorlage von der bestehenden Globus-Seite.
 *
 * Aufbau: eine texturierte Kugel (Blue Marble als Farbkarte, Relief als
 * Bumpmap, Wasserflächen als Glanzkarte), darüber eine leicht größere
 * Wolkenkugel, die etwas schneller dreht. Dazu Marken an den Standorten und
 * Großkreisbögen vom Verwaltungssitz aus.
 *
 * Die Texturen liegen unter public/globus als WebP (zusammen 435 KB statt der
 * ursprünglichen 2,5 MB). three.js wird dynamisch geladen, damit es nicht im
 * Haupt-Bundle landet.
 *
 * `onReady` meldet, sobald alle Texturen dekodiert und das erste Bild
 * gezeichnet ist — daran hängt das Ausblenden der Ladeseite.
 */

const GRAD = Math.PI / 180;
const RADIUS = 100;

/** Kartesische Position auf der Kugel aus Längen- und Breitengrad. */
function aufKugel(lat: number, lng: number, hoehe = 0) {
  const φ = (90 - lat) * GRAD;
  const θ = (lng + 180) * GRAD;
  const r = RADIUS + hoehe;
  return [
    -r * Math.sin(φ) * Math.cos(θ),
    r * Math.cos(φ),
    r * Math.sin(φ) * Math.sin(θ),
  ] as const;
}

export function Weltkugel({
  size = 420,
  className,
  onReady,
}: {
  size?: number;
  className?: string;
  onReady?: () => void;
}) {
  const halterRef = useRef<HTMLDivElement>(null);
  const readyRef = useRef(onReady);
  readyRef.current = onReady;

  const [fehler, setFehler] = useState(false);

  useEffect(() => {
    const halter = halterRef.current;
    if (!halter) return;

    let abbruch = false;
    let aufraeumen: (() => void) | undefined;

    (async () => {
      let THREE: typeof import("three");
      try {
        THREE = await import("three");
      } catch {
        if (!abbruch) {
          setFehler(true);
          readyRef.current?.();
        }
        return;
      }
      if (abbruch) return;

      const szene = new THREE.Scene();
      const kamera = new THREE.PerspectiveCamera(34, 1, 1, 2000);
      kamera.position.set(0, 60, 420);
      kamera.lookAt(0, 0, 0);

      let renderer: import("three").WebGLRenderer;
      try {
        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      } catch {
        // Kein WebGL — die Ladeseite darf daran nicht hängen bleiben.
        if (!abbruch) {
          setFehler(true);
          readyRef.current?.();
        }
        return;
      }

      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.setSize(size, size, false);
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      halter.appendChild(renderer.domElement);

      // Licht: eine Sonne von schräg vorn, dazu etwas Grundhelligkeit,
      // damit die Nachtseite nicht vollständig absäuft.
      szene.add(new THREE.AmbientLight(0xbcd9ff, 0.55));
      const sonne = new THREE.DirectionalLight(0xffffff, 2.1);
      sonne.position.set(-380, 180, 420);
      szene.add(sonne);

      const lader = new THREE.TextureLoader();
      const ladeTextur = (pfad: string, srgb = false) =>
        new Promise<import("three").Texture>((res, rej) => {
          lader.load(
            pfad,
            (t) => {
              if (srgb) t.colorSpace = THREE.SRGBColorSpace;
              t.anisotropy = renderer.capabilities.getMaxAnisotropy();
              res(t);
            },
            undefined,
            rej,
          );
        });

      let karte, relief, wasser, wolken;
      try {
        [karte, relief, wasser, wolken] = await Promise.all([
          ladeTextur("/globus/erde.webp", true),
          ladeTextur("/globus/erde-relief.webp"),
          ladeTextur("/globus/erde-wasser.webp"),
          ladeTextur("/globus/erde-wolken.webp", true),
        ]);
      } catch {
        if (!abbruch) {
          setFehler(true);
          readyRef.current?.();
        }
        renderer.dispose();
        return;
      }
      if (abbruch) {
        renderer.dispose();
        return;
      }

      const erde = new THREE.Mesh(
        new THREE.SphereGeometry(RADIUS, 72, 48),
        new THREE.MeshPhongMaterial({
          map: karte,
          bumpMap: relief,
          bumpScale: 6,
          specularMap: wasser,
          specular: new THREE.Color(0x2a3a4a),
          shininess: 14,
        }),
      );
      szene.add(erde);

      const wolkenKugel = new THREE.Mesh(
        new THREE.SphereGeometry(RADIUS * 1.012, 64, 40),
        new THREE.MeshPhongMaterial({
          map: wolken,
          transparent: true,
          opacity: 0.38,
          depthWrite: false,
        }),
      );
      szene.add(wolkenKugel);

      // Atmosphäre: eine leicht größere Kugel, von innen gezeichnet, deren
      // Rand über den Blickwinkel aufleuchtet.
      const atmosphaere = new THREE.Mesh(
        new THREE.SphereGeometry(RADIUS * 1.14, 64, 40),
        new THREE.ShaderMaterial({
          transparent: true,
          side: THREE.BackSide,
          blending: THREE.AdditiveBlending,
          vertexShader: `
            varying vec3 vNormal;
            void main() {
              vNormal = normalize(normalMatrix * normal);
              gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }`,
          fragmentShader: `
            varying vec3 vNormal;
            void main() {
              float saum = pow(0.62 - dot(vNormal, vec3(0.0, 0.0, 1.0)), 2.4);
              gl_FragColor = vec4(0.34, 0.58, 0.92, 1.0) * saum;
            }`,
        }),
      );
      szene.add(atmosphaere);

      // Standortmarken und Verbindungsbögen drehen mit der Erde mit.
      const aufbauten = new THREE.Group();
      erde.add(aufbauten);

      const sitz = standorte.find((s) => s.sitz) ?? standorte[0];

      for (const ort of standorte) {
        const [x, y, z] = aufKugel(ort.lat, ort.lng, 1);
        const marke = new THREE.Mesh(
          new THREE.SphereGeometry(ort.sitz ? 3.2 : 2.2, 16, 12),
          new THREE.MeshBasicMaterial({
            color: ort.sitz ? 0xffffff : 0x8bc53e,
          }),
        );
        marke.position.set(x, y, z);
        aufbauten.add(marke);

        const halo = new THREE.Mesh(
          new THREE.SphereGeometry(ort.sitz ? 6.5 : 5, 16, 12),
          new THREE.MeshBasicMaterial({
            color: 0x8bc53e,
            transparent: true,
            opacity: 0.22,
            depthWrite: false,
          }),
        );
        halo.position.set(x, y, z);
        aufbauten.add(halo);

        if (ort.sitz) continue;

        // Bogen als Kurve über der Oberfläche — Höhe nach Entfernung.
        const von = new THREE.Vector3(...aufKugel(sitz.lat, sitz.lng, 1));
        const nach = new THREE.Vector3(x, y, z);
        const winkel = von.angleTo(nach);
        const punkte: import("three").Vector3[] = [];
        for (let i = 0; i <= 40; i++) {
          const t = i / 40;
          const p = new THREE.Vector3()
            .copy(von)
            .lerp(nach, t)
            .normalize()
            .multiplyScalar(
              RADIUS + 1 + Math.sin(Math.PI * t) * winkel * RADIUS * 0.28,
            );
          punkte.push(p);
        }
        aufbauten.add(
          new THREE.Line(
            new THREE.BufferGeometry().setFromPoints(punkte),
            new THREE.LineBasicMaterial({
              color: 0xc6e4a1,
              transparent: true,
              opacity: 0.55,
            }),
          ),
        );
      }

      // Startdrehung so, dass Europa und Afrika im Blick sind.
      erde.rotation.y = -1.9;
      wolkenKugel.rotation.y = -1.9;
      erde.rotation.z = 12 * GRAD;
      wolkenKugel.rotation.z = 12 * GRAD;

      const ruhig = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      let frame = 0;
      let gemeldet = false;
      let letzte = performance.now();

      function schleife(zeit: number) {
        const dt = Math.min((zeit - letzte) / 1000, 0.1);
        letzte = zeit;

        if (!ruhig) {
          erde.rotation.y += dt * 0.11;
          wolkenKugel.rotation.y += dt * 0.135;
        }

        renderer.render(szene, kamera);

        if (!gemeldet) {
          gemeldet = true;
          readyRef.current?.();
        }
        frame = requestAnimationFrame(schleife);
      }
      frame = requestAnimationFrame(schleife);

      aufraeumen = () => {
        cancelAnimationFrame(frame);
        renderer.dispose();
        [karte, relief, wasser, wolken].forEach((t) => t.dispose());
        szene.traverse((o) => {
          const m = o as import("three").Mesh;
          m.geometry?.dispose?.();
          const mat = m.material;
          if (Array.isArray(mat)) mat.forEach((x) => x.dispose());
          else mat?.dispose?.();
        });
        renderer.domElement.remove();
      };
    })();

    return () => {
      abbruch = true;
      aufraeumen?.();
    };
  }, [size]);

  if (fehler) {
    // Ersatz ohne WebGL: ein ruhiger Kreis in Markenfarben.
    return (
      <div
        style={{ width: size, height: size }}
        className={cx(
          "animate-pulse rounded-full bg-[radial-gradient(circle_at_35%_30%,#2c8460,#0d2011)]",
          className,
        )}
      />
    );
  }

  return (
    <div
      ref={halterRef}
      style={{ width: size, height: size }}
      role="img"
      aria-label="Rotierende Weltkugel mit den Standorten der Jugendhilfe Tecklenburg"
      className={cx("relative", className)}
    />
  );
}
