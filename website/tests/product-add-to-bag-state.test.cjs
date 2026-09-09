const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

const root = path.join(__dirname, '..');
const mainScript = fs.readFileSync(path.join(root, 'js', 'main.js'), 'utf8');

test('add-to-bag stays unavailable until the shopper selects a size', () => {
  assert.match(mainScript, /function updateAddToBagState\(form\)/);
  assert.match(mainScript, /button\.disabled\s*=\s*!selectedSize/);
  assert.match(mainScript, /Choose a size/);
});
