"use client";

import { useState } from "react";
import Link from "next/link";
import * as Dialog from "@radix-ui/react-dialog";
import { Menu, Search, ShoppingBag, User, X } from "lucide-react";
import { useAuth } from "@/components/auth/auth-provider";
import { BrandMark } from "@/components/layout/brand-mark";
import { navigation } from "@/lib/site";
import { useCart } from "@/components/cart/cart-provider";

export function SiteHeader() {
  const { count, openCart } = useCart();
  const { user } = useAuth();
  const [mobileOpen, setMobileOpen] = useState(false);
  const accountHref = user ? "/account" : "/auth?next=/account";

  return (
    <header className="sticky top-0 z-40 border-b border-[#13233a]/10 bg-[rgba(251,250,246,0.88)] backdrop-blur-xl">
      <div className="shell flex h-16 items-center justify-between gap-3 sm:h-20 sm:gap-4">
        <Link href="/" className="min-w-0">
          <BrandMark />
        </Link>
        <nav className="hidden items-center gap-7 lg:flex">
          {navigation.map((item) => (
            <Link key={item.href} href={item.href} className="text-sm text-[#13233a]/72 transition hover:text-[#922030]">
              {item.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-2 sm:gap-3">
          <Link href="/collections" className="button-secondary hidden sm:inline-flex">See Catalog</Link>
          <Link href="/search" aria-label="Search site" className="hidden h-12 w-12 items-center justify-center rounded-full border border-[#13233a]/12 bg-white/80 text-[#13233a] sm:inline-flex">
            <Search className="h-5 w-5" />
          </Link>
          <Link href={accountHref} aria-label="Account" className="hidden h-12 w-12 items-center justify-center rounded-full border border-[#13233a]/12 bg-white/80 text-[#13233a] sm:inline-flex">
            <User className="h-5 w-5" />
          </Link>
          <Link href="/search" aria-label="Search site" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#13233a]/12 bg-white/80 text-[#13233a] sm:hidden">
            <Search className="h-4 w-4" />
          </Link>
          <Link href={accountHref} aria-label="Account" className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#13233a]/12 bg-white/80 text-[#13233a] sm:hidden">
            <User className="h-4 w-4" />
          </Link>
          <button type="button" onClick={openCart} className="relative inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#13233a]/12 bg-white/80 text-[#13233a] sm:h-12 sm:w-12">
            <ShoppingBag className="h-5 w-5" />
            <span className="absolute -right-1 -top-1 grid h-5 min-w-5 place-items-center rounded-full bg-[#922030] px-1 text-[10px] font-semibold text-white">
              {count}
            </span>
          </button>
          <button type="button" onClick={() => setMobileOpen(true)} className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#13233a]/12 bg-white/80 text-[#13233a] lg:hidden sm:h-12 sm:w-12">
            <Menu className="h-4 w-4 sm:h-5 sm:w-5" />
          </button>
        </div>
      </div>
      <div className="border-t border-[#13233a]/8 bg-[linear-gradient(90deg,rgba(111,136,184,0.08),rgba(146,32,48,0.06),rgba(156,122,43,0.08))] px-4 py-2 text-center text-[9px] uppercase tracking-[0.28em] text-[#13233a]/48 sm:text-[11px] sm:tracking-[0.35em]">
        For research purposes only. Not for human consumption.
      </div>

      <Dialog.Root open={mobileOpen} onOpenChange={setMobileOpen}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 z-50 bg-[#13233a]/25 backdrop-blur-sm lg:hidden" />
          <Dialog.Content className="fixed right-0 top-0 z-50 flex h-full w-full max-w-sm flex-col border-l border-[#13233a]/10 bg-[linear-gradient(180deg,#fbfaf6,#f2eee4)] p-5 sm:p-6 lg:hidden">
            <div className="flex items-center justify-between">
              <BrandMark />
              <Dialog.Close className="grid h-10 w-10 place-items-center rounded-full border border-[#13233a]/10 bg-white/80 text-[#13233a]">
                <X className="h-4 w-4" />
              </Dialog.Close>
            </div>
            <nav className="mt-10 grid gap-3">
              <Link href="/search" onClick={() => setMobileOpen(false)} className="rounded-2xl border border-[#13233a]/10 bg-white/70 px-4 py-4 text-sm text-[#13233a]/78 transition hover:border-gold/40 hover:text-[#922030]">
                Search Site
              </Link>
              <Link href={accountHref} onClick={() => setMobileOpen(false)} className="rounded-2xl border border-[#13233a]/10 bg-white/70 px-4 py-4 text-sm text-[#13233a]/78 transition hover:border-gold/40 hover:text-[#922030]">
                {user ? "My Account" : "Login / Register"}
              </Link>
              {navigation.map((item) => (
                <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)} className="rounded-2xl border border-[#13233a]/10 bg-white/70 px-4 py-4 text-sm text-[#13233a]/78 transition hover:border-gold/40 hover:text-[#922030]">
                  {item.label}
                </Link>
              ))}
            </nav>
            <Link href="/collections" onClick={() => setMobileOpen(false)} className="button-primary mt-6 w-full">
              See Catalog
            </Link>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </header>
  );
}
