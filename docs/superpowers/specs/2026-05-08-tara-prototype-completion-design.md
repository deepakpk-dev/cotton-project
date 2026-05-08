# TARA Prototype Completion — Design Spec
**Date:** 2026-05-08
**Status:** Approved

---

## Goal

Complete the TARA static HTML prototype into a fully navigable, production-architecture demo using 11ty as the build tool. The prototype serves as a design reference and will evolve directly into the production Shopify store.

---

## Scope

**Already complete:** Homepage (`index.html`), Collection page (`collection.html`), Product Detail page (`product.html`)

**To build:**
1. Brand Story / Über uns
2. Materialien & Nachhaltigkeit
3. Größenberatung / Size Guide
4. Legal pages: Impressum, Datenschutzerklärung, AGB, Widerrufsbelehrung
5. Cookie Consent Banner (GDPR-compliant)

**Out of scope:** DE/EN language toggle functionality (stays decorative), Newsletter popup, Shopify migration

---

## Architecture

### Stack
- **Build tool:** 11ty (Eleventy) — lightweight static site generator, zero client-side framework
- **Template language:** Nunjucks — near-identical syntax to Shopify Liquid, making future migration straightforward
- **CSS/JS:** Unchanged from current codebase — passthrough copy via 11ty config
- **Output:** Plain HTML in `/dist` — openable in browser with no server required

### Why 11ty + Nunjucks
- No framework overhead — output is the same clean HTML already in the project
- Nunjucks ≈ Shopify Liquid: template skills transfer directly to Shopify migration
- Built-in dev server with live reload
- Minimal config, no webpack/babel/transpilation needed

### File Structure

```
website/
├── src/
│   ├── _layouts/
│   │   └── base.njk              ← shared shell (head, header, footer, cookie banner)
│   ├── _includes/
│   │   ├── header.njk            ← announcement bar + header + mobile menu
│   │   ├── footer.njk            ← footer links, legal links, cookie settings link
│   │   ├── cart-drawer.njk       ← slide-out cart drawer
│   │   ├── wishlist-drawer.njk   ← slide-out wishlist drawer
│   │   ├── search-overlay.njk    ← search overlay
│   │   └── cookie-banner.njk     ← GDPR cookie consent banner
│   ├── css/                      ← passthrough copy (unchanged)
│   │   ├── variables.css
│   │   ├── base.css
│   │   ├── components.css
│   │   ├── pages.css
│   │   ├── responsive.css
│   │   └── cookie.css            ← new: cookie banner styles
│   ├── js/                       ← passthrough copy (unchanged + new)
│   │   ├── main.js
│   │   └── cookie.js             ← new: cookie consent logic
│   ├── index.njk
│   ├── collection.njk
│   ├── product.njk
│   ├── brand-story.njk           ← new
│   ├── materials.njk             ← new
│   ├── size-guide.njk            ← new
│   └── legal/
│       ├── impressum.njk         ← new
│       ├── datenschutz.njk       ← new
│       ├── agb.njk               ← new
│       └── widerruf.njk          ← new
├── dist/                         ← build output (gitignored)
├── .eleventy.js
└── package.json
```

---

## Template System

### `base.njk` layout
Every page extends this layout via front matter:

```njk
---
layout: base.njk
title: "Page Title — TARA"
description: "Meta description"
---
```

The layout includes: Google Fonts link, all CSS files, all JS files, header partial, cookie banner partial, `{{ content | safe }}` slot, footer partial.

### Front matter per page
Each `.njk` page declares `layout`, `title`, `description`, and optionally `bodyClass` for page-specific CSS scoping.

---

## New Pages

### Brand Story (`/brand-story/`)
**Layout:** Editorial, full-bleed, image-led

| Section | Content |
|---------|---------|
| Hero | Full-width image + "Über uns" H1 + brand tagline |
| Story | Two-column: left = founder philosophy, right = cotton sourcing origin (France/Portugal) |
| Why Cotton | 3 visual pillars: Atmungsaktiv / Langlebig / Zeitlos — icon + short copy each |
| Values | "Unsere Werte" — 3-4 values (Qualität, Achtsamkeit, Zeitlosigkeit, Transparenz) |

### Materialien & Nachhaltigkeit (`/materials/`)
**Layout:** Clean editorial, trust-building

| Section | Content |
|---------|---------|
| Intro | What makes TARA cotton different — long-staple, hand-selected |
| Certifications | OEKO-TEX® Standard 100, GOTS badges in sage green (`#9BAF93`) |
| Fabric Care | Wash symbols + plain German care instructions per garment type |
| Conscious Design | Closing editorial — slow fashion, not activist sustainability |

