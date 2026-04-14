export const siteConfig = {
  brand: 'America First Labs',
  shortBrand: 'America First',
  tagline: 'Luxury-science research storefront',
  announcement: 'Scientific Research Use Only. Premium compounds, compliant presentation, and trust-forward design.',
  supportEmail: 'support@americafirstlabs.com',
  supportPhone: '(800) 555-0137',
  instagramHandle: '@americafirstlabs',
  supabaseUrl: 'https://qvzavbjhfbovsxtcixld.supabase.co',
  supabaseAnonKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF2emF2YmpoZmJvdnN4dGNpeGxkIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzYwMTgxMTYsImV4cCI6MjA5MTU5NDExNn0.Rb57P6zGliwk5MVZsBirplw8SVIWbZQhEPxtd5rGK6I',
  analytics: {
    googleAnalyticsId: '',
    metaPixelId: ''
  },
  integrations: {
    wooCommerceApiBase: '',
    wooCommerceConsumerKey: '',
    wooCommerceConsumerSecret: ''
  }
};

export const categories = [
  { slug: 'peptides', name: 'Peptides', description: 'Core research compounds and best-selling sequences.' },
  { slug: 'liquids', name: 'Liquids', description: 'Ready-to-use liquid support products and solutions.' },
  { slug: 'powders', name: 'Powders', description: 'Dry compounds for structured lab workflows.' },
  { slug: 'bundles', name: 'Bundles', description: 'Stacked kits and paired study bundles.' },
  { slug: 'merch', name: 'Merch', description: 'Lifestyle apparel, accessories, and brand goods.' }
];

