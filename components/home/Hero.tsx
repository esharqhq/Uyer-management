"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Button } from "@/components/ui/Button";
import { runHeroIntro } from "@/components/motion/hero-animation";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function Hero() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const scope = ref.current!;
      runHeroIntro(scope);
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to(scope.querySelector("[data-hero-bg]"), {
          yPercent: 12,
          ease: "none",
          scrollTrigger: { trigger: scope, start: "top top", end: "bottom top", scrub: true },
        });
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="relative flex min-h-[88vh] items-center overflow-hidden bg-ink text-surface">
      <div data-hero-bg className="absolute inset-0 scale-110">
        <Image
          src="/images/hero-home.jpg"
          alt="Glasfassaden moderner Bürogebäude"
          fill
          priority
          quality={65}
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/60 to-ink/90" />
      </div>
      <div className="relative mx-auto max-w-4xl px-5 text-center">
        <div className="mb-8 flex items-center justify-center gap-6">
          <span data-hero-rule aria-hidden className="h-px w-24 bg-gold/60 sm:w-40" />
          <span data-hero-rule aria-hidden className="h-px w-24 bg-gold/60 sm:w-40" />
        </div>
        <h1 data-hero-line className="font-display text-4xl font-bold uppercase tracking-wide text-gold sm:text-6xl">
          Qualifiziertes Personal
        </h1>
        <p data-hero-line className="mt-4 font-body text-lg text-surface/90">
          für die Gebäudereinigung in Österreich &amp; Deutschland
        </p>
        <div data-hero-line className="mt-9">
          <Button variant="outline" onDark href="/kontakt">
            » Kontakt aufnehmen
          </Button>
        </div>
      </div>
    </section>
  );
}
