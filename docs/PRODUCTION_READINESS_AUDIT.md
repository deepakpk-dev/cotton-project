# TARA Production Readiness Audit

_Last updated: 2026-05-11_

## Executive summary

The current site is a strong static prototype, but it is **not ready for public production launch**. The largest launch blockers are not implementation details that should be guessed in code: they require confirmed business, legal, ecommerce, privacy, and asset-licensing inputs.

This audit records the required decisions and implementation work so the project can move toward production without inventing legal entity data, product data, payment setup, or consent requirements.

## Current state

- Static Eleventy storefront prototype for the TARA cotton clothing brand.
- Core pages are present: homepage, collection, product, brand story, materials, size guide, and four legal-page placeholders.
- Cookie banner UI exists with essential, analytics, and marketing categories.
- Product/catalog content and imagery are prototype content.
- No Shopify/cart/payment integration is connected yet.

## Production launch blockers

### 1. Legal entity and German compliance data

**Status:** Blocked by business/legal input.

The legal pages currently contain placeholder company details. Before launch, replace all placeholder data with verified legal information reviewed by qualified counsel.

Required inputs:

- Registered legal entity name.
- Registered business address.
- Managing director or legally responsible representative.
- Commercial register number and court, if applicable.
- VAT ID, if applicable.
- Customer-service email and phone number.
- Final decisions for dispute-resolution participation text.
- Legal review of Impressum, Datenschutz, AGB, and Widerruf content.

Do **not** ship with sample names, sample addresses, sample register IDs, or sample VAT IDs.

### 2. Privacy, cookies, analytics, and fonts

**Status:** Blocked by privacy/legal decisions.

The prototype currently presents consent categories, but production privacy behavior depends on the actual services enabled.

Required inputs:

- Analytics provider decision, if any.
- Marketing/ad pixels decision, if any.
- Newsletter provider decision.
- Shopify app list and their cookie/tracking behavior.
- Font-hosting decision: externally hosted web fonts vs. locally hosted/self-hosted fonts.
- Data-processing agreements for all processors.
- Final cookie category mapping and consent-retention policy.

Implementation requirements:

- No analytics or marketing scripts should load before explicit consent.
- Datenschutzerklärung must accurately list every processor/service used in production.
- Cookie settings must remain accessible from the footer after initial consent.

### 3. Product catalog and pricing

**Status:** Blocked by merchandising/product input.

The product catalog uses prototype product names, descriptions, prices, colors, and imagery. Production requires a finalized source of truth.

Required inputs:

- Production SKU list.
- Product names and German descriptions.
- Variant matrix: sizes, colors, inventory, materials.
- Final prices including VAT handling.
- Shipping-cost copy and thresholds.
- Model sizing notes per product.
- Material/care details per product.
- Certifications that may be claimed, with documentation.

Implementation requirements:

- Product pages must display accurate VAT and shipping-cost notices.
- Any sustainability/certification claims must be backed by documentation.
- Product structured data should not be added until production product data is final.

### 4. Ecommerce, cart, checkout, payments, and transactional flows

**Status:** Blocked by platform/payment setup.

The static cart drawer is a prototype interaction and does not complete purchases.

Required inputs:

- Confirmed Shopify store/theme architecture.
- Cart and checkout routing.
- Payment methods enabled for Germany, such as PayPal, Klarna, card payments, and SEPA where applicable.
- Tax setup and invoice requirements.
- Shipping zones, rates, carriers, and estimated delivery-copy rules.
- Return flow and support process.
- Transactional email templates.

Implementation requirements:

- Cart actions must connect to the real ecommerce backend before launch.
- Checkout must be tested end to end in test mode and production mode.
- Payment badges should only show enabled payment methods.

### 5. Imagery and licensing

**Status:** Blocked by brand/creative input.

The prototype uses external placeholder imagery. Production must use licensed, brand-approved assets.

Required inputs:

- Licensed product photography.
- Model releases where applicable.
- Usage rights for editorial, product, email, and paid-media contexts.
- Image alt text reviewed against final imagery.
- Asset optimization requirements and responsive image sizes.

Implementation requirements:

- Replace placeholder/stock image URLs before launch.
- Host optimized production assets under approved hosting/CDN.
- Avoid claims implied by imagery that do not match the actual product.

### 6. Accessibility, performance, and QA

**Status:** Requires implementation QA after production content is available.

Required checks:

- Keyboard navigation through header, overlays, drawers, cookie banner, product options, and forms.
- Screen-reader labels for interactive controls.
- Color contrast across all production content and imagery overlays.
- Mobile navigation usability on target devices.
- Lighthouse or equivalent performance/accessibility checks.
- Broken-link checks after final URLs are known.
- Cross-browser testing on current Chrome, Safari, Firefox, and mobile Safari/Chrome.

## Pre-launch checklist

### Business/legal

- [ ] Confirm legal entity details.
- [ ] Replace all placeholder legal data.
- [ ] Complete qualified legal review of Impressum, Datenschutz, AGB, and Widerruf.
- [ ] Confirm VAT, shipping, returns, and dispute-resolution copy.
- [ ] Confirm customer-service channels and response ownership.

### Privacy/consent

- [ ] Decide analytics provider or confirm no analytics.
- [ ] Decide marketing pixels or confirm none.
- [ ] Decide newsletter provider.
- [ ] Document all processors and data-transfer details.
- [ ] Ensure non-essential scripts load only after consent.
- [ ] Verify footer cookie-settings link works after consent is saved.

### Ecommerce

- [ ] Confirm Shopify store architecture.
- [ ] Connect real cart behavior.
- [ ] Configure payment methods.
- [ ] Test checkout with each payment method.
- [ ] Configure shipping rates and return flow.
- [ ] Verify transactional emails.

### Content/catalog

- [ ] Finalize SKU list and variants.
- [ ] Replace prototype descriptions and prices.
- [ ] Add accurate material/care and model sizing details.
- [ ] Verify every sustainability or certification claim.
- [ ] Review German copy for tone and clarity.

### Assets

- [ ] Replace all placeholder imagery.
- [ ] Verify licenses and model releases.
- [ ] Optimize responsive image sizes.
- [ ] Review alt text against final images.

### Technical QA

- [ ] Run production build.
- [ ] Run accessibility checks.
- [ ] Run link checks.
- [ ] Test mobile and desktop viewports.
- [ ] Test overlays/drawers/forms with keyboard only.
- [ ] Verify no console errors in production build.

## Recommended next implementation sequence

1. Collect verified business/legal/privacy decisions.
2. Replace legal-page placeholder content only after legal review.
3. Decide production ecommerce architecture and wire cart/checkout to Shopify.
4. Replace prototype catalog with production product data.
5. Replace all placeholder imagery with licensed assets.
6. Add consent-gated analytics/marketing scripts only after vendor decisions are final.
7. Run full accessibility, performance, browser, and checkout QA.

## Non-goals for this audit

- This document is not legal advice.
- This document does not certify GDPR, German ecommerce, tax, or consumer-law compliance.
- This document does not approve the current prototype for production launch.
- This document intentionally avoids inventing legal, business, payment, or product details.
