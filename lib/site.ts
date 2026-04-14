import { Product, Review } from "@/types";

export const siteConfig = {
  name: "America First Labs",
  shortName: "America First",
  description:
    "Premium peptide storefront with a dark luxury scientific identity, built for high-trust research product ecommerce.",
  email: "americafirstlabs@proton.me",
  phone: "(800) 555-0137"
};

export const navigation = [
  { href: "/collections", label: "Shop" },
  { href: "/merch", label: "Merch" },
  { href: "/consulting", label: "MD Consulting" },
  { href: "/coa", label: "COA" },
  { href: "/faq", label: "FAQ" },
  { href: "/contact", label: "Contact" }
];

export const collections = [
  {
    slug: "peptides",
    name: "Signature Compounds",
    eyebrow: "Research Catalog",
    description: "Purity-led compounds engineered for credible, performance-focused presentation."
  },
  {
    slug: "research-kits",
    name: "Protocol Stacks",
    eyebrow: "Structured Bundles",
    description: "High-conviction stacks designed to improve average order value and discovery."
  },
  {
    slug: "support",
    name: "Lab Support",
    eyebrow: "Fulfillment Essentials",
    description: "Supportive supplies and workflow accessories."
  },
  {
    slug: "merch",
    name: "Black Label Merch",
    eyebrow: "Brand Capsule",
    description: "Branded apparel and accessories with the same premium language as the storefront."
  }
];

const catalogImages = {
  bpc: "https://cdn.shopify.com/s/files/1/0794/0967/6521/files/bpc_559fde41-8aa2-49b1-a164-746f97b66af8.png?v=1774485831",
  ghk: "https://cdn.shopify.com/s/files/1/0794/0967/6521/files/Ghkcu_e1a80ce4-6f2d-4041-8aad-136ee7bec2ec.png?v=1774485677",
  tesa: "https://cdn.shopify.com/s/files/1/0794/0967/6521/files/Image_37.jpg?v=1774491949",
  glow: "https://cdn.shopify.com/s/files/1/0794/0967/6521/files/gllow.png?v=1774486534",
  vialA: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80",
  vialB: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1200&q=80",
  vialC: "https://images.unsplash.com/photo-1628771065518-0d82f1938462?auto=format&fit=crop&w=1200&q=80",
  vialD: "https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1200&q=80",
  support: "https://cdn.shopify.com/s/files/1/0794/0967/6521/files/Image_38.jpg?v=1774491923",
  merch: "https://cdn.shopify.com/s/files/1/0794/0967/6521/files/blackfront.png?v=1775496328"
};

function createProduct({
  slug,
  name,
  price,
  category = "peptides",
  image = catalogImages.vialA,
  dosage = "Research vial",
  sizeOptions = ["5mg", "10mg"],
  purity = "Third-party verified",
  featured = false,
  bestSeller = false,
  stock = 24,
  variantPrices,
  variantFormats,
  details,
  badges
}: {
  slug: string;
  name: string;
  price: number;
  category?: Product["category"];
  image?: string;
  dosage?: string;
  sizeOptions?: string[];
  purity?: string;
  featured?: boolean;
  bestSeller?: boolean;
  stock?: number;
  variantPrices?: Record<string, number>;
  variantFormats?: Record<string, string>;
  details?: string[];
  badges?: string[];
}): Product {
  const options = variantPrices ? Object.keys(variantPrices) : sizeOptions;
  return {
    id: `prod-${slug}`,
    slug,
    name,
    category,
    kind: "compound",
    price,
    compareAtPrice: Math.round((price + 10) * 100) / 100,
    image,
    gallery: [image, catalogImages.vialB],
    shortSummary: `${name} presented with premium scientific branding, clean hierarchy, and high-trust research-use messaging.`,
    description: `${name} is positioned for scientific research and development with a premium clinical layout, strong trust cues, and clear technical presentation.`,
    dosage,
    sizeOptions: options,
    variantPrices,
    variantFormats,
    badges: badges ?? ["3rd Party Tested", "Research Use Only", "Secure Checkout"],
    details: details ?? ["COA-ready documentation", "Purity-focused presentation", "Fast domestic fulfillment cues"],
    technical: {
      purity,
      format: category === "support" ? "Support product" : "Research compound",
      storage: "Store according to product guidance in a cool, dry environment",
      sku: `AFL-${slug.toUpperCase().replace(/[^A-Z0-9]/g, "").slice(0, 10)}`
    },
    featured,
    bestSeller,
    stock
  };
}

