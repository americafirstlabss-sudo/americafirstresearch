import { AdminShell } from "@/components/admin/admin-shell";
import { getAdminInventory } from "@/lib/admin";

export default async function AdminInventoryPage() {
  const inventory = await getAdminInventory();

  return (
    <AdminShell title="Inventory Tracking">
      <div className="panel overflow-hidden">
        <div className="grid grid-cols-[1fr_0.8fr_0.8fr] border-b border-white/10 px-6 py-4 text-xs uppercase tracking-[0.24em] text-white/35">
          <span>Product</span>
          <span>SKU</span>
          <span>Stock</span>
        </div>
        {inventory.map((item) => (
          <div key={item.id} className="grid grid-cols-[1fr_0.8fr_0.8fr] border-b border-white/10 px-6 py-4 text-sm text-white/68">
            <span className="font-medium text-white">{item.name}</span>
            <span>{item.sku ?? "-"}</span>
            <span>{item.stock}</span>
          </div>
        ))}
      </div>
    </AdminShell>
  );
}
