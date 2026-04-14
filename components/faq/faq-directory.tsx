"use client";

import { useMemo, useState } from "react";
import * as Accordion from "@radix-ui/react-accordion";
import { Beaker, ChevronDown, CreditCard, FlaskConical, LifeBuoy, Search, ShieldCheck, Truck } from "lucide-react";
import Link from "next/link";

type FaqGroup = {
  category: string;
  icon: string;
  items: Array<{
    question: string;
    answer: string;
  }>;
};

const iconMap = {
  shield: ShieldCheck,
  beaker: Beaker,
  truck: Truck,
  "credit-card": CreditCard,
  flask: FlaskConical,
  "life-buoy": LifeBuoy
};

export function FaqDirectory({ groups }: { groups: FaqGroup[] }) {
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredGroups = useMemo(() => {
    const search = query.trim().toLowerCase();
    return groups
      .map((group) => ({
        ...group,
        items: group.items.filter((item) => {
          const categoryMatch = activeCategory === "All" || group.category === activeCategory;
          const searchMatch =
            !search ||
            item.question.toLowerCase().includes(search) ||
            item.answer.toLowerCase().includes(search) ||
            group.category.toLowerCase().includes(search);
          return categoryMatch && searchMatch;
        })
      }))
      .filter((group) => group.items.length > 0);
  }, [activeCategory, groups, query]);

  return (
    <>
      <div className="sticky top-20 z-20 mb-8 space-y-4 rounded-[28px] border border-graphite/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.96),rgba(245,241,232,0.94))] p-4 backdrop-blur-xl">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-platinum/35" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search questions"
            className="h-14 w-full rounded-full border border-graphite/10 bg-white/90 pl-11 pr-5 text-sm text-platinum outline-none placeholder:text-platinum/35"
          />
        </div>
        <div className="flex flex-wrap gap-3">
          {["All", ...groups.map((group) => group.category)].map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={`rounded-full border px-4 py-2 text-sm transition ${
                activeCategory === category
                  ? "border-[#9c7a2b] bg-[linear-gradient(135deg,rgba(146,32,48,0.18),rgba(156,122,43,0.18))] text-white"
                  : "border-graphite/10 bg-white/88 text-platinum/65 hover:border-[#6f88b8] hover:text-platinum"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="space-y-8">
        {filteredGroups.map((group) => {
          const Icon = iconMap[group.icon as keyof typeof iconMap] ?? ShieldCheck;
          return (
            <section key={group.category} className="panel p-6 md:p-8">
              <div className="mb-6 flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-2xl border border-[#9c7a2b]/25 bg-[#9c7a2b]/10">
                  <Icon className="h-5 w-5 text-[#9c7a2b]" />
                </div>
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.34em] text-black">{group.category}</p>
                  <h2 className="mt-1 text-2xl font-semibold text-platinum">{group.category}</h2>
                </div>
              </div>

              <Accordion.Root type="multiple" className="space-y-4">
                {group.items.map((item) => (
                  <Accordion.Item key={item.question} value={item.question} className="rounded-[24px] border border-graphite/10 bg-white/82 px-5 transition hover:border-[#9c7a2b]/30">
                    <Accordion.Header>
                      <Accordion.Trigger className="flex w-full items-center justify-between gap-4 py-5 text-left text-base font-medium text-platinum">
                        <span>{item.question}</span>
                        <ChevronDown className="h-4 w-4 shrink-0 text-platinum/45 transition data-[state=open]:rotate-180" />
                      </Accordion.Trigger>
                    </Accordion.Header>
                    <Accordion.Content className="overflow-hidden pb-5 text-sm leading-7 text-platinum/70">
                      {item.answer}
                    </Accordion.Content>
                  </Accordion.Item>
                ))}
              </Accordion.Root>
            </section>
          );
        })}
      </div>

      <section className="panel mt-10 p-8 md:p-10">
        <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.34em] text-black">Support</p>
            <h2 className="mt-3 text-3xl font-semibold text-platinum">Still have questions?</h2>
            <p className="mt-3 text-sm leading-7 text-platinum/68">Connect with the America First Labs support team for order help, documentation questions, and general guidance.</p>
          </div>
          <Link href="/contact" className="button-primary">
            Contact Support
          </Link>
        </div>
      </section>
    </>
  );
}
