<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# SimplyMen — Project Context (Single Source of Truth)

> **Last updated:** 21 July 2026
> **Domain:** simplymen.care
> **Purpose:** Male sexual health e-commerce + telehealth platform (kit-based model)
> **Dev server:** `http://localhost:3000`
> **Business model:** Assessment → Kit recommendation → Doctor review (if Rx) → Delivery

---

## 1. Tech Stack

| Layer          | Technology                    | Version   |
|----------------|-------------------------------|-----------|
| Framework      | Next.js (App Router, Turbopack) | 16.2.2  |
| React          | React                         | 19.2.4    |
| Language       | TypeScript                    | ^5        |
| Node.js        | Node                          | 25.2.1    |
| Styling        | Tailwind CSS v4 (`@theme inline`) | ^4     |
| Auth           | Clerk (@clerk/nextjs)         | ^7.0.8    |
| Database       | Supabase REST (@supabase/supabase-js) | ^2.101.1 |
| State          | Zustand                       | ^5.0.12   |
| Animation      | Framer Motion                 | ^12.38.0  |
| Icons          | Lucide React                  | ^1.7.0    |
| Icons (brand)  | react-icons (`fa6`)           | ^5.7.0    |
| Webhook verify | svix                          | ^1.90.0   |
| UI utilities   | clsx, tailwind-merge, class-variance-authority | — |
| Payment        | Razorpay (planned, not integrated) | —    |

> **`lucide-react` in this project ships without social/brand icons** (no `Instagram`, `Linkedin`, `Twitter` export in some cases — confirmed by build errors, not assumed). Use `react-icons/fa6` (`FaInstagram`, `FaXTwitter`, `FaLinkedin`) for any brand/social icon instead.

> **Prisma was fully removed** (April 2026). All DB operations use Supabase REST via `@supabase/supabase-js`.

---

## 2. Product Model — Kits Only (No Standalone Products)

The site sells **3 curated 2-week kits** (no individual medicines/supplements):

| Kit ID | Name | Price | Target | Products Inside |
|--------|------|-------|--------|-----------------|
| `kit_essential` | Essential Wellness Kit | ₹1,499 | Mild concerns, vitality, nightfall anxiety | X-Urge Sachet, Eros-X Sachet, Neurom Total |
| `kit_confidence` | Confidence Plus Kit | ₹1,999 | ED, PE, mixed, performance anxiety, libido | EJHold, Solplay Gel, Intimizz, Dextra Plus (Rx), Deta-M 5 (Rx) |
| `kit_complete` | Complete Men's Health Kit | ₹2,999 | Complex ED, fertility, hormones, prior failure | Deta-M 10 (Rx), Yohi-M 6, Bloom Max, EDM 12, Anteros-X |

### Kit product tags
- **OTC** = Over-the-counter wellness product
- **Rx** = Prescription — requires doctor approval before dispatch
- **Review** = Needs medical review assessment

### Key functions (`src/lib/data/products.ts`)
- `getRecommendedKit(condition, severity)` → returns single best-fit kit
- `getRecommendedProducts(condition, severity)` → returns matching kits array
- `getProductBySlug(slug)` → used by `[slug]` detail page

---

## 3. Environment Variables

### `.env.local` (used by Next.js at runtime)

| Key | Purpose |
|-----|---------|
| `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` | Clerk frontend key |
| `CLERK_SECRET_KEY` | Clerk backend key (KEEP SECRET) |
| `NEXT_PUBLIC_CLERK_SIGN_IN_URL` | `/sign-in` |
| `NEXT_PUBLIC_CLERK_SIGN_UP_URL` | `/sign-up` |
| `SUPABASE_URL` | Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase service role key (KEEP SECRET) |

### Not yet configured

```
CLERK_WEBHOOK_SECRET=whsec_***           # needed for production user sync
NEXT_PUBLIC_RAZORPAY_KEY_ID=             # Razorpay integration
RAZORPAY_KEY_SECRET=                     # Razorpay integration
```

---

## 4. Supabase Database

- **Project:** SimplyMen Project
- **Region:** Northeast Asia (Seoul) — ap-northeast-2
- **Plan:** Free (Nano)
- **Dashboard:** https://ofieqesfvvszaenzknos.supabase.co
- **Connection:** HTTPS REST API via `@supabase/supabase-js` (service_role key, server-side)

### Tables

