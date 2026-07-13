import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { AnimatedSection } from "@/components/motion/AnimatedSection";

export function StartCta() {
  return (
    <Section tone="dark" aria-labelledby="start-cta-heading">
      <Container>
        <AnimatedSection className="text-center">
          <h2 id="start-cta-heading" className="font-display text-3xl font-semibold text-gold">
            Lass uns gemeinsam starten!
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-body text-text/85">
            Mit Uyer Management haben Sie einen Partner an Ihrer Seite, der Ihre
            Bedürfnisse versteht und individuelle Lösungen anbietet.
          </p>
          <div className="mt-8">
            <Button variant="accent" href="/kontakt">
              Jetzt Kontakt aufnehmen
            </Button>
          </div>
        </AnimatedSection>
      </Container>
    </Section>
  );
}
