import { AdminShell } from "@/components/admin/admin-shell";
import { LabResultsManager } from "@/components/admin/lab-results-manager";
import { getCoaEntries } from "@/lib/coa";

export default async function AdminCoaPage() {
  const results = await getCoaEntries();

  return (
    <AdminShell title="COA Management">
      <LabResultsManager initialResults={results} />
    </AdminShell>
  );
}
