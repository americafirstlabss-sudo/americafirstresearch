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
      <Link href={href} className="relative block aspect-[4/3.35] overflow-hidden bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(244,241,232,0.9))] sm:aspect-[4/4.8]">
        <Image src={product.image} alt={product.name} fill className="object-cover transition duration-700 group-hover:scale-105" />
      </Link>
      <div className="p-2.5 sm:p-5">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-sm font-semibold leading-tight text-platinum sm:text-xl">{product.name}</h3>
          </div>
          <p className="text-[11px] font-semibold text-platinum sm:text-lg">{formatCurrency(product.price)}</p>
        </div>
        <div className="mt-2 flex items-center gap-2 sm:mt-5 sm:gap-3">
          <button type="button" onClick={() => addItem(product)} className="button-primary flex-1 px-3 py-2 text-[11px] sm:px-6 sm:py-3 sm:text-sm">
            Add to Cart
          </button>
          <Link href={href} className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-graphite/10 bg-white/85 text-platinum sm:h-11 sm:w-11">
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </article>
  );
}
