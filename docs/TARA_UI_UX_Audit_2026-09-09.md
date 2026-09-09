# TARA website UI / UX audit

Date: 9 September 2026

## Verdict

TARA has a coherent visual identity, but its shopping experience is substantially less complete than its presentation suggests. Preserve the warm photography, cream palette, editorial typography and capsule concept. Prioritize a reliable browse → choose → cart journey, mobile reflow, and readable supporting information before redesigning the visual identity.

The interface does not read as a generic software landing-page template. Its imagery and model direction fit the brief. Repeated atmospheric copy, repeated photographs, and decorative controls weaken its credibility, however. This is a design judgment, not a determination of how the assets were created.

## Project understanding and scope

- Fictional accessible-premium cotton brand for women 35–55, Germany first with English support. Positioning sits between Arket/COS minimalism and Toast storytelling.
- Actual implementation: Eleventy 3.1.5, Nunjucks, vanilla JavaScript, shared CSS tokens, 18 catalog records and 10 generated pages. Shopify is a future migration, not the current runtime.
- Source of truth: `website/src`, shared assets in `website/css`, `website/js`, and `website/images`. Vercel builds `website/dist`. Older root HTML files are not the deployed template source.
- Reviewed project instructions, design/research framing, README, launch QA notes, shared layout, all principal page templates, product data, CSS and JavaScript.
- Built the current checkout successfully with `npm run build`. Inspected the local generated site in a browser: desktop 1280×720, mobile 390×844, and collection at tablet 768×1024. Measured DOM dimensions and computed styles and exercised cart, wishlist, sort/filter, locale and consent controls.
- These findings apply to the current local build. Hosted deployment parity, real-device behavior, full screen-reader testing, automated WCAG conformance, Core Web Vitals and legal compliance were not certified. Research market statistics were treated as project context, not independently verified claims.

## Audit health

These are directional reviewer scores, not automated test scores. P0 blocks a represented core journey; it does not imply that a fictional prototype must process payments. P1 materially impairs use; P2 is a lower-impact improvement.

| Dimension | Score / 4 | Main evidence |
|---|---:|---|
| Accessibility | 1 | Inaccessible accordions, offscreen dialogs remain exposed, low-contrast supporting text |
| Performance implementation | 3 | Lean runtime and a 203 KB hero; no responsive image sources or WebP variants |
| Responsive design | 1 | Mobile product content expands to 580px; undersized controls |
| Design tokens | 3 | Strong shared palette/type system; opacity and hardcoded values undermine consistency |
| Visual anti-patterns | 3 | Brand-appropriate photography and restraint; repeated copy and imagery reduce distinctiveness |
| Total | **11 / 20** | **Significant work needed** |

**18 consolidated findings: 2 P0, 10 P1, 6 P2.**

## P0: Core shopping journey blockers

### 1. Every product opens the same dress

**Category:** Navigation / commerce UX. **Evidence:** `website/src/collection.njk:113`, homepage product links, and `website/src/product.njk:7`.

All 18 collection links point to `/product/`; that template explicitly selects `products[0]`. Clicking a €38 T-shirt therefore leads to the €98 Wickelkleid Lumière. Complete-the-look links have the same problem. This prevents meaningful product evaluation and makes the catalog feel deceptive even as a demo.

**Action:** Generate a detail route per product ID and use it everywhere. Keep imagery, price, available variants and descriptions bound to that record. Acceptance: the card and destination agree for every catalog item. Suggested workflow: `$impeccable harden`.

### 2. Cart ignores the shopper’s selection

**Category:** Error prevention / commerce UX. **Evidence:** `website/js/main.js:87`, `website/src/product.njk:58`.

Browser reproduction: choose size 40, click Rosé, set quantity to 3, then add. The cart displays **Menge 1 / €98**, without size or color; the product still says Crème. Cart records contain only ID, name, price and quantity. Repeated additions merge by product ID regardless of selected size. Color buttons have no handler.

**Action:** Use variant IDs, explicitly require a valid size, bind color selection and quantity, validate availability and show the chosen variant in the cart. Acceptance: 3 units of a €98 variant produce €294; two sizes remain distinct lines. Suggested workflow: `$impeccable harden`.

## P1: Major usability gaps

### 3. Mobile product page overflows horizontally

**Category:** Responsive / reflow. **Evidence:** `website/css/pages.css:13`, `:312`, `:740`.

