# Production Readiness Audit

Status: Not production-ready yet.

This audit covers the current TARA static prototype in `website/` as of the `master` branch. It focuses on stability, security/privacy, performance, accessibility, and German ecommerce launch requirements.

## Critical Launch Blockers

- [ ] Replace placeholder legal entity data in `website/src/legal/impressum.njk`, `datenschutz.njk`, `agb.njk`, and `widerruf.njk`.
  - Current pages include sample values such as `TARA GmbH`, `Musterstraße`, sample registry data, and placeholder contacts.
  - These must be reviewed by the business/legal owner before launch.

- [ ] Replace remote Google Fonts with self-hosted font files.
  - `website/src/_layouts/base.njk` loads `fonts.googleapis.com` and `fonts.gstatic.com`.
  - For a Germany-first storefront, self-hosting reduces GDPR/privacy risk caused by visitor IP transfer to third-party font servers.

- [ ] Replace Unsplash hotlinked images with licensed, optimized production assets.
  - Current pages depend heavily on `images.unsplash.com`.
  - Production images should live in the project or Shopify CDN, use WebP/AVIF with fallback, fixed dimensions, and appropriate `loading`/`fetchpriority` values.

- [ ] Implement real product routing and product data.
  - Collection product cards currently link to the same `/product/` route.
  - Each SKU needs a real product detail page or Shopify product mapping before launch.

- [ ] Wire the add-to-cart action to real cart behavior.
  - `website/src/product.njk` has an `In den Warenkorb` button.
  - `website/js/main.js` does not currently handle `.product-info__add-to-cart`.

## Privacy And Security

- [ ] Consolidate cookie consent handling.
  - Consent logic appears in both `website/js/main.js` and `website/js/cookie.js`.
  - Keep one consent owner, add consent versioning, add reject-all behavior, and gate analytics/marketing scripts until opt-in.

- [ ] Remove inline event handlers.
  - Example: announcement close button in `website/src/_includes/header.njk` uses inline `onclick`.
  - Move behavior into `website/js/main.js` for CSP compatibility.

- [ ] Add a production Content Security Policy after external dependencies are removed.
  - Recommended after self-hosting fonts and images.
  - Start strict, then explicitly allow Shopify/payment/trust integrations as needed.

- [ ] Confirm no third-party marketing, analytics, review, or tracking scripts load before consent.

## Accessibility

- [ ] Fix global link contrast.
  - Current `--color-link` in `website/css/variables.css` is too low contrast on `--color-bg` for normal text.
  - Target WCAG AA contrast ratio of at least 4.5:1.

- [ ] Add visible `:focus-visible` styles for interactive controls.
  - Buttons, header actions, product cards, drawers, bottom nav, forms, and menu links need consistent keyboard focus indicators.

- [ ] Add `aria-expanded` and keyboard semantics for accordions, mobile menu, cart drawer, wishlist drawer, search overlay, and account menu.

- [ ] Add focus management for modal/drawer states.
  - Focus should move into opened overlays/drawers and return to the trigger on close.

- [ ] Respect reduced-motion preferences.
  - Add a `prefers-reduced-motion: reduce` block to disable smooth scroll and non-essential animations.

- [ ] Review small text sizes.
  - Several mobile labels/badges use font sizes below the stated minimum. Functional text should stay readable for the 35-55 audience.

## Performance

- [ ] Optimize hero images.
  - Current hero images are remote and large.
  - Production target: max 2400x1200, under 300 KB, dimensions set to prevent layout shift.

- [ ] Add image width/height attributes or CSS aspect-ratio reservations for all major product and hero images.

- [ ] Bundle/minify production CSS and JS or configure the hosting pipeline to do so.

- [ ] Run Lighthouse against the built site and target 90+ across Performance, Accessibility, Best Practices, and SEO.

- [ ] Run a real mobile viewport QA pass for text wrapping, tap targets, drawer behavior, and bottom navigation overlap.

## Ecommerce And German Market Requirements

- [ ] Ensure every visible product price includes `inkl. MwSt.` and shipping cost information near the buying decision.

- [ ] Add all required payment methods in production checkout: Klarna, PayPal, SEPA Lastschrift, Sofortüberweisung, Visa, Mastercard.

- [ ] Add DHL shipping details, free shipping threshold, estimated delivery dates, and free returns messaging consistently.

- [ ] Add Trusted Shops seal and verified purchase reviews after the production trust provider is selected.

- [ ] Add visible phone/contact support information.

- [ ] Add complete German and English content, not runtime text replacement only.
  - Current language toggle changes selected text nodes in the browser.
  - Production should use proper localized pages or Shopify multilingual content.

## Recommended Fix Order

1. Legal/entity and privacy dependencies: legal pages, self-host fonts, remove third-party image hotlinks.
2. Ecommerce correctness: product routes, real cart integration, checkout/payment mapping.
3. Consent and security hardening: single consent module, reject all, script gating, CSP.
4. Accessibility: contrast, focus states, drawer/accordion semantics, reduced motion.
5. Performance: optimized images, dimensions, Lighthouse fixes.
6. Final launch QA: desktop/mobile browser matrix, German native copy review, Shopify test orders.

## Verification Needed Before Launch

- [ ] `npm install` succeeds in `website/`.
- [ ] `npm run build` succeeds in `website/`.
- [ ] Lighthouse reports are captured for home, collection, product, and legal pages.
- [ ] Keyboard-only navigation passes for header, menu, search, cart, wishlist, product page, and cookie banner.
- [ ] Cookie banner records granular choices and blocks non-essential scripts until opt-in.
- [ ] Shopify test order passes for each payment method.
- [ ] Legal pages are approved by the business/legal owner.
