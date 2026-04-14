"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { Search } from "lucide-react";
import { SearchItem } from "@/lib/search";

function matches(item: SearchItem, query: string) {
  const haystack = `${item.title} ${item.description} ${item.meta ?? ""}`.toLowerCase();
  return haystack.includes(query.toLowerCase());
}

export function SearchClient({
  items,
  initialQuery
}: {
  items: SearchItem[];
  initialQuery?: string;
}) {
  const [query, setQuery] = useState(initialQuery ?? "");

  const results = useMemo(() => {
    const trimmed = query.trim();
    if (!trimmed) return items;
    return items.filter((item) => matches(item, trimmed));
  }, [items, query]);

  return (
    <div>
      <div className="rounded-[32px] border border-graphite/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.98),rgba(248,246,240,0.94))] p-6 shadow-[0_22px_60px_rgba(19,35,58,0.06)] sm:p-8">
        <p className="text-[11px] font-medium uppercase tracking-[0.34em] text-black">Site Search</p>
        <h1 className="mt-4 font-[var(--font-display)] text-4xl text-platinum sm:text-5xl">Search the entire site</h1>
        <p className="mt-4 max-w-2xl text-sm leading-7 text-platinum/68">
          Search products, COA reports, FAQs, consulting, contact, and the main storefront pages from one place.
        </p>
        <div className="relative mt-6">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-platinum/42" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search anything on the site"
            className="h-14 w-full rounded-2xl border border-graphite/10 bg-white/92 pl-12 pr-4 text-sm text-platinum outline-none transition placeholder:text-platinum/40 focus:border-cyan"
          />
        </div>
      </div>

      <div className="mt-10">
        <div className="flex items-center justify-between gap-4">
          <p className="text-[11px] font-medium uppercase tracking-[0.34em] text-black">Results</p>
          <p className="text-sm text-platinum/58">{results.length} match{results.length === 1 ? "" : "es"}</p>
        </div>

        {results.length ? (
          <div className="mt-5 grid gap-4">
            {results.map((item) => (
              <Link
                key={item.id}
                href={item.href}
                className="rounded-[28px] border border-graphite/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.95),rgba(247,244,237,0.92))] p-5 shadow-[0_16px_40px_rgba(19,35,58,0.05)] transition hover:border-cyan/45 hover:bg-white"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full border border-graphite/10 bg-white/80 px-3 py-1 text-[11px] uppercase tracking-[0.24em] text-platinum/56">
                    {item.meta ?? item.type}
                  </span>
                  <span className="text-xs uppercase tracking-[0.24em] text-platinum/42">{item.type}</span>
                </div>
                <h2 className="mt-4 text-2xl font-semibold text-platinum">{item.title}</h2>
                <p className="mt-3 max-w-3xl text-sm leading-7 text-platinum/68">{item.description}</p>
              </Link>
            ))}
          </div>
        ) : (
          <div className="mt-5 rounded-[28px] border border-graphite/10 bg-white/80 p-6 text-sm text-platinum/68">
            No results found. Try searching for a product, FAQ topic, batch number, consulting, or contact.
          </div>
        )}
      </div>
    </div>
  );
}