At 390×844, the document expands to approximately **580px** and the add-to-cart button is approximately **556px wide**. The screenshot shows clipped product information, sizes and payment methods. The grid uses intrinsic minimum sizing, while the payment row does not wrap. The size-guide page also measures approximately 408px wide at this viewport; its precise overflow source needs isolation.

**Action:** Constrain grid children with `min-width: 0`, use tracks that can shrink, wrap payment content and contain wide tables. Verify 320, 390, 768 and 1024px plus enlarged text. Do not hide overflow to conceal missing controls. Suggested workflow: `$impeccable adapt`.

### 4. Cart provides no correction or meaningful next step

**Category:** User control / feedback. **Evidence:** `website/js/main.js:59`, `website/src/_includes/cart-drawer.njk:23`.

Cart rows contain only a name, quantity label and price. There is no remove button, quantity editor, product image or product link. “Zur Kasse” is an enabled button with no action, including when the cart is empty. A payment integration is an expected prototype boundary; silent failure and inability to correct the basket are UX defects.

**Action:** Add line editing/removal, variant details and a subtotal that updates. Disable checkout for an empty cart. For this portfolio build, make the checkout endpoint explicitly explain the demo boundary; real checkout can remain a separate launch task. Suggested workflow: `$impeccable harden`.

### 5. Discovery controls promise functionality they do not deliver

**Category:** Discoverability / feedback. **Evidence:** `website/src/collection.njk:70`, `website/src/_includes/search-overlay.njk:3`, `website/src/_includes/header.njk`.

All five filter buttons lack behavior. Selecting ascending price leaves the order at €98, €68, €85, €38… Search opens an input, but submission is suppressed and there are no results. Category links all lead to the same unfiltered collection.

**Action:** Implement simple client-side filtering, sorting and search over the 18 records, with result counts, reset controls and a no-results state. Category navigation should preserve its intended filter. Suggested workflow: `$impeccable harden`.

### 6. Wishlist saves IDs but cannot retrieve products

**Category:** State consistency. **Evidence:** `website/js/main.js:385`, `website/src/_includes/wishlist-drawer.njk`, `website/src/_layouts/base.njk`.

Browser reproduction: toggle the dress heart on the collection, then open the wishlist. The drawer still says it is empty. Its content is hardcoded. The bottom-nav wishlist and product-detail heart are not wired to the existing wishlist behavior. Account menu items and the bottom account action are also inert.

**Action:** Render saved products from the catalog, connect all wishlist entry points, expose removal and product navigation, and explain browser-only persistence. Mark account features as unavailable in the demo or provide a deliberate explanatory state. Suggested workflow: `$impeccable harden`.

### 7. Fit guidance is both disconnected and contradictory

**Category:** Purchase confidence / content. **Evidence:** `website/src/product.njk:68`, `:150`; `website/src/size-guide.njk:82`.

The size link beside the selector has no `href`. For EU 38, the product table gives chest 88–92, waist 70–74, hips 96–100 cm; the size guide gives 88–90, 68–70, 96–98. No distinction explains these conflicting measurements. The measuring illustration is a dressed model photograph, not a measurement diagram.

**Action:** Centralize sizing data, distinguish body from garment measurements if intended, connect the adjacent guide, and use a measurement diagram. Keep the selected variant intact when consulting the guide. Suggested workflow: `$impeccable clarify`.

### 8. Readability falls below the project’s audience requirements

**Category:** Typography / accessibility. **Evidence:** `website/css/variables.css:39`, `website/css/responsive.css`, `website/css/pages.css:111`, `:383`.

Measured mobile bottom labels are **10px**, hero body copy **15px**, and price metadata **12px**. Many care details, fit guidance, consent explanations and footer links use 12–13px, often with reduced opacity. The 17px global body size therefore does not ensure readable commerce content. This violates the stated project minimums; small text alone is not automatically a WCAG violation.

**Action:** Apply 16px minimum to explanatory and decision-making text, enforce the agreed UI minimum, and use spacing rather than faint miniature text for hierarchy. Resolve the design-plan table’s older 12–13px recommendations against the stricter current project brief. Suggested workflow: `$impeccable typeset`.

### 9. Several text colors fail the intended contrast threshold

**Category:** Accessibility / color. **Evidence:** `website/css/variables.css:14`, `:23`; `website/css/pages.css:84`, `:178`; `website/css/cookie.css:54`.

