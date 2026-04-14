import { AdminShell } from "@/components/admin/admin-shell";
import { getAdminCustomers } from "@/lib/admin";

export default async function AdminCustomersPage() {
  const customers = await getAdminCustomers();

  return (
    <AdminShell title="Customer Management">
      <div className="panel overflow-hidden">
        <div className="grid grid-cols-[1fr_0.9fr_0.8fr_0.6fr] border-b border-white/10 px-6 py-4 text-xs uppercase tracking-[0.24em] text-white/35">
          <span>Name</span>
          <span>Email</span>
          <span>Phone</span>
          <span>Marketing</span>
        </div>
        {customers.map((customer) => (
          <div key={customer.id} className="grid grid-cols-[1fr_0.9fr_0.8fr_0.6fr] border-b border-white/10 px-6 py-4 text-sm text-white/68">
            <span className="font-medium text-white">{[customer.first_name, customer.last_name].filter(Boolean).join(" ") || "Unnamed customer"}</span>
            <span>{customer.email}</span>
            <span>{customer.phone ?? "-"}</span>
            <span>{customer.marketing_opt_in ? "Opted in" : "No"}</span>
          </div>
        ))}
      </div>
    </AdminShell>
  );
}
