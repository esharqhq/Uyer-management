"use client";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { MapContainer, TileLayer, Marker } from "react-leaflet";

type City = { name: string; lat: number; lng: number };

/* Head office — Meydan Grandstand, Nad Al Sheba, Dubai. */
const CITIES: City[] = [
  { name: "Uyer Management", lat: 25.1587, lng: 55.302 },
];

/* Centered on the Dubai head office with enough city context to read. */
const CENTER: [number, number] = [25.1587, 55.302];
const DEFAULT_ZOOM = 11;

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
      minZoom={3}
      maxZoom={16}
      scrollWheelZoom={false}
      zoomAnimation={!prefersReducedMotion}
      fadeAnimation={!prefersReducedMotion}
      markerZoomAnimation={!prefersReducedMotion}
      className="h-full w-full"
      style={{ background: "#e9e7e2" }}
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