Calculated solid-color contrast: accent on cream **2.25:1**; link mauve on cream **3.40:1**. Both fail 4.5:1 for normal text. Accent is used for collection links and the size-guide affordance; mauve for text links. Applying opacity further weakens supporting text. In contrast, main body charcoal on cream is a strong **11.08:1**. Hero text also looks weak over the bright dress, but no single image-based ratio was measured.

**Action:** Define accessible text-link and muted-text tokens; reserve pale accent for fills/decorative uses. Recheck actual rendered backgrounds and photo overlays. Suggested workflow: `$impeccable colorize`.

### 10. Keyboard and assistive-technology behavior is incomplete

**Category:** Accessibility. **Evidence:** `website/src/product.njk:108`, `website/js/main.js:29`, `website/css/components.css:217`, shared drawer templates.

Accordion headers are clickable `div`s without keyboard semantics or expanded state. Desktop mega-menu opening is hover-only. Closed mobile menus, cart/wishlist dialogs and consent content remain present in the accessibility snapshot because they are moved offscreen instead of semantically hidden. Opening the cart leaves focus on the background add button. Focus containment, background inertness and focus restoration are missing. Most pages also lack a main landmark and there is no skip link.

**Action:** Use native disclosure/buttons, expose expanded and selected state, support keyboard menu opening, and implement a consistent modal lifecycle with semantic hiding and focus handling. Retain the existing focus-visible styling. Suggested workflow: `$impeccable harden`.

### 11. English mode is partial and resets between pages

**Category:** Localization / accessibility. **Evidence:** `website/js/main.js:322`.

Switching EN on the product page sets HTML language to English while the product title and add-to-cart button remain German. Matching a small dictionary against text nodes leaves most body copy, attributes, product content, consent and legal content unchanged. Navigating to the size guide resets HTML language to German. German content announced under an English language declaration also creates a screen-reader pronunciation problem.

**Action:** Use explicit translation keys and a persisted locale or locale routes. Translate product content, errors and accessible labels, and test the complete shopping journey in both languages. Suggested workflow: `$impeccable harden`.

### 12. Customer promises contradict one another

**Category:** Trust / content integrity. **Evidence:** `website/src/size-guide.njk:107`, `website/src/product.njk:171`, `website/src/brand-story.njk:33`, `website/src/_data/products.js`.

The size guide promises free returns within 14 days while the product/footer promise 30 days. The product separately explains a 14-day withdrawal period, but the size guide does not make that distinction. Cotton origin is southern France in the brand story and Turkey in product details. “Exclusively / 100% cotton” claims conflict with the cotton-linen shirt record. Repeated 91% water-saving and certification claims have no supporting evidence surfaced in the project’s customer experience.

**Action:** Centralize return and sourcing information, distinguish statutory withdrawal from any voluntary return promise, and bind material composition to each product. Use verified evidence or explicitly illustrative copy for the fictional demo. This is a consistency audit, not a legal determination. Suggested workflow: `$impeccable clarify`.

## P2: Important next-pass improvements

### 13. Products appear too late in the collection journey

**Category:** Information architecture. **Evidence:** `website/src/collection.njk:32`, `:47`.

At 1280×720, the product grid begins around **y=2884px**, roughly four viewport heights from the top. At tablet width it begins around y=2431px. Every category and Shop link lands before a hero, story and five-image lookbook, with no direct shop anchor.

**Action:** Put the catalog and category controls much earlier, or provide a prominent “Shop the 18 pieces” jump link and separate lookbook navigation. Preserve editorial content for shoppers who want it. Suggested workflow: `$impeccable layout`.

### 14. Mobile navigation and consent need simplification

**Category:** Responsive / interaction. **Evidence:** `website/css/responsive.css`, `website/css/cookie.css:96`.

Mobile has both a hamburger/header action row and five bottom tabs, duplicating account, cart and wishlist. Header buttons measure **40×40px**, below the project’s 48px requirement. Consent buttons measure 40px high. The mobile consent panel is approximately **492px high** in an 844px viewport, hides bottom navigation, and pushes its two action buttons against the right edge. Reopening consent after reload does not restore saved checkbox selections into the controls.

**Action:** Keep essential shopping destinations in working bottom tabs, reduce header duplication, enlarge touch areas and give consent a compact summary with accessible detail disclosure. Restore saved settings before presenting them. Suggested workflow: `$impeccable adapt`.

### 15. Product imagery cannot answer enough buying questions

**Category:** Merchandising / visual UX. **Evidence:** `website/src/_data/products.js`, `website/src/product.njk:22`.

