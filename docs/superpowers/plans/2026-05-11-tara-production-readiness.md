# TARA Production Readiness Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Make the TARA static Eleventy prototype credible as a Germany-first production launch simulation with local brand imagery, complete trust/legal surfaces, stronger ecommerce UX, and launch QA documentation.

**Architecture:** Keep `website/src` as the source of truth and use Eleventy to build `website/dist`. Add shared data files in `website/src/_data/` so fictional legal details, products, trust constants, and image paths are centralized and easy to replace. Generated visual assets are saved under `website/images/tara/` and referenced locally from templates.

**Tech Stack:** Eleventy 3, Nunjucks, static CSS/JS, browser `localStorage`, ChatGPT Image 2 built-in image generation workflow.

---

## File Structure

- Create `website/src/_data/site.js`: central fictional business details, payment methods, shipping/returns constants, trust labels, and cookie categories.
- Create `website/src/_data/products.js`: 18-piece capsule product data, prices, color tokens, image path references, and alt text.
- Create `website/images/tara/`: local generated image assets.
- Modify `website/src/_layouts/base.njk`: SEO metadata, preload hints where useful, body data attributes, and script/css references if needed.
- Modify `website/src/_includes/header.njk`: remove dead links, expose real navigation, keep sticky desktop and bottom-tab mobile behavior.
- Modify `website/src/_includes/footer.njk`: legal links, contact details, payment/shipping/trust details, cookie settings reopen link.
- Modify `website/src/_includes/cookie-banner.njk`: granular consent copy and controls.
- Modify `website/src/_includes/cart-drawer.njk`: credible static cart state, shipping note, tax/shipping disclosure, payment reassurance.
- Modify `website/src/index.njk`: local imagery, trust strip, featured products from data, cleaned links.
- Modify `website/src/collection.njk`: local imagery and data-driven collection cards.
- Modify `website/src/product.njk`: local gallery, product trust details, add-to-cart data attributes, payment/shipping copy.
- Modify `website/src/legal/impressum.njk`, `website/src/legal/datenschutz.njk`, `website/src/legal/agb.njk`, `website/src/legal/widerruf.njk`: fictional German legal/business content driven by `site`.
- Modify `website/js/main.js`: cart drawer updates, wishlist persistence, cookie/settings reopen integration, keyboard/focus behavior.
- Modify `website/js/cookie.js`: single consent storage key and category-specific state.
- Modify `website/css/*.css`: token-based style fixes only.
- Create `docs/TARA_Launch_QA_Checklist.md`: final launch checklist and replacement notes.

---

### Task 1: Centralize Launch Data

**Files:**
- Create: `website/src/_data/site.js`
- Create: `website/src/_data/products.js`

- [ ] **Step 1: Create `site.js` with fictional launch constants**

Use `apply_patch` to create `website/src/_data/site.js`:

```js
module.exports = {
  brand: {
    name: "TARA",
    legalName: "TARA Cotton GmbH",
    tagline: "Zeitlose Baumwollkleidung in kuratierten Kapseln",
    locale: "de-DE",
    currency: "EUR"
  },
  company: {
    street: "Rue de la Cotonnerie 12",
    postalCode: "20354",
    city: "Hamburg",
    country: "Deutschland",
    phone: "+49 40 2286 4190",
    email: "bonjour@tara-cotton.de",
    managingDirector: "Elise Martin",
    registerCourt: "Amtsgericht Hamburg",
    registerNumber: "HRB 184752",
    vatId: "DE348729615",
    economicId: "48/742/01938"
  },
  commerce: {
    freeShippingThreshold: "75 EUR",
    shippingCarrier: "DHL",
    deliveryWindow: "2-4 Werktage innerhalb Deutschlands",
    returnWindow: "30 Tage kostenlose Retoure",
    withdrawalWindow: "14 Tage gesetzliches Widerrufsrecht",
    taxNotice: "inkl. MwSt.",
    shippingNotice: "zzgl. Versandkosten"
  },
  payments: ["Klarna", "PayPal", "SEPA Lastschrift", "Sofortueberweisung", "Visa", "Mastercard"],
  trust: [
    { label: "Trusted Shops", text: "Siegel vorbereitet" },
    { label: "Verifizierte Bewertungen", text: "Kaufbestaetigte Rezensionen" },
    { label: "DHL Versand", text: "Kostenlos ab 75 EUR" },
    { label: "Kostenlose Retoure", text: "30 Tage Rueckgabe" }
  ],
  cookies: {
    storageKey: "tara_cookie_consent",
    categories: [
      { id: "essential", label: "Essenziell", required: true, description: "Notwendig fuer Warenkorb, Wunschliste, Sicherheit und Cookie-Auswahl." },
      { id: "analytics", label: "Analyse", required: false, description: "Hilft uns, Nutzung und Performance anonymisiert zu verstehen." },
      { id: "marketing", label: "Marketing", required: false, description: "Erlaubt personalisierte Angebote und Kampagnenmessung." }
    ]
  }
};
```

- [ ] **Step 2: Create `products.js` with the 18-piece capsule**

Use `apply_patch` to create `website/src/_data/products.js`:

