import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { AnimatedSection } from "@/components/motion/AnimatedSection";
import { Button } from "@/components/ui/Button";

const highlights = [
  "Geprüfte Fachkräfte für die Gebäudereinigung",
  "Schwerpunkt Österreich & Deutschland",
  "Verträge, Dienstpläne und Lohnverrechnung inklusive",
];

export function IntroSplit() {
  return (
    <Section tone="surface" aria-labelledby="intro-heading">
      <Container className="grid items-center gap-12 lg:grid-cols-2">
        <AnimatedSection className="relative">
          {/* offset gold frame behind the photo */}
          <div
            aria-hidden
            className="absolute -left-4 -top-4 hidden h-full w-full rounded-lg border-2 border-gold sm:block"
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
        <AnimatedSection stagger={0.12}>
          <p className="font-body text-sm font-semibold uppercase tracking-[0.2em] text-gold">
            Über uns
          </p>
          <h2 id="intro-heading" className="mt-3 font-display text-3xl font-semibold">
            Die richtige Person am richtigen Arbeitsplatz
          </h2>
          <p className="mt-5 font-body leading-7 text-muted">
            Genau dafür steht Uyer Management. Unsere professionelle
            Personalvermittlung bringt Unternehmen und qualifizierte
            Arbeitskräfte aus der Gebäudereinigung zuverlässig zusammen –
            flexibel, transparent und mit vollständiger Prozessbetreuung.
          </p>
          <ul className="mt-6 space-y-3">
            {highlights.map((h) => (
              <li key={h} className="flex items-start gap-3 font-body text-sm text-text">
                <CheckCircle2 size={20} strokeWidth={1.75} className="mt-0.5 shrink-0 text-gold" aria-hidden />
                {h}
              </li>
            ))}
          </ul>
          <div className="mt-8">
            <Button variant="outline" href="/leistungen">
              Mehr über unsere Leistungen
            </Button>
          </div>
        </AnimatedSection>
      </Container>
    </Section>
  );
}
