# TARA Prototype Completion — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Convert the existing static HTML prototype in `website/` into a fully navigable 11ty/Nunjucks site with 9 pages (3 migrated, 6 new), GDPR cookie consent, and wired navigation.

**Architecture:** 11ty (Eleventy) with Nunjucks templates. All pages extend a shared `base.njk` layout that includes header, footer, overlay, and cookie-banner partials. CSS/JS files stay in `website/css/` and `website/js/` and are passthrough-copied by 11ty to `website/dist/`. The dev server runs at `http://localhost:8080`.

**Tech Stack:** `@11ty/eleventy ^3`, Nunjucks templates, existing CSS custom properties in `website/css/variables.css`, vanilla JS.

---

## File Map

**Create (new):**
- `website/package.json`
- `website/.eleventy.js`
- `website/.gitignore`
- `website/css/cookie.css`
- `website/js/cookie.js`
- `website/src/_layouts/base.njk`
- `website/src/_includes/header.njk`
- `website/src/_includes/footer.njk`
- `website/src/_includes/search-overlay.njk`
- `website/src/_includes/wishlist-drawer.njk`
- `website/src/_includes/cart-drawer.njk`
- `website/src/_includes/cookie-banner.njk`
- `website/src/index.njk`
- `website/src/collection.njk`
- `website/src/product.njk`
- `website/src/brand-story.njk`
- `website/src/materials.njk`
- `website/src/size-guide.njk`
- `website/src/legal/impressum.njk`
- `website/src/legal/datenschutz.njk`
- `website/src/legal/agb.njk`
- `website/src/legal/widerruf.njk`

**Modify (existing):**
- `website/css/pages.css` — append new editorial + legal page styles

---

## Task 1: 11ty Project Setup

**Files:**
- Create: `website/package.json`
- Create: `website/.eleventy.js`
- Create: `website/.gitignore`

- [ ] **Step 1: Create `website/package.json`**

```json
{
  "name": "tara-website",
  "version": "1.0.0",
  "description": "TARA cotton clothing brand website",
  "scripts": {
    "dev": "eleventy --serve",
    "build": "eleventy"
  },
  "devDependencies": {
    "@11ty/eleventy": "^3.0.0"
  }
}
```

- [ ] **Step 2: Create `website/.eleventy.js`**

```js
module.exports = function(eleventyConfig) {
  eleventyConfig.addPassthroughCopy({"css": "css"});
  eleventyConfig.addPassthroughCopy({"js": "js"});

  return {
    dir: {
      input: "src",
      output: "dist",
      layouts: "_layouts",
      includes: "_includes"
    }
  };
};
```

- [ ] **Step 3: Create `website/.gitignore`**

```
node_modules/
dist/
```

- [ ] **Step 4: Install dependencies**

```bash
cd website
npm install
```

Expected: `node_modules/` created, no errors.

- [ ] **Step 5: Verify build runs on an empty src**

```bash
mkdir -p website/src
cd website && npm run build
```

Expected: `dist/` created (may be empty), no errors.

- [ ] **Step 6: Commit**

```bash
git add website/package.json website/.eleventy.js website/.gitignore website/package-lock.json
git commit -m "feat: add 11ty project setup"
```

---

## Task 2: Cookie CSS

**Files:**
- Create: `website/css/cookie.css`

- [ ] **Step 1: Create `website/css/cookie.css`**

```css
/* ============================================
   TARA — Cookie Consent Banner
   ============================================ */

.cookie-banner {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  background: var(--color-bg);
  border-top: 1px solid var(--color-border);
  padding: var(--space-md) var(--space-lg);
  z-index: var(--z-modal);
  transform: translateY(100%);
  transition: transform var(--transition-slow);
  box-shadow: 0 -4px 24px rgba(44, 34, 32, 0.08);
}

.cookie-banner.is-visible {
  transform: translateY(0);
}

.cookie-banner__inner {
  max-width: 960px;
  margin: 0 auto;
  display: grid;
  grid-template-columns: 1fr auto;
  gap: var(--space-lg);
  align-items: start;
}

.cookie-banner__body {
  display: flex;
  flex-direction: column;
  gap: var(--space-sm);
}

.cookie-banner__title {
  font-family: var(--font-heading);
  font-size: 1.25rem;
  font-weight: var(--weight-medium);
  color: var(--color-heading);
}

.cookie-banner__text {
  font-size: var(--text-caption);
  color: var(--color-text);
  line-height: 1.6;
}

.cookie-banner__text a {
  color: var(--color-link);
  text-decoration: underline;
}

.cookie-banner__categories {
  display: flex;
  gap: var(--space-lg);
  flex-wrap: wrap;
}

.cookie-banner__category {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.cookie-banner__category label {
  display: flex;
  align-items: center;
  gap: var(--space-xs);
  font-size: var(--text-caption);
  font-weight: var(--weight-medium);
  cursor: pointer;
  color: var(--color-text);
}

.cookie-banner__category label input[type="checkbox"] {
  width: 16px;
  height: 16px;
  accent-color: var(--color-accent);
  cursor: pointer;
}

.cookie-banner__category label input[disabled] {
  cursor: not-allowed;
  opacity: 0.5;
}

.cookie-banner__category p {
  font-size: var(--text-small);
  color: var(--color-text);
  opacity: 0.6;
  padding-left: 24px;
}

.cookie-banner__actions {
  display: flex;
  flex-direction: column;
  gap: var(--space-xs);
  align-self: center;
  min-width: 180px;
}

.cookie-banner__actions .btn {
  padding: 0.625rem 1.25rem;
  font-size: var(--text-small);
  white-space: nowrap;
}

@media (max-width: 768px) {
  .cookie-banner {
    padding: var(--space-md);
  }

  .cookie-banner__inner {
    grid-template-columns: 1fr;
    gap: var(--space-md);
  }

  .cookie-banner__categories {
    flex-direction: column;
    gap: var(--space-sm);
  }

  .cookie-banner__actions {
    flex-direction: row;
    min-width: unset;
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add website/css/cookie.css
git commit -m "feat: add cookie consent banner CSS"
```

---

## Task 3: Cookie JS

**Files:**
- Create: `website/js/cookie.js`

- [ ] **Step 1: Create `website/js/cookie.js`**

```js
/* ============================================
   TARA — Cookie Consent
   ============================================ */

const CONSENT_KEY = 'tara_cookie_consent';

function getConsent() {
  try {
    return JSON.parse(localStorage.getItem(CONSENT_KEY));
  } catch {
    return null;
  }
}

function saveConsent(analytics, marketing) {
  const consent = {
    essential: true,
    analytics: analytics,
    marketing: marketing,
    timestamp: Date.now()
  };
  localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
  hideBanner();
}

function hideBanner() {
  const banner = document.getElementById('cookieBanner');
  if (banner) banner.classList.remove('is-visible');
}

function showBanner() {
  const banner = document.getElementById('cookieBanner');
  if (banner) banner.classList.add('is-visible');
}

document.addEventListener('DOMContentLoaded', function() {
  if (!getConsent()) {
    showBanner();
  }

  document.getElementById('cookieAcceptAll')?.addEventListener('click', function() {
    saveConsent(true, true);
  });

  document.getElementById('cookieSaveSelection')?.addEventListener('click', function() {
    const analytics = document.getElementById('cookieAnalytics')?.checked ?? false;
    const marketing = document.getElementById('cookieMarketing')?.checked ?? false;
    saveConsent(analytics, marketing);
  });

  document.getElementById('cookieSettingsLink')?.addEventListener('click', function(e) {
    e.preventDefault();
    showBanner();
  });
});
```

- [ ] **Step 2: Commit**

```bash
git add website/js/cookie.js
git commit -m "feat: add cookie consent JS logic"
```

---

## Task 4: New Page CSS

**Files:**
- Modify: `website/css/pages.css` — append at end of file

- [ ] **Step 1: Append new page styles to `website/css/pages.css`**

Add these styles at the very end of the existing `website/css/pages.css` file:

