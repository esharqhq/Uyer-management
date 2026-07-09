import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { AnimatedSection } from "@/components/motion/AnimatedSection";

/* Simplified DE/AT outlines projected from Natural-Earth-derived GeoJSON
   (public domain). Coordinates live in an 800×983 viewBox. */
const DE_PATH =
  "M286.3 0.0L287.6 44.4L361.1 71.2L360.4 112.0L434.4 90.4L475.3 58.9L557.5 104.3L591.8 140.9L608.8 199.4L588.5 230.1L615.0 271.1L633.0 332.6L627.3 372.2L657.1 445.6L624.7 457.6L605.5 444.4L587.2 466.3L534.9 488.5L507.9 517.2L455.0 542.2L467.8 576.4L475.5 624.9L512.6 652.5L553.7 701.9L528.0 754.9L501.9 769.5L512.2 844.4L505.4 863.9L482.7 840.4L447.8 836.9L395.8 857.5L331.6 852.6L321.2 882.9L284.4 851.0L262.4 857.3L184.4 822.2L169.5 847.2L107.6 846.3L116.8 764.5L153.6 685.7L48.7 664.6L14.4 634.5L18.5 584.1L4.0 558.1L12.2 480.4L0.0 360.0L43.7 359.9L62.2 316.7L80.3 211.4L66.7 172.5L80.9 148.2L141.8 141.9L155.3 167.3L204.7 110.6L188.0 67.5L184.7 2.3L239.7 17.5L286.3 0.0Z";
const AT_PATH =
  "M800.0 788.5L794.5 835.5L753.5 835.7L767.6 860.6L743.4 934.7L729.5 954.1L665.9 956.9L629.2 983.0L569.0 974.1L464.9 944.4L448.7 904.4L376.8 924.4L368.3 946.3L324.2 929.9L287.1 926.8L254.1 905.9L265.3 877.7L262.4 857.3L284.4 851.0L321.2 882.9L331.6 852.6L395.8 857.5L447.8 836.9L482.7 840.4L505.4 863.9L512.2 844.4L501.9 769.5L528.0 754.9L553.7 701.9L607.8 738.9L648.7 691.9L674.4 683.3L730.9 718.4L765.0 712.4L798.6 734.1L792.7 748.7L800.0 788.5Z";

type City = {
  name: string;
  x: number;
  y: number;
  /** label offset + anchor so names stay clear of borders and markers */
  dx: number;
  dy: number;
  anchor?: "start" | "end" | "middle";
};

const CITIES: City[] = [
  { name: "Wien", x: 755.9, y: 778.8, dx: 0, dy: -22, anchor: "middle" },
  { name: "Linz", x: 603.9, y: 767.5, dx: 0, dy: -22, anchor: "middle" },
  { name: "Salzburg", x: 514.3, y: 824.6, dx: -20, dy: 8, anchor: "end" },
  { name: "Graz", x: 687.9, y: 909.6, dx: 20, dy: 8, anchor: "start" },
  { name: "Innsbruck", x: 394.2, y: 886.7, dx: 0, dy: 38, anchor: "middle" },
  { name: "München", x: 407.1, y: 787.2, dx: 0, dy: -22, anchor: "middle" },
  { name: "Stuttgart", x: 232.5, y: 713.6, dx: -20, dy: 8, anchor: "end" },
  { name: "Frankfurt", x: 196.0, y: 560.1, dx: 20, dy: 8, anchor: "start" },
  { name: "Köln", x: 70.7, y: 465.1, dx: 20, dy: 8, anchor: "start" },
  { name: "Berlin", x: 539.8, y: 283.1, dx: 20, dy: 8, anchor: "start" },
  { name: "Hamburg", x: 291.5, y: 164.6, dx: 20, dy: 8, anchor: "start" },
];

export function CoverageMap() {
  return (
    <Section tone="light" aria-labelledby="coverage-heading">
      <Container className="grid items-center gap-12 lg:grid-cols-[5fr_4fr]">
        <AnimatedSection>
          <svg
            viewBox="0 0 800 983"
            role="img"
            aria-label="Karte der Einsatzgebiete in Deutschland und Österreich mit markierten Städten"
            className="mx-auto max-h-[560px] w-full max-w-lg"
          >
            <path
              d={DE_PATH}
              fill="var(--color-ink)"
              stroke="var(--color-gold)"
              strokeOpacity={0.4}
              strokeWidth={2}
            />
            <path
              d={AT_PATH}
              fill="var(--color-navy)"
              stroke="var(--color-gold)"
              strokeOpacity={0.6}
              strokeWidth={2}
            />
            {CITIES.map((c, i) => (
              <g key={c.name}>
                <circle
                  cx={c.x}
                  cy={c.y}
                  r={9}
                  fill="var(--color-gold)"
                  opacity={0.55}
                  className="map-pulse"
                  style={{ animationDelay: `${i * 0.35}s` }}
                />
                <circle cx={c.x} cy={c.y} r={7} fill="var(--color-gold)" />
                <text
                  x={c.x + c.dx}
                  y={c.y + c.dy}
                  textAnchor={c.anchor ?? "start"}
                  fill="var(--color-surface)"
                  opacity={0.9}
                  fontSize={27}
                  fontWeight={500}
                >
                  {c.name}
                </text>
              </g>
            ))}
          </svg>
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
