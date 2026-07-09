# Uyer Management v2 — uyermanagement.com rebuild

German-language marketing site for a personnel-placement agency
(building-cleaning staff, Austria & Germany). Premium, trustworthy,
understated. Spec: `docs/superpowers/specs/2026-07-09-uyer-v2-design.md`.

## Stack

Next.js 15+ (App Router, TypeScript), Tailwind CSS v4 (tokens via `@theme`
in `app/globals.css`), GSAP + @gsap/react (ScrollTrigger), react-hook-form
+ zod, Resend (email), Vitest.

## Commands

- `npm run dev` — dev server (http://localhost:3000)
- `npm test` — Vitest
- `npm run build` — production build (must pass before finishing a task)

## Routes

`/` home · `/leistungen` · `/kontakt` · `/fuer-unternehmen` · `/karriere`
· `/impressum` · `/datenschutz` (legal pages linked from footer only)

## Hard rules

1. **Read `design.md` before any UI work.** Use only its tokens — no new
   colors, no new fonts. Cinzel only ≥ 20px; Poppins everywhere else.
2. UI copy **German only**, Sie-form. Code/comments in English.
3. **One gold CTA per view.** Secondary actions: primary (ink) or outline.
4. Theme rhythm: dark (`ink`) sections = hero, contact block, CTA bands,
   footer; light (`paper`/`surface`) = content sections in between.
5. Focus rings always gold. Never `muted` on `gold`, never `gold` on `paper`.
6. Animations: 0.6–0.9s ease-out, transform/opacity only, always respect
   `prefers-reduced-motion`.
7. Company contact data comes from `content/site.ts` only — never hardcode.