```js
const img = "/images/tara/";

module.exports = [
  { id: "wrap-dress-lumiere", name: "Wickelkleid Lumiere", price: 98, category: "Kleider", badge: "Neu", colors: ["creme", "rose", "sage"], image: `${img}product-wrap-dress-01.webp`, hoverImage: `${img}product-wrap-dress-02.webp`, alt: "Wickelkleid Lumiere aus cremefarbener Bio-Baumwolle", hoverAlt: "Wickelkleid Lumiere getragen im warmen Tageslicht" },
  { id: "blouse-aurore", name: "Oversized Bluse Aurore", price: 68, category: "Blusen & Tops", colors: ["creme", "lavender"], image: `${img}product-blouse-01.webp`, hoverImage: `${img}product-blouse-02.webp`, alt: "Oversized Bluse Aurore aus weicher Bio-Baumwolle", hoverAlt: "Oversized Bluse Aurore kombiniert mit weiter Baumwollhose" },
  { id: "trouser-soleil", name: "Weite Hose Soleil", price: 85, category: "Hosen", colors: ["sand", "espresso"], image: `${img}product-trouser-01.webp`, hoverImage: `${img}product-trouser-02.webp`, alt: "Weite Hose Soleil aus Baumwolle in Sand", hoverAlt: "Weite Hose Soleil in einer entspannten Capsule-Kombination" },
  { id: "tee-douceur", name: "Essential Tee Douceur", price: 38, category: "T-Shirts", badge: "Bestseller", colors: ["rose", "creme", "espresso", "sage"], image: `${img}product-tee-01.webp`, hoverImage: `${img}product-tee-02.webp`, alt: "Essential Tee Douceur aus Bio-Baumwolle", hoverAlt: "Essential Tee Douceur unter Baumwoll-Cardigan gestylt" },
  { id: "cardigan-tendresse", name: "Strick-Cardigan Tendresse", price: 78, category: "Strickwaren", colors: ["lavender", "creme"], image: `${img}product-cardigan-01.webp`, hoverImage: `${img}product-cardigan-02.webp`, alt: "Strick-Cardigan Tendresse aus Baumwolle", hoverAlt: "Strick-Cardigan Tendresse ueber einer hellen Bluse" },
  { id: "midi-skirt-jardin", name: "Midi-Rock Jardin", price: 72, category: "Roecke", colors: ["sage", "terracotta"], image: `${img}product-skirt-01.webp`, hoverImage: `${img}product-skirt-02.webp`, alt: "Midi-Rock Jardin aus Baumwolle in Salbei", hoverAlt: "Midi-Rock Jardin mit Baumwolltop kombiniert" },
  { id: "blazer-clarte", name: "Baumwoll-Blazer Clarte", price: 118, category: "Jacken", badge: "Neu", colors: ["sand", "creme"], image: `${img}product-blazer-01.webp`, hoverImage: `${img}product-blazer-02.webp`, alt: "Baumwoll-Blazer Clarte in warmem Sandton", hoverAlt: "Baumwoll-Blazer Clarte als leichte Sommerjacke" },
  { id: "top-matin", name: "Baumwoll-Top Matin", price: 42, category: "Blusen & Tops", colors: ["rose", "lavender", "creme"], image: `${img}product-top-01.webp`, hoverImage: `${img}product-top-02.webp`, alt: "Baumwoll-Top Matin in zartem Rose", hoverAlt: "Baumwoll-Top Matin mit weiter Hose" },
  { id: "maxi-dress-etoile", name: "Maxikleid Etoile", price: 112, category: "Kleider", colors: ["terracotta", "creme"], image: `${img}product-maxi-dress-01.webp`, hoverImage: `${img}product-maxi-dress-02.webp`, alt: "Maxikleid Etoile aus fliessender Baumwolle", hoverAlt: "Maxikleid Etoile in natuerlichem Abendlicht" },
  { id: "culotte-brise", name: "Culotte Brise", price: 76, category: "Hosen", colors: ["creme", "espresso"], image: `${img}product-culotte-01.webp`, hoverImage: `${img}product-culotte-02.webp`, alt: "Culotte Brise aus Baumwolle in Creme", hoverAlt: "Culotte Brise mit Oversized Bluse kombiniert" },
  { id: "shirt-horizon", name: "Leinenhemd Horizon", price: 62, category: "Blusen & Tops", badge: "Neu", colors: ["creme", "accent"], image: `${img}product-shirt-01.webp`, hoverImage: `${img}product-shirt-02.webp`, alt: "Leinenhemd Horizon aus Baumwoll-Leinen-Mix", hoverAlt: "Leinenhemd Horizon offen ueber Baumwolltop getragen" },
  { id: "jersey-dress-murmure", name: "Jersey-Kleid Murmure", price: 88, category: "Kleider", colors: ["lavender", "rose"], image: `${img}product-jersey-dress-01.webp`, hoverImage: `${img}product-jersey-dress-02.webp`, alt: "Jersey-Kleid Murmure aus weicher Baumwolle", hoverAlt: "Jersey-Kleid Murmure in entspannter Alltagsszene" },
  { id: "shorts-riviere", name: "Shorts Riviere", price: 48, category: "Hosen", colors: ["sand", "sage"], image: `${img}product-shorts-01.webp`, hoverImage: `${img}product-shorts-02.webp`, alt: "Shorts Riviere aus robuster Baumwolle", hoverAlt: "Shorts Riviere mit Bluse und Sandalen" },
  { id: "wrap-top-caresse", name: "Wickeltop Caresse", price: 45, category: "Blusen & Tops", badge: "Bestseller", colors: ["accent", "creme", "lavender"], image: `${img}product-wrap-top-01.webp`, hoverImage: `${img}product-wrap-top-02.webp`, alt: "Wickeltop Caresse aus Bio-Baumwolle", hoverAlt: "Wickeltop Caresse mit A-Linien-Rock" },
  { id: "a-line-skirt-petale", name: "A-Linien-Rock Petale", price: 68, category: "Roecke", colors: ["terracotta", "sand"], image: `${img}product-a-line-skirt-01.webp`, hoverImage: `${img}product-a-line-skirt-02.webp`, alt: "A-Linien-Rock Petale aus Baumwolle", hoverAlt: "A-Linien-Rock Petale mit weichem Baumwollshirt" },
  { id: "pullover-nuage", name: "Strickpullover Nuage", price: 72, category: "Strickwaren", colors: ["rose", "sage"], image: `${img}product-pullover-01.webp`, hoverImage: `${img}product-pullover-02.webp`, alt: "Strickpullover Nuage aus Baumwollgarn", hoverAlt: "Strickpullover Nuage locker ueber der Schulter getragen" },
  { id: "shirt-dress-aube", name: "Hemdblusenkleid Aube", price: 105, category: "Kleider", badge: "Neu", colors: ["creme", "accent"], image: `${img}product-shirt-dress-01.webp`, hoverImage: `${img}product-shirt-dress-02.webp`, alt: "Hemdblusenkleid Aube aus heller Baumwolle", hoverAlt: "Hemdblusenkleid Aube mit Bindegurt getragen" },
  { id: "palazzo-velours", name: "Palazzo-Hose Velours", price: 82, category: "Hosen", colors: ["espresso", "sand", "terracotta"], image: `${img}product-palazzo-01.webp`, hoverImage: `${img}product-palazzo-02.webp`, alt: "Palazzo-Hose Velours aus schwerer Baumwolle", hoverAlt: "Palazzo-Hose Velours mit Wickeltop kombiniert" }
];
```

