"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

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
    /* IntersectionObserver + gsap.to — see AnimatedSection for rationale */
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const el = ref.current!;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          io.disconnect();
          const obj = { n: 0 };
          gsap.to(obj, {
            n: value,
            duration: 0.9,
            ease: "power1.out",
            onUpdate: () => {
              el.textContent = `${Math.round(obj.n)}${suffix}`;
            },
          });
        }
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    io.observe(el);
    return () => io.disconnect();
  });

  return (
    <div className="text-center">
      <span ref={ref} className="font-display text-4xl font-bold text-gold">
        {value}
        {suffix}
      </span>
      <p className="mt-2 font-body text-sm opacity-75">{label}</p>
    </div>
  );
}