```css

/* ============================================
   New Editorial Pages
   ============================================ */

/* ---- Page Hero (brand-story, materials, size-guide) ---- */
.page-hero {
  position: relative;
  height: 60vh;
  min-height: 400px;
  overflow: hidden;
  display: flex;
  align-items: flex-end;
}

.page-hero__img {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.page-hero__overlay {
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(44,34,32,0.55) 0%, rgba(44,34,32,0.1) 60%, transparent 100%);
}

.page-hero__content {
  position: relative;
  padding: var(--space-2xl) var(--space-lg);
  color: #FAF7F2;
  max-width: var(--content-width);
  width: 100%;
  margin: 0 auto;
}

.page-hero__content h1 {
  font-family: var(--font-heading);
  font-size: var(--text-h1);
  font-weight: var(--weight-light);
  letter-spacing: 0.15em;
  text-transform: uppercase;
  color: #FAF7F2;
  margin-bottom: var(--space-xs);
}

.page-hero__content p {
  font-size: var(--text-body);
  opacity: 0.85;
  font-style: italic;
  font-family: var(--font-heading);
}

/* ---- Pillars Grid (brand-story why-cotton) ---- */
.pillars-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-lg);
  margin-top: var(--space-xl);
}

.pillar {
  text-align: center;
  padding: var(--space-lg);
}

.pillar__icon {
  width: 48px;
  height: 48px;
  margin: 0 auto var(--space-sm);
  color: var(--color-accent);
}

.pillar__icon svg {
  width: 100%;
  height: 100%;
  stroke-width: 1.5;
}

.pillar h3 {
  font-family: var(--font-heading);
  font-size: 1.375rem;
  font-weight: var(--weight-medium);
  color: var(--color-heading);
  margin-bottom: var(--space-xs);
}

.pillar p {
  font-size: var(--text-body);
  line-height: 1.7;
  color: var(--color-text);
  opacity: 0.8;
}

/* ---- Values Grid (brand-story values) ---- */
.values-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-md);
  margin-top: var(--space-xl);
}

.value-card {
  padding: var(--space-lg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-bg);
}

.value-card h3 {
  font-family: var(--font-heading);
  font-size: 1.25rem;
  color: var(--color-heading);
  margin-bottom: var(--space-xs);
}

.value-card p {
  font-size: var(--text-body);
  line-height: 1.7;
  opacity: 0.8;
}

/* ---- Certifications (materials page) ---- */
.certs-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-md);
  margin-top: var(--space-xl);
}

.cert-card {
  display: flex;
  align-items: flex-start;
  gap: var(--space-md);
  padding: var(--space-lg);
  border: 1px solid var(--color-sage);
  border-radius: var(--radius-md);
  background: rgba(155, 175, 147, 0.06);
}

.cert-card__badge {
  font-family: var(--font-heading);
  font-size: 1.5rem;
  font-weight: var(--weight-medium);
  color: var(--color-sage);
  white-space: nowrap;
  min-width: 80px;
}

.cert-card h3 {
  font-family: var(--font-heading);
  font-size: 1.1rem;
  color: var(--color-heading);
  margin-bottom: 0.25rem;
}

.cert-card p {
  font-size: var(--text-caption);
  line-height: 1.6;
  opacity: 0.8;
}

/* ---- Fabric Care Grid (materials page) ---- */
.care-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: var(--space-md);
  margin-top: var(--space-xl);
}

.care-card {
  padding: var(--space-md);
  background: var(--color-bg-secondary);
  border-radius: var(--radius-md);
  text-align: center;
}

.care-card__symbol {
  font-size: 2rem;
  margin-bottom: var(--space-xs);
}

.care-card h4 {
  font-family: var(--font-heading);
  font-size: 1rem;
  color: var(--color-heading);
  margin-bottom: 0.25rem;
}

.care-card p {
  font-size: var(--text-small);
  line-height: 1.5;
  opacity: 0.75;
}

/* ---- Size Guide ---- */
.size-guide-intro {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--space-2xl);
  align-items: start;
}

.measure-steps {
  display: flex;
  flex-direction: column;
  gap: var(--space-md);
  margin-top: var(--space-lg);
}

.measure-step {
  display: flex;
  gap: var(--space-md);
  align-items: flex-start;
}

.measure-step__number {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  background: var(--color-accent);
  color: #FAF7F2;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: var(--text-caption);
  font-family: var(--font-heading);
  flex-shrink: 0;
}

.measure-step h4 {
  font-family: var(--font-heading);
  font-size: 1.1rem;
  color: var(--color-heading);
  margin-bottom: 0.25rem;
}

.measure-step p {
  font-size: var(--text-caption);
  opacity: 0.8;
}

.size-diagram {
  width: 100%;
  max-width: 280px;
  border-radius: var(--radius-md);
  overflow: hidden;
}

.size-diagram img {
  width: 100%;
  height: auto;
  display: block;
}

.size-table-wrap {
  overflow-x: auto;
  margin-top: var(--space-xl);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
}

.size-table {
  width: 100%;
  border-collapse: collapse;
  font-size: var(--text-caption);
}

.size-table th {
  background: var(--color-heading);
  color: #FAF7F2;
  padding: var(--space-sm) var(--space-md);
  text-align: left;
  font-family: var(--font-body);
  font-weight: var(--weight-medium);
  text-transform: uppercase;
  letter-spacing: 0.08em;
  font-size: var(--text-small);
}

.size-table td {
  padding: var(--space-sm) var(--space-md);
  border-bottom: 1px solid var(--color-border);
  color: var(--color-text);
}

.size-table tbody tr:last-child td {
  border-bottom: none;
}

.size-table tbody tr:hover td {
  background: rgba(196, 160, 138, 0.06);
}

.size-table td:first-child {
  font-weight: var(--weight-medium);
  color: var(--color-heading);
}

.model-reference {
  margin-top: var(--space-lg);
  padding: var(--space-md) var(--space-lg);
  background: var(--color-bg-secondary);
  border-left: 3px solid var(--color-accent);
  border-radius: 0 var(--radius-sm) var(--radius-sm) 0;
  font-size: var(--text-body);
  font-style: italic;
  font-family: var(--font-heading);
  color: var(--color-heading);
}

/* ---- Legal Pages ---- */
.legal-page {
  padding: var(--space-3xl) 0;
}

.legal-content {
  max-width: var(--reading-width);
  margin: 0 auto;
}

.legal-content h1 {
  font-family: var(--font-heading);
  font-size: var(--text-h2);
  font-weight: var(--weight-light);
  letter-spacing: 0.08em;
  color: var(--color-heading);
  margin-bottom: var(--space-xl);
  padding-bottom: var(--space-md);
  border-bottom: 1px solid var(--color-border);
}

.legal-content h2 {
  font-family: var(--font-heading);
  font-size: var(--text-h3);
  font-weight: var(--weight-medium);
  color: var(--color-heading);
  margin: var(--space-xl) 0 var(--space-sm);
}

.legal-content h3 {
  font-family: var(--font-body);
  font-size: var(--text-body);
  font-weight: var(--weight-medium);
  color: var(--color-heading);
  margin: var(--space-md) 0 var(--space-xs);
}

.legal-content p {
  font-size: var(--text-body);
  line-height: 1.75;
  color: var(--color-text);
  margin-bottom: var(--space-sm);
}

.legal-content ul,
.legal-content ol {
  padding-left: var(--space-md);
  margin-bottom: var(--space-sm);
}

.legal-content li {
  font-size: var(--text-body);
  line-height: 1.75;
  color: var(--color-text);
  margin-bottom: 0.25rem;
}

.legal-content a {
  color: var(--color-link);
  text-decoration: underline;
}

.legal-widerruf-form {
  margin-top: var(--space-lg);
  padding: var(--space-lg);
  border: 1px solid var(--color-border);
  border-radius: var(--radius-md);
  background: var(--color-bg);
}

/* ---- Responsive: new pages ---- */
@media (max-width: 768px) {
  .pillars-grid {
    grid-template-columns: 1fr;
  }

  .values-grid {
    grid-template-columns: 1fr;
  }

  .certs-grid {
    grid-template-columns: 1fr;
  }

  .care-grid {
    grid-template-columns: 1fr 1fr;
  }

  .size-guide-intro {
    grid-template-columns: 1fr;
  }

  .page-hero {
    height: 50vh;
  }

  .page-hero__content h1 {
    font-size: clamp(1.75rem, 8vw, 2.5rem);
  }
}
```

- [ ] **Step 2: Commit**

```bash
git add website/css/pages.css
git commit -m "feat: add editorial and legal page CSS"
```

---

## Task 5: Header Partial

**Files:**
- Create: `website/src/_includes/header.njk`

The content comes from `website/index.html` lines 29–163 (announcement bar + header + mobile menu), with all `href` values updated to root-relative paths.

- [ ] **Step 1: Create `website/src/_includes/header.njk`**

```html
<!-- ==========================================
     ANNOUNCEMENT BAR
     ========================================== -->
<div class="announcement-bar" id="announcementBar">
  <span>Kostenloser Versand ab 75&euro; &nbsp;&bull;&nbsp; Frühling/Sommer Kollektion 2026 jetzt entdecken</span>
  <button class="announcement-bar__close" aria-label="Schließen" onclick="this.parentElement.style.display='none'">
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
  </button>
</div>

<!-- ==========================================
     HEADER / NAVIGATION
     ========================================== -->
<header class="header" id="header">
  <div class="header__inner">
    <div class="header__left">
      <button class="header__menu-toggle" id="menuToggle" aria-label="Menü öffnen">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round"><line x1="3" y1="6" x2="21" y2="6"/><line x1="3" y1="12" x2="21" y2="12"/><line x1="3" y1="18" x2="21" y2="18"/></svg>
      </button>
      <nav class="header__nav" aria-label="Hauptnavigation">
        <div class="header__nav-item">
          <a href="/collection/" class="header__nav-link">Kollektionen</a>
          <div class="mega-menu">
            <div class="mega-menu__inner">
              <div class="mega-menu__column">
                <h4>Aktuell</h4>
                <a href="/collection/">Frühling/Sommer 2026</a>
                <a href="/collection/">Essentials</a>
                <a href="/collection/">Neu eingetroffen</a>
              </div>
              <div class="mega-menu__column">
                <h4>Kategorie</h4>
                <a href="/collection/">Kleider</a>
                <a href="/collection/">Blusen &amp; Tops</a>
                <a href="/collection/">Hosen</a>
                <a href="/collection/">Strickwaren</a>
                <a href="/collection/">Alle ansehen</a>
              </div>
              <div class="mega-menu__column">
                <h4>Highlights</h4>
                <a href="/collection/">Bestseller</a>
                <a href="/collection/">Capsule Garderobe</a>
                <a href="/collection/">Leinen &amp; Baumwolle</a>
              </div>
              <div class="mega-menu__image">
                <img src="https://images.unsplash.com/photo-1594938298603-c8148c4dae35?w=400&h=500&fit=crop&crop=faces" alt="TARA Kollektion" loading="lazy">
              </div>
            </div>
          </div>
        </div>
        <a href="/materials/" class="header__nav-link">Materialien</a>
        <a href="/collection/" class="header__nav-link">Lookbook</a>
      </nav>
    </div>

    <div class="header__logo">
      <a href="/">TARA</a>
    </div>

    <div class="header__actions">
      <div class="header__lang-toggle">
        <a href="#" class="active">DE</a>
        <span style="opacity:0.3">|</span>
        <a href="#">EN</a>
      </div>

      <button class="header__action-btn" id="searchToggle" aria-label="Suchen">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
      </button>

      <div class="account-menu">
        <button class="header__action-btn" id="accountToggle" aria-label="Konto" aria-expanded="false">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
        </button>
        <div class="account-dropdown" id="accountDropdown" role="menu">
          <a href="#" class="account-dropdown__item" role="menuitem">Anmelden</a>
          <a href="#" class="account-dropdown__item" role="menuitem">Konto erstellen</a>
          <div class="account-dropdown__divider"></div>
          <a href="#" class="account-dropdown__item" role="menuitem">Bestellungen</a>
          <a href="#" class="account-dropdown__item" role="menuitem">Wunschliste</a>
        </div>
      </div>

      <button class="header__action-btn" id="wishlistToggle" aria-label="Wunschliste">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
      </button>

      <button class="header__action-btn" id="cartToggle" aria-label="Warenkorb">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
        <span class="header__cart-count">0</span>
      </button>
    </div>
  </div>
</header>

<!-- ==========================================
     MOBILE MENU
     ========================================== -->
<div class="mobile-menu" id="mobileMenu">
  <div class="mobile-menu__header">
    <span class="mobile-menu__brand">TARA</span>
    <button class="mobile-menu__close" id="mobileMenuClose" aria-label="Menü schließen">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </button>
  </div>
  <div class="mobile-menu__links">
    <a href="/collection/" class="mobile-menu__link">
      Kollektionen
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round"><polyline points="9 18 15 12 9 6"/></svg>
    </a>
    <a href="/materials/" class="mobile-menu__link">
      Materialien
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round"><polyline points="9 18 15 12 9 6"/></svg>
    </a>
    <a href="/collection/" class="mobile-menu__link">
      Lookbook
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round"><polyline points="9 18 15 12 9 6"/></svg>
    </a>
    <a href="/brand-story/" class="mobile-menu__link">
      Über uns
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round"><polyline points="9 18 15 12 9 6"/></svg>
    </a>
    <a href="/materials/" class="mobile-menu__link">
      Nachhaltigkeit
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round"><polyline points="9 18 15 12 9 6"/></svg>
    </a>
  </div>
  <div class="mobile-menu__footer">
    <div class="mobile-menu__lang">
      <a href="#" class="active">Deutsch</a>
      <a href="#">English</a>
    </div>
  </div>
</div>
```

