import { notFound } from "next/navigation";
import { SectionHeading } from "@/components/sections/section-heading";
import { ProductCard } from "@/components/shop/product-card";
import { getCollectionBySlug } from "@/lib/shop";

export default async function CollectionDetailPage({ params }: { params: { slug: string } }) {
  const collection = await getCollectionBySlug(params.slug);
  if (!collection.info) notFound();

  return (
    <main className="shell py-16">
      <SectionHeading eyebrow={collection.info.eyebrow} title={collection.info.name} description={collection.info.description} />
      <div className="mt-10 grid gap-6 md:grid-cols-2 xl:grid-cols-3">
        {collection.products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </main>
  );
}
