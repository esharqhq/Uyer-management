# Uyer Management — Design System

> German-language staffing & recruitment platform.
> Brand personality: **premium, trustworthy, understated** — carried by a deep
> navy foundation with a single warm gold accent.

All UI copy and examples are in **German** (matching production).

---

## 1. Typography

Two families do all the work.

| Role | Font | Usage |
|------|------|-------|
| **Display / Headings** | **Cinzel** | Page titles, section headers, hero text. Refined Roman inscriptional serif — reads as premium and authoritative. Use sparingly and large. |
| **Body / Small text / UI** | **Poppins** | Everything else: paragraphs, labels, buttons, inputs, captions, helper text. |

**Google Fonts import**

```html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@500;600;700&family=Poppins:wght@400;500;600&display=swap" rel="stylesheet">
```

```css
--font-display: "Cinzel", Georgia, serif;
--font-body: "Poppins", system-ui, sans-serif;
```

**Type scale** (suggested starting point)

| Token | Font | Size / Line | Weight | Example |
|-------|------|-------------|--------|---------|
| `display-xl` | Cinzel | 44 / 52 | 700 | Hero title |
| `display-lg` | Cinzel | 32 / 40 | 600 | Page title |
| `heading` | Cinzel | 24 / 32 | 600 | Section header |
| `body` | Poppins | 16 / 24 | 400 | Paragraph |
| `label` | Poppins | 14 / 20 | 500 | Form label |
| `small` | Poppins | 13 / 18 | 400 | Helper / caption |

> **Rule of thumb:** Cinzel only above 20px. At small sizes it loses legibility —
> use Poppins there.

---

## 2. Color tokens

### Brand

| Token | Hex | Usage |
|-------|-----|-------|
| `ink` | `#0E2A47` | Primary buttons, strong headings on light backgrounds, dark UI surfaces. |
| `navy` | `#14385E` | Secondary brand fill, outline-button border & text, links. |
| `gold` | `#C6A15B` | The **single accent**. Primary call-to-action ("Jetzt bewerben"), highlights, focus/active accents. Use sparingly. |
| `gold-wash` | `#F4ECDA` | Soft gold tint for backgrounds, badges, and subtle highlight fills. |

### Neutrals & Surfaces

| Token | Hex | Usage |
|-------|-----|-------|
| `paper` | `#F6F7F9` | App/page background. |
| `surface` | `#FFFFFF` | Cards, inputs, panels sitting on `paper`. |
| `line` | `#E4E8EE` | Borders, dividers, input outlines. |
| `text` | `#0F1E30` | Default body text. |
| `muted` | `#5B6B7D` | Secondary text, placeholders, disabled labels, captions. |

### CSS variables

```css
:root {
  /* brand */
  --ink:        #0E2A47;
  --navy:       #14385E;
  --gold:       #C6A15B;
  --gold-wash:  #F4ECDA;
  /* neutrals & surfaces */
  --paper:      #F6F7F9;
  --surface:    #FFFFFF;
  --line:       #E4E8EE;
  --text:       #0F1E30;
  --muted:      #5B6B7D;
}
```

> **Accent discipline:** gold is the only warm color. If two gold things compete
> on a screen, one of them is wrong. One primary CTA per view.

---

## 3. Buttons

Four variants. All use **Poppins 500**, radius ~8px, comfortable padding
(≈ 12px 20px).

| Variant | Fill | Text | Border | Example label |
|---------|------|------|--------|---------------|
| **Primary** | `ink` | `surface` (white) | none | Personal anfragen |
| **Accent** (main CTA) | `gold` | `ink` | none | Jetzt bewerben |
| **Outline** | `surface` | `navy` | 1px `navy` | Mehr erfahren |
| **Disabled** | `muted` | `surface` @ ~70% | none | Deaktiviert |

**States**

- **Hover:** darken fill ~8% (Primary/Accent); Outline fills with `navy` @ 6% tint.
- **Focus:** 2px `gold` focus ring, offset 2px.
- **Disabled:** `muted` fill, `cursor: not-allowed`, no hover.

```css
.btn { font-family: var(--font-body); font-weight: 500; border-radius: 8px;
       padding: 12px 20px; border: 1px solid transparent; cursor: pointer; }
.btn-primary { background: var(--ink);  color: var(--surface); }
.btn-accent  { background: var(--gold); color: var(--ink); }
.btn-outline { background: var(--surface); color: var(--navy); border-color: var(--navy); }
.btn:disabled, .btn-disabled { background: var(--muted); color: var(--surface);
       opacity: .85; cursor: not-allowed; }
.btn:focus-visible { outline: 2px solid var(--gold); outline-offset: 2px; }
```

---

## 4. Form controls

Backgrounds are `surface`, borders `line`, radius ~8px, labels `label` token
(Poppins 500), placeholders in `muted`.

### Text input

- Label above field. Required fields marked with a **gold `*`** after the label.
- Placeholder in `muted` (e.g. `Max Mustermann`).
- Focus: border → `navy`, add 2px `gold`/soft focus ring.

```
Vor- und Nachname *
┌───────────────────────────┐
│ Max Mustermann            │   ← placeholder in muted
└───────────────────────────┘
```

### Select / dropdown

- Same box styling as text input, with a chevron on the right.
- Example: `Region` → `Wien`.

### File upload

- **Dashed** `line` border, `surface` (or faint) background, radius ~8px.
- **Empty state:** prompt text inviting a file.
- **Selected state:** green check icon, filename in `text`
  (e.g. `Lebenslauf_Mustermann.pdf`), helper line in `muted`:
  *"Datei ausgewählt — zum Ersetzen klicken"*, and a soft green success tint.

### Checkbox

- Box: `ink` fill + white check when selected; `line` border when empty.
- Label in `body`/`small`, e.g.:
  *"Ich stimme der Verarbeitung meiner Daten gemäß Datenschutzerklärung zu."*
- Required for consent/GDPR (Datenschutz) flows.

---

## 5. Usage notes for Claude / developers

Apply this system consistently — do not introduce new colors or fonts.

- **Only two fonts:** Cinzel (headings ≥ 20px) and Poppins (everything else).
- **Only one accent:** gold. One primary CTA per view; secondary actions use
  Primary (ink) or Outline (navy).
- **Backgrounds:** `paper` for the page, `surface` for cards/inputs on top of it.
- **Text:** `text` for content, `muted` for secondary/placeholder/disabled.
- **Borders & dividers:** always `line`.
- **Focus is always gold.** Keep it visible for accessibility.
- **Language:** German UI copy (`ä ö ü ß`), formal register (Sie).
- **Contrast:** never put `muted` text on `gold`; never `gold` text on `paper`
  (too low contrast). Gold is for fills and accents, not body text.
