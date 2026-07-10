"use client";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapContainer, TileLayer, Marker } from "react-leaflet";

type City = { name: string; lat: number; lng: number };

/* Deployment cities — identical to the two country cards below the map. */
const CITIES: City[] = [
  // Österreich
  { name: "Wien", lat: 48.2082, lng: 16.3738 },
  { name: "Linz", lat: 48.3069, lng: 14.2858 },
  { name: "Salzburg", lat: 47.8095, lng: 13.055 },
  { name: "Graz", lat: 47.0707, lng: 15.4395 },
  { name: "Innsbruck", lat: 47.2692, lng: 11.4041 },
  // Deutschland
  { name: "München", lat: 48.1351, lng: 11.582 },
  { name: "Stuttgart", lat: 48.7758, lng: 9.1829 },
  { name: "Frankfurt", lat: 50.1109, lng: 8.6821 },
  { name: "Köln", lat: 50.9375, lng: 6.9603 },
  { name: "Berlin", lat: 52.52, lng: 13.405 },
  { name: "Hamburg", lat: 53.5511, lng: 9.9937 },
];

/* Centered on the DACH region so all cities sit within a tight, intentional
   frame (fitBounds would zoom out far enough to show all of Europe). */
const CENTER: [number, number] = [50.3, 11.4];
const DEFAULT_ZOOM = 6;

const prefersReducedMotion =
  typeof window !== "undefined" &&
  window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;

/** Gold brand pin with a soft pulse and a navy label — pure HTML/CSS. */
function pinIcon(name: string) {
  return L.divIcon({
    className: "uyer-pin-wrap",
    iconSize: [16, 16],
    iconAnchor: [8, 8],
    html: `<span class="uyer-pin">
      <span class="uyer-pin__pulse" aria-hidden="true"></span>
      <span class="uyer-pin__dot"></span>
      <span class="uyer-pin__label">${name}</span>
    </span>`,
  });
}

export default function MapCanvas() {
  return (
    <MapContainer
      center={CENTER}
      zoom={DEFAULT_ZOOM}
      minZoom={5}
      maxZoom={9}
      scrollWheelZoom={false}
      zoomAnimation={!prefersReducedMotion}
      fadeAnimation={!prefersReducedMotion}
      markerZoomAnimation={!prefersReducedMotion}
      className="h-full w-full"
      style={{ background: "var(--color-paper)" }}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> &copy; <a href="https://carto.com/attributions">CARTO</a>'
        subdomains="abcd"
        maxZoom={19}
      />
      {CITIES.map((c) => (
        <Marker
          key={c.name}
          position={[c.lat, c.lng]}
          icon={pinIcon(c.name)}
          keyboard={false}
          interactive={false}
        />
      ))}
    </MapContainer>
  );
}
