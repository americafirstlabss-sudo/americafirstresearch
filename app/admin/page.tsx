import { AdminShell } from "@/components/admin/admin-shell";
import { getAdminOverview } from "@/lib/admin";
import { formatCurrency } from "@/lib/format";

export default async function AdminPage() {
  const overview = await getAdminOverview();
  const metrics = [
    ["Total Sales", overview.totalSales],
    ["Orders Today", overview.ordersToday],
    ["Monthly Revenue", overview.monthlyRevenue],
    ["Consultation Leads", overview.consultationLeads]
  ] as const;

  return (
    <AdminShell title="Overview Analytics">
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {metrics.map(([label, value]) => (
          <div key={label} className="panel p-5">
            <p className="text-xs uppercase tracking-[0.24em] text-white/40">{label}</p>
            <p className="mt-3 text-3xl font-semibold text-white">
              {label.includes("Revenue") || label.includes("Sales") ? formatCurrency(value) : value}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-8 grid gap-6 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="panel p-6">
          <h3 className="text-xl font-semibold text-white">Recent Orders</h3>
          <div className="mt-5 space-y-4">
            {[
              ["#1084", "GHK-Cu + BAC Water", "$173", "Processing"],
              ["#1083", "Precision Stack", "$329", "Paid"],
              ["#1082", "Black Label Hoodie", "$96", "Fulfilled"]
            ].map(([id, items, total, status]) => (
              <div key={id} className="rounded-3xl border border-white/10 bg-white/[0.03] p-4">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-medium text-white">{id}</p>
                    <p className="mt-1 text-sm text-white/52">{items}</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-white">{total}</p>
                    <p className="mt-1 text-xs uppercase tracking-[0.24em] text-[#9c7a2b]">{status}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="panel p-6">
          <h3 className="text-xl font-semibold text-white">Top Products</h3>
          <div className="mt-5 space-y-4 text-sm text-white/62">
            <div className="flex items-center justify-between"><span>GHK-Cu</span><span>164 sold</span></div>
            <div className="flex items-center justify-between"><span>BPC-157</span><span>138 sold</span></div>
            <div className="flex items-center justify-between"><span>Precision Stack</span><span>91 sold</span></div>
            <div className="flex items-center justify-between"><span>Black Label Hoodie</span><span>57 sold</span></div>
          </div>
        </div>
      </div>
    </AdminShell>
  );
}
