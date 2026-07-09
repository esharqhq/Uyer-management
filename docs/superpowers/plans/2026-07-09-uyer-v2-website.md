# Uyer Management v2 Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild uyermanagement.com as a modern premium marketing site (Next.js 15, Tailwind v4, GSAP) following `design.md` tokens, with working contact/application forms and strong SEO.

**Architecture:** App Router site with server components for pages, small client islands for forms (react-hook-form + zod) and GSAP animations. Two route handlers send email via Resend (mock mode without API key). Mixed dark/light section rhythm: dark (ink) hero/contact/CTA/footer, light (paper) content sections.

**Tech Stack:** Next.js 15+ (App Router, TS), Tailwind CSS v4, GSAP + @gsap/react + ScrollTrigger, react-hook-form + zod + @hookform/resolvers, Resend, Vitest + Testing Library.

## Global Constraints

- Spec: `docs/superpowers/specs/2026-07-09-uyer-v2-design.md`. Design tokens: `design.md` — **read both before starting any task.**
- UI copy **German only**, formal register (Sie), correct `ä ö ü ß`. Code, comments, commit messages in English.
- Only design.md tokens: colors `ink #0E2A47`, `navy #14385E`, `gold #C6A15B`, `gold-wash #F4ECDA`, `paper #F6F7F9`, `surface #FFFFFF`, `line #E4E8EE`, `text #0F1E30`, `muted #5B6B7D`. Fonts: Cinzel (headings ≥ 20px only), Poppins (everything else). **No new colors or fonts.**
- Exactly **one gold accent CTA per view**. Focus rings always gold.
- All GSAP animation: 0.6–0.9s, ease-out, transform/opacity only (no layout shift), must respect `prefers-reduced-motion` (instant show).
- Contrast rules: never `muted` text on `gold`; never `gold` text on `paper`.
- Company data (single source `content/site.ts`): Uyer Management Holding LLC-FZ, Meydan Grandstand, 6th Floor, Meydan Road, Nad Al Sheba / Dubai; +97 1506061687; business@uyermanagement.com; Mo–Fr 07:00–17:00.
- Commit after every task (steps say when).

---

### Task 1: Claude project configuration

**Files:**
- Create: `CLAUDE.md`
- Create: `.claude/settings.json`
- Create: `.claude/skills/design-system/SKILL.md`

**Interfaces:**
- Produces: project-wide rules every later session/agent reads automatically.

- [ ] **Step 1: Write `CLAUDE.md`**

```markdown
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
```

- [ ] **Step 2: Write `.claude/settings.json`**

```json
{
  "permissions": {
    "allow": [
      "Bash(npm run:*)",
      "Bash(npm install:*)",
      "Bash(npm i:*)",
      "Bash(npm test:*)",
      "Bash(npx next:*)",
      "Bash(npx vitest:*)",
      "Bash(npx tsc:*)"
    ]
  }
}
```

- [ ] **Step 3: Write `.claude/skills/design-system/SKILL.md`**

```markdown
---
name: design-system
description: Use when creating or editing ANY UI component, page, section, style, or animation in this project — enforces the Uyer Management design system (design.md)
---

# Uyer Management Design System

Full token tables live in `design.md` (repo root). Read it. Then check
every change against this list:

## Checklist

- [ ] Fonts: Cinzel only for headings ≥ 20px (`font-display`); Poppins for
      all body/label/button text (`font-body`). No other fonts.
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
```

- [ ] **Step 4: Commit**

```bash
git add CLAUDE.md .claude/
git commit -m "chore: add Claude project config and design-system skill"
```

---

### Task 2: Next.js scaffold, design tokens, fonts, test harness

**Files:**
- Create: `package.json`, `tsconfig.json`, `postcss.config.mjs`, `next.config.ts`, `.gitignore`, `.env.example`
- Create: `app/layout.tsx`, `app/globals.css`, `app/page.tsx` (placeholder)
- Create: `lib/cn.ts`, `vitest.config.mts`, `tests/setup.ts`, `tests/smoke.test.tsx`

**Interfaces:**
- Produces: Tailwind classes `bg-ink bg-navy bg-gold bg-gold-wash bg-paper bg-surface border-line text-text text-muted text-gold font-display font-body`; helper `cn(...classes: (string | false | undefined)[]): string`; font CSS vars `--font-cinzel`, `--font-poppins`.

> Note: `create-next-app` refuses non-empty directories (design.md, docs/),
> so scaffold manually — it is only ~6 files.

- [ ] **Step 1: Init package and install dependencies**

```bash
npm init -y
npm install next@latest react@latest react-dom@latest gsap @gsap/react react-hook-form zod @hookform/resolvers resend
npm install -D typescript @types/react @types/react-dom @types/node tailwindcss @tailwindcss/postcss postcss vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom
```

- [ ] **Step 2: Write config files**

`package.json` — set scripts (keep generated fields):

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "test": "vitest run",
    "test:watch": "vitest"
  }
}
```

`postcss.config.mjs`:

```js
export default { plugins: { "@tailwindcss/postcss": {} } };
```

`next.config.ts`:

```ts
import type { NextConfig } from "next";
const nextConfig: NextConfig = {};
export default nextConfig;
```

`tsconfig.json`:

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["dom", "dom.iterable", "esnext"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [{ "name": "next" }],
    "paths": { "@/*": ["./*"] }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}
```

`.gitignore`:

```
node_modules/
.next/
out/
.env*.local
*.tsbuildinfo
next-env.d.ts
coverage/
```

`.env.example`:

```
# Resend email delivery. Without RESEND_API_KEY the API routes run in mock
# mode (log + success response) so the site is fully testable.
RESEND_API_KEY=
MAIL_FROM=website@uyermanagement.com
MAIL_TO=business@uyermanagement.com
```

- [ ] **Step 3: Write `app/globals.css` (design.md tokens → Tailwind v4)**

```css
@import "tailwindcss";

@theme {
  /* brand — design.md §2 */
  --color-ink: #0e2a47;
  --color-navy: #14385e;
  --color-gold: #c6a15b;
  --color-gold-wash: #f4ecda;
  /* neutrals & surfaces */
  --color-paper: #f6f7f9;
  --color-surface: #ffffff;
  --color-line: #e4e8ee;
  --color-text: #0f1e30;
  --color-muted: #5b6b7d;
  /* typography — design.md §1 */
  --font-display: var(--font-cinzel), Georgia, serif;
  --font-body: var(--font-poppins), system-ui, sans-serif;
}

body {
  background: var(--color-paper);
  color: var(--color-text);
  font-family: var(--font-body);
}

/* Focus is always gold — design.md §5 */
:focus-visible {
  outline: 2px solid var(--color-gold);
  outline-offset: 2px;
}
```

- [ ] **Step 4: Write `app/layout.tsx` with self-hosted fonts**

```tsx
import type { Metadata } from "next";
import { Cinzel, Poppins } from "next/font/google";
import "./globals.css";

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-cinzel",
});
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.uyermanagement.com"),
  title: {
    default: "Uyer Management – Personalvermittlung für Gebäudereinigung",
    template: "%s | Uyer Management",
  },
  description:
    "Qualifiziertes Personal für die Gebäudereinigung in Österreich & Deutschland. Personalvermittlung, Dienstpläne, Lohnverrechnung und mehr.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="de" className={`${cinzel.variable} ${poppins.variable}`}>
      <body>{children}</body>
    </html>
  );
}
```

`app/page.tsx` placeholder (replaced in Task 10):

```tsx
export default function Home() {
  return <main className="p-8 font-display text-2xl">Uyer Management v2</main>;
}
```

- [ ] **Step 5: Write `lib/cn.ts`**

```ts
export function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}
```

- [ ] **Step 6: Set up Vitest**

`vitest.config.mts`:

```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "node:path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./tests/setup.ts"],
  },
  resolve: { alias: { "@": path.resolve(__dirname) } },
});
```

`tests/setup.ts`:

```ts
import "@testing-library/jest-dom/vitest";
```

`tests/smoke.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { cn } from "@/lib/cn";

describe("cn", () => {
  it("joins truthy classes", () => {
    expect(cn("a", false, "b", undefined)).toBe("a b");
  });
});
```

- [ ] **Step 7: Verify dev server and tests**

Run: `npm test` — Expected: 1 passed.
Run: `npm run dev` (background), open http://localhost:3000 — Expected: "Uyer Management v2" rendered in Cinzel on paper background.

- [ ] **Step 8: Commit**

```bash
git add -A
git commit -m "feat: scaffold Next.js 15 with Tailwind v4 design tokens, fonts, vitest"
```

---

### Task 3: Site content module + Button, Container, Section primitives

**Files:**
- Create: `content/site.ts`
- Create: `components/ui/Button.tsx`
- Create: `components/layout/Container.tsx`, `components/layout/Section.tsx`
- Test: `tests/button.test.tsx`

**Interfaces:**
- Produces: `site` object (`site.name`, `site.legalName`, `site.address` {street, floor, city}, `site.phone`, `site.phoneHref`, `site.whatsapp`, `site.email`, `site.hours`, `site.url`, `site.nav: {href, label}[]`, `site.services: {title, text}[]`);
  `<Button variant="primary" | "accent" | "outline" href?>` (renders `<a>` when `href` given, else `<button>`); `<Container>` (max-w wrapper); `<Section tone="light" | "surface" | "wash" | "dark">`.

- [ ] **Step 1: Write `content/site.ts`**

