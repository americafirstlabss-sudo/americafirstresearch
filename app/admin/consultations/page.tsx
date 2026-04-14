import { AdminShell } from "@/components/admin/admin-shell";
import { formatDate } from "@/lib/format";
import { getAdminConsultations } from "@/lib/admin";

export default async function AdminConsultationsPage() {
  const consultations = await getAdminConsultations();

  return (
    <AdminShell title="Consultation Lead Tracking">
      <div className="panel overflow-hidden">
        <div className="grid grid-cols-[0.9fr_0.9fr_0.9fr_0.7fr_0.7fr] border-b border-white/10 px-6 py-4 text-xs uppercase tracking-[0.24em] text-white/35">
          <span>Name</span>
          <span>Email</span>
          <span>Interest</span>
          <span>Status</span>
          <span>Created</span>
        </div>
        {consultations.map((lead) => (
          <div key={lead.id} className="grid grid-cols-[0.9fr_0.9fr_0.9fr_0.7fr_0.7fr] border-b border-white/10 px-6 py-4 text-sm text-white/68">
            <span className="font-medium text-white">{lead.full_name}</span>
            <span>{lead.email}</span>
            <span>{lead.primary_goal ?? lead.preferred_time_slot ?? "-"}</span>
            <span className="uppercase tracking-[0.18em] text-[#9c7a2b]">{lead.status}</span>
            <span>{lead.created_at ? formatDate(lead.created_at) : "-"}</span>
          </div>
        ))}
      </div>
    </AdminShell>
  );
}
