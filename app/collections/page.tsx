import { ProductCard } from "@/components/shop/product-card";
import { getProducts } from "@/lib/shop";

export default async function CollectionsPage() {
  const products = (await getProducts()).filter((product) => product.kind !== "merch");

  return (
    <main className="shell py-16">
      <div className="grid grid-cols-2 gap-2 sm:gap-6 md:grid-cols-2 xl:grid-cols-3">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
