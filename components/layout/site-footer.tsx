import Link from "next/link";
import { Instagram, Facebook, Youtube } from "lucide-react";
import { NewsletterForm } from "@/components/forms/newsletter-form";
import { navigation, policyPages, siteConfig } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="border-t border-graphite/10 bg-[linear-gradient(180deg,#ffffff,#f5f1e8)]">
      <div className="shell grid gap-10 py-16 lg:grid-cols-[1.1fr_0.9fr_0.8fr]">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.34em] text-black">Research Operations</p>
          <h2 className="mt-4 text-3xl font-semibold text-black">{siteConfig.name}</h2>
          <div className="mt-6 space-y-2 text-sm text-platinum/62">
            <p>{siteConfig.email}</p>
          </div>
          <div className="mt-6 flex items-center gap-3">
            {[Instagram, Facebook, Youtube].map((Icon, index) => (
              <a key={index} href="#" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-graphite/10 bg-white/85 text-platinum/65 transition hover:border-[#9c7a2b]/40 hover:text-[#922030]">
                <Icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.34em] text-black">Navigation</p>
          <div className="mt-5 grid grid-cols-2 gap-3 text-sm text-platinum/68">
            {navigation.map((item) => (
              <Link key={item.href} href={item.href} className="transition hover:text-[#922030]">
                {item.label}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.34em] text-black">Newsletter</p>
          <p className="mt-4 text-sm leading-7 text-platinum/68">Get updates on catalog releases, consulting availability, and quality program notices.</p>
          <NewsletterForm />
        </div>
      </div>
      <div className="shell grid gap-10 border-t border-graphite/10 py-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="eyebrow">Compliance</p>
          <p className="mt-4 text-sm leading-7 text-platinum/68">For research purposes only. Not for human use.</p>
        </div>
        <div>
          <div className="mt-5 space-y-3 text-sm text-platinum/68">
            {policyPages.map((page) => (
              <Link key={page.slug} href={`/policies/${page.slug}`} className="block transition hover:text-[#922030]">
                {page.title}
              </Link>
            ))}
          </div>
        </div>
      </div>
      <div className="border-t border-graphite/10 py-5 text-center text-xs tracking-[0.24em] text-platinum/45">
        FOR RESEARCH PURPOSES ONLY. NOT FOR HUMAN CONSUMPTION.
      </div>
    </footer>
  );
}
