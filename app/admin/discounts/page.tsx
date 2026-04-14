import { AdminShell } from "@/components/admin/admin-shell";
import { getAdminDiscountCodes } from "@/lib/admin";

export default async function AdminDiscountsPage() {
  const discountCodes = await getAdminDiscountCodes();

  return (
    <AdminShell title="Discount Code Management">
      <div className="panel overflow-hidden">
        <div className="grid grid-cols-[1fr_0.8fr_0.8fr_0.6fr] border-b border-white/10 px-6 py-4 text-xs uppercase tracking-[0.24em] text-white/35">
          <span>Code</span>
          <span>Type</span>
          <span>Value</span>
          <span>Used</span>
        </div>
        {discountCodes.map((code) => (
          <div key={code.id} className="grid grid-cols-[1fr_0.8fr_0.8fr_0.6fr] border-b border-white/10 px-6 py-4 text-sm text-white/68">
            <span className="font-medium text-white">{code.code}</span>
            <span>{code.discount_type}</span>
            <span>{code.discount_value}</span>
            <span>{code.used_count}</span>
          </div>
        ))}
      </div>
    </AdminShell>
  );
}
