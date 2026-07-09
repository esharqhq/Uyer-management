import type { Metadata } from "next";
import { Cinzel, Poppins } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-cinzel",
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.uyermanagement.com"),
  title: {
    default: "Uyer Management – Personalvermittlung für Gebäudereinigung",
    template: "%s | Uyer Management",
  },
  description:
    "Qualifiziertes Personal für die Gebäudereinigung in Österreich & Deutschland. Personalvermittlung, Dienstpläne, Lohnverrechnung und mehr.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de" className={`${cinzel.variable} ${poppins.variable}`}>
      <body>{children}</body>
    </html>
  );
}