- [ ] **Step 3: Build to verify data syntax**

Run:

```powershell
npm run build
```

From: `website`

Expected: Eleventy builds successfully or fails only because templates do not consume the data yet. If it fails with JavaScript syntax errors in `_data`, fix the exact syntax error before continuing.

- [ ] **Step 4: Commit**

```powershell
git add website/src/_data/site.js website/src/_data/products.js
git commit -m "Add TARA launch data"
```

---

### Task 2: Generate And Save Local TARA Image Assets

**Files:**
- Create directory: `website/images/tara/`
- Create assets listed below.

- [ ] **Step 1: Create target directory**

Run:

```powershell
New-Item -ItemType Directory -Force website/images/tara
```

Expected: directory exists.

- [ ] **Step 2: Generate hero image with ChatGPT Image 2**

Use the built-in image generation workflow with this prompt:

```text
Use case: photorealistic-natural
Asset type: ecommerce homepage hero for TARA cotton clothing
Primary request: A warm editorial fashion photograph for a Germany-first cotton clothing brand named TARA.
Scene/backdrop: A quiet Parisian apartment balcony and soft cream interior, early golden-hour light.
Subject: One woman aged 42-50 wearing an understated cream cotton wrap dress, relaxed natural pose, confident and calm.
Style/medium: Photorealistic premium ecommerce editorial photography.
Composition/framing: Wide landscape composition, 2:1 ratio feel, subject slightly right of center with clean negative space on the left for page copy.
Lighting/mood: Warm natural light, soft shadows, gentle and elegant.
Color palette: Cream, warm rose, muted sage, terracotta accents, natural cotton neutrals.
Materials/textures: Visible soft cotton weave, matte fabric, natural skin texture.
Constraints: No visible logos, no text, no watermark, no fast-fashion styling, no extreme model pose, no unrealistic skin smoothing.
Avoid: black background, white studio void, harsh flash, brand names, readable signage.
```

Save final selected image as:

```text
website/images/tara/hero-lumiere-douce.webp
```

- [ ] **Step 3: Generate editorial and product images**

Generate images with the same constraints and save selected outputs to these exact paths:

```text
website/images/tara/editorial-wrap-dress.webp
website/images/tara/editorial-blouse-trouser.webp
website/images/tara/editorial-cotton-detail.webp
website/images/tara/editorial-atelier.webp
website/images/tara/editorial-capsule-rail.webp
website/images/tara/social-proof-01.webp
website/images/tara/social-proof-02.webp
website/images/tara/social-proof-03.webp
website/images/tara/product-wrap-dress-01.webp
website/images/tara/product-wrap-dress-02.webp
website/images/tara/product-blouse-01.webp
website/images/tara/product-blouse-02.webp
website/images/tara/product-trouser-01.webp
website/images/tara/product-trouser-02.webp
website/images/tara/product-tee-01.webp
website/images/tara/product-tee-02.webp
website/images/tara/product-cardigan-01.webp
website/images/tara/product-cardigan-02.webp
website/images/tara/product-skirt-01.webp
website/images/tara/product-skirt-02.webp
```

Use these exact primary requests with the shared prompt body below:

```text
editorial-wrap-dress.webp: A woman aged 45 wearing a cream cotton wrap dress walking through a quiet Parisian courtyard, relaxed posture, premium cotton texture visible.
editorial-blouse-trouser.webp: A woman aged 50 wearing an oversized cotton blouse and wide sand-colored cotton trousers near a sunlit window, calm elegant styling.
editorial-cotton-detail.webp: Close-up macro editorial image of folded cream organic cotton fabric, visible weave, soft natural shadows, no person.
editorial-atelier.webp: Quiet atelier table with cotton fabric swatches, measuring tape, cream garment pieces, warm natural light, no readable text.
editorial-capsule-rail.webp: Curated capsule wardrobe rail with cream, rose, sage, and terracotta cotton garments in a bright Parisian interior.
social-proof-01.webp: Natural lifestyle square crop of a woman aged 42 wearing a cotton dress outdoors, relaxed and understated.
social-proof-02.webp: Natural lifestyle square crop of a woman aged 55 wearing a cotton blouse and trousers, warm daylight.
social-proof-03.webp: Natural lifestyle square crop of a woman aged 47 wearing soft cotton knitwear, calm interior.
product-wrap-dress-01.webp: Product-friendly portrait of a woman aged 45 wearing a cream cotton wrap dress, front-facing relaxed stance.
product-wrap-dress-02.webp: Product-friendly portrait of the same style cream cotton wrap dress in a seated lifestyle pose.
product-blouse-01.webp: Product-friendly portrait of an oversized cream cotton blouse, front-facing relaxed stance.
product-blouse-02.webp: Product-friendly portrait of an oversized cream cotton blouse styled with wide cotton trousers.
product-trouser-01.webp: Product-friendly portrait of wide sand-colored cotton trousers with simple cream top, full-length framing.
product-trouser-02.webp: Product-friendly portrait of wide sand-colored cotton trousers in movement, soft drape visible.
product-tee-01.webp: Product-friendly portrait of a rose-toned organic cotton T-shirt, clean relaxed fit.
product-tee-02.webp: Product-friendly portrait of a rose-toned organic cotton T-shirt layered under a light cotton cardigan.
product-cardigan-01.webp: Product-friendly portrait of a soft lavender cotton cardigan, relaxed buttoned styling.
product-cardigan-02.webp: Product-friendly portrait of a soft lavender cotton cardigan worn open over a cream blouse.
product-skirt-01.webp: Product-friendly portrait of a sage cotton midi skirt, simple cream top, full outfit visible.
product-skirt-02.webp: Product-friendly portrait of a sage cotton midi skirt in a relaxed walking pose.
```

