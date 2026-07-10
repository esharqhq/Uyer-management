import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { AnimatedSection } from "@/components/motion/AnimatedSection";

/** Centered mission statement — a dark band that sets up the light content
 *  sections below it (theme rhythm: light hero → dark intro → light services). */
export function IntroText() {
  return (
    <Section
      tone="dark"
      aria-labelledby="intro-heading"
      className="relative overflow-hidden"
    >
      {/* Faint gold glow anchoring the heading */}
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-64 w-[42rem] max-w-full -translate-x-1/2 rounded-full bg-gold/10 blur-3xl"
      />

      <Container>
        <AnimatedSection className="relative mx-auto max-w-3xl text-center" stagger={0.12}>
          {/* Gold ornament — a nod to the reference's rule + ring motif */}
          <div className="mx-auto mb-7 flex items-center justify-center gap-3" aria-hidden>
            <span className="h-px w-12 bg-linear-to-r from-transparent to-gold" />
            <span className="h-2.5 w-2.5 rounded-full border border-gold" />
            <span className="h-px w-12 bg-linear-to-l from-transparent to-gold" />
          </div>

          <h2
            id="intro-heading"
            className="font-display text-2xl font-bold uppercase leading-tight tracking-wide text-gold sm:text-3xl lg:text-4xl"
          >
            Personalvermittlung für Gebäudereinigung
            <span className="block">in Österreich &amp; Deutschland</span>
          </h2>

          <p className="mx-auto mt-6 max-w-2xl font-body leading-7 text-surface/75">
            Die richtige Person am richtigen Arbeitsplatz – genau dafür steht Uyer
            Management. Unsere professionelle Personalvermittlung bringt Unternehmen
            und qualifizierte Arbeitskräfte aus der Gebäudereinigung zuverlässig
            zusammen. Europaweit tätig, mit Fokus auf Österreich und Deutschland,
            unterstützen wir Firmen bei der schnellen Besetzung offener Stellen und
            sichern so reibungslose Abläufe. Als erfahrener Partner legen wir großen
            Wert auf Vertrauen, Qualität und passgenaue Lösungen. Wir wissen: Der
            Erfolg eines Unternehmens hängt maßgeblich von motivierten Mitarbeitern
            ab – und genau diese finden wir für Sie.
          </p>
        </AnimatedSection>
      </Container>
    </Section>
  );
}
