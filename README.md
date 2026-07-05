# 🚘 Car Planet — Premium Used Car Dealership

A modern, full-stack dealership website built for **Car Planet**, a premium pre-owned car showroom. The website allows customers to browse inventory, book test drives, explore insurance and finance options, and contact the dealership — with real-time WhatsApp notifications sent straight to the owner's phone.

---

## Features

- **Home Page** — Animated hero with featured inventory, insurance, finance and sell-car sections
- **Inventory** — Browse all cars with filters for fuel, transmission, and price range
- **Car Detail Pages** — Full specs, image gallery, pricing and enquiry options
- **Book a Test Drive** — Form with date/time selection (Mondays blocked), WhatsApp notification on submit
- **Finance** — EMI calculator and finance enquiry form
- **Insurance** — Instant insurance enquiry with zero-depreciation coverage info
- **Sell Your Car** — Form for customers to submit cars for valuation
- **Contact** — Business contact form with WhatsApp integration
- **Admin Panel** — Protected dashboard to add, edit, and delete cars from inventory
- **Fully Responsive** — Optimised for mobile, tablet, and desktop
- **WhatsApp Notifications** — All enquiries and bookings trigger live WhatsApp messages to the owner

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Next.js 14 (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS |
| Database | Supabase (PostgreSQL) |
| Storage | Supabase Storage (car images) |
| Animations | GSAP + Lenis smooth scroll |
| Notifications | Meta WhatsApp Cloud API |
| Deployment | Vercel |

---

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/VanshdeepSi/Car-Planet.git
cd Car-Planet
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Copy the example env file and fill in your credentials:

```bash
cp .env.example .env.local
```

Then open `.env.local` and fill in:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project-ref.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

You can find all these keys in your Supabase project under **Settings → API**.

### 4. Run the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

---

## Project Structure

```
dealership/
├── app/
│   ├── admin/          # Protected admin panel
│   ├── api/            # API routes (WhatsApp, cars)
│   ├── contact/        # Contact page
│   ├── finance/        # Finance and EMI page
│   ├── insurance/      # Insurance enquiry page
│   ├── inventory/      # Car listing and detail pages
│   ├── sell-car/       # Sell your car page
│   ├── test-drive/     # Book a test drive page
│   └── page.tsx        # Homepage
├── components/         # Reusable UI components
├── lib/                # Supabase client, types, utils
├── public/             # Static assets and images
└── tailwind.config.ts  # Design tokens and theme
```

---

## Deployment

This project is deployed on **Vercel**. To deploy:

1. Push your code to GitHub.
2. Connect the repository to Vercel.
3. Add the environment variables from `.env.local` into **Vercel → Settings → Environment Variables**.
4. Vercel will auto-deploy on every `git push` to `main`.

---

## WhatsApp Integration

All booking and enquiry forms send a real-time WhatsApp notification to the dealership owner's number via the **Meta WhatsApp Cloud API**. Make sure the `WHATSAPP_API_TOKEN` and `WHATSAPP_PHONE_NUMBER_ID` are configured in your environment variables for this to work.

---

## License

This project is private and built exclusively for **Car Planet**. All rights reserved.
