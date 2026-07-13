import type { Metadata } from "next";
import { MessagesSquare, UserCheck, ClipboardCheck, CheckCircle2, type LucideIcon } from "lucide-react";
import { PageHero } from "@/components/shared/PageHero";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { AnimatedSection } from "@/components/motion/AnimatedSection";
import { RequestForm } from "@/components/company/RequestForm";

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
          <p className="text-center font-body text-sm font-semibold uppercase tracking-[0.2em] text-gold">
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
                <span className="inline-flex size-14 items-center justify-center rounded-full bg-gold-wash text-gold transition duration-300 group-hover:bg-gold group-hover:text-ink">
                  <s.icon size={26} strokeWidth={1.75} aria-hidden />
                </span>
                <h3 className="mt-5 font-display text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 font-body text-sm leading-6 text-muted">{s.text}</p>
              </div>
            ))}
          </AnimatedSection>
        </Container>
      </Section>
      <Section tone="dark" aria-labelledby="why-heading">
        <Container>
          <AnimatedSection className="mx-auto max-w-3xl text-center">
            <h2 id="why-heading" className="font-display text-3xl font-semibold text-gold">
              Warum Uyer Management?
            </h2>
            <p className="mt-5 font-body leading-7 text-">
              Die richtige Person am richtigen Arbeitsplatz – genau dafür steht
              Uyer Management. Unsere professionelle Personalvermittlung bringt
              Unternehmen und qualifizierte Arbeitskräfte aus der
              Gebäudereinigung zuverlässig zusammen. Flexibel, transparent und
              mit vollständiger Prozessbetreuung.
            </p>
          </AnimatedSection>
        </Container>
      </Section>
      <Section tone="light" aria-labelledby="request-heading">
        <Container className="grid gap-12 lg:grid-cols-[2fr_3fr]">
          <AnimatedSection>
            <h2 id="request-heading" className="font-display text-3xl font-semibold">
              Lass uns gemeinsam starten!
            </h2>
            <p className="mt-4 font-body leading-7 text-muted">
              Sie suchen zuverlässiges Reinigungspersonal? Schildern Sie uns Ihren
              Bedarf – wir übernehmen Suche, Auswahl, Verträge und Lohnverrechnung,
              damit Sie sich auf Ihr Geschäft konzentrieren können.
            </p>
            <ul className="mt-6 space-y-3 font-body text-sm text-muted">
              {[
                "Geprüfte Fachkräfte aus unserem europaweiten Netzwerk",
                "Schnelle, passgenaue Vermittlung",
                "Verträge & Lohnverrechnung inklusive",
              ].map((b) => (
                <li key={b} className="flex items-start gap-3">
                  <CheckCircle2 size={20} strokeWidth={1.75} className="mt-0.5 shrink-0 text-gold" aria-hidden />
                  {b}
                </li>
              ))}
            </ul>
          </AnimatedSection>
          <div className="rounded-lg border border-line bg-surface p-8 shadow-sm">
            <RequestForm />
          </div>
        </Container>
      </Section>
    </>
  );
}
