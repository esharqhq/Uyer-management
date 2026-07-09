# Uyer Management Website v2 — Design Spec

**Date:** 2026-07-09 (updated same day with animation/form/SEO requirements)
**Status:** Approved approach: "B" (CLAUDE.md + .claude config + design-system skill)

## Goal

Rebuild https://www.uyermanagement.com/ as a modern version 2 using the design
system defined in `design.md` (Cinzel + Poppins, navy/gold palette, German UI),
with premium GSAP animations, strong SEO, and high-quality imagery.
Before implementation, scaffold `.claude/` project configuration so every
Claude session applies the design system consistently.

## Context

- Existing site: German B2B personnel-placement agency (building-cleaning
  staff, Germany/Austria). Company: **Uyer Management Holding LLC-FZ**,
  Meydan Grandstand, 6th Floor, Meydan Road, Nad Al Sheba / Dubai.
  Phone +97 1506061687, WhatsApp, business@uyermanagement.com,
  hours Mo–Fr 07:00–17:00.
- v2 navigation (confirmed): **Home, Leistungen, Kontakt, Für Unternehmen,
  Karriere** + footer-only Impressum & Datenschutz.
- All UI copy in German, formal register (Sie). Code in English.
- `design.md` is the single source of truth for typography, color tokens,
  buttons, and form controls. Do not change it.

## Theme decision (confirmed)

**Mixed dark + light rhythm:**
- **Dark (ink/navy) sections:** hero showcases, contact block (info card +
  form, as in v1), "Lass uns gemeinsam starten" CTA bands, footer.
  Gold text/accents on dark; white body text.
- **Light (paper/surface) sections:** all content in between — services,
  advantages, process, text sections.
- Contrast rules from design.md still apply in both contexts.

## Part 1 — Claude project configuration

```
CLAUDE.md                              # project context (repo root)
.claude/
├── settings.json                      # permissions: npm/npx/next commands
└── skills/
    └── design-system/
        └── SKILL.md                   # design.md wrapper skill
```

**CLAUDE.md contents:**
- Project description: uyermanagement.com v2 marketing site.
- Stack: Next.js 15 (App Router), TypeScript, Tailwind CSS v4, GSAP,
  react-hook-form + zod.
- Page list and routes; theme rhythm rule (dark/light alternation).
- Hard rules: UI text German only (Sie-form, ä ö ü ß), code/comments in
  English, only `design.md` tokens (no new colors/fonts), exactly one gold
  CTA per view, focus rings always gold, animations respect
  `prefers-reduced-motion`.
- Instruction: read `design.md` before any UI work.

**.claude/settings.json:** allow-list for `npm run *`, `npm install`,
`npx next *` so dev loop runs without permission prompts.

**skills/design-system/SKILL.md:** triggers on any UI component/page work;
short checklist (2 fonts, gold discipline, focus color, German copy, contrast
rules, motion discipline) and points to `design.md` for full token tables.

## Part 2 — Website architecture

- **Next.js 15, App Router, TypeScript, Tailwind CSS v4.** Design tokens from
  `design.md` map into Tailwind via `@theme` CSS variables.
- **Fonts:** Cinzel (500/600/700) + Poppins (400/500/600) via
  `next/font/google` (self-hosted).
- **Animations:** GSAP + ScrollTrigger via `@gsap/react` (`useGSAP`).

### Routes & page structure

**`/` Home:**
1. Hero showcase — full-bleed dark building image, navy gradient overlay,
   Cinzel gold headline ("Qualifiziertes Personal für die Gebäudereinigung"),
   subline, outline-gold CTA ("Kontakt aufnehmen"), decorative horizontal
   lines (animated draw)
2. "Unser Leistungsspektrum" — services overview cards (light section)
3. "Ihr Vorteil" — advantages, with animated stat counters (light)
4. "Suchen Sie Personal?" — dark CTA band for companies
5. Coverage map — stylized DACH map graphic (navy, gold markers on
   Austria & Germany, "Unsere Einsatzgebiete") — NOT a Google Maps embed
   (avoids GDPR cookie consent, matches premium look; Dubai HQ address
   stays as text in the contact card)