| Table                | Purpose                                    |
|----------------------|--------------------------------------------|
| `users`              | Clerk user sync (id = Clerk user ID)       |
| `products`           | Product catalog                            |
| `orders`             | Customer orders                            |
| `order_items`        | Line items per order                       |
| `appointments`       | Doctor consultation bookings               |
| `assessment_results` | Assessment scores (nullable clerkUserId)   |

### DB Client (`src/lib/supabase.ts`)

- Uses `createClient` with `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY`
- `persistSession: false`, `autoRefreshToken: false` (server-side only)
- Includes a `cuid()` helper for ID generation

### ⚠️ Corporate firewall note

Direct PostgreSQL connections (ports 5432, 6543) are blocked. Use Supabase SQL Editor for DDL changes.

---

## 5. Clerk Auth

- **App name:** SimplyMen
- **Dashboard:** https://dashboard.clerk.com → main-grizzly-1
- **Sign-in methods:** Email + Google

### Clerk v7 notes

- `SignedIn` / `SignedOut` wrappers **don't exist** — use `useAuth()` hook
- `UserButton` has no `afterSignOutUrl` prop — use `<UserButton />`
- `SignInButton` → `<SignInButton mode="modal">`

### Middleware (`src/middleware.ts`)

Uses `clerkMiddleware` + `createRouteMatcher`.

**Protected:** `/checkout(.*)`, `/orders(.*)`, `/dashboard(.*)`, `/admin(.*)`, `/doctor(.*)`
**Public:** `/`, `/products`, `/blogs`, `/assessment`, `/results`, `/cart`, `/sign-in`, `/sign-up`, `/api/health`, `/api/webhooks`

---

## 6. Project Structure

```
simplymen/
├── public/
│   ├── images/                 # Legacy kit photos + landing imagery
│   ├── hero/                   # Hero carousel banners (hero1/2/3.png — pre-designed, text/CTA baked into image)
│   ├── icons/                  # Condition icons (ED/PE/lowlibido/hormonalimbalance/infertility)
│   ├── docs/                   # Doctor portraits (Meet Our Experts)
│   ├── programs/               # Program Showcase lifestyle images (confidence/performance/hormonal/libido)
│   └── choose your treatment pics/  # Treatment Programs card images (note: folder name has spaces)
├── src/
│   ├── app/
│   │   ├── layout.tsx          # Root layout (ClerkProvider, fonts)
│   │   ├── page.tsx            # Landing page (14 sections — see §7)
│   │   ├── globals.css         # Tailwind v4 @theme tokens
│   │   ├── assessment/         # Multi-step questionnaire
│   │   ├── results/            # Kit recommendation + BUY NOW
│   │   ├── products/           # Kit grid + [slug] detail
│   │   ├── blogs/              # Blog listing + [slug]
│   │   ├── cart/                # Cart view
│   │   ├── checkout/           # Shipping + payment
│   │   ├── dashboard/          # User dashboard
│   │   ├── orders/             # Order history
│   │   ├── admin/              # Admin panel
│   │   ├── doctor/             # Doctor panel
│   │   ├── sign-in/            # Clerk sign-in
│   │   ├── sign-up/            # Clerk sign-up
│   │   ├── actions/            # Server actions (admin, assessments, orders)
│   │   └── api/                # health + webhooks/clerk
│   ├── components/
│   │   ├── landing/            # Original sections still in use: hero, ima-banner,
│   │   │                       #   how-it-works, conditions, routine-graph,
│   │   │                       #   testimonials, wellness-knowledge, faq
│   │   │                       #   (why-choose-us.tsx removed — see §15)
│   │   ├── home/                # Homepage V2 sections added July 2026: not-sure-cta,
│   │   │                       #   treatment-programs, program-showcase, why-better,
│   │   │                       #   meet-our-experts, why-choose-simplymen
│   │   ├── layout/              # Navbar, Footer
│   │   └── ui/                  # (empty — shared components TBD)
│   ├── lib/
│   │   ├── supabase.ts         # DB client
│   │   ├── utils.ts            # cn(), formatPrice()
│   │   └── data/
│   │       ├── products.ts     # 3 kits + helper functions
│   │       ├── questionnaires.ts # Questions + scoring + advice
│   │       └── countries.ts    # Country/state data
│   ├── store/
│   │   ├── cart-store.ts       # Zustand cart
│   │   └── assessment-store.ts # Zustand assessment state
│   ├── middleware.ts           # Clerk auth middleware
│   └── types/index.ts          # TS interfaces
├── .env.local
└── CLAUDE.md                   # ← This file
```