```ts
export const site = {
  name: "Uyer Management",
  legalName: "Uyer Management Holding LLC-FZ",
  url: "https://www.uyermanagement.com",
  address: {
    street: "Meydan Grandstand, 6th Floor, Meydan Road",
    area: "Nad Al Sheba",
    city: "Dubai",
    country: "Vereinigte Arabische Emirate",
  },
  phone: "+97 1506061687",
  phoneHref: "tel:+971506061687",
  whatsapp: "https://wa.me/971506061687",
  email: "business@uyermanagement.com",
  hours: { days: "Montag – Freitag", time: "07:00 – 17:00" },
  nav: [
    { href: "/", label: "Home" },
    { href: "/leistungen", label: "Leistungen" },
    { href: "/fuer-unternehmen", label: "Für Unternehmen" },
    { href: "/karriere", label: "Karriere" },
    { href: "/kontakt", label: "Kontakt" },
  ],
  services: [
    {
      title: "Personalvermittlung",
      text: "Wir vermitteln qualifiziertes Personal speziell im Bereich der Gebäudereinigung. Durch unsere europaweiten Netzwerke finden wir zuverlässig Fachkräfte für Ihren Betrieb.",
    },
    {
      title: "Dienst- & Arbeitspläne erstellen",
      text: "Eine gute Planung ist das Fundament für effiziente Abläufe. Wir erstellen individuelle Dienst- und Arbeitspläne für Ihr Team.",
    },
    {
      title: "Lohnverrechnung",
      text: "Fehlerfreie und pünktliche Lohnverrechnung ist für jedes Unternehmen unverzichtbar. Wir übernehmen sie zuverlässig für Sie.",
    },
    {
      title: "Vertragserstellung",
      text: "Rechtlich einwandfreie Verträge schützen Arbeitgeber und Arbeitnehmer. Wir kümmern uns um die korrekte Erstellung.",
    },
    {
      title: "Auftragsvermittlung",
      text: "Wir bringen Unternehmen und Auftragnehmer erfolgreich zusammen – europaweit, schnell und effizient.",
    },
  ],
} as const;
```

- [ ] **Step 2: Write failing Button test — `tests/button.test.tsx`**

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Button } from "@/components/ui/Button";

