# Dealership Site — Fresh Scaffold

Next.js 14 (App Router) + TypeScript + Tailwind + Supabase + GSAP/Lenis.
No `node_modules` included — install fresh, and no existing design opinions baked in
beyond placeholder tokens you're meant to overwrite.

## 1. Install

```bash
npm install
cp .env.example .env.local
```

Fill `.env.local` with your Supabase project's URL and anon key (Project Settings → API).

## 2. Create the database tables

In the Supabase SQL editor, run:

```sql
create table cars (
  id uuid primary key default gen_random_uuid(),
  make text not null,
  model text not null,
  year int not null,
  price numeric not null,
  mileage_km int not null,
  fuel_type text not null check (fuel_type in ('petrol','diesel','electric','hybrid','cng')),
  transmission text not null check (transmission in ('manual','automatic')),
  condition text not null check (condition in ('new','used')),
  color text not null,
  vin text,
  image_urls text[] not null default '{}',
  description text,
  created_at timestamptz not null default now()
);

create table leads (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text not null,
  message text,
  interested_car_id uuid references cars(id),
  created_at timestamptz not null default now()
);

-- Public read on cars, public insert on leads (contact form), nothing else public
alter table cars enable row level security;
alter table leads enable row level security;

create policy "Cars are publicly readable" on cars for select using (true);
create policy "Anyone can submit a lead" on leads for insert with check (true);
```

Add a `cars` bucket in Supabase Storage if you want to host images there — otherwise
just paste external image URLs into `image_urls`.

## 3. Run it

```bash
npm run dev
```

Inventory and contact pages are already wired to Supabase. Admin page has **no auth
guard yet** — add one (Supabase Auth + middleware check) before it's ever public.

## 4. Bring your Stitch designs in

Every file with a `// TODO` or `⚠️ PLACEHOLDER` comment is meant to be replaced:

1. **`tailwind.config.ts`** — swap the `brand.*` colors and `fontFamily` for the
   values from your Stitch `DESIGN.md`. Do this first — every page inherits from it.
2. **`app/layout.tsx`** — load your real display/body fonts via `next/font` and set
   the `--font-display` / `--font-body` CSS variables.
3. **`app/page.tsx`, `app/inventory/page.tsx`, `app/inventory/[id]/page.tsx`,
   `app/contact/page.tsx`** — replace the placeholder markup with your Stitch export.
   Keep the existing data-fetching and the `useGSAP` hero pattern in `page.tsx`; just
   retarget the CSS selectors at your real hero elements.
4. If you connected the Stitch MCP server to Claude Code, you can ask it directly:
   *"rebuild app/inventory/page.tsx to match this Stitch design, keep the Supabase
   query and CarCard component as-is."*

## 5. Layer in 21st.dev components + animation

Once a page's real markup is in:
- Pull interactive pieces (filters, carousels, modals) from 21st.dev via the Magic
  MCP (`/ui ...`) instead of hand-rolling them.
- Add GSAP `ScrollTrigger` reveals last, after the real layout is in place — animating
  placeholder divs just means redoing the animation code later.

## Structure

```
app/
  layout.tsx          root layout — Navbar + SmoothScroll wrapper
  page.tsx             homepage (placeholder)
  inventory/page.tsx    car grid, fetches from Supabase
  inventory/[id]/page.tsx  car detail + EMI calculator
  contact/page.tsx      lead form → Supabase insert
  admin/page.tsx        dashboard shell (add auth before shipping)
components/
  SmoothScroll.tsx      Lenis + GSAP ticker sync, respects prefers-reduced-motion
  Navbar.tsx
  CarCard.tsx
  EMICalculator.tsx      fully functional, real EMI math
lib/
  supabase/client.ts     browser client
  supabase/server.ts     server client (Server Components/Actions)
  types.ts               Car / Lead types
```
