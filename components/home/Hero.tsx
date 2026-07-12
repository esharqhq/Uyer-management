"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { Button } from "@/components/ui/Button";
import { Container } from "@/components/layout/Container";
import { runHeroIntro } from "@/components/motion/hero-animation";

gsap.registerPlugin(useGSAP);

/** The cut-out glass-tower photo used for the 3D pop-out block. */
function HeroBuilding({ fit = "object-cover" }: { fit?: string }) {
  return (
    <Image
      src="/images/hero-home.png"
      alt="Moderne Gebäudefassade in der Skyline"
      fill
      priority
      quality={75}
      sizes="(min-width: 1024px) 45vw, 90vw"
      className={fit}
    />
  );
}

/** Fades the lower edge of the building into the card so its base has no hard
 *  cut — the building appears to dissolve into the navy surface. */
const BUILDING_MASK =
  "linear-gradient(to top, transparent 0%, rgba(0,0,0,0.15) 8%, #000 24%)";

export function Hero() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const scope = ref.current!;
      runHeroIntro(scope);
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      // Building settles up into place after the text begins to rise.
      gsap.from(scope.querySelectorAll("[data-hero-media]"), {
        opacity: 0,
        y: 56,
        duration: 0.9,
        ease: "power3.out",
        delay: 0.15,
      });
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      className="relative overflow-hidden bg-paper pb-20 pt-28 lg:pb-28 lg:pt-44"
    >
      <Container>
        {/* Navy card — the surface floats on the light page; overflow stays
            visible so the building can break above the card's top edge. */}
        <div className="relative rounded-4xl bg-linear-to-r from-ink via-ink to-navy shadow-2xl shadow-ink/30 ring-1 ring-gold/15">
          {/* Faint gold glow behind the headline */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-8 top-10 h-56 w-56 rounded-full bg-gold/10 blur-3xl"
          />

          <div className="relative grid items-stretch lg:grid-cols-[1.18fr_0.82fr]">
            {/* Left — content */}
            <div className="relative z-10 px-8 py-14 sm:px-12 lg:py-24 lg:pl-14 lg:pr-6">
              <p
                data-hero-line
                className="font-body text-xs font-semibold uppercase tracking-[0.25em] text-gold/85"
              >
                Personalvermittlung · Österreich &amp; Deutschland
              </p>
              <h1
                data-hero-line
                className="mt-5 font-display text-4xl font-bold uppercase leading-[1.05] text-surface sm:text-5xl lg:text-[2.9rem] xl:text-[3.25rem]"
              >
                Qualifiziertes
                <br />
                Personal
              </h1>
              <p
                data-hero-line
                className="mt-5 max-w-md font-body text-lg text-surface/80"
              >
                für die Gebäudereinigung in Österreich &amp; Deutschland
              </p>
              <div data-hero-line className="mt-9">
                <Button variant="accent" href="/kontakt">
                  » Kontakt aufnehmen
                </Button>
              </div>
            </div>

            {/* Right — 3D building pop-out (desktop). Absolutely positioned so
                its top edge breaks above the card; bottom stays flush with the
                card's lower edge. Perspective tilt + drop shadow sell the depth. */}
            <div className="relative hidden lg:block" aria-hidden>
              <div
                data-hero-media
                className="absolute -top-25 bottom-0 right-8 w-[90%] overflow-hidden will-change-transform"
                style={{
                  transform: "perspective(1500px) rotateY(-8deg)",
                  transformOrigin: "right center",
                  WebkitMaskImage: BUILDING_MASK,
                  maskImage: BUILDING_MASK,
                }}
              >
                <HeroBuilding />
              </div>
            </div>
          </div>

          {/* Mobile — building cut-out sits on the card below the text */}
          <div className="px-6 pb-6 lg:hidden">
            <div
              data-hero-media
              className="relative mx-auto h-64 w-full max-w-sm"
              style={{ WebkitMaskImage: BUILDING_MASK, maskImage: BUILDING_MASK }}
            >
              <HeroBuilding fit="object-contain object-bottom" />
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