describe("Button", () => {
  it("renders accent variant as button", () => {
    render(<Button variant="accent">Jetzt bewerben</Button>);
    const btn = screen.getByRole("button", { name: "Jetzt bewerben" });
    expect(btn.className).toContain("bg-gold");
  });

  it("renders as link when href is given", () => {
    render(
      <Button variant="outline" href="/kontakt">
        Mehr erfahren
      </Button>,
    );
    const link = screen.getByRole("link", { name: "Mehr erfahren" });
    expect(link).toHaveAttribute("href", "/kontakt");
  });

  it("disabled button is not clickable", () => {
    render(<Button disabled>Deaktiviert</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });
});
```

Run: `npm test` — Expected: FAIL (`Button` module not found).

- [ ] **Step 3: Write `components/ui/Button.tsx` (design.md §3)**

```tsx
import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "accent" | "outline";

const variants: Record<Variant, string> = {
  primary: "bg-ink text-surface hover:brightness-110",
  accent: "bg-gold text-ink hover:brightness-95",
  outline:
    "bg-transparent text-navy border-navy hover:bg-navy/5 data-[on-dark=true]:text-gold data-[on-dark=true]:border-gold data-[on-dark=true]:hover:bg-gold/10",
};

type Props = {
  variant?: Variant;
  href?: string;
  onDark?: boolean;
  className?: string;
  children: React.ReactNode;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export function Button({
  variant = "primary",
  href,
  onDark,
  className,
  children,
  ...rest
}: Props) {
  const classes = cn(
    "inline-block rounded-lg border border-transparent px-5 py-3 font-body font-medium transition",
    variants[variant],
    variant === "outline" && "border-current",
    "disabled:cursor-not-allowed disabled:bg-muted disabled:text-surface/70",
    className,
  );
  if (href) {
    return (
      <Link href={href} data-on-dark={onDark} className={classes}>
        {children}
      </Link>
    );
  }
  return (
    <button data-on-dark={onDark} className={classes} {...rest}>
      {children}
    </button>
  );
}
```

- [ ] **Step 4: Run tests**

Run: `npm test` — Expected: all PASS.

- [ ] **Step 5: Write layout primitives**

`components/layout/Container.tsx`:

```tsx
import { cn } from "@/lib/cn";

export function Container({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("mx-auto w-full max-w-6xl px-5 sm:px-8", className)}>
      {children}
    </div>
  );
}
```

`components/layout/Section.tsx`:

```tsx
import { cn } from "@/lib/cn";

const tones = {
  light: "bg-paper text-text",
  surface: "bg-surface text-text",
  wash: "bg-gold-wash text-text",
  dark: "bg-ink text-surface",
} as const;

export function Section({
  tone = "light",
  className,
  children,
  ...rest
}: {
  tone?: keyof typeof tones;
  className?: string;
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLElement>) {
  return (
    <section className={cn("py-16 sm:py-24", tones[tone], className)} {...rest}>
      {children}
    </section>
  );
}
```

- [ ] **Step 6: Commit**

```bash
git add content/ components/ tests/button.test.tsx
git commit -m "feat: add site content module, Button, Container, Section primitives"
```

---

### Task 4: Form controls (Input, Select, Textarea, Checkbox, FileUpload)

**Files:**
- Create: `components/ui/Input.tsx`, `components/ui/Select.tsx`, `components/ui/Textarea.tsx`, `components/ui/Checkbox.tsx`, `components/ui/FileUpload.tsx`
- Test: `tests/form-controls.test.tsx`

**Interfaces:**
- Consumes: `cn` from `@/lib/cn`.
- Produces: all controls are `forwardRef` (react-hook-form `register` compatible) and accept `label: string`, `required?: boolean`, `error?: string` plus native props. `FileUpload` additionally accepts `fileName?: string | null` (shows selected state). Labels/colors inherit `currentColor` so they work on dark and light sections.

- [ ] **Step 1: Write failing tests — `tests/form-controls.test.tsx`**

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Input } from "@/components/ui/Input";
import { FileUpload } from "@/components/ui/FileUpload";

describe("Input", () => {
  it("shows label with gold asterisk when required", () => {
    render(<Input label="Vor- und Nachname" required name="name" />);
    expect(screen.getByLabelText(/Vor- und Nachname/)).toBeInTheDocument();
    expect(screen.getByText("*")).toHaveClass("text-gold");
  });

  it("renders error message", () => {
    render(<Input label="E-Mail" name="email" error="Bitte geben Sie eine gültige E-Mail-Adresse ein." />);
    expect(
      screen.getByText("Bitte geben Sie eine gültige E-Mail-Adresse ein."),
    ).toBeInTheDocument();
  });
});

describe("FileUpload", () => {
  it("shows selected file state", () => {
    render(
      <FileUpload label="Lebenslauf" name="cv" fileName="Lebenslauf_Mustermann.pdf" />,
    );
    expect(screen.getByText("Lebenslauf_Mustermann.pdf")).toBeInTheDocument();
    expect(
      screen.getByText("Datei ausgewählt – zum Ersetzen klicken"),
    ).toBeInTheDocument();
  });
});
```

Run: `npm test` — Expected: FAIL (modules not found).

- [ ] **Step 2: Write shared field bits + `Input`**

`components/ui/Input.tsx`:

```tsx
import { forwardRef, useId } from "react";
import { cn } from "@/lib/cn";

export function FieldLabel({
  htmlFor,
  label,
  required,
}: {
  htmlFor: string;
  label: string;
  required?: boolean;
}) {
  return (
    <label htmlFor={htmlFor} className="mb-1.5 block font-body text-sm font-medium">
      {label}
      {required && <span className="ml-0.5 text-gold">*</span>}
    </label>
  );
}

export function FieldError({ error }: { error?: string }) {
  if (!error) return null;
  // red-500 stays readable on both light (paper/surface) and dark (ink) sections
  return <p className="mt-1 text-sm font-medium text-red-500">{error}</p>;
}

export const fieldClasses =
  "w-full rounded-lg border border-line bg-surface px-3.5 py-2.5 font-body text-text placeholder:text-muted focus:border-navy";

type InputProps = {
  label: string;
  error?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, required, className, id, ...rest }, ref) => {
    const autoId = useId();
    const inputId = id ?? autoId;
    return (
      <div className={className}>
        <FieldLabel htmlFor={inputId} label={label} required={required} />
        <input id={inputId} ref={ref} required={required} className={fieldClasses} {...rest} />
        <FieldError error={error} />
      </div>
    );
  },
);
Input.displayName = "Input";
```

> Note: error red is a functional state color (like the success green in
> design.md §4 file upload), not a new brand color.

- [ ] **Step 3: Write `Select`, `Textarea`, `Checkbox`, `FileUpload`**

`components/ui/Select.tsx`:

```tsx
import { forwardRef, useId } from "react";
import { FieldLabel, FieldError, fieldClasses } from "./Input";
import { cn } from "@/lib/cn";

type Props = {
  label: string;
  error?: string;
  options: readonly string[];
  placeholder?: string;
} & React.SelectHTMLAttributes<HTMLSelectElement>;

export const Select = forwardRef<HTMLSelectElement, Props>(
  ({ label, error, options, placeholder, required, className, id, ...rest }, ref) => {
    const autoId = useId();
    const selectId = id ?? autoId;
    return (
      <div className={className}>
        <FieldLabel htmlFor={selectId} label={label} required={required} />
        <select
          id={selectId}
          ref={ref}
          required={required}
          defaultValue=""
          className={cn(fieldClasses, "appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%228%22><path d=%22M1 1l5 5 5-5%22 stroke=%22%235B6B7D%22 stroke-width=%222%22 fill=%22none%22/></svg>')] bg-[position:right_14px_center] bg-no-repeat pr-10")}
          {...rest}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        <FieldError error={error} />
      </div>
    );
  },
);
Select.displayName = "Select";
```

`components/ui/Textarea.tsx`:

```tsx
import { forwardRef, useId } from "react";
import { FieldLabel, FieldError, fieldClasses } from "./Input";
import { cn } from "@/lib/cn";

type Props = { label: string; error?: string } & React.TextareaHTMLAttributes<HTMLTextAreaElement>;

export const Textarea = forwardRef<HTMLTextAreaElement, Props>(
  ({ label, error, required, className, id, ...rest }, ref) => {
    const autoId = useId();
    const areaId = id ?? autoId;
    return (
      <div className={className}>
        <FieldLabel htmlFor={areaId} label={label} required={required} />
        <textarea id={areaId} ref={ref} required={required} rows={5} className={cn(fieldClasses, "resize-y")} {...rest} />
        <FieldError error={error} />
      </div>
    );
  },
);
Textarea.displayName = "Textarea";
```

`components/ui/Checkbox.tsx`:

```tsx
import { forwardRef, useId } from "react";
import { FieldError } from "./Input";

type Props = { label: React.ReactNode; error?: string } & React.InputHTMLAttributes<HTMLInputElement>;

export const Checkbox = forwardRef<HTMLInputElement, Props>(
  ({ label, error, className, id, ...rest }, ref) => {
    const autoId = useId();
    const boxId = id ?? autoId;
    return (
      <div className={className}>
        <div className="flex items-start gap-2.5">
          <input
            id={boxId}
            ref={ref}
            type="checkbox"
            className="mt-1 size-4 shrink-0 accent-ink"
            {...rest}
          />
          <label htmlFor={boxId} className="font-body text-sm">
            {label}
          </label>
        </div>
        <FieldError error={error} />
      </div>
    );
  },
);
Checkbox.displayName = "Checkbox";
```

`components/ui/FileUpload.tsx` (design.md §4 file upload states):

```tsx
import { forwardRef, useId } from "react";
import { FieldLabel, FieldError } from "./Input";
import { cn } from "@/lib/cn";

type Props = {
  label: string;
  error?: string;
  fileName?: string | null;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const FileUpload = forwardRef<HTMLInputElement, Props>(
  ({ label, error, fileName, required, className, id, ...rest }, ref) => {
    const autoId = useId();
    const inputId = id ?? autoId;
    const selected = Boolean(fileName);
    return (
      <div className={className}>
        <FieldLabel htmlFor={inputId} label={label} required={required} />
        <label
          htmlFor={inputId}
          className={cn(
            "block cursor-pointer rounded-lg border border-dashed px-4 py-6 text-center font-body text-sm transition",
            selected
              ? "border-green-600 bg-green-600/10"
              : "border-line bg-surface hover:border-navy",
          )}
        >
          {selected ? (
            <>
              <span className="font-medium text-text">✓ {fileName}</span>
              <span className="mt-1 block text-muted">
                Datei ausgewählt – zum Ersetzen klicken
              </span>
            </>
          ) : (
            <span className="text-muted">
              Lebenslauf hochladen (PDF oder Word, max. 5 MB)
            </span>
          )}
        </label>
        <input id={inputId} ref={ref} type="file" className="sr-only" accept=".pdf,.doc,.docx" {...rest} />
        <FieldError error={error} />
      </div>
    );
  },
);
FileUpload.displayName = "FileUpload";
```

- [ ] **Step 4: Run tests**

Run: `npm test` — Expected: all PASS.

- [ ] **Step 5: Commit**

```bash
git add components/ui/ tests/form-controls.test.tsx
git commit -m "feat: add form controls per design system (input, select, textarea, checkbox, file upload)"
```

---

### Task 5: Header and Footer, wired into layout

**Files:**
- Create: `components/layout/Header.tsx`, `components/layout/Footer.tsx`
- Modify: `app/layout.tsx` (wrap children with Header/Footer)

**Interfaces:**
- Consumes: `site` from `@/content/site`, `Container`.
- Produces: sitewide chrome; `<main>` landmark between header and footer.

- [ ] **Step 1: Write `components/layout/Header.tsx` (client — mobile menu state)**

```tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/content/site";
import { Container } from "./Container";
import { cn } from "@/lib/cn";

export function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-ink/95 text-surface backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="font-display text-xl font-semibold tracking-wide text-gold">
          UYER MANAGEMENT
        </Link>
        <nav aria-label="Hauptnavigation" className="hidden md:block">
          <ul className="flex items-center gap-7">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={cn(
                    "font-body text-sm font-medium transition hover:text-gold",
                    pathname === item.href ? "text-gold" : "text-surface",
                  )}
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <button
          type="button"
          onClick={() => setOpen(!open)}
          aria-expanded={open}
          aria-label="Menü öffnen"
          className="md:hidden"
        >
          <span className="block h-0.5 w-6 bg-surface" />
          <span className="mt-1.5 block h-0.5 w-6 bg-surface" />
          <span className="mt-1.5 block h-0.5 w-6 bg-surface" />
        </button>
      </Container>
      {open && (
        <nav aria-label="Mobile Navigation" className="border-t border-navy md:hidden">
          <ul className="space-y-1 px-5 py-4">
            {site.nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block py-2 font-body font-medium text-surface hover:text-gold"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
```

- [ ] **Step 2: Write `components/layout/Footer.tsx`**

```tsx
import Link from "next/link";
import { site } from "@/content/site";
import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="bg-ink text-surface">
      <Container className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <p className="font-display text-lg text-gold">{site.legalName}</p>
          <address className="mt-3 font-body text-sm not-italic leading-6 text-surface/80">
            {site.address.street}
            <br />
            {site.address.area}, {site.address.city}
          </address>
        </div>
        <div>
          <p className="font-body text-sm font-semibold uppercase tracking-wider text-gold">
            Kontakt
          </p>
          <ul className="mt-3 space-y-2 font-body text-sm text-surface/80">
            <li>
              <a href={site.phoneHref} className="hover:text-gold">{site.phone}</a>
            </li>
            <li>
              <a href={site.whatsapp} className="hover:text-gold">WhatsApp</a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="hover:text-gold">{site.email}</a>
            </li>
          </ul>
          <p className="mt-4 font-body text-sm text-surface/80">
            <span className="font-semibold text-surface">Öffnungszeiten:</span>
            <br />
            {site.hours.days}, {site.hours.time}
          </p>
        </div>
        <div>
          <p className="font-body text-sm font-semibold uppercase tracking-wider text-gold">
            Rechtliches
          </p>
          <ul className="mt-3 space-y-2 font-body text-sm text-surface/80">
            <li>
              <Link href="/impressum" className="hover:text-gold">Impressum</Link>
            </li>
            <li>
              <Link href="/datenschutz" className="hover:text-gold">Datenschutz</Link>
            </li>
          </ul>
        </div>
      </Container>
      <div className="border-t border-navy py-4 text-center font-body text-xs text-surface/60">
        © {new Date().getFullYear()} {site.legalName}
      </div>
    </footer>
  );
}
```

- [ ] **Step 3: Wire into `app/layout.tsx`**

Replace the `<body>` content:

```tsx
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
// ...
      <body className="flex min-h-screen flex-col">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
```

- [ ] **Step 4: Verify visually**

Run: `npm run dev` — check http://localhost:3000: sticky dark header with gold logo, nav links, working mobile burger at < 768px, dark footer with three columns.

- [ ] **Step 5: Commit**

```bash
git add components/layout/ app/layout.tsx
git commit -m "feat: add sitewide header with mobile menu and footer"
```

---

### Task 6: GSAP motion components

**Files:**
- Create: `components/motion/AnimatedSection.tsx`, `components/motion/StatCounter.tsx`, `components/motion/hero-animation.ts`

**Interfaces:**
- Consumes: `gsap`, `@gsap/react`.
- Produces: `<AnimatedSection stagger?: number, className?>` (scroll-reveal wrapper; with `stagger` animates direct children sequentially); `<StatCounter value: number, suffix?: string, label: string>`; `runHeroIntro(scope: HTMLElement)` used by hero components (animates `[data-hero-line]` elements: draw + text rise).

- [ ] **Step 1: Write `components/motion/AnimatedSection.tsx`**

```tsx
"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function AnimatedSection({
  stagger = 0,
  className,
  children,
}: {
  stagger?: number;
  className?: string;
  children: React.ReactNode;
}) {
  const ref = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const el = ref.current!;
        gsap.from(stagger > 0 ? Array.from(el.children) : el, {
          opacity: 0,
          y: 40,
          duration: 0.8,
          ease: "power2.out",
          stagger,
          scrollTrigger: { trigger: el, start: "top 80%", once: true },
        });
      });
    },
    { scope: ref },
  );

  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
}
```

- [ ] **Step 2: Write `components/motion/StatCounter.tsx`**

```tsx
"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function StatCounter({
  value,
  suffix = "",
  label,
}: {
  value: number;
  suffix?: string;
  label: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);

  useGSAP(() => {
    const el = ref.current!;
    const mm = gsap.matchMedia();
    mm.add("(prefers-reduced-motion: no-preference)", () => {
      const obj = { n: 0 };
      gsap.to(obj, {
        n: value,
        duration: 0.9,
        ease: "power1.out",
        scrollTrigger: { trigger: el, start: "top 85%", once: true },
        onUpdate: () => {
          el.textContent = `${Math.round(obj.n)}${suffix}`;
        },
      });
    });
  });

  return (
    <div className="text-center">
      <span ref={ref} className="font-display text-4xl font-bold text-gold">
        {value}
        {suffix}
      </span>
      <p className="mt-2 font-body text-sm text-muted">{label}</p>
    </div>
  );
}
```

- [ ] **Step 3: Write `components/motion/hero-animation.ts`**

```ts
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
```

- [ ] **Step 4: Verify no build errors**

Run: `npx tsc --noEmit` — Expected: no errors.
Run: `npm test` — Expected: existing tests still PASS.

- [ ] **Step 5: Commit**

```bash
git add components/motion/
git commit -m "feat: add GSAP motion components with reduced-motion fallbacks"
```

---

### Task 7: Zod schemas and email delivery module (TDD)

**Files:**
- Create: `lib/schemas.ts`, `lib/email.ts`
- Test: `tests/schemas.test.ts`, `tests/email.test.ts`

**Interfaces:**
- Produces: `contactSchema` / `ContactInput` (firstName, lastName, phone?, email, message, consent), `applySchema` / `ApplyInput` (name, phone, email, region, consent), `REGIONS: readonly string[]`, `CV_MAX_BYTES = 5 * 1024 * 1024`, `CV_TYPES` (pdf/doc/docx MIME list);
  `sendMail({ subject, html, attachments? }): Promise<{ mocked: boolean }>` — mock mode when `RESEND_API_KEY` unset.

- [ ] **Step 1: Write failing schema tests — `tests/schemas.test.ts`**

```ts
import { describe, it, expect } from "vitest";
import { contactSchema, applySchema } from "@/lib/schemas";

const validContact = {
  firstName: "Max",
  lastName: "Mustermann",
  phone: "",
  email: "max@example.com",
  message: "Ich interessiere mich für Ihre Leistungen.",
  consent: true,
};

describe("contactSchema", () => {
  it("accepts valid input", () => {
    expect(contactSchema.safeParse(validContact).success).toBe(true);
  });

  it("rejects missing consent with German message", () => {
    const r = contactSchema.safeParse({ ...validContact, consent: false });
    expect(r.success).toBe(false);
    expect(JSON.stringify(r.error?.issues)).toContain("Datenschutzerklärung");
  });

  it("rejects invalid email with German message", () => {
    const r = contactSchema.safeParse({ ...validContact, email: "nope" });
    expect(r.success).toBe(false);
    expect(JSON.stringify(r.error?.issues)).toContain("gültige E-Mail");
  });
});

describe("applySchema", () => {
  it("accepts valid input", () => {
    const r = applySchema.safeParse({
      name: "Max Mustermann",
      phone: "+43 660 1234567",
      email: "max@example.com",
      region: "Wien",
      consent: true,
    });
    expect(r.success).toBe(true);
  });

  it("rejects unknown region", () => {
    const r = applySchema.safeParse({
      name: "Max Mustermann",
      phone: "+43 660 1234567",
      email: "max@example.com",
      region: "Mars",
      consent: true,
    });
    expect(r.success).toBe(false);
  });
});
```

Run: `npm test` — Expected: FAIL (module not found).

- [ ] **Step 2: Write `lib/schemas.ts`**

```ts
import { z } from "zod";

export const REGIONS = [
  "Wien",
  "Niederösterreich",
  "Oberösterreich",
  "Salzburg",
  "Steiermark",
  "Tirol",
  "Andere Region (Österreich)",
  "Deutschland",
] as const;

export const CV_MAX_BYTES = 5 * 1024 * 1024;
export const CV_TYPES = [
  "application/pdf",
  "application/msword",
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
];

const consent = z
  .boolean()
  .refine((v) => v === true, "Bitte stimmen Sie der Datenschutzerklärung zu.");

const email = z
  .string()
  .email("Bitte geben Sie eine gültige E-Mail-Adresse ein.");

export const contactSchema = z.object({
  firstName: z.string().min(2, "Bitte geben Sie Ihren Vornamen ein."),
  lastName: z.string().min(2, "Bitte geben Sie Ihren Nachnamen ein."),
  phone: z.string().optional().or(z.literal("")),
  email,
  message: z.string().min(10, "Bitte geben Sie Ihre Nachricht ein (mind. 10 Zeichen)."),
  consent,
});
export type ContactInput = z.infer<typeof contactSchema>;

export const applySchema = z.object({
  name: z.string().min(3, "Bitte geben Sie Ihren Vor- und Nachnamen ein."),
  phone: z.string().min(6, "Bitte geben Sie Ihre Telefonnummer ein."),
  email,
  region: z.enum(REGIONS, { message: "Bitte wählen Sie Ihre Region." }),
  consent,
});
export type ApplyInput = z.infer<typeof applySchema>;
```

- [ ] **Step 3: Run schema tests**

Run: `npm test` — Expected: schema tests PASS.

- [ ] **Step 4: Write failing email test — `tests/email.test.ts`**

```ts
import { describe, it, expect, vi, beforeEach } from "vitest";

describe("sendMail", () => {
  beforeEach(() => {
    vi.resetModules();
    delete process.env.RESEND_API_KEY;
  });

  it("runs in mock mode without RESEND_API_KEY", async () => {
    const { sendMail } = await import("@/lib/email");
    const result = await sendMail({ subject: "Test", html: "<p>Hi</p>" });
    expect(result.mocked).toBe(true);
  });
});
```

Run: `npm test` — Expected: FAIL (module not found).

- [ ] **Step 5: Write `lib/email.ts`**

```ts
import { Resend } from "resend";

type Attachment = { filename: string; content: Buffer };

export async function sendMail(opts: {
  subject: string;
  html: string;
  attachments?: Attachment[];
}): Promise<{ mocked: boolean }> {
  const key = process.env.RESEND_API_KEY;
  if (!key) {
    console.log(`[mail:mock] ${opts.subject}`);
    return { mocked: true };
  }
  const resend = new Resend(key);
  const { error } = await resend.emails.send({
    from: process.env.MAIL_FROM ?? "website@uyermanagement.com",
    to: process.env.MAIL_TO ?? "business@uyermanagement.com",
    subject: opts.subject,
    html: opts.html,
    attachments: opts.attachments,
  });
  if (error) throw new Error(`Mail delivery failed: ${error.message}`);
  return { mocked: false };
}
```

- [ ] **Step 6: Run tests, commit**

Run: `npm test` — Expected: all PASS.

```bash
git add lib/schemas.ts lib/email.ts tests/schemas.test.ts tests/email.test.ts
git commit -m "feat: add zod form schemas (German messages) and Resend email module with mock mode"
```

---

### Task 8: API route handlers (TDD)

**Files:**
- Create: `app/api/contact/route.ts`, `app/api/apply/route.ts`
- Test: `tests/api-contact.test.ts`, `tests/api-apply.test.ts`

**Interfaces:**
- Consumes: `contactSchema`, `applySchema`, `CV_MAX_BYTES`, `CV_TYPES`, `sendMail`.
- Produces: `POST /api/contact` (JSON body `ContactInput` → 200 `{ok: true}` | 400 `{ok: false, errors}`); `POST /api/apply` (multipart FormData: `ApplyInput` fields + `cv` File → same response shape; consent arrives as string `"true"`).

- [ ] **Step 1: Write failing tests**

`tests/api-contact.test.ts`:

```ts
// @vitest-environment node
import { describe, it, expect, beforeEach, vi } from "vitest";

beforeEach(() => {
  vi.resetModules();
  delete process.env.RESEND_API_KEY; // mock mode
});

function req(body: unknown) {
  return new Request("http://localhost/api/contact", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(body),
  });
}

describe("POST /api/contact", () => {
  it("returns 200 for valid input (mock mode)", async () => {
    const { POST } = await import("@/app/api/contact/route");
    const res = await POST(
      req({
        firstName: "Max",
        lastName: "Mustermann",
        phone: "",
        email: "max@example.com",
        message: "Ich interessiere mich für Ihre Leistungen.",
        consent: true,
      }),
    );
    expect(res.status).toBe(200);
    expect((await res.json()).ok).toBe(true);
  });

  it("returns 400 for invalid input", async () => {
    const { POST } = await import("@/app/api/contact/route");
    const res = await POST(req({ firstName: "M" }));
    expect(res.status).toBe(400);
  });
});
```

`tests/api-apply.test.ts`:

```ts
// @vitest-environment node
import { describe, it, expect, beforeEach, vi } from "vitest";

beforeEach(() => {
  vi.resetModules();
  delete process.env.RESEND_API_KEY;
});

function formReq(overrides: Record<string, string> = {}, file?: File) {
  const fd = new FormData();
  fd.set("name", "Max Mustermann");
  fd.set("phone", "+43 660 1234567");
  fd.set("email", "max@example.com");
  fd.set("region", "Wien");
  fd.set("consent", "true");
  for (const [k, v] of Object.entries(overrides)) fd.set(k, v);
  if (file) fd.set("cv", file);
  return new Request("http://localhost/api/apply", { method: "POST", body: fd });
}

describe("POST /api/apply", () => {
  it("accepts valid application with PDF cv", async () => {
    const { POST } = await import("@/app/api/apply/route");
    const cv = new File(["%PDF-1.4"], "Lebenslauf_Mustermann.pdf", {
      type: "application/pdf",
    });
    const res = await POST(formReq({}, cv));
    expect(res.status).toBe(200);
  });

  it("rejects missing cv", async () => {
    const { POST } = await import("@/app/api/apply/route");
    const res = await POST(formReq());
    expect(res.status).toBe(400);
    const body = await res.json();
    expect(JSON.stringify(body.errors)).toContain("Lebenslauf");
  });

  it("rejects wrong file type", async () => {
    const { POST } = await import("@/app/api/apply/route");
    const cv = new File(["GIF89a"], "bild.gif", { type: "image/gif" });
    const res = await POST(formReq({}, cv));
    expect(res.status).toBe(400);
  });
});
```

Run: `npm test` — Expected: FAIL (modules not found).

- [ ] **Step 2: Write `app/api/contact/route.ts`**

```ts
import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/schemas";
import { sendMail } from "@/lib/email";

function esc(s: string) {
  return s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
}

export async function POST(req: Request) {
  let data: unknown;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ ok: false, errors: ["Ungültige Anfrage."] }, { status: 400 });
  }

  const parsed = contactSchema.safeParse(data);
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, errors: parsed.error.issues.map((i) => i.message) },
      { status: 400 },
    );
  }

  const d = parsed.data;
  try {
    await sendMail({
      subject: `Kontaktanfrage von ${d.firstName} ${d.lastName}`,
      html: `
        <h2>Neue Kontaktanfrage</h2>
        <p><b>Name:</b> ${esc(d.firstName)} ${esc(d.lastName)}</p>
        <p><b>E-Mail:</b> ${esc(d.email)}</p>
        <p><b>Telefon:</b> ${esc(d.phone || "–")}</p>
        <p><b>Nachricht:</b></p>
        <p>${esc(d.message)}</p>`,
    });
  } catch {
    return NextResponse.json(
      { ok: false, errors: ["Senden fehlgeschlagen. Bitte versuchen Sie es später erneut."] },
      { status: 502 },
    );
  }
  return NextResponse.json({ ok: true });
}
```

- [ ] **Step 3: Write `app/api/apply/route.ts`**

```ts
import { NextResponse } from "next/server";
import { applySchema, CV_MAX_BYTES, CV_TYPES } from "@/lib/schemas";
import { sendMail } from "@/lib/email";

function esc(s: string) {
  return s.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`);
}