Shared prompt body for each request:

```text
Use case: photorealistic-natural
Asset type: TARA ecommerce product and editorial imagery
Scene/backdrop: Warm natural Parisian lifestyle setting or quiet atelier, premium but accessible.
Subject: Woman aged 35-55 wearing understated cotton clothing, relaxed pose, natural expression.
Style/medium: Photorealistic ecommerce editorial photography.
Composition/framing: 3:4 product-friendly portrait for product assets; balanced editorial framing for editorial assets.
Lighting/mood: Warm natural light, soft, calm, elegant.
Color palette: Cream, rose, sage, terracotta, warm neutrals.
Materials/textures: Natural cotton weave and soft matte fabric must be visible.
Constraints: No visible logos, no text, no watermark, no extreme fashion pose.
Avoid: harsh studio lighting, plastic-looking fabric, teenage styling, fast-fashion mood.
```

- [ ] **Step 4: Duplicate selected coherent assets for remaining product paths if generation volume is constrained**

If fewer than all 36 product images are generated, copy the best matching generated product images to the remaining names so all `products.js` paths resolve:

```powershell
Copy-Item website/images/tara/product-wrap-dress-01.webp website/images/tara/product-blazer-01.webp
Copy-Item website/images/tara/product-wrap-dress-02.webp website/images/tara/product-blazer-02.webp
Copy-Item website/images/tara/product-blouse-01.webp website/images/tara/product-top-01.webp
Copy-Item website/images/tara/product-blouse-02.webp website/images/tara/product-top-02.webp
Copy-Item website/images/tara/product-wrap-dress-01.webp website/images/tara/product-maxi-dress-01.webp
Copy-Item website/images/tara/product-wrap-dress-02.webp website/images/tara/product-maxi-dress-02.webp
Copy-Item website/images/tara/product-trouser-01.webp website/images/tara/product-culotte-01.webp
Copy-Item website/images/tara/product-trouser-02.webp website/images/tara/product-culotte-02.webp
Copy-Item website/images/tara/product-blouse-01.webp website/images/tara/product-shirt-01.webp
Copy-Item website/images/tara/product-blouse-02.webp website/images/tara/product-shirt-02.webp
Copy-Item website/images/tara/product-wrap-dress-01.webp website/images/tara/product-jersey-dress-01.webp
Copy-Item website/images/tara/product-wrap-dress-02.webp website/images/tara/product-jersey-dress-02.webp
Copy-Item website/images/tara/product-trouser-01.webp website/images/tara/product-shorts-01.webp
Copy-Item website/images/tara/product-trouser-02.webp website/images/tara/product-shorts-02.webp
Copy-Item website/images/tara/product-tee-01.webp website/images/tara/product-wrap-top-01.webp
Copy-Item website/images/tara/product-tee-02.webp website/images/tara/product-wrap-top-02.webp
Copy-Item website/images/tara/product-skirt-01.webp website/images/tara/product-a-line-skirt-01.webp
Copy-Item website/images/tara/product-skirt-02.webp website/images/tara/product-a-line-skirt-02.webp
Copy-Item website/images/tara/product-cardigan-01.webp website/images/tara/product-pullover-01.webp
Copy-Item website/images/tara/product-cardigan-02.webp website/images/tara/product-pullover-02.webp
Copy-Item website/images/tara/product-wrap-dress-01.webp website/images/tara/product-shirt-dress-01.webp
Copy-Item website/images/tara/product-wrap-dress-02.webp website/images/tara/product-shirt-dress-02.webp
Copy-Item website/images/tara/product-trouser-01.webp website/images/tara/product-palazzo-01.webp
Copy-Item website/images/tara/product-trouser-02.webp website/images/tara/product-palazzo-02.webp
```

- [ ] **Step 5: Commit**

```powershell
git add website/images/tara
git commit -m "Add local TARA brand imagery"
```

---

### Task 3: Update Shared Layout, Header, Footer, And Trust Surfaces

**Files:**
- Modify: `website/src/_layouts/base.njk`
- Modify: `website/src/_includes/header.njk`
- Modify: `website/src/_includes/footer.njk`
- Modify: `website/css/components.css`
- Modify: `website/css/responsive.css`

- [ ] **Step 1: Update base metadata**

Modify the `<head>` of `website/src/_layouts/base.njk` so it includes canonical-friendly metadata and local Open Graph fallback:

```njk
  <meta name="description" content="{{ description }}">
  <meta property="og:site_name" content="{{ site.brand.name }}">
  <meta property="og:title" content="{{ title }}">
  <meta property="og:description" content="{{ description }}">
  <meta property="og:type" content="website">
  <meta property="og:image" content="/images/tara/hero-lumiere-douce.webp">
  <title>{{ title }}</title>
```

- [ ] **Step 2: Replace header dead links**

In `website/src/_includes/header.njk`, ensure primary links use existing routes:

```njk
<a href="/collection/" class="header__nav-link">Kollektionen</a>
<a href="/materials/" class="header__nav-link">Materialien</a>
<a href="/collection/" class="header__nav-link">Lookbook</a>
<a href="/brand-story/" class="mobile-menu__link">Ueber uns ...</a>
```

Account links can stay static buttons or anchors with `aria-disabled="true"` and `data-static-feature="account"` if there is no account page.

- [ ] **Step 3: Update footer with contact, legal, and cookie settings**

In `website/src/_includes/footer.njk`, add or update content to include:

```njk
<a href="mailto:{{ site.company.email }}">{{ site.company.email }}</a>
<a href="tel:+494022864190">{{ site.company.phone }}</a>
<a href="/legal/impressum/">Impressum</a>
<a href="/legal/datenschutz/">Datenschutzerklaerung</a>
<a href="/legal/agb/">AGB</a>
<a href="/legal/widerruf/">Widerruf</a>
<a href="#" id="cookieSettingsLink">Cookie-Einstellungen</a>
```

