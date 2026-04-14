import { AdminShell } from "@/components/admin/admin-shell";
import { ProductManager } from "@/components/admin/product-manager";
import { getAdminProducts } from "@/lib/admin";

export default async function AdminProductsPage() {
  const products = await getAdminProducts();

  return (
    <AdminShell title="Product Management">
      <ProductManager initialProducts={products} />
    </AdminShell>
  );
}