---

## 7. Landing Page Components (in order)

> Redesigned July 2026 against "Homepage V2 — Kits First" + a component design system PDF. See §15 for the full changelog.

| # | Component | File | Description |
|---|-----------|------|-------------|
| 1 | Navbar | `layout/navbar.tsx` | Logo + links (Home, Assessment, Blogs, Kits) + Login/UserButton |
| 2 | Hero | `landing/hero.tsx` | Pure image carousel (`/hero/hero1-3.png`). Heading/subtitle/CTA are baked into the exported images — component only handles slides, fade transition, arrows, dots |
| 3 | IMA Banner | `landing/ima-banner.tsx` | Scrolling marquee trust banner |
| 4 | Conditions | `landing/conditions.tsx` | Single row of 5 condition cards (ED, PE, Low Libido, Hormonal, Infertility) — Lucide icons, teal circle badges |
| 5 | Not Sure CTA | `home/not-sure-cta.tsx` | "Your Personalized Treatment Plan Starts Here" — 4-step process row + gold CTA + trust badges, warm cream layered background |
| 6 | Treatment Programs | `home/treatment-programs.tsx` | 5 program cards (teal theme), "Start Free Assessment" deep-links to `/assessment?concern=X`, "Learn about this program" → placeholder `/programs/{slug}` |
| 7 | Program Showcase | `home/program-showcase.tsx` | 4 alternating image/benefit rows (ED, PE, Hormonal, Libido), data-driven |
| 8 | How It Works | `landing/how-it-works.tsx` | 4-card grid (Take Assessment / Doctor Review / Personalized Plan / Discreet Delivery), real branded images from `/How it works/step1-4.svg` |
| 9 | Why Better | `home/why-better.tsx` | "Why Our Treatment Programs Work Better" — spider/comparison diagram (Traditional vs Simply Men) converging on a center circle, animated SVG connector lines |
| 10 | **Routine Graph** | `landing/routine-graph.tsx` | Rebuilt July 2026 — "Simplify Your Health Routine", 3 stat cards with animated progress rings (was: line-graph "Routine Simplification" section) |
| 11 | Meet Our Experts | `home/meet-our-experts.tsx` | Horizontally scrollable carousel, 7 doctors, snap-scroll + arrow nav |
| 12 | Why Choose Simply Men | `home/why-choose-simplymen.tsx` | Single premium rounded container, 5-feature grid + trust pill |
| 13 | Testimonials | `landing/testimonials.tsx` | Dark section with gold stats + quote cards |
| 14 | Wellness Knowledge | `landing/wellness-knowledge.tsx` | 3 image cards (sleep/exercise/nutrition) |
| 15 | FAQ | `landing/faq.tsx` | Accordion FAQ section |
| 16 | Footer | `layout/footer.tsx` | Rebuilt July 2026 — warm off-white bg (`#F7F3EE`), 5-column layout (brand + Treatment Programs/Support/Legal/Company), phone/mail bottom row. Trust bar + dark theme removed |

> **Removed:** `landing/why-choose-us.tsx` ("Healthcare designed around you" — lifestyle image + floating bottle + 6 features) deleted outright, July 2026. Superseded by Why Better + Why Choose Simply Men.

---

## 8. Design System

### Color Palette

| Token          | CSS Variable      | Hex        | Usage                    |
|----------------|--------------------|-----------|--------------------------|
| Primary        | `--primary`        | `#3B4856` | Steel blue-grey — buttons, links |
| Primary Dark   | `--primary-dark`   | `#1C2530` | Deep midnight — hero bg, headings |
| Secondary      | `--secondary`      | `#5E7085` | Slate blue               |
| Accent         | `--accent`         | `#C4915A` | Warm amber/toffee — CTAs |
| Gold           | `--gold`           | `#B8934A` | Rich dark gold — stats   |
| Background     | `--background`     | `#FAFAF7` | Off-white warm           |
| Surface        | `--surface`        | `#F2F0EB` | Card/surface             |
| Foreground     | `--foreground`     | `#1C2024` | Body text                |
| Muted          | `--muted`          | `#6E7781` | Secondary text           |
| Success        | `--success`        | `#2D8A4E` | Positive states          |
| Warning        | `--warning`        | `#D4A017` | Alerts                   |
| Error/Danger   | `--danger`         | `#C0392B` | Destructive actions      |

