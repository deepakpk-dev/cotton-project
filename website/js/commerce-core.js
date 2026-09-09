(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.TARACommerce = api;
})(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';
  const normalize = value => String(value ?? '').normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().trim();
  const colors = product => (product.colors || product.colorOptions || []).map(c => String(typeof c === 'object' ? c.token || c.value || c.name : c));
  function addItem(cart, product, selection) {
    if (!product) throw new Error('product');
    const size = String(selection.size || '');
    const color = String(selection.color || '');
    const quantity = Number(selection.quantity);
    if (!(product.sizes || []).map(String).includes(size)) throw new Error('size');
    if (!colors(product).includes(color)) throw new Error('color');
    if (!Number.isInteger(quantity) || quantity < 1 || quantity > 10) throw new Error('quantity');
    const key = JSON.stringify([product.id, size, color]);
    const existing = cart.find(item => item.key === key);
    if (existing && existing.quantity + quantity > 10) throw new Error('quantity');
    return existing ? cart.map(item => item.key === key ? {...item, quantity:item.quantity+quantity} : item) : [...cart,{key,id:product.id,size,color,quantity}];
  }
  function setQuantity(cart, key, value) {
    const quantity = Number(value);
    if (!Number.isInteger(quantity) || quantity < 0 || quantity > 10) throw new Error('quantity');
    return quantity === 0 ? cart.filter(item => item.key !== key) : cart.map(item => item.key === key ? {...item,quantity} : item);
  }
  function subtotal(cart, products) { return cart.reduce((sum,item) => sum + Math.round((products.find(p=>p.id===item.id)?.price || 0)*100)*item.quantity,0)/100; }
  function restoreCart(raw, products) {
    let rows;
    try { rows=JSON.parse(raw); } catch { return []; }
    if (!Array.isArray(rows)) return [];
    return rows.reduce((cart,item) => { try { return addItem(cart,products.find(p=>p.id===item?.id),item); } catch { return cart; } },[]);
  }
  function discover(products, filters={}) {
    const result=products.filter(p => {
      if (filters.category && normalize(p.category)!==normalize(filters.category) && normalize(p.categoryKey)!==normalize(filters.category)) return false;
      if (filters.size && !(p.sizes||[]).map(String).includes(String(filters.size))) return false;
      if (filters.color && !colors(p).includes(filters.color)) return false;
      if (filters.material && !normalize(p.material).includes(normalize(filters.material))) return false;
      if (filters.minPrice !== '' && filters.minPrice != null && p.price < Number(filters.minPrice)) return false;
      if (filters.maxPrice !== '' && filters.maxPrice != null && p.price > Number(filters.maxPrice)) return false;
      return !filters.query || normalize([p.name,p.category,p.material,...(p.colorOptions||[]).map(c=>c.label)].join(' ')).includes(normalize(filters.query));
    });
    if (filters.sort==='price-asc') result.sort((a,b)=>a.price-b.price);
    if (filters.sort==='price-desc') result.sort((a,b)=>b.price-a.price);
    if (filters.sort==='newest') result.sort((a,b)=>Number(!!b.badge)-Number(!!a.badge));
    return result;
  }
  return {addItem,setQuantity,subtotal,restoreCart,discover,colors};
});
