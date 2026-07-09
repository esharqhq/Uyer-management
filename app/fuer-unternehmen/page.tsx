import type { Metadata } from "next";
import { MessagesSquare, UserCheck, ClipboardCheck, type LucideIcon } from "lucide-react";
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

const steps: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: MessagesSquare,
    title: "Bedarf besprechen",
    text: "Sie schildern uns, welches Personal Sie benötigen – Umfang, Qualifikation, Zeitraum und Einsatzort.",
  },
  {
    icon: UserCheck,
    title: "Auswahl & Vermittlung",
    text: "Wir schlagen Ihnen geprüfte Fachkräfte aus unserem europaweiten Netzwerk vor – schnell und passgenau.",
  },
  {
    icon: ClipboardCheck,
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
          <p className="text-center font-body text-sm font-semibold uppercase tracking-[0.2em] text-navy">
            Ablauf
          </p>
          <h2 id="process-heading" className="mt-3 text-center font-display text-3xl font-semibold">
            So einfach funktioniert es
          </h2>
          <AnimatedSection stagger={0.15} className="mt-12 grid gap-6 sm:grid-cols-3">
            {steps.map((s, i) => (
              <div
                key={s.title}
                className="group relative rounded-lg border border-line bg-surface p-7 text-center shadow-sm transition duration-300 hover:-translate-y-1.5 hover:border-gold/50 hover:shadow-lg"
              >
                <span className="absolute right-5 top-4 font-display text-2xl text-gold/40">
                  {i + 1}
                </span>
                <span className="inline-flex size-14 items-center justify-center rounded-full bg-gold-wash text-navy transition duration-300 group-hover:bg-gold group-hover:text-ink">
                  <s.icon size={26} strokeWidth={1.75} aria-hidden />
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold">{s.title}</h3>
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