- [ ] **Step 2: Commit**

```bash
git add website/src/_includes/header.njk
git commit -m "feat: add header Nunjucks partial"
```

---

## Task 6: Footer Partial

**Files:**
- Create: `website/src/_includes/footer.njk`

Content from `website/index.html` lines 462–538 with all links updated to root-relative routes, legal links added, and Cookie-Einstellungen link added.

- [ ] **Step 1: Create `website/src/_includes/footer.njk`**

```html
<footer class="footer">
  <div class="container">
    <div class="footer__grid">
      <div>
        <p class="footer__brand-name">TARA</p>
        <p class="footer__brand-text">
          Exklusive Baumwollkleidung in kuratierten Kapsulkollektionen. Zeitloses Design, gefertigt für Frauen, die Qualität und mühelose Eleganz schätzen.
        </p>
      </div>

      <div>
        <h4 class="footer__heading">Shop</h4>
        <div class="footer__links">
          <a href="/collection/">Neue Kollektion</a>
          <a href="/collection/">Kleider</a>
          <a href="/collection/">Blusen &amp; Tops</a>
          <a href="/collection/">Hosen</a>
          <a href="/collection/">Strickwaren</a>
          <a href="/collection/">Alle Produkte</a>
        </div>
      </div>

      <div>
        <h4 class="footer__heading">Über uns</h4>
        <div class="footer__links">
          <a href="/brand-story/">Unsere Geschichte</a>
          <a href="/materials/">Materialien &amp; Nachhaltigkeit</a>
          <a href="/collection/">Journal</a>
          <a href="#">Karriere</a>
        </div>
      </div>

      <div>
        <h4 class="footer__heading">Kundenservice</h4>
        <div class="footer__links">
          <a href="#">Kontakt</a>
          <a href="/size-guide/">Größenberatung</a>
          <a href="#">Versand &amp; Lieferung</a>
          <a href="/legal/widerruf/">Rückgabe &amp; Umtausch</a>
          <a href="#">FAQ</a>
        </div>
      </div>
    </div>

    <div class="footer__bottom">
      <div class="footer__copyright">
        &copy; 2026 TARA. Alle Rechte vorbehalten.
        &nbsp;&bull;&nbsp; <a href="/legal/impressum/" style="color: var(--color-footer-muted);">Impressum</a>
        &nbsp;&bull;&nbsp; <a href="/legal/datenschutz/" style="color: var(--color-footer-muted);">Datenschutz</a>
        &nbsp;&bull;&nbsp; <a href="/legal/agb/" style="color: var(--color-footer-muted);">AGB</a>
        &nbsp;&bull;&nbsp; <a href="/legal/widerruf/" style="color: var(--color-footer-muted);">Widerrufsrecht</a>
        &nbsp;&bull;&nbsp; <a href="#" id="cookieSettingsLink" style="color: var(--color-footer-muted);">Cookie-Einstellungen</a>
      </div>
      <div class="footer__certifications">
        <span class="footer__cert-badge">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
          OEKO-TEX&reg;
        </span>
        <span class="footer__cert-badge">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><path d="M8 14s1.5 2 4 2 4-2 4-2"/><line x1="9" y1="9" x2="9.01" y2="9"/><line x1="15" y1="9" x2="15.01" y2="9"/></svg>
          GOTS
        </span>
      </div>
      <div class="footer__payments">
        <span class="footer__payment-icon">PayPal</span>
        <span class="footer__payment-icon">Klarna</span>
        <span class="footer__payment-icon">Visa</span>
        <span class="footer__payment-icon">SEPA</span>
      </div>
    </div>
  </div>
</footer>
```

- [ ] **Step 2: Commit**

```bash
git add website/src/_includes/footer.njk
git commit -m "feat: add footer Nunjucks partial with real nav links"
```

---

## Task 7: Overlay Partials

**Files:**
- Create: `website/src/_includes/search-overlay.njk`
- Create: `website/src/_includes/wishlist-drawer.njk`
- Create: `website/src/_includes/cart-drawer.njk`

Content copied exactly from `website/index.html` (same HTML, no changes needed).

- [ ] **Step 1: Create `website/src/_includes/search-overlay.njk`**

(Source: `website/index.html` lines 542–554)

```html
<div class="search-overlay" id="searchOverlay" role="search">
  <div class="search-overlay__inner">
    <form class="search-overlay__form" onsubmit="return false;">
      <svg class="search-overlay__icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
      <input type="search" class="search-overlay__input" id="searchInput" placeholder="Suchen Sie nach Produkten…" autocomplete="off" aria-label="Suche">
      <button type="button" class="search-overlay__close" id="searchClose" aria-label="Suche schließen">
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </form>
  </div>
</div>
```

- [ ] **Step 2: Create `website/src/_includes/wishlist-drawer.njk`**

(Source: `website/index.html` lines 559–573)

```html
<div class="wishlist-drawer" id="wishlistDrawer">
  <div class="cart-drawer__header">
    <h3 class="cart-drawer__title">Wunschliste</h3>
    <button class="cart-drawer__close" id="wishlistClose" aria-label="Wunschliste schließen">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </button>
  </div>
  <div class="cart-drawer__body">
    <div class="cart-drawer__empty">
      <p>Ihre Wunschliste ist leer</p>
      <a href="/collection/" class="btn btn--primary">Kollektion entdecken</a>
    </div>
  </div>
</div>
```

- [ ] **Step 3: Create `website/src/_includes/cart-drawer.njk`**

(Source: `website/index.html` lines 577–604)

```html
<div class="cart-overlay" id="cartOverlay"></div>
<div class="cart-drawer" id="cartDrawer">
  <div class="cart-drawer__header">
    <h3 class="cart-drawer__title">Warenkorb</h3>
    <button class="cart-drawer__close" id="cartClose" aria-label="Warenkorb schließen">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
    </button>
  </div>
  <div class="cart-drawer__body">
    <div class="cart-drawer__empty">
      <p>Ihr Warenkorb ist leer</p>
      <a href="/collection/" class="btn btn--primary">Kollektion entdecken</a>
    </div>
  </div>
  <div class="cart-drawer__footer">
    <div class="cart-drawer__shipping-note">
      Kostenloser Versand ab 75&euro;
    </div>
    <div class="cart-drawer__total">
      <span>Zwischensumme</span>
      <span>&euro;0,00</span>
    </div>
    <button class="btn btn--dark btn--full">Zur Kasse</button>
    <p style="font-size: 0.6875rem; color: var(--color-text); opacity:0.5; text-align:center; margin-top: 0.5rem;">
      inkl. MwSt. &bull; Versandkosten an der Kasse
    </p>
  </div>
</div>
```

- [ ] **Step 4: Commit**

```bash
git add website/src/_includes/search-overlay.njk website/src/_includes/wishlist-drawer.njk website/src/_includes/cart-drawer.njk
git commit -m "feat: add overlay Nunjucks partials"
```

---

## Task 8: Cookie Banner Partial

**Files:**
- Create: `website/src/_includes/cookie-banner.njk`

This replaces the basic banner in the original HTML with a GDPR-compliant version with granular toggles.

- [ ] **Step 1: Create `website/src/_includes/cookie-banner.njk`**

