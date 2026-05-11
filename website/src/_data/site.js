module.exports = {
  brand: {
    name: "TARA",
    legalName: "TARA Cotton GmbH",
    tagline: "Zeitlose Baumwollkleidung in kuratierten Kapseln",
    locale: "de-DE",
    currency: "EUR"
  },
  company: {
    street: "Rue de la Cotonnerie 12",
    postalCode: "20354",
    city: "Hamburg",
    country: "Deutschland",
    phone: "+49 40 2286 4190",
    email: "bonjour@tara-cotton.de",
    managingDirector: "Elise Martin",
    registerCourt: "Amtsgericht Hamburg",
    registerNumber: "HRB 184752",
    vatId: "DE348729615",
    economicId: "48/742/01938"
  },
  commerce: {
    freeShippingThreshold: "75 EUR",
    shippingCarrier: "DHL",
    deliveryWindow: "2-4 Werktage innerhalb Deutschlands",
    returnWindow: "30 Tage kostenlose Retoure",
    withdrawalWindow: "14 Tage gesetzliches Widerrufsrecht",
    taxNotice: "inkl. MwSt.",
    shippingNotice: "zzgl. Versandkosten"
  },
  payments: ["Klarna", "PayPal", "SEPA Lastschrift", "Sofortueberweisung", "Visa", "Mastercard"],
  trust: [
    { label: "Trusted Shops", text: "Siegel vorbereitet" },
    { label: "Verifizierte Bewertungen", text: "Kaufbestaetigte Rezensionen" },
    { label: "DHL Versand", text: "Kostenlos ab 75 EUR" },
    { label: "Kostenlose Retoure", text: "30 Tage Rueckgabe" }
  ],
  cookies: {
    storageKey: "tara_cookie_consent",
    categories: [
      { id: "essential", label: "Essenziell", required: true, description: "Notwendig fuer Warenkorb, Wunschliste, Sicherheit und Cookie-Auswahl." },
      { id: "analytics", label: "Analyse", required: false, description: "Hilft uns, Nutzung und Performance anonymisiert zu verstehen." },
      { id: "marketing", label: "Marketing", required: false, description: "Erlaubt personalisierte Angebote und Kampagnenmessung." }
    ]
  }
};