> Values above match the Component Library / Design System PDF exactly (verified + corrected July 2026 — `--primary`, `--primary-dark`, `--muted`, `--success`, `--warning` had drifted from spec and were fixed). `--secondary`, `--accent-muted`, `--border` also exist in `globals.css` but aren't part of the documented Design System token list.

> **Teal is used in several sections** (Treatment Programs badges/CTA, Meet Our Experts role badge, condition-icon backgrounds) via Tailwind's built-in `teal-*` palette (e.g. `bg-teal-50`, `text-teal-600`). **No `--teal` token exists** in `globals.css` — this was an explicit per-component instruction, not a Design System token. Don't assume a teal CSS variable exists.

### Fonts: DM Serif Display (headings) + **Manrope** (body)

> Body font migrated from DM Sans → Manrope, July 2026, per the Component Design System spec. Centralized in one place: `layout.tsx` (`next/font/google` → `--font-manrope`) and `globals.css` (`--font-body: var(--font-manrope)`). No component should hardcode a font — everything inherits `font-body`/`font-display` from the theme tokens.

---

## 9. Images (`public/images/`)

| Filename | Used In |
|----------|---------|
| `essential_wellness.png` | Essential Wellness Kit (products page, detail, results) |
| `confidence_plus.png` | Confidence Plus Kit (products page, detail, results) |
| `complete_mens_health.png` | Complete Men's Health Kit (products page, detail, results) |
| `assessment-phone.png` | How It Works step 1 |
| `doctor-consult.png` | How It Works step 2 |
| `packaging-1.jpg` → `packaging-5.jpg` | Hero cards, Conditions, Why Choose Us |
| `wellness-sleep.jpg`, `wellness-exercise.jpg`, `wellness-nutrition.jpg` | Wellness Knowledge |
| `hero-man.png` | Available |
| `card-ed.png`, `card-pe.png`, `card-libido.png`, `card-hormonal.png` | Hero category cards (unused since Hero rebuild — hero now uses `/hero/*`) |
| `logo.png` | Navbar + Footer (footer no longer inverts it — light bg now) |

### Other image folders (added July 2026)

| Folder | Contents | Used In |
|--------|----------|---------|
| `public/hero/` | `hero1.png`, `hero2.png`, `hero3.png` — final pre-designed banners, heading/CTA baked in | `landing/hero.tsx` |
| `public/icons/` | `ED.svg`, `PE.svg`, `lowlibido.svg`, `hormonalimbalance.png`, `infertility.png` | `landing/conditions.tsx` (superseded by Lucide icons per-condition, kept on disk) |
| `public/docs/` | 7 doctor portraits (filenames are informal, e.g. `vk aggarwal.jpeg` for Prof. Dr. Vishnu Agrawal — verify mapping if a new doctor photo is added) | `home/meet-our-experts.tsx` |
| `public/programs/` | `confidence.svg`, `performance.svg`, `hormonal.png`, `libido.svg` | `home/program-showcase.tsx` |
| `public/choose your treatment pics/` | `confidence.svg`, `performance.svg`, `libido.svg`, `testosterone.svg`, `completemenhealth.svg` (folder name has spaces — works fine in `src`, browser handles it) | `home/treatment-programs.tsx` |
| `public/How it works/` | `step1.svg`–`step4.svg` | `landing/how-it-works.tsx` |

---

## 10. TypeScript Interfaces (`src/types/index.ts`)

| Interface | Key Fields |
|-----------|-----------|
| `KitProduct` | `code`, `name`, `description`, `components?`, `tag: "otc" \| "rx" \| "review"` |
| `Product` | `id`, `name`, `slug`, `price`, `mrp`, `images[]`, `category`, `tags[]`, `kitProducts?: KitProduct[]`, `kitFeatures?: string[]`, `forSeverity[]`, `forCondition[]`, `badge?` |
| `CartItem` | `product: Product`, `quantity: number` |
| `ConditionKey` | `"ed" \| "pe" \| "libido" \| "hormonal" \| "infertility"` |
| `ConditionScore` | `score`, `maxScore`, `severity` |
| `AssessmentResult` | `type`, `conditions`, `scores`, `answers`, `completedAt` |

---

## 11. Feature Status

