"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function StatCounter({
  value,
  suffix = "",
  label,
}: {
  value: number;
  suffix?: string;
  label: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const el = ref.current!;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const obj = { n: 0 };
      gsap.to(obj, {
        n: value,
        duration: 0.9,
        ease: "power1.out",
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
        onUpdate: () => {
          el.textContent = `${Math.round(obj.n)}${suffix}`;
        },
      });
    });
  });

  return (
    <div className="text-center">
      <span ref={ref} className="font-display text-4xl font-bold text-gold">
        {value}
        {suffix}
      </span>
      <p className="mt-2 font-body text-sm text-muted">{label}</p>
    </div>
  );
}
