"use client";

import { useRef } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(useGSAP);

/** Scroll reveal: every element matching `selector` starts lowered and scaled
 *  down, then rises and grows to full size as it scrolls into view. Uses an
 *  IntersectionObserver (like AnimatedSection) so trigger positions can never
 *  go stale. Honors prefers-reduced-motion. */
export function ScrollGrow({
  selector = "[data-grow]",
  className,
  children,
}: {
  selector?: string;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const items = gsap.utils.toArray<HTMLElement>(
        ref.current!.querySelectorAll(selector),
      );
      if (!items.length) return;

      gsap.set(items, { autoAlpha: 0, y: 90, scale: 0.8 });

      const io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            io.unobserve(entry.target);
            gsap.to(entry.target, {
              autoAlpha: 1,
              y: 0,
              scale: 1,
              duration: 0.85,
              ease: "power3.out",
            });
          });
        },
        { rootMargin: "0px 0px -12% 0px" },
      );
      items.forEach((item) => io.observe(item));
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
