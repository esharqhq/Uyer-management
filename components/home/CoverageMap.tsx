import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { AnimatedSection } from "@/components/motion/AnimatedSection";
import { CoverageMapView } from "@/components/home/coverage-map/CoverageMapView";

const AUSTRIA = [
  "Salzburg",
  "Burgenland",
  "Kärnten",
  "Niederösterreich",
  "Oberösterreich",
  "Steiermark",
  "Tirol",
  "Vorarlberg",
  "Wien",
];

const GERMANY = [
  "Baden-Württemberg",
  "Bayern",
  "Berlin",
  "Brandenburg",
  "Bremen",
  "Hamburg",
  "Hessen",
  "Mecklenburg-Vorpommern",
  "Niedersachsen",
  "Nordrhein-Westfalen",
  "Rheinland-Pfalz",
  "Saarland",
  "Sachsen",
  "Sachsen-Anhalt",
  "Schleswig-Holstein",
];

/* "A, B und C" — natural German enumeration. */
function formatRegions(regions: string[]) {
  if (regions.length < 2) return regions.join("");
  return `${regions.slice(0, -1).join(", ")} und ${regions.at(-1)}`;
}

export function CoverageMap() {
  return (
    <Section tone="light" aria-labelledby="coverage-heading">
      <Container className="grid items-center gap-12 lg:grid-cols-[5fr_4fr]">
        <AnimatedSection>
          <CoverageMapView />
        </AnimatedSection>
        <AnimatedSection stagger={0.15}>
          <p className="font-body text-sm font-semibold uppercase tracking-[0.2em] text-gold">
            Einsatzgebiete
          </p>
          <h2 id="coverage-heading" className="mt-3 font-display text-3xl font-semibold">
            Österreich &amp; Deutschland
          </h2>
          <p className="mt-5 font-body leading-7 text-muted">
            Mit Schwerpunkt in Österreich und Deutschland vermitteln wir
            qualifiziertes Reinigungspersonal genau dort, wo Sie es brauchen –
            regional verankert und europaweit vernetzt.
          </p>
          <dl className="mt-8 space-y-4">
            <div className="rounded-lg bg-ink p-6 text-text">
              <dt className="font-display text-xl font-semibold text-gold">Österreich</dt>
              <dd className="mt-2 font-body text-sm leading-6 text-text/75">
                {formatRegions(AUSTRIA)}
              </dd>
            </div>
            <div className="rounded-lg bg-ink p-6 text-text">
              <dt className="font-display text-xl font-semibold text-gold">Deutschland</dt>
              <dd className="mt-2 font-body text-sm leading-6 text-text/75">
                {formatRegions(GERMANY)}
              </dd>
            </div>
          </dl>
        </AnimatedSection>
      </Container>
    </Section>
  );
}
