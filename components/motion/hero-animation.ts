import gsap from "gsap";

/** Staggered hero intro: decorative lines draw in, text rises line by line.
 *  Elements are marked with data attributes:
 *  - [data-hero-rule]  horizontal decorative lines (scaleX draw)
 *  - [data-hero-line]  text lines (rise + fade, staggered)
 *
 *  Call inside a useGSAP context; uses a static reduced-motion check so all
 *  tweens belong to the calling context and revert cleanly (see
 *  AnimatedSection for rationale).
 */
export function runHeroIntro(scope: HTMLElement) {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  const lines = scope.querySelectorAll("[data-hero-line]");
  const rules = scope.querySelectorAll("[data-hero-rule]");
  const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
  // Guard each selection — GSAP warns when handed an empty NodeList, and not
  // every hero variant ships decorative rules.
  if (lines.length) {
    tl.from(lines, { opacity: 0, y: 34, duration: 0.8, stagger: 0.15 });
  }
  if (rules.length) {
    tl.from(
      rules,
      { scaleX: 0, transformOrigin: "left center", duration: 0.9 },
      "-=0.4",
    );
  }
}
