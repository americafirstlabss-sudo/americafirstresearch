import { AdminShell } from "@/components/admin/admin-shell";
import { formatCurrency, formatDate } from "@/lib/format";
import { formatAdminOrderStatus, getAdminOrders } from "@/lib/admin";

export default async function AdminOrdersPage() {
  const orders = await getAdminOrders();

  return (
    <AdminShell title="Order Fulfillment">
      <div className="panel overflow-hidden">
        <div className="grid grid-cols-[1.1fr_0.8fr_0.7fr_0.8fr] border-b border-white/10 px-6 py-4 text-xs uppercase tracking-[0.24em] text-white/35">
          <span>Order</span>
          <span>Customer</span>
          <span>Total</span>
          <span>Status</span>
        </div>
        {orders.map((order) => (
          <div key={order.id} className="grid grid-cols-[1.1fr_0.8fr_0.7fr_0.8fr] items-center border-b border-white/10 px-6 py-4 text-sm text-white/68">
            <div>
              <p className="font-medium text-white">{order.id}</p>
              <p className="mt-1 text-xs text-white/35">{formatDate(order.created_at)}</p>
            </div>
            <span>{order.customer_email ?? "No email"}</span>
            <span>{formatCurrency(Number(order.total_amount ?? 0))}</span>
            <span className="uppercase tracking-[0.18em] text-[#9c7a2b]">{formatAdminOrderStatus(order.status)}</span>
          </div>
        ))}
      </div>
    </AdminShell>
  );
}
