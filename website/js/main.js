/* ============================================
   TARA — Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {

  // ---- Sticky Header with scroll effect ----
  const header = document.getElementById('header');
  if (header) {
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const currentScroll = window.scrollY;
      if (currentScroll > 50) {
        header.classList.add('header--scrolled');
      } else {
        header.classList.remove('header--scrolled');
      }
      lastScroll = currentScroll;
    }, { passive: true });
  }

  // ---- Cart Drawer ----
  const cartToggle = document.getElementById('cartToggle');
  const cartDrawer = document.getElementById('cartDrawer');
  const cartOverlay = document.getElementById('cartOverlay');
  const cartClose = document.getElementById('cartClose');
  const bottomNavCart = document.getElementById('bottomNavCart');

  function openCart(e) {
    if (e) e.preventDefault();
    cartDrawer?.classList.add('is-open');
    cartOverlay?.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeCart() {
    cartDrawer?.classList.remove('is-open');
    cartOverlay?.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  cartToggle?.addEventListener('click', openCart);
  bottomNavCart?.addEventListener('click', openCart);
  cartClose?.addEventListener('click', closeCart);
  cartOverlay?.addEventListener('click', closeCart);

  const cartState = {
    items: JSON.parse(localStorage.getItem('tara-cart') || '[]')
  };

  function formatEuro(value) {
    return new Intl.NumberFormat('de-DE', { style: 'currency', currency: 'EUR' }).format(value);
  }

  function saveCart() {
    localStorage.setItem('tara-cart', JSON.stringify(cartState.items));
  }

  function renderCart() {
    const cartItems = document.getElementById('cartItems');
    const cartEmptyState = document.getElementById('cartEmptyState');
    const cartSubtotal = document.getElementById('cartSubtotal');
    const count = cartState.items.reduce((sum, item) => sum + item.quantity, 0);
    const subtotal = cartState.items.reduce((sum, item) => sum + item.price * item.quantity, 0);

    document.querySelectorAll('.header__cart-count, .bottom-nav__cart-count').forEach(el => {
      el.textContent = String(count);
    });

    if (cartSubtotal) cartSubtotal.textContent = formatEuro(subtotal);
    if (!cartItems || !cartEmptyState) return;

    cartEmptyState.hidden = cartState.items.length > 0;
    cartItems.hidden = cartState.items.length === 0;
    cartItems.innerHTML = cartState.items.map(item => `
      <div class="cart-line">
        <div>
          <strong>${item.name}</strong>
          <span>Menge ${item.quantity}</span>
        </div>
        <span>${formatEuro(item.price * item.quantity)}</span>
      </div>
    `).join('');
  }

  document.querySelectorAll('.product-info__add-to-cart').forEach(button => {
    button.addEventListener('click', () => {
      const id = button.dataset.productId;
      const name = button.dataset.productName;
      const price = Number(button.dataset.productPrice);
      const existing = cartState.items.find(item => item.id === id);
      if (existing) {
        existing.quantity += 1;
      } else {
        cartState.items.push({ id, name, price, quantity: 1 });
      }
      saveCart();
      renderCart();
      openCart();
    });
  });

  renderCart();

  // Close cart on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeCart();
      closeMobileMenu();
      closeSearch();
      closeWishlist();
      closeAccount();
    }
  });

  // ---- Search Overlay ----
  const searchToggle = document.getElementById('searchToggle');
  const searchOverlay = document.getElementById('searchOverlay');
  const searchClose = document.getElementById('searchClose');
  const searchInput = document.getElementById('searchInput');

  function openSearch(e) {
    if (e) e.preventDefault();
    searchOverlay?.classList.add('is-open');
    setTimeout(() => searchInput?.focus(), 50);
  }

  function closeSearch() {
    searchOverlay?.classList.remove('is-open');
  }

  searchToggle?.addEventListener('click', openSearch);
  searchClose?.addEventListener('click', closeSearch);

  // Close search when clicking outside
  searchOverlay?.addEventListener('click', (e) => {
    if (e.target === searchOverlay) closeSearch();
  });

  // ---- Account Dropdown ----
  const accountToggle = document.getElementById('accountToggle');
  const accountDropdown = document.getElementById('accountDropdown');

  function openAccount() {
    accountDropdown?.classList.add('is-open');
    accountToggle?.setAttribute('aria-expanded', 'true');
  }

  function closeAccount() {
    accountDropdown?.classList.remove('is-open');
    accountToggle?.setAttribute('aria-expanded', 'false');
  }

  accountToggle?.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = accountDropdown?.classList.contains('is-open');
    isOpen ? closeAccount() : openAccount();
  });

  // Close account dropdown when clicking outside
  document.addEventListener('click', (e) => {
    if (!accountToggle?.contains(e.target) && !accountDropdown?.contains(e.target)) {
      closeAccount();
    }
  });

  // ---- Wishlist Drawer ----
  const wishlistToggle = document.getElementById('wishlistToggle');
  const wishlistDrawer = document.getElementById('wishlistDrawer');
  const wishlistClose = document.getElementById('wishlistClose');

  function openWishlist(e) {
    if (e) e.preventDefault();
    wishlistDrawer?.classList.add('is-open');
    cartOverlay?.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeWishlist() {
    wishlistDrawer?.classList.remove('is-open');
    if (!cartDrawer?.classList.contains('is-open')) {
      cartOverlay?.classList.remove('is-open');
      document.body.style.overflow = '';
    }
  }

  wishlistToggle?.addEventListener('click', openWishlist);
  wishlistClose?.addEventListener('click', closeWishlist);

  cartOverlay?.addEventListener('click', () => {
    if (wishlistDrawer?.classList.contains('is-open')) {
      closeWishlist();
    }
  });

  // ---- Mobile Menu ----
  const menuToggle = document.getElementById('menuToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const mobileMenuClose = document.getElementById('mobileMenuClose');

  function openMobileMenu() {
    mobileMenu?.classList.add('is-open');
    cartOverlay?.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    mobileMenu?.classList.remove('is-open');
    if (!cartDrawer?.classList.contains('is-open')) {
      cartOverlay?.classList.remove('is-open');
      document.body.style.overflow = '';
    }
  }

  menuToggle?.addEventListener('click', openMobileMenu);
  mobileMenuClose?.addEventListener('click', closeMobileMenu);

  // Close mobile menu when clicking overlay (only if cart is not open)
  cartOverlay?.addEventListener('click', () => {
    if (mobileMenu?.classList.contains('is-open')) {
      closeMobileMenu();
    }
  });

  // ---- Cookie Banner ----
  const cookieBanner = document.getElementById('cookieBanner');
  if (cookieBanner) {
    const cookieAccepted = localStorage.getItem('tara-cookies-accepted');
    if (!cookieAccepted) {
      setTimeout(() => {
        cookieBanner.classList.add('is-visible');
      }, 1500);
    }

    cookieBanner.querySelectorAll('button').forEach(btn => {
      btn.addEventListener('click', () => {
        localStorage.setItem('tara-cookies-accepted', 'true');
      });
    });
  }

  // ---- Scroll Animations (Intersection Observer) ----
  const animatedElements = document.querySelectorAll('.animate-on-scroll');
  if (animatedElements.length > 0 && 'IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px'
    });

    animatedElements.forEach(el => observer.observe(el));
  } else {
    // Fallback: show all elements if IntersectionObserver not supported
    animatedElements.forEach(el => el.classList.add('is-visible'));
  }

  // ---- Language Toggle (DE / EN) ----
  const translations = {
    // Announcement bar
    'Kostenloser Versand ab 75\u20AC \u00A0\u2022\u00A0 Fr\u00FChling/Sommer Kollektion 2026 jetzt entdecken': 'Free shipping from \u20AC75 \u00A0\u2022\u00A0 Spring/Summer Collection 2026 — Discover now',
    // Hero
    'Fr\u00FChling / Sommer 2026': 'Spring / Summer 2026',
    'Eine Hommage an das sanfte Licht der goldenen Stunde. Zeitlose Silhouetten in feinster Baumwolle.': 'An homage to the gentle light of golden hour. Timeless silhouettes in the finest cotton.',
    'Kollektion entdecken': 'Discover the Collection',
    // Collection Story
    'Die Geschichte': 'The Story',
    'Inspiriert von der Leichtigkeit des Seins': 'Inspired by the Lightness of Being',
    'Mehr erfahren': 'Learn More',
    // Product Grid
    'Ausgew\u00E4hlte St\u00FCcke': 'Selected Pieces',
    'Unsere Favoriten der aktuellen Kollektion': 'Our favourites from the current collection',
    'Alle St\u00FCcke ansehen': 'View All Pieces',
    // Values Strip
    '100% Baumwolle': '100% Cotton',
    'Premium Bio-Qualit\u00E4t': 'Premium Organic Quality',
    'OEKO-TEX\u00AE zertifiziert': 'OEKO-TEX\u00AE Certified',
    'Schadstoffgepr\u00FCft': 'Tested for Harmful Substances',
    'Kostenloser Versand': 'Free Shipping',
    'Ab 75\u20AC Bestellwert': 'On orders over \u20AC75',
    '30 Tage R\u00FCckgabe': '30-Day Returns',
    'Kostenlose Retoure': 'Free Returns',
    // Second Editorial
    'Unsere Materialien': 'Our Materials',
    'Baumwolle, die man f\u00FChlen kann': 'Cotton You Can Feel',
    'Mehr \u00FCber unsere Stoffe': 'More About Our Fabrics',
    // Social Proof
    'So tragen Sie unsere St\u00FCcke': 'How You Wear Our Pieces',
    'Teilen Sie Ihren Look mit #TARAwomen': 'Share your look with #TARAwomen',
    // Newsletter
    '10% auf Ihre erste Bestellung': '10% Off Your First Order',
    'Anmelden': 'Subscribe',
    // Footer headings
    'Shop': 'Shop',
    '\u00DCber uns': 'About Us',
    'Kundenservice': 'Customer Service',
    'Neue Kollektion': 'New Collection',
    'Kleider': 'Dresses',
    'Blusen & Tops': 'Blouses & Tops',
    'Hosen': 'Trousers',
    'Strickwaren': 'Knitwear',
    'Alle Produkte': 'All Products',
    'Unsere Geschichte': 'Our Story',
    'Materialien & Nachhaltigkeit': 'Materials & Sustainability',
    'Journal': 'Journal',
    'Karriere': 'Careers',
    'Kontakt': 'Contact',
    'Gr\u00F6\u00DFenberatung': 'Size Guide',
    'Versand & Lieferung': 'Shipping & Delivery',
    'R\u00FCckgabe & Umtausch': 'Returns & Exchange',
    'FAQ': 'FAQ',
    // Nav
    'Kollektionen': 'Collections',
    'Materialien': 'Materials',
    'Lookbook': 'Lookbook',
    '\u00DCber uns': 'About Us',
    'Nachhaltigkeit': 'Sustainability',
    // Mobile menu
    'Deutsch': 'German',
    'English': 'English',
    // Bottom nav
    'Start': 'Home',
    'Wunschliste': 'Wishlist',
    'Warenkorb': 'Cart',
    'Konto': 'Account',
  };

  // Build reverse map
  const reverseTranslations = {};
  for (const [de, en] of Object.entries(translations)) {
    reverseTranslations[en] = de;
  }

  let currentLang = 'de';

  function setLanguage(lang) {
    if (lang === currentLang) return;
    currentLang = lang;

    const map = lang === 'en' ? translations : reverseTranslations;

    // Update all text nodes in the page body
    const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
    while (walker.nextNode()) {
      const node = walker.currentNode;
      const trimmed = node.textContent.trim();
      if (trimmed && map[trimmed]) {
        node.textContent = node.textContent.replace(trimmed, map[trimmed]);
      }
    }

    // Update placeholder attributes
    const emailInputs = document.querySelectorAll('.newsletter__input');
    emailInputs.forEach(input => {
      input.placeholder = lang === 'en' ? 'Your email address' : 'Ihre E-Mail-Adresse';
    });

    const searchInputEl = document.getElementById('searchInput');
    if (searchInputEl) {
      searchInputEl.placeholder = lang === 'en' ? 'Search for products\u2026' : 'Suchen Sie nach Produkten\u2026';
    }

    // Update active state on lang toggles
    document.querySelectorAll('.header__lang-toggle a').forEach(a => {
      a.classList.toggle('active', a.textContent.trim() === lang.toUpperCase());
    });
    document.querySelectorAll('.mobile-menu__lang a').forEach(a => {
      const isDE = a.textContent.trim() === 'Deutsch' || a.textContent.trim() === 'German';
      const isEN = a.textContent.trim() === 'English';
      a.classList.toggle('active', (lang === 'de' && isDE) || (lang === 'en' && isEN));
    });

    // Update html lang attribute
    document.documentElement.lang = lang;
  }

  // Desktop lang toggle
  document.querySelectorAll('.header__lang-toggle a').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const lang = a.textContent.trim().toLowerCase();
      setLanguage(lang);
    });
  });

  // Mobile lang toggle
  document.querySelectorAll('.mobile-menu__lang a').forEach(a => {
    a.addEventListener('click', (e) => {
      e.preventDefault();
      const text = a.textContent.trim();
      const lang = (text === 'Deutsch' || text === 'German') ? 'de' : 'en';
      setLanguage(lang);
    });
  });

  // ---- Product Card Wishlist Toggle ----
  document.querySelectorAll('.product-card__wishlist').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const svg = btn.querySelector('svg');
      const isFilled = svg.getAttribute('fill') !== 'none';
      if (isFilled) {
        svg.setAttribute('fill', 'none');
        svg.setAttribute('stroke', 'var(--color-heading)');
      } else {
        svg.setAttribute('fill', '#C4A08A');
        svg.setAttribute('stroke', '#C4A08A');
      }
    });
  });

  // ---- Product Page: Image Gallery ----
  const mainImage = document.getElementById('productMainImage');
  const thumbnails = document.querySelectorAll('.product-gallery__thumb');

  thumbnails.forEach(thumb => {
    thumb.addEventListener('click', () => {
      thumbnails.forEach(t => t.classList.remove('active'));
      thumb.classList.add('active');
      if (mainImage) {
        mainImage.src = thumb.dataset.src || thumb.querySelector('img')?.src;
        mainImage.alt = thumb.dataset.alt || '';
      }
    });
  });

  // ---- Product Page: Size Selection ----
  document.querySelectorAll('.size-selector__option').forEach(option => {
    option.addEventListener('click', () => {
      const parent = option.closest('.size-selector');
      parent.querySelectorAll('.size-selector__option').forEach(o => o.classList.remove('active'));
      option.classList.add('active');
    });
  });

  // ---- Product Page: Accordion ----
  document.querySelectorAll('.accordion__header').forEach(header => {
    header.addEventListener('click', () => {
      const item = header.parentElement;
      const isOpen = item.classList.contains('is-open');

      // Close all accordions in same group
      item.parentElement.querySelectorAll('.accordion__item').forEach(i => {
        i.classList.remove('is-open');
      });

      // Toggle clicked one
      if (!isOpen) {
        item.classList.add('is-open');
      }
    });
  });

  // ---- Product Page: Quantity Selector ----
  document.querySelectorAll('.qty-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const input = btn.parentElement.querySelector('.qty-input');
      if (!input) return;
      let val = parseInt(input.value) || 1;
      if (btn.dataset.action === 'minus' && val > 1) val--;
      if (btn.dataset.action === 'plus' && val < 10) val++;
      input.value = val;
    });
  });

});
