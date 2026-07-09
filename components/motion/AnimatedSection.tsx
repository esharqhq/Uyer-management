"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function AnimatedSection({
  stagger = 0,
  className,
  children,
}: {
  stagger?: number;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const el = ref.current!;
        gsap.from(stagger > 0 ? Array.from(el.children) : el, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: "power2.out",
          stagger,
          scrollTrigger: { trigger: el, start: "top 80%", once: true },
        });
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
