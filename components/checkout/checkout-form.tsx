"use client";

import { useMemo, useState } from "react";
import { useCart } from "@/components/cart/cart-provider";
import { formatCurrency } from "@/lib/format";

export function CheckoutForm({
  initialCustomer
}: {
  initialCustomer?: { firstName?: string; lastName?: string; email?: string };
}) {
  const { items, clearCart } = useCart();
  const [status, setStatus] = useState("Enter your details to continue to secure payment.");
  const [isLoading, setIsLoading] = useState(false);
  const subtotal = useMemo(() => items.reduce((sum, item) => sum + item.product.price * item.quantity, 0), [items]);

  async function onSubmit(formData: FormData) {
    if (!items.length) {
      setStatus("Your cart is empty.");
      return;
    }

    setIsLoading(true);
    setStatus("Preparing secure payment...");

    const payload = {
      customer: {
        email: String(formData.get("email") ?? ""),
        firstName: String(formData.get("firstName") ?? ""),
        lastName: String(formData.get("lastName") ?? ""),
        phone: String(formData.get("phone") ?? "")
      },
      shipping: {
        line1: String(formData.get("line1") ?? ""),
        line2: String(formData.get("line2") ?? ""),
        city: String(formData.get("city") ?? ""),
        state: String(formData.get("state") ?? ""),
        postalCode: String(formData.get("postalCode") ?? ""),
        country: "US"
      },
      items: items.map((item) => ({
        productId: item.product.id,
        quantity: item.quantity,
        selectedOption: item.selectedOption
      }))
    };

    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    if (response.status === 401) {
      window.location.href = "/auth?next=/checkout";
      return;
    }

    if (!response.ok || !data.checkoutUrl) {
      setStatus(data.error ?? "Could not start checkout.");
      setIsLoading(false);
      return;
    }

    if (data.provider === "bankful" && data.fields) {
      const form = document.createElement("form");
      form.method = "POST";
      form.action = data.checkoutUrl;

      Object.entries(data.fields as Record<string, string>).forEach(([key, value]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = value;
        form.appendChild(input);
      });

      document.body.appendChild(form);
      clearCart();
      form.submit();
      return;
    }

    clearCart();
    window.location.href = data.checkoutUrl;
  }

  return (
    <div className="grid gap-8 lg:grid-cols-[1fr_0.9fr]">
      <form action={onSubmit} className="rounded-[32px] border border-graphite/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(248,246,240,0.94))] p-6 shadow-[0_22px_60px_rgba(19,35,58,0.06)] sm:p-7">
        <p className="text-[11px] font-medium uppercase tracking-[0.34em] text-black">Secure Checkout</p>
        <h2 className="mt-3 text-3xl font-semibold text-platinum">Shipping Information</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <input name="firstName" required defaultValue={initialCustomer?.firstName} placeholder="First name" className="h-12 rounded-2xl border border-graphite/10 bg-white/92 px-4 text-sm text-platinum outline-none transition placeholder:text-platinum/40 focus:border-cyan" />
          <input name="lastName" required defaultValue={initialCustomer?.lastName} placeholder="Last name" className="h-12 rounded-2xl border border-graphite/10 bg-white/92 px-4 text-sm text-platinum outline-none transition placeholder:text-platinum/40 focus:border-cyan" />
          <input name="email" required type="email" defaultValue={initialCustomer?.email} placeholder="Email" className="h-12 rounded-2xl border border-graphite/10 bg-white/92 px-4 text-sm text-platinum outline-none transition placeholder:text-platinum/40 focus:border-cyan md:col-span-2" />
          <input name="phone" placeholder="Phone" className="h-12 rounded-2xl border border-graphite/10 bg-white/92 px-4 text-sm text-platinum outline-none transition placeholder:text-platinum/40 focus:border-cyan md:col-span-2" />
          <input name="line1" required placeholder="Address line 1" className="h-12 rounded-2xl border border-graphite/10 bg-white/92 px-4 text-sm text-platinum outline-none transition placeholder:text-platinum/40 focus:border-cyan md:col-span-2" />
          <input name="line2" placeholder="Address line 2" className="h-12 rounded-2xl border border-graphite/10 bg-white/92 px-4 text-sm text-platinum outline-none transition placeholder:text-platinum/40 focus:border-cyan md:col-span-2" />
          <input name="city" required placeholder="City" className="h-12 rounded-2xl border border-graphite/10 bg-white/92 px-4 text-sm text-platinum outline-none transition placeholder:text-platinum/40 focus:border-cyan" />
          <input name="state" required placeholder="State" className="h-12 rounded-2xl border border-graphite/10 bg-white/92 px-4 text-sm text-platinum outline-none transition placeholder:text-platinum/40 focus:border-cyan" />
          <input name="postalCode" required placeholder="ZIP code" className="h-12 rounded-2xl border border-graphite/10 bg-white/92 px-4 text-sm text-platinum outline-none transition placeholder:text-platinum/40 focus:border-cyan md:col-span-2" />
        </div>
        <p className="mt-5 text-sm text-platinum/55">{status}</p>
        <button type="submit" disabled={isLoading || !items.length} className="button-primary mt-6 w-full disabled:cursor-not-allowed disabled:opacity-60">
          {isLoading ? "Redirecting..." : "Continue to Payment"}
        </button>
      </form>

      <aside className="h-fit rounded-[32px] border border-graphite/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(248,246,240,0.94))] p-6 shadow-[0_22px_60px_rgba(19,35,58,0.06)] sm:p-7">
        <p className="text-[11px] font-medium uppercase tracking-[0.34em] text-black">Order Summary</p>
        <div className="mt-5 space-y-4">
          {items.map((item) => (
            <div key={item.key} className="flex items-center justify-between gap-4 border-b border-graphite/10 pb-4 text-sm text-platinum/68">
              <div>
                <p className="font-medium text-platinum">{item.product.name}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.24em] text-platinum/40">{item.selectedOption} x {item.quantity}</p>
              </div>
              <p>{formatCurrency(item.product.price * item.quantity)}</p>
            </div>
          ))}
        </div>
        <div className="mt-5 flex items-center justify-between text-sm text-platinum/70">
          <span>Subtotal</span>
          <span>{formatCurrency(subtotal)}</span>
        </div>
        <p className="mt-5 text-xs leading-6 text-platinum/40">For research purposes only. Not for human consumption.</p>
      </aside>
    </div>
  );
}