```html
<div class="cookie-banner" id="cookieBanner" role="dialog" aria-label="Cookie-Einstellungen" aria-modal="true">
  <div class="cookie-banner__inner">
    <div class="cookie-banner__body">
      <p class="cookie-banner__title">Cookie-Einstellungen</p>
      <p class="cookie-banner__text">
        Wir verwenden Cookies, um Ihnen die bestmögliche Erfahrung zu bieten. Lesen Sie mehr in unserer <a href="/legal/datenschutz/">Datenschutzerklärung</a>.
      </p>
      <div class="cookie-banner__categories">
        <div class="cookie-banner__category">
          <label>
            <input type="checkbox" checked disabled>
            <span>Essenziell</span>
          </label>
          <p>Notwendig für den Betrieb der Website. Immer aktiv.</p>
        </div>
        <div class="cookie-banner__category">
          <label>
            <input type="checkbox" id="cookieAnalytics">
            <span>Analyse</span>
          </label>
          <p>Helfen uns zu verstehen, wie Sie die Website nutzen.</p>
        </div>
        <div class="cookie-banner__category">
          <label>
            <input type="checkbox" id="cookieMarketing">
            <span>Marketing</span>
          </label>
          <p>Ermöglichen personalisierte Werbung auf anderen Plattformen.</p>
        </div>
      </div>
    </div>
    <div class="cookie-banner__actions">
      <button class="btn btn--primary" id="cookieAcceptAll">Alle akzeptieren</button>
      <button class="btn btn--outline" id="cookieSaveSelection">Auswahl speichern</button>
    </div>
  </div>
</div>
```

- [ ] **Step 2: Commit**

```bash
git add website/src/_includes/cookie-banner.njk
git commit -m "feat: add GDPR cookie consent banner partial"
```

---

## Task 9: Base Layout

**Files:**
- Create: `website/src/_layouts/base.njk`

- [ ] **Step 1: Create `website/src/_layouts/base.njk`**

```njk
<!DOCTYPE html>
<html lang="de">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="{{ description }}">
  <title>{{ title }}</title>

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;1,300;1,400&family=Jost:wght@300;400&display=swap" rel="stylesheet">

  <link rel="stylesheet" href="/css/variables.css">
  <link rel="stylesheet" href="/css/base.css">
  <link rel="stylesheet" href="/css/components.css">
  <link rel="stylesheet" href="/css/pages.css">
  <link rel="stylesheet" href="/css/responsive.css">
  <link rel="stylesheet" href="/css/cookie.css">
</head>
<body class="{{ bodyClass }}">

{% include "header.njk" %}

{{ content | safe }}

{% include "footer.njk" %}

{% include "search-overlay.njk" %}
{% include "wishlist-drawer.njk" %}
{% include "cart-drawer.njk" %}
{% include "cookie-banner.njk" %}

<nav class="bottom-nav" aria-label="Mobile Navigation">
  <a href="/" class="bottom-nav__item{% if page.url == "/" %} bottom-nav__item--active{% endif %}">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
    <span class="bottom-nav__label">Start</span>
  </a>
  <a href="/collection/" class="bottom-nav__item{% if page.url == "/collection/" %} bottom-nav__item--active{% endif %}">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><rect x="2" y="2" width="20" height="20" rx="2" ry="2"/><line x1="8" y1="2" x2="8" y2="22"/><line x1="16" y1="2" x2="16" y2="22"/><line x1="2" y1="8" x2="22" y2="8"/><line x1="2" y1="16" x2="22" y2="16"/></svg>
    <span class="bottom-nav__label">Shop</span>
  </a>
  <a href="#" class="bottom-nav__item" id="bottomNavWishlist">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>
    <span class="bottom-nav__label">Wunschliste</span>
  </a>
  <a href="#" class="bottom-nav__item" id="bottomNavCart">
    <span class="bottom-nav__cart-badge">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
      <span class="bottom-nav__cart-count">0</span>
    </span>
    <span class="bottom-nav__label">Warenkorb</span>
  </a>
  <a href="#" class="bottom-nav__item">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
    <span class="bottom-nav__label">Konto</span>
  </a>
</nav>

<script src="/js/main.js"></script>
<script src="/js/cookie.js"></script>
</body>
</html>
```

- [ ] **Step 2: Run build to verify no template errors**

```bash
cd website && npm run build
```

Expected: `dist/` created, no Nunjucks errors. (No pages exist yet — that is fine.)

- [ ] **Step 3: Commit**

```bash
git add website/src/_layouts/base.njk
git commit -m "feat: add base Nunjucks layout"
```

---

## Task 10: Migrate Homepage

**Files:**
- Create: `website/src/index.njk`

The page-specific body content is `website/index.html` lines 165–459 (hero section through newsletter, stopping before `<footer>`). The shared shell (head, header, footer, overlays, scripts) is omitted — it comes from `base.njk`.

- [ ] **Step 1: Create `website/src/index.njk`**

The file is front matter + the page body content:

```njk
---
layout: base.njk
title: "TARA — Premium Cotton Clothing"
description: "TARA — Exklusive Baumwollkleidung in kuratierten Kapsulkollektionen. Zeitloses Design, Premium-Baumwolle, nachhaltig gefertigt."
bodyClass: "page-home"
---

```

Then paste `website/index.html` lines 165–459 verbatim immediately after the closing `---`. Those lines contain the hero, collection story, product grid, sustainability section, social proof, and newsletter sections. Make no changes to that HTML content.

- [ ] **Step 2: Start dev server and verify**

```bash
cd website && npm run dev
```

Open `http://localhost:8080` in a browser.

Expected: Homepage renders identically to `website/index.html` — same hero image, product grid, and newsletter section. Header and footer appear. Cookie banner appears on first visit (localStorage has no consent key).

- [ ] **Step 3: Commit**

```bash
git add website/src/index.njk
git commit -m "feat: migrate homepage to 11ty Nunjucks"
```

---

## Task 11: Migrate Collection Page

**Files:**
- Create: `website/src/collection.njk`

Page-specific content: `website/collection.html` lines ~89–691 (collection header/editorial/product grid, stopping before `<footer>` at line 692).

- [ ] **Step 1: Create `website/src/collection.njk`**

```njk
---
layout: base.njk
title: "Lumière Douce — FS 2026 | TARA"
description: "Lumière Douce — TARA Frühling/Sommer 2026 Kapselkollektion. Zeitlose Baumwollkleidung inspiriert vom sanften Licht der goldenen Stunde."
bodyClass: "page-collection"
---

```

Then paste `website/collection.html` lines 89–691 verbatim after the closing `---`.

- [ ] **Step 2: Verify at dev server**

Open `http://localhost:8080/collection/`

Expected: Collection page renders identically to `website/collection.html`. Breadcrumb, editorial story, full product grid (12 products), and filter bar all visible.

- [ ] **Step 3: Commit**

```bash
git add website/src/collection.njk
git commit -m "feat: migrate collection page to 11ty Nunjucks"
```

---

## Task 12: Migrate Product Page

**Files:**
- Create: `website/src/product.njk`

Page-specific content: `website/product.html` lines ~89–285 (product detail sections, stopping before `<footer>` at line 286).

- [ ] **Step 1: Create `website/src/product.njk`**

```njk
---
layout: base.njk
title: "Wickelkleid Lumière — TARA"
description: "Wickelkleid Lumière — 100% Bio-Baumwolle, zeitloses Design. OEKO-TEX® zertifiziert."
bodyClass: "page-product"
---

```

Then paste `website/product.html` lines 89–285 verbatim after the closing `---`.

- [ ] **Step 2: Verify at dev server**

Open `http://localhost:8080/product/`

Expected: Product detail page renders correctly — image gallery with 4 thumbnails, color swatches, size selector EU 34–46, add-to-cart button, payment badges (Klarna/PayPal/SEPA), accordion sections for materials and care, "Model ist 175 cm und trägt Größe 38".

- [ ] **Step 3: Commit**

```bash
git add website/src/product.njk
git commit -m "feat: migrate product detail page to 11ty Nunjucks"
```

---

## Task 13: Brand Story Page

**Files:**
- Create: `website/src/brand-story.njk`

- [ ] **Step 1: Create `website/src/brand-story.njk`**

