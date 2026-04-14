import { FaqDirectory } from "@/components/faq/faq-directory";
import { faqDirectory } from "@/lib/site";

export default function FaqPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqDirectory.flatMap((group) =>
      group.items.map((item) => ({
        "@type": "Question",
        name: item.question,
        acceptedAnswer: {
          "@type": "Answer",
          text: item.answer
        }
      }))
    )
  };

  return (
    <main className="shell py-16">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <div className="max-w-4xl">
        <p className="text-[11px] font-medium uppercase tracking-[0.34em] text-black">FAQ</p>
        <h1 className="mt-4 text-5xl font-semibold text-platinum">Frequently Asked Questions</h1>
        <p className="mt-5 text-base leading-8 text-platinum/72">
          Browse answers about legality, product handling, shipping timelines, COAs, payments, and customer support.
        </p>
      </div>
      <div className="mt-10">
        <FaqDirectory groups={faqDirectory} />
      </div>
    </main>
  );
}
