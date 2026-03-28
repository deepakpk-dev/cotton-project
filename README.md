# TARA — Cotton Clothing Brand

> French Soft Elegance. 100% Cotton. Made for Women 35–55.

TARA is an accessible premium cotton clothing ecommerce brand launching in the German market with English language support. The brand is built around curated capsule collections, editorial storytelling, and a French Soft Elegance aesthetic — positioned between minimalist brands like Arket/COS and lifestyle brands like Toast.

---

## Brand Identity

| Attribute | Detail |
|-----------|--------|
| **Target Market** | Women aged 35–55 (primary), 25–60 (secondary) |
| **Geography** | Germany-first, bilingual DE/EN |
| **Aesthetic** | French Soft Elegance — warm creams, dusty rose, clean editorial |
| **Positioning** | Accessible premium (between COS and Toast) |
| **Product** | Curated capsule collections, 15–25 pieces per season |
| **Sustainability** | Subtle — OEKO-TEX / GOTS certifications as trust signals, not activism |
| **Pricing** | T-shirts €25–45 · Dresses €70–120 |
| **Platform** | Shopify (Prestige theme) |

---

## Project Structure

```
cotton-project/
├── website/                        # Static HTML/CSS/JS prototype
│   ├── index.html                  # Homepage
│   ├── collection.html             # Collection / catalog page
│   ├── product.html                # Product detail page
│   ├── css/
│   │   ├── variables.css           # Design tokens (colors, fonts, spacing)
│   │   ├── base.css                # Reset and global styles
│   │   ├── components.css          # Reusable UI components
│   │   ├── pages.css               # Page-specific styles
│   │   └── responsive.css          # Breakpoint overrides
│   └── js/
│       └── main.js                 # Interactions and UI behavior
├── TARA_Design_Plan.md             # Full design system specification
├── TARA_Market_Research_Report.md  # Market research and ICP analysis
├── European_Women_ICP_Research.md  # Detailed customer profile research
├── European_Cotton_Brands_Research.md  # Competitor analysis
├── CLAUDE.md                       # AI assistant project context
└── README.md                       # This file
```

---

## Design System

### Color Palette

| Role | Color | Hex |
|------|-------|-----|
| Background | Warm Cream | `#FAF7F2` |
| Secondary BG | Soft Blush | `#F5E6E0` |
| Primary Text | Warm Charcoal | `#3D3633` |
| Heading Text | Deep Espresso | `#2C2220` |
| Primary Accent | Dusty Rose | `#C4A08A` |
| Secondary Accent | Soft Lavender | `#D5C8D9` |
| Warm Accent | Muted Terracotta | `#C89B7B` |
| Sustainability | Sage Green | `#9BAF93` |
| Border / Divider | Pale Taupe | `#E8E0D8` |

**Rules**: Never use pure white (`#FFFFFF`) or pure black (`#000000`). Accent colors at max 15% of any page.

### Typography

| Element | Font | Size (Desktop) |
|---------|------|----------------|
| H1 Hero | Cormorant Garamond 300 | 56–64px |
| H2 Section | Cormorant Garamond 400 | 36–42px |
| H3 Cards | Cormorant Garamond 500 | 24–28px |
| Body | Jost 300 | 16–17px |
| Navigation | Jost 400 | 13–14px uppercase |
| Buttons | Jost 400 | 14px uppercase |

Both fonts loaded from Google Fonts. Minimum body text: **16px** (non-negotiable for 35–55 readability).

---

## Website Pages

### Homepage (`index.html`)
- Announcement bar → Sticky navigation → Full-width hero
- Collection editorial story (2-col: text + image)
- Product grid highlights (3-col desktop, 2-col mobile)
- Brand values strip (100% Cotton · OEKO-TEX · Free shipping · 30-day returns)
- Social proof / UGC grid
- Newsletter signup (with DSGVO compliance notice)
- Footer with all German legal links

### Collection Page (`collection.html`)
- Editorial hero with collection name and story
- Lookbook gallery (click to shop the look)
- Full product grid with sticky filter bar (Size, Color, Price, Material)
- Behind-the-scenes / fabric detail section

### Product Page (`product.html`)
- Split layout: image gallery (60%) + product info (40%)
- Color swatches, size selector with fit guide link
- "In den Warenkorb" CTA in Dusty Rose
- Klarna / PayPal badge
- Accordion sections: Materials & Care · Fit & Size · Sustainability · Shipping & Returns

---

## German Market Requirements

### Legal Pages (Mandatory Before Launch)
- **Impressum** — full legal entity details
- **Datenschutzerklärung** — GDPR/DSGVO privacy policy
- **AGB** — General terms and conditions
- **Widerrufsbelehrung** — 14-day withdrawal policy with model form
- **Cookie consent banner** — granular opt-in (not just "accept all")
- All prices must display "inkl. MwSt." with shipping cost info

### Payments
- Klarna (BNPL — dominant in Germany)
- PayPal (57% of German online shoppers)
- SEPA Lastschrift (direct debit)
- Sofortüberweisung
- Visa / Mastercard

