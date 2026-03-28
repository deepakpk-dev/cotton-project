# TARA — Cotton Clothing Brand Project

## Project Overview

**TARA** is a cotton clothing ecommerce brand targeting women aged 35-55 in the German market (with English language support). The brand follows a **French Soft Elegance** aesthetic at accessible premium pricing.

- **Positioning**: Between Arket/COS (accessible premium minimalism) and Toast (premium lifestyle storytelling)
- **Pricing**: T-shirts €25-45, dresses €70-120
- **Product strategy**: Curated capsule collections (15-25 pieces per season)
- **Tech stack**: Shopify (Prestige theme recommended), static HTML/CSS/JS prototype in `/website`
- **Markets**: Germany-first, bilingual DE/EN

---

## Brand Design System

### Color Palette

| Role | Hex | Usage |
|------|-----|-------|
| Background | `#FAF7F2` | Main background — never use pure white |
| Secondary BG | `#F5E6E0` | Section dividers, newsletter area |
| Primary Text | `#3D3633` | Body copy |
| Heading Text | `#2C2220` | Headlines, nav, brand name |
| Primary Accent | `#C4A08A` | CTAs, hover states, price display |
| Secondary Accent | `#D5C8D9` | Tags, badges, secondary buttons |
| Warm Accent | `#C89B7B` | Sale tags, seasonal highlights |
| Sustainability | `#9BAF93` | Certification badges, eco-labels |
| Border/Divider | `#E8E0D8` | Card borders, form fields |

**Rules**: Never use `#FFFFFF` or `#000000`. Accent colors max 15% of any page.

### Typography

- **Headings**: Cormorant Garamond (weights 300, 400, 500) — loaded from Google Fonts
- **Body/UI**: Jost (weights 300, 400) — loaded from Google Fonts
- **Minimum body size**: 16px (non-negotiable for 35-55 demographic)
- **Line-height**: 1.7 body, 1.3 headings
- **H1**: 56-64px desktop / 36-40px mobile, uppercase, 0.15em letter-spacing
- **Navigation**: 13-14px, uppercase, 0.12em letter-spacing

### CSS Variables

All design tokens are defined in `/website/css/variables.css`. Always use CSS variables — never hardcode color hex values or font names directly in component CSS.

---

## Website Structure (`/website`)

```
website/
├── index.html          # Homepage
├── collection.html     # Collection/catalog page
├── product.html        # Product detail page
├── css/
│   ├── variables.css   # Design tokens (colors, fonts, spacing)
│   ├── base.css        # Reset, global styles
│   ├── components.css  # Reusable components (buttons, cards, nav)
│   ├── pages.css       # Page-specific styles
│   └── responsive.css  # Breakpoint overrides
└── js/
    └── main.js         # Site interactions
```

---

## German Market Requirements (Non-Negotiable)

### Legal Pages (All Required Before Launch)
- **Impressum** — full legal entity details (mandatory by law)
- **Datenschutzerklärung** — GDPR/DSGVO privacy policy
- **AGB** — General terms and conditions
- **Widerrufsbelehrung** — 14-day withdrawal policy with model form
- **Cookie consent banner** — granular opt-in, GDPR compliant
- **Price display** — must show "inkl. MwSt." and shipping cost info

### Payments
- Klarna (BNPL — hugely popular in Germany)
- PayPal (57% of German online shoppers)
- SEPA Lastschrift (direct debit — builds trust)
- Sofortüberweisung
- Visa/Mastercard

### Shipping
- DHL as primary carrier
- Free shipping threshold: €75
- Free returns (table stakes in Germany)

### Trust Signals
- Trusted Shops seal
- Verified purchase reviews
- Visible phone number / contact
- Detailed product descriptions (German consumers research thoroughly)

---

## UX Principles

- **Navigation**: Sticky transparent header → `#FAF7F2` on scroll; desktop mega menu; mobile bottom tab nav (not hamburger)
- **Cart**: Slide-out drawer from right — do not redirect to cart page
- **Popups**: Max one newsletter popup per session (30s delay or exit intent)
- **Wishlist**: Cookie-based (no login required), prompt for account to persist
- **Animations**: Gentle fade-up on sections (200ms ease-out), no aggressive transitions
- **Product hover**: Crossfade to second image

### Responsive Breakpoints
| Breakpoint | Width |
|-----------|-------|
| Mobile | <768px |
| Tablet | 768-1024px |
| Desktop | 1025-1440px |
| Wide | >1440px (max-width container 1440px) |

### Accessibility (WCAG AA Required)
- All text: 4.5:1 contrast ratio minimum
- Body text never below 16px, never absolute minimum below 14px
- Touch targets: 48x48px minimum on mobile
- All product images require alt text (both DE and EN)
- Keyboard navigable throughout

### Performance Targets
- LCP <2.5s, FID <100ms, CLS <0.1
- Images: WebP format, JPEG fallback, lazy load below fold
- Hero: 2400x1200px max, <300KB
- Product images: 1200x1600px (3:4 ratio)

---

## Content & Tone

- **Language**: Bilingual DE/EN — German is primary. All UI strings need both.
- **Tone**: Editorial, understated elegance — not fast fashion, not activist sustainability
- **Sustainability messaging**: Subtle — certifications as trust signals, not headline activism. Use sage green (`#9BAF93`) for eco elements.
- **Collection storytelling**: Each capsule collection gets an editorial page with story, inspiration, lookbook, and behind-the-scenes
- **Photography direction**: Warm natural light, diverse ages (include 35-55 models), relaxed poses, natural cotton textures, Parisian lifestyle settings

---

## Shopify Implementation (When Building)

### Recommended Apps
1. Shopify Translate & Adapt — DE/EN multilingual
2. Klarna Payments
3. Kiwi Size Chart — visual size guides (reduces returns)
4. Loox or Judge.me — photo reviews
5. Klaviyo — email flows
6. Trusted Shops — German trust seal
7. Shopify Markets — multi-currency, tax

### Launch Checklist
- 15-25 products (one full capsule collection)
- 4-6 lifestyle/editorial photos per product
- Brand story page (DE + EN)
- Sustainability/materials page
- All legal pages
- Size guide with DE/EU size conversions
- "Model is 175cm, wearing size 38" on every product

---

## Key Files in This Project

| File | Purpose |
|------|---------|
| `TARA_Design_Plan.md` | Full design system — color, type, layout specs |
| `TARA_Market_Research_Report.md` | Market research, ICP, competitive landscape |
| `European_Women_ICP_Research.md` | Detailed ICP research |
| `European_Cotton_Brands_Research.md` | Competitor analysis |
| `Claude Plan.docx` | Original project planning document |
| `website/` | Static HTML prototype |
