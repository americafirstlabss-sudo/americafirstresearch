"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import {
  FlaskConical,
  LockKeyhole,
  Minus,
  Plus,
  ScanSearch,
  ShieldCheck,
  Truck
} from "lucide-react";
import { useCart } from "@/components/cart/cart-provider";
import { formatCurrency } from "@/lib/format";
import { Product } from "@/types";

export function ProductDetailClient({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [selectedOption, setSelectedOption] = useState(product.sizeOptions[0] ?? "");
  const [quantity, setQuantity] = useState(1);

  const hasVariants = product.sizeOptions.length > 1;
  const variantPrices = product.variantPrices ? Object.values(product.variantPrices) : [];
  const currentPrice = product.variantPrices?.[selectedOption] ?? product.price;
  const displayPrice = useMemo(() => {
    if (product.variantPrices && variantPrices.length) {
      return `From ${formatCurrency(Math.min(...variantPrices))}`;
    }

    return formatCurrency(product.price);
  }, [product.price, product.variantPrices, variantPrices]);

  const currentFormat = product.variantFormats?.[selectedOption] ?? product.technical.format;
  const trustItems = [
    {
      title: "Third Party Tested",
      body: "Independent analytical review supports batch-level quality, consistency, and traceable confidence.",
      icon: FlaskConical
    },
    {
      title: "Secure Checkout",
      body: "Protected checkout architecture keeps the purchase flow clean, credible, and friction-light.",
      icon: LockKeyhole
    },
    {
      title: "Fast Shipping",
      body: "Orders placed before 12 PM CST Monday through Friday are typically processed the same day.",
      icon: Truck
    },
    {
      title: "USA-Based",
      body: "Domestic operations, fulfillment, and support built around trust and high-standard presentation.",
      icon: ShieldCheck
    }
  ];
  const technicalDetails = [
    { label: "Format", value: currentFormat },
    { label: "Storage", value: product.technical.storage },
    {
      label: "Handling",
      value: "Store according to labeled guidance and handle using clean, controlled research workflow standards."
    },
    { label: "SKU", value: product.technical.sku }
  ];

  return (
    <div className="grid gap-10 xl:grid-cols-[0.88fr_1.12fr] xl:items-start">
      <div className="group relative aspect-square overflow-hidden rounded-[32px] border border-graphite/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(246,243,236,0.94))] shadow-[0_18px_48px_rgba(19,35,58,0.06)]">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-contain p-3 transition duration-500 group-hover:scale-[1.03] sm:p-4 lg:p-5"
          sizes="(max-width: 1280px) 100vw, 50vw"
        />
      </div>

      <div className="xl:pt-6">
        <h1 className="font-[var(--font-display)] text-4xl text-platinum sm:text-5xl">{product.name}</h1>

        <div className="mt-7 rounded-[32px] border border-graphite/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.97),rgba(248,246,240,0.94))] p-6 shadow-[0_22px_60px_rgba(19,35,58,0.06)] sm:p-7">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-[11px] uppercase tracking-[0.28em] text-platinum/45">Pricing</p>
              <div className="mt-3 flex items-baseline gap-3">
                <span className="text-3xl font-semibold text-platinum">{hasVariants ? displayPrice : formatCurrency(currentPrice)}</span>
                {hasVariants ? <span className="text-sm text-platinum/55">Selected: {formatCurrency(currentPrice)}</span> : null}
              </div>
            </div>
            <div className="rounded-full border border-graphite/10 bg-white/85 px-4 py-2 text-xs uppercase tracking-[0.24em] text-platinum/60">
              Scientific research use
            </div>
          </div>

          <div className="mt-7 grid gap-3 sm:grid-cols-2">
            {[
              "High purity formulation",
              "Third-party tested",
              "Research-grade quality",
              "Fast, reliable shipping"
            ].map((point) => (
              <div key={point} className="flex items-center gap-3 rounded-2xl border border-graphite/10 bg-white/78 px-4 py-3 text-sm text-platinum/72 shadow-[0_12px_28px_rgba(19,35,58,0.04)]">
                <span className="h-2 w-2 rounded-full bg-gold" />
                <span>{point}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 space-y-6">
            {hasVariants ? (
              <div>
                <p className="text-[11px] uppercase tracking-[0.28em] text-platinum/45">Select Size</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  {product.sizeOptions.map((option) => (
                    <button
                      key={option}
                      type="button"
                      onClick={() => setSelectedOption(option)}
                      className={`rounded-full border px-4 py-2.5 text-sm transition duration-300 ${
                        selectedOption === option
                          ? "border-[#922030] bg-[linear-gradient(135deg,#922030,#6d1323)] text-white shadow-[0_12px_28px_rgba(146,32,48,0.18)]"
                          : "border-[#922030]/18 bg-[linear-gradient(135deg,rgba(255,255,255,0.98),rgba(244,241,232,0.92))] text-[#922030] hover:border-[#922030] hover:bg-[#922030]/6 hover:text-[#922030]"
                      }`}
                    >
                      {option}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div>
                <p className="text-[11px] uppercase tracking-[0.28em] text-platinum/45">Size</p>
                <p className="mt-3 text-sm text-platinum/78">{product.dosage}</p>
              </div>
            )}

            <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
              <div>
                <p className="text-[11px] uppercase tracking-[0.28em] text-platinum/45">Quantity</p>
                <div className="mt-3 inline-flex items-center rounded-full border border-graphite/10 bg-white/92 p-1 shadow-[0_10px_24px_rgba(19,35,58,0.05)]">
                  <button
                    type="button"
                    onClick={() => setQuantity((current) => Math.max(1, current - 1))}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full text-platinum/70 transition hover:bg-[rgba(19,35,58,0.06)] hover:text-platinum"
                    aria-label="Decrease quantity"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="min-w-12 text-center text-sm font-medium text-platinum">{quantity}</span>
                  <button
                    type="button"
                    onClick={() => setQuantity((current) => current + 1)}
                    className="inline-flex h-10 w-10 items-center justify-center rounded-full text-platinum/70 transition hover:bg-[rgba(19,35,58,0.06)] hover:text-platinum"
                    aria-label="Increase quantity"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="flex flex-1 flex-col gap-3 sm:flex-row">
                <button
                  type="button"
                  onClick={() => addItem(product, selectedOption, quantity)}
                  className="inline-flex min-h-[44px] flex-1 items-center justify-center rounded-full border border-[#922030]/15 bg-[linear-gradient(135deg,#922030,#6d1323)] px-6 py-3 text-sm font-semibold text-white transition hover:opacity-95 hover:shadow-[0_10px_30px_rgba(146,32,48,0.18)]"
                >
                  Add to Cart
                </button>
                <Link
                  href="/checkout"
                  className="inline-flex min-h-[44px] flex-1 items-center justify-center rounded-full border border-[#922030]/20 bg-[linear-gradient(135deg,rgba(146,32,48,0.08),rgba(109,19,35,0.14))] px-6 py-3 text-center text-sm font-semibold text-[#922030] transition hover:border-[#922030] hover:bg-[linear-gradient(135deg,rgba(146,32,48,0.14),rgba(109,19,35,0.2))]"
                >
                  Buy Now
                </Link>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2">
          {trustItems.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="rounded-[28px] border border-graphite/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(247,244,237,0.92))] p-5 shadow-[0_18px_36px_rgba(19,35,58,0.05)]">
                <div className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-gold/25 bg-gold/10">
                  <Icon className="h-5 w-5 text-gold" />
                </div>
                <h3 className="mt-4 text-base font-semibold text-platinum">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-platinum/68">{item.body}</p>
              </div>
            );
          })}
        </div>

        <Tabs.Root defaultValue="description" className="mt-10">
          <Tabs.List className="flex flex-wrap gap-3">
            {[
              { value: "description", label: "Description" },
              { value: "specifications", label: "Specifications" },
              { value: "coa", label: "Lab Testing / COA" },
              { value: "shipping", label: "Shipping" }
            ].map((tab) => (
              <Tabs.Trigger
                key={tab.value}
                value={tab.value}
                className="rounded-full border border-graphite/10 bg-white/72 px-4 py-2 text-sm text-platinum/70 transition hover:bg-white/92 data-[state=active]:border-gold data-[state=active]:bg-gold/10 data-[state=active]:text-platinum"
              >
                {tab.label}
              </Tabs.Trigger>
            ))}
          </Tabs.List>

          <Tabs.Content value="description" className="panel mt-5 p-6 sm:p-7">
            <p className="text-sm leading-7 text-platinum/72">{product.description}</p>
            <ul className="mt-5 space-y-3 text-sm text-platinum/72">
              {product.details.map((detail) => (
                <li key={detail} className="flex gap-3">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                  <span>{detail}</span>
                </li>
              ))}
            </ul>
          </Tabs.Content>

          <Tabs.Content value="specifications" className="panel mt-5 p-6 sm:p-7">
            <div className="grid gap-4 md:grid-cols-2">
              {technicalDetails.map((detail) => (
                <div key={detail.label} className="rounded-2xl border border-graphite/10 bg-white/78 p-4 shadow-[0_12px_28px_rgba(19,35,58,0.04)]">
                  <p className="text-[11px] uppercase tracking-[0.24em] text-platinum/42">{detail.label}</p>
                  <p className="mt-2 text-sm leading-7 text-platinum/76">{detail.value}</p>
                </div>
              ))}
            </div>
          </Tabs.Content>

          <Tabs.Content value="coa" className="panel mt-5 p-6 sm:p-7">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <div className="inline-flex items-center gap-3 text-platinum">
                  <ScanSearch className="h-5 w-5 text-gold" />
                  <h3 className="text-lg font-semibold">Lab Testing & Certificate of Analysis</h3>
                </div>
                <p className="mt-3 max-w-2xl text-sm leading-7 text-platinum/72">
                  Each available batch is documented in the COA library to support transparency, purity review, and batch-level confidence.
                </p>
              </div>
              <Link href="/coa" className="button-secondary whitespace-nowrap">
                View Certificate of Analysis
              </Link>
            </div>
          </Tabs.Content>

          <Tabs.Content value="shipping" className="panel mt-5 p-6 sm:p-7">
            <p className="text-sm leading-7 text-platinum/72">
              Orders placed before 12 PM CST Monday through Friday ship same day. Fulfillment is structured for fast, reliable domestic delivery with a clean post-purchase experience.
            </p>
          </Tabs.Content>

        </Tabs.Root>
      </div>
    </div>
  );
}

