import { createAdminClient } from "@/lib/supabase/admin";
import { collections, products } from "@/lib/site";
import { Product } from "@/types";

export async function getProducts() {
  const supabase = createAdminClient();
  if (!supabase) return products;

  const { data } = await supabase.from("products").select("*").eq("active", true).order("featured", { ascending: false });
  if (!data?.length) return products;

  return data.map(mapSupabaseProduct);
}

export async function getFeaturedProducts() {
  return (await getProducts()).filter((product) => product.featured).slice(0, 4);
}

export async function getProductBySlug(slug: string) {
  return (await getProducts()).find((product) => product.slug === slug) ?? null;
}

export async function getCollectionBySlug(slug: string) {
  return {
    info: collections.find((collection) => collection.slug === slug) ?? null,
    products: (await getProducts()).filter((product) => product.category === slug)
  };
}

function mapSupabaseProduct(row: Record<string, unknown>): Product {
  const slug = String(row.slug ?? row.name).toLowerCase().replace(/\s+/g, "-");
  const seededProduct = products.find((product) => product.slug === slug);
  const rawPrice = Number(row.price ?? 0);

  return {
    id: String(row.id),
    slug,
    name: String(row.name),
    category: (row.category as Product["category"]) ?? "peptides",
    kind: (row.kind as Product["kind"]) ?? "compound",
    price: rawPrice > 0 ? rawPrice : (seededProduct?.price ?? 0),
    compareAtPrice: row.compare_at_price ? Number(row.compare_at_price) : seededProduct?.compareAtPrice,
    image: String(row.image_url ?? seededProduct?.image ?? products[0].image),
    gallery:
      Array.isArray(row.gallery) && row.gallery.length
        ? (row.gallery as string[])
        : [String(row.image_url ?? seededProduct?.image ?? products[0].image)],
    shortSummary: String(row.short_summary ?? "Premium research product."),
    description: String(row.description ?? "Premium research product."),
    dosage: String(row.dosage ?? "Research grade"),
    sizeOptions:
      Array.isArray(row.size_options) && row.size_options.length
        ? (row.size_options as string[])
        : (seededProduct?.sizeOptions ?? ["Default"]),
    badges:
      Array.isArray(row.badges) && row.badges.length
        ? (row.badges as string[])
        : (seededProduct?.badges ?? ["Third-Party Tested"]),
    details:
      Array.isArray(row.details) && row.details.length
        ? (row.details as string[])
        : (seededProduct?.details ?? ["Supabase-managed catalog item"]),
    technical: {
      purity: String(row.purity ?? "N/A"),
      format: String(row.format ?? "Research product"),
      storage: String(row.storage ?? "See packaging"),
      sku: String(row.sku ?? row.id ?? "SKU")
    },
    featured: Boolean(row.featured),
    bestSeller: Boolean(row.best_seller),
    stock: Number(row.stock ?? 0)
  };
}
