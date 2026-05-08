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
