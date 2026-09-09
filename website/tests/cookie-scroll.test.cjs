const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

test('cookie banner does not use the scroll-locking modal lifecycle', () => {
  const source = fs.readFileSync(path.join(__dirname, '..', 'js', 'cookie.js'), 'utf8');
  assert.doesNotMatch(source, /TARAModal/);
  assert.match(source, /cookieBanner/);
});

test('cookie choices are progressively disclosed so the banner remains compact', () => {
  const markup = fs.readFileSync(path.join(__dirname, '..', 'src', '_includes', 'cookie-banner.njk'), 'utf8');
  assert.match(markup, /<details class="cookie-banner__details">/);
});
