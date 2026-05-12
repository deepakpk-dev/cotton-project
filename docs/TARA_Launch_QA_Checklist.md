# TARA Launch QA Checklist

Date: 2026-05-11

This document exists to keep the case study honest. The prototype is strong portfolio material because it is explicit about what is implemented, what is simulated, and what would still be required before a real launch.

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

## Recruiter Notes

- The current repo demonstrates frontend craft, UX thinking, and product judgment.
- It does not claim to be a finished commerce stack.
- The fictional company data is intentional prototype scaffolding, not accidental placeholder content.
- The static cart, wishlist, and consent flows are there to make the review experience more realistic.

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
