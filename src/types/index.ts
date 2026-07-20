export interface Question {
  id: string;
  text: string;
  options: { value: number; label: string }[];
}

export type ConditionKey = "ed" | "pe" | "libido" | "hormonal" | "infertility";

export interface ConditionScore {
  score: number;
  maxScore: number;
  severity: "normal" | "mild" | "moderate" | "severe";
}

export interface AssessmentResult {
  type: string; // condition key or "MULTI"
  conditions: ConditionKey[];
  scores: Partial<Record<ConditionKey, ConditionScore>>;
  // legacy compat
  iief5Score?: number;
  iief5Severity?: string;
  pedtScore?: number;
  pedtSeverity?: string;
  answers: Record<string, number>;
  completedAt: string;
}

export interface KitProduct {
  code: string;
  name: string;
  description: string;
  components?: string;
  tag: "otc" | "rx" | "review";
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  longDescription: string;
  price: number;
  mrp: number;
  images: string[];
  category: "ed" | "pe" | "wellness" | "combo";
  tags: string[];
  ingredients: string;
  howToUse: string;
  inStock: boolean;
  rating: number;
  reviewCount: number;
  forSeverity: string[];
  forCondition: string[];
  badge?: string;
  kitProducts?: KitProduct[];
  kitFeatures?: string[];
}

export interface CartItem {
  product: Product;
  quantity: number;
}
