import type { Product } from "@/types";

export const products: Product[] = [
  {
    id: "kit_essential",
    name: "Essential Wellness Kit",
    slug: "essential-wellness-kit",
    description:
      "2-week starter kit for mild concerns, confidence support, vitality, and low-risk lifestyle-linked wellness needs.",
    longDescription:
      "The Essential Wellness Kit is a 2-week starter designed for men with mild concerns like low energy, nightfall-related anxiety, confidence issues, and vitality gaps. It includes herbal blends for confidence and vitality support plus a nutraceutical mix targeting libido and stamina through clinically studied ingredients. Ideal as a first-step before moving to more targeted pathways.",
    price: 1499,
    mrp: 2199,
    images: ["/images/essential_wellness.png"],
    category: "combo",
    tags: ["starter", "wellness", "new"],
    ingredients:
      "X-Urge Sachet (herbal vitality blend), Eros-X Sachet (herbal confidence blend), Neurom Total Sachets (Yohimbe bark, Ginkgo biloba, Tribulus terrestris, Mucuna pruriens, Hypericum perforatum, L-Arginine, Zinc)",
    howToUse:
      "Take one sachet of each daily as directed. Follow the included lifestyle guidance for sleep, diet, and exercise. Use consistently for the full 2-week duration.",
    inStock: true,
    rating: 4.4,
    reviewCount: 287,
    forSeverity: ["normal", "mild"],
    forCondition: ["libido", "hormonal", "ed", "pe"],
    badge: "Starter",
    kitProducts: [
      {
        code: "XU",
        name: "X-Urge Sachet",
        description: "Herbal vitality support blend.",
        tag: "otc",
      },
      {
        code: "EX",
        name: "Eros-X Sachet",
        description: "Herbal confidence support blend.",
        tag: "otc",
      },
      {
        code: "NT",
        name: "Neurom Total Sachets",
        description: "Supportive nutraceutical for vitality and libido support.",
        components:
          "Yohimbe bark extract, Ginkgo biloba extract, Tribulus terrestris extract, Mucuna pruriens, Hypericum perforatum extract, L-Arginine, Zinc",
        tag: "otc",
      },
    ],
    kitFeatures: [
      "2-week low-risk starter kit",
      "Confidential self-test before purchase",
      "Lifestyle, sleep and diet guidance",
      "Discreet packaging and care support",
    ],
  },
  {
    id: "kit_confidence",
    name: "Confidence Plus Kit",
    slug: "confidence-plus-kit",
    description:
      "2-week kit for ED, PE, mixed ED+PE concerns, performance anxiety, and low libido needing a targeted pathway.",
    longDescription:
      "The Confidence Plus Kit is our most recommended 2-week care package, built for men experiencing erectile issues, premature ejaculation, mixed ED+PE, performance anxiety, or pronounced low libido. It combines timing-support formulations, topical solutions, libido-boosting blends, and — where medically appropriate after doctor review — prescription-pathway items for ED and PE. Doctor review is mandatory for prescription-linked items.",
    price: 1999,
    mrp: 3299,
    images: ["/images/confidence_plus.png"],
    category: "combo",
    tags: ["best-seller", "doctor-recommended", "most-popular"],
    ingredients:
      "EJHold (Hypericum perforatum, Piper longum, Crocus sativus, Butea superba, Turnera diffusa), Solplay Gel (Prilocaine + Lidocaine), Intimizz (Eurycoma longifolia, Mucuna pruriens, Icariin, Tribulus terrestris, Asphaltum, L-Arginine), Dextra Plus (Dapoxetine 30mg + Tadalafil 10mg), Deta-M 5 (Tadalafil 5mg MDT)",
    howToUse:
      "Follow the included 2-week plan. Take oral formulations as directed. Use topical gel 5-10 minutes before activity. Prescription items require doctor approval before use. Our doctor will call you within 48 hours.",
    inStock: true,
    rating: 4.8,
    reviewCount: 567,
    forSeverity: ["mild", "moderate", "severe"],
    forCondition: ["ed", "pe", "libido", "both"],
    badge: "Most Popular",
    kitProducts: [
      {
        code: "EJ",
        name: "EJHold",
        description: "Timing support formulation.",
        components:
          "Hypericum perforatum, Piper longum (piperine), Crocus sativus, Butea superba, Turnera diffusa",
        tag: "otc",
      },
      {
        code: "SG",
        name: "Solplay Gel",
        description: "Topical support option for selected PE pathways.",
        components: "Prilocaine + Lidocaine",
        tag: "otc",
      },
      {
        code: "IZ",
        name: "Intimizz",
        description: "Libido, stamina and intimacy support blend.",
        components:
          "Eurycoma longifolia, Mucuna pruriens, Icariin, Tribulus terrestris, Asphaltum, L-Arginine",
        tag: "otc",
      },
      {
        code: "DX",
        name: "Dextra Plus",
        description: "Combined ED + PE prescription pathway item.",
        components: "Dapoxetine 30 mg + Tadalafil 10 mg",
        tag: "rx",
      },
      {
        code: "DM5",
        name: "Deta-M 5",
        description: "ED support for selected suitable patients only.",
        components: "Tadalafil 5 mg mouth-dissolving tablet",
        tag: "rx",
      },
    ],
    kitFeatures: [
      "2-week curated confidence kit",
      "Detailed ED, PE and libido questionnaire",
      "Doctor review for prescription-linked items",
      "Follow-up support and plan adjustment",
    ],
  },
  {
    id: "kit_complete",
    name: "Complete Men's Health Kit",
    slug: "complete-mens-health-kit",
    description:
      "2-week advanced kit for complex ED, low libido, fertility support, testosterone symptoms, and prior treatment failure.",
    longDescription:
      "The Complete Men's Health Kit is our most comprehensive 2-week care package, designed for men with complex erectile dysfunction, pronounced low libido, fertility concerns, testosterone-related symptoms, diabetes-related sexual issues, or those who haven't responded to previous treatments. It includes higher-strength ED routes, aphrodisiac support, antioxidant and fertility blends, testosterone support, and advanced wellness formulations. Full PMH and doctor review are mandatory.",
    price: 2999,
    mrp: 4999,
    images: ["/images/complete_mens_health.png"],
    category: "combo",
    tags: ["premium", "doctor-recommended", "comprehensive"],
    ingredients:
      "Deta-M 10 (Tadalafil 10mg MDT), Yohi-M 6 (Yohimbine bark extract), Bloom Max (L-Carnitine, CoQ10, Zinc, Astaxanthin, Lycopene, Selenium), EDM 12 (Withania somnifera + Fenugreek extract), Anteros-X (Erythroxylum 500mg)",
    howToUse:
      "This is an advanced-review kit. Doctor consultation is mandatory before starting. Follow the personalized plan discussed during your doctor call. Report uploads for fertility, hormone, and metabolic files are supported.",
    inStock: true,
    rating: 4.7,
    reviewCount: 156,
    forSeverity: ["moderate", "severe"],
    forCondition: ["ed", "libido", "hormonal", "infertility", "both"],
    badge: "Premium",
    kitProducts: [
      {
        code: "D10",
        name: "Deta-M 10",
        description: "Higher-strength ED route after screening.",
        components: "Tadalafil mouth-dissolving tablets 10 mg",
        tag: "rx",
      },
      {
        code: "YM6",
        name: "Yohi-M 6",
        description: "Aphrodisiac support mapped to selected libido pathways.",
        components: "Yohimbine bark extract",
        tag: "review",
      },
      {
        code: "BM",
        name: "Bloom Max",
        description: "Antioxidant and fertility-support blend.",
        components: "L-Carnitine, CoQ10, Zinc, Astaxanthin, Lycopene, Selenium",
        tag: "otc",
      },
      {
        code: "ED12",
        name: "EDM 12",
        description: "Testosterone and libido support-style formulation.",
        components: "Withania somnifera + Fenugreek extract",
        tag: "otc",
      },
      {
        code: "AX",
        name: "Anteros-X",
        description: "Advanced wellness support for selected higher-tier routes.",
        components: "Erythroxylum 500 mg",
        tag: "review",
      },
    ],
    kitFeatures: [
      "2-week advanced review kit",
      "Full PMH, medicines and allergy review",
      "Report upload support for fertility, hormone and metabolic files",
      "Priority coordination with doctor review workflow",
    ],
  },
];

