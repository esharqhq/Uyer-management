"use client";

import dynamic from "next/dynamic";

/* Leaflet touches `window` at import, so the map is client-only. */
const MapCanvas = dynamic(() => import("./MapCanvas"), {
  ssr: false,
  loading: () => (
    <div
      className="h-full w-full animate-pulse bg-line/60"
      aria-hidden="true"
    />
  ),
});

export function CoverageMapView() {
  return (
    <div className="relative h-105 w-full overflow-hidden rounded-xl ring-1 ring-line shadow-sm sm:h-130 z-40">
      <MapCanvas />
    </div>
  );
}
