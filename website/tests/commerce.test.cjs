const { test } = require('node:test');
const assert = require('node:assert/strict');
let core;
try { core = require('../js/commerce-core.js'); } catch { core = {}; }
const dress = { id: 'dress', price: 98, name: 'Dress', sizes: ['38','40'], colors: ['cream','rose'], category: 'dresses', material: 'cotton' };
test('chosen quantity totals correctly and sizes stay separate', () => {
  assert.equal(typeof core.addItem, 'function');
  let cart = core.addItem([], dress, {size:'40',color:'rose',quantity:3});
  assert.equal(core.subtotal(cart, [dress]), 294);
  cart = core.addItem(cart, dress, {size:'38',color:'rose',quantity:1});
  assert.equal(cart.length,2);
  cart = core.addItem(cart, dress, {size:'40',color:'rose',quantity:1});
  assert.equal(cart[0].quantity,4);
});
test('rejects missing or invalid variants and fractional quantity', () => {
  assert.equal(typeof core.addItem, 'function');
  for (const selection of [{size:'',color:'rose',quantity:1},{size:'46',color:'rose',quantity:1},{size:'40',color:'blue',quantity:1},{size:'40',color:'rose',quantity:1.5}]) assert.throws(() => core.addItem([],dress,selection));
});
test('quantity edits and removal update totals', () => {
  assert.equal(typeof core.setQuantity,'function');
  let cart = core.addItem([],dress,{size:'40',color:'rose',quantity:3});
  cart = core.setQuantity(cart,cart[0].key,2);
  assert.equal(core.subtotal(cart,[dress]),196);
  assert.equal(core.setQuantity(cart,cart[0].key,0).length,0);
});
test('restored state drops corrupt or unavailable variants and ignores stored prices', () => {
  assert.equal(typeof core.restoreCart,'function');
  assert.deepEqual(core.restoreCart('{broken',[dress]),[]);
  const cart=core.restoreCart(JSON.stringify([{id:'dress',size:'40',color:'rose',quantity:2,price:1},{id:'missing',size:'40',color:'rose',quantity:1}]),[dress]);
  assert.equal(cart.length,1); assert.equal(core.subtotal(cart,[dress]),196);
});
test('discovery combines filters, accent-insensitive search and price sorting', () => {
  assert.equal(typeof core.discover,'function');
  const products=[dress,{...dress,id:'blouse',name:'Bluse Été',price:68,category:'tops'}];
  assert.equal(core.discover(products,{query:'ete'})[0].id,'blouse');
  assert.equal(core.discover(products,{category:'dresses',size:'40',color:'rose',minPrice:70}).length,1);
  assert.equal(core.discover(products,{size:'46'}).length,0);
  assert.equal(core.discover(products,{sort:'price-asc'})[0].price,68);
});