### Größenberatung (`/size-guide/`)
**Layout:** Functional, high information density

| Section | Content |
|---------|---------|
| How to Measure | Simple line-art diagram + 3 measurements: Brust / Taille / Hüfte in cm |
| Size Table | EU 34–46 with bust/waist/hip measurements in cm |
| Model Reference | "Unser Model ist 175 cm und trägt Größe 38" callout box |
| Returns Note | Free returns reminder + link to Widerrufsbelehrung |

### Legal Pages (all 4)
**Layout:** Minimal — base shell + single content container, no decorative elements

| Page | URL | Key content |
|------|-----|-------------|
| Impressum | `/legal/impressum/` | Company name, address, responsible person, contact, Handelsregister |
| Datenschutzerklärung | `/legal/datenschutz/` | GDPR-compliant privacy policy: data collected, purposes, rights, cookies |
| AGB | `/legal/agb/` | General terms: ordering, payment, delivery, returns, liability |
| Widerrufsbelehrung | `/legal/widerruf/` | 14-day withdrawal right + model withdrawal form |

All legal pages use realistic German placeholder content (legally correct structure, dummy company details for "TARA GmbH, Musterstraße 1, 10115 Berlin").

---

## Cookie Consent Banner

### Behaviour
- Renders at bottom of viewport, non-blocking (page is usable without interacting)
- Shown on first visit; not shown again once preferences are saved
- Footer "Cookie-Einstellungen" link re-opens the banner at any time

### Categories
| Category | Toggle | Default |
|----------|--------|---------|
| Essenziell | Fixed ON (no toggle) | Always active |
| Analyse | Toggle | OFF |
| Marketing | Toggle | OFF |

### Buttons
- **Alle akzeptieren** — sets all categories to true, saves, closes
- **Auswahl speichern** — saves current toggle state, closes

### Storage
Preferences stored as JSON in `localStorage` under key `tara_cookie_consent`:
```json
{ "essential": true, "analytics": false, "marketing": false, "timestamp": 1234567890 }
```

### Files
- `src/css/cookie.css` — banner styles using existing CSS variables (no new design tokens)
- `src/js/cookie.js` — standalone module: reads/writes localStorage, shows/hides banner, wires buttons
- `src/_includes/cookie-banner.njk` — HTML markup, included in `base.njk`

---

## Migration Strategy

### Phase 1 — 11ty Setup
- Initialise `package.json`, install `@11ty/eleventy`
- Write `.eleventy.js`: passthrough `css/`, `js/`; input = `src/`; output = `dist/`
- Add scripts: `"dev": "eleventy --serve"`, `"build": "eleventy"`
- Add `dist/` and `node_modules/` to `.gitignore`

### Phase 2 — Extract Shared Shell
- Create `src/_includes/header.njk` — pull announcement bar, header, mobile menu from existing HTML
- Create `src/_includes/footer.njk`
- Create `src/_includes/cart-drawer.njk`, `wishlist-drawer.njk`, `search-overlay.njk`
- Create `src/_layouts/base.njk` — assembles all includes, injects `{{ content | safe }}`
- Create `src/css/cookie.css` and `src/js/cookie.js`
- Create `src/_includes/cookie-banner.njk`

### Phase 3 — Migrate Existing Pages
- `index.html` → `src/index.njk` (front matter + body content only)
- `collection.html` → `src/collection.njk`
- `product.html` → `src/product.njk`
- Verify all three render identically to originals at `localhost:8080`

### Phase 4 — Build New Pages
- `src/brand-story.njk`
- `src/materials.njk`
- `src/size-guide.njk`
- `src/legal/impressum.njk`, `datenschutz.njk`, `agb.njk`, `widerruf.njk`

### Phase 5 — Wire Navigation
- Update all `href` links in header/footer partials to point to correct routes
- Add legal page links to footer partial
- Add "Cookie-Einstellungen" link to footer
- Verify all pages navigate correctly

---

## Dev Commands

```bash
cd website
npm install
npm run dev    # http://localhost:8080 with live reload
npm run build  # outputs to dist/
```

---

## Success Criteria

- `npm run dev` starts without errors
- All 9 pages (3 existing + 2 editorial + 1 size guide + 4 legal) are accessible and fully styled
- Cookie banner appears on first visit, saves to localStorage, does not reappear on reload
- Footer links to all legal pages
- All pages pass WCAG AA contrast check and are keyboard-navigable
- Header change in one partial reflects across all pages instantly