| Feature | Status | Notes |
|---------|--------|-------|
| Landing page (16 sections, redesigned to Homepage V2) | ✅ Complete | Framer Motion, real images. See §7 for full section list |
| Hero image optimization | ⚠️ Temporary | `unoptimized` prop set on Hero's `<Image>` to bypass Next's image-optimizer cache during active asset iteration — **remove once hero images are finalized** so optimization re-enables for production |
| Assessment (IIEF-5 / PEDT / multi-condition) | ✅ Complete | Saves to Supabase |
| Results → Single kit recommendation | ✅ Complete | Shows kit products, tags, features |
| **Kits page** (replaces old products catalog) | ✅ Complete | 3-column comparison with real images |
| Kit detail `[slug]` page | ✅ Complete | Real product images, tabs |
| Cart | ✅ Complete | Bundle view, discount field |
| Checkout | ✅ Complete | Country codes, states, creates order |
| Clerk auth | ✅ Complete | Google + Email |
| Orders page | ✅ Complete | Expandable cards |
| Admin dashboard | ✅ Complete | Stats + orders + tracking |
| Supabase REST | ✅ Complete | All server actions |
| **Routine Graph** (landing) | ✅ Complete | Animated SVG, Month 1→5 simplification |
| **Kit product images** | ✅ Complete | 3 real photos wired in |
| Blogs | ✅ Routing ready | Listing + [slug] exists |
| Clerk webhook (user sync) | 🔲 Not deployed | Code ready, needs CLERK_WEBHOOK_SECRET |
| Razorpay payment | 🔲 Simulated | Uses setTimeout, needs real keys |
| Legal pages | 🔲 Not started | Privacy, Terms, Refund (footer → "#") |
| Email notifications | 🔲 Not started | Order confirmation, shipping |
| Deployment (Vercel) | 🔲 Not started | — |

---

## 12. Setup & Run Instructions (macOS / Windows / Linux)

### Prerequisites

| Tool | Version | Install |
|------|---------|---------|
| Node.js | 20+ (project uses 25.x) | https://nodejs.org or `nvm install 20` |
| npm | Comes with Node | — |
| Git | Any recent | https://git-scm.com |

> **Windows fully supported** — no Unix-specific code, shell scripts, or path issues.

### First-time setup

```bash
# 1. Clone the repo
git clone https://github.com/aryanadlakha002-ai/simplymen.git
cd simplymen

# 2. Install dependencies
npm install

# 3. Create .env.local in project root with these keys:
#    (get values from Clerk dashboard + Supabase dashboard)
```

**.env.local** contents:
```env
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
SUPABASE_URL=https://ofieqesfvvszaenzknos.supabase.co
SUPABASE_SERVICE_ROLE_KEY=eyJ...
```

### Run dev server

```bash
# Fast mode (recommended — uses Turbopack)
npx next dev --turbopack

# Standard mode
npm run dev
```

Server starts at `http://localhost:3000`

### Build for production

```bash
npm run build    # creates .next/ output
npm start        # serves production build locally on :3000
```

### Windows-specific notes

- Use **PowerShell** or **Windows Terminal** (not cmd.exe)
- If port stuck: `netstat -ano | findstr :3000` → `taskkill /PID <pid> /F`
- Path separators handled by Node automatically
- If `rm -rf .next` fails, use `Remove-Item -Recurse -Force .next`
- OneDrive sync can slow file watching — consider cloning outside OneDrive

### Common commands

| Action | Command |
|--------|---------|
| Dev server (fast) | `npx next dev --turbopack` |
| Type check | `npx tsc --noEmit` |
| Build | `npm run build` |
| Clear cache | Delete `.next/` folder |
| Kill stuck port (macOS) | `kill $(lsof -ti:3000)` |
| Kill stuck port (Windows) | `taskkill /PID <pid> /F` |

---

## 13. Troubleshooting

| Problem | Fix |
|---------|-----|
| Can't reach database server | Using Supabase REST (HTTPS 443). DDL → SQL Editor. |
| `SignedOut` doesn't exist | Clerk v7 — use `useAuth()` + conditional |
| `afterSignOutUrl` doesn't exist | Clerk v7 — use plain `<UserButton />` |
| Middleware deprecation warning | Next.js 16 — still works, migrate later |
| Port 3000 in use (macOS) | `kill $(lsof -ti:3000)` then restart |
| Port 3000 in use (Windows) | `netstat -ano \| findstr :3000` → `taskkill /PID <pid> /F` |
| Slow HMR / reload | Delete `.next/`, use `--turbopack`, move out of OneDrive |
| `EPERM` / file locked (Windows) | Close VS Code, delete `.next`, restart |