export async function POST(req: Request) {
  const fd = await req.formData();
  const parsed = applySchema.safeParse({
    name: fd.get("name"),
    phone: fd.get("phone"),
    email: fd.get("email"),
    region: fd.get("region"),
    consent: fd.get("consent") === "true",
  });

  const errors: string[] = parsed.success
    ? []
    : parsed.error.issues.map((i) => i.message);

  const cv = fd.get("cv");
  if (!(cv instanceof File) || cv.size === 0) {
    errors.push("Bitte laden Sie Ihren Lebenslauf hoch.");
  } else if (!CV_TYPES.includes(cv.type)) {
    errors.push("Bitte laden Sie Ihren Lebenslauf als PDF oder Word-Datei hoch.");
  } else if (cv.size > CV_MAX_BYTES) {
    errors.push("Die Datei ist zu groß (max. 5 MB).");
  }

  if (errors.length || !parsed.success) {
    return NextResponse.json({ ok: false, errors }, { status: 400 });
  }

  const d = parsed.data;
  const file = cv as File;
  try {
    await sendMail({
      subject: `Bewerbung von ${d.name} (${d.region})`,
      html: `
        <h2>Neue Bewerbung</h2>
        <p><b>Name:</b> ${esc(d.name)}</p>
        <p><b>E-Mail:</b> ${esc(d.email)}</p>
        <p><b>Telefon:</b> ${esc(d.phone)}</p>
        <p><b>Region:</b> ${esc(d.region)}</p>`,
      attachments: [
        { filename: file.name, content: Buffer.from(await file.arrayBuffer()) },
      ],
    });
  } catch {
    return NextResponse.json(
      { ok: false, errors: ["Senden fehlgeschlagen. Bitte versuchen Sie es später erneut."] },
      { status: 502 },
    );
  }
  return NextResponse.json({ ok: true });
}
```

- [ ] **Step 4: Run tests, commit**

Run: `npm test` — Expected: all PASS.

```bash
git add app/api/ tests/api-contact.test.ts tests/api-apply.test.ts
git commit -m "feat: add contact and apply API routes with validation and mock-mode email"
```

---

### Task 9: Image assets

**Files:**
- Create: `public/images/hero-home.jpg`, `public/images/hero-services.jpg`, `public/images/section-team.jpg`
- Create: `public/images/CREDITS.md`

- [ ] **Step 1: Download brand-fit Unsplash photos (free license)**

```bash
mkdir -p public/images
curl -L -o public/images/hero-home.jpg "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=2400&q=80&fm=jpg"
curl -L -o public/images/hero-services.jpg "https://images.unsplash.com/photo-1497366216548-37526070297c?w=2400&q=80&fm=jpg"
curl -L -o public/images/section-team.jpg "https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=1600&q=80&fm=jpg"
```

If any URL 404s, pick a replacement on unsplash.com searching "glass building low angle" / "modern office" / "professional cleaning" — dark, blue-toned images fit the navy overlay.

- [ ] **Step 2: Write `public/images/CREDITS.md`**

```markdown
# Image credits

