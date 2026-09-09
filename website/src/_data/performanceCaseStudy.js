const formatEuro = (value) => new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "EUR",
  maximumFractionDigits: 0
}).format(value);

const rawCampaigns = [
  {
    id: "meta-product-proof",
    channel: "Meta",
    funnelStage: "Prospecting",
    creative: "Product proof",
    purpose: "Build confidence through fabric, fit, delivery, and returns proof.",
    metrics: { spend: 4200, impressions: 380000, clicks: 5206, purchases: 74, revenue: 7920 }
  },
  {
    id: "meta-capsule-styling",
    channel: "Meta",
    funnelStage: "Prospecting",
    creative: "Capsule styling",
    purpose: "Show one collection as multiple wearable, everyday outfits.",
    metrics: { spend: 3600, impressions: 270000, clicks: 4050, purchases: 82, revenue: 9020 }
  },
  {
    id: "pinterest-collection-discovery",
    channel: "Pinterest",
    funnelStage: "Discovery",
    creative: "Collection discovery",
    purpose: "Reach high-intent visual planners with evergreen collection imagery.",
    metrics: { spend: 1800, impressions: 180000, clicks: 2340, purchases: 28, revenue: 2700 }
  },
  {
    id: "meta-dynamic-retargeting",
    channel: "Meta",
    funnelStage: "Retargeting",
    creative: "Dynamic retargeting",
    purpose: "Reintroduce viewed products with delivery, payment, and returns reassurance.",
    metrics: { spend: 1500, impressions: 75000, clicks: 1800, purchases: 60, revenue: 6720 }
  },
  {
    id: "display-dynamic-retargeting",
    channel: "Display",
    funnelStage: "Retargeting",
    creative: "Dynamic retargeting",
    purpose: "Maintain efficient consideration among product viewers and cart users.",
    metrics: { spend: 1100, impressions: 110000, clicks: 990, purchases: 20, revenue: 2040 }
  }
];

const enrichCampaign = (campaign) => {
  const { spend, impressions, clicks, purchases, revenue } = campaign.metrics;

  return {
    ...campaign,
    metrics: {
      ...campaign.metrics,
      spendFormatted: formatEuro(spend),
      revenueFormatted: formatEuro(revenue),
      ctr: `${((clicks / impressions) * 100).toFixed(2)}%`,
      cpc: new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(spend / clicks),
      cpa: new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(spend / purchases),
      roas: `${(revenue / spend).toFixed(2)}x`
    }
  };
};

const campaigns = rawCampaigns.map(enrichCampaign);
const totalMetrics = rawCampaigns.reduce(
  (totals, campaign) => ({
    spend: totals.spend + campaign.metrics.spend,
    impressions: totals.impressions + campaign.metrics.impressions,
    clicks: totals.clicks + campaign.metrics.clicks,
    purchases: totals.purchases + campaign.metrics.purchases,
    revenue: totals.revenue + campaign.metrics.revenue
  }),
  { spend: 0, impressions: 0, clicks: 0, purchases: 0, revenue: 0 }
);

module.exports = {
  disclaimer: "Fictional brand and illustrative data only. No live campaign spend, customer data, or client results are represented.",
  brief: {
    market: "Germany",
    timeframe: "Six-week Spring / Summer collection launch scenario",
    primaryGoal: "Validate efficient first-purchase acquisition without compromising a premium, trust-first brand experience.",
    primaryConversion: "Purchase"
  },
  audiences: [
    {
      name: "Established Quality Seeker",
      age: "35–45",
      need: "Versatile premium basics that simplify getting dressed.",
      message: "A small capsule that works across the week.",
      proof: "Outfit combinations, fabric quality, and practical product detail."
    },
    {
      name: "Quality-led Power Shopper",
      age: "45–60",
      need: "Comfort, confidence in fit, and a low-friction purchase decision.",
      message: "Feel assured in the fit and the fabric.",
      proof: "Size guidance, free returns, delivery expectations, and payment options."
    },
    {
      name: "Warm return visitor",
      age: "All shoppers",
      need: "A timely reason to revisit previously considered products.",
      message: "The pieces you viewed are ready when you are.",
      proof: "Viewed-product reminder, social proof, and shipping reassurance."
    }
  ],
  channelRoles: [
    { stage: "Discovery", channels: "Meta, Pinterest", role: "Introduce the collection and learn which creative angle earns attention." },
    { stage: "Consideration", channels: "Meta, TikTok", role: "Demonstrate styling, fit, material, and customer-reassurance messages." },
    { stage: "Conversion", channels: "Meta retargeting, dynamic display", role: "Bring product viewers and cart users back to a relevant product or collection." },
    { stage: "Retention", channels: "Email / newsletter", role: "Turn the existing first-order offer into a measurable first-party audience." }
  ],
  creativeAngles: [
    { title: "Capsule styling", description: "Three ways to wear one piece, turning editorial imagery into a practical outfit decision." },
    { title: "Product proof", description: "Fabric texture, fit, sizing, delivery, and returns: the information that reduces hesitation." },
    { title: "Soft editorial", description: "The brand's existing warm, premium visual language, used to introduce the collection." },
    { title: "Trust-led", description: "GOTS and OEKO-TEX claims, DHL delivery, free returns, and familiar payment options." }
  ],
  experiments: [
    {
      hypothesis: "Capsule-styling creative will produce a lower CPA than editorial-only creative for cold Meta audiences.",
      variable: "Creative concept",
      constant: "Audience, budget, landing page, purchase optimisation event",
      decisionRule: "Review after 50 purchases per variant; prefer the lower CPA when product-page quality signals remain healthy."
    },
    {
      hypothesis: "Surfacing fit, returns, and delivery reassurance earlier on the product page will increase add-to-cart rate.",
      variable: "Product-page reassurance placement",
      constant: "Traffic source, product, price, and offer",
      decisionRule: "Keep the variation only if add-to-cart rate improves without reducing purchase conversion."
    },
    {
      hypothesis: "A 7-day retargeting window needs different messaging from an 8–30 day return-visitor window.",
      variable: "Recency and message",
      constant: "Product feed, optimisation event, and frequency cap",
      decisionRule: "Compare CPA, ROAS, and frequency before reallocating retargeting budget."
    }
  ],
  campaigns,
  totals: {
    ...totalMetrics,
    spendFormatted: formatEuro(totalMetrics.spend),
    revenueFormatted: formatEuro(totalMetrics.revenue),
    cpa: new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(totalMetrics.spend / totalMetrics.purchases),
    roas: `${(totalMetrics.revenue / totalMetrics.spend).toFixed(2)}x`
  },
  optimisationDecisions: [
    "Shift part of the prospecting budget towards capsule-styling creative after its lower illustrative CPA.",
    "Retain dynamic retargeting while excluding recent purchasers and monitoring frequency carefully.",
    "Keep Pinterest as a learning channel, assessing creative signals and assisted conversion alongside last-click ROAS.",
    "Test product-page reassurance above the fold: fit, delivery window, free returns, and payment methods."
  ]
};
