"use client";

import * as Accordion from "@radix-ui/react-accordion";
import { ChevronDown } from "lucide-react";

type HomepageFaq = {
  question: string;
  answer: string;
};

export function HomepageFaqPreview({ items }: { items: HomepageFaq[] }) {
  return (
    <Accordion.Root type="single" collapsible className="space-y-4">
      {items.map((item) => (
        <Accordion.Item
          key={item.question}
          value={item.question}
          className="panel overflow-hidden px-6 transition hover:border-[#9c7a2b]/30"
        >
          <Accordion.Header>
            <Accordion.Trigger className="flex w-full items-center justify-between gap-4 py-5 text-left text-base font-medium text-platinum">
              <span>{item.question}</span>
              <ChevronDown className="h-4 w-4 shrink-0 text-platinum/45 transition data-[state=open]:rotate-180" />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className="overflow-hidden pb-5 text-sm leading-7 text-platinum/68">
            {item.answer}
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
}
