# Cotton Clothing Website — Design & Build Plan

## Context
Building a Shopify-based ecommerce website selling **exclusive cotton clothing** for women aged 25-60 (primary focus: 35-55) in the **German market** (with English language support). The brand follows a **French Soft Elegance** aesthetic at **accessible premium** pricing (T-shirts €25-45, dresses €70-120), launching with **curated capsule collections**. Sustainability messaging is subtle and woven into fabric details rather than being the headline. Starting from scratch — no existing brand assets.

---

## 1. Color Palette

### Primary Palette
| Role | Color | Hex | Usage |
|------|-------|-----|-------|
| **Background** | Warm Cream | `#FAF7F2` | Main site background — warmer than pure white, feels luxurious |
| **Secondary BG** | Soft Blush | `#F5E6E0` | Section dividers, highlight blocks, newsletter area |
| **Primary Text** | Warm Charcoal | `#3D3633` | Body copy — softer than black, easier on eyes for 35-55 demographic |
| **Heading Text** | Deep Espresso | `#2C2220` | Headlines, navigation, brand name |

### Accent Colors
| Role | Color | Hex | Usage |
|------|-------|-----|-------|
| **Primary Accent** | Dusty Rose | `#C4A08A` | CTAs, hover states, active navigation, price display |
| **Secondary Accent** | Soft Lavender | `#D5C8D9` | Tags, badges ("New Collection"), secondary buttons |
| **Warm Accent** | Muted Terracotta | `#C89B7B` | Sale tags, seasonal highlights, warm hover effects |
| **Trust/Sustainability** | Sage Green | `#9BAF93` | Certification badges, eco-labels, sustainability section |

### Functional Colors
| Role | Color | Hex | Usage |
|------|-------|-----|-------|
| **Success** | Soft Olive | `#8A9A6D` | Add to cart confirmation, stock available |
| **Error** | Warm Coral | `#D4736D` | Form errors, out of stock — warm, not alarming |
| **Link** | Muted Mauve | `#9C7E8C` | In-text links |
| **Border/Divider** | Pale Taupe | `#E8E0D8` | Card borders, section dividers, form fields |