All photos from Unsplash (https://unsplash.com/license — free to use).
- hero-home.jpg — low-angle glass towers (Sean Pollock)
- hero-services.jpg — modern office interior
- section-team.jpg — professional cleaning

User approval of final image selection pending (spec: open item).
```

- [ ] **Step 3: Verify each image opens (Read tool / image viewer), then commit**

```bash
git add public/images/
git commit -m "chore: add licensed hero and section imagery"
```

---

### Task 10: Home page

**Files:**
- Create: `components/home/Hero.tsx`, `components/home/ServicesGrid.tsx`, `components/home/Advantages.tsx`, `components/home/StaffCta.tsx`, `components/home/CoverageMap.tsx`
- Modify: `app/page.tsx` (replace placeholder)

**Interfaces:**
- Consumes: `site`, `Button`, `Container`, `Section`, `AnimatedSection`, `StatCounter`, `runHeroIntro`.
- Produces: complete `/` page. `ServicesGrid` accepts `detailed?: boolean` (reused on `/leistungen`).

- [ ] **Step 1: Write `components/home/Hero.tsx` (dark, GSAP intro, parallax)**

```tsx
"use client";

import { useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { Button } from "@/components/ui/Button";
import { runHeroIntro } from "@/components/motion/hero-animation";

gsap.registerPlugin(ScrollTrigger, useGSAP);

export function Hero() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const scope = ref.current!;
      runHeroIntro(scope);
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        gsap.to(scope.querySelector("[data-hero-bg]"), {
          yPercent: 12,
          ease: "none",
          scrollTrigger: { trigger: scope, start: "top top", end: "bottom top", scrub: true },
        });
      });
    },
    { scope: ref },
  );

  return (
    <section ref={ref} className="relative flex min-h-[88vh] items-center overflow-hidden bg-ink text-surface">
      <div data-hero-bg className="absolute inset-0 scale-110">
        <Image
          src="/images/hero-home.jpg"
          alt="Glasfassaden moderner Bürogebäude"
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-ink/70 via-ink/60 to-ink/90" />
      </div>
      <div className="relative mx-auto max-w-4xl px-5 text-center">
        <div className="mb-8 flex items-center justify-center gap-6">
          <span data-hero-rule className="h-px w-24 bg-gold/60 sm:w-40" />
          <span data-hero-rule className="h-px w-24 bg-gold/60 sm:w-40" />
        </div>
        <h1 data-hero-line className="font-display text-4xl font-bold uppercase tracking-wide text-gold sm:text-6xl">
          Qualifiziertes Personal
        </h1>
        <p data-hero-line className="mt-4 font-body text-lg text-surface/90">
          für die Gebäudereinigung in Österreich &amp; Deutschland
        </p>
        <div data-hero-line className="mt-9">
          <Button variant="outline" onDark href="/kontakt">
            » Kontakt aufnehmen
          </Button>
        </div>
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Write `components/home/ServicesGrid.tsx`**

```tsx
import { site } from "@/content/site";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { AnimatedSection } from "@/components/motion/AnimatedSection";

export function ServicesGrid({ detailed = false }: { detailed?: boolean }) {
  return (
    <Section tone="light" aria-labelledby="services-heading">
      <Container>
        <h2 id="services-heading" className="text-center font-display text-3xl font-semibold">
          Unser Leistungsspektrum
        </h2>
        <p className="mx-auto mt-4 max-w-2xl text-center font-body text-muted">
          Als europaweit tätiges Unternehmen in der Personalvermittlung und
          Auftragsvermittlung, mit Schwerpunkt in Österreich und Deutschland,
          bieten wir Ihnen ein vollständiges Leistungspaket.
        </p>
        <AnimatedSection stagger={0.12} className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {site.services.map((s, i) => (
            <article
              key={s.title}
              className="rounded-lg border border-line bg-surface p-6 shadow-sm"
            >
              <span className="font-display text-2xl text-gold">{String(i + 1).padStart(2, "0")}</span>
              <h3 className="mt-3 font-display text-xl font-semibold">{s.title}</h3>
              <p className="mt-2 font-body text-sm leading-6 text-muted">
                {detailed ? s.text : s.text.split(". ")[0] + "."}
              </p>
            </article>
          ))}
        </AnimatedSection>
      </Container>
    </Section>
  );
}
```

- [ ] **Step 3: Write `components/home/Advantages.tsx`**

> Stat numbers below are launch placeholders — flagged in the spec as an
> open item; the user confirms real figures before go-live.

```tsx
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { AnimatedSection } from "@/components/motion/AnimatedSection";
import { StatCounter } from "@/components/motion/StatCounter";

const points = [
  {
    title: "Flexible Lösungen",
    text: "Personal genau dann, wenn Sie es brauchen – kurzfristig oder langfristig.",
  },
  {
    title: "Qualifizierte Fachkräfte",
    text: "Geprüftes Personal mit Erfahrung in der professionellen Gebäudereinigung.",
  },
  {
    title: "Komplette Prozessbetreuung",
    text: "Von der Suche über Verträge bis zur Lohnverrechnung – alles aus einer Hand.",
  },
  {
    title: "Europaweites Netzwerk",
    text: "Schwerpunkt Österreich & Deutschland, Reichweite in ganz Europa.",
  },
];

export function Advantages() {
  return (
    <Section tone="surface" aria-labelledby="advantages-heading">
      <Container>
        <h2 id="advantages-heading" className="text-center font-display text-3xl font-semibold">
          Ihr Vorteil: Partnerschaft auf Augenhöhe
        </h2>
        <AnimatedSection stagger={0.12} className="mt-12 grid gap-8 sm:grid-cols-2">
          {points.map((p) => (
            <div key={p.title} className="flex gap-4">
              <span className="mt-1 size-2.5 shrink-0 rotate-45 bg-gold" aria-hidden />
              <div>
                <h3 className="font-body text-lg font-semibold">{p.title}</h3>
                <p className="mt-1 font-body text-sm leading-6 text-muted">{p.text}</p>
              </div>
            </div>
          ))}
        </AnimatedSection>
        <div className="mt-16 grid grid-cols-3 gap-6 border-t border-line pt-12">
          <StatCounter value={2} label="Länder im Fokus" />
          <StatCounter value={5} label="Leistungsbereiche" />
          <StatCounter value={100} suffix="%" label="Prozessbetreuung" />
        </div>
      </Container>
    </Section>
  );
}
```

- [ ] **Step 4: Write `components/home/StaffCta.tsx` (dark CTA band — the ONE gold accent on home)**

```tsx
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { AnimatedSection } from "@/components/motion/AnimatedSection";

export function StaffCta() {
  return (
    <Section tone="dark" aria-labelledby="staff-cta-heading">
      <Container>
        <AnimatedSection className="text-center">
          <h2 id="staff-cta-heading" className="font-display text-3xl font-semibold text-gold">
            Suchen Sie Personal?
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-body text-surface/85">
            Rufen Sie uns jetzt an und erfahren Sie, wie wir Ihr Unternehmen
            zuverlässig unterstützen.
          </p>
          <div className="mt-8">
            <Button variant="accent" href="/kontakt">
              Kontakt aufnehmen
            </Button>
          </div>
        </AnimatedSection>
      </Container>
    </Section>
  );
}
```

- [ ] **Step 5: Write `components/home/CoverageMap.tsx` (stylized DACH coverage — no Google Maps)**

```tsx
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { AnimatedSection } from "@/components/motion/AnimatedSection";

const areas = [
  {
    country: "Österreich",
    cities: ["Wien", "Linz", "Salzburg", "Graz", "Innsbruck"],
  },
  {
    country: "Deutschland",
    cities: ["München", "Stuttgart", "Frankfurt", "Berlin", "Hamburg"],
  },
];

export function CoverageMap() {
  return (
    <Section tone="light" aria-labelledby="coverage-heading">
      <Container>
        <h2 id="coverage-heading" className="text-center font-display text-3xl font-semibold">
          Unsere Einsatzgebiete
        </h2>
        <AnimatedSection stagger={0.15} className="mt-12 grid gap-6 sm:grid-cols-2">
          {areas.map((a) => (
            <div key={a.country} className="rounded-lg bg-ink p-8 text-surface">
              <h3 className="font-display text-2xl font-semibold text-gold">{a.country}</h3>
              <ul className="mt-5 flex flex-wrap gap-x-6 gap-y-3">
                {a.cities.map((c) => (
                  <li key={c} className="flex items-center gap-2 font-body text-sm text-surface/85">
                    <span className="size-1.5 rounded-full bg-gold" aria-hidden />
                    {c}
                  </li>
                ))}
              </ul>
              <p className="mt-5 font-body text-xs text-surface/60">
                … und Umgebung – europaweit vernetzt.
              </p>
            </div>
          ))}
        </AnimatedSection>
      </Container>
    </Section>
  );
}
```

- [ ] **Step 6: Assemble `app/page.tsx`**

```tsx
import type { Metadata } from "next";
import { Hero } from "@/components/home/Hero";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { Advantages } from "@/components/home/Advantages";
import { StaffCta } from "@/components/home/StaffCta";
import { CoverageMap } from "@/components/home/CoverageMap";

export const metadata: Metadata = {
  title: "Personalvermittlung für Gebäudereinigung in Österreich & Deutschland",
  description:
    "Uyer Management vermittelt qualifiziertes Reinigungspersonal an Unternehmen in Österreich & Deutschland – inklusive Dienstplänen, Lohnverrechnung und Vertragserstellung.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <ServicesGrid />
      <Advantages />
      <StaffCta />
      <CoverageMap />
    </>
  );
}
```

- [ ] **Step 7: Verify visually**

Run: `npm run dev` — http://localhost:3000. Check: hero intro animation (text rises, lines draw), parallax on scroll, services cards stagger in, counters count up, exactly ONE gold-filled button (StaffCta), map cards render, mobile layout at 375px width.

- [ ] **Step 8: Commit**

```bash
git add components/home/ app/page.tsx
git commit -m "feat: build home page with animated hero, services, advantages, CTA, coverage map"
```

---

### Task 11: Leistungen page

**Files:**
- Create: `app/leistungen/page.tsx`, `components/shared/PageHero.tsx`, `components/shared/StartCta.tsx`

**Interfaces:**
- Consumes: `ServicesGrid` (with `detailed`), `Section`, `Container`, `Button`, `AnimatedSection`.
- Produces: `<PageHero title, subtitle?, image>` (compact dark hero reused by all subpages); `<StartCta />` (dark "Lass uns gemeinsam starten!" band reused by Leistungen / Für Unternehmen).

- [ ] **Step 1: Write `components/shared/PageHero.tsx`**

```tsx
import Image from "next/image";

export function PageHero({
  title,
  subtitle,
  image,
}: {
  title: string;
  subtitle?: string;
  image: string;
}) {
  return (
    <section className="relative flex min-h-[42vh] items-center overflow-hidden bg-ink text-surface">
      <Image src={image} alt="" fill priority className="object-cover" sizes="100vw" />
      <div className="absolute inset-0 bg-gradient-to-b from-ink/75 to-ink/90" />
      <div className="relative mx-auto max-w-3xl px-5 py-20 text-center">
        <h1 className="font-display text-3xl font-bold uppercase tracking-wide text-gold sm:text-5xl">
          {title}
        </h1>
        {subtitle && <p className="mt-4 font-body text-surface/90">{subtitle}</p>}
      </div>
    </section>
  );
}
```

- [ ] **Step 2: Write `components/shared/StartCta.tsx`**

```tsx
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { Button } from "@/components/ui/Button";
import { AnimatedSection } from "@/components/motion/AnimatedSection";

export function StartCta() {
  return (
    <Section tone="dark" aria-labelledby="start-cta-heading">
      <Container>
        <AnimatedSection className="text-center">
          <h2 id="start-cta-heading" className="font-display text-3xl font-semibold text-gold">
            Lass uns gemeinsam starten!
          </h2>
          <p className="mx-auto mt-4 max-w-xl font-body text-surface/85">
            Mit Uyer Management haben Sie einen Partner an Ihrer Seite, der Ihre
            Bedürfnisse versteht und individuelle Lösungen anbietet.
          </p>
          <div className="mt-8">
            <Button variant="accent" href="/kontakt">
              Jetzt Kontakt aufnehmen
            </Button>
          </div>
        </AnimatedSection>
      </Container>
    </Section>
  );
}
```

- [ ] **Step 3: Write `app/leistungen/page.tsx`**

```tsx
import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { ServicesGrid } from "@/components/home/ServicesGrid";
import { StartCta } from "@/components/shared/StartCta";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { AnimatedSection } from "@/components/motion/AnimatedSection";

export const metadata: Metadata = {
  title: "Leistungen – Personalservice & Auftragsvermittlung",
  description:
    "Personalvermittlung, Dienst- & Arbeitspläne, Lohnverrechnung, Vertragserstellung und Auftragsvermittlung – das Leistungsspektrum von Uyer Management.",
};

export default function LeistungenPage() {
  return (
    <>
      <PageHero
        title="Unsere Leistungen"
        subtitle="Personalservice & Auftragsvermittlung – unser Leistungsangebot"
        image="/images/hero-services.jpg"
      />
      <ServicesGrid detailed />
      <Section tone="surface" aria-labelledby="together-heading">
        <Container>
          <AnimatedSection className="mx-auto max-w-3xl text-center">
            <h2 id="together-heading" className="font-display text-3xl font-semibold">
              Gemeinsam Erfolg gestalten
            </h2>
            <p className="mt-5 font-body leading-7 text-muted">
              Weil gute Zusammenarbeit den Unterschied macht: Wir verstehen uns
              nicht als reiner Vermittler, sondern als langfristiger Partner.
              Unsere Kunden profitieren von kurzen Wegen, klarer Kommunikation
              und Lösungen, die zu ihrem Betrieb passen.
            </p>
          </AnimatedSection>
        </Container>
      </Section>
      <StartCta />
    </>
  );
}
```

- [ ] **Step 4: Verify visually, commit**

Run: `npm run dev` — check `/leistungen`: compact dark hero, 5 detailed service cards, text section, dark CTA band with single gold button.

```bash
git add app/leistungen/ components/shared/
git commit -m "feat: add Leistungen page with shared PageHero and StartCta"
```

---

### Task 12: Kontakt page with contact form

**Files:**
- Create: `app/kontakt/page.tsx`, `components/contact/ContactBlock.tsx`, `components/contact/ContactForm.tsx`

**Interfaces:**
- Consumes: `Input`, `Textarea`, `Checkbox`, `Button`, `contactSchema`, `site`, `POST /api/contact`.
- Produces: complete `/kontakt` page (dark two-column block per v1 screenshot).

- [ ] **Step 1: Write `components/contact/ContactForm.tsx` (client)**

```tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactInput } from "@/lib/schemas";
import { Input } from "@/components/ui/Input";
import { Textarea } from "@/components/ui/Textarea";
import { Checkbox } from "@/components/ui/Checkbox";
import { Button } from "@/components/ui/Button";

export function ContactForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (data: ContactInput) => {
    setStatus("sending");
    const res = await fetch("/api/contact", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(data),
    }).catch(() => null);
    if (res?.ok) {
      setStatus("success");
      reset();
    } else {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <p role="status" className="rounded-lg bg-green-600/15 p-5 font-body text-surface">
        ✓ Vielen Dank! Ihre Anfrage wurde gesendet. Wir melden uns in Kürze bei Ihnen.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <h2 className="font-display text-2xl font-semibold text-gold">Anfrage senden</h2>
      <div className="mt-6 grid gap-5 sm:grid-cols-2">
        <Input label="Vorname" required error={errors.firstName?.message} {...register("firstName")} />
        <Input label="Nachname" required error={errors.lastName?.message} {...register("lastName")} />
        <Input label="Telefon" type="tel" error={errors.phone?.message} {...register("phone")} />
        <Input label="E-Mail" type="email" required error={errors.email?.message} {...register("email")} />
      </div>
      <Textarea
        label="Nachricht"
        required
        className="mt-5"
        placeholder="Wie können wir Ihnen helfen?"
        error={errors.message?.message}
        {...register("message")}
      />
      <Checkbox
        className="mt-5"
        label={
          <>
            Personenbezogene Daten werden zu den in der{" "}
            <Link href="/datenschutz" className="underline hover:text-gold">
              Datenschutzerklärung
            </Link>{" "}
            beschriebenen Zwecken übermittelt und verwendet.
            <span className="ml-0.5 text-gold">*</span>
          </>
        }
        error={errors.consent?.message}
        {...register("consent")}
      />
      {status === "error" && (
        <p role="alert" className="mt-4 font-body text-sm text-red-400">
          Senden fehlgeschlagen. Bitte versuchen Sie es später erneut.
        </p>
      )}
      <Button variant="accent" type="submit" disabled={status === "sending"} className="mt-6">
        {status === "sending" ? "Wird gesendet …" : "Senden"}
      </Button>
    </form>
  );
}
```

- [ ] **Step 2: Write `components/contact/ContactBlock.tsx` (dark two-column, v1 style)**

```tsx
import Link from "next/link";
import { site } from "@/content/site";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { ContactForm } from "./ContactForm";

export function ContactBlock() {
  return (
    <Section tone="dark">
      <Container className="grid gap-10 lg:grid-cols-[2fr_3fr]">
        <div className="rounded-lg bg-navy/40 p-8">
          <h2 className="font-display text-2xl font-semibold text-gold">{site.legalName}</h2>
          <address className="mt-4 font-body text-sm not-italic leading-6 text-surface/85">
            {site.address.street}
            <br />
            {site.address.area}, {site.address.city}
          </address>
          <ul className="mt-6 space-y-2.5 font-body text-sm">
            <li>
              <a href={site.phoneHref} className="text-gold hover:underline">📞 {site.phone}</a>
            </li>
            <li>
              <a href={site.whatsapp} className="text-gold hover:underline">💬 WhatsApp</a>
            </li>
            <li>
              <a href={`mailto:${site.email}`} className="text-gold hover:underline">✉️ {site.email}</a>
            </li>
          </ul>
          <h3 className="mt-8 font-body text-sm font-semibold uppercase tracking-wider text-surface">
            Öffnungszeiten
          </h3>
          <p className="mt-2 flex justify-between font-body text-sm text-surface/85">
            <span>{site.hours.days}</span>
            <span>{site.hours.time}</span>
          </p>
          <p className="mt-8 font-body text-sm text-surface/70">
            <Link href="/impressum" className="hover:text-gold">Impressum</Link>
            {" | "}
            <Link href="/datenschutz" className="hover:text-gold">Datenschutz</Link>
          </p>
        </div>
        <ContactForm />
      </Container>
    </Section>
  );
}
```

- [ ] **Step 3: Write `app/kontakt/page.tsx`**

```tsx
import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { ContactBlock } from "@/components/contact/ContactBlock";

export const metadata: Metadata = {
  title: "Kontakt aufnehmen",
  description:
    "Kontaktieren Sie Uyer Management – telefonisch, per WhatsApp, E-Mail oder über unser Anfrageformular. Mo–Fr 07:00–17:00.",
};

export default function KontaktPage() {
  return (
    <>
      <PageHero
        title="Kontakt aufnehmen"
        subtitle="Wir freuen uns auf Ihre Anfrage – telefonisch, per WhatsApp oder über das Formular."
        image="/images/hero-home.jpg"
      />
      <ContactBlock />
    </>
  );
}
```

- [ ] **Step 4: Verify end-to-end (mock mode)**

Run: `npm run dev` — on `/kontakt`: submit empty form → German inline errors; fill valid data + consent → success message, server log shows `[mail:mock] Kontaktanfrage von …`.

- [ ] **Step 5: Commit**

```bash
git add app/kontakt/ components/contact/
git commit -m "feat: add Kontakt page with dark contact block and working inquiry form"
```

---

### Task 13: Karriere page with application form

**Files:**
- Create: `app/karriere/page.tsx`, `components/career/ApplyForm.tsx`

**Interfaces:**
- Consumes: `Input`, `Select`, `FileUpload`, `Checkbox`, `Button`, `applySchema`, `REGIONS`, `CV_MAX_BYTES`, `POST /api/apply`.
- Produces: complete `/karriere` page. Accent button here is "Jetzt bewerben".

- [ ] **Step 1: Write `components/career/ApplyForm.tsx` (client)**

```tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { applySchema, REGIONS, CV_MAX_BYTES } from "@/lib/schemas";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { FileUpload } from "@/components/ui/FileUpload";
import { Checkbox } from "@/components/ui/Checkbox";
import { Button } from "@/components/ui/Button";

const applyFormSchema = applySchema.extend({
  cv: z
    .custom<FileList>()
    .refine((fl) => fl && fl.length === 1, "Bitte laden Sie Ihren Lebenslauf hoch.")
    .refine(
      (fl) => !fl?.[0] || fl[0].size <= CV_MAX_BYTES,
      "Die Datei ist zu groß (max. 5 MB).",
    ),
});
type ApplyFormInput = z.infer<typeof applyFormSchema>;

export function ApplyForm() {
  const [status, setStatus] = useState<"idle" | "sending" | "success" | "error">("idle");
  const {
    register,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<ApplyFormInput>({ resolver: zodResolver(applyFormSchema) });

  const cvFile = watch("cv")?.[0];

  const onSubmit = async (data: ApplyFormInput) => {
    setStatus("sending");
    const fd = new FormData();
    fd.set("name", data.name);
    fd.set("phone", data.phone);
    fd.set("email", data.email);
    fd.set("region", data.region);
    fd.set("consent", String(data.consent));
    fd.set("cv", data.cv[0]);
    const res = await fetch("/api/apply", { method: "POST", body: fd }).catch(() => null);
    if (res?.ok) {
      setStatus("success");
      reset();
    } else {
      setStatus("error");
    }
  };

  if (status === "success") {
    return (
      <p role="status" className="rounded-lg bg-green-600/15 p-5 font-body">
        ✓ Vielen Dank für Ihre Bewerbung! Wir prüfen Ihre Unterlagen und melden
        uns in Kürze bei Ihnen.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <Input label="Vor- und Nachname" required placeholder="Max Mustermann" error={errors.name?.message} {...register("name")} />
        <Input label="Telefon" type="tel" required error={errors.phone?.message} {...register("phone")} />
        <Input label="E-Mail" type="email" required error={errors.email?.message} {...register("email")} />
        <Select label="Region" required options={REGIONS} placeholder="Bitte wählen" error={errors.region?.message} {...register("region")} />
      </div>
      <FileUpload
        label="Lebenslauf"
        required
        className="mt-5"
        fileName={cvFile?.name ?? null}
        error={errors.cv?.message as string | undefined}
        {...register("cv")}
      />
      <Checkbox
        className="mt-5"
        label={
          <>
            Ich stimme der Verarbeitung meiner Daten gemäß{" "}
            <Link href="/datenschutz" className="underline hover:text-gold">
              Datenschutzerklärung
            </Link>{" "}
            zu.<span className="ml-0.5 text-gold">*</span>
          </>
        }
        error={errors.consent?.message}
        {...register("consent")}
      />
      {status === "error" && (
        <p role="alert" className="mt-4 font-body text-sm text-red-700">
          Senden fehlgeschlagen. Bitte versuchen Sie es später erneut.
        </p>
      )}
      <Button variant="accent" type="submit" disabled={status === "sending"} className="mt-6">
        {status === "sending" ? "Wird gesendet …" : "Jetzt bewerben"}
      </Button>
    </form>
  );
}
```

- [ ] **Step 2: Write `app/karriere/page.tsx`**

```tsx
import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { AnimatedSection } from "@/components/motion/AnimatedSection";
import { ApplyForm } from "@/components/career/ApplyForm";

export const metadata: Metadata = {
  title: "Karriere – Jetzt bewerben",
  description:
    "Arbeiten in der Gebäudereinigung in Österreich & Deutschland: Bewerben Sie sich jetzt bei Uyer Management – unkompliziert mit Lebenslauf-Upload.",
};

export default function KarrierePage() {
  return (
    <>
      <PageHero
        title="Karriere"
        subtitle="Werden Sie Teil unseres Netzwerks – wir vermitteln Sie an geprüfte Betriebe in Österreich & Deutschland."
        image="/images/section-team.jpg"
      />
      <Section tone="light">
        <Container className="grid gap-12 lg:grid-cols-[2fr_3fr]">
          <AnimatedSection>
            <h2 className="font-display text-3xl font-semibold">Ihre Bewerbung</h2>
            <p className="mt-4 font-body leading-7 text-muted">
              Sie haben Erfahrung in der Gebäudereinigung oder möchten in der
              Branche durchstarten? Senden Sie uns Ihre Bewerbung – wir finden
              den passenden Arbeitsplatz für Sie. Faire Bedingungen, klare
              Verträge und persönliche Betreuung inklusive.
            </p>
            <ul className="mt-6 space-y-3 font-body text-sm text-muted">
              <li>✓ Geprüfte Arbeitgeber in Österreich &amp; Deutschland</li>
              <li>✓ Rechtssichere Verträge und pünktliche Lohnverrechnung</li>
              <li>✓ Persönliche Betreuung während des gesamten Einsatzes</li>
            </ul>
          </AnimatedSection>
          <div className="rounded-lg border border-line bg-surface p-8 shadow-sm">
            <ApplyForm />
          </div>
        </Container>
      </Section>
    </>
  );
}
```

- [ ] **Step 3: Verify end-to-end (mock mode)**

On `/karriere`: submit empty → German errors incl. file; select a PDF → dashed box switches to green "Datei ausgewählt" state; valid submit → success message, server log `[mail:mock] Bewerbung von …`.

- [ ] **Step 4: Commit**

```bash
git add app/karriere/ components/career/
git commit -m "feat: add Karriere page with CV-upload application form"
```

---

### Task 14: Für Unternehmen page

**Files:**
- Create: `app/fuer-unternehmen/page.tsx`

**Interfaces:**
- Consumes: `PageHero`, `StartCta`, `Section`, `Container`, `AnimatedSection`, `Button`.

- [ ] **Step 1: Write `app/fuer-unternehmen/page.tsx`**

```tsx
import type { Metadata } from "next";
import { PageHero } from "@/components/shared/PageHero";
import { StartCta } from "@/components/shared/StartCta";
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";
import { AnimatedSection } from "@/components/motion/AnimatedSection";

export const metadata: Metadata = {
  title: "Für Unternehmen – Personal finden",
  description:
    "Sie suchen zuverlässiges Reinigungspersonal? Uyer Management übernimmt Suche, Auswahl, Verträge und Lohnverrechnung – Sie konzentrieren sich auf Ihr Geschäft.",
};

const steps = [
  {
    title: "Bedarf besprechen",
    text: "Sie schildern uns, welches Personal Sie benötigen – Umfang, Qualifikation, Zeitraum und Einsatzort.",
  },
  {
    title: "Auswahl & Vermittlung",
    text: "Wir schlagen Ihnen geprüfte Fachkräfte aus unserem europaweiten Netzwerk vor – schnell und passgenau.",
  },
  {
    title: "Einsatz & Betreuung",
    text: "Verträge, Dienstpläne und Lohnverrechnung übernehmen wir. Sie behalten jederzeit den Überblick.",
  },
];

export default function FuerUnternehmenPage() {
  return (
    <>
      <PageHero
        title="Für Unternehmen"
        subtitle="Zuverlässiges Personal für Ihre Gebäudereinigung – ohne administrativen Aufwand."
        image="/images/hero-services.jpg"
      />
      <Section tone="light" aria-labelledby="process-heading">
        <Container>
          <h2 id="process-heading" className="text-center font-display text-3xl font-semibold">
            So einfach funktioniert es
          </h2>
          <AnimatedSection stagger={0.15} className="mt-12 grid gap-6 sm:grid-cols-3">
            {steps.map((s, i) => (
              <div key={s.title} className="rounded-lg border border-line bg-surface p-6 text-center shadow-sm">
                <span className="font-display text-3xl text-gold">{i + 1}</span>
                <h3 className="mt-3 font-display text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 font-body text-sm leading-6 text-muted">{s.text}</p>
              </div>
            ))}
          </AnimatedSection>
        </Container>
      </Section>
      <Section tone="wash" aria-labelledby="why-heading">
        <Container>
          <AnimatedSection className="mx-auto max-w-3xl text-center">
            <h2 id="why-heading" className="font-display text-3xl font-semibold">
              Warum Uyer Management?
            </h2>
            <p className="mt-5 font-body leading-7 text-text">
              Die richtige Person am richtigen Arbeitsplatz – genau dafür steht
              Uyer Management. Unsere professionelle Personalvermittlung bringt
              Unternehmen und qualifizierte Arbeitskräfte aus der
              Gebäudereinigung zuverlässig zusammen. Flexibel, transparent und
              mit vollständiger Prozessbetreuung.
            </p>
          </AnimatedSection>
        </Container>
      </Section>
      <StartCta />
    </>
  );
}
```

- [ ] **Step 2: Verify visually, commit**

Check `/fuer-unternehmen`: hero, 3 process cards stagger in, gold-wash section, dark CTA band (single gold button on page).

```bash
git add app/fuer-unternehmen/
git commit -m "feat: add Für Unternehmen page with process steps"
```

---

### Task 15: Legal pages (Impressum, Datenschutz)

**Files:**
- Create: `app/impressum/page.tsx`, `app/datenschutz/page.tsx`, `components/shared/LegalPage.tsx`

**Interfaces:**
- Consumes: `site`, `Container`, `Section`.
- Produces: `<LegalPage title>` prose wrapper.

- [ ] **Step 1: Write `components/shared/LegalPage.tsx`**

```tsx
import { Container } from "@/components/layout/Container";
import { Section } from "@/components/layout/Section";

export function LegalPage({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  return (
    <Section tone="light">
      <Container className="max-w-3xl">
        <h1 className="font-display text-4xl font-semibold">{title}</h1>
        <div className="mt-8 space-y-6 font-body leading-7 [&_h2]:font-display [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:pt-4 [&_p]:text-muted [&_li]:text-muted [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-1">
          {children}
        </div>
      </Container>
    </Section>
  );
}
```

- [ ] **Step 2: Write `app/impressum/page.tsx`**

```tsx
import type { Metadata } from "next";
import { site } from "@/content/site";
import { LegalPage } from "@/components/shared/LegalPage";

export const metadata: Metadata = {
  title: "Impressum",
  description: "Impressum der Uyer Management Holding LLC-FZ.",
  robots: { index: false },
};

export default function ImpressumPage() {
  return (
    <LegalPage title="Impressum">
      <h2>Angaben zum Unternehmen</h2>
      <p>
        {site.legalName}
        <br />
        {site.address.street}
        <br />
        {site.address.area}, {site.address.city}
        <br />
        {site.address.country}
      </p>
      <h2>Kontakt</h2>
      <p>
        Telefon: <a href={site.phoneHref}>{site.phone}</a>
        <br />
        E-Mail: <a href={`mailto:${site.email}`}>{site.email}</a>
      </p>
      <h2>Haftungshinweis</h2>
      <p>
        Trotz sorgfältiger inhaltlicher Kontrolle übernehmen wir keine Haftung
        für die Inhalte externer Links. Für den Inhalt der verlinkten Seiten
        sind ausschließlich deren Betreiber verantwortlich.
      </p>
    </LegalPage>
  );
}
```

- [ ] **Step 3: Write `app/datenschutz/page.tsx`**

```tsx
import type { Metadata } from "next";
import { site } from "@/content/site";
import { LegalPage } from "@/components/shared/LegalPage";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description: "Datenschutzerklärung der Uyer Management Holding LLC-FZ.",
  robots: { index: false },
};

export default function DatenschutzPage() {
  return (
    <LegalPage title="Datenschutzerklärung">
      <h2>1. Verantwortlicher</h2>
      <p>
        {site.legalName}, {site.address.street}, {site.address.area},{" "}
        {site.address.city}. E-Mail:{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>
      </p>
      <h2>2. Erhebung und Verarbeitung personenbezogener Daten</h2>
      <p>
        Beim Besuch dieser Website werden technisch notwendige Daten (z.&nbsp;B.
        IP-Adresse, Datum und Uhrzeit des Zugriffs) verarbeitet, soweit dies
        für den Betrieb der Website erforderlich ist. Diese Website verwendet
        keine Tracking- oder Marketing-Cookies.
      </p>
      <h2>3. Kontaktformular und Bewerbungen</h2>
      <p>
        Wenn Sie uns über das Kontaktformular eine Anfrage senden oder sich
        über das Bewerbungsformular bewerben, verarbeiten wir die von Ihnen
        angegebenen Daten (Name, Kontaktdaten, Nachricht, ggf. Lebenslauf)
        ausschließlich zur Bearbeitung Ihrer Anfrage bzw. Bewerbung. Die
        Übermittlung erfolgt per E-Mail an unser Unternehmen. Eine Weitergabe
        an Dritte erfolgt nur, soweit dies zur Vermittlung erforderlich ist
        und Sie eingewilligt haben.
      </p>
      <h2>4. Speicherdauer</h2>
      <p>
        Wir speichern personenbezogene Daten nur so lange, wie es für die
        genannten Zwecke erforderlich ist oder gesetzliche
        Aufbewahrungspflichten bestehen. Bewerbungsunterlagen werden nach
        Abschluss des Verfahrens gelöscht, sofern keine Einwilligung zur
        längeren Speicherung vorliegt.
      </p>
      <h2>5. Ihre Rechte</h2>
      <ul>
        <li>Auskunft über die von uns verarbeiteten Daten</li>
        <li>Berichtigung unrichtiger Daten</li>
        <li>Löschung oder Einschränkung der Verarbeitung</li>
        <li>Widerruf erteilter Einwilligungen mit Wirkung für die Zukunft</li>
      </ul>
      <p>
        Wenden Sie sich dazu jederzeit an{" "}
        <a href={`mailto:${site.email}`}>{site.email}</a>.
      </p>
    </LegalPage>
  );
}
```

> Note: legal texts are a solid GDPR-oriented baseline; final wording must
> be confirmed by the company's legal counsel before launch (out of our
> scope — tell the user at handoff).

