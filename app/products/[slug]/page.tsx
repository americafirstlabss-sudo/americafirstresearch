import { notFound } from "next/navigation";
import { SectionHeading } from "@/components/sections/section-heading";
import { ProductCard } from "@/components/shop/product-card";
import { ProductDetailClient } from "@/components/shop/product-detail-client";
import { getProductBySlug, getProducts } from "@/lib/shop";

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);
  if (!product) notFound();

  const allProducts = await getProducts();
  const related = allProducts.filter((entry) => entry.category === product.category && entry.id !== product.id).slice(0, 3);

  return (
    <main className="shell py-16">
      <ProductDetailClient product={product} />

      <section className="mt-20">
        <div className="mx-auto max-w-3xl text-center">
          <SectionHeading eyebrow="Recommended Products" title="You May Also Like" />
        </div>
        <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {related.map((entry) => (
            <ProductCard key={entry.id} product={entry} />
          ))}
        </div>
      </section>
    </main>
  );
}
