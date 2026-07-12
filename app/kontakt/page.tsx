import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { ContactBlock } from "@/components/contact/ContactBlock";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { AnimatedSection } from "@/components/motion/AnimatedSection";
import { CoverageMapView } from "@/components/home/coverage-map/CoverageMapView";

export const metadata: Metadata = {
  title: "Kontakt aufnehmen",
  description:
    "Kontaktieren Sie Uyer Management – telefonisch, per WhatsApp oder E-Mail. Mo–Fr 07:00–17:00.",
};

export default function KontaktPage() {
  return (
    <>
      <PageHero
        title="Kontakt aufnehmen"
        subtitle="Wir freuen uns auf Ihre Anfrage – telefonisch, per WhatsApp oder E-Mail."
        image="/images/kontakt.jpg"
      />
      <ContactBlock />
      <Section tone="wash" aria-labelledby="map-heading">
        <Container>
          <AnimatedSection className="mx-auto max-w-2xl text-center">
            <p className="font-body text-sm font-semibold uppercase tracking-[0.2em] text-navy">
              Einsatzgebiete
            </p>
            <h2 id="map-heading" className="mt-3 font-display text-3xl font-semibold">
              Wo wir für Sie im Einsatz sind
            </h2>
            <p className="mt-4 font-body leading-7 text-muted">
              Mit Schwerpunkt in Österreich und Deutschland vermitteln wir
              qualifiziertes Reinigungspersonal genau dort, wo Sie es brauchen.
            </p>
          </AnimatedSection>
          <AnimatedSection className="mt-10">
            <CoverageMapView />
          </AnimatedSection>
        </Container>
      </Section>
    </>
  );
}
