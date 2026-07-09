import Image from "next/image";
import { Container } from "@/components/layout/Container";
import { Button } from "@/components/ui/Button";
import { AnimatedSection } from "@/components/motion/AnimatedSection";

export function StaffCta() {
  return (
    <section
      aria-labelledby="staff-cta-heading"
      className="relative overflow-hidden bg-ink py-20 text-surface sm:py-28"
    >
      <Image
        src="/images/hero-services.jpg"
        alt=""
        fill
        quality={60}
        className="object-cover"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-ink/85" />
      <Container className="relative">
        <AnimatedSection className="text-center">
          <p className="font-body text-sm font-semibold uppercase tracking-[0.2em] text-gold">
            Für Unternehmen
          </p>
          <h2
            id="staff-cta-heading"
            className="mt-3 font-display text-3xl font-semibold text-gold sm:text-4xl"
          >
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
    </section>
  );
}