```njk
---
layout: base.njk
title: "Über uns — TARA"
description: "Die Geschichte hinter TARA — gegründet aus Liebe zu natürlichen Stoffen und zeitlosem Design."
bodyClass: "page-brand-story"
---

<!-- ==========================================
     PAGE HERO
     ========================================== -->
<section class="page-hero">
  <img class="page-hero__img" src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=2400&h=900&fit=crop&crop=top" alt="TARA Gründerin im Atelier mit Baumwollstoffen">
  <div class="page-hero__overlay"></div>
  <div class="page-hero__content">
    <h1>Über uns</h1>
    <p>Eine Marke gebaut auf Stoff, Stille und Sorgfalt</p>
  </div>
</section>

<!-- ==========================================
     BRAND STORY — TWO COLUMN
     ========================================== -->
<section class="section">
  <div class="container">
    <div class="collection-story animate-on-scroll">
      <div class="collection-story__text">
        <p class="collection-story__label">Die Geschichte</p>
        <h2 class="collection-story__title">Gegründet aus Liebe zu Stoff</h2>
        <p class="collection-story__body">
          TARA entstand aus einem einfachen, tief empfundenen Gedanken: dass gute Kleidung nicht schreien muss. Dass ein Kleid aus feinster Baumwolle, das perfekt fällt und sich wie eine zweite Haut anfühlt, mehr sagen kann als jeder Trend.
        </p>
        <p class="collection-story__body">
          Unsere Baumwolle kommt aus den sonnenverwöhnten Feldern Südfrankreichs und den handwerklichen Webereien Portugals — zwei Länder, die für ihre Sorgfalt in Textilverarbeitung und das Erbe des savoir-faire bekannt sind. Jedes Stück wird in kleinen Auflagen gefertigt, mit Bedacht entworfen und auf Langlebigkeit geprüft.
        </p>
        <a href="/collection/" class="btn btn--outline">Kollektion entdecken</a>
      </div>
      <div class="collection-story__image">
        <img src="https://images.unsplash.com/photo-1558171813-2f918e6cc41b?w=800&h=1000&fit=crop" alt="Detailaufnahme feinste Baumwolle, TARA Atelier" loading="lazy">
      </div>
    </div>
  </div>
</section>

<!-- ==========================================
     WHY COTTON — THREE PILLARS
     ========================================== -->
<section class="section" style="background-color: var(--color-bg-secondary);">
  <div class="container">
    <div class="animate-on-scroll" style="text-align: center; max-width: 560px; margin: 0 auto var(--space-lg);">
      <p class="collection-story__label">Warum Baumwolle?</p>
      <h2>Der Stoff, der uns trägt</h2>
      <p style="opacity: 0.75; line-height: 1.7;">Baumwolle ist nicht nur ein Material — es ist eine Haltung. Natürlich, dauerhaft, ehrlich.</p>
    </div>
    <div class="pillars-grid animate-on-scroll">
      <div class="pillar">
        <div class="pillar__icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M12 2a10 10 0 1 0 10 10"/><path d="M12 8v4l2 2"/><path d="M20 2v6h-6"/></svg>
        </div>
        <h3>Atmungsaktiv</h3>
        <p>Natürliche Fasern, die mit Ihrer Haut atmen und die Körpertemperatur regulieren — ideal für den deutschen Sommer wie den kühlen Herbst.</p>
      </div>
      <div class="pillar">
        <div class="pillar__icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
        </div>
        <h3>Langlebig</h3>
        <p>Hochwertige Langstapel-Baumwolle und präzise Verarbeitung ergeben Kleidungsstücke, die nicht eine, sondern viele Saisons halten.</p>
      </div>
      <div class="pillar">
        <div class="pillar__icon">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
        </div>
        <h3>Zeitlos</h3>
        <p>Klassische Schnitte ohne Saisondatum. Ein TARA-Stück gehört nicht zur Herbstkollektion — es gehört zu Ihnen, Jahr für Jahr.</p>
      </div>
    </div>
  </div>
</section>

<!-- ==========================================
     OUR VALUES
     ========================================== -->
<section class="section">
  <div class="container">
    <div class="animate-on-scroll" style="text-align: center; max-width: 560px; margin: 0 auto var(--space-lg);">
      <p class="collection-story__label">Was uns leitet</p>
      <h2>Unsere Werte</h2>
    </div>
    <div class="values-grid animate-on-scroll">
      <div class="value-card">
        <h3>Qualität</h3>
        <p>Jeder Stoff wird handausgewählt. Jede Naht geprüft. Wir verwenden keine Shortcuts — nur Materialien und Verarbeitung, hinter denen wir stehen können.</p>
      </div>
      <div class="value-card">
        <h3>Achtsamkeit</h3>
        <p>Kleine Auflagen statt Massenproduktion. Sorgfalt statt Geschwindigkeit. Wir fertigen nur so viel, wie wir wirklich mit Stolz verkaufen können.</p>
      </div>
      <div class="value-card">
        <h3>Zeitlosigkeit</h3>
        <p>Kein Fast Fashion, keine Wegwerfmode. Unsere Stücke sind so entworfen, dass sie in fünf Jahren genauso relevant sind wie heute.</p>
      </div>
      <div class="value-card">
        <h3>Transparenz</h3>
        <p>Wir zeigen, woher unsere Stoffe kommen, wie sie gefertigt werden, und was sie wirklich kosten. Weil gutes Kleidung auch ehrliches Kleidung ist.</p>
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Verify at dev server**

Open `http://localhost:8080/brand-story/`

Expected: Full-bleed hero image with "Über uns" heading, two-column story section, three pillars grid (Atmungsaktiv / Langlebig / Zeitlos), four value cards.

- [ ] **Step 3: Commit**

```bash
git add website/src/brand-story.njk
git commit -m "feat: add brand story page"
```

---

## Task 14: Materials Page

**Files:**
- Create: `website/src/materials.njk`

- [ ] **Step 1: Create `website/src/materials.njk`**

```njk
---
layout: base.njk
title: "Materialien & Nachhaltigkeit — TARA"
description: "TARA verwendet ausschließlich OEKO-TEX® und GOTS-zertifizierte Bio-Baumwolle. Erfahren Sie mehr über unsere Stoffe und Pflegehinweise."
bodyClass: "page-materials"
---

<!-- ==========================================
     PAGE HERO
     ========================================== -->
<section class="page-hero">
  <img class="page-hero__img" src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=2400&h=900&fit=crop" alt="Nahaufnahme Bio-Baumwollstoff in natürlichem Licht">
  <div class="page-hero__overlay"></div>
  <div class="page-hero__content">
    <h1>Materialien</h1>
    <p>Stoff, dem wir vertrauen — und den Sie fühlen werden</p>
  </div>
</section>

<!-- ==========================================
     INTRO — WHAT MAKES TARA COTTON DIFFERENT
     ========================================== -->
<section class="section">
  <div class="container">
    <div class="collection-story animate-on-scroll">
      <div class="collection-story__text">
        <p class="collection-story__label">Unser Stoff</p>
        <h2 class="collection-story__title">Baumwolle, die man fühlen kann</h2>
        <p class="collection-story__body">
          Nicht jede Baumwolle ist gleich. TARA verwendet ausschließlich Langstapel-Baumwolle — die feinste Kategorie — handgepflückt und auf kurze Verarbeitungswege geachtet. Das Ergebnis: ein Stoff, der sich weich wie Seide anfühlt, ohne die Kälte von Synthetik.
        </p>
        <p class="collection-story__body">
          Unsere Stoffe werden von einer kleinen Auswahl an Webereien in Portugal hergestellt, die seit Generationen für ihre Präzision bekannt sind. Kein Stoff verlässt die Produktion ohne vollständige Rückverfolgbarkeit — von der Baumwollpflanze bis zur fertigen Bluse.
        </p>
      </div>
      <div class="collection-story__image">
        <img src="https://images.unsplash.com/photo-1530435460869-d13625c69bbf?w=800&h=1000&fit=crop" alt="Weißes Baumwollgarn auf Spule, Nahaufnahme" loading="lazy">
      </div>
    </div>
  </div>
</section>

<!-- ==========================================
     CERTIFICATIONS
     ========================================== -->
<section class="section" style="background-color: var(--color-bg-secondary);">
  <div class="container">
    <div class="animate-on-scroll" style="text-align: center; max-width: 560px; margin: 0 auto var(--space-lg);">
      <p class="collection-story__label">Zertifizierungen</p>
      <h2>Geprüfte Qualität</h2>
      <p style="opacity: 0.75; line-height: 1.7;">Unabhängige Zertifizierungen als Vertrauensbeweis — nicht als Marketingstrategie.</p>
    </div>
    <div class="certs-grid animate-on-scroll">
      <div class="cert-card">
        <div class="cert-card__badge">OEKO-TEX®</div>
        <div>
          <h3>Standard 100</h3>
          <p>Jedes Stück getestet auf Schadstoffe und gesundheitsschädliche Substanzen. Der weltweit bekannteste Standard für schadstoffgeprüfte Textilien — durchgeführt von unabhängigen Laboren.</p>
        </div>
      </div>
      <div class="cert-card">
        <div class="cert-card__badge">GOTS</div>
        <div>
          <h3>Global Organic Textile Standard</h3>
          <p>Bio-Baumwolle angebaut ohne Pestizide, mit 91% weniger Wasserverbrauch als konventionelle Baumwolle. GOTS zertifiziert die gesamte Lieferkette — von der Faser bis zum Endprodukt.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ==========================================
     FABRIC CARE
     ========================================== -->
<section class="section">
  <div class="container">
    <div class="animate-on-scroll" style="text-align: center; max-width: 560px; margin: 0 auto var(--space-lg);">
      <p class="collection-story__label">Pflege</p>
      <h2>Gut behandelt hält länger</h2>
      <p style="opacity: 0.75; line-height: 1.7;">Mit der richtigen Pflege begleiten Sie unsere Stücke viele Jahre.</p>
    </div>
    <div class="care-grid animate-on-scroll">
      <div class="care-card">
        <div class="care-card__symbol">30°</div>
        <h4>Schonend waschen</h4>
        <p>Maschinenwäsche bei max. 30°C, Schonwaschgang. Keine Bleichmittel.</p>
      </div>
      <div class="care-card">
        <div class="care-card__symbol">⊘</div>
        <h4>Nicht in den Trockner</h4>
        <p>Liegend oder hängend trocknen, weg von direktem Sonnenlicht und Wärmequellen.</p>
      </div>
      <div class="care-card">
        <div class="care-card__symbol">◻</div>
        <h4>Bügeln bei niedriger Stufe</h4>
        <p>Bei Bedarf auf links bügeln. Dampf auf mittlerer Stufe für empfindlichere Gewebe.</p>
      </div>
      <div class="care-card">
        <div class="care-card__symbol">🧴</div>
        <h4>Spezialwaschmittel</h4>
        <p>Wir empfehlen flüssige Feinwaschmittel für Baumwolle — kein Weichspüler, er beschädigt die Fasern.</p>
      </div>
      <div class="care-card">
        <div class="care-card__symbol">📦</div>
        <h4>Aufbewahrung</h4>
        <p>Gefaltet oder hängend lagern. Dunkle, trockene Umgebung. Baumwolle atmet — kein Vakuumbeutel.</p>
      </div>
      <div class="care-card">
        <div class="care-card__symbol">♻</div>
        <h4>Am Ende des Lebens</h4>
        <p>100% Baumwolle ist kompostierbar. Oder spenden — getragene TARA-Stücke haben noch Jahre vor sich.</p>
      </div>
    </div>
  </div>
</section>

<!-- ==========================================
     CLOSING EDITORIAL
     ========================================== -->
<section class="section section--blush">
  <div class="container">
    <div class="collection-story animate-on-scroll">
      <div class="collection-story__text">
        <p class="collection-story__label">Unsere Haltung</p>
        <h2 class="collection-story__title">Langsame Mode, kein Aktivismus</h2>
        <p class="collection-story__body">
          TARA ist keine Nachhaltigkeitsmarke. Wir sind eine Bekleidungsmarke, die vernünftig handelt — weil es das Richtige ist und weil gute Qualität gar nicht anders kann, als auch gut für die Welt zu sein.
        </p>
        <p class="collection-story__body">
          Wir kaufen weniger ein. Wir produzieren weniger. Wir erzählen weniger große Geschichten. Was bleibt, ist Kleidung, die Sie wirklich tragen werden.
        </p>
        <a href="/collection/" class="btn btn--outline">Zur Kollektion</a>
      </div>
      <div class="collection-story__image">
        <img src="https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&h=1000&fit=crop" alt="TARA Kleidungsstücke sorgfältig gefaltet" loading="lazy">
      </div>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Verify at dev server**

Open `http://localhost:8080/materials/`