6. Footer (dark)

**`/leistungen` Services:**
1. Hero showcase (dark, smaller than home hero)
2. "Personaldienstleistungen & Arbeitsvermittlung – unser Leistungsspektrum"
   — 5 service offerings, detailed (light)
3. "Gemeinsam Erfolg gestalten" (light)
4. "Weil gute Zusammenarbeit den Unterschied macht" (light)
5. "Lass uns gemeinsam starten!" — dark CTA band
6. Footer

**`/kontakt` Contact:**
1. "Kontakt aufnehmen" intro
2. Dark two-column block (as v1): left info card (company name, Dubai
   address, phone, WhatsApp, email, opening hours, legal links); right
   "Anfrage senden" form (Vorname*, Nachname*, Telefon, E-Mail*, Nachricht*,
   GDPR consent checkbox*, SEND button)
3. Footer

**`/fuer-unternehmen` For companies:** B2B value proposition, process,
CTA to contact. (Structure detailed in implementation plan.)

**`/karriere` Careers:** intro + application form ("Jetzt bewerben" accent
button): name, phone, email, region select, CV upload (PDF/DOC ≤ 5 MB),
GDPR checkbox.

**`/impressum`, `/datenschutz`** — legal pages, footer links only.

### Shared components

`Header` (nav + mobile menu), `Footer`, `Button` (primary/accent/outline/
disabled per design.md §3), `Input`, `Select`, `Textarea`, `FileUpload`,
`Checkbox` (design.md §4), `Section`/`Container` layout primitives,
`AnimatedSection` (ScrollTrigger reveal wrapper), `StatCounter`,
`CoverageMap`.

## Part 3 — Animation guidelines (GSAP)

- Hero: staggered line-by-line headline reveal, decorative line draw,
  subtle image parallax.
- Scroll: sections fade + slide-up via ScrollTrigger; card grids stagger.
- Stats: count-up numbers when scrolled into view.
- Hover microinteractions: CSS only (not GSAP).
- Discipline: 0.6–0.9s, ease-out; nothing loops forever; all animation
  respects `prefers-reduced-motion` (instant-show fallback).

## Part 4 — Forms

- **react-hook-form + zod** (`@hookform/resolvers`), schemas shared
  client/server, error messages in German, inline under fields.
- **Delivery:** route handlers (`app/api/contact`, `app/api/apply`) send
  email via **Resend**; CV attached. `RESEND_API_KEY` in `.env.local`;
  mock mode (log + success) when key absent.
- Success/error states styled per design system.

## Part 5 — Images

- `next/image` everywhere: automatic AVIF/WebP, `priority` on hero,
  lazy + blur placeholder below the fold, correct `sizes`.
- Unified treatment: navy darkening overlay/gradient on photos so mixed
  stock sources read as one brand (as v1 hero).
- Sources: high-quality stock (Unsplash/Pexels) — glass facades,
  professional cleaning teams. German alt texts.

## Part 6 — SEO

- Next.js Metadata API: unique German title/description per page.
- JSON-LD: `Organization` + `EmploymentAgency` schema sitewide.
- `sitemap.xml` + `robots.txt` via App Router conventions.
- OpenGraph + Twitter card images.
- Semantic HTML landmarks, single h1 per page, German alt texts.
- Core Web Vitals: optimized fonts/images (above), no layout shift from
  animations (transform/opacity only).

## Part 7 — Quality criteria

- Mobile-first responsive on all pages.
- Gold focus ring visible everywhere (keyboard accessibility).
- Contrast rules from design.md respected in both dark and light sections.
- Lighthouse targets: 90+ performance/SEO/accessibility on key pages.

## Out of scope

- CMS / admin panel, multi-language (German only), job-listing database,
  authentication, analytics setup, Google Maps embed.

## Open items (not blockers)

- Resend API key + verified sender domain — user provides later; mock mode
  until then.
- Final stock image selection — during implementation, user approves.
