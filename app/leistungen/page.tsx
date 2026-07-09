import type { Metadata } from "next";
import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
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
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <AnimatedSection stagger={0.12}>
            <p className="font-body text-sm font-semibold uppercase tracking-[0.2em] text-navy">
              Partnerschaft
            </p>
            <h2 id="together-heading" className="mt-3 font-display text-3xl font-semibold">
              Gemeinsam Erfolg gestalten
            </h2>
            <p className="mt-5 font-body leading-7 text-muted">
              Weil gute Zusammenarbeit den Unterschied macht: Wir verstehen uns
              nicht als reiner Vermittler, sondern als langfristiger Partner.
              Unsere Kunden profitieren von kurzen Wegen, klarer Kommunikation
              und Lösungen, die zu ihrem Betrieb passen.
            </p>
            <ul className="mt-6 space-y-3 font-body text-sm text-text">
              {[
                "Ein fester Ansprechpartner für alle Anliegen",
                "Transparente Abläufe von Anfrage bis Abrechnung",
                "Lösungen, die mit Ihrem Betrieb mitwachsen",
              ].map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <CheckCircle2 size={20} strokeWidth={1.75} className="mt-0.5 shrink-0 text-gold" aria-hidden />
                  {b}
                </li>
              ))}
            </ul>
          </AnimatedSection>
          <AnimatedSection className="relative">
            <div
              aria-hidden
              className="absolute -right-4 -top-4 hidden h-full w-full rounded-lg border-2 border-gold sm:block"
            />
            <Image
              src="/images/section-team.jpg"
              alt="Professionelle Reinigungskraft bei der Arbeit"
              width={800}
              height={533}
              quality={70}
              className="relative rounded-lg object-cover shadow-lg"
              sizes="(min-width: 1024px) 50vw, 100vw"
            />
          </AnimatedSection>
        </Container>
      </Section>
      <StartCta />
    </>
  );
}