Expected: Hero image, two-column intro, certifications grid (OEKO-TEX® and GOTS in sage green styling), 6-card care grid, closing editorial. Sage green accent visible on cert cards.

- [ ] **Step 3: Commit**

```bash
git add website/src/materials.njk
git commit -m "feat: add materials & sustainability page"
```

---

## Task 15: Size Guide Page

**Files:**
- Create: `website/src/size-guide.njk`

- [ ] **Step 1: Create `website/src/size-guide.njk`**

```njk
---
layout: base.njk
title: "Größenberatung — TARA"
description: "TARA Größentabelle für Damen: EU 34–46. So messen Sie sich richtig und finden die perfekte Größe."
bodyClass: "page-size-guide"
---

<!-- ==========================================
     PAGE HEADER
     ========================================== -->
<section class="section" style="padding-top: var(--space-3xl);">
  <div class="container">
    <div class="animate-on-scroll" style="max-width: 640px; margin-bottom: var(--space-2xl);">
      <p class="collection-story__label">Größenberatung</p>
      <h1 style="font-family: var(--font-heading); font-size: var(--text-h1); font-weight: var(--weight-light); letter-spacing: 0.08em; color: var(--color-heading); margin-bottom: var(--space-sm);">Die richtige Größe finden</h1>
      <p style="font-size: var(--text-body); line-height: 1.7; opacity: 0.8;">Gut sitzende Kleidung fängt mit der richtigen Messung an. Nehmen Sie sich zwei Minuten Zeit — es lohnt sich.</p>
    </div>
  </div>
</section>

<!-- ==========================================
     HOW TO MEASURE
     ========================================== -->
<section class="section" style="padding-top: 0;">
  <div class="container">
    <div class="size-guide-intro animate-on-scroll">
      <div>
        <h2 style="font-family: var(--font-heading); font-size: var(--text-h3); color: var(--color-heading); margin-bottom: var(--space-lg);">So messen Sie sich</h2>
        <p style="font-size: var(--text-body); opacity: 0.8; line-height: 1.7; margin-bottom: var(--space-md);">Verwenden Sie ein weiches Maßband. Messen Sie immer in Unterwäsche, aufrecht stehend, ohne Luft anzuhalten.</p>
        <div class="measure-steps">
          <div class="measure-step">
            <div class="measure-step__number">1</div>
            <div>
              <h4>Brust (B)</h4>
              <p>Legen Sie das Maßband an der breitesten Stelle über die Brust — in Höhe der Brustwarzen. Das Band sollte waagerecht liegen und weder zu eng noch zu locker sitzen.</p>
            </div>
          </div>
          <div class="measure-step">
            <div class="measure-step__number">2</div>
            <div>
              <h4>Taille (T)</h4>
              <p>Die engste Stelle Ihres Rumpfes — meist einige Zentimeter oberhalb des Bauchnabels. Atmen Sie normal aus und messen Sie dann.</p>
            </div>
          </div>
          <div class="measure-step">
            <div class="measure-step__number">3</div>
            <div>
              <h4>Hüfte (H)</h4>
              <p>Die breiteste Stelle Ihres Gesäßes, meist 18–20 cm unterhalb der Taille. Füße zusammenstellen beim Messen.</p>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div class="size-diagram">
          <img src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=560&h=700&fit=crop&crop=top" alt="Schematische Darstellung der Messpunkte Brust, Taille und Hüfte" loading="lazy">
        </div>
      </div>
    </div>
  </div>
</section>

<!-- ==========================================
     SIZE TABLE
     ========================================== -->
<section class="section" style="background-color: var(--color-bg-secondary);">
  <div class="container">
    <h2 class="animate-on-scroll" style="font-family: var(--font-heading); font-size: var(--text-h3); color: var(--color-heading); margin-bottom: var(--space-md);">Größentabelle</h2>
    <p class="animate-on-scroll" style="font-size: var(--text-body); opacity: 0.8; margin-bottom: var(--space-lg);">Alle Maße in Zentimetern.</p>
    <div class="size-table-wrap animate-on-scroll">
      <table class="size-table">
        <thead>
          <tr>
            <th>EU Größe</th>
            <th>Brust (cm)</th>
            <th>Taille (cm)</th>
            <th>Hüfte (cm)</th>
          </tr>
        </thead>
        <tbody>
          <tr><td>34</td><td>80–82</td><td>60–62</td><td>88–90</td></tr>
          <tr><td>36</td><td>84–86</td><td>64–66</td><td>92–94</td></tr>
          <tr><td>38</td><td>88–90</td><td>68–70</td><td>96–98</td></tr>
          <tr><td>40</td><td>92–94</td><td>72–74</td><td>100–102</td></tr>
          <tr><td>42</td><td>96–98</td><td>76–78</td><td>104–106</td></tr>
          <tr><td>44</td><td>100–102</td><td>80–82</td><td>108–110</td></tr>
          <tr><td>46</td><td>104–106</td><td>84–86</td><td>112–114</td></tr>
        </tbody>
      </table>
    </div>
    <div class="model-reference animate-on-scroll">
      Unser Model ist 175 cm groß und trägt Größe 38.
    </div>
    <p class="animate-on-scroll" style="font-size: var(--text-caption); opacity: 0.7; margin-top: var(--space-md); line-height: 1.6;">
      Wenn Sie zwischen zwei Größen liegen, empfehlen wir bei Oberteilen die kleinere Größe für einen schlanken Sitz und bei Kleidern die größere für mehr Bewegungsfreiheit.
    </p>
  </div>
</section>

<!-- ==========================================
     RETURNS NOTE
     ========================================== -->
<section class="section">
  <div class="container">
    <div class="animate-on-scroll" style="max-width: 640px; padding: var(--space-lg); border: 1px solid var(--color-border); border-radius: var(--radius-md);">
      <h2 style="font-family: var(--font-heading); font-size: 1.375rem; color: var(--color-heading); margin-bottom: var(--space-sm);">Passt nicht? Kein Problem.</h2>
      <p style="font-size: var(--text-body); line-height: 1.7; opacity: 0.85; margin-bottom: var(--space-md);">
        Wir bieten kostenlose Rücksendungen innerhalb von 14 Tagen. Sie können jedes Stück in Ruhe zu Hause anprobieren — kein Risiko.
      </p>
      <a href="/legal/widerruf/" class="btn btn--outline">Widerrufsbelehrung lesen</a>
    </div>
  </div>
</section>
```

- [ ] **Step 2: Verify at dev server**

Open `http://localhost:8080/size-guide/`

Expected: Measurement instructions with 3 numbered steps, size table EU 34–46 with all measurements, "Model ist 175 cm" callout, returns note with link to Widerrufsbelehrung.

- [ ] **Step 3: Commit**

```bash
git add website/src/size-guide.njk
git commit -m "feat: add size guide page"
```

---

## Task 16: Legal Pages

**Files:**
- Create: `website/src/legal/impressum.njk`
- Create: `website/src/legal/datenschutz.njk`
- Create: `website/src/legal/agb.njk`
- Create: `website/src/legal/widerruf.njk`

All use realistic German placeholder content (legally correct structure, dummy company "TARA GmbH, Musterstraße 1, 10115 Berlin"). No decorative elements — base shell + content container only.

- [ ] **Step 1: Create `website/src/legal/impressum.njk`**

```njk
---
layout: base.njk
title: "Impressum — TARA"
description: "Impressum der TARA GmbH gemäß § 5 TMG."
bodyClass: "page-legal"
---

<div class="legal-page">
  <div class="container">
    <div class="legal-content">
      <h1>Impressum</h1>

      <h2>Angaben gemäß § 5 TMG</h2>
      <p>
        TARA GmbH<br>
        Musterstraße 1<br>
        10115 Berlin<br>
        Deutschland
      </p>

      <h2>Handelsregister</h2>
      <p>
        Handelsregister: HRB 123456 B<br>
        Registergericht: Amtsgericht Berlin-Charlottenburg
      </p>

      <h2>Vertreten durch</h2>
      <p>Anna Müller (Geschäftsführerin)</p>

      <h2>Kontakt</h2>
      <p>
        Telefon: +49 (0)30 123 456 78<br>
        E-Mail: <a href="mailto:hallo@tara-clothing.de">hallo@tara-clothing.de</a>
      </p>

      <h2>Umsatzsteuer-ID</h2>
      <p>
        Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:<br>
        DE 123 456 789
      </p>

      <h2>Redaktionell verantwortlich</h2>
      <p>
        Anna Müller<br>
        Musterstraße 1<br>
        10115 Berlin
      </p>

      <h2>EU-Streitschlichtung</h2>
      <p>
        Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:
        <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener">https://ec.europa.eu/consumers/odr/</a>.<br>
        Unsere E-Mail-Adresse finden Sie oben im Impressum.
      </p>

      <h2>Verbraucherstreitbeilegung / Universalschlichtungsstelle</h2>
      <p>
        Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
      </p>
    </div>
  </div>
</div>
```

