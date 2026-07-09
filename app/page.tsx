import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { IntroSplit } from "@/components/home/IntroSplit";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { Advantages } from "@/components/home/Advantages";
import { StaffCta } from "@/components/home/StaffCta";
import { CoverageMap } from "@/components/home/CoverageMap";

export const metadata: Metadata = {
  title: "Personalvermittlung für Gebäudereinigung in Österreich & Deutschland",
  description:
    "Uyer Management vermittelt qualifiziertes Reinigungspersonal an Unternehmen in Österreich & Deutschland – inklusive Dienstplänen, Lohnverrechnung und Vertragserstellung.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <IntroSplit />
      <ServicesGrid />
      <Advantages />
      <StaffCta />
      <CoverageMap />
    </>
  );
}