- [ ] **Step 4: Verify both pages render, commit**

```bash
git add app/impressum/ app/datenschutz/ components/shared/LegalPage.tsx
git commit -m "feat: add Impressum and Datenschutz legal pages"
```

---

### Task 16: SEO — JSON-LD, sitemap, robots, OG image

**Files:**
- Create: `app/sitemap.ts`, `app/robots.ts`, `app/opengraph-image.tsx`
- Modify: `app/layout.tsx` (JSON-LD script, `openGraph` metadata)

- [ ] **Step 1: Write `app/sitemap.ts`**

```ts
import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/leistungen", "/fuer-unternehmen", "/karriere", "/kontakt"];
  return routes.map((path) => ({
    url: `${site.url}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: path === "" ? 1 : 0.8,
  }));
}
```

- [ ] **Step 2: Write `app/robots.ts`**

```ts
import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: { userAgent: "*", allow: "/", disallow: ["/api/"] },
    sitemap: `${site.url}/sitemap.xml`,
  };
}
```

- [ ] **Step 3: Write `app/opengraph-image.tsx`**

```tsx
import { ImageResponse } from "next/og";

export const alt = "Uyer Management – Personalvermittlung für Gebäudereinigung";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "#0E2A47",
          color: "#C6A15B",
          fontSize: 72,
          fontWeight: 700,
          letterSpacing: 4,
        }}
      >
        <div style={{ display: "flex" }}>UYER MANAGEMENT</div>
        <div style={{ display: "flex", fontSize: 28, color: "#F6F7F9", marginTop: 24 }}>
          Qualifiziertes Personal für die Gebäudereinigung
        </div>
        <div
          style={{
            display: "flex",
            width: 240,
            height: 2,
            background: "#C6A15B",
            marginTop: 32,
          }}
        />
      </div>
    ),
    size,
  );
}
```

- [ ] **Step 4: Add JSON-LD + OpenGraph to `app/layout.tsx`**

Add to `metadata` export:

```ts
  openGraph: {
    type: "website",
    locale: "de_DE",
    siteName: "Uyer Management",
  },