Add a concise trust/payment line:

```njk
<p>{{ site.commerce.shippingCarrier }} Versand · Kostenlose Retoure · {{ site.payments | join(" · ") }}</p>
```

- [ ] **Step 4: Add focus styles if missing**

In `website/css/base.css` or `website/css/components.css`, add token-based focus styling:

```css
:focus-visible {
  outline: 2px solid var(--color-link);
  outline-offset: 3px;
}
```

- [ ] **Step 5: Build and commit**

Run:

```powershell
npm run build
```

Expected: build passes.

Commit:

```powershell
git add website/src/_layouts/base.njk website/src/_includes/header.njk website/src/_includes/footer.njk website/css/base.css website/css/components.css website/css/responsive.css
git commit -m "Update shared launch layout and trust navigation"
```

---

### Task 4: Convert Homepage And Collection To Local Data And Images

**Files:**
- Modify: `website/src/index.njk`
- Modify: `website/src/collection.njk`
- Modify: `website/css/pages.css`
- Modify: `website/css/components.css`

- [ ] **Step 1: Replace homepage hero image**

In `website/src/index.njk`, replace the hero image with:

```njk
<img src="/images/tara/hero-lumiere-douce.webp" alt="TARA Lumiere Douce Kollektion mit cremefarbenem Baumwollkleid im warmen Licht" fetchpriority="high">
```

- [ ] **Step 2: Replace editorial/social images with local assets**

Use these replacements in `website/src/index.njk`:

```njk
<img src="/images/tara/editorial-cotton-detail.webp" alt="Nahaufnahme von weicher Bio-Baumwolle fuer TARA" loading="lazy">
<img src="/images/tara/editorial-atelier.webp" alt="TARA Atelier mit Baumwollstoffen und ruhiger Arbeitsatmosphaere" loading="lazy">
<img src="/images/tara/social-proof-01.webp" alt="TARA Kundin im Baumwollkleid" loading="lazy">
<img src="/images/tara/social-proof-02.webp" alt="TARA Kundin in Bluse und weiter Hose" loading="lazy">
<img src="/images/tara/social-proof-03.webp" alt="TARA Kundin in weicher Strickware" loading="lazy">
```

- [ ] **Step 3: Render featured products from data**

Replace the six handwritten homepage product cards with a Nunjucks loop:

```njk
{% for product in products | slice(0, 6) %}
<article class="product-card animate-on-scroll">
  <a href="/product/" class="product-card__link" data-product-id="{{ product.id }}">
    <div class="product-card__image">
      {% if product.badge %}<span class="product-card__badge">{{ product.badge }}</span>{% endif %}
      <img src="{{ product.image }}" alt="{{ product.alt }}" loading="lazy">
      <img src="{{ product.hoverImage }}" alt="{{ product.hoverAlt }}" class="product-card__hover-img" loading="lazy">
    </div>
    <div class="product-card__info">
      <h3 class="product-card__name">{{ product.name }}</h3>
      <p class="product-card__price">&euro;{{ product.price }},00 <small>{{ site.commerce.taxNotice }}</small></p>
      <p class="product-card__shipping">{{ site.commerce.shippingNotice }}</p>
    </div>
  </a>
  <button class="product-card__wishlist" aria-label="{{ product.name }} zur Wunschliste hinzufuegen" data-product-id="{{ product.id }}" data-product-name="{{ product.name }}">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
  </button>
</article>
{% endfor %}
```

- [ ] **Step 4: Convert collection product grid to the same product loop**

In `website/src/collection.njk`, replace handwritten 18 product cards with the same loop over all products:

```njk
{% for product in products %}
<article class="product-card animate-on-scroll" data-category="{{ product.category }}" data-price="{{ product.price }}">
  <a href="/product/" class="product-card__link" data-product-id="{{ product.id }}">
    <div class="product-card__image">
      {% if product.badge %}<span class="product-card__badge">{{ product.badge }}</span>{% endif %}
      <img src="{{ product.image }}" alt="{{ product.alt }}" loading="lazy">
      <img src="{{ product.hoverImage }}" alt="{{ product.hoverAlt }}" class="product-card__hover-img" loading="lazy">
    </div>
    <div class="product-card__info">
      <h3 class="product-card__name">{{ product.name }}</h3>
      <p class="product-card__price">&euro;{{ product.price }},00 <small>{{ site.commerce.taxNotice }}</small></p>
      <p class="product-card__shipping">{{ site.commerce.shippingNotice }}</p>
    </div>
  </a>
  <button class="product-card__wishlist" aria-label="{{ product.name }} zur Wunschliste hinzufuegen" data-product-id="{{ product.id }}" data-product-name="{{ product.name }}">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
  </button>
</article>
{% endfor %}
```

- [ ] **Step 5: Add class-based link styling**

In `website/css/components.css`, replace inline product-card link styles with:

```css
.product-card__link {
  color: inherit;
  display: block;
  text-decoration: none;
}

.product-card__shipping {
  color: var(--color-text);
  font-size: var(--text-caption);
  margin-top: 0.25rem;
  opacity: 0.72;
}
```

- [ ] **Step 6: Verify no Unsplash remains in homepage or collection source**

Run:

```powershell
rg "images.unsplash.com|href=\"#\"|style=\"" website/src/index.njk website/src/collection.njk
```

Expected: no `images.unsplash.com`; remaining `href="#"` or `style="..."` entries are either removed or intentionally converted to classes.

- [ ] **Step 7: Build and commit**

```powershell
npm run build
git add website/src/index.njk website/src/collection.njk website/css/pages.css website/css/components.css
git commit -m "Use local launch imagery and product data"
```

---

### Task 5: Upgrade Product Page And Cart Drawer

**Files:**
- Modify: `website/src/product.njk`
- Modify: `website/src/_includes/cart-drawer.njk`
- Modify: `website/js/main.js`
- Modify: `website/css/components.css`

- [ ] **Step 1: Use first product data on product page**

At the top of `website/src/product.njk`, after front matter, set:

```njk
{% set product = products[0] %}
```

