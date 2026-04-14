import { CoaBrowser } from "@/components/coa/coa-browser";
import { getCoaEntries } from "@/lib/coa";

export default async function CoaPage() {
  const entries = await getCoaEntries();

  return (
    <main className="shell py-16">
      <div className="max-w-4xl">
        <p className="eyebrow">COA Library</p>
        <h1 className="mt-4 text-5xl font-semibold text-platinum">COA Library</h1>
        <p className="mt-5 text-base leading-8 text-platinum/72">
          Browse third-party verified Certificates of Analysis for every product batch.
        </p>
        <p className="mt-4 text-sm leading-7 text-platinum/65">
          Each batch is independently tested and verified to ensure purity, consistency, and transparency.
        </p>
      </div>

      <div className="mt-10">
        <CoaBrowser entries={entries} />
      </div>

      <section className="panel mt-12 p-8 md:p-10">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.34em] text-black">Third-Party Verified</p>
            <h2 className="mt-4 text-4xl font-semibold text-platinum">Third-Party Verified</h2>
          </div>
          <p className="text-base leading-8 text-platinum/72">
            Every batch is independently tested and documented with a Certificate of Analysis to ensure accuracy, purity, and transparency across all research products.
          </p>
        </div>
      </section>
    </main>
  );
}