```

Add inside `<body>` (top):

```tsx
import { site } from "@/content/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "EmploymentAgency",
  name: site.name,
  legalName: site.legalName,
  url: site.url,
  telephone: site.phone,
  email: site.email,
  address: {
    "@type": "PostalAddress",
    streetAddress: site.address.street,
    addressLocality: site.address.city,
    addressCountry: "AE",
  },
  areaServed: ["AT", "DE"],
  openingHours: "Mo-Fr 07:00-17:00",
};

// in JSX, first child of <body>:
<script
  type="application/ld+json"
  dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
/>
```

- [ ] **Step 5: Verify**

Run: `npm run build` — Expected: build succeeds, all routes listed.
Check http://localhost:3000/sitemap.xml, /robots.txt, /opengraph-image render.
View page source of `/`: JSON-LD script present, `og:` meta tags present.

- [ ] **Step 6: Commit**

```bash
git add app/sitemap.ts app/robots.ts app/opengraph-image.tsx app/layout.tsx
git commit -m "feat: add JSON-LD, sitemap, robots, and OpenGraph image"
```

---

### Task 17: Final verification pass

**Files:** none new — fixes only where checks fail.

- [ ] **Step 1: Full test + type + build gate**

```bash
npm test && npx tsc --noEmit && npm run build
```

Expected: all pass with zero errors.

- [ ] **Step 2: Browser walkthrough (use browser tooling or manual)**

- All 7 routes render; nav + footer links all work; no 404s.
- Forms: both submit successfully in mock mode; German validation errors show inline.
- Exactly one gold-filled CTA per view (audit each page).
- Mobile 375px: burger menu works, no horizontal scroll, hero readable.

- [ ] **Step 3: Reduced-motion check**

Emulate `prefers-reduced-motion: reduce` (DevTools → Rendering). Expected: all content visible immediately, no GSAP movement, counters show final values.

- [ ] **Step 4: Lighthouse**

Run Lighthouse (mobile) on `/`, `/leistungen`, `/kontakt`. Target ≥ 90 for Performance, SEO, Accessibility, Best Practices. Fix flagged issues (image sizes, contrast, missing labels) before finishing.

- [ ] **Step 5: Commit any fixes**

```bash
git add -A
git commit -m "chore: final verification fixes (lighthouse, a11y, reduced motion)"
```

---

## Post-launch open items (tell the user at handoff)

1. `RESEND_API_KEY` + verified sender domain needed for real email delivery (mock mode until then).
2. Stat counter values in `Advantages.tsx` are placeholders — confirm real figures.
3. Legal texts (Impressum/Datenschutz) need review by legal counsel.
4. Final stock image selection needs user approval (`public/images/CREDITS.md`).