Use `product.name`, `product.price`, `product.image`, and `product.hoverImage` in the visible product content.

- [ ] **Step 2: Replace product gallery with local images**

Use these gallery paths:

```njk
<img id="productMainImage" src="{{ product.image }}" alt="{{ product.alt }}">
<button class="product-gallery__thumb active" data-src="{{ product.image }}" data-alt="{{ product.alt }}">
  <img src="{{ product.image }}" alt="{{ product.name }} Vorderansicht" loading="lazy">
</button>
<button class="product-gallery__thumb" data-src="{{ product.hoverImage }}" data-alt="{{ product.hoverAlt }}">
  <img src="{{ product.hoverImage }}" alt="{{ product.name }} getragen" loading="lazy">
</button>
<button class="product-gallery__thumb" data-src="/images/tara/editorial-cotton-detail.webp" data-alt="Stoffdetail aus Bio-Baumwolle">
  <img src="/images/tara/editorial-cotton-detail.webp" alt="Stoffdetail aus Bio-Baumwolle" loading="lazy">
</button>
<button class="product-gallery__thumb" data-src="/images/tara/editorial-wrap-dress.webp" data-alt="Wickelkleid Lumiere im Lookbook">
  <img src="/images/tara/editorial-wrap-dress.webp" alt="Wickelkleid Lumiere im Lookbook" loading="lazy">
</button>
```

- [ ] **Step 3: Add tax, shipping, and payment copy**

Update product price and payment area:

```njk
<p class="product-info__price">&euro;{{ product.price }},00 <small>{{ site.commerce.taxNotice }} · {{ site.commerce.shippingNotice }}</small></p>
<div class="product-info__payment-badges" aria-label="Zahlungsarten">
  <span>Bezahlen mit:</span>
  {% for payment in site.payments %}
    <span><strong>{{ payment }}</strong></span>{% if not loop.last %}<span>&bull;</span>{% endif %}
  {% endfor %}
</div>
```

- [ ] **Step 4: Add cart button data attributes**

Update the add-to-cart button:

```njk
<button class="btn btn--primary product-info__add-to-cart" data-product-id="{{ product.id }}" data-product-name="{{ product.name }}" data-product-price="{{ product.price }}">In den Warenkorb</button>
```

- [ ] **Step 5: Update cart drawer markup for dynamic static cart**

In `website/src/_includes/cart-drawer.njk`, make body/footer targetable:

```njk
<div class="cart-drawer__body" id="cartDrawerBody">
  <div class="cart-drawer__empty" id="cartEmptyState">
    <p>Ihr Warenkorb ist leer</p>
    <a href="/collection/" class="btn btn--primary">Kollektion entdecken</a>
  </div>
  <div class="cart-drawer__items" id="cartItems" hidden></div>
</div>
<div class="cart-drawer__footer">
  <div class="cart-drawer__shipping-note">Kostenloser Versand ab 75&euro; mit DHL</div>
  <div class="cart-drawer__total">
    <span>Zwischensumme</span>
    <span id="cartSubtotal">&euro;0,00</span>
  </div>
  <button class="btn btn--dark btn--full" type="button">Zur Kasse</button>
  <p class="cart-drawer__legal-note">inkl. MwSt. &bull; Versandkosten an der Kasse</p>
</div>
```

- [ ] **Step 6: Add cart state in `main.js`**

Add near cart drawer setup in `website/js/main.js`:

```js
  const cartState = {
    items: JSON.parse(localStorage.getItem('tara-cart') || '[]')
  };

  function formatEuro(value) {
    return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(value);
  }

  function saveCart() {
    localStorage.setItem('tara-cart', JSON.stringify(cartState.items));
  }

  function renderCart() {
    const cartItems = document.getElementById('cartItems');
    const cartEmptyState = document.getElementById('cartEmptyState');
    const cartSubtotal = document.getElementById('cartSubtotal');
    const count = cartState.items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cartState.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    document.querySelectorAll('.header__cart-count, .bottom-nav__cart-count').forEach(el => {
      el.textContent = String(count);
    });

    if (cartSubtotal) cartSubtotal.textContent = formatEuro(subtotal);
    if (!cartItems || !cartEmptyState) return;

    cartEmptyState.hidden = cartState.items.length > 0;
    cartItems.hidden = cartState.items.length === 0;
    cartItems.innerHTML = cartState.items.map(item => `
      <div class="cart-line">
        <div>
          <strong>${item.name}</strong>
          <span>Menge ${item.quantity}</span>
        </div>
        <span>${formatEuro(item.price * item.quantity)}</span>
      </div>
    `).join('');
  }

  document.querySelectorAll('.product-info__add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
      const id = button.dataset.productId;
      const name = button.dataset.productName;
      const price = Number(button.dataset.productPrice);
      const existing = cartState.items.find(item => item.id === id);
      if (existing) {
        existing.quantity += 1;
      } else {
        cartState.items.push({ id, name, price, quantity: 1 });
      }
      saveCart();
      renderCart();
      openCart();
    });
  });

  renderCart();
```

- [ ] **Step 7: Add cart line styles**

In `website/css/components.css`:

```css
.cart-line {
  align-items: center;
  border-bottom: 1px solid var(--color-border);
  display: flex;
  justify-content: space-between;
  padding: var(--space-sm) 0;
}

.cart-line span {
  color: var(--color-text);
  display: block;
  font-size: var(--text-caption);
  margin-top: 0.25rem;
}

.cart-drawer__legal-note {
  color: var(--color-text);
  font-size: var(--text-caption);
  margin-top: 0.5rem;
  opacity: 0.72;
  text-align: center;
}
```

- [ ] **Step 8: Build and commit**

```powershell
npm run build
git add website/src/product.njk website/src/_includes/cart-drawer.njk website/js/main.js website/css/components.css
git commit -m "Upgrade product and cart launch flow"
```

---

### Task 6: Fix Cookie Consent And Wishlist Persistence

**Files:**
- Modify: `website/src/_includes/cookie-banner.njk`
- Modify: `website/js/cookie.js`
- Modify: `website/js/main.js`

