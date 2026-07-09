import { ImageResponse } from "next/og";

export const alt = "Uyer Management – Personalvermittlung für Gebäudereinigung";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0E2A47",
          color: "#C6A15B",
          fontSize: 72,
          fontWeight: 700,
          letterSpacing: 4,
        }}
      >
        <div style={{ display: "flex" }}>UYER MANAGEMENT</div>
        <div style={{ display: "flex", fontSize: 28, color: "#F6F7F9", marginTop: 24 }}>
          Qualifiziertes Personal für die Gebäudereinigung
        </div>
        <div
          style={{
            display: "flex",
            width: 240,
            height: 2,
            background: "#C6A15B",
            marginTop: 32,
          }}
        />
      </div>
    ),
    size,
  );
}
