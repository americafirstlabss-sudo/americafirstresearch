"use client";

import Image from "next/image";
import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";
import { Minus, Plus, X } from "lucide-react";
import { FreeShippingProgress } from "@/components/cart/free-shipping-progress";
import { useCart } from "@/components/cart/cart-provider";
import { formatCurrency } from "@/lib/format";

export function CartDrawer() {
  const { isOpen, closeCart, items, updateQuantity, removeItem } = useCart();
  const subtotal = items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => (!open ? closeCart() : undefined)}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-[#13233a]/18 backdrop-blur-sm" />
        <Dialog.Content className="fixed right-0 top-0 z-50 flex h-full w-full max-w-md flex-col border-l border-graphite/10 bg-[linear-gradient(180deg,#fbfaf6,#f1ede4)] p-6 shadow-2xl">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.34em] text-black">Cart</p>
              <h2 className="mt-2 text-2xl font-semibold text-platinum">Checkout Queue</h2>
            </div>
            <Dialog.Close className="grid h-10 w-10 place-items-center rounded-full border border-graphite/10 bg-white/85 text-platinum">
              <X className="h-4 w-4" />
            </Dialog.Close>
          </div>
          <div className="mt-8 flex-1 space-y-4 overflow-y-auto">
            <FreeShippingProgress total={subtotal} />
            {items.length === 0 ? (
              <div className="panel p-6">
                <p className="text-sm text-platinum/68">Your cart is empty. Add a product to begin checkout.</p>
              </div>
            ) : (
              items.map((item) => (
                <article key={item.key} className="panel p-4">
                  <div className="flex gap-4">
                    <div className="relative h-24 w-20 overflow-hidden rounded-2xl bg-white/80">
                      <Image src={item.product.image} alt={item.product.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <h3 className="font-medium text-platinum">{item.product.name}</h3>
                          <p className="mt-1 text-xs uppercase tracking-[0.24em] text-platinum/45">{item.selectedOption}</p>
                        </div>
                        <button type="button" onClick={() => removeItem(item.key)} className="text-xs text-platinum/55 transition hover:text-[#922030]">
                          Remove
                        </button>
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <div className="flex items-center gap-2 rounded-full border border-graphite/10 px-2 py-1">
                          <button type="button" onClick={() => updateQuantity(item.key, item.quantity - 1)} className="grid h-7 w-7 place-items-center rounded-full bg-white/80 text-platinum">
                            <Minus className="h-3 w-3" />
                          </button>
                          <span className="min-w-6 text-center text-sm text-platinum">{item.quantity}</span>
                          <button type="button" onClick={() => updateQuantity(item.key, item.quantity + 1)} className="grid h-7 w-7 place-items-center rounded-full bg-white/80 text-platinum">
                            <Plus className="h-3 w-3" />
                          </button>
                        </div>
                        <p className="font-semibold text-platinum">{formatCurrency(item.product.price * item.quantity)}</p>
                      </div>
                    </div>
                  </div>
                </article>
              ))
            )}
          </div>
          <div className="mt-6 border-t border-graphite/10 pt-6">
            <div className="flex items-center justify-between text-sm text-platinum/68">
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <p className="mt-3 text-xs leading-6 text-platinum/48">For research purposes only. Not for human consumption.</p>
            <div className="mt-5 grid gap-3">
              <Link href="/cart" onClick={closeCart} className="button-secondary w-full">
                View Cart
              </Link>
              <Link href="/checkout" onClick={closeCart} className="button-primary w-full">
                Proceed to Checkout
              </Link>
            </div>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
