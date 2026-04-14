import type { Metadata } from "next";
import { IBM_Plex_Sans, Sora } from "next/font/google";
import "@/app/globals.css";
import { AuthProvider } from "@/components/auth/auth-provider";
import { siteConfig } from "@/lib/site";
import { CartDrawer } from "@/components/cart/cart-drawer";
import { CartProvider } from "@/components/cart/cart-provider";
import { SiteFooter } from "@/components/layout/site-footer";
import { SiteHeader } from "@/components/layout/site-header";

const sora = Sora({ subsets: ["latin"], variable: "--font-display" });
const plex = IBM_Plex_Sans({ subsets: ["latin"], weight: ["400", "500", "600", "700"], variable: "--font-body" });

export const metadata: Metadata = {
  title: `${siteConfig.name} | Premium Research Storefront`,
  description: siteConfig.description
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${sora.variable} ${plex.variable}`}>
      <body className="font-[var(--font-body)]">
        <AuthProvider>
          <CartProvider>
            <SiteHeader />
            {children}
            <SiteFooter />
            <CartDrawer />
          </CartProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
