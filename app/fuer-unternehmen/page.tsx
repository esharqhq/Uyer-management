import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { StartCta } from "@/components/shared/StartCta";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { AnimatedSection } from "@/components/motion/AnimatedSection";

export const metadata: Metadata = {
  title: "Für Unternehmen – Personal finden",
  description:
    "Sie suchen zuverlässiges Reinigungspersonal? Uyer Management übernimmt Suche, Auswahl, Verträge und Lohnverrechnung – Sie konzentrieren sich auf Ihr Geschäft.",
};

const steps = [
  {
    title: "Bedarf besprechen",
    text: "Sie schildern uns, welches Personal Sie benötigen – Umfang, Qualifikation, Zeitraum und Einsatzort.",
  },
  {
    title: "Auswahl & Vermittlung",
    text: "Wir schlagen Ihnen geprüfte Fachkräfte aus unserem europaweiten Netzwerk vor – schnell und passgenau.",
  },
  {
    title: "Einsatz & Betreuung",
    text: "Verträge, Dienstpläne und Lohnverrechnung übernehmen wir. Sie behalten jederzeit den Überblick.",
  },
];

export default function FuerUnternehmenPage() {
  return (
    <>
      <PageHero
        title="Für Unternehmen"
        subtitle="Zuverlässiges Personal für Ihre Gebäudereinigung – ohne administrativen Aufwand."
        image="/images/hero-services.jpg"
      />
      <Section tone="light" aria-labelledby="process-heading">
        <Container>
          <h2 id="process-heading" className="text-center font-display text-3xl font-semibold">
            So einfach funktioniert es
          </h2>
          <AnimatedSection stagger={0.15} className="mt-12 grid gap-6 sm:grid-cols-3">
            {steps.map((s, i) => (
              <div key={s.title} className="rounded-lg border border-line bg-surface p-6 text-center shadow-sm">
                <span className="font-display text-3xl text-gold">{i + 1}</span>
                <h3 className="mt-3 font-display text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 font-body text-sm leading-6 text-muted">{s.text}</p>
              </div>
            ))}
          </AnimatedSection>
        </Container>
      </Section>
      <Section tone="wash" aria-labelledby="why-heading">
        <Container>
          <AnimatedSection className="mx-auto max-w-3xl text-center">
            <h2 id="why-heading" className="font-display text-3xl font-semibold">
              Warum Uyer Management?
            </h2>
            <p className="mt-5 font-body leading-7 text-text">
              Die richtige Person am richtigen Arbeitsplatz – genau dafür steht
              Uyer Management. Unsere professionelle Personalvermittlung bringt
              Unternehmen und qualifizierte Arbeitskräfte aus der
              Gebäudereinigung zuverlässig zusammen. Flexibel, transparent und
              mit vollständiger Prozessbetreuung.
            </p>
          </AnimatedSection>
        </Container>
      </Section>
      <StartCta />
    </>
  );
}