- [ ] **Step 2: Create `website/src/legal/datenschutz.njk`**

```njk
---
layout: base.njk
title: "Datenschutzerklärung — TARA"
description: "Datenschutzerklärung der TARA GmbH gemäß DSGVO."
bodyClass: "page-legal"
---

<div class="legal-page">
  <div class="container">
    <div class="legal-content">
      <h1>Datenschutzerklärung</h1>

      <h2>1. Datenschutz auf einen Blick</h2>
      <h3>Allgemeine Hinweise</h3>
      <p>
        Die folgenden Hinweise geben einen einfachen Überblick darüber, was mit Ihren personenbezogenen Daten passiert, wenn Sie diese Website besuchen. Personenbezogene Daten sind alle Daten, mit denen Sie persönlich identifiziert werden können. Ausführliche Informationen zum Thema Datenschutz entnehmen Sie unserer unter diesem Text aufgeführten Datenschutzerklärung.
      </p>

      <h3>Datenerfassung auf dieser Website</h3>
      <p>
        <strong>Wer ist verantwortlich für die Datenerfassung auf dieser Website?</strong><br>
        Die Datenverarbeitung auf dieser Website erfolgt durch den Websitebetreiber. Dessen Kontaktdaten können Sie dem Abschnitt „Hinweis zur verantwortlichen Stelle" in dieser Datenschutzerklärung entnehmen.
      </p>
      <p>
        <strong>Wie erfassen wir Ihre Daten?</strong><br>
        Ihre Daten werden zum einen dadurch erhoben, dass Sie uns diese mitteilen. Hierbei kann es sich z. B. um Daten handeln, die Sie in ein Kontaktformular eingeben. Andere Daten werden automatisch oder nach Ihrer Einwilligung beim Besuch der Website durch unsere IT-Systeme erfasst. Das sind vor allem technische Daten (z. B. Internetbrowser, Betriebssystem oder Uhrzeit des Seitenaufrufs).
      </p>
      <p>
        <strong>Wofür nutzen wir Ihre Daten?</strong><br>
        Ein Teil der Daten wird erhoben, um eine fehlerfreie Bereitstellung der Website zu gewährleisten. Andere Daten können zur Analyse Ihres Nutzerverhaltens verwendet werden.
      </p>

      <h2>2. Hinweis zur verantwortlichen Stelle</h2>
      <p>
        Die verantwortliche Stelle für die Datenverarbeitung auf dieser Website ist:<br><br>
        TARA GmbH<br>
        Musterstraße 1<br>
        10115 Berlin<br>
        Telefon: +49 (0)30 123 456 78<br>
        E-Mail: <a href="mailto:datenschutz@tara-clothing.de">datenschutz@tara-clothing.de</a>
      </p>
      <p>
        Verantwortliche Stelle ist die natürliche oder juristische Person, die allein oder gemeinsam mit anderen über die Zwecke und Mittel der Verarbeitung von personenbezogenen Daten entscheidet.
      </p>

      <h2>3. Speicherdauer</h2>
      <p>
        Soweit innerhalb dieser Datenschutzerklärung keine speziellere Speicherdauer genannt wurde, verbleiben Ihre personenbezogenen Daten bei uns, bis der Zweck für die Datenverarbeitung entfällt. Wenn Sie ein berechtigtes Löschersuchen geltend machen oder eine Einwilligung zur Datenverarbeitung widerrufen, werden Ihre Daten gelöscht, sofern wir keine anderen rechtlich zulässigen Gründe für die Speicherung Ihrer personenbezogenen Daten haben.
      </p>

      <h2>4. Cookies</h2>
      <p>
        Diese Website verwendet Cookies. Cookies sind kleine Textdateien, die auf Ihrem Endgerät gespeichert werden. Wir setzen Cookies ein, um unsere Website nutzerfreundlich zu gestalten. Einige Cookies bleiben auf Ihrem Endgerät gespeichert, bis Sie diese löschen. Sie ermöglichen es uns, Ihren Browser beim nächsten Besuch wiederzuerkennen.
      </p>
      <p>
        Sie können Ihren Browser so einstellen, dass Sie über das Setzen von Cookies informiert werden und Cookies nur im Einzelfall erlauben, die Annahme von Cookies für bestimmte Fälle oder generell ausschließen sowie das automatische Löschen der Cookies beim Schließen des Browsers aktivieren.
      </p>
      <p>
        Wir verwenden folgende Cookie-Kategorien:
      </p>
      <ul>
        <li><strong>Essenziell:</strong> Technisch notwendig für den Betrieb der Website. Rechtsgrundlage: Art. 6 Abs. 1 lit. f DSGVO.</li>
        <li><strong>Analyse:</strong> Helfen uns zu verstehen, wie Besucher mit der Website interagieren. Nur mit Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO).</li>
        <li><strong>Marketing:</strong> Dienen zur Schaltung personalisierter Werbung. Nur mit Ihrer Einwilligung (Art. 6 Abs. 1 lit. a DSGVO).</li>
      </ul>
      <p>Ihre Cookie-Einstellungen können Sie jederzeit über den Link „Cookie-Einstellungen" in der Fußzeile anpassen.</p>

      <h2>5. Ihre Rechte</h2>
      <p>Sie haben jederzeit das Recht:</p>
      <ul>
        <li>Auskunft über Ihre bei uns gespeicherten personenbezogenen Daten zu erhalten (Art. 15 DSGVO)</li>
        <li>Die Berichtigung unrichtiger Daten zu verlangen (Art. 16 DSGVO)</li>
        <li>Die Löschung Ihrer Daten zu verlangen (Art. 17 DSGVO)</li>
        <li>Die Einschränkung der Datenverarbeitung zu verlangen (Art. 18 DSGVO)</li>
        <li>Der Datenverarbeitung zu widersprechen (Art. 21 DSGVO)</li>
        <li>Ihre Einwilligung zur Datenverarbeitung zu widerrufen (Art. 7 Abs. 3 DSGVO)</li>
        <li>Beschwerde bei einer Aufsichtsbehörde einzulegen (Art. 77 DSGVO)</li>
      </ul>
      <p>
        Zur Ausübung dieser Rechte wenden Sie sich bitte an: <a href="mailto:datenschutz@tara-clothing.de">datenschutz@tara-clothing.de</a>
      </p>

      <h2>6. Kontaktformular</h2>
      <p>
        Wenn Sie uns per Kontaktformular Anfragen zukommen lassen, werden Ihre Angaben aus dem Anfrageformular inklusive der von Ihnen dort angegebenen Kontaktdaten zwecks Bearbeitung der Anfrage und für den Fall von Anschlussfragen bei uns gespeichert. Diese Daten geben wir nicht ohne Ihre Einwilligung weiter. Rechtsgrundlage: Art. 6 Abs. 1 lit. b DSGVO.
      </p>

      <h2>7. Änderungen dieser Datenschutzerklärung</h2>
      <p>
        Wir behalten uns vor, diese Datenschutzerklärung anzupassen, damit sie stets den aktuellen rechtlichen Anforderungen entspricht oder um Änderungen unserer Leistungen in der Datenschutzerklärung umzusetzen. Für Ihren erneuten Besuch gilt dann die neue Datenschutzerklärung.
      </p>
      <p><em>Stand: Mai 2026</em></p>
    </div>
  </div>
</div>
```

- [ ] **Step 3: Create `website/src/legal/agb.njk`**