export function getProductBySlug(slug: string): Product | undefined {
  return products.find((p) => p.slug === slug);
}

export function getProductsByCategory(category: string): Product[] {
  if (category === "all") return products;
  return products.filter((p) => p.category === category);
}

export function getRecommendedProducts(
  condition: string,
  severity: string
): Product[] {
  const matched = products.filter(
    (p) =>
      p.forCondition.includes(condition) && p.forSeverity.includes(severity)
  );
  // If no exact match, return essential kit as fallback
  if (matched.length === 0) {
    return products.filter((p) => p.id === "kit_essential");
  }
  return matched;
}

/**
 * Returns the single best-fit kit based on condition and severity.
 * Used by results page for primary recommendation.
 */
export function getRecommendedKit(
  condition: string,
  severity: string
): Product {
  if (severity === "severe") {
    return products.find((p) => p.id === "kit_complete")!;
  }
  if (severity === "moderate") {
    return products.find((p) => p.id === "kit_confidence")!;
  }
  // For mild / normal — check if condition is complex
  if (["infertility", "hormonal"].includes(condition)) {
    return products.find((p) => p.id === "kit_complete")!;
  }
  if (["ed", "pe", "both"].includes(condition)) {
    return products.find((p) => p.id === "kit_confidence")!;
  }
  return products.find((p) => p.id === "kit_essential")!;
}