---

## 14. Deployment — GoDaddy Domain + Vercel Hosting

**Recommended approach:** Host on **Vercel** (free, built for Next.js) → point GoDaddy domain to Vercel.

### Steps

1. Push to GitHub
2. Go to https://vercel.com → Import project from GitHub
3. Add env vars in Vercel dashboard (same as `.env.local`)
4. In GoDaddy DNS settings, add:
   - **A Record:** `@` → `76.76.21.21`
   - **CNAME:** `www` → `cname.vercel-dns.com`
5. In Vercel → Project Settings → Domains → Add `simplymen.care`
6. Vercel auto-provisions SSL certificate

### Full checklist

- [ ] Push to GitHub
- [ ] Connect repo to Vercel
- [ ] Add env vars in Vercel dashboard
- [ ] GoDaddy DNS → A record + CNAME to Vercel
- [ ] Add domain in Vercel project settings
- [ ] Clerk Webhooks → `https://simplymen.care/api/webhooks/clerk`
- [ ] Switch Clerk to production keys
- [ ] Integrate Razorpay
- [ ] Add legal pages (Privacy, Terms, Refund)

---

## 15. Recent Changes (July 21, 2026) — Homepage V2 Redesign

UI-only redesign against "Homepage V2 — Kits First" + a Component Design System PDF. All business logic, routing, auth, and Supabase/Clerk integration untouched.

- **Design tokens corrected**: `--primary`, `--primary-dark`, `--muted`, `--success`, `--warning` in `globals.css` had drifted from the documented Design System hex values — fixed to match exactly (§8)
- **Typography migrated**: body font DM Sans → Manrope (`layout.tsx` + `globals.css`, centralized via `--font-body`)
- **Hero rebuilt twice**: first as a text-over-image carousel, then simplified to a **pure image carousel** — `/hero/hero1-3.png` are final designed banners with heading/CTA baked in; component only handles slides/transitions/arrows/dots. Currently running with `unoptimized` on `next/image` (temporary, see §11)
- **Conditions rebuilt**: dropped the old "Comprehensive care" heading + 2 alternating ED/PE feature blocks; now a single row of 5 uniform cards, Lucide icons (`Pill`/`Clock3`/`Flame`/`Scale`/`CircleDot`), teal-themed hover
- **6 new sections added** under `src/components/home/`: Not Sure CTA, Treatment Programs, Program Showcase, Why Better (Traditional vs Simply Men spider diagram), Meet Our Experts (7-doctor carousel), Why Choose Simply Men
- **`why-choose-us.tsx` deleted** — content folded into/replaced by the new Why Better + Why Choose Simply Men sections
- **Routine Graph rebuilt**: was a Month 1→5 line graph ("Routine Simplification"), now 3 stat cards with animated progress rings ("Simplify Your Health Routine")
- **How It Works rebuilt**: was 3 alternating image/text steps, now a 4-card grid with real branded step images
- **Footer rebuilt twice**: first as a dark-navy premium footer, then per PDF reference — warm off-white (`#F7F3EE`), 5-column layout, trust bar + disclaimer block removed, bottom row simplified to copyright + phone/email
- **New dependency**: `react-icons` (`^5.7.0`) — this project's `lucide-react` build lacks social/brand icons (`Instagram`, `Linkedin`, `Twitter` all failed at build time); use `react-icons/fa6` for any brand icon going forward
- **Teal introduced** as a per-component accent (Tailwind `teal-*` palette, not a design token) across Treatment Programs, Meet Our Experts, condition icons — intentional exception to the token-only color rule, per explicit instruction

---

## 16. Recent Changes (May 31, 2026)

- **Migrated to kits-only model**: Removed 8 standalone products, replaced with 3 curated 2-week kits from HTML prototype
- **Added `KitProduct` interface**: Sub-products with code, components, and tag (otc/rx/review)
- **Added `getRecommendedKit()` function**: Smart single-kit selection based on condition + severity
- **Rewrote products page**: 3-column kit comparison grid with expandable product lists
- **Updated results page**: Shows single recommended kit with all sub-products and tags
- **Added Routine Graph**: New landing section showing cost/complexity reduction over 5 months
- **Added kit images**: `essential_wellness.png`, `confidence_plus.png`, `complete_mens_health.png`
- **Navbar**: "Products" → "Kits"