export const products: Product[] = [
  createProduct({
    slug: "3glp",
    name: "3GLP",
    price: 120,
    category: "research-kits",
    image: "https://cdn.shopify.com/s/files/1/0794/0967/6521/files/Image_34.jpg?v=1774491842",
    dosage: "Multi-compound protocol set",
    sizeOptions: ["Default"],
    purity: "Batch specific",
    stock: 12
  }),
  createProduct({
    slug: "bac-water",
    name: "BAC Water",
    price: 24,
    category: "support",
    image: catalogImages.support,
    dosage: "10ml sterile solution",
    sizeOptions: ["Default"],
    purity: "Sterile prep",
    stock: 120,
    details: ["Accessory-focused PDP", "Simple variant selection", "Cart add-on placement"],
    badges: ["Sterile", "Lab Supply", "Ships Fast"]
  }),
  createProduct({
    slug: "bpc-157",
    name: "BPC-157",
    price: 38,
    image: catalogImages.bpc,
    dosage: "10mg lyophilized vial",
    variantPrices: {
      "10mg": 38,
      "Nasal Spray 10mg": 58,
      "Capsules 60x500mcg": 64
    },
    variantFormats: {
      "10mg": "Vial",
      "Nasal Spray 10mg": "Nasal spray",
      "Capsules 60x500mcg": "Capsules"
    },
    purity: "99.1%",
    featured: true,
    bestSeller: true,
    stock: 74
  }),
  createProduct({
    slug: "bpc-157-tb-500-blend",
    name: "BPC-157 & TB-500 Blend",
    price: 80,
    category: "research-kits",
    image: "https://cdn.shopify.com/s/files/1/0794/0967/6521/files/bpctb_7d283ffe-3574-46f1-a044-93a619bd4068.png?v=1774486138",
    dosage: "Blend vial",
    sizeOptions: ["Default"],
    purity: "Batch specific",
    stock: 28
  }),
  createProduct({
    slug: "cjc-1295-no-dac",
    name: "CJC-1295 NO DAC",
    price: 38,
    image: catalogImages.vialC,
    dosage: "2mg / 5mg research vial",
    sizeOptions: ["Default"],
    purity: "99.0%",
    bestSeller: true,
    stock: 18
  }),
  createProduct({
    slug: "dsip",
    name: "DSIP",
    price: 42,
    image: "https://cdn.shopify.com/s/files/1/0794/0967/6521/files/IMG-3615.png?v=1774550195",
    dosage: "15mg research formula",
    variantPrices: {
      "15mg": 48,
      "Nasal Spray 15mg": 68
    },
    variantFormats: {
      "15mg": "Vial",
      "Nasal Spray 15mg": "Nasal spray"
    },
    stock: 22
  }),
  createProduct({
    slug: "enclomiphene-citrate",
    name: "Enclomiphene Citrate",
    price: 128,
    image: "https://cdn.shopify.com/s/files/1/0794/0967/6521/files/IMG-3602.png?v=1774545938",
    dosage: "30ml solution",
    sizeOptions: ["Default"],
    stock: 20
  }),
  createProduct({
    slug: "fox04-dri",
    name: "FOX04-DRI",
    price: 94,
    image: "https://cdn.shopify.com/s/files/1/0794/0967/6521/files/Fox.png?v=1774485301",
    dosage: "10mg vial",
    sizeOptions: ["Default"],
    stock: 14
  }),
  createProduct({
    slug: "gh-kit-of-10",
    name: "Gh (Kit of 10)",
    price: 200,
    category: "research-kits",
    image: "https://cdn.shopify.com/s/files/1/0794/0967/6521/files/Image_36.jpg?v=1774491905",
    dosage: "Kit of 10 vials",
    sizeOptions: ["Default"],
    purity: "Batch specific",
    stock: 10
  }),
  createProduct({
    slug: "ghk-cu",
    name: "Ghk-cu",
    price: 58,
    image: catalogImages.ghk,
    dosage: "From 50mg research grade",
    variantPrices: {
      "50mg": 58,
      "100mg": 98
    },
    variantFormats: {
      "50mg": "Vial",
      "100mg": "Vial"
    },
    purity: "99.3%",
    featured: true,
    bestSeller: true,
    stock: 46
  }),
  createProduct({
    slug: "glow",
    name: "Glow",
    price: 128,
    category: "research-kits",
    image: catalogImages.glow,
    dosage: "Bundle kit",
    sizeOptions: ["Default"],
    purity: "Batch specific",
    stock: 16
  }),
  createProduct({
    slug: "glp2",
    name: "GLP2",
    price: 138,
    image: "https://cdn.shopify.com/s/files/1/0794/0967/6521/files/IMG-3600.png?v=1774545835",
    dosage: "5mg vial",
    sizeOptions: ["Default"],
    stock: 18
  }),
  createProduct({
    slug: "glutathione",
    name: "Glutathione",
    price: 34,
    image: "https://cdn.shopify.com/s/files/1/0794/0967/6521/files/IMG-3590.png?v=1774545305",
    dosage: "Multi-strength formulation",
    variantPrices: {
      "400mg": 34,
      "600mg": 44,
      "1500mg": 72
    },
    variantFormats: {
      "400mg": "Vial",
      "600mg": "Vial",
      "1500mg": "Vial"
    },
    stock: 25
  }),
  createProduct({
    slug: "hcg",
    name: "HCG",
    price: 68,
    image: "https://cdn.shopify.com/s/files/1/0794/0967/6521/files/Image_51.jpg?v=1774630955",
    dosage: "5000 IU vial",
    sizeOptions: ["Default"],
    stock: 22
  }),
  createProduct({
    slug: "igf1-lr3",
    name: "IGF1-LR3",
    price: 78,
    image: "https://cdn.shopify.com/s/files/1/0794/0967/6521/files/Image_45.jpg?v=1774546945",
    dosage: "1mg vial",
    sizeOptions: ["Default"],
    stock: 18
  }),
  createProduct({
    slug: "ipamorelin",
    name: "Ipamorelin",
    price: 80,
    image: "https://cdn.shopify.com/s/files/1/0794/0967/6521/files/ipa.png?v=1774486189",
    dosage: "5mg vial",
    sizeOptions: ["Default"],
    purity: "98.9%",
    featured: true,
    stock: 32
  }),
  createProduct({
    slug: "klow",
    name: "Klow",
    price: 118,
    category: "research-kits",
    image: "https://cdn.shopify.com/s/files/1/0794/0967/6521/files/Image_41.jpg?v=1774531828",
    dosage: "Bundle kit",
    sizeOptions: ["Default"],
    purity: "Batch specific",
    stock: 14
  }),
  createProduct({
    slug: "kpv",
    name: "KPV",
    price: 50,
    image: "https://cdn.shopify.com/s/files/1/0794/0967/6521/files/KPV_dc064049-3a44-429f-a8d5-23b40cb4e43d.png?v=1774486530",
    dosage: "Research peptide",
    variantPrices: {
      "5mg": 50,
      "10mg": 88
    },
    variantFormats: {
      "5mg": "Vial",
      "10mg": "Vial"
    },
    stock: 24
  }),
  createProduct({
    slug: "melanotan-2",
    name: "Melanotan 2",
    price: 40,
    image: "https://cdn.shopify.com/s/files/1/0794/0967/6521/files/IMG-3609.png?v=1774546524",
    dosage: "10mg research formula",
    variantPrices: {
      "10mg": 40,
      "Nasal Spray 10mg": 58
    },
    variantFormats: {
      "10mg": "Vial",
      "Nasal Spray 10mg": "Nasal spray"
    },
    stock: 26
  }),
  createProduct({
    slug: "methylene-blue",
    name: "Methylene Blue",
    price: 54,
    image: "https://cdn.shopify.com/s/files/1/0794/0967/6521/files/257AC4A3-F5B8-443D-96B4-BFD4A37FB853.png?v=1774545253",
    dosage: "30ml solution",
    sizeOptions: ["Default"],
    stock: 30
  }),
  createProduct({
    slug: "mots-c",
    name: "MOTS-C",
    price: 58,
    image: "https://cdn.shopify.com/s/files/1/0794/0967/6521/files/MOTC_3b32cf1a-b895-41eb-b039-239c17ba5757.png?v=1774486557",
    dosage: "Research peptide",
    variantPrices: {
      "10mg": 58,
      "40mg": 148
    },
    variantFormats: {
      "10mg": "Vial",
      "40mg": "Vial"
    },
    stock: 17
  }),
  createProduct({
    slug: "nad-plus",
    name: "NAD+",
    price: 58,
    image: "https://cdn.shopify.com/s/files/1/0794/0967/6521/files/Image_33.jpg?v=1774491814",
    dosage: "500mg vial",
    sizeOptions: ["Default"],
    stock: 21
  }),
  createProduct({
    slug: "selank",
    name: "Selank",
    price: 90,
    image: "https://cdn.shopify.com/s/files/1/0794/0967/6521/files/sleank.png?v=1774486341",
    dosage: "5mg vial",
    sizeOptions: ["Default"],
    stock: 23
  }),
  createProduct({
    slug: "semax",
    name: "Semax",
    price: 90,
    image: "https://cdn.shopify.com/s/files/1/0794/0967/6521/files/semax.png?v=1774486341",
    dosage: "5mg vial",
    sizeOptions: ["Default"],
    stock: 23
  }),
  createProduct({
    slug: "semax-selank",
    name: "Semax/Selank",
    price: 88,
    category: "research-kits",
    image: "https://cdn.shopify.com/s/files/1/0794/0967/6521/files/Image_43.jpg?v=1774532283",
    dosage: "Dual-format research blend",
    variantPrices: {
      "Semax/Selank Nasal Spray 10mg": 88,
      "Semax Selank 10mg": 98
    },
    variantFormats: {
      "Semax/Selank Nasal Spray 10mg": "Nasal spray",
      "Semax Selank 10mg": "Vial"
    },
    purity: "Batch specific",
    stock: 14
  }),
  createProduct({
    slug: "slu-pp-332",
    name: "SLU-PP-332",
    price: 88,
    image: "https://cdn.shopify.com/s/files/1/0794/0967/6521/files/IMG-3604.png?v=1774546029",
    dosage: "10mg vial",
    sizeOptions: ["Default"],
    stock: 11
  }),
  createProduct({
    slug: "ss-31",
    name: "SS-31",
    price: 58,
    image: "https://cdn.shopify.com/s/files/1/0794/0967/6521/files/9A4F64E3-82FF-4A96-B0F1-DE687FB2C7F9.png?v=1774545650",
    dosage: "10mg vial",
    sizeOptions: ["Default"],
    stock: 16
  }),
  createProduct({
    slug: "tb-500",
    name: "TB-500",
    price: 38,
    image: "https://cdn.shopify.com/s/files/1/0794/0967/6521/files/TB500_5b2774ae-4991-427c-9ecf-f2900ed96fac.png?v=1774484996",
    dosage: "10mg vial",
    sizeOptions: ["Default"],
    stock: 27
  }),
  createProduct({
    slug: "tesa",
    name: "Tesa",
    price: 98,
    category: "research-kits",
    image: catalogImages.tesa,
    dosage: "10mg vial",
    sizeOptions: ["Default"],
    stock: 15
  }),
  createProduct({
    slug: "vip",
    name: "VIP",
    price: 48,
    image: "https://cdn.shopify.com/s/files/1/0794/0967/6521/files/Image_46.jpg?v=1774550879",
    dosage: "Research peptide",
    variantPrices: {
      "5mg": 48,
      "10mg": 88
    },
    variantFormats: {
      "5mg": "Vial",
      "10mg": "Vial"
    },
    stock: 19
  }),
  {
    id: "merch-black-t-shirt",
    slug: "black-t-shirt",
    name: "Black T shirt",
    category: "merch",
    kind: "merch",
    price: 48,
    image: "https://cdn.shopify.com/s/files/1/0794/0967/6521/files/blackfront.png?v=1775496328",
    gallery: [
      "https://cdn.shopify.com/s/files/1/0794/0967/6521/files/blackfront.png?v=1775496328",
      "https://cdn.shopify.com/s/files/1/0794/0967/6521/files/blackback.png?v=1775496332"
    ],
    shortSummary: "Core branded tee imported from your store export.",
    description: "Minimal branded apparel with a clean premium look consistent with the America First Labs identity.",
    dosage: "Cotton tee",
    sizeOptions: ["Default"],
    badges: ["Merch", "Secure Checkout", "Branded Apparel"],
    details: ["Front and back images", "Lifestyle merch catalog item", "Lightweight branded staple"],
    technical: {
      purity: "N/A",
      format: "Apparel",
      storage: "Machine wash cold",
      sku: "AFL-BLACKTEE"
    },
    stock: 0
  },
  {
    id: "merch-white-t-shirt",
    slug: "white-t-shirt",
    name: "White T-shirt",
    category: "merch",
    kind: "merch",
    price: 48,
    image: "https://cdn.shopify.com/s/files/1/0794/0967/6521/files/whitefront.png?v=1775496295",
    gallery: [
      "https://cdn.shopify.com/s/files/1/0794/0967/6521/files/whitefront.png?v=1775496295",
      "https://cdn.shopify.com/s/files/1/0794/0967/6521/files/whiteback.png?v=1775496300"
    ],
    shortSummary: "White branded tee imported from your store export.",
    description: "Premium branded tee for the merch collection, styled to match the dark luxury storefront.",
    dosage: "Cotton tee",
    sizeOptions: ["Default"],
    badges: ["Merch", "Secure Checkout", "Branded Apparel"],
    details: ["Front and back images", "Lifestyle merch catalog item", "Crisp monochrome styling"],
    technical: {
      purity: "N/A",
      format: "Apparel",
      storage: "Machine wash cold",
      sku: "AFL-WHITETEE"
    },
    stock: 0
  },
  {
    id: "merch-black-grey-red-t-shirt",
    slug: "black-grey-red-t-shirt",
    name: "Black/Grey/Red T-shirt",
    category: "merch",
    kind: "merch",
    price: 48,
    image: "https://cdn.shopify.com/s/files/1/0794/0967/6521/files/Image110.jpg?v=1775741363",
    gallery: [
      "https://cdn.shopify.com/s/files/1/0794/0967/6521/files/Image110.jpg?v=1775741363",
      "https://cdn.shopify.com/s/files/1/0794/0967/6521/files/Image110_89e43ad9-82c4-4d35-be94-efd75bb470fc.jpg?v=1775741363",
      "https://cdn.shopify.com/s/files/1/0794/0967/6521/files/Image_112.jpg?v=1775741876",
      "https://cdn.shopify.com/s/files/1/0794/0967/6521/files/Image_112_19aa0491-5f8e-4d12-99be-8e2395549ae9.jpg?v=1775741876"
    ],
    shortSummary: "Multi-tone merch tee imported from your store export.",
    description: "A more graphic branded tee for the merch page with multiple gallery images pulled from your export.",
    dosage: "Cotton tee",
    sizeOptions: ["Default"],
    badges: ["Merch", "Secure Checkout", "Branded Apparel"],
    details: ["Multi-image gallery", "Imported from CSV export", "Merch capsule product"],
    technical: {
      purity: "N/A",
      format: "Apparel",
      storage: "Machine wash cold",
      sku: "AFL-BGRTSHIRT"
    },
    stock: 0
  },
  {
    id: "merch-off-white-blue-t-shirt",
    slug: "off-white-blue-t-shirt",
    name: "Off white/Blue T-shirt",
    category: "merch",
    kind: "merch",
    price: 48,
    image: "https://cdn.shopify.com/s/files/1/0794/0967/6521/files/Image108_2859a104-9521-49ed-b31a-b373305baa46.jpg?v=1775741130",
    gallery: [
      "https://cdn.shopify.com/s/files/1/0794/0967/6521/files/Image108_2859a104-9521-49ed-b31a-b373305baa46.jpg?v=1775741130",
      "https://cdn.shopify.com/s/files/1/0794/0967/6521/files/Image108.jpg?v=1775741039"
    ],
    shortSummary: "Off-white and blue merch tee imported from your store export.",
    description: "Color-variant branded merch piece imported from the CSV and ready for the merch collection.",
    dosage: "Cotton tee",
    sizeOptions: ["Default"],
    badges: ["Merch", "Secure Checkout", "Branded Apparel"],
    details: ["Two gallery images", "Imported from CSV export", "Merch capsule product"],
    technical: {
      purity: "N/A",
      format: "Apparel",
      storage: "Machine wash cold",
      sku: "AFL-OWBTSHIRT"
    },
    stock: 0
  },
  {
    id: "merch-hoodie",
    slug: "black-label-hoodie",
    name: "Black Label Hoodie",
    category: "merch",
    kind: "merch",
    price: 96,
    image: catalogImages.merch,
    gallery: [catalogImages.merch],
    shortSummary: "Heavyweight branded merch with understated luxury-science styling.",
    description: "Merch keeps the brand culturally sticky while maintaining the premium look and feel of the storefront.",
    dosage: "Heavyweight fleece",
    sizeOptions: ["S", "M", "L", "XL"],
    badges: ["Premium Weight", "Limited Capsule", "Secure Checkout"],
    details: ["Branded garment detail", "Variant-aware cart", "High-end capsule drop"],
    technical: {
      purity: "N/A",
      format: "Apparel",
      storage: "Machine wash cold",
      sku: "AETH-HOOD-BLK"
    },
    stock: 28
  }
];