Every hover image uses the same file as its primary image, so the promised crossfade adds no information. The first two detail thumbnails are also the same photograph. Generic fabric/editorial images do not replace front/back, fit and construction views. The gallery’s zoom cursor only produces a small hover scale, not an inspection view.

**Action:** Supply genuinely distinct views per item, preserve garment/color consistency, and provide usable enlargement with mobile support. Keep the existing warm light and age-relevant direction. Suggested workflow: `$impeccable shape`.

### 16. Trust and demo boundaries are not clear at the moment of use

**Category:** Trust / feedback. **Evidence:** `website/src/_data/site.js:37`, footer include, `website/src/collection.njk:230`, launch QA notes.

Trusted Shops and verified reviews exist as unused data rather than functioning trust surfaces. Fictional contact details look like operational support. Newsletter submission changes the button to “Vielen Dank!” and clears input without saving a subscription. “Journal” leads to the collection. The README explains prototype scope much more clearly than the storefront does.

**Action:** Add concise demo context at simulated endpoints; do not imply a subscription succeeded or that payment/support integrations exist. Correct misleading link labels. For launch, populate real verified reviews and certification evidence rather than decorative trust badges. Suggested workflow: `$impeccable clarify`.

### 17. Image delivery and motion need a measured optimization pass

**Category:** Performance / accessibility. **Evidence:** image directory, shared layout, `website/css/base.css:237`.

The 27 local image files total approximately **5.9 MB**; this is the asset inventory, not initial page transfer. They are JPEG-only with no responsive `srcset`/`sizes`. Sample product imagery is 1086×1448, below the requested 1200×1600. The hero is 1774×887 and approximately **203 KB**, comfortably within its weight budget. Lazy loading and image aspect-ratio containers already help. Entrance transitions use 400ms and lack a reduced-motion override; many sections begin invisible until JavaScript reveals them.

**Action:** Generate responsive WebP plus JPEG fallbacks, retain reserved image space, honor reduced motion and keep content visible if enhancement fails. Measure real loading performance before claiming LCP/CLS targets. Suggested workflow: `$impeccable optimize`.

### 18. Content and design-system duplication makes drift likely

**Category:** Maintainability / theming / copy. **Evidence:** `website/css/pages.css:817`, `:1014`, page templates and duplicate root HTML.

The token system is a good foundation, but page styles still hardcode palette values and independently reduce opacity. Shared business rules and size data are duplicated. Jost 500 is requested by CSS but only 300/400 are loaded. The header is already cream at the top, contrary to the transparent-to-cream brief. German copy needs editing, e.g. “Weil gutes Kleidung auch ehrliches Kleidung ist.” Broad poetic copy repeats across several pages while concrete product information is harder to access.

**Action:** Document the actual source of truth, centralize shared facts, replace hardcoded colors with tokens, load intended weights, and edit German copy for clarity and accuracy. Treat the opaque header as a documented design choice if preferred, rather than changing it automatically. Suggested workflows: `$impeccable document`, then `$impeccable polish`.

## What to preserve

- Warm visual direction and an age-relevant hero model support the intended audience.
- Prices and catalog size broadly match the accessible-premium capsule positioning.
- Reusable templates, central product data and low runtime complexity are a sound migration foundation.
- Cart drawer and persistent wishlist IDs establish useful primitives.
- German alt text, labeled form fields, focus-visible styles, lazy-loaded below-fold imagery and legal-page routes already exist.
- Fit, care, shipping and returns content is present; correcting and exposing it is more valuable than adding more atmospheric sections.

## Recommended order

1. `$impeccable harden`: correct product routing, variants, quantity, cart correction, wishlist and discovery controls. Make the demo boundary explicit.
2. `$impeccable adapt`: fix product/size-guide overflow and mobile target sizes; verify the purchase journey at narrow widths.
3. `$impeccable typeset` and `$impeccable colorize`: repair functional text sizes and contrast while retaining brand identity.
4. `$impeccable harden` and `$impeccable clarify`: keyboard/dialog behavior, full localization, consistent sizing and customer promises.
5. `$impeccable layout`: shorten the route from collection entry to products and useful product facts.
6. `$impeccable optimize`: responsive assets, reduced motion, resilience and measured performance.
7. `$impeccable polish`: final German copy, spacing and visual consistency pass.

These passes can be requested individually or together. Re-run `$impeccable audit` after changes. The best next milestone is one complete, accessible and truthful shopping journey across desktop and mobile, rather than additional visual sections.
