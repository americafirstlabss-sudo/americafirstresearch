import { AdminShell } from "@/components/admin/admin-shell";
import { getAdminProducts } from "@/lib/admin";

export default async function AdminMerchPage() {
  const products = await getAdminProducts();
  const merch = products.filter((product) => product.kind === "merch");

  return (
    <AdminShell title="Merch Management">
      <div className="panel overflow-hidden">
        <div className="grid grid-cols-[1fr_0.8fr_0.8fr_0.6fr] border-b border-white/10 px-6 py-4 text-xs uppercase tracking-[0.24em] text-white/35">
          <span>Product</span>
          <span>Category</span>
          <span>Price</span>
          <span>Stock</span>
        </div>
        {merch.map((product) => (
          <div key={product.id} className="grid grid-cols-[1fr_0.8fr_0.8fr_0.6fr] border-b border-white/10 px-6 py-4 text-sm text-white/68">
            <span className="font-medium text-white">{product.name}</span>
            <span>{product.category}</span>
            <span>${product.price}</span>
            <span>{product.stock}</span>
          </div>
        ))}
      </div>
    </AdminShell>
  );
}
