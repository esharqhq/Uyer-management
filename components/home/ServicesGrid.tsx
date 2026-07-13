import {
    Users,
    CalendarClock,
    Calculator,
    FileSignature,
    Handshake,
    type LucideIcon,
} from "lucide-react";
import {site} from "@/content/site";
import {Container} from "@/components/layout/Container";
import {Section} from "@/components/layout/Section";
import {ScrollGrow} from "@/components/motion/ScrollGrow";

/* one icon per service, same order as site.services */
const icons: LucideIcon[] = [Users, CalendarClock, Calculator, FileSignature, Handshake];

export function ServicesGrid({detailed = false}: { detailed?: boolean }) {
    return (
        <Section
            tone="light"
            aria-labelledby="services-heading"
            className="relative overflow-hidden py-24 md:py-32"
        >
            {/* Very soft warmth on the white page so the glass has something to catch */}
            <div
                aria-hidden
                className="pointer-events-none absolute left-1/2 top-24 -z-10 h-72 w-[46rem] max-w-full -translate-x-1/2 rounded-full bg-gold/10 blur-3xl"
            />

            <Container>
                <p className="text-center font-body text-sm font-semibold uppercase tracking-[0.2em] text-gold">
                    Leistungen
                </p>
                <h2 id="services-heading" className="mt-3 text-center font-display text-3xl font-semibold md:text-4xl">
                    Unser Leistungsspektrum
                </h2>
                <p className="mx-auto mt-4 max-w-2xl text-center font-body text-muted">
                    Als europaweit tätiges Unternehmen in der Personalvermittlung und
                    Auftragsvermittlung, mit Schwerpunkt in Österreich und Deutschland,
                    bieten wir Ihnen ein vollständiges Leistungspaket.
                </p>

                {/* Card grid — icon lives inside each card, no timeline rail.
                    Flex-wrap centres the final row so 3 + 2 reads intentional.
                    ScrollGrow lifts + scales each card in as it enters view. */}
                <ScrollGrow className="mt-16 flex flex-wrap justify-center gap-6">
                    {site.services.map((s, i) => {
                        const Icon = icons[i];
                        const copy = detailed ? s.text : s.text.split(". ")[0] + ".";
                        return (
                            <div
                                key={s.title}
                                data-grow
                                className="w-full sm:w-[calc(50%-0.75rem)] lg:w-[calc(33.333%-1rem)]"
                            >
                                <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-surface p-8 shadow-[0_4px_16px_rgba(0,0,0,0.05)] transition duration-300 ease-out hover:-translate-y-1.5 hover:border-gold/40 hover:shadow-[0_24px_48px_-20px_rgba(0,0,0,0.28)]">
                                    {/* Gold accent bar sweeps across the top on hover */}
                                    <span
                                        aria-hidden
                                        className="pointer-events-none absolute inset-x-0 top-0 h-0.5 origin-left scale-x-0 bg-gold transition-transform duration-500 ease-out group-hover:scale-x-100"
                                    />
                                    {/* Icon tile inside the card */}
                                    <span className="inline-flex size-14 items-center justify-center rounded-2xl bg-ink text-gold ring-1 ring-gold/25 shadow-sm transition duration-300 group-hover:-translate-y-0.5 group-hover:bg-gold group-hover:text-ink">
                                        <Icon className="size-7" strokeWidth={1.75} aria-hidden />
                                    </span>
                                    <h3 className="mt-6 font-display text-xl font-semibold text-text transition-colors duration-300 group-hover:text-gold md:text-2xl">
                                        {s.title}
                                    </h3>
                                    <p className="mt-3 font-body text-sm leading-6 text-muted md:text-[0.95rem]">
                                        {copy}
                                    </p>
                                </article>
                            </div>
                        );
                    })}
                </ScrollGrow>
            </Container>
        </Section>
    );
}