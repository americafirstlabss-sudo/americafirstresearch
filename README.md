# Aether BioLabs Storefront

Custom Next.js ecommerce storefront for a premium USA-based peptide and research brand.

## Stack

- Next.js App Router
- Tailwind CSS custom design system
- Supabase for auth, products, customers, orders, reviews, consultations, and admin data
- Supabase-backed checkout orchestration with external payment provider handoff

## Included

- Custom homepage, collections, product page, merch page, MD consulting page, cart, checkout, account, FAQ, contact, about, and policy routes
- Protected admin surface with overview, orders, products, merch, customers, inventory, discount codes, and consultation sections
- Newsletter capture and consultation lead endpoints
- Bankful hosted payment handoff scaffolding
- Supabase schema in [supabase/schema.sql](C:/Users/tanne/OneDrive/Documentos/New%20project/supabase/schema.sql)

## Setup

1. Install dependencies with `npm install`
2. Copy `.env.example` to `.env.local`
3. Add Supabase and Bankful keys
4. Optionally set `ADMIN_EMAILS` as a comma-separated allowlist for dashboard access
5. Run the SQL in `supabase/schema.sql`
6. Start the app with `npm run dev`

## Notes

- Legacy HTML prototypes are still in the workspace but are no longer the primary implementation path.
- The current cart uses local client state for UI; wire it into persistent checkout payloads as you connect your live Bankful flow.
- The dashboard is structured and styled, with Supabase plumbing points in place for live data integration.
