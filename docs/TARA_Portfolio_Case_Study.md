# TARA Portfolio Case Study

## Overview

TARA is a fictional cotton clothing ecommerce brand created as a frontend portfolio case study. I used it to demonstrate how I approach product framing, user trust, design systems, and implementation detail when building for a specific market instead of designing in the abstract.

The audience is women aged 35-55 in Germany. That decision was not cosmetic. It shaped readability, navigation, trust signals, legal visibility, payment expectations, and the overall tone of the interface.

## My Role

I owned the project end-to-end:

- Defined the brand direction and ecommerce positioning
- Synthesized the research into concrete UX decisions
- Designed the page structure and interaction model
- Implemented the frontend with Eleventy, Nunjucks, CSS variables, and vanilla JavaScript
- Added recruiter-facing documentation so the work is legible as a case study rather than just a repo dump

## The Problem I Chose To Solve

Many portfolio ecommerce projects stop at visual styling. I wanted this one to show a broader level of judgment:

- How does the interface establish trust for a German shopper?
- What changes when the target customer is not a trend-driven Gen Z audience?
- How do product, legal, and operational details affect the frontend?
- How do you preserve editorial elegance without making the experience vague or impractical?

## Important Decisions

### 1. Germany-first realism

I treated the prototype as a Germany-first storefront from the beginning. That meant including legal pages, `inkl. MwSt.` pricing context, shipping-cost references, expected payment methods, DHL shipping language, and a GDPR-aware consent pattern.

### 2. Readability over trendiness

The target audience pushed me toward larger body text, clearer spacing, quieter layouts, and visible navigation. This is one of the strongest examples in the repo of user context changing design decisions.

### 3. Editorial tone with ecommerce discipline

The brand needed to feel elevated and soft, but still usable. I used editorial storytelling and lifestyle framing while keeping the product architecture grounded in fit, care, payment, returns, materials, and trust signals.

### 4. Production-minded frontend structure

Instead of building a single static mockup, I used reusable templates, shared data files, and a token-based styling system. That made the prototype easier to maintain and also made the repo a stronger signal of implementation quality.

### 5. Honest prototype boundaries

I kept the repo explicit about what is real versus simulated. Legal identity data is fictional. Cart and consent behaviors are prototype implementations. Shopify and checkout integrations are not wired yet. That honesty matters in a portfolio repo because credibility matters more than overclaiming.

## What This Repo Demonstrates About Me

- I can translate research and positioning into UI decisions
- I think about frontend work as part of a product system, not just a visual layer
- I care about trust, compliance, and operational realism where they affect user experience
- I can package work so another person can quickly understand both the artifact and the reasoning behind it

## Technical Summary

| Area | Details |
| --- | --- |
| Static site generator | Eleventy 3 |
| Templating | Nunjucks |
| Styling | Token-based CSS with shared variables |
| Interaction layer | Vanilla JavaScript |
| Data modeling | Centralized files in `website/src/_data` |
| Primary pages | Homepage, collection, product, brand story, materials, size guide, legal pages |

## If I Extended This Further

- Migrate the prototype into Shopify theme architecture
- Replace frontend-only cart behavior with real commerce integrations
- Add real bilingual content workflows
- Run Lighthouse and accessibility audits on the deployed build
- Add a short recorded walkthrough so hiring teams can review the project in under two minutes

## Where To Look

- [README.md](C:/Users/revat/OneDrive/Desktop/Agentic engineering/Cotton Project/README.md)
- [website/src/index.njk](C:/Users/revat/OneDrive/Desktop/Agentic engineering/Cotton Project/website/src/index.njk)
- [website/src/product.njk](C:/Users/revat/OneDrive/Desktop/Agentic engineering/Cotton Project/website/src/product.njk)
- [website/src/_data/site.js](C:/Users/revat/OneDrive/Desktop/Agentic engineering/Cotton Project/website/src/_data/site.js)
- [docs/TARA_Launch_QA_Checklist.md](C:/Users/revat/OneDrive/Desktop/Agentic engineering/Cotton Project/docs/TARA_Launch_QA_Checklist.md)
