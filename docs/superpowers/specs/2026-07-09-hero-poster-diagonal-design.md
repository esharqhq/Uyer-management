# Hero — Poster / Diagonal Design

Date: 2026-07-09
Supersedes: `2026-07-09-hero-3d-pop-out-design.md` (the 3D pop-out concept).

## Goal

Rebuild the home Hero to match a supplied poster reference: a light content
panel on one side holding large display typography, a dramatic glass-tower
photo on the other, joined by a **diagonal cut** with a thin gold hairline
(the poster's "slash"). Premium, trustworthy, understated.

## Reference

Portrait poster: glass skyscraper photo on top, diagonal cut, light panel
below with a logo top-left and huge dark heading. Adapted here to a **wide**
web hero via a **side (vertical-ish) diagonal**, per user choice.

## Layout

### Desktop (lg+)
- **Right ~52%** — `public/images/hero-home.jpg` (upward glass towers,
  already in repo), `object-cover`. Left edge is a diagonal `clip-path`.
- **Left ~48%** — light panel: `paper` base with a faint `gold-wash`
  gradient. Right edge is the matching diagonal.
- **Diagonal seam** — a thin (~2px) **gold** hairline running along the cut.
  This is decorative (a "highlight", allowed by design.md); it is thin
  enough not to compete with the single gold CTA.

### Content (left panel)
- Eyebrow: `Personalvermittlung · Österreich & Deutschland` — **navy**,
  uppercase, wide tracking. (Not gold: design rule forbids gold text on
  paper.)
- H1: **`Qualifiziertes Personal`** — large **Cinzel** (`font-display`),
  `ink` color.
- Subline: `für die Gebäudereinigung in Österreich & Deutschland` —
  `text` / `muted`, Poppins.
- CTA: **`» Kontakt aufnehmen`** → `/kontakt`, **accent gold** button.
  This is the single gold CTA for the view.

### Mobile
- Vertical stack: photo band on top (~40vh) with a diagonal bottom edge and
  the header scrim; light content panel below with heading + CTA. This is
  the poster's native composition.

## Header readability

The fixed `Header` is transparent + white text at the top, designed for a
dark hero. The new hero is light on the left and has a bright sky at the top
of the photo — white header text would fail on both.

Fix inside the Hero (no global Header change): a full-width **dark→transparent
gradient scrim** across the very top (~6rem, above the photo and panel,
below the header). Restores white-header contrast everywhere and reads as an
intentional vignette. Panel content sits below the scrim so it stays clean.

## Tokens (design.md only)

- Colors: `ink`, `navy`, `gold`, `gold-wash`, `paper`, `surface`, `text`,
  `muted`. No new colors.
- Fonts: Cinzel (H1, ≥20px) via `font-display`; Poppins elsewhere.
- Gold discipline: one gold CTA; diagonal hairline is the only other gold and
  is kept subtle.
- Contrast: no gold text on paper; eyebrow is navy.

## Motion

Reuse `runHeroIntro` (`[data-hero-line]` text rise, `[data-hero-rule]` line
draw). Panel text lines get `data-hero-line`; the gold diagonal hairline gets
`data-hero-rule`. Photo fades/rises in (0.6–0.9s ease-out, transform/opacity).
`prefers-reduced-motion` honored by the existing static check.

## Out of scope

- No second logo in the panel (global Header already provides the brand).
- No content/copy changes beyond what's listed.
- No changes to other sections.
