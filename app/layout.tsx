import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { site } from "@/content/site";

// Montserrat now drives both headings and body — heavier weights carry the
// display role (see --font-display / --font-body in globals.css).
const body = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-montserrat",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.uyermanagement.com"),
  title: {
    default: "Uyer Management – Personalvermittlung für Gebäudereinigung",
    template: "%s | Uyer Management",
  },
  description:
    "Qualifiziertes Personal für die Gebäudereinigung in Österreich & Deutschland. Personalvermittlung, Dienstpläne, Lohnverrechnung und mehr.",
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: "Uyer Management",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "EmploymentAgency",
    name: site.name,
    legalName: site.legalName,
    url: site.url,
    telephone: site.phone,
    email: site.email,
    address: {
      "@type": "PostalAddress",
      streetAddress: site.address.street,
      addressLocality: site.address.city,
      addressCountry: "AE",
    },
    areaServed: ["AT", "DE"],
    openingHours: "Mo-Fr 07:00-17:00",
  };

  return (
    <html lang="de" className={body.variable} suppressContentEditableWarning={true}>
      <body className="flex min-h-screen flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
