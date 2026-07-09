# Uyer Management Website v2 — Design Spec

**Date:** 2026-07-09
**Status:** Approved approach: "B" (CLAUDE.md + .claude config + design-system skill)

## Goal

Rebuild https://www.uyermanagement.com/ as version 2 using the design system
defined in `design.md` (Cinzel + Poppins, navy/gold palette, German UI).
Before implementation, scaffold `.claude/` project configuration so every
Claude session applies the design system consistently.

## Context

- Existing site: German B2B personnel-placement agency (building-cleaning
  staff, Germany/Austria). Current pages: Home, Leistungen, Kontakt,
  Impressum, Datenschutz. No forms — contact via phone/WhatsApp/email only.
- v2 navigation (confirmed by user): **Home, Leistungen, Kontakt,
  Für Unternehmen, Karriere** + footer-only Impressum & Datenschutz.
- All UI copy in German, formal register (Sie). Code in English.
- `design.md` already exists and is the single source of truth for
  typography, color tokens, buttons, and form controls. Do not change it.

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
- Stack: Next.js 15 (App Router), TypeScript, Tailwind CSS v4.
- Page list and routes.
- Hard rules: UI text German only (Sie-form, ä ö ü ß), code/comments in
  English, only `design.md` tokens (no new colors/fonts), exactly one gold
  CTA per view, focus rings always gold.
- Instruction: read `design.md` before any UI work.

**.claude/settings.json:** allow-list for `npm run *`, `npm install`,
`npx next *` so dev loop runs without permission prompts.

**skills/design-system/SKILL.md:** triggers on any UI component/page work;
gives a short checklist (2 fonts, gold discipline, focus color, German copy,
contrast rules) and points to `design.md` for full token tables.

## Part 2 — Website architecture

- **Next.js 15, App Router, TypeScript, Tailwind CSS v4.** Design tokens from
  `design.md` map into Tailwind via `@theme` CSS variables.
- **Fonts:** Cinzel (weights 500/600/700) + Poppins (400/500/600) via
  `next/font/google` (self-hosted, no external `<link>`).
- **Routes:**
  - `/` — Home (hero, intro, services overview, partnership value prop, CTA)
  - `/leistungen` — services detail (5 service offerings)
  - `/kontakt` — contact info + contact form
  - `/fuer-unternehmen` — B2B page for companies seeking staff
  - `/karriere` — careers page with application form ("Jetzt bewerben")
  - `/impressum`, `/datenschutz` — legal pages, linked from footer only
- **Shared components** (`components/`): `Header` (nav + mobile menu),
  `Footer` (address, hours, legal links), `Button` (primary / accent /
  outline / disabled per design.md §3), `Input`, `Select`, `FileUpload`,
  `Checkbox` (per design.md §4), plus layout primitives (Section, Container).

## Part 3 — Forms

- **Kontakt form:** name, email, phone (optional), message, GDPR consent
  checkbox.
- **Karriere form:** name, phone, email, region (select), CV upload
  (PDF/DOC, max ~5 MB), GDPR consent checkbox. Accent button
  "Jetzt bewerben".
- **Delivery:** Next.js route handlers (`app/api/contact`, `app/api/apply`)
  send email via **Resend**; CV attached to the email. API key in
  `.env.local` (`RESEND_API_KEY`). If the key is absent, handlers run in
  mock mode (log + success response) so the UI is fully testable before the
  key exists.
- **Validation:** zod schemas shared client/server; error messages in German.
- Success/error states styled per design system (soft green success tint for
  file selected state, etc.).

## Part 4 — Quality criteria

- Mobile-first responsive on all pages.
- Gold focus ring visible everywhere (keyboard accessibility).
- German meta tags (title/description) per page; semantic HTML landmarks.
- Contrast rules from design.md respected (no muted-on-gold, no
  gold-on-paper text).

## Out of scope

- CMS / admin panel, multi-language (German only), job-listing database,
  authentication, analytics setup.

## Open items (resolved later, not blockers)

- Real contact data (address, phone, email) copied from v1 site during
  implementation.
- Resend API key + verified sender domain — provided by user when ready;
  mock mode until then.
