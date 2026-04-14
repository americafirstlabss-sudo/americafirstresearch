import { notFound } from "next/navigation";
import { policyPages } from "@/lib/site";

const content: Record<string, string> = {
  terms: "Placeholder terms of service content for the storefront.",
  privacy: "Placeholder privacy policy content for the storefront.",
  shipping: "Placeholder shipping policy content for domestic order handling.",
  refund: "Placeholder refund policy content with editable conditions.",
  disclaimer: "For research purposes only. Not for human consumption. This page is intentionally structured as an editable compliance block."
};

export default function PolicyPage({ params }: { params: { slug: string } }) {
  const page = policyPages.find((entry) => entry.slug === params.slug);
  if (!page) notFound();

  return (
    <main className="shell py-16">
      <div className="panel p-10">
        <p className="eyebrow">Policy</p>
        <h1 className="mt-4 text-4xl font-semibold text-white">{page.title}</h1>
        <p className="mt-6 max-w-4xl text-base leading-8 text-white/62">{content[page.slug]}</p>
      </div>
    </main>
  );
}
