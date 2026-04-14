"use client";

import Image from "next/image";
import Link from "next/link";
import { FreeShippingProgress } from "@/components/cart/free-shipping-progress";
import { useCart } from "@/components/cart/cart-provider";
import { formatCurrency } from "@/lib/format";

export default function CartPage() {
  const { items } = useCart();
  const total = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <main className="shell py-16">
      <h1 className="text-5xl font-semibold text-black">Cart</h1>
      <div className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-4">
          <FreeShippingProgress total={total} />
          {items.map((item) => (
            <div key={item.key} className="panel flex gap-4 p-4">
              <div className="relative h-28 w-24 overflow-hidden rounded-2xl">
                <Image src={item.product.image} alt={item.product.name} fill className="object-cover" />
              </div>
              <div>
                <h2 className="text-xl font-semibold text-platinum">{item.product.name}</h2>
                <p className="mt-1 text-sm text-platinum/48">{item.selectedOption}</p>
                <p className="mt-4 text-sm text-platinum/70">Quantity: {item.quantity}</p>
              </div>
            </div>
          ))}
        </div>
        <aside className="panel h-fit p-6">
          <p className="text-[11px] font-medium uppercase tracking-[0.34em] text-black">Order Summary</p>
          <div className="mt-4 flex items-center justify-between text-platinum/65">
            <span>Subtotal</span>
            <span>{formatCurrency(total)}</span>
          </div>
          <p className="mt-5 text-xs leading-6 text-platinum/40">For research purposes only. Not for human consumption.</p>
          <Link href="/checkout" className="button-primary mt-6 w-full">
            Continue to Checkout
          </Link>
        </aside>
      </div>
    </main>
  );
}
