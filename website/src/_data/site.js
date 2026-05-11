module.exports = {
  brand: {
    name: "TARA",
    legalName: "TARA Cotton GmbH",
    tagline: "Zeitlose Baumwollkleidung in kuratierten Kapseln",
    locale: "de-DE",
    currency: "EUR"
  },
  company: {
    isFictional: true,
    replacementRequired: true,
    replacementNotice: "Fictional launch prototype data. Replace with verified legal company details before launch.",
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
    freeShippingThreshold: 75,
    freeShippingThresholdLabel: "75 €",
    shippingCarrier: "DHL",
    deliveryWindow: "2-4 Werktage innerhalb Deutschlands",
    returnWindow: "30 Tage kostenlose Retoure",
    withdrawalWindow: "14 Tage gesetzliches Widerrufsrecht",
    taxNotice: "inkl. MwSt.",
    shippingNotice: "zzgl. Versandkosten"
  },
  payments: ["Klarna", "PayPal", "SEPA Lastschrift", "Sofortüberweisung", "Visa", "Mastercard"],
  trust: [
    { label: "Trusted Shops", text: "Siegel vorbereitet" },
    { label: "Verifizierte Bewertungen", text: "Kaufbestätigte Rezensionen" },
    { label: "DHL Versand", text: "Kostenlos ab 75 €" },
    { label: "Kostenlose Retoure", text: "30 Tage Rückgabe" }
  ],
  cookies: {
    storageKey: "tara_cookie_consent",
    categories: [
      { id: "essential", label: "Essenziell", required: true, description: "Notwendig für Warenkorb, Wunschliste, Sicherheit und Cookie-Auswahl." },
      { id: "analytics", label: "Analyse", required: false, description: "Hilft uns, Nutzung und Performance anonymisiert zu verstehen." },
      { id: "marketing", label: "Marketing", required: false, description: "Erlaubt personalisierte Angebote und Kampagnenmessung." }
    ]
  }
};
