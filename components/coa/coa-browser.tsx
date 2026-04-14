"use client";

import { useMemo, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import Image from "next/image";
import { Beaker, ChevronDown, Download, FileCheck2, FlaskConical, Search, ShieldCheck, X } from "lucide-react";
import { formatDate } from "@/lib/format";
import { CoaEntry } from "@/lib/coa";

export function CoaBrowser({ entries }: { entries: CoaEntry[] }) {
  const trustCards = [
    {
      title: "Verified Testing",
      body: "Every batch is independently tested and documented to reinforce scientific credibility.",
      Icon: ShieldCheck
    },
    {
      title: "Batch Traceability",
      body: "Structured product and batch organization keeps every COA easy to review and verify.",
      Icon: FileCheck2
    },
    {
      title: "Quality Assurance",
      body: "Lab documentation, purity values, and batch-level reporting support full transparency.",
      Icon: FlaskConical
    }
  ];

  const [query, setQuery] = useState("");
  const [productFilter, setProductFilter] = useState("All");
  const [batchFilter, setBatchFilter] = useState("All");
  const [dateFilter, setDateFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState("newest");
  const [activeEntry, setActiveEntry] = useState<CoaEntry | null>(null);

  const productOptions = ["All", ...new Set(entries.map((entry) => entry.product_name))];
  const batchOptions = ["All", ...new Set(entries.map((entry) => entry.batch_number))];
  const dateOptions = ["All", ...new Set(entries.map((entry) => entry.test_date))];

  const filteredEntries = useMemo(() => {
    const search = query.trim().toLowerCase();
    const nextEntries = entries.filter((entry) => {
      const matchesSearch =
        !search ||
        entry.product_name.toLowerCase().includes(search) ||
        entry.batch_number.toLowerCase().includes(search);
      const matchesProduct = productFilter === "All" || entry.product_name === productFilter;
      const matchesBatch = batchFilter === "All" || entry.batch_number === batchFilter;
      const matchesDate = dateFilter === "All" || entry.test_date === dateFilter;
      return matchesSearch && matchesProduct && matchesBatch && matchesDate;
    });

    return nextEntries.sort((a, b) => {
      const aValue = new Date(a.test_date).getTime();
      const bValue = new Date(b.test_date).getTime();
      return sortOrder === "newest" ? bValue - aValue : aValue - bValue;
    });
  }, [batchFilter, dateFilter, entries, productFilter, query, sortOrder]);

  return (
    <>
      <div className="sticky top-20 z-20 mb-8 rounded-[28px] border border-graphite/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(245,241,232,0.94))] p-4 backdrop-blur-xl">
        <div className="grid gap-4 lg:grid-cols-[1.3fr_repeat(4,0.7fr)]">
          <div className="relative">
            <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-platinum/35" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by product or batch number"
              className="h-12 w-full rounded-full border border-graphite/10 bg-white/90 pl-11 pr-4 text-sm text-platinum outline-none placeholder:text-platinum/35"
            />
          </div>
          <div className="hidden lg:contents">
            <FilterSelect value={productFilter} onChange={setProductFilter} options={productOptions} label="Product Name" />
            <FilterSelect value={batchFilter} onChange={setBatchFilter} options={batchOptions} label="Batch Number" />
            <FilterSelect value={dateFilter} onChange={setDateFilter} options={dateOptions} label="Date" />
            <FilterSelect value={sortOrder} onChange={setSortOrder} options={["newest", "oldest"]} label="Sort" />
          </div>
        </div>
      </div>

      {filteredEntries.length ? (
        <div className="panel overflow-hidden">
          <div className="hidden grid-cols-[1.1fr_0.9fr_0.8fr_0.8fr_0.7fr_1fr] border-b border-graphite/10 px-6 py-4 text-xs uppercase tracking-[0.24em] text-platinum/40 lg:grid">
            <span>Product</span>
            <span>Batch</span>
            <span>Date Tested</span>
            <span>Lab Name</span>
            <span>Purity</span>
            <span>Actions</span>
          </div>
          <div className="divide-y divide-graphite/10">
            {filteredEntries.map((entry) => (
              <div key={entry.id} className="grid gap-4 px-6 py-5 transition hover:bg-[rgba(19,35,58,0.03)] lg:grid-cols-[1.1fr_0.9fr_0.8fr_0.8fr_0.7fr_1fr] lg:items-center">
                <div>
                  <p className="font-medium text-platinum">{entry.product_name}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.22em] text-platinum/40">{entry.storage_path ?? "/coa/product/batch.pdf"}</p>
                </div>
                <span className="text-sm text-platinum/72">{entry.batch_number}</span>
                <span className="text-sm text-platinum/72">{entry.test_date ? formatDate(entry.test_date) : "-"}</span>
                <span className="text-sm text-platinum/72">{entry.lab_name || "-"}</span>
                <span className="text-sm font-medium text-platinum">{entry.purity ? `${entry.purity}%` : "-"}</span>
                <div className="flex flex-wrap gap-3">
                  <button
                    type="button"
                    onClick={() => entry.file_url && setActiveEntry(entry)}
                    disabled={!entry.file_url}
                    className="button-secondary h-10 px-4 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    View COA
                  </button>
                  {entry.file_url ? (
                    <a href={entry.file_url} download className="button-primary h-10 px-4">
                      Download File
                    </a>
                  ) : (
                    <span className="inline-flex h-10 items-center rounded-full border border-graphite/10 px-4 text-xs uppercase tracking-[0.18em] text-platinum/50">
                      Pending Upload
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="panel p-10 text-center">
          <p className="text-lg font-medium text-platinum">No results found. Try searching by product or batch number.</p>
        </div>
      )}

      <section className="mt-12 grid gap-6 md:grid-cols-3">
        {trustCards.map(({ title, body, Icon: ItemIcon }) => {
          return (
            <div key={title} className="panel p-6">
              <ItemIcon className="h-7 w-7 text-[#9c7a2b]" />
              <h2 className="mt-5 text-2xl font-semibold text-platinum">{title}</h2>
              <p className="mt-4 text-sm leading-7 text-platinum/68">{body}</p>
            </div>
          );
        })}
      </section>

      <Dialog.Root open={Boolean(activeEntry)} onOpenChange={(open) => (!open ? setActiveEntry(null) : undefined)}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-[#13233a]/18 backdrop-blur-sm" />
          <Dialog.Content className="fixed left-1/2 top-1/2 z-50 flex h-[85vh] w-[94vw] max-w-5xl -translate-x-1/2 -translate-y-1/2 flex-col rounded-[28px] border border-graphite/10 bg-[linear-gradient(180deg,#fffefd,#f4f0e8)] p-6 shadow-2xl">
            <div className="flex items-center justify-between gap-4 border-b border-graphite/10 pb-4">
              <div>
                <p className="eyebrow">COA Preview</p>
                <h2 className="mt-2 text-2xl font-semibold text-platinum">{activeEntry?.product_name} - {activeEntry?.batch_number}</h2>
              </div>
              <div className="flex items-center gap-3">
                {activeEntry?.file_url ? (
                  <a href={activeEntry.file_url} download className="button-primary h-10 px-4">
                    Download File
                  </a>
                ) : null}
                <Dialog.Close className="grid h-10 w-10 place-items-center rounded-full border border-graphite/10 bg-white/90 text-platinum">
                  <X className="h-4 w-4" />
                </Dialog.Close>
              </div>
            </div>
            <div className="mt-5 flex-1 overflow-hidden rounded-[22px] border border-graphite/10 bg-white/80">
              {activeEntry?.file_url ? (
                isPdf(activeEntry.file_url) ? (
                  <iframe src={activeEntry.file_url} title={activeEntry.batch_number} className="h-full w-full" />
                ) : (
                  <div className="relative h-full min-h-[420px] w-full overflow-auto bg-white">
                    <Image
                      src={activeEntry.file_url}
                      alt={`${activeEntry.product_name} ${activeEntry.batch_number}`}
                      fill
                      className="object-contain"
                    />
                  </div>
                )
              ) : (
                <div className="grid h-full place-items-center text-sm text-platinum/55">No preview available.</div>
              )}
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </>
  );
}

function isPdf(url: string) {
  return url.toLowerCase().includes(".pdf");
}

function FilterSelect({
  value,
  onChange,
  options,
  label
}: {
  value: string;
  onChange: (value: string) => void;
  options: string[];
  label: string;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        aria-label={label}
        className="h-12 w-full appearance-none rounded-full border border-graphite/10 bg-white/90 px-4 text-sm capitalize text-platinum outline-none"
      >
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-platinum/35" />
    </div>
  );
}
