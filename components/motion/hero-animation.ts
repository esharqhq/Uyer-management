import gsap from "gsap";

/** Staggered hero intro: decorative lines draw in, text rises line by line.
 *  Elements are marked with data attributes:
 *  - [data-hero-rule]  horizontal decorative lines (scaleX draw)
 *  - [data-hero-line]  text lines (rise + fade, staggered)
 */
export function runHeroIntro(scope: HTMLElement) {
  const mm = gsap.matchMedia();
  mm.add("(prefers-reduced-motion: no-preference)", () => {
    const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
    tl.from(scope.querySelectorAll("[data-hero-line]"), {
      opacity: 0,
      y: 34,
      duration: 0.8,
      stagger: 0.15,
    }).from(
      scope.querySelectorAll("[data-hero-rule]"),
      { scaleX: 0, transformOrigin: "left center", duration: 0.9 },
      "-=0.4",
    );
  });
  return mm;
}
