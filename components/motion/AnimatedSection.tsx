"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

/** Scroll-reveal wrapper. Uses IntersectionObserver + gsap.to instead of
 *  ScrollTrigger: trigger positions cannot go stale, and all tweens live in
 *  the useGSAP context so React dev double-mounts revert cleanly. */
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
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const el = ref.current!;
      const targets = stagger > 0 ? Array.from(el.children) : [el];
      gsap.set(targets, { opacity: 0, y: 56 });
      const io = new IntersectionObserver(
        (entries) => {
          if (entries.some((e) => e.isIntersecting)) {
            io.disconnect();
            gsap.to(targets, {
              opacity: 1,
              y: 0,
              duration: 0.9,
              ease: "power3.out",
              stagger,
              // free the transform for CSS hover effects afterwards
              clearProps: "transform",
            });
          }
        },
        { rootMargin: "0px 0px -12% 0px" },
      );
      io.observe(el);
      return () => io.disconnect();
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
