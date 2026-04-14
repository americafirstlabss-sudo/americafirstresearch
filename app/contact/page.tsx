import Link from "next/link";
import { ContactForm } from "@/components/forms/contact-form";
import { siteConfig } from "@/lib/site";

export default function ContactPage() {
  return (
    <main className="shell py-16">
      <div className="max-w-4xl">
        <p className="text-[11px] font-medium uppercase tracking-[0.34em] text-black">Contact Us</p>
        <h1 className="mt-4 text-5xl font-semibold text-platinum">Contact Us</h1>
        <p className="mt-5 text-base leading-8 text-platinum/72">
          Our team is here to help. Reach out with any questions regarding orders, products, or general support.
        </p>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1fr_0.8fr]">
        <ContactForm />

        <div>
          <div className="panel p-6 md:p-8">
            <p className="text-[11px] font-medium uppercase tracking-[0.34em] text-black">Support Information</p>
            <div className="mt-5 space-y-4 text-sm text-platinum/72">
              <p>
                <span className="font-semibold text-platinum">Support Email:</span> {siteConfig.email}
              </p>
              <p>Our team typically responds within 24-48 hours.</p>
              <p>Support hours: Monday-Friday, 9:00 AM-5:00 PM EST</p>
            </div>
          </div>

          <div className="panel mt-6 p-6 md:p-8">
            <p className="text-[11px] font-medium uppercase tracking-[0.34em] text-black">Need Immediate Help?</p>
            <div className="mt-5 grid gap-3">
              <Link href="/account" className="button-secondary justify-center">
                Track Your Order
              </Link>
              <Link href="/faq" className="button-secondary justify-center">
                View FAQs
              </Link>
              <Link href="/coa" className="button-secondary justify-center">
                View COA Library
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
