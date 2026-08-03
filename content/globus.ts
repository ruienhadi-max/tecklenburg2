/**
 * Standorte für den Globus.
 *
 * Übernommen aus der bestehenden Globus-Seite der Einrichtung. Neben dem
 * Verwaltungssitz sind das die Länder, in denen individualpädagogische
 * Maßnahmen durchgeführt werden.
 */

export type Standort = {
  name: string;
  /** Längengrad, Ostwerte positiv. */
  lng: number;
  /** Breitengrad, Nordwerte positiv. */
  lat: number;
  /** Der Verwaltungssitz wird hervorgehoben und ist Ausgangspunkt aller Bögen. */
  sitz?: boolean;
};

export const standorte: Standort[] = [
  { name: "Ibbenbüren", lng: 7.71, lat: 52.28, sitz: true },
  { name: "Portugal", lng: -8.2, lat: 39.5 },
  { name: "Spanien", lng: -3.7, lat: 40.4 },
  { name: "Italien", lng: 12.5, lat: 42.5 },
  { name: "Ungarn", lng: 19.5, lat: 47.2 },
  { name: "Polen", lng: 19.1, lat: 52.1 },
  { name: "Estland", lng: 25.5, lat: 58.6 },
  { name: "Namibia", lng: 17.1, lat: -22.6 },
];