```njk
---
layout: base.njk
title: "AGB — TARA"
description: "Allgemeine Geschäftsbedingungen der TARA GmbH."
bodyClass: "page-legal"
---

<div class="legal-page">
  <div class="container">
    <div class="legal-content">
      <h1>Allgemeine Geschäftsbedingungen</h1>

      <h2>§ 1 Geltungsbereich</h2>
      <p>
        Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für alle Verträge zwischen TARA GmbH, Musterstraße 1, 10115 Berlin (nachfolgend „Verkäufer") und dem Kunden (nachfolgend „Käufer") über die Lieferung von Waren. Abweichende Bedingungen des Käufers werden nicht anerkannt, es sei denn, der Verkäufer stimmt ihrer Geltung ausdrücklich schriftlich zu.
      </p>

      <h2>§ 2 Vertragsschluss</h2>
      <p>
        Die Präsentation der Produkte im Online-Shop stellt kein rechtlich bindendes Angebot, sondern eine Aufforderung zur Bestellung dar. Mit dem Absenden der Bestellung gibt der Käufer ein verbindliches Angebot zum Kauf der bestellten Waren ab. Der Verkäufer bestätigt den Eingang der Bestellung unverzüglich per E-Mail. Diese Eingangsbestätigung stellt noch keine Vertragsannahme dar. Der Kaufvertrag kommt erst durch Absendung einer Auftragsbestätigung oder Übergabe der Ware an einen Versanddienstleister zustande.
      </p>

      <h2>§ 3 Preise und Zahlungsbedingungen</h2>
      <p>
        Alle Preise sind Endpreise und enthalten die gesetzliche Mehrwertsteuer (19%). Versandkosten werden gesondert ausgewiesen. Für Bestellungen ab 75,00 EUR ist der Versand innerhalb Deutschlands kostenfrei.
      </p>
      <p>
        Als Zahlungsmethoden stehen zur Verfügung: Kreditkarte (Visa, Mastercard), PayPal, Klarna (Ratenkauf / Rechnung), SEPA-Lastschrift. Die Zahlung ist bei Vertragsschluss fällig.
      </p>

      <h2>§ 4 Lieferung und Versand</h2>
      <p>
        Die Lieferung erfolgt an die vom Käufer angegebene Lieferadresse innerhalb Deutschlands. Lieferungen ins Ausland sind nach Absprache möglich. Die Lieferzeit beträgt in der Regel 2–4 Werktage nach Zahlungseingang. Der Verkäufer versendet per DHL.
      </p>
      <p>
        Ist der Käufer Verbraucher, geht die Gefahr des zufälligen Untergangs und der zufälligen Verschlechterung der verkauften Sache erst dann auf den Käufer über, wenn die Ware an den Käufer übergeben wird.
      </p>

      <h2>§ 5 Widerrufsrecht</h2>
      <p>
        Verbrauchern steht das gesetzliche Widerrufsrecht zu. Näheres ergibt sich aus der <a href="/legal/widerruf/">Widerrufsbelehrung</a>. Rücksendungen werden vom Verkäufer kostenfrei akzeptiert.
      </p>

      <h2>§ 6 Eigentumsvorbehalt</h2>
      <p>
        Die gelieferte Ware bleibt bis zur vollständigen Zahlung des Kaufpreises Eigentum des Verkäufers.
      </p>

      <h2>§ 7 Mängelhaftung und Gewährleistung</h2>
      <p>
        Es gelten die gesetzlichen Mängelhaftungsrechte. Die Verjährungsfrist für Mängelansprüche beträgt 2 Jahre ab Lieferung der Ware.
      </p>

      <h2>§ 8 Haftungsbeschränkung</h2>
      <p>
        Der Verkäufer haftet für Vorsatz und grobe Fahrlässigkeit. Für leichte Fahrlässigkeit haftet der Verkäufer nur bei Verletzung wesentlicher Vertragspflichten (Kardinalpflichten), bei Schäden aus der Verletzung des Lebens, des Körpers oder der Gesundheit sowie bei Ansprüchen aus dem Produkthaftungsgesetz.
      </p>

      <h2>§ 9 Streitbeilegung</h2>
      <p>
        Die EU-Kommission stellt eine Plattform zur Online-Streitbeilegung bereit: <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener">https://ec.europa.eu/consumers/odr/</a>. Wir sind nicht bereit oder verpflichtet, an Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
      </p>

      <h2>§ 10 Anwendbares Recht</h2>
      <p>
        Es gilt deutsches Recht unter Ausschluss des UN-Kaufrechts (CISG). Gerichtsstand für Kaufleute ist Berlin.
      </p>

      <p><em>Stand: Mai 2026</em></p>
    </div>
  </div>
</div>
```

- [ ] **Step 4: Create `website/src/legal/widerruf.njk`**

```njk
---
layout: base.njk
title: "Widerrufsbelehrung — TARA"
description: "Widerrufsbelehrung und Muster-Widerrufsformular der TARA GmbH."
bodyClass: "page-legal"
---

<div class="legal-page">
  <div class="container">
    <div class="legal-content">
      <h1>Widerrufsbelehrung</h1>

      <h2>Widerrufsrecht</h2>
      <p>
        Sie haben das Recht, binnen vierzehn Tagen ohne Angabe von Gründen diesen Vertrag zu widerrufen.
      </p>
      <p>
        Die Widerrufsfrist beträgt vierzehn Tage ab dem Tag, an dem Sie oder ein von Ihnen benannter Dritter, der nicht der Beförderer ist, die Waren in Besitz genommen haben bzw. hat.
      </p>
      <p>
        Um Ihr Widerrufsrecht auszuüben, müssen Sie uns (TARA GmbH, Musterstraße 1, 10115 Berlin, E-Mail: <a href="mailto:retoure@tara-clothing.de">retoure@tara-clothing.de</a>, Tel.: +49 (0)30 123 456 78) mittels einer eindeutigen Erklärung (z. B. ein mit der Post versandter Brief oder eine E-Mail) über Ihren Entschluss, diesen Vertrag zu widerrufen, informieren. Sie können dafür das beigefügte Muster-Widerrufsformular verwenden, das jedoch nicht vorgeschrieben ist.
      </p>
      <p>
        Zur Wahrung der Widerrufsfrist reicht es aus, dass Sie die Mitteilung über die Ausübung des Widerrufsrechts vor Ablauf der Widerrufsfrist absenden.
      </p>

      <h2>Folgen des Widerrufs</h2>
      <p>
        Wenn Sie diesen Vertrag widerrufen, haben wir Ihnen alle Zahlungen, die wir von Ihnen erhalten haben, einschließlich der Lieferkosten (mit Ausnahme der zusätzlichen Kosten, die sich daraus ergeben, dass Sie eine andere Art der Lieferung als die von uns angebotene, günstigste Standardlieferung gewählt haben), unverzüglich und spätestens binnen vierzehn Tagen ab dem Tag zurückzuzahlen, an dem die Mitteilung über Ihren Widerruf dieses Vertrags bei uns eingegangen ist. Für diese Rückzahlung verwenden wir dasselbe Zahlungsmittel, das Sie bei der ursprünglichen Transaktion eingesetzt haben, es sei denn, mit Ihnen wurde ausdrücklich etwas anderes vereinbart; in keinem Fall werden Ihnen wegen dieser Rückzahlung Entgelte berechnet.
      </p>
      <p>
        Wir holen die Waren ab. Sie tragen keine Kosten für die Rücksendung der Waren (kostenlose Rücksendung).
      </p>
      <p>
        Sie müssen für einen etwaigen Wertverlust der Waren nur aufkommen, wenn dieser Wertverlust auf einen zur Prüfung der Beschaffenheit, Eigenschaften und Funktionsweise der Waren nicht notwendigen Umgang mit Ihnen zurückzuführen ist.
      </p>

      <div class="legal-widerruf-form">
        <h2>Muster-Widerrufsformular</h2>
        <p>
          (Wenn Sie den Vertrag widerrufen wollen, dann füllen Sie bitte dieses Formular aus und senden Sie es zurück.)
        </p>
        <p>
          An TARA GmbH, Musterstraße 1, 10115 Berlin, E-Mail: retoure@tara-clothing.de:
        </p>
        <p>
          Hiermit widerrufe(n) ich/wir (*) den von mir/uns (*) abgeschlossenen Vertrag über den Kauf der folgenden Waren (*)/die Erbringung der folgenden Dienstleistung (*)
        </p>
        <ul>
          <li>Bestellt am (*) / erhalten am (*)</li>
          <li>Name des/der Verbraucher(s)</li>
          <li>Anschrift des/der Verbraucher(s)</li>
          <li>Unterschrift des/der Verbraucher(s) (nur bei Mitteilung auf Papier)</li>
          <li>Datum</li>
        </ul>
        <p><em>(*) Unzutreffendes streichen.</em></p>
      </div>

      <p><em>Stand: Mai 2026</em></p>
    </div>
  </div>
</div>
```

- [ ] **Step 5: Verify all legal pages at dev server**

Open each URL and confirm they render:
- `http://localhost:8080/legal/impressum/`
- `http://localhost:8080/legal/datenschutz/`
- `http://localhost:8080/legal/agb/`
- `http://localhost:8080/legal/widerruf/`

Expected: Each page renders with base layout (header, footer, cookie banner), plain legal content in a reading-width column, no decorative elements.

- [ ] **Step 6: Verify cookie banner**

In a private/incognito browser window open `http://localhost:8080`.

Expected:
1. Cookie banner slides up from bottom of viewport
2. Three categories visible: Essenziell (disabled checkbox, always on), Analyse, Marketing
3. Click "Alle akzeptieren" — banner slides away
4. Reload the page — banner does NOT reappear
5. Open browser DevTools > Application > localStorage — confirm key `tara_cookie_consent` exists with `{ "essential": true, "analytics": true, "marketing": true, "timestamp": ... }`
6. Scroll to footer, click "Cookie-Einstellungen" — banner slides back up
7. Uncheck Analyse, click "Auswahl speichern" — banner closes, localStorage shows `analytics: false`

- [ ] **Step 7: Verify all 9 pages link correctly**

Click through every link in the header nav and footer. Confirm:
- Logo → `/` (homepage)
- Kollektionen → `/collection/`
- Materialien → `/materials/`
- Über uns (mobile menu) → `/brand-story/`
- Unsere Geschichte (footer) → `/brand-story/`
- Größenberatung (footer) → `/size-guide/`
- Impressum (footer) → `/legal/impressum/`
- Datenschutz (footer) → `/legal/datenschutz/`
- AGB (footer) → `/legal/agb/`
- Widerrufsrecht (footer) → `/legal/widerruf/`

- [ ] **Step 8: Commit all legal pages**

```bash
git add website/src/legal/
git commit -m "feat: add all 4 legal pages (Impressum, Datenschutz, AGB, Widerruf)"
```

- [ ] **Step 9: Final commit — mark prototype complete**

```bash
git add .
git commit -m "feat: complete TARA 11ty prototype — all 9 pages, GDPR cookie consent, wired navigation"
```

---

## Verification Checklist

Before declaring done, confirm:

- [ ] `npm run dev` starts without errors
- [ ] `npm run build` completes without errors, `dist/` contains all 9 pages
- [ ] All 9 URLs accessible: `/`, `/collection/`, `/product/`, `/brand-story/`, `/materials/`, `/size-guide/`, `/legal/impressum/`, `/legal/datenschutz/`, `/legal/agb/`, `/legal/widerruf/`
- [ ] Cookie banner appears on first visit, saves to localStorage, does not reappear on reload
- [ ] Footer "Cookie-Einstellungen" link re-opens banner
- [ ] Header change in `header.njk` reflects across all pages (edit one line, verify 2+ pages updated)
- [ ] All footer legal links go to correct pages
- [ ] Mobile bottom nav active state works on `/` and `/collection/`
