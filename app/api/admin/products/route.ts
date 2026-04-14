import { NextResponse } from "next/server";
import { createAdminClient } from "@/lib/supabase/admin";
import { requireAdminAccess } from "@/lib/server-auth";

function mapProduct(row: Record<string, unknown>) {
  return {
    id: row.id,
    name: row.name,
    slug: row.slug,
    category: row.category,
    price: Number(row.price ?? 0),
    stock: Number(row.stock ?? 0),
    featured: Boolean(row.featured),
    kind: row.kind
  };
}

export async function GET() {
  const access = await requireAdminAccess();
  if (!access.ok) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createAdminClient();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase service key not configured" }, { status: 500 });
  }

  const { data, error } = await supabase.from("products").select("*").order("created_at", { ascending: false });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ products: (data ?? []).map(mapProduct) });
}

export async function POST(request: Request) {
  const access = await requireAdminAccess();
  if (!access.ok) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createAdminClient();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase service key not configured" }, { status: 500 });
  }

  const body = await request.json();
  const payload = {
    name: body.name,
    slug: body.slug,
    category: body.category,
    kind: body.kind ?? "compound",
    price: Number(body.price ?? 0),
    compare_at_price: body.compareAtPrice ? Number(body.compareAtPrice) : null,
    dosage: body.dosage,
    stock: Number(body.stock ?? 0),
    short_summary: body.shortSummary,
    description: body.description,
    image_url: body.image,
    gallery: body.image ? [body.image] : [],
    size_options: body.sizeOptions ? String(body.sizeOptions).split(",").map((item) => item.trim()).filter(Boolean) : [],
    badges: body.badges ? String(body.badges).split(",").map((item) => item.trim()).filter(Boolean) : [],
    details: body.details ? String(body.details).split(",").map((item) => item.trim()).filter(Boolean) : [],
    purity: body.purity,
    format: body.format,
    storage: body.storage,
    sku: body.sku,
    featured: Boolean(body.featured),
    best_seller: Boolean(body.bestSeller),
    active: true
  };

  const { data, error } = await supabase.from("products").insert(payload).select("*").single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ product: mapProduct(data) });
}

export async function PATCH(request: Request) {
  const access = await requireAdminAccess();
  if (!access.ok) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const supabase = createAdminClient();
  if (!supabase) {
    return NextResponse.json({ error: "Supabase service key not configured" }, { status: 500 });
  }

  const body = await request.json();
  if (!body.id) return NextResponse.json({ error: "Product id is required" }, { status: 400 });

  const updates: Record<string, unknown> = {
    name: body.name,
    slug: body.slug,
    category: body.category,
    kind: body.kind,
    price: Number(body.price ?? 0),
    compare_at_price: body.compareAtPrice ? Number(body.compareAtPrice) : null,
    dosage: body.dosage,
    stock: Number(body.stock ?? 0),
    short_summary: body.shortSummary,
    description: body.description,
    image_url: body.image,
    gallery: body.image ? [body.image] : [],
    size_options: body.sizeOptions ? String(body.sizeOptions).split(",").map((item) => item.trim()).filter(Boolean) : [],
    badges: body.badges ? String(body.badges).split(",").map((item) => item.trim()).filter(Boolean) : [],
    details: body.details ? String(body.details).split(",").map((item) => item.trim()).filter(Boolean) : [],
    purity: body.purity,
    format: body.format,
    storage: body.storage,
    sku: body.sku,
    featured: Boolean(body.featured),
    best_seller: Boolean(body.bestSeller)
  };

  const { data, error } = await supabase.from("products").update(updates).eq("id", body.id).select("*").single();
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  return NextResponse.json({ product: mapProduct(data) });
}
