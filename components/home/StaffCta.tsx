import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { AnimatedSection } from "@/components/motion/AnimatedSection";

export function StaffCta() {
  return (
    <Section tone="dark" aria-labelledby="staff-cta-heading">
      <Container>
        <AnimatedSection className="text-center">
          <h2 id="staff-cta-heading" className="font-display text-3xl font-semibold text-gold">
            Suchen Sie Personal?
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-body text-surface/85">
            Rufen Sie uns jetzt an und erfahren Sie, wie wir Ihr Unternehmen
            zuverlässig unterstützen.
          </p>
          <div className="mt-8">
            <Button variant="accent" href="/kontakt">
              Kontakt aufnehmen
            </Button>
          </div>
        </AnimatedSection>
      </Container>
    </Section>
  );
}
