import { SearchClient } from "@/components/search/search-client";
import { getCoaEntries } from "@/lib/coa";
import { getSearchItems } from "@/lib/search";

export default async function SearchPage({
  searchParams
}: {
  searchParams: { q?: string };
}) {
  const coaEntries = await getCoaEntries();
  const baseItems = getSearchItems();
  const coaItems = coaEntries.map((entry) => ({
    id: `coa-${entry.batch_number}`,
    type: "coa" as const,
    title: `${entry.product_name} ${entry.batch_number}`,
    href: "/coa",
    description: `${entry.lab_name} ${entry.purity ? `• ${entry.purity}% purity` : ""}`.trim(),
    meta: "COA"
  }));

  return (
    <main className="shell py-16">
      <SearchClient items={[...baseItems, ...coaItems]} initialQuery={searchParams.q ?? ""} />
    </main>
  );
}
