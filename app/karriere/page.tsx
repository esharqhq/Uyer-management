import type { Metadata } from "next";
import { CheckCircle2 } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { AnimatedSection } from "@/components/motion/AnimatedSection";
import { ApplyForm } from "@/components/career/ApplyForm";

export const metadata: Metadata = {
  title: "Karriere – Jetzt bewerben",
  description:
    "Arbeiten in der Gebäudereinigung in Österreich & Deutschland: Bewerben Sie sich jetzt bei Uyer Management – unkompliziert mit Lebenslauf-Upload.",
};

export default function KarrierePage() {
  return (
    <>
      <PageHero
        title="Jetzt Bewerben"
        subtitle="Werden Sie Teil unseres Netzwerks – wir vermitteln Sie an geprüfte Betriebe in Österreich & Deutschland."
        image="/images/section-team.jpg"
      />
      <Section tone="light">
        <Container className="grid gap-12 lg:grid-cols-[2fr_3fr]">
          <AnimatedSection>
            <h2 className="font-display text-3xl font-semibold">Ihre Bewerbung</h2>
            <p className="mt-4 font-body leading-7 text-muted">
              Sie haben Erfahrung in der Gebäudereinigung oder möchten in der
              Branche durchstarten? Senden Sie uns Ihre Bewerbung – wir finden
              den passenden Arbeitsplatz für Sie. Faire Bedingungen, klare
              Verträge und persönliche Betreuung inklusive.
            </p>
            <ul className="mt-6 space-y-3 font-body text-sm text-muted">
              {[
                "Geprüfte Arbeitgeber in Österreich & Deutschland",
                "Rechtssichere Verträge und pünktliche Lohnverrechnung",
                "Persönliche Betreuung während des gesamten Einsatzes",
              ].map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <CheckCircle2 size={20} strokeWidth={1.75} className="mt-0.5 shrink-0 text-gold" aria-hidden />
                  {b}
                </li>
              ))}
            </ul>
          </AnimatedSection>
          <div className="rounded-lg border border-line bg-surface p-8 shadow-sm">
            <ApplyForm />
          </div>
        </Container>
      </Section>
    </>
  );
}
