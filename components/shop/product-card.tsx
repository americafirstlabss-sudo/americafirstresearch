"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Product } from "@/types";
import { formatCurrency } from "@/lib/format";
import { useCart } from "@/components/cart/cart-provider";

export function ProductCard({ product }: { product: Product }) {
  const { addItem } = useCart();
  const href = product.kind === "merch" ? `/merch#${product.slug}` : `/products/${product.slug}`;

  return (
    <article className="group panel overflow-hidden">
      <Link href={href} className="relative block aspect-[4/4.8] overflow-hidden bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(244,241,232,0.9))]">
        <Image src={product.image} alt={product.name} fill className="object-cover transition duration-700 group-hover:scale-105" />
      </Link>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-lg font-semibold text-platinum sm:text-xl">{product.name}</h3>
          </div>
          <p className="text-base font-semibold text-platinum sm:text-lg">{formatCurrency(product.price)}</p>
        </div>
        <div className="mt-5 flex items-center gap-2 sm:gap-3">
          <button type="button" onClick={() => addItem(product)} className="button-primary flex-1">
            Add to Cart
          </button>
          <Link href={href} className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-graphite/10 bg-white/85 text-platinum">
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
