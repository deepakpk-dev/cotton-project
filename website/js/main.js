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

  // Close cart on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      closeCart();
      closeMobileMenu();
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
