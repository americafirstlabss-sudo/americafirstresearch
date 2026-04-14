import { ProductCard } from "@/components/shop/product-card";
import { products } from "@/lib/site";

export default function MerchPage() {
  const merch = products.filter((product) => product.kind === "merch");

  return (
    <main className="shell py-16">
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {merch.map((item) => (
          <ProductCard key={item.id} product={item} />
        ))}
      </div>
    </main>
  );
}
