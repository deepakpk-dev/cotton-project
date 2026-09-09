const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const root = path.join(__dirname, '..');
const script = fs.readFileSync(path.join(root, 'js', 'main.js'), 'utf8');
const components = fs.readFileSync(path.join(root, 'css', 'components.css'), 'utf8');
const pages = fs.readFileSync(path.join(root, 'css', 'pages.css'), 'utf8');
const responsive = fs.readFileSync(path.join(root, 'css', 'responsive.css'), 'utf8');
const header = fs.readFileSync(path.join(root, 'src', '_includes', 'header.njk'), 'utf8');

test('cart quantity and removal controls share a compact, labelled row', () => {
  assert.match(script, /class="cart-line__controls"><label class="cart-line__quantity-label">/);
  assert.match(components, /\.cart-line__quantity-label\s*\{[^}]*display:\s*flex/);
  assert.doesNotMatch(components, /\.cart-line input\s*\{[^}]*min-height:\s*48px/);
});

test('brand-story calls to action have space after the values grid', () => {
  assert.match(pages, /\.values-grid \+ \.btn\s*\{\s*margin-top:\s*var\(--space-xl\);\s*\}/);
});

test('brand-story values use one balanced row on desktop', () => {
  assert.match(pages, /@media \(min-width: 1025px\)\s*\{\s*\.values-grid\s*\{\s*grid-template-columns:\s*repeat\(3, minmax\(0, 1fr\)\)/);
});

test('collection filters keep their sort controls aligned as fields wrap', () => {
  assert.match(pages, /\.filter-bar__inner\s*\{\s*display:\s*grid;\s*grid-template-columns:\s*minmax\(0, 1fr\) auto/);
  assert.match(pages, /\.filter-bar__meta\s*\{[^}]*justify-self:\s*end/);
});

test('materials care cards collapse before an intermediate viewport can overflow', () => {
  assert.match(pages, /@media \(max-width: 1200px\)\s*\{\s*\.care-grid\s*\{\s*grid-template-columns:\s*repeat\(2, minmax\(0, 1fr\)\)/);
  assert.match(pages, /@media \(max-width: 600px\)\s*\{\s*\.care-grid\s*\{\s*grid-template-columns:\s*1fr/);
});

test('desktop header aligns clear bag and account actions', () => {
  assert.match(header, /class="header__bag-btn" id="cartToggle"/);
  assert.match(header, /\{% if locale == 'en' %\}Bag\{% else %\}Warenkorb\{% endif %\}/);
  assert.match(header, /class="header__action-btn header__account-btn" id="accountToggle"/);
  assert.match(header, /class="header__account-icon"/);
  assert.match(components, /\.header__bag-btn\s*\{[^}]*display:\s*inline-flex/);
  assert.match(header, /class="header__bag-icon"/);
  assert.match(components, /\.header__bag-btn\s*\{[^}]*border:\s*none/);
  assert.match(responsive, /@media \(min-width: 768px\) and \(max-width: 1024px\)\s*\{[\s\S]*?\.header__inner\s*\{\s*display:\s*grid/);
});
