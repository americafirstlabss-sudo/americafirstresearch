"use client";

import { useState } from "react";

type AdminProduct = {
  id: string;
  name: string;
  slug: string;
  category: string;
  price: number;
  stock: number;
  featured?: boolean;
  kind?: string;
};

const blankForm = {
  id: "",
  name: "",
  slug: "",
  category: "peptides",
  kind: "compound",
  price: "",
  compareAtPrice: "",
  dosage: "",
  stock: "",
  shortSummary: "",
  description: "",
  image: "",
  sizeOptions: "",
  badges: "",
  details: "",
  purity: "",
  format: "",
  storage: "",
  sku: "",
  featured: false,
  bestSeller: false
};

export function ProductManager({ initialProducts }: { initialProducts: AdminProduct[] }) {
  const [products, setProducts] = useState(initialProducts);
  const [form, setForm] = useState(blankForm);
  const [status, setStatus] = useState("Create or update products in Supabase.");

  function beginEdit(product: AdminProduct) {
    setForm((current) => ({
      ...current,
      id: product.id,
      name: product.name,
      slug: product.slug,
      category: product.category,
      kind: product.kind ?? "compound",
      price: String(product.price),
      stock: String(product.stock),
      featured: Boolean(product.featured)
    }));
  }

  async function saveProduct(formData: FormData) {
    const payload = {
      id: formData.get("id"),
      name: formData.get("name"),
      slug: formData.get("slug"),
      category: formData.get("category"),
      kind: formData.get("kind"),
      price: formData.get("price"),
      compareAtPrice: formData.get("compareAtPrice"),
      dosage: formData.get("dosage"),
      stock: formData.get("stock"),
      shortSummary: formData.get("shortSummary"),
      description: formData.get("description"),
      image: formData.get("image"),
      sizeOptions: formData.get("sizeOptions"),
      badges: formData.get("badges"),
      details: formData.get("details"),
      purity: formData.get("purity"),
      format: formData.get("format"),
      storage: formData.get("storage"),
      sku: formData.get("sku"),
      featured: formData.get("featured") === "on",
      bestSeller: formData.get("bestSeller") === "on"
    };

    const method = payload.id ? "PATCH" : "POST";
    setStatus(payload.id ? "Updating product..." : "Creating product...");

    const response = await fetch("/api/admin/products", {
      method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    });
    const data = await response.json();

    if (!response.ok) {
      setStatus(data.error ?? "Could not save product.");
      return;
    }

    const nextProduct = data.product as AdminProduct;
    setProducts((current) => {
      const existingIndex = current.findIndex((item) => item.id === nextProduct.id);
      if (existingIndex === -1) return [nextProduct, ...current];
      return current.map((item) => (item.id === nextProduct.id ? nextProduct : item));
    });
    setForm(blankForm);
    setStatus(payload.id ? "Product updated." : "Product created.");
  }

  return (
    <div className="grid gap-6 xl:grid-cols-[1.1fr_0.9fr]">
      <div className="panel p-6">
        <div className="flex items-center justify-between gap-3">
          <h3 className="text-xl font-semibold text-white">Catalog Items</h3>
          <p className="text-sm text-white/45">{products.length} items</p>
        </div>
        <div className="mt-5 space-y-3">
          {products.map((product) => (
            <button key={product.id} type="button" onClick={() => beginEdit(product)} className="flex w-full items-center justify-between rounded-3xl border border-white/10 bg-white/[0.03] px-4 py-4 text-left transition hover:border-[#9c7a2b]/35">
              <div>
                <p className="font-medium text-white">{product.name}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.24em] text-white/40">{product.category}</p>
              </div>
              <div className="text-right text-sm text-white/60">
                <p>${product.price}</p>
                <p className="mt-1">Stock {product.stock}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      <form action={saveProduct} className="panel p-6">
        <h3 className="text-xl font-semibold text-white">{form.id ? "Edit Product" : "New Product"}</h3>
        <input type="hidden" name="id" value={form.id} />
        <div className="mt-5 grid gap-4 md:grid-cols-2">
          <input name="name" value={form.name} onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))} placeholder="Name" className="h-11 rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-sm outline-none md:col-span-2" />
          <input name="slug" value={form.slug} onChange={(event) => setForm((current) => ({ ...current, slug: event.target.value }))} placeholder="Slug" className="h-11 rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-sm outline-none md:col-span-2" />
          <input name="category" value={form.category} onChange={(event) => setForm((current) => ({ ...current, category: event.target.value }))} placeholder="Category" className="h-11 rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-sm outline-none" />
          <input name="kind" value={form.kind} onChange={(event) => setForm((current) => ({ ...current, kind: event.target.value }))} placeholder="Kind" className="h-11 rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-sm outline-none" />
          <input name="price" value={form.price} onChange={(event) => setForm((current) => ({ ...current, price: event.target.value }))} placeholder="Price" className="h-11 rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-sm outline-none" />
          <input name="stock" value={form.stock} onChange={(event) => setForm((current) => ({ ...current, stock: event.target.value }))} placeholder="Stock" className="h-11 rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-sm outline-none" />
          <input name="compareAtPrice" value={form.compareAtPrice} onChange={(event) => setForm((current) => ({ ...current, compareAtPrice: event.target.value }))} placeholder="Compare at price" className="h-11 rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-sm outline-none" />
          <input name="dosage" value={form.dosage} onChange={(event) => setForm((current) => ({ ...current, dosage: event.target.value }))} placeholder="Dosage / size" className="h-11 rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-sm outline-none" />
          <input name="image" value={form.image} onChange={(event) => setForm((current) => ({ ...current, image: event.target.value }))} placeholder="Image URL" className="h-11 rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-sm outline-none md:col-span-2" />
          <textarea name="shortSummary" value={form.shortSummary} onChange={(event) => setForm((current) => ({ ...current, shortSummary: event.target.value }))} placeholder="Short summary" className="min-h-24 rounded-3xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm outline-none md:col-span-2" />
          <textarea name="description" value={form.description} onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))} placeholder="Description" className="min-h-28 rounded-3xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm outline-none md:col-span-2" />
          <input name="sizeOptions" value={form.sizeOptions} onChange={(event) => setForm((current) => ({ ...current, sizeOptions: event.target.value }))} placeholder="Size options (comma separated)" className="h-11 rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-sm outline-none md:col-span-2" />
          <input name="badges" value={form.badges} onChange={(event) => setForm((current) => ({ ...current, badges: event.target.value }))} placeholder="Badges (comma separated)" className="h-11 rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-sm outline-none md:col-span-2" />
          <input name="details" value={form.details} onChange={(event) => setForm((current) => ({ ...current, details: event.target.value }))} placeholder="Details (comma separated)" className="h-11 rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-sm outline-none md:col-span-2" />
          <input name="purity" value={form.purity} onChange={(event) => setForm((current) => ({ ...current, purity: event.target.value }))} placeholder="Purity" className="h-11 rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-sm outline-none" />
          <input name="format" value={form.format} onChange={(event) => setForm((current) => ({ ...current, format: event.target.value }))} placeholder="Format" className="h-11 rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-sm outline-none" />
          <input name="storage" value={form.storage} onChange={(event) => setForm((current) => ({ ...current, storage: event.target.value }))} placeholder="Storage" className="h-11 rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-sm outline-none" />
          <input name="sku" value={form.sku} onChange={(event) => setForm((current) => ({ ...current, sku: event.target.value }))} placeholder="SKU" className="h-11 rounded-2xl border border-white/10 bg-white/[0.04] px-4 text-sm outline-none" />
        </div>
        <div className="mt-4 flex flex-wrap gap-5 text-sm text-white/65">
          <label className="flex items-center gap-2"><input type="checkbox" name="featured" checked={form.featured} onChange={(event) => setForm((current) => ({ ...current, featured: event.target.checked }))} /> Featured</label>
          <label className="flex items-center gap-2"><input type="checkbox" name="bestSeller" checked={form.bestSeller} onChange={(event) => setForm((current) => ({ ...current, bestSeller: event.target.checked }))} /> Best seller</label>
        </div>
        <p className="mt-4 text-sm text-white/50">{status}</p>
        <div className="mt-5 flex gap-3">
          <button type="submit" className="button-primary">{form.id ? "Update product" : "Create product"}</button>
          <button type="button" onClick={() => setForm(blankForm)} className="button-secondary">Reset</button>
        </div>
      </form>
    </div>
  );
}
