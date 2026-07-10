---
name: design-system
description: Use when creating or editing ANY UI component, page, section, style, or animation in this project — enforces the Uyer Management design system (design.md)
---

# Uyer Management Design System

Full token tables live in `design.md` (repo root). Read it. Then check
every change against this list:

## Checklist

- [ ] Fonts: Playfair Display for headings (`font-display`, bold/uppercase);
      Poppins for all body/label/button text (`font-body`). No other fonts.
- [ ] Colors: only ink/navy/gold/gold-wash/paper/surface/line/text/muted.
- [ ] Gold discipline: gold is the single accent — max ONE gold CTA per
      view. If two gold elements compete, one is wrong.
- [ ] Buttons: 4 variants (primary ink / accent gold / outline navy /
      disabled muted), radius 8px, Poppins 500.
- [ ] Focus: 2px gold ring, offset 2px, on every interactive element.
- [ ] Contrast: no muted-on-gold, no gold-on-paper text.
- [ ] Section rhythm: dark = hero/contact/CTA-band/footer; light = content.
- [ ] Copy: German, Sie-form, real `ä ö ü ß`.
- [ ] Motion: 0.6–0.9s ease-out, transform/opacity only,
      `prefers-reduced-motion` fallback.