### Usage Rules
- **Never use pure white (#FFFFFF)** as background — always `#FAF7F2` or warmer
- **Never use pure black (#000000)** for text — always `#2C2220` or `#3D3633`
- Accent colors at **max 15%** of any page — let cream and photography dominate
- Dusty Rose CTA buttons should use `#2C2220` (espresso) text for contrast/accessibility

---

## 2. Typography

### Font Pairing: Cormorant Garamond + Jost

| Element | Font | Weight | Size (Desktop) | Size (Mobile) | Notes |
|---------|------|--------|-----------------|----------------|-------|
| **H1 (Hero)** | Cormorant Garamond | 300 (Light) | 56-64px | 36-40px | Uppercase with 0.15em letter-spacing |
| **H2 (Sections)** | Cormorant Garamond | 400 (Regular) | 36-42px | 28-32px | Title case |
| **H3 (Cards)** | Cormorant Garamond | 500 (Medium) | 24-28px | 20-24px | Product names, collection titles |
| **Body** | Jost | 300 (Light) | 16-17px | 15-16px | Line-height 1.7 for readability (critical for 35-55 audience) |
| **Navigation** | Jost | 400 (Regular) | 13-14px | 13px | Uppercase, 0.12em letter-spacing |
| **Buttons** | Jost | 400 (Regular) | 14px | 14px | Uppercase, 0.1em letter-spacing |
| **Captions/Meta** | Jost | 300 (Light) | 12-13px | 12px | Fabric details, care info |

### Typography Rules
- **Minimum body text: 16px** — non-negotiable for 35-55 demographic readability
- Line-height minimum **1.6** for body, **1.3** for headings
- Max content width: **680px** for reading comfort
- Cormorant Garamond is available free on Google Fonts — load weights 300, 400, 500
- Jost is available free on Google Fonts — load weights 300, 400

---

## 3. Photography & Imagery Style

### Photography Direction
- **Lighting**: Soft, diffused natural light. Warm tone — slightly golden, never clinical/cool
- **Backgrounds**: Natural linen textures, sun-drenched interiors, soft architecture (not plain studio white)
- **Models**: Diverse ages (include models 35-55!), natural makeup, relaxed poses — never stiff catalog poses
- **Fabric close-ups**: Show cotton texture, natural wrinkles allowed (signals authenticity)
- **Color grading**: Warm, slightly desaturated — matches the cream/blush palette
- **Lifestyle shots**: Parisian-inspired — café terraces, morning light through windows, linen tablecloths

### Image Specifications
- Hero images: 2400x1200px minimum, optimized to <300KB (WebP format)
- Product images: 1200x1600px (3:4 ratio), pure model shots + 1-2 styled/lifestyle shots + 1 fabric detail
- Collection grid: 800x1000px thumbnails
- Always include alt text in both German and English

---

## 4. Homepage Layout (Top to Bottom)

### Section 1: Announcement Bar
- Slim bar at top: `#F5E6E0` background, `#3D3633` text
- Content: Free shipping threshold, current collection name
- Dismissible on mobile

### Section 2: Navigation
- **Sticky header** on scroll (transparent → `#FAF7F2` on scroll)
- Centered logo: **TARA** in Cormorant Garamond, Light (300) weight, uppercase, letter-spacing 0.25em — elegant and airy
- Left: Mega menu (Kollektionen/Collections, Materialien/Materials, Über uns/About)
- Right: Search, Account, Wishlist heart icon, Cart with item count
- **Language toggle**: DE | EN — small, top-right corner
- Mobile: Bottom tab navigation (Home, Shop, Wishlist, Cart, Account) — research shows this outperforms hamburger menus

### Section 3: Hero
- Full-width lifestyle image with model in cotton clothing, warm natural setting
- Overlaid: Collection name in Cormorant Garamond H1 + 1-line description + "Kollektion entdecken" CTA
- CTA button: `#C4A08A` background, `#2C2220` text, subtle hover darken
- Optional: Gentle parallax scroll effect

### Section 4: Collection Story (Editorial)
- 2-column: Left = editorial text (collection story/inspiration), Right = image
- This section differentiates capsule collections with storytelling
- Cormorant Garamond H2 heading, Jost body text

### Section 5: Product Grid Highlights
- 3-column grid on desktop, 2-column on mobile
- 6-8 hero products from current collection
- Hover: second image (model wearing) + quick "Add to wishlist" heart
- Below each: Product name (Cormorant), Price (Jost), Available colors as small circles

### Section 6: Brand Values Strip
- 4 icons in a row: `100% Baumwolle` | `OEKO-TEX® zertifiziert` | `Kostenloser Versand ab €75` | `30 Tage Rückgabe`
- Subtle `#9BAF93` sage green icon color on `#FAF7F2` background
- This is the "subtle sustainability" — certifications as trust signals, not activism

### Section 7: "Styled By You" / Social Proof
- Instagram-style grid or customer photos
- UGC (User Generated Content) builds trust for German consumers
- Heading: "So tragen Sie unsere Stücke" / "How You Wear Our Pieces"

### Section 8: Newsletter Signup
- `#F5E6E0` blush background section
- Heading: "10% auf Ihre erste Bestellung" (10% off first order)
- Email field + CTA button
- Small text: DSGVO/GDPR compliance notice (mandatory in Germany)

### Section 9: Footer
- `#2C2220` espresso background, `#FAF7F2` cream text
- Columns: Shop, Über uns, Kundenservice, Rechtliches
- Certification logos: OEKO-TEX, GOTS (if applicable), payment methods
- **Critical for Germany**: Impressum link, Datenschutz (Privacy), AGB (Terms), Widerrufsrecht (Right of withdrawal)

---

## 5. Product Page Layout

### Above the Fold
- **Left (60%)**: Image gallery — main image + thumbnails, zoom on hover, fabric detail shot included
- **Right (40%)**:
  - Collection name (small, linked)
  - Product name (Cormorant H2)
  - Price (Jost, 20px, `#3D3633`)
  - Color swatches (if applicable)
  - **Size selector with fit guide link** — CRITICAL for Germany (44% return rate driven by sizing)
  - "In den Warenkorb" / "Add to Bag" CTA — full-width button, `#C4A08A`
  - Wishlist button (outline heart)
  - Klarna/PayPal badge (expected by German shoppers)

### Below the Fold (Accordion Sections)
1. **Materialien & Pflege** / Materials & Care — fabric composition (%), washing icons, care tips
2. **Passform & Größe** / Fit & Size — model measurements, garment measurements table, fit description
3. **Nachhaltigkeit** / Sustainability — where it was made, certification details, cotton sourcing
4. **Versand & Rückgabe** / Shipping & Returns — delivery times, free return policy

### Size Guide
- Visual measurement guide with illustrations (not just a table)
- DE/EU size conversions prominently displayed
- "Model is 175cm, wearing size 38" on every product
- Consider Shopify app integration for virtual size recommendation (reduces returns by 25%)

---

## 6. German Market-Specific Requirements

### Legal (Non-Negotiable)
- **Impressum page** — full legal entity details (mandatory by German law)
- **Datenschutzerklärung** — GDPR/DSGVO privacy policy
- **AGB** — General terms and conditions
- **Widerrufsbelehrung** — 14-day withdrawal/cancellation policy with model form
- **Cookie consent banner** — GDPR compliant, granular opt-in (not just "accept all")
- **Price display**: Must show "inkl. MwSt." (including VAT) and shipping cost info

### Payments
- **Klarna** (buy now pay later — hugely popular in Germany)
- **PayPal** (used by 57% of German online shoppers)
- **Credit/Debit cards** (Visa, Mastercard)
- **SEPA direct debit** (Lastschrift — uniquely German, builds trust)
- **Sofortüberweisung** (instant bank transfer)

### Shipping & Returns
- Partner with **DHL** (most trusted carrier in Germany)
- Free shipping threshold: €75 (research sweet spot)
- **Free returns** — table stakes in Germany
- Display estimated delivery dates, not just "3-5 business days"

### Trust Signals for German Consumers
- **Trusted Shops** seal (or similar — Germans rely heavily on trust seals)
- Customer reviews with verified purchase badges
- Detailed product descriptions (Germans research thoroughly before buying)
- Visible phone number / contact form (not just email)

---

## 7. UX/Interaction Design

### Micro-interactions
- Button hover: subtle color darken + slight scale (1.02)
- Product image hover: crossfade to second image
- Add to cart: slide-out cart drawer from right (don't redirect to cart page)
- Scroll animations: gentle fade-up on sections (200ms, ease-out)
- No aggressive popups — one newsletter popup after 30 seconds or exit intent, max once per session

### Navigation
- **Mega menu** on desktop: collection images + category links
- **Breadcrumbs** on all pages (German shoppers expect structured navigation)
- **Sticky filter bar** on collection pages: Size, Color, Price, Material, Sort by
- **Wishlist**: accessible without login (cookie-based), prompt for account to save permanently

### Performance Targets
- Largest Contentful Paint: <2.5s
- First Input Delay: <100ms
- Cumulative Layout Shift: <0.1
- Use lazy loading for images below the fold
- WebP format with JPEG fallback

---

## 8. Shopify Implementation Notes

### Recommended Theme
- **Dawn** (free, clean, fast) customized to match the French Soft Elegance palette
- OR **Prestige** by Maestrooo (paid ~$350, built for premium fashion brands, better editorial layouts)
- **Prestige is recommended** for capsule collection storytelling capabilities

### Essential Shopify Apps
1. **Langify** or **Shopify Translate & Adapt** — DE/EN multilingual
2. **Klarna Payments** — BNPL integration
3. **Kiwi Size Chart** — visual size guides
4. **Loox or Judge.me** — photo reviews
5. **Klaviyo** — email marketing / newsletter flows
6. **Trusted Shops** — trust seal for German market
7. **Shopify Markets** — multi-currency, tax handling

### Content Requirements Before Launch
- 15-25 products (1 capsule collection)
- 4-6 lifestyle/editorial photos per product
- Brand story page copy (DE + EN)
- Sustainability/materials information page
- All legal pages (Impressum, AGB, Datenschutz, Widerruf)
- Size guide with measurements

---

## 9. Capsule Collection Page Design

Since you're launching with capsule collections, each collection gets a dedicated editorial page:

### Structure
1. **Hero**: Full-bleed collection lifestyle image + collection name + season
2. **The Story**: 2-3 paragraphs on inspiration, mood, and fabric choices — editorial tone
3. **Lookbook Gallery**: 4-6 styled outfit shots, click to shop the look
4. **Full Collection Grid**: All pieces, filterable
5. **Styling Suggestions**: "Complete the Look" pairings
6. **Behind the Scenes**: 1-2 images of fabric/production (subtle sustainability)

---

## 10. Responsive Design Breakpoints

| Breakpoint | Width | Grid | Notes |
|-----------|-------|------|-------|
| Mobile | <768px | 2-col products, stacked layout | Bottom tab nav, larger tap targets (min 48px) |
| Tablet | 768-1024px | 3-col products | Side-by-side product page |
| Desktop | 1025-1440px | 3-4 col products | Full mega menu, sticky header |
| Wide | >1440px | Max-width container 1440px, centered | Prevent over-stretching on ultrawide monitors |

---

## 11. Accessibility (Critical for 35-55+ Audience)

- All text meets **WCAG AA** contrast ratio (4.5:1 minimum)
- Focus states visible on all interactive elements
- Font size never below 14px, body never below 16px
- Touch targets minimum 48x48px on mobile
- Image alt text on all product images
- Keyboard navigable throughout
- Screen reader compatible navigation and forms

---

## Verification & Testing Plan

1. **Visual**: Create mood board in Figma/Canva matching the color palette and typography before building
2. **Shopify Setup**: Install theme (Prestige recommended), apply custom colors and fonts
3. **Legal Review**: Have German legal compliance reviewed (Impressum, AGB, Widerruf, DSGVO)
4. **Cross-browser**: Test on Chrome, Firefox, Safari, Edge — both desktop and mobile
5. **Performance**: Run Lighthouse audit, target 90+ scores
6. **Accessibility**: Run axe DevTools audit, fix all critical/serious issues
7. **Payment**: Test all payment methods in Shopify test mode (Klarna, PayPal, SEPA, cards)
8. **Language**: Review all German copy with native speaker — translation quality is a trust signal
9. **Size Guide**: Validate size chart accuracy with actual garment measurements
10. **Mobile**: Test bottom tab navigation flow on iPhone and Android
