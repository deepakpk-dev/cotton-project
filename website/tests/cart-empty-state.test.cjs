const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');

test('an empty cart removes the checkout footer and centers its recovery action', () => {
  const script = fs.readFileSync(path.join(__dirname, '..', 'js', 'main.js'), 'utf8');
  const styles = fs.readFileSync(path.join(__dirname, '..', 'css', 'components.css'), 'utf8');

  assert.match(script, /cart-drawer--empty/);
  assert.match(styles, /\.cart-drawer--empty \.cart-drawer__footer\s*\{\s*display:\s*none/);
});
