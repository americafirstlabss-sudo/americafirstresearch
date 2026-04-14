import { createAdminClient } from "@/lib/supabase/admin";
import { products as fallbackProducts } from "@/lib/site";

export async function getAdminOverview() {
  const fallback = {
    totalSales: 84250,
    ordersToday: 14,
    monthlyRevenue: 32910,
    consultationLeads: 9
  };

  const supabase = createAdminClient();
  if (!supabase) return fallback;

  const today = new Date().toISOString().slice(0, 10);
  const monthPrefix = new Date().toISOString().slice(0, 7);

  const [{ data: orders }, { data: consultations }] = await Promise.all([
    supabase.from("orders").select("total_amount, created_at"),
    supabase.from("consultations").select("id, created_at")
  ]);

  if (!orders) return fallback;

  return {
    totalSales: orders.reduce((sum, order) => sum + Number(order.total_amount ?? 0), 0),
    ordersToday: orders.filter((order) => String(order.created_at).startsWith(today)).length,
    monthlyRevenue: orders
      .filter((order) => String(order.created_at).startsWith(monthPrefix))
      .reduce((sum, order) => sum + Number(order.total_amount ?? 0), 0),
    consultationLeads: consultations?.length ?? fallback.consultationLeads
  };
}

export async function getAdminOrders() {
  const supabase = createAdminClient();
  if (!supabase) {
    return [
      { id: "#1084", customer_email: "buyer@example.com", total_amount: 173, status: "processing", created_at: new Date().toISOString() },
      { id: "#1083", customer_email: "stack@example.com", total_amount: 329, status: "paid", created_at: new Date().toISOString() }
    ];
  }

  const { data } = await supabase
    .from("orders")
    .select("id, customer_email, total_amount, status, created_at")
    .order("created_at", { ascending: false })
    .limit(20);

  return data ?? [];
}

export async function getAdminCustomers() {
  const supabase = createAdminClient();
  if (!supabase) {
    return [
      { id: "1", email: "research@example.com", first_name: "Jordan", last_name: "Stone", phone: "(555) 0101", marketing_opt_in: true },
      { id: "2", email: "clinic@example.com", first_name: "Avery", last_name: "Cole", phone: "(555) 0102", marketing_opt_in: false }
    ];
  }

  const { data } = await supabase
    .from("customers")
    .select("id, email, first_name, last_name, phone, marketing_opt_in")
    .order("created_at", { ascending: false })
    .limit(50);

  return data ?? [];
}

export async function getAdminConsultations() {
  const supabase = createAdminClient();
  if (!supabase) {
    return [{ id: "1", full_name: "Founder One", email: "founder@example.com", primary_goal: "Performance", preferred_time_slot: "10:30 AM", status: "new", created_at: new Date().toISOString() }];
  }

  const { data } = await supabase
    .from("consulting_leads")
    .select("id, full_name, email, primary_goal, preferred_time_slot, status, created_at")
    .order("created_at", { ascending: false })
    .limit(50);

  return data ?? [];
}

export async function getAdminDiscountCodes() {
  const supabase = createAdminClient();
  if (!supabase) {
    return [{ id: "1", code: "LAB10", discount_type: "percent", discount_value: 10, active: true, used_count: 4 }];
  }

  const { data } = await supabase
    .from("discount_codes")
    .select("id, code, discount_type, discount_value, active, used_count")
    .order("created_at", { ascending: false })
    .limit(50);

  return data ?? [];
}

export async function getAdminProducts() {
  const supabase = createAdminClient();
  if (!supabase) {
    return fallbackProducts.map((product) => ({
      id: product.id,
      name: product.name,
      slug: product.slug,
      category: product.category,
      price: product.price,
      stock: product.stock,
      featured: Boolean(product.featured),
      kind: product.kind
    }));
  }

  const { data } = await supabase
    .from("products")
    .select("id, name, slug, category, price, stock, featured, kind")
    .order("created_at", { ascending: false })
    .limit(100);

  return data ?? [];
}

export async function getAdminInventory() {
  const supabase = createAdminClient();
  if (!supabase) {
    return fallbackProducts.map((product) => ({
      id: product.id,
      name: product.name,
      stock: product.stock,
      sku: product.technical.sku
    }));
  }

  const { data } = await supabase
    .from("products")
    .select("id, name, stock, sku")
    .order("stock", { ascending: true })
    .limit(100);

  return data ?? [];
}