- [ ] **Step 1: Make cookie banner use `site.cookies`**

Update `website/src/_includes/cookie-banner.njk` categories:

```njk
<div class="cookie-banner__categories">
  {% for category in site.cookies.categories %}
  <div class="cookie-banner__category">
    <label for="cookie{{ category.id | capitalize }}">
      <input type="checkbox" id="cookie{{ category.id | capitalize }}" data-cookie-category="{{ category.id }}"{% if category.required %} checked disabled{% endif %}>
      <span>{{ category.label }}</span>
    </label>
    <p>{{ category.description }}</p>
  </div>
  {% endfor %}
</div>
```

- [ ] **Step 2: Remove duplicate cookie handling from `main.js`**

Delete the `// ---- Cookie Banner ----` block in `website/js/main.js` that uses `tara-cookies-accepted`. Cookie behavior should only live in `website/js/cookie.js`.

- [ ] **Step 3: Replace `cookie.js` with single-key consent logic**

Update `website/js/cookie.js`:

```js
const CONSENT_KEY = 'tara_cookie_consent';

function getConsent() {
  try {
    return JSON.parse(localStorage.getItem(CONSENT_KEY));
  } catch {
    return null;
  }
}

function saveConsent(selection) {
  const consent = {
    essential: true,
    analytics: Boolean(selection.analytics),
    marketing: Boolean(selection.marketing),
    timestamp: new Date().toISOString()
  };
  localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
  hideBanner();
  document.dispatchEvent(new CustomEvent('tara:consent-updated', { detail: consent }));
}

function hideBanner() {
  document.getElementById('cookieBanner')?.classList.remove('is-visible');
}

function showBanner() {
  document.getElementById('cookieBanner')?.classList.add('is-visible');
}

document.addEventListener('DOMContentLoaded', function() {
  if (!getConsent()) showBanner();

  document.getElementById('cookieAcceptAll')?.addEventListener('click', function() {
    saveConsent({ analytics: true, marketing: true });
  });

  document.getElementById('cookieSaveSelection')?.addEventListener('click', function() {
    saveConsent({
      analytics: document.getElementById('cookieAnalytics')?.checked,
      marketing: document.getElementById('cookieMarketing')?.checked
    });
  });

  document.getElementById('cookieSettingsLink')?.addEventListener('click', function(e) {
    e.preventDefault();
    showBanner();
  });
});
```

- [ ] **Step 4: Add wishlist persistence to `main.js`**

Replace the product-card wishlist click handler with:

```js
  const wishlistState = new Set(JSON.parse(localStorage.getItem('tara-wishlist') || '[]'));

  function saveWishlist() {
    localStorage.setItem('tara-wishlist', JSON.stringify([...wishlistState]));
  }

  function renderWishlistButtons() {
    document.querySelectorAll('.product-card__wishlist').forEach(btn => {
      const id = btn.dataset.productId;
      const svg = btn.querySelector('svg');
      const active = wishlistState.has(id);
      btn.classList.toggle('is-active', active);
      svg?.setAttribute('fill', active ? 'var(--color-accent)' : 'none');
      svg?.setAttribute('stroke', active ? 'var(--color-accent)' : 'var(--color-heading)');
      btn.setAttribute('aria-pressed', String(active));
    });
  }

  document.querySelectorAll('.product-card__wishlist').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      const id = btn.dataset.productId;
      if (!id) return;
      if (wishlistState.has(id)) wishlistState.delete(id);
      else wishlistState.add(id);
      saveWishlist();
      renderWishlistButtons();
    });
  });

  renderWishlistButtons();
```

- [ ] **Step 5: Build and commit**

```powershell
npm run build
git add website/src/_includes/cookie-banner.njk website/js/cookie.js website/js/main.js
git commit -m "Fix consent and wishlist persistence"
```

---

### Task 7: Complete Fictional German Legal Pages

**Files:**
- Modify: `website/src/legal/impressum.njk`
- Modify: `website/src/legal/datenschutz.njk`
- Modify: `website/src/legal/agb.njk`
- Modify: `website/src/legal/widerruf.njk`

- [ ] **Step 1: Update Impressum**

Ensure `website/src/legal/impressum.njk` includes:

```njk
<h1>Impressum</h1>
<p><strong>{{ site.brand.legalName }}</strong><br>
{{ site.company.street }}<br>
{{ site.company.postalCode }} {{ site.company.city }}<br>
{{ site.company.country }}</p>

<h2>Vertreten durch</h2>
<p>{{ site.company.managingDirector }}, Geschaeftsfuehrerin</p>

<h2>Kontakt</h2>
<p>Telefon: <a href="tel:+494022864190">{{ site.company.phone }}</a><br>
E-Mail: <a href="mailto:{{ site.company.email }}">{{ site.company.email }}</a></p>

<h2>Registereintrag</h2>
<p>Eintragung im Handelsregister.<br>
Registergericht: {{ site.company.registerCourt }}<br>
Registernummer: {{ site.company.registerNumber }}</p>

<h2>Umsatzsteuer-ID</h2>
<p>Umsatzsteuer-Identifikationsnummer gemaess § 27 a Umsatzsteuergesetz: {{ site.company.vatId }}</p>
```

- [ ] **Step 2: Update Datenschutz**

Ensure `datenschutz.njk` covers controller, cookie categories, localStorage, newsletter, contact, analytics disabled until consent, marketing disabled until consent, retention, rights, and supervisory authority. Use this controller block:

```njk
<p>Verantwortlich fuer die Datenverarbeitung ist {{ site.brand.legalName }}, {{ site.company.street }}, {{ site.company.postalCode }} {{ site.company.city }}, E-Mail: <a href="mailto:{{ site.company.email }}">{{ site.company.email }}</a>.</p>
```

Include this consent statement:

```njk
<p>Analyse- und Marketing-Cookies werden erst gesetzt, wenn Sie diese Kategorien im Cookie-Banner aktiv auswaehlen. Sie koennen Ihre Auswahl jederzeit ueber den Link "Cookie-Einstellungen" im Footer aendern.</p>
```

