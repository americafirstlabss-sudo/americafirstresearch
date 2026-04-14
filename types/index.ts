export type ProductCategory = "peptides" | "research-kits" | "support" | "merch";

export type Product = {
  id: string;
  slug: string;
  name: string;
  category: ProductCategory;
  kind: "compound" | "merch";
  price: number;
  compareAtPrice?: number;
  image: string;
  gallery: string[];
  shortSummary: string;
  description: string;
  dosage: string;
  sizeOptions: string[];
  variantPrices?: Record<string, number>;
  variantFormats?: Record<string, string>;
  badges: string[];
  details: string[];
  technical: {
    purity: string;
    format: string;
    storage: string;
    sku: string;
  };
  featured?: boolean;
  bestSeller?: boolean;
  stock: number;
};

export type Review = {
  name: string;
  role: string;
  quote: string;
};
