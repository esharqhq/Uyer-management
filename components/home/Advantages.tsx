import { Clock3, ShieldCheck, Workflow, Globe, type LucideIcon } from "lucide-react";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { AnimatedSection } from "@/components/motion/AnimatedSection";

const points: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: Clock3,
    title: "Flexible Lösungen",
    text: "Personal genau dann, wenn Sie es brauchen – kurzfristig oder langfristig.",
  },
  {
    icon: ShieldCheck,
    title: "Qualifizierte Fachkräfte",
    text: "Geprüftes Personal mit Erfahrung in der professionellen Gebäudereinigung.",
  },
  {
    icon: Workflow,
    title: "Komplette Prozessbetreuung",
    text: "Von der Suche über Verträge bis zur Lohnverrechnung – alles aus einer Hand.",
  },
  {
    icon: Globe,
    title: "Europaweites Netzwerk",
    text: "Schwerpunkt Österreich & Deutschland, Reichweite in ganz Europa.",
  },
];

export function Advantages() {
  return (
    <Section tone="surface" aria-labelledby="advantages-heading">
      <Container>
        <p className="text-center font-body text-sm font-semibold uppercase tracking-[0.2em] text-navy">
          Ihr Vorteil
        </p>
        <h2 id="advantages-heading" className="mt-3 text-center font-display text-3xl font-semibold">
          Partnerschaft auf Augenhöhe
        </h2>
        {/* Real copy from the previous site */}
        <div className="mx-auto mt-5 max-w-3xl space-y-4 text-center font-body leading-7 text-muted">
          <p>
            Unsere Expertise in der Personalvermittlung und Auftragsvermittlung
            richtet sich an Unternehmen, die langfristige Lösungen suchen.
            Besonders in der Gebäudereinigung zählt Effizienz: Personal muss
            flexibel verfügbar, zuverlässig und qualifiziert sein. Genau hier
            setzen wir an und übernehmen den gesamten Prozess – von der Suche
            über die Auswahl bis hin zur administrativen Abwicklung.
          </p>
          <p>
            Vertrauen Sie auf unsere europaweite Erfahrung und profitieren Sie
            von einem starken Partner, der Ihre Sprache spricht und Ihre
            Anforderungen versteht.
          </p>
        </div>
        <AnimatedSection stagger={0.12} className="mt-14 grid gap-6 sm:grid-cols-2">
          {points.map((p) => (
            <div
              key={p.title}
              className="group flex gap-5 rounded-2xl border border-line bg-paper p-6 transition duration-300 ease-out hover:-translate-y-1 hover:border-gold/40 hover:bg-surface hover:shadow-[0_22px_44px_-22px_rgba(14,42,71,0.28)]"
            >
              <span className="inline-flex size-12 shrink-0 items-center justify-center rounded-xl bg-ink text-surface shadow-sm transition duration-300 group-hover:bg-gold group-hover:text-ink">
                <p.icon size={22} strokeWidth={1.75} aria-hidden />
              </span>
              <div>
                <h3 className="font-display text-lg font-semibold text-ink transition-colors duration-300 group-hover:text-navy">
                  {p.title}
                </h3>
                <p className="mt-2 font-body text-sm leading-6 text-muted">{p.text}</p>
              </div>
            </div>
          ))}
        </AnimatedSection>
      </Container>
    </Section>
  );
}
