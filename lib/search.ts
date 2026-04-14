import { faqDirectory, navigation, policyPages, products } from "@/lib/site";

export type SearchItem = {
  id: string;
  type: "product" | "faq" | "page" | "coa";
  title: string;
  href: string;
  description: string;
  meta?: string;
};

export function getSearchItems() {
  const productItems: SearchItem[] = products.map((product) => ({
    id: `product-${product.slug}`,
    type: "product",
    title: product.name,
    href: product.kind === "merch" ? "/merch" : `/products/${product.slug}`,
    description: product.description,
    meta: product.kind === "merch" ? "Merch" : "Product"
  }));

  const faqItems: SearchItem[] = faqDirectory.flatMap((group) =>
    group.items.map((item, index) => ({
      id: `faq-${group.category}-${index}`,
      type: "faq",
      title: item.question,
      href: "/faq",
      description: item.answer,
      meta: group.category
    }))
  );

  const pageItems: SearchItem[] = [
    { id: "page-home", type: "page", title: "Home", href: "/", description: "Homepage, featured products, quality program, and brand overview.", meta: "Page" },
    { id: "page-shop", type: "page", title: "Shop", href: "/collections", description: "Browse the full catalog of research products.", meta: "Page" },
    { id: "page-merch", type: "page", title: "Merch", href: "/merch", description: "Branded apparel and accessories.", meta: "Page" },
    { id: "page-consulting", type: "page", title: "MD Consulting", href: "/consulting", description: "Physician-guided longevity consulting and booking.", meta: "Page" },
    { id: "page-coa", type: "page", title: "COA Library", href: "/coa", description: "Browse Certificates of Analysis by product and batch.", meta: "Page" },
    { id: "page-faq", type: "page", title: "FAQ", href: "/faq", description: "Answers about legality, shipping, payments, and product handling.", meta: "Page" },
    { id: "page-contact", type: "page", title: "Contact", href: "/contact", description: "Contact support for orders, products, and general help.", meta: "Page" },
    { id: "page-account", type: "page", title: "Account", href: "/account", description: "Customer login, account access, and authenticated checkout.", meta: "Page" }
  ];

  const navItems: SearchItem[] = navigation.map((item) => ({
    id: `nav-${item.href}`,
    type: "page",
    title: item.label,
    href: item.href,
    description: `${item.label} page`,
    meta: "Navigation"
  }));

  const policyItems: SearchItem[] = policyPages.map((page) => ({
    id: `policy-${page.slug}`,
    type: "page",
    title: page.title,
    href: `/policies/${page.slug}`,
    description: `${page.title} and compliance information.`,
    meta: "Policy"
  }));

  return [...pageItems, ...navItems, ...policyItems, ...productItems, ...faqItems];
}
