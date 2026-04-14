import Link from "next/link";

const adminNav = [
  ["/admin", "Overview"],
  ["/admin/orders", "Orders"],
  ["/admin/products", "Products"],
  ["/admin/coa", "COA Library"],
  ["/admin/merch", "Merch"],
  ["/admin/customers", "Customers"],
  ["/admin/inventory", "Inventory"],
  ["/admin/discounts", "Discount Codes"],
  ["/admin/consultations", "Consultations"]
];

export function AdminShell({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <main className="shell py-12">
      <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
        <aside className="panel h-fit p-5">
          <p className="eyebrow">Admin</p>
          <h1 className="mt-3 text-2xl font-semibold text-white">Commerce Control</h1>
          <nav className="mt-6 space-y-2">
            {adminNav.map(([href, label]) => (
              <Link key={href} href={href} className="block rounded-2xl border border-white/10 px-4 py-3 text-sm text-white/65 transition hover:border-[#9c7a2b]/35 hover:text-white">
                {label}
              </Link>
            ))}
          </nav>
        </aside>
        <section>
          <div className="mb-6">
            <p className="eyebrow">Protected Dashboard</p>
            <h2 className="mt-3 text-4xl font-semibold text-white">{title}</h2>
          </div>
          {children}
        </section>
      </div>
    </main>
  );
}
