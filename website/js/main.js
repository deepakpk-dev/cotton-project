/* TARA — progressively enhanced shopping prototype. No payment or account service. */
document.addEventListener('DOMContentLoaded', () => {
  'use strict';
  const $ = selector => document.querySelector(selector);
  const $$ = selector => [...document.querySelectorAll(selector)];
  const en = document.documentElement.lang.startsWith('en');
  const t = (de, english) => en ? english : de;
  const core = window.TARACommerce;
  let products = window.TARA_PRODUCTS || [];
  try { if (!products.length) products = JSON.parse($('#tara-products')?.textContent || '[]'); } catch { products = []; }
  const name = p => en ? p.nameEn || p.name : p.name;
  const alt = p => en ? p.altEn || p.alt : p.alt;
  const url = p => `${en && !p.url?.startsWith('/en/') ? '/en' : ''}${p.url || '/product/' + p.id + '/'}`;
  const money = n => new Intl.NumberFormat(en ? 'en-IE' : 'de-DE', {style:'currency',currency:'EUR'}).format(n);
  const escape = value => String(value ?? '').replace(/[&<>"']/g, char => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[char]));
  const read = key => { try { return localStorage.getItem(key); } catch { return null; } };
  const save = (key,value) => { try { localStorage.setItem(key,JSON.stringify(value)); } catch { announce(t('Speichern ist in diesem Browser nicht verfügbar. Ihre Auswahl bleibt bis zum Neuladen erhalten.','Storage is unavailable in this browser. Your selection lasts until this page reloads.')); } };
  const live = document.createElement('p'); live.className='sr-only'; live.setAttribute('role','status'); live.setAttribute('aria-live','polite'); document.body.append(live);
  function announce(message) { live.textContent=message; }

  // One modal lifecycle shared by drawers, search, consent and inspection views.
  let active = null, returnFocus = null, inertElements = [], oldOverflow='';
  const overlay = $('#cartOverlay');
  const modalIds=['cartDrawer','wishlistDrawer','searchOverlay','mobileMenu','accountDialog','demoCheckoutDialog','galleryDialog'];
  function closeModal(restore=true) {
    if (!active) return;
    active.classList.remove('is-open'); active.hidden=true; active.inert=true; active.setAttribute('aria-hidden','true');
    if (active.tagName==='DIALOG') active.close();
    inertElements.forEach(([el,value]) => {el.inert=value;}); inertElements=[];
    if (overlay) {overlay.classList.remove('is-open');overlay.hidden=true;}
    document.body.style.overflow=oldOverflow;
    $$('[aria-controls="'+active.id+'"]').forEach(el=>el.setAttribute('aria-expanded','false'));
    active=null;
    if (restore && returnFocus?.isConnected) returnFocus.focus();
  }
  function openModal(target, trigger=document.activeElement) {
    const el=typeof target==='string' ? document.getElementById(target) : target;
    if (!el) return;
    const previousReturn=returnFocus;
    const replacing=!!active;
    closeModal(false); active=el; returnFocus=replacing ? previousReturn : trigger;
    oldOverflow=document.body.style.overflow;
    el.hidden=false;el.inert=false;el.removeAttribute('aria-hidden');el.setAttribute('aria-modal','true');el.setAttribute('role','dialog');
    el.classList.add('is-open');
    if (el.tagName==='DIALOG') el.showModal();
    if (overlay && el!==overlay && el.tagName!=='DIALOG') {overlay.hidden=false;overlay.classList.add('is-open');}
    // Inert siblings along the full ancestor chain, including nested dialog layouts.
    let branch=el;
    while (branch.parentElement) {
      [...branch.parentElement.children].filter(node=>node!==branch && node!==overlay && !['SCRIPT','STYLE','LINK'].includes(node.tagName)).forEach(node=>{inertElements.push([node,node.inert]);node.inert=true;});
      branch=branch.parentElement;
      if (branch===document.body) break;
    }
    document.body.style.overflow='hidden';
    $$('[aria-controls="'+el.id+'"]').forEach(node=>node.setAttribute('aria-expanded','true'));
    el.tabIndex=-1;
    (el.querySelector('[autofocus],input:not([disabled]),button:not([disabled]),a[href]') || el).focus();
  }
  window.TARAModal={open:openModal,close:closeModal};
  modalIds.forEach(id=>{const el=document.getElementById(id);if(el){el.hidden=true;el.inert=true;el.setAttribute('aria-hidden','true');el.addEventListener('cancel',e=>{e.preventDefault();closeModal();});}});
  if(overlay){overlay.hidden=true;overlay.addEventListener('click',()=>closeModal());}
  document.addEventListener('keydown',e=>{
    if (!active) return;
    if(e.key==='Escape'){e.preventDefault();closeModal();}
    if(e.key==='Tab'){
      const focusable=[...active.querySelectorAll('a[href],button:not([disabled]),input:not([disabled]),select:not([disabled]),textarea:not([disabled]),summary,[tabindex="0"]')].filter(el=>!el.hidden && !el.closest('[hidden]') && el.getClientRects().length);
      const first=focusable[0],last=focusable.at(-1);
      if(!first){e.preventDefault();active.focus();}
      else if(e.shiftKey && (document.activeElement===first || document.activeElement===active)){e.preventDefault();last.focus();}
      else if(!e.shiftKey && document.activeElement===last){e.preventDefault();first.focus();}
    }
  });
  const bindings={cartToggle:'cartDrawer',bottomNavCart:'cartDrawer',wishlistToggle:'wishlistDrawer',bottomNavWishlist:'wishlistDrawer',searchToggle:'searchOverlay',bottomNavSearch:'searchOverlay',menuToggle:'mobileMenu',accountToggle:'accountDialog',bottomNavAccount:'accountDialog'};
  Object.entries(bindings).forEach(([id,modal])=>document.getElementById(id)?.addEventListener('click',e=>{e.preventDefault();openModal(modal,e.currentTarget);}));
  ['cartClose','wishlistClose','searchClose','mobileMenuClose','accountClose','demoCheckoutClose','galleryClose'].forEach(id=>document.getElementById(id)?.addEventListener('click',()=>closeModal()));
  $$('[data-static-feature="account"]').forEach(el=>el.addEventListener('click',()=>openModal('accountDialog')));
  if($('#accountDropdown')) {$('#accountDropdown').hidden=true;$('#accountDropdown').inert=true;}
  $$('.search-overlay').forEach(el=>el.addEventListener('click',e=>{if(e.target===el)closeModal();}));

  if (!core) return;
  let cart=core.restoreCart(read('tara-cart'),products);
  let saved=[];try{saved=JSON.parse(read('tara-wishlist') || '[]');}catch{saved=[];}
  const wishlist=new Set((Array.isArray(saved)?saved:[]).filter(id=>products.some(p=>p.id===id)));
  const colorLabel=(p,token)=>{const c=p.colorOptions?.find(c=>c.token===token);return en ? c?.labelEn || c?.label || token : c?.label || token;};
  function renderCart(){
    const isEmpty=!cart.length;
    $$('.header__cart-count,.bottom-nav__cart-count').forEach(el=>el.textContent=cart.reduce((s,i)=>s+i.quantity,0));
    if($('#cartSubtotal')) $('#cartSubtotal').textContent=money(core.subtotal(cart,products));
    if($('#checkoutButton')) $('#checkoutButton').disabled=isEmpty;
    if($('#cartDrawer')) $('#cartDrawer').classList.toggle('cart-drawer--empty',isEmpty);
    if($('#cartEmptyState')) $('#cartEmptyState').hidden=!isEmpty;
    if(!$('#cartItems'))return;
    $('#cartItems').hidden=isEmpty;
    $('#cartItems').innerHTML=cart.map((item,index)=>{const p=products.find(p=>p.id===item.id);return `<article class="cart-line" data-cart-index="${index}"><a href="${escape(url(p))}"><img class="cart-line__image" src="${escape(p.image)}" alt="${escape(alt(p))}" width="72" height="96"></a><div class="cart-line__details"><a href="${escape(url(p))}"><strong>${escape(name(p))}</strong></a><p>${t('Größe','Size')} ${escape(item.size)} · ${escape(colorLabel(p,item.color))}</p><div class="cart-line__controls"><label class="cart-line__quantity-label"><span>${t('Menge','Quantity')}</span><input class="cart-line__quantity" type="number" min="1" max="10" step="1" value="${item.quantity}" aria-label="${escape(t('Menge für ','Quantity for ')+name(p)+' '+item.size)}"></label><button class="cart-line__remove" type="button" data-remove-cart>${t('Entfernen','Remove')}</button></div></div><span>${money(p.price*item.quantity)}</span></article>`;}).join('');
  }
  $('#cartItems')?.addEventListener('change',e=>{
    if(!e.target.matches('.cart-line__quantity'))return;
    const index=Number(e.target.closest('[data-cart-index]').dataset.cartIndex);
    try{cart=core.setQuantity(cart,cart[index].key,e.target.value);save('tara-cart',cart);renderCart();announce(t('Warenkorb aktualisiert.','Cart updated.'));$('#cartItems')?.querySelectorAll('.cart-line__quantity')[index]?.focus();}
    catch{e.target.value=cart[index].quantity;announce(t('Bitte wählen Sie eine Menge von 1 bis 10.','Choose a quantity from 1 to 10.'));}
  });
  $('#cartItems')?.addEventListener('click',e=>{if(!e.target.closest('[data-remove-cart]'))return;const index=Number(e.target.closest('[data-cart-index]').dataset.cartIndex);cart=core.setQuantity(cart,cart[index].key,0);save('tara-cart',cart);renderCart();announce(t('Artikel entfernt.','Item removed.'));($('#cartItems')?.querySelector('[data-remove-cart]') || $('#cartClose'))?.focus();});
  $('#checkoutButton')?.addEventListener('click',()=>{if(cart.length)openModal('demoCheckoutDialog');});
  function updateAddToBagState(form){
    const selectedSize=!!form.querySelector('.size-selector__option.active');
    form.querySelectorAll('.product-info__add-to-cart').forEach(button=>{
      button.disabled=!selectedSize;
      button.textContent=selectedSize?t('In den Warenkorb','Add to bag'):t('Größe wählen','Choose a size');
      button.setAttribute('aria-label',selectedSize?t('In den Warenkorb','Add to bag'):t('Bitte zuerst eine Größe wählen','Choose a size first'));
    });
  }
  $$('.size-selector__option,.product-info__color-swatch').forEach(button=>button.addEventListener('click',()=>{
    if(button.disabled)return;
    const color=button.matches('.product-info__color-swatch');
    const selector=color?'.product-info__color-swatch':'.size-selector__option';
    button.parentElement.querySelectorAll(selector).forEach(el=>{el.classList.toggle('active',el===button);el.setAttribute('aria-pressed',String(el===button));});
    if(color && $('.product-info__colors-label strong'))$('.product-info__colors-label strong').textContent=button.title || button.dataset.color;
    if($('#productSelectionError')) { $('#productSelectionError').textContent=''; $('#productSelectionError').hidden=true; }
    updateAddToBagState(button.closest('.product-info'));
  }));
  $$('.product-info').forEach(updateAddToBagState);
  $$('.qty-btn').forEach(button=>button.addEventListener('click',()=>{const input=button.parentElement.querySelector('.qty-input');if(input)input.value=Math.max(1,Math.min(10,(Number(input.value)||1)+(button.dataset.action==='minus'?-1:1)));}));
  $$('.product-info__add-to-cart').forEach(button=>button.addEventListener('click',e=>{
    e.preventDefault();
    const form=button.closest('[data-product-id].product-info,form') || $('.product-info') || document;
    const p=products.find(p=>p.id===(button.dataset.productId || form.dataset.productId));
    const size=form.querySelector('.size-selector__option.active');const color=form.querySelector('.product-info__color-swatch.active');
    try{cart=core.addItem(cart,p,{size:size?.dataset.size || size?.textContent.trim(),color:color?.dataset.color,quantity:form.querySelector('.qty-input')?.value || 1});save('tara-cart',cart);renderCart();openModal('cartDrawer',button);}
    catch(error){const message=error.message==='size'?t('Bitte wählen Sie eine verfügbare Größe.','Please choose an available size.'):error.message==='color'?t('Bitte wählen Sie eine verfügbare Farbe.','Please choose an available colour.'):t('Pro Variante sind 1 bis 10 Stück möglich.','Choose 1 to 10 items per variant.');if($('#productSelectionError')) { $('#productSelectionError').textContent=message; $('#productSelectionError').hidden=false; }announce(message);if(error.message==='size')form.querySelector('.size-selector__option:not([disabled])')?.focus();}
  }));
  function productResult(p,remove=false){return `<article class="wishlist-line"><a href="${escape(url(p))}"><img src="${escape(p.image)}" alt="${escape(alt(p))}" width="72" height="96" loading="lazy"></a><div><a href="${escape(url(p))}">${escape(name(p))}</a><p>${money(p.price)}</p>${remove?`<button type="button" data-wishlist-remove="${escape(p.id)}">${t('Entfernen','Remove')}</button>`:''}</div></article>`;}
  function renderWishlist(){
    $$('.product-card__wishlist,.product-info__wishlist-btn').forEach(button=>{const id=button.dataset.productId || $('.product-info__add-to-cart')?.dataset.productId;const on=wishlist.has(id);button.classList.toggle('is-active',on);button.setAttribute('aria-pressed',String(on));button.setAttribute('aria-label',on?t('Von Wunschliste entfernen','Remove from wishlist'):t('Zur Wunschliste hinzufügen','Add to wishlist'));button.querySelector('svg')?.setAttribute('fill',on?'var(--color-accent)':'none');});
    if($('#wishlistEmptyState'))$('#wishlistEmptyState').hidden=!!wishlist.size;
    if($('#wishlistItems'))$('#wishlistItems').innerHTML=[...wishlist].map(id=>productResult(products.find(p=>p.id===id),true)).join('');
  }
  document.addEventListener('click',e=>{const button=e.target.closest('.product-card__wishlist,.product-info__wishlist-btn,[data-wishlist-remove]');if(!button)return;e.preventDefault();const id=button.dataset.wishlistRemove || button.dataset.productId || $('.product-info__add-to-cart')?.dataset.productId;if(!products.some(p=>p.id===id))return;wishlist.has(id)?wishlist.delete(id):wishlist.add(id);save('tara-wishlist',[...wishlist]);renderWishlist();announce(t('Wunschliste aktualisiert.','Wishlist updated.'));if(button.dataset.wishlistRemove)($('#wishlistItems button') || $('#wishlistClose'))?.focus();});
  renderCart();renderWishlist();

  // Preserve server-rendered product cards and reorder only this catalog.
  const grid=$('.page-collection .product-grid');
  if(grid){
    const cards=[...grid.querySelectorAll('.product-card')];
    const fields=$$('.filter-bar [name]');const sort=$('.filter-bar__sort');
    const params=new URLSearchParams(location.search);fields.forEach(field=>{if(params.has(field.name))field.value=params.get(field.name);});
    function filter(){
      const filters=Object.fromEntries(fields.map(field=>[field.name,field.value]));filters.sort=sort?.value;
      const found=core.discover(products,filters);const ids=found.map(p=>p.id);
      cards.forEach(card=>{const id=card.dataset.productId || card.querySelector('[data-product-id]')?.dataset.productId;card.hidden=!ids.includes(id);});
      found.forEach(p=>{const card=cards.find(card=>(card.dataset.productId || card.querySelector('[data-product-id]')?.dataset.productId)===p.id);if(card)grid.append(card);});
      if($('.filter-bar__count'))$('.filter-bar__count').textContent=`${found.length} ${t('Stücke','pieces')}`;
      if($('#collectionEmptyState'))$('#collectionEmptyState').hidden=!!found.length;
    }
    fields.forEach(field=>field.addEventListener('input',filter));sort?.addEventListener('change',filter);
    $('#resetFilters')?.addEventListener('click',()=>{fields.forEach(field=>field.value='');if(sort)sort.selectedIndex=0;history.replaceState(null,'',location.pathname+location.hash);filter();});filter();
  }
  function search(){const query=$('#searchInput')?.value.trim() || '';if($('#searchResults'))$('#searchResults').innerHTML=query?(core.discover(products.map(p=>({...p,name:name(p),category:en?p.categoryEn || p.category:p.category})),{query}).map(p=>productResult(p)).join('') || `<p>${t('Keine passenden Stücke. Versuchen Sie einen anderen Suchbegriff.','No matching pieces. Try another search term.')}</p>`):`<p>${t('Suchen Sie nach Name, Kategorie oder Material.','Search by name, category or material.')}</p>`;}
  $('#searchInput')?.addEventListener('input',search);$('.search-overlay__form')?.addEventListener('submit',e=>{e.preventDefault();search();});search();
  $$('.newsletter__form').forEach(form=>form.addEventListener('submit',e=>{e.preventDefault();if(!form.reportValidity())return;let feedback=form.querySelector('[role="status"]');if(!feedback){feedback=document.createElement('p');feedback.setAttribute('role','status');form.append(feedback);}feedback.textContent=t('Dies ist eine Demo. Ihre E-Mail-Adresse wurde nicht gespeichert und kein Abonnement erstellt.','This is a demo. Your email address was not saved and no subscription was created.');}));
  const mainImage=$('#productMainImage');
  const galleryNote=$('.product-gallery > p');
  if(galleryNote && $$('.product-gallery__thumb').length>1)galleryNote.textContent=t('Illustrative Fotografie. Nutzen Sie die Bildauswahl, um Vorder- und Rückansicht zu vergleichen.','Illustrative photography. Use the image selector to compare front and back views.');
  $$('.product-gallery__thumb').forEach(thumb=>thumb.addEventListener('click',()=>{$$('.product-gallery__thumb').forEach(el=>{el.classList.toggle('active',el===thumb);el.setAttribute('aria-pressed',String(el===thumb));});if(mainImage){mainImage.src=thumb.dataset.src || thumb.querySelector('img').src;mainImage.alt=thumb.dataset.alt || thumb.querySelector('img').alt;mainImage.removeAttribute('srcset');mainImage.closest('picture')?.querySelectorAll('source').forEach(source=>source.remove());}}));
  const galleryTrigger=$('#galleryZoom') || $('.product-gallery__main');
  galleryTrigger?.addEventListener('click',()=>{const image=$('#galleryImage');if(image && mainImage){image.src=mainImage.src;image.alt=mainImage.alt;openModal('galleryDialog',galleryTrigger);}});
  // Native details handle Enter/Space and expanded semantics without custom events.
  $$('details.accordion__item').forEach(el=>el.addEventListener('toggle',()=>el.classList.toggle('is-open',el.open)));
  const header=$('#header');window.addEventListener('scroll',()=>header?.classList.toggle('header--scrolled',window.scrollY>50),{passive:true});
  $$('.animate-on-scroll').forEach(el=>el.classList.add('is-visible'));
});
