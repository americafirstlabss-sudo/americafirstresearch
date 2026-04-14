create extension if not exists "pgcrypto";

create table if not exists public.product_categories (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text,
  created_at timestamptz not null default now()
);

create table if not exists public.products (
  id uuid primary key default gen_random_uuid(),
  category_id uuid references public.product_categories(id),
  slug text not null unique,
  name text not null,
  kind text not null default 'compound',
  price numeric(10,2) not null,
  compare_at_price numeric(10,2),
  dosage text,
  stock integer not null default 0,
  short_summary text,
  description text,
  image_url text,
  gallery jsonb not null default '[]'::jsonb,
  size_options jsonb not null default '[]'::jsonb,
  badges jsonb not null default '[]'::jsonb,
  details jsonb not null default '[]'::jsonb,
  purity text,
  format text,
  storage text,
  sku text,
  featured boolean not null default false,
  best_seller boolean not null default false,
  active boolean not null default true,
  created_at timestamptz not null default now()
);

create table if not exists public.customers (
  id uuid primary key default gen_random_uuid(),
  auth_user_id uuid unique,
  email text not null unique,
  first_name text,
  last_name text,
  phone text,
  marketing_opt_in boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.shipping_addresses (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references public.customers(id) on delete cascade,
  name text,
  line1 text not null,
  line2 text,
  city text not null,
  state text not null,
  postal_code text not null,
  country text not null default 'US',
  is_default boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  customer_id uuid references public.customers(id),
  shipping_address_id uuid references public.shipping_addresses(id),
  stripe_checkout_id text unique,
  stripe_payment_intent_id text,
  customer_email text,
  status text not null default 'pending',
  source text not null default 'storefront',
  total_amount numeric(10,2) not null default 0,
  subtotal_amount numeric(10,2) not null default 0,
  discount_amount numeric(10,2) not null default 0,
  notes text,
  created_at timestamptz not null default now()
);

create table if not exists public.order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid not null references public.orders(id) on delete cascade,
  product_id uuid references public.products(id),
  product_name text not null,
  product_slug text,
  quantity integer not null default 1,
  unit_price numeric(10,2) not null default 0,
  selected_option text,
  product_image text,
  created_at timestamptz not null default now()
);

create table if not exists public.reviews (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references public.products(id) on delete cascade,
  customer_id uuid references public.customers(id),
  reviewer_name text not null,
  rating integer not null check (rating between 1 and 5),
  title text,
  body text,
  approved boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.discount_codes (
  id uuid primary key default gen_random_uuid(),
  code text not null unique,
  description text,
  discount_type text not null default 'percent',
  discount_value numeric(10,2) not null,
  active boolean not null default true,
  usage_limit integer,
  used_count integer not null default 0,
  starts_at timestamptz,
  ends_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists public.consultations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  company text,
  interest text,
  message text,
  status text not null default 'new',
  deposit_paid boolean not null default false,
  created_at timestamptz not null default now()
);

create table if not exists public.consulting_leads (
  id uuid primary key default gen_random_uuid(),
  full_name text not null,
  email text not null,
  primary_goal text,
  preferred_date date,
  time_zone text not null default 'Eastern Time',
  preferred_time_slot text,
  notes text,
  booking_fee numeric(10,2) not null default 99.00,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

create table if not exists public.contact_submissions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text not null,
  message text not null,
  order_number text,
  created_at timestamptz not null default now()
);

create table if not exists public.lab_results (
  id uuid primary key default gen_random_uuid(),
  product_name text not null,
  batch_number text not null unique,
  test_date date,
  lab_name text,
  purity numeric(5,2),
  file_url text not null,
  storage_path text,
  created_at timestamptz not null default now()
);

create table if not exists public.inventory_logs (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references public.products(id) on delete cascade,
  quantity_delta integer not null,
  reason text not null,
  created_at timestamptz not null default now()
);

create table if not exists public.blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text,
  body text,
  published boolean not null default false,
  created_at timestamptz not null default now()
);
