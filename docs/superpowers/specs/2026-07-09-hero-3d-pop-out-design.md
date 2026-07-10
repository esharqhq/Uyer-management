# Hero redesign — navy card with 3D building pop-out

Date: 2026-07-09
Status: Approved (approach A)

## Goal

Replace the current full-bleed skyscraper hero (`components/home/Hero.tsx`)
with a contained **navy card** hero. A transparent-background building
silhouette (`public/images/hero-building.png`) pops out of the card in 3D,
cropped on three sides by overflowing above the card's top edge.

Reference: user Image #4 (card + 3D building), improving on Image #3 (old
full-bleed hero).

## Approach A — overflow silhouette + perspective tilt

The building image is absolutely positioned, bottom-anchored on the card's
right, sized taller than the card so its **top breaks above the card's top
edge**. A `perspective(...) rotateY(...)` tilt plus a strong `drop-shadow`
sells the 3D. The card uses `overflow-visible` so the silhouette stands proud.

## Layout

- **Section** — keeps the "dark hero" theme rhythm: full-width `bg-ink`,
  ~min-h 90vh, generous padding, faint radial gold glow behind the card.
- **Card** — large `rounded-3xl` navy gradient panel, hairline gold/white
  border, soft shadow. Desktop: 2 columns (text left, building right).
  Mobile: stacked (text, then building centered with a reduced pop-out).

### Left content (German, Sie-form)

- Eyebrow (gold, uppercase, tracked): `Personalvermittlung · Österreich & Deutschland`
- H1 (Cinzel, gold): `QUALIFIZIERTES PERSONAL`
- Sub (Poppins): `für die Gebäudereinigung in Österreich & Deutschland`
- CTA: outline-gold pill `» Kontakt aufnehmen` → `/kontakt`
  (the single gold accent — respects one-gold-CTA rule)

### Building pop-out

`public/images/hero-building.png` (transparent, single building),
bottom-right anchored, top overflowing above the card,
`perspective(1200px) rotateY(-6deg)` + `drop-shadow-2xl`, soft elliptical
ground shadow beneath.

## Motion

- GSAP staggered reveal for eyebrow / H1 / sub / CTA (0.6–0.9s ease-out,
  transform + opacity only).
- Building: fade + slide-up settle on load (~0.8s ease-out). No infinite loop.
- Full static fallback under `prefers-reduced-motion`.

## Design-system compliance

- Fonts: Cinzel only for the H1 (≥ 20px); Poppins for eyebrow/sub/CTA/label.
- Colors: ink / navy / gold / gold-wash / surface only.
- One gold CTA (outline-gold); focus rings gold; no muted-on-gold.
- Copy German with real umlauts.

## Files

- Rewrite `components/home/Hero.tsx`.
- Reuse `components/motion/hero-animation.ts` pattern (extend as needed).
- **Asset dependency:** user supplies `public/images/hero-building.png`.
  Until present, the image slot 404s gracefully; build is unaffected.