export const sampleProducts = [
  {
    id: 'prod-bpc-157',
    slug: 'bpc-157',
    name: 'BPC-157',
    category: 'peptides',
    badge: 'Best Seller',
    price: 38,
    compareAtPrice: 48,
    image: 'https://qvzavbjhfbovsxtcixld.supabase.co/storage/v1/object/public/product-images/BPC.png',
    gallery: [
      'https://qvzavbjhfbovsxtcixld.supabase.co/storage/v1/object/public/product-images/BPC.png',
      'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?auto=format&fit=crop&w=1200&q=80'
    ],
    stockStatus: 'In Stock',
    variants: ['5mg', '10mg'],
    description: 'A premium research-use peptide presented with clean compliance language and sharp visual treatment.',
    details: ['Third-party tested lots', 'Cold-pack fulfillment workflow', 'Research use only disclaimer included'],
    reviews: [
      { author: 'D. Mercer', quote: 'Excellent presentation and very clean lab-facing buying experience.' },
      { author: 'R. Hayes', quote: 'Fast processing and easy repeat ordering flow.' }
    ],
    isBestSeller: true,
    isNewArrival: false
  },
  {
    id: 'prod-ghk-cu',
    slug: 'ghk-cu',
    name: 'GHK-Cu',
    category: 'peptides',
    badge: 'Best Seller',
    price: 58,
    compareAtPrice: 68,
    image: 'https://qvzavbjhfbovsxtcixld.supabase.co/storage/v1/object/public/product-images/GHK.png',
    gallery: [
      'https://qvzavbjhfbovsxtcixld.supabase.co/storage/v1/object/public/product-images/GHK.png',
      'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80'
    ],
    stockStatus: 'In Stock',
    variants: ['50mg', '100mg'],
    description: 'Luxury-science product detail layout with strong hierarchy, batch confidence, and variant presentation.',
    details: ['Visible stock and variant selection', 'COA library connection ready', 'Account and reorder flow ready'],
    reviews: [
      { author: 'A. Porter', quote: 'Premium look and easy-to-follow product page.' }
    ],
    isBestSeller: true,
    isNewArrival: true
  },
  {
    id: 'prod-ipamorelin',
    slug: 'ipamorelin',
    name: 'Ipamorelin',
    category: 'peptides',
    badge: 'New Arrival',
    price: 80,
    compareAtPrice: 92,
    image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?auto=format&fit=crop&w=1200&q=80',
      'https://images.unsplash.com/photo-1607619056574-7b8d3ee536b2?auto=format&fit=crop&w=1200&q=80'
    ],
    stockStatus: 'Low Stock',
    variants: ['2mg', '5mg'],
    description: 'Built for premium catalog browsing with mobile-first cart behavior and conversion-focused layout.',
    details: ['High-contrast imagery', 'Modern quantity controls', 'Sticky add-to-cart flow'],
    reviews: [
      { author: 'J. Cole', quote: 'The cart experience feels much more polished than a typical peptide site.' }
    ],
    isBestSeller: true,
    isNewArrival: true
  },
  {
    id: 'prod-cjc-1295',
    slug: 'cjc-1295-no-dac',
    name: 'CJC-1295 NO DAC',
    category: 'peptides',
    badge: 'Core Catalog',
    price: 38,
    compareAtPrice: 46,
    image: 'https://images.unsplash.com/photo-1628771065518-0d82f1938462?auto=format&fit=crop&w=1200&q=80',
    gallery: [
      'https://images.unsplash.com/photo-1628771065518-0d82f1938462?auto=format&fit=crop&w=1200&q=80'
    ],
    stockStatus: 'In Stock',
    variants: ['2mg', '5mg'],
    description: 'Structured for clean repeat purchasing and easy category discovery.',
    details: ['Variant selector ready', 'Batch-led trust cues', 'Fast fulfillment messaging'],
    reviews: [],
    isBestSeller: true,
    isNewArrival: false
  },
  {
    id: 'prod-bac-water',
    slug: 'bac-water',
    name: 'BAC Water',
    category: 'liquids',
    badge: 'Support',
    price: 12,
    compareAtPrice: 16,
    image: 'https://images.unsplash.com/photo-1582719367333-4f3919d6fe6b?auto=format&fit=crop&w=1200&q=80',
    gallery: ['https://images.unsplash.com/photo-1582719367333-4f3919d6fe6b?auto=format&fit=crop&w=1200&q=80'],
    stockStatus: 'In Stock',
    variants: ['10ml'],
    description: 'Support product category example for liquids.',
    details: ['Accessory-support item', 'Cross-sell friendly layout'],
    reviews: [],
    isBestSeller: false,
    isNewArrival: true
  },
  {
    id: 'prod-glow',
    slug: 'glow',
    name: 'Glow',
    category: 'bundles',
    badge: 'Bundle',
    price: 128,
    compareAtPrice: 148,
    image: 'https://qvzavbjhfbovsxtcixld.supabase.co/storage/v1/object/public/product-images/GLOW.png',
    gallery: ['https://qvzavbjhfbovsxtcixld.supabase.co/storage/v1/object/public/product-images/GLOW.png'],
    stockStatus: 'In Stock',
    variants: ['Bundle'],
    description: 'Bundle presentation example for category and collection pages.',
    details: ['Pairing-ready merchandising', 'Bundle pricing placement'],
    reviews: [],
    isBestSeller: false,
    isNewArrival: false
  },
  {
    id: 'prod-tesamorelin',
    slug: 'tesamorelin',
    name: 'Tesamorelin',
    category: 'powders',
    badge: 'Powder',
    price: 98,
    compareAtPrice: 112,
    image: 'https://qvzavbjhfbovsxtcixld.supabase.co/storage/v1/object/public/product-images/Tesa.jpg',
    gallery: ['https://qvzavbjhfbovsxtcixld.supabase.co/storage/v1/object/public/product-images/Tesa.jpg'],
    stockStatus: 'In Stock',
    variants: ['10mg'],
    description: 'Powders category example with premium scientific positioning.',
    details: ['High-contrast card style', 'Category page compatible'],
    reviews: [],
    isBestSeller: false,
    isNewArrival: true
  }
];

