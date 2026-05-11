# TARA Production Readiness Design

Date: 2026-05-11
Status: Approved for implementation

## Goal

Make the TARA static ecommerce prototype credible as a Germany-first production launch simulation. The site should feel launch-grade for brand review, investor review, and Shopify handoff planning, while clearly documenting the fields and integrations that must be replaced before a real commercial launch.

The implementation targets the existing Eleventy prototype in `website/`. It does not build a real Shopify checkout, customer account system, payment gateway, analytics pipeline, or legally reviewed compliance package.

## Scope

The production-readiness pass will cover:

- Local AI-generated imagery for the TARA brand, replacing remote Unsplash dependencies in maintained templates.
- German-market ecommerce trust requirements: tax/shipping disclosure, DHL shipping, free returns, payment options, and visible contact details.
- Legal pages with fictional but realistic German company details, centralized so the user can replace them later.
- GDPR-style cookie consent with granular essential, analytics, and marketing categories.
- Static ecommerce UX polish: cart drawer, wishlist, product detail confidence signals, footer/header links, and mobile navigation.
- Technical launch quality: clean build, SEO metadata, accessibility improvements, image path hygiene, and launch QA documentation.

Out of scope:

- Real payment processing.
- Real Shopify theme implementation.
- Real customer authentication.
- Real inventory or fulfillment integration.
- Final legal approval for Germany.
- Real product photography.

## Architecture

The maintained source of truth is `website/src`, with Eleventy generating `website/dist`. Root-level legacy HTML files may remain as references unless implementation discovers they are still actively used.

Add shared data under `website/src/_data/` for:

- Fictional business/legal details.
- Product and collection data.
- Shipping, payment, returns, and trust constants.
- Local image paths and alt text.

Templates should consume shared data instead of duplicating product and trust content where practical. This is especially important for the collection grid, featured product cards, legal contact details, footer contact details, and payment/shipping messaging.

Generated brand assets should live under `website/images/tara/` with descriptive names. Templates must reference those local assets rather than remote image URLs.

CSS changes must respect the project design system. New styling should use CSS variables from `website/css/variables.css`; if a new token is required, add it there with a meaningful name. Do not introduce hardcoded `#FFFFFF` or `#000000`.

## Page And UX Design

### Homepage

Replace stock images with local TARA imagery. Strengthen the trust strip with German-market reassurance: organic cotton, OEKO-TEX or certification-style trust language, DHL/free shipping threshold, and free returns. Resolve placeholder links where target pages exist. Keep sustainability subtle and supportive rather than activist.

### Collection

Represent the `Lumiere Douce` capsule as a coherent 18-piece collection. Product cards should have consistent data, local images, price display with `inkl. MwSt.`, and shipping-cost context. Filtering and sorting can remain static affordances if full data-driven filtering is too large for this pass, but they should not feel broken.

### Product

The product page should include a credible gallery using local images, price disclosure, model-size reference, size selector, material and care details, sustainability details, DHL shipping, free returns, and payment options including Klarna, PayPal, SEPA, Sofort, Visa, and Mastercard. Add-to-cart should open or update the static cart drawer without redirecting.

### Legal And Trust

Complete the legal pages using fictional German business data for a fictional `TARA GmbH`. The launch QA checklist must clearly state that these details are fictional and must be replaced before real launch.

Required legal pages:

- Impressum
- Datenschutzerklaerung
- AGB
- Widerrufsbelehrung with model withdrawal form

Footer and contact surfaces should expose phone and email. The site should show payment, shipping, returns, and trust signals in normal shopping flows.

### Cookie Consent

Keep essential cookies always active. Analytics and marketing must remain opt-in and should not be treated as enabled until the user accepts those categories. The footer should provide a way to reopen cookie settings. Avoid duplicate consent storage keys.

### Header, Footer, Mobile

Preserve the sticky header and mobile bottom tab navigation. Remove dead `#` links where a real page exists, and use credible disabled/static behavior only where the feature is intentionally simulated. Improve keyboard and focus behavior for drawers, overlays, account menu, cookie banner, and product controls where feasible.

## Image Plan

Use ChatGPT Image 2 through the available image generation workflow for project-bound assets. Save selected assets into `website/images/tara/` before referencing them from templates.

Planned assets:

- One landscape hero image for `Lumiere Douce`.
- Five editorial/lookbook images: blouse and trouser outfit, wrap dress lifestyle, cotton texture detail, atelier or materials scene, and capsule wardrobe rail.
- Product-card imagery for the collection. If generation time is limited, create a smaller coherent set and reuse intentionally across the capsule rather than mixing in stock imagery.
- Social proof imagery or cropped variants derived from the lookbook set.

Prompt constraints:

- Women aged 35-55.
- Warm natural light.
- Relaxed poses and natural cotton texture.
- French Soft Elegance, accessible premium, understated.
- Cream, rose, sage, terracotta, and warm neutral palette.
- No visible logos, no text, no watermark.
- No fast-fashion styling or exaggerated editorial poses.

Prefer WebP final assets if conversion tooling is available. Otherwise, keep generated PNG or JPEG files in the project and document optimization as a launch task.

## Quality And Verification

Implementation must verify:

- `npm run build` passes from `website`.
- Maintained templates no longer reference remote Unsplash imagery.
- No obvious unresolved placeholder links remain in primary launch flows.
- No hardcoded forbidden `#FFFFFF` or `#000000` are introduced in maintained CSS/templates.
- Product images have useful German alt text.
- Body text remains at least 16px where user-facing body copy appears.
- Cookie consent persists and can be reopened.
- Cart drawer remains a drawer and does not redirect to a cart page.
- Core pages render from the Eleventy build.

Add `docs/TARA_Launch_QA_Checklist.md` documenting:

- Fictional legal/business fields that must be replaced.
- Real integrations still required before launch.
- Image optimization and real photography requirements.
- Legal review requirement for Germany.
- Shopify migration notes.

## Residual Risks

The result is a high-quality static production simulation, not a live ecommerce launch. Fictional legal details, AI-generated product imagery, and simulated checkout/account behavior must all be replaced or validated before selling to customers.