### Shipping & Returns
- DHL as primary carrier
- Free shipping at €75 threshold
- Free returns (table stakes for German market)
- Show estimated delivery dates, not "3–5 business days"

### Trust Signals
- Trusted Shops seal
- Verified purchase reviews (Loox or Judge.me)
- Visible phone number / contact form
- Detailed product descriptions (German consumers research before buying)
- "Model is 175cm, wearing size 38" on every product

---

## UX Principles

- **Navigation**: Transparent sticky header → `#FAF7F2` on scroll; desktop mega menu; **mobile bottom tab nav** (outperforms hamburger menus)
- **Cart**: Slide-out drawer from right — never redirect to cart page
- **Popups**: Max one newsletter popup per session (30s delay or exit intent)
- **Wishlist**: Cookie-based (no login needed), prompt to save permanently with account
- **Animations**: Gentle 200ms fade-up on sections, product image crossfade on hover
- **No aggressive interactions**: no forced redirects, no instant popups

### Responsive Breakpoints
| Breakpoint | Width | Notes |
|-----------|-------|-------|
| Mobile | < 768px | Bottom tab nav, 2-col product grid, 48px touch targets |
| Tablet | 768–1024px | 3-col product grid |
| Desktop | 1025–1440px | Full mega menu, 3–4 col grid |
| Wide | > 1440px | Max-width container 1440px, centered |

### Accessibility (WCAG AA)
- All text meets 4.5:1 contrast ratio
- Minimum body text 16px
- Minimum touch targets 48×48px on mobile
- Alt text on all images (both DE and EN)
- Keyboard navigable throughout
- Screen reader compatible navigation and forms

### Performance Targets
| Metric | Target |
|--------|--------|
| Largest Contentful Paint | < 2.5s |
| First Input Delay | < 100ms |
| Cumulative Layout Shift | < 0.1 |
| Hero image size | < 300KB (WebP) |
| Product images | 1200×1600px, 3:4 ratio |

---

## Shopify Implementation

### Recommended Theme
**Prestige** by Maestrooo (~$350) — built for premium fashion brands with superior editorial layout capabilities. Dawn (free) is a fallback if budget is a constraint.

### Essential Apps
| App | Purpose |
|-----|---------|
| Shopify Translate & Adapt | DE/EN multilingual |
| Klarna Payments | Buy Now Pay Later |
| Kiwi Size Chart | Visual size guides (reduces returns ~25%) |
| Loox or Judge.me | Photo reviews with verified badges |
| Klaviyo | Email marketing and newsletter flows |
| Trusted Shops | German market trust seal |
| Shopify Markets | Multi-currency and EU tax handling |

### Launch Checklist
- [ ] 15–25 products (one full capsule collection)
- [ ] 4–6 lifestyle/editorial photos per product
- [ ] Fabric detail close-up shot per product
- [ ] Brand story page (DE + EN)
- [ ] Sustainability / materials information page
- [ ] All legal pages (Impressum, AGB, Datenschutz, Widerruf)
- [ ] Size guide with DE/EU conversions and garment measurements
- [ ] "Model is Xcm, wearing size XX" on every product
- [ ] Cookie consent banner (GDPR compliant)
- [ ] All payment methods tested in Shopify test mode
- [ ] Lighthouse audit — target 90+ across all metrics
- [ ] German copy reviewed by native speaker
- [ ] Cross-browser test (Chrome, Firefox, Safari, Edge — desktop + mobile)

---

## Market Research Summary

Key findings informing TARA's strategy:

- **Market size**: European fashion e-commerce USD 125.68B (2025), growing at 4.25% CAGR
- **Cotton**: Holds 40.35% market share in European apparel — performs best in premium/sustainable segments
- **Underserved segment**: Women 45–60 control 80% of UK wealth and spend £7B/year on clothing — largely ignored by fashion brands
- **Sustainability nuance**: 63% say it matters, only 17% pay a premium — certifications as trust signals, not price justification
- **Germany**: Europe's largest fashion e-commerce market; 44% return rate driven by sizing — size tools are critical
- **Slow fashion**: Capsule wardrobe mentality is mainstream across Europe — fewer, better pieces

Full research documents in `TARA_Market_Research_Report.md`, `European_Women_ICP_Research.md`, and `European_Cotton_Brands_Research.md`.

---

## Photography Direction

- **Lighting**: Soft, diffused natural light — warm golden tone, never clinical/cool
- **Models**: Include women aged 35–55, natural makeup, relaxed poses
- **Settings**: Parisian-inspired — café terraces, morning window light, linen interiors
- **Fabric**: Show cotton texture, natural wrinkles allowed (signals authenticity)
- **Color grading**: Warm, slightly desaturated — matches cream/blush palette
- **Format**: WebP primary, JPEG fallback, alt text in both DE and EN

---

## Contributing

This is a private brand project. For design or development contributions, refer to `CLAUDE.md` for full project context and conventions.
