import Image from "next/image";
import Link from "next/link";
import { Beaker, Headphones, Microscope, ShieldCheck, Stethoscope, TimerReset, Truck } from "lucide-react";
import { HomepageFaqPreview } from "@/components/faq/homepage-faq-preview";
import { faqDirectory, products } from "@/lib/site";

const bestSellers = products.filter((product) =>
  ["ghk-cu", "bpc-157", "ipamorelin", "cjc-1295-no-dac"].includes(product.slug)
);

const homepageFaqs = faqDirectory.flatMap((group) => group.items).slice(0, 6);

const consultingFeatures = [
  {
    title: "1:1 Review",
    body: "Personalized planning around your goals, symptoms, labs, and current wellness priorities.",
    icon: Stethoscope
  },
  {
    title: "Weekday Booking",
    body: "Choose Monday through Friday appointment windows with integrated time-slot selection.",
    icon: TimerReset
  },
  {
    title: "$99 Entry Call",
    body: "Clear upfront pricing for your initial consultation request and booking review.",
    icon: ShieldCheck
  }
];

export default function HomePage() {
  return (
    <main>
      <section className="shell pb-20 pt-14 lg:pt-24">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.34em] text-black">America First Labs</p>
          <h1 className="mt-6 max-w-4xl font-[var(--font-display)] text-5xl leading-[0.92] text-platinum md:text-7xl">
            The Leader of Peptides
          </h1>
          <p className="mt-6 max-w-3xl text-lg leading-8 text-platinum/72">
            America First Labs specializes in the synthesis of highly purified peptides, proteins, and amino acid derivatives for scientific research and development.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Link href="/collections" className="button-primary">
              See Catalog
            </Link>
            <Link href="/coa" className="button-secondary">
              Quality Program
            </Link>
          </div>
          <div className="mt-8 flex flex-wrap gap-3">
            {[
              "3rd Party Tested",
              "Free Shipping On Orders $200+",
              "Scientific Research Use Only"
            ].map((badge) => (
              <div key={badge} className="rounded-full border border-graphite/10 bg-white/80 px-4 py-2 text-xs uppercase tracking-[0.24em] text-platinum/74">
                {badge}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="shell py-20">
        <div>
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.34em] text-black">Scientific Research Use</p>
            <h2 className="mt-4 text-4xl font-semibold text-platinum md:text-5xl">Buy Peptides for Scientific Research and Development</h2>
            <p className="mt-6 text-base leading-8 text-platinum/72">
              America First Labs employs state-of-the-art automated and manual peptide synthesizers, along with advanced solution and solid-phase peptide synthetic technology to deliver high quality peptides and proteins with a purity-focused process.
            </p>
            <p className="mt-5 text-base leading-8 text-platinum/72">
              From synthesis through packaging and delivery, each stage follows strict quality control standards. Comprehensive testing in the in-house analytical laboratory verifies sequential fingerprinting with precision and consistency before products reach customers.
            </p>
          </div>
        </div>
      </section>

      <section className="shell py-20">
        <div className="mb-10 text-center">
          <h2 className="text-4xl font-semibold text-platinum md:text-5xl">Best Sellers</h2>
        </div>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {bestSellers.map((product) => (
            <article key={product.id} className="group panel overflow-hidden">
              <div className="relative aspect-[4/4.8] overflow-hidden bg-white/[0.03]">
                <Image src={product.image} alt={product.name} fill className="object-cover transition duration-700 group-hover:scale-105" />
              </div>
              <div className="p-5">
                <h3 className="text-xl font-semibold text-platinum">{product.name}</h3>
                <p className="mt-2 text-sm text-platinum/68">
                  {product.slug === "ghk-cu" || product.slug === "bpc-157" ? `From $${product.price.toFixed(2)}` : `$${product.price.toFixed(2)}`}
                </p>
                <Link href={`/products/${product.slug}`} className="button-secondary mt-5 w-full">
                  View Product
                </Link>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="shell py-12">
        <div className="grid gap-6 lg:grid-cols-3">
          {[
            {
              title: "Third Party Verified",
              body: "Independently tested batch by batch with traceable Certificates of Analysis for every release.",
              icon: ShieldCheck
            },
            {
              title: "Fast, Reliable Shipping",
              body: "Orders placed before 12 PM CST Monday through Friday ship the same day for faster delivery.",
              icon: Truck
            },
            {
              title: "Dedicated Customer Support",
              body: "Knowledgeable support is available during the week with extended weekend availability.",
              icon: Headphones
            }
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.title} className="panel p-6">
                <Icon className="h-7 w-7 text-[#9c7a2b]" />
                <h3 className="mt-5 text-2xl font-semibold text-platinum">{item.title}</h3>
                <p className="mt-4 text-sm leading-7 text-platinum/68">{item.body}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="shell py-20">
        <div className="grid gap-8 lg:grid-cols-[0.92fr_1.08fr]">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.34em] text-black">Quality Program</p>
            <h2 className="mt-4 text-4xl font-semibold text-platinum md:text-5xl">America First Labs Quality Assurance Program</h2>
            <p className="mt-6 text-base leading-8 text-platinum/72">
              At America First Labs, quality is the standard. The quality assurance program reflects a commitment to consistent purity, precision, and reliability across every research product in the catalog.
            </p>
            <Link href="/coa" className="button-primary mt-8">
              View COA Library
            </Link>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <div className="panel p-6">
              <Beaker className="h-7 w-7 text-[#9c7a2b]" />
              <h3 className="mt-5 text-xl font-semibold text-platinum">Transparency</h3>
              <p className="mt-3 text-sm leading-7 text-platinum/68">Each batch is benchmarked before release and paired with lab documentation.</p>
            </div>
            <div className="panel p-6">
              <ShieldCheck className="h-7 w-7 text-[#9c7a2b]" />
              <h3 className="mt-5 text-xl font-semibold text-platinum">Verification</h3>
              <p className="mt-3 text-sm leading-7 text-platinum/68">Testing standards and quality initiatives are designed to keep every batch accountable.</p>
            </div>
            <div className="panel p-6 md:col-span-2">
              <p className="text-sm leading-7 text-platinum/68">
                The visual structure here is designed to reinforce trust first: premium spacing, clear batch language, and a polished clinical tone that supports conversion without clutter.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="shell py-20">
        <div className="panel overflow-hidden p-8 md:p-10">
          <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr]">
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.34em] text-black">Longevity MD Consulting</p>
              <h2 className="mt-4 text-4xl font-semibold text-platinum md:text-5xl">Physician-Guided Wellness and Longevity Support</h2>
              <p className="mt-6 text-base leading-8 text-platinum/72">
                Connect with America First Labs for one-on-one consulting focused on recovery, hormone support, performance, metabolic health, and long-term longevity strategy.
              </p>
              <div className="mt-8 flex flex-col gap-4 sm:flex-row">
                <Link href="/consulting" className="button-primary">
                  Book a $99 Consultation
                </Link>
                <Link href="/checkout" className="button-secondary">
                  View Booking Checkout
                </Link>
              </div>
            </div>
            <div className="grid gap-5">
              {consultingFeatures.map((item) => {
                const Icon = item.icon;
                return (
                  <div key={item.title} className="rounded-[26px] border border-graphite/10 bg-white/82 p-6">
                    <div className="flex items-start gap-4">
                      <div className="grid h-12 w-12 place-items-center rounded-2xl border border-[#9c7a2b]/25 bg-[#9c7a2b]/10">
                        <Icon className="h-5 w-5 text-[#9c7a2b]" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold text-platinum">{item.title}</h3>
                        <p className="mt-3 text-sm leading-7 text-platinum/68">{item.body}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      <section className="shell py-16">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.34em] text-black">FAQs</p>
            <h2 className="mt-4 text-4xl font-semibold text-platinum">Frequently Asked Questions</h2>
          </div>
          <HomepageFaqPreview items={homepageFaqs} />
        </div>
      </section>
    </main>
  );
}


