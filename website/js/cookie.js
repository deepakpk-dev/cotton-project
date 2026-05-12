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

function saveConsent(selection) {
  const consent = {
    essential: true,
    analytics: Boolean(selection.analytics),
    marketing: Boolean(selection.marketing),
    timestamp: new Date().toISOString()
  };
  localStorage.setItem(CONSENT_KEY, JSON.stringify(consent));
  hideBanner();
  document.dispatchEvent(new CustomEvent('tara:consent-updated', { detail: consent }));
}

function hideBanner() {
  document.getElementById('cookieBanner')?.classList.remove('is-visible');
}

function showBanner() {
  document.getElementById('cookieBanner')?.classList.add('is-visible');
}

document.addEventListener('DOMContentLoaded', function() {
  if (!getConsent()) showBanner();

  document.getElementById('cookieAcceptAll')?.addEventListener('click', function() {
    saveConsent({ analytics: true, marketing: true });
  });

  document.getElementById('cookieSaveSelection')?.addEventListener('click', function() {
    saveConsent({
      analytics: document.getElementById('cookieAnalytics')?.checked,
      marketing: document.getElementById('cookieMarketing')?.checked
    });
  });

  document.getElementById('cookieSettingsLink')?.addEventListener('click', function(e) {
    e.preventDefault();
    showBanner();
  });
});