export const sampleMerch = [
  { id: 'merch-hoodie', slug: 'afl-core-hoodie', name: 'AFL Core Hoodie', category: 'apparel', price: 68, stockStatus: 'In Stock', variants: ['S', 'M', 'L', 'XL'], image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80', description: 'Heavyweight premium hoodie with America First Labs branding.' },
  { id: 'merch-tee', slug: 'research-dept-tee', name: 'Research Dept. Tee', category: 'apparel', price: 34, stockStatus: 'In Stock', variants: ['S', 'M', 'L', 'XL'], image: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=1200&q=80', description: 'Minimal black tee with luxury-science typography.' },
  { id: 'merch-cap', slug: 'afl-field-cap', name: 'AFL Field Cap', category: 'hats', price: 32, stockStatus: 'In Stock', variants: ['Black'], image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?auto=format&fit=crop&w=1200&q=80', description: 'Lifestyle-oriented cap for merch page storytelling.' },
  { id: 'merch-journal', slug: 'lab-notes-journal', name: 'Lab Notes Journal', category: 'accessories', price: 24, stockStatus: 'In Stock', variants: ['Standard'], image: 'https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=1200&q=80', description: 'Branded desk accessory for the merch collection.' },
  { id: 'merch-bottle', slug: 'afl-utility-bottle', name: 'AFL Utility Bottle', category: 'accessories', price: 28, stockStatus: 'Low Stock', variants: ['Matte Black'], image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?auto=format&fit=crop&w=1200&q=80', description: 'High-end utility bottle with modern finish.' },
  { id: 'merch-crewneck', slug: 'performance-crewneck', name: 'Performance Crewneck', category: 'apparel', price: 58, stockStatus: 'In Stock', variants: ['M', 'L', 'XL'], image: 'https://images.unsplash.com/photo-1503341504253-dff4815485f1?auto=format&fit=crop&w=1200&q=80', description: 'Premium lifestyle layer that keeps the merch page distinct from the research store.' }
];

export const consultingPackages = [
  {
    title: 'MD Strategy Call',
    price: '$99',
    description: 'Entry-level consultation for founders and operators who want clear medical-director guidance.',
    bullets: ['1:1 discovery review', 'Goal and compliance conversation', 'Next-step recommendations']
  },
  {
    title: 'Launch Advisory Sprint',
    price: '$750',
    description: 'Focused consulting package for offer design, positioning, and physician-guided operating structure.',
    bullets: ['Offer architecture', 'Intake and workflow advice', 'Trust/compliance recommendations']
  },
  {
    title: 'Ongoing Medical Advisory',
    price: 'Custom',
    description: 'Retained support for brands that want a premium medical-director consulting relationship.',
    bullets: ['Recurring strategy calls', 'Partner review cadence', 'Growth and operations support']
  }
];

export const labResults = [
  { product: 'BPC-157', batch: 'AFL-BPC-2404', method: 'HPLC / MS', purity: '99.1%', pdf: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
  { product: 'GHK-Cu', batch: 'AFL-GHK-2404', method: 'HPLC / MS', purity: '99.3%', pdf: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
  { product: 'Ipamorelin', batch: 'AFL-IPA-2404', method: 'HPLC / MS', purity: '98.9%', pdf: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' },
  { product: 'CJC-1295 NO DAC', batch: 'AFL-CJC-2404', method: 'HPLC / MS', purity: '99.0%', pdf: 'https://www.w3.org/WAI/ER/tests/xhtml/testfiles/resources/pdf/dummy.pdf' }
];

export const faqGroups = [
  {
    title: 'Products',
    items: [
      { question: 'Are these products for research use only?', answer: 'Yes. The site presents compounds for scientific research use only, with clean compliance language throughout the experience.' },
      { question: 'Do product pages show stock and variants?', answer: 'Yes. Product cards and product detail pages are built to show pricing, variant options, stock status, and cart controls.' },
      { question: 'Can I order multiple products together?', answer: 'Yes. The cart drawer and cart page support multi-item ordering with quantity adjustments and subtotal updates.' }
    ]
  },
  {
    title: 'Shipping & Tracking',
    items: [
      { question: 'Is order tracking available?', answer: 'Yes. The order tracking page is included and can connect to WooCommerce and shipping/tracking tools when the live backend is attached.' },
      { question: 'Do you show fast-shipping trust elements?', answer: 'Yes. The design includes premium trust badges for fast shipping, tracking, and U.S.-based support.' }
    ]
  },
  {
    title: 'Consulting',
    items: [
      { question: 'What is MD Consulting?', answer: 'A premium service page for physician-guided consulting, built separately from the storefront so it converts like a service landing page.' },
      { question: 'Can leads go into Supabase?', answer: 'Yes. The consulting form is wired to store leads in a Supabase consulting_leads table.' }
    ]
  }
];

export const socialPosts = [
  { title: 'Black-label product drop', handle: '@americafirstlabs', image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&w=1200&q=80' },
  { title: 'Lab shelf detail', handle: '@americafirstlabs', image: 'https://images.unsplash.com/photo-1579154204601-01588f351e67?auto=format&fit=crop&w=1200&q=80' },
  { title: 'Merch capsule preview', handle: '@americafirstlabs', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=1200&q=80' }
];