export const reviews: Review[] = [
  {
    name: "D. Mercer",
    role: "Research Buyer",
    quote: "The brand language feels credible and premium, which makes the buying experience far more trustworthy."
  },
  {
    name: "R. Hayes",
    role: "Clinic Operator",
    quote: "Fast shipping, clear COA positioning, and a storefront that looks like a serious modern biotech company."
  },
  {
    name: "A. Porter",
    role: "Performance Lab",
    quote: "The product pages feel polished from hero to checkout, with none of the template feel you usually see in this niche."
  }
];

export const faqs = [
  {
    question: "How is compliance messaging handled?",
    answer: "The storefront includes reusable disclaimer blocks, policy pages, and footer compliance messaging so research-use copy can be updated centrally."
  },
  {
    question: "Can products, orders, and consultation leads be managed in one place?",
    answer: "Yes. Supabase is structured for products, customers, orders, reviews, consultations, discount codes, and admin analytics."
  },
  {
    question: "How does checkout sync into the backend?",
    answer: "Stripe handles payment capture and the webhook route persists order, customer, address, and line-item data into Supabase after successful payment."
  }
];

export const faqDirectory = [
  {
    category: "General",
    icon: "shield",
    items: [
      {
        question: "Are your products legal?",
        answer:
          "Our products are sold for research purposes only and are intended for laboratory and scientific use. Customers are responsible for understanding and complying with their local laws and regulations before purchasing."
      }
    ]
  },
  {
    category: "Products",
    icon: "beaker",
    items: [
      {
        question: "Are these products safe?",
        answer:
          "All products are manufactured with a focus on purity and consistency and undergo third-party testing. However, they are strictly for research use only and not intended for human consumption."
      },
      {
        question: "What are your products used for?",
        answer:
          "Our products are intended for scientific research and development, including laboratory testing, analytical work, and educational purposes."
      },
      {
        question: "How should I store my products?",
        answer:
          "Products should be stored according to recommended guidelines, typically in a cool, dry environment away from direct light. Specific storage instructions may vary by product."
      }
    ]
  },
  {
    category: "Shipping",
    icon: "truck",
    items: [
      {
        question: "How fast do you ship?",
        answer:
          "Orders placed before 12 PM CST Monday through Friday are typically processed and shipped the same day."
      }
    ]
  },
  {
    category: "Payments",
    icon: "credit-card",
    items: [
      {
        question: "What payment methods do you accept?",
        answer:
          "We accept a range of secure payment methods at checkout. Available options will be displayed during the checkout process."
      },
      {
        question: "What is your return or refund policy?",
        answer:
          "Due to the nature of our products, all sales are final. If there is an issue with your order, please contact our support team and we will work to resolve it."
      }
    ]
  },
  {
    category: "Lab Testing",
    icon: "flask",
    items: [
      {
        question: "Do you provide Certificates of Analysis (COAs)?",
        answer:
          "Yes. Every batch is independently tested and comes with a Certificate of Analysis (COA) to ensure quality, purity, and transparency."
      }
    ]
  },
  {
    category: "Support",
    icon: "life-buoy",
    items: [
      {
        question: "How can I contact customer support?",
        answer:
          "You can reach our support team through the contact page or by email. Our team is available during the week with extended availability on weekends."
      }
    ]
  }
];

export const policyPages = [
  { slug: "terms", title: "Terms of Service" },
  { slug: "privacy", title: "Privacy Policy" },
  { slug: "shipping", title: "Shipping Policy" },
  { slug: "refund", title: "Refund Policy" },
  { slug: "disclaimer", title: "Research Disclaimer" }
];
