# TARA

> A production-minded ecommerce prototype for a Germany-first cotton fashion brand.

[![Eleventy](https://img.shields.io/badge/Eleventy-3.1.5-222222?style=flat-square)](https://www.11ty.dev/)
![Nunjucks](https://img.shields.io/badge/Nunjucks-Templates-3D3633?style=flat-square)
![Frontend](https://img.shields.io/badge/Frontend-HTML%2FCSS%2FJS-C4A08A?style=flat-square)
![Focus](https://img.shields.io/badge/Focus-UX%20%2B%20Product%20Thinking-9BAF93?style=flat-square)
![Market](https://img.shields.io/badge/Market-Germany%20First-E8E0D8?style=flat-square)

This project is a polished storefront prototype for **TARA**, an accessible premium cotton clothing brand aimed at women aged 35-55 in the German market. It was built to simulate the level of craft, trust, and launch realism that a real fashion ecommerce experience needs: editorial storytelling, credible product merchandising, GDPR-aware UX, German legal surfaces, and a conversion-oriented product flow.

**Built by:** Deepak (`deepakpk-dev`)  
**GitHub:** [deepakpk-dev](https://github.com/deepakpk-dev)  
**LinkedIn:** [deepakpk](https://www.linkedin.com/in/deepakpk/)  
**Contact:** [deepakp.tvla@gmail.com](mailto:deepakp.tvla@gmail.com)

## Why This Project Is Strong Portfolio Material

- It combines **frontend execution** with **product judgment**, instead of stopping at a pretty mockup.
- It treats ecommerce as a real operating environment: trust, payments, legal pages, shipping copy, wishlist/cart behavior, and accessibility all matter.
- It shows the ability to translate **market research and ICP thinking** into interface decisions.
- It is structured as an Eleventy/Nunjucks codebase rather than a one-off static page, making it easier to extend or migrate into a real storefront.

## Recruiter Snapshot

| Area | Summary |
| --- | --- |
| Product Type | Fashion ecommerce prototype |
| Positioning | Accessible premium cotton brand for the German market |
| Stack | Eleventy 3, Nunjucks, vanilla JavaScript, CSS tokens |
| Key Behaviors | Cookie consent, cart drawer, wishlist persistence, legal pages, bilingual-ready structure |
| User Focus | Women 35-55, readability-first, editorial but conversion-aware |
| Outcome | A credible launch-simulation prototype, not just a visual concept |

## Demo Preview

The walkthrough video is not hosted yet. The README is ready for a clickable demo thumbnail once a final video URL is available.

## Visual Walkthrough

### Desktop homepage

![TARA desktop homepage](assets/screenshots/recruiter/tara-home-hero-desktop-clean.png)

### Collection browsing

![TARA collection page](assets/screenshots/recruiter/tara-collection-desktop-clean.png)

### Product detail flow

![TARA product detail page](assets/screenshots/recruiter/tara-product-detail-clean.png)

### Cart drawer interaction

![TARA cart drawer](assets/screenshots/recruiter/tara-cart-drawer-clean.png)

### Mobile experience

<img src="assets/screenshots/recruiter/tara-home-mobile-clean.png" alt="TARA mobile homepage" width="360" />

## What The Prototype Delivers

- **Editorial homepage experience** with brand positioning, capsule storytelling, and trust cues.
- **Collection browsing flow** designed around curated discovery rather than generic catalog clutter.
- **Product detail architecture** with shipping, returns, payments, sustainability, and fit context.
- **German legal and compliance surfaces** including Impressum, Datenschutz, AGB, and Widerruf.
- **Cookie consent behavior** that matches a GDPR-aware storefront prototype.
- **Cart and wishlist persistence** using `localStorage` to make interactions feel real during prototype review.
- **Bilingual-ready structure** for Germany-first UX with English support.

## Product And UX Decisions

- The brand is framed as **French Soft Elegance**: warm neutrals, editorial typography, quiet premium tone.
- The target customer is older than the usual fast-fashion audience, so readability, spacing, and restraint are intentional.
- The mobile experience favors a **bottom-tab pattern** over an invisible hamburger-first flow.
- The cart is modeled as a **drawer**, keeping product context intact instead of forcing hard page transitions.
- Sustainability is present as a **trust signal**, not performative messaging.
- The prototype intentionally includes launch-critical trust elements because German ecommerce customers research thoroughly before buying.

## Technical Highlights

- **Eleventy + Nunjucks architecture** for reusable layouts, includes, and generated multi-page output.
- **Token-based CSS system** with shared variables for color, spacing, typography, and component consistency.
- **Centralized data files** for site-wide business details and product catalog content.
- **Vanilla JavaScript interaction layer** for cookie consent, wishlist persistence, and cart drawer behavior.
- **Production-minded content model** that separates source templates in `website/src` from generated output in `website/dist`.

## Key Pages

- `/` homepage
- `/collection/` collection page
- `/product/` product detail page
- `/brand-story/` brand story page
- `/materials/` materials page
- `/size-guide/` size guide
- `/legal/impressum/`
- `/legal/datenschutz/`
- `/legal/agb/`
- `/legal/widerruf/`

## Project Structure

```text
cotton-project/
├── website/
│   ├── src/                 # Eleventy source templates, includes, and data
│   ├── dist/                # Generated static output
│   ├── css/                 # Design tokens, layout, component, and page styles
│   ├── js/                  # Frontend interaction logic
│   └── images/tara/         # Local brand and product imagery
├── docs/                    # QA, plans, and design/spec material
├── assets/screenshots/      # Recruiter-facing README screenshots
└── README.md
```

## Run Locally

```bash
cd website
npm install
npm run dev
```

Build the static site:

```bash
cd website
npm run build
```

The Eleventy dev server typically runs at `http://localhost:8080`.

## What I Would Do Next

- Replace fictional legal and business identity fields with real reviewed production content.
- Connect the prototype to a real commerce backend such as Shopify theme sections and AJAX cart flows.
- Add a hosted narrated walkthrough video and wire it into the README hero section.
- Run Lighthouse, accessibility, and cross-browser verification on the final deployed build.
- Add real product photography, inventory, size data, and operational shipping/returns tooling.

## Supporting Research

This repo also includes the strategic work behind the interface:

- [TARA_Market_Research_Report.md](TARA_Market_Research_Report.md)
- [European_Women_ICP_Research.md](European_Women_ICP_Research.md)
- [European_Cotton_Brands_Research.md](European_Cotton_Brands_Research.md)
- [docs/TARA_Launch_QA_Checklist.md](docs/TARA_Launch_QA_Checklist.md)

## Contact

If you are hiring for **frontend engineering**, **product-minded UI work**, or **prototype-to-production ecommerce execution**, reach me at [deepakp.tvla@gmail.com](mailto:deepakp.tvla@gmail.com), [LinkedIn](https://www.linkedin.com/in/deepakpk/), or [GitHub](https://github.com/deepakpk-dev).