- [ ] **Step 3: Update AGB**

Ensure `agb.njk` includes contract partner, order process simulation, prices with VAT, DHL shipping, payment methods, retention of title, liability, warranty, returns reference, governing law, and fictional business identity:

```njk
<p>Vertragspartner fuer alle Bestellungen ist {{ site.brand.legalName }}, {{ site.company.street }}, {{ site.company.postalCode }} {{ site.company.city }}.</p>
<p>Alle Preise verstehen sich inklusive gesetzlicher Mehrwertsteuer. Versandkosten werden vor Abschluss der Bestellung ausgewiesen.</p>
<p>Als Zahlungsarten sind Klarna, PayPal, SEPA Lastschrift, Sofortueberweisung, Visa und Mastercard vorgesehen.</p>
```

- [ ] **Step 4: Update Widerruf**

Ensure `widerruf.njk` includes 14-day withdrawal policy and model form:

```njk
<h2>Muster-Widerrufsformular</h2>
<p>Wenn Sie den Vertrag widerrufen wollen, fuellen Sie bitte dieses Formular aus und senden Sie es an:</p>
<p>{{ site.brand.legalName }}<br>
{{ site.company.street }}<br>
{{ site.company.postalCode }} {{ site.company.city }}<br>
E-Mail: {{ site.company.email }}</p>
<p>Hiermit widerrufe ich den von mir abgeschlossenen Vertrag ueber den Kauf der folgenden Waren:</p>
<p>Bestellt am: ____________ / erhalten am: ____________</p>
<p>Name der Verbraucherin/des Verbrauchers: ____________</p>
<p>Anschrift der Verbraucherin/des Verbrauchers: ____________</p>
<p>Datum und Unterschrift: ____________</p>
```

- [ ] **Step 5: Build and commit**

```powershell
npm run build
git add website/src/legal/impressum.njk website/src/legal/datenschutz.njk website/src/legal/agb.njk website/src/legal/widerruf.njk
git commit -m "Complete fictional German legal pages"
```

---

### Task 8: Add Launch QA Checklist And Final Scans

**Files:**
- Create: `docs/TARA_Launch_QA_Checklist.md`
- Verify: `website/src`, `website/css`, `website/js`

- [ ] **Step 1: Create launch QA checklist**

Create `docs/TARA_Launch_QA_Checklist.md`:

```markdown
# TARA Launch QA Checklist

Date: 2026-05-11

## Fictional Data To Replace

- Company name: TARA Cotton GmbH
- Address: Rue de la Cotonnerie 12, 20354 Hamburg
- Managing director: Elise Martin
- Register court and number: Amtsgericht Hamburg, HRB 184752
- VAT ID: DE348729615
- Tax/economic ID: 48/742/01938
- Phone: +49 40 2286 4190
- Email: bonjour@tara-cotton.de

## Required Before Real Launch

- German ecommerce lawyer review of Impressum, Datenschutz, AGB, and Widerruf.
- Real cookie consent platform or verified consent-mode integration.
- Shopify checkout, payment gateways, tax settings, shipping zones, and return flow.
- Real DHL shipping account and return label process.
- Real Trusted Shops setup and verified review tooling.
- Real product photography and model permissions.
- Real product inventory, SKU, materials, country-of-origin, and care label data.

## Static Prototype Verification

- `npm run build` passes from `website`.
- No `images.unsplash.com` references remain in `website/src`.
- Product prices show `inkl. MwSt.` and shipping-cost context.
- Cookie settings can be reopened from the footer.
- Cart opens as a drawer and stores demo items in `localStorage`.
- Wishlist stores selected product IDs in `localStorage`.
- Legal pages render in the Eleventy build.
- Product images have German alt text.

## Shopify Migration Notes

- Convert `website/src/_data/products.js` into Shopify product and collection metafields.
- Convert shared trust constants into theme settings or section blocks.
- Replace static cart logic with Shopify AJAX Cart API.
- Replace static language toggle with Shopify Markets or translation app support.
- Replace fictional legal fields in `website/src/_data/site.js` before theme migration.
```

- [ ] **Step 2: Run build**

```powershell
npm run build
```

From: `website`

Expected: build passes.

- [ ] **Step 3: Scan for remote stock images**

```powershell
rg "images.unsplash.com" website/src website/css website/js
```

Expected: no output.

- [ ] **Step 4: Scan for forbidden hardcoded black/white**

```powershell
rg "#FFFFFF|#ffffff|#000000|#000" website/src website/css website/js
```

Expected: no new forbidden color usage. Replace any maintained source usage with CSS variables.

- [ ] **Step 5: Scan for unresolved primary-flow anchors**

```powershell
rg "href=\"#\"" website/src
```

Expected: only intentional static feature triggers remain, such as cookie settings or account simulation links. Convert navigational dead links to real routes.

- [ ] **Step 6: Commit final docs and cleanup**

```powershell
git add docs/TARA_Launch_QA_Checklist.md website/src website/css website/js
git commit -m "Add TARA launch QA checklist"
```

---

### Task 9: Final Verification And Local Preview

**Files:**
- Verify generated output in `website/dist`

- [ ] **Step 1: Run final build**

```powershell
npm run build
```

From: `website`

Expected: Eleventy build succeeds and writes output to `website/dist`.

- [ ] **Step 2: Start dev server**

```powershell
npm run dev
```

From: `website`

Expected: Eleventy serves the site, usually at `http://localhost:8080/`. If port 8080 is occupied, use the URL printed by Eleventy.

- [ ] **Step 3: Browser smoke test**

Open the local URL and check:

```text
Homepage hero loads local TARA image.
Collection page shows 18 products.
Product page gallery switches thumbnails.
Add to cart opens the drawer and updates subtotal.
Wishlist buttons persist after reload.
Cookie banner saves selection and can reopen from footer.
Legal pages are reachable from footer.
Mobile viewport shows bottom tab navigation without overlap.
```

- [ ] **Step 4: Final git status**

```powershell
git status --short
```

Expected: only intentional uncommitted runtime output remains. Do not revert unrelated user files such as `AGENTS.md`.
