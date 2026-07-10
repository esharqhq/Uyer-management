import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { AnimatedSection } from "@/components/motion/AnimatedSection";
import { CoverageMapView } from "@/components/home/coverage-map/CoverageMapView";

export function CoverageMap() {
  return (
    <Section tone="light" aria-labelledby="coverage-heading">
      <Container className="grid items-center gap-12 lg:grid-cols-[5fr_4fr]">
        <AnimatedSection>
          <CoverageMapView />
        </AnimatedSection>
        <AnimatedSection stagger={0.15}>
          <p className="font-body text-sm font-semibold uppercase tracking-[0.2em] text-navy">
            Einsatzgebiete
          </p>
          <h2 id="coverage-heading" className="mt-3 font-display text-3xl font-semibold">
            Von Wien bis Hamburg
          </h2>
          <p className="mt-5 font-body leading-7 text-muted">
            Mit Schwerpunkt in Österreich und Deutschland vermitteln wir
            qualifiziertes Reinigungspersonal genau dort, wo Sie es brauchen –
            regional verankert und europaweit vernetzt.
          </p>
          <dl className="mt-8 grid gap-6 sm:grid-cols-2">
            <div className="rounded-lg bg-ink p-5 text-surface">
              <dt className="font-display text-xl font-semibold text-gold">Österreich</dt>
              <dd className="mt-2 font-body text-sm leading-6 text-surface/75">
                Wien, Linz, Salzburg, Graz, Innsbruck und Umgebung
              </dd>
            </div>
            <div className="rounded-lg bg-ink p-5 text-surface">
              <dt className="font-display text-xl font-semibold text-gold">Deutschland</dt>
              <dd className="mt-2 font-body text-sm leading-6 text-surface/75">
                München, Stuttgart, Frankfurt, Köln, Berlin, Hamburg
              </dd>
            </div>
          </dl>
        </AnimatedSection>
      </Container>
    </Section>
  );
}
