import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { StartCta } from "@/components/shared/StartCta";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { AnimatedSection } from "@/components/motion/AnimatedSection";

export const metadata: Metadata = {
  title: "Leistungen – Personalservice & Auftragsvermittlung",
  description:
    "Personalvermittlung, Dienst- & Arbeitspläne, Lohnverrechnung, Vertragserstellung und Auftragsvermittlung – das Leistungsspektrum von Uyer Management.",
};

export default function LeistungenPage() {
  return (
    <>
      <PageHero
        title="Unsere Leistungen"
        subtitle="Personalservice & Auftragsvermittlung – unser Leistungsangebot"
        image="/images/hero-services.jpg"
      />
      <ServicesGrid detailed />
      <Section tone="surface" aria-labelledby="together-heading">
        <Container>
          <AnimatedSection className="mx-auto max-w-3xl text-center">
            <h2 id="together-heading" className="font-display text-3xl font-semibold">
              Gemeinsam Erfolg gestalten
            </h2>
            <p className="mt-5 font-body leading-7 text-muted">
              Weil gute Zusammenarbeit den Unterschied macht: Wir verstehen uns
              nicht als reiner Vermittler, sondern als langfristiger Partner.
              Unsere Kunden profitieren von kurzen Wegen, klarer Kommunikation
              und Lösungen, die zu ihrem Betrieb passen.
            </p>
          </AnimatedSection>
        </Container>
      </Section>
      <StartCta />
    </>
  );
}
