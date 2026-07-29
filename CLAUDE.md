<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

---

# SimplyMen — Project Context (Single Source of Truth)

> **Last updated:** 29 July 2026
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

> Redesigned July 2026 against "Homepage V2 — Kits First" + a component design system PDF (see §15). Reordered again 29 July 2026 into a "healthcare decision journey" narrative — process before conditions/programs — with one section merge. See §15 for the full changelog.

| # | Component | File | Description |
|---|-----------|------|-------------|
| 1 | Navbar | `layout/navbar.tsx` | Logo + links (Home, Assessment, Blogs, Kits) + Login/UserButton |
| 2 | Hero | `landing/hero.tsx` | Image carousel with code-rendered heading/subtitle/CTA/trust-indicators overlaid on the left negative space of each photo (rebuilt 29 July 2026 — see §15; final photography, no baked-in text) |
| 3 | IMA Banner (Trust) | `landing/ima-banner.tsx` | Scrolling marquee trust banner |
| 4 | How It Works | `landing/how-it-works.tsx` | Merged 29 July 2026 with the former "Your Personalized Treatment Plan Starts Here" section (`home/not-sure-cta.tsx`, now deleted) — heading, "Join 50,000+ men..." line, 4 illustrated step cards (`/How it works/step1-4.svg`), gold CTA, trust-indicator row, on the layered warm-cream decorative background |
| 5 | Conditions We Treat | `landing/conditions.tsx` | Single row of 5 condition cards (ED, PE, Low Libido, Hormonal, Infertility) — Lucide icons, teal circle badges |
| 6 | Treatment Programs | `home/treatment-programs.tsx` | 5 program cards (teal theme), "Start Free Assessment" deep-links to `/assessment?concern=X`, "Learn about this program" → placeholder `/programs/{slug}` |
| 7 | Program Showcase (Program Details) | `home/program-showcase.tsx` | 4 alternating image/benefit rows (ED, PE, Hormonal, Libido), data-driven |
| 8 | Why Better | `home/why-better.tsx` | "Why Our Treatment Programs Work Better" — spider/comparison diagram (Traditional vs Simply Men) converging on a center circle, animated SVG connector lines |
| 9 | **Routine Graph** | `landing/routine-graph.tsx` | Redesigned again 29 July 2026 — "Simplify Your Health Routine" as ONE unified comparison dashboard, 3 columns (Products/Cost/Time) each showing a literal Traditional→SimplyMen visual transformation (icon-grid→single icon, coin-stack→smaller coin-stack, large clock→small clock) with count-up numbers; no percentage rings (was: progress-ring stat cards; before that, a Month 1→5 line graph) |
| 10 | Meet Our Experts | `home/meet-our-experts.tsx` | Horizontally scrollable carousel, 7 doctors, snap-scroll + arrow nav |
| 11 | Testimonials | `landing/testimonials.tsx` | Dark section with gold stats + quote cards |
| 12 | Why Choose Simply Men | `home/why-choose-simplymen.tsx` | Single premium rounded container, 5-feature grid + trust pill |
| 13 | FAQ | `landing/faq.tsx` | Accordion FAQ section |
| 14 | Wellness Knowledge (Knowledge Hub) | `landing/wellness-knowledge.tsx` | 3 image cards (sleep/exercise/nutrition) |
| 15 | Footer | `layout/footer.tsx` | Warm off-white bg (`#F7F3EE`), 5-column layout (brand + Treatment Programs/Support/Legal/Company), phone/mail bottom row. Trust bar + dark theme removed |

> **Removed:** `landing/why-choose-us.tsx` (July 2026, superseded by Why Better + Why Choose Simply Men) and `home/not-sure-cta.tsx` (29 July 2026, merged into `landing/how-it-works.tsx` — see §15).
> **Previous order (superseded 29 July 2026):** Hero → IMA Banner → Conditions → Not Sure CTA → Treatment Programs → Program Showcase → How It Works → Why Better → Routine Graph → Meet Our Experts → Why Choose Simply Men → Testimonials → Wellness Knowledge → FAQ → Footer.

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
| `public/hero/` | `hero1.png`, `hero2.png`, `hero3.png` — final production photography, replaced 29 July 2026. Photography only — heading/subtitle/CTA/trust-indicators are rendered in code, overlaid on each photo's left negative space, not baked into the image | `landing/hero.tsx` |
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

> Corrected and expanded 29 July 2026 against a full-codebase audit (server actions, dashboards, checkout, cart) — several rows below were previously overstated as "Complete." See §18 for full detail and file:line citations.

| Feature | Status | Notes |
|---------|--------|-------|
| Landing page (15 sections, reordered into a decision-journey narrative 29 July 2026) | ✅ Complete | Framer Motion, real images, responsive-audited across desktop/tablet/mobile. See §7 for full section list |
| Hero image optimization | ✅ Complete | New final photography in place 29 July 2026; `unoptimized` prop removed, Next.js image optimization active |
| Assessment (multi-condition, 5 conditions × 12 questions) | ✅ Complete | Real hand-authored scoring logic in `lib/data/questionnaires.ts`; "inspired by" IIEF-5/PEDT per its own disclaimer text, not the literal licensed instruments. Saves to Supabase (`assessment_results`), errors swallowed silently (`results/page.tsx` — fire-and-forget) |
| Results → Single kit recommendation | ✅ Complete | Shows kit products, tags, features |
| **Kits page** (replaces old products catalog) | ✅ Complete | 3-column comparison with real images |
| Kit detail `[slug]` page | ✅ Complete | Real product images, tabs |
| Cart | ⚠️ Partial | Zustand store has full CRUD, but the UI only renders a **read-only bundle list** — no remove/quantity controls wired up. Discount-code input is a **non-functional placeholder** (no `onClick`). Not persisted — lost on refresh |
| Checkout | ⚠️ Partial | Order creation is real (writes to Supabase `orders`+`order_items`); **payment is fully simulated** (`setTimeout` 1500ms, no Razorpay SDK, no dependency installed). If order-creation fails, checkout **still proceeds to the success screen** (error only `console.warn`'d). Success screen shows a **fabricated order ID** unrelated to the real DB id |
| Clerk auth | ✅ Complete | Google + Email, thin wrapper around Clerk's hosted `<SignIn/>`/`<SignUp/>` — no custom forgot-password/email-verification UI (fully delegated to Clerk) |
| Orders page | ✅ Complete | Expandable cards, real Supabase data |
| Admin dashboard | ⚠️ Partial | Stats + searchable/paginated orders table + live status/tracking updates are real. **No user/doctor/product management UI** — promoting a user to ADMIN or DOCTOR requires editing the DB row or the hardcoded `ADMIN_EMAILS`/`DOCTOR_EMAILS` arrays in `actions/admin.ts` directly |
| **Doctor dashboard** | ⚠️ Mostly stub | Orders list is real (reuses admin's `getAllOrders`). **"Call status" and doctor notes are localStorage-only** (`simplymens_doctor_call_status`) — never touch Supabase, not shared across devices/sessions, lost on cache clear. **No prescription-writing or approval-workflow feature exists at all** |
| Supabase REST | ✅ Complete | All server actions (`admin.ts`/`assessments.ts`/`orders.ts`) hit Supabase for real, no mocked logic |
| **Routine Graph** (landing) | ✅ Complete | Unified comparison dashboard (Products/Cost/Time), count-up numbers, no percentage rings — redesigned 29 July 2026 |
| **Kit product images** | ✅ Complete | 3 real photos wired in |
| Blogs | ✅ Routing ready | Listing + [slug] exists |
| Clerk webhook (user sync) | 🔲 Not deployed | Code is real and complete — svix signature verification, upserts `users` on `user.created`/`updated`, deletes on `user.deleted`, auto-promotes hardcoded admin email — just needs `CLERK_WEBHOOK_SECRET` configured in production |
| Razorpay payment | 🔲 Simulated | Confirmed via audit: zero `razorpay` dependency in `package.json`, zero SDK calls anywhere |
| Legal pages | 🔲 Not started | `/privacy`, `/terms`, `/refund-policy`, `/shipping-policy`, `/medical-disclaimer`, `/help`, `/contact`, `/about` — none exist, all footer-linked, all 404 |
| Email notifications | 🔲 Not started | Zero email-sending code anywhere (`sendEmail`/`nodemailer`/`resend`/`sendgrid`/`smtp` all grep to zero hits, no email SDK dependency). Checkout's "we'll send a confirmation email" copy is UI text only — no email is ever sent |
| SEO — sitemap/robots | 🔲 Not started | No `sitemap.ts`/`.xml` or `robots.ts`/`.txt` anywhere. On-page metadata (title/description/OG) in `layout.tsx` is real; no `twitter:` card metadata |
| Analytics | 🔲 Not started | Zero analytics code (no GA/Vercel Analytics/PostHog/Mixpanel) |
| Security headers | 🔲 Not started | `next.config.ts` only sets `images.remotePatterns` — no CSP, `X-Frame-Options`, HSTS, or rate limiting anywhere |
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

---

## 17. Recent Changes (July 29, 2026) — Homepage Narrative Reorder, Hero Rebuild, Responsive QA

UX-only pass: reorder homepage into a decision-journey narrative, merge one section, rebuild Hero against final photography, and perform a full responsive QA + docs sync. No backend/business logic touched.

- **Homepage reordered** (§7): Hero → IMA Banner (Trust) → How It Works (merged) → Conditions We Treat → Treatment Programs → Program Showcase (Program Details) → Why Better → Routine Graph → Meet Our Experts → Testimonials → Why Choose Simply Men → FAQ → Wellness Knowledge → Footer. Rationale: answer "what happens if I click Start Free Assessment" before "what do you treat" / "what will I receive." No section's internal layout changed by the reorder itself.
- **`home/not-sure-cta.tsx` merged into `landing/how-it-works.tsx`, then deleted** — both sections communicated the same assessment→doctor→plan→delivery message back-to-back. Kept: NotSureCTA's decorative layered background, gold CTA, trust-indicator row. Dropped: NotSureCTA's small icon-circle step row (redundant next to How It Works' illustrated step cards) and How It Works' old "Learn more about our clinical standards" link.
- **Hero rebuilt against final photography** (`public/hero/hero1-3.png` replaced with plain editorial photos, no baked-in text): heading/subtitle/CTA/trust-indicators now render in code over each photo's left negative space. New copy: Hero 1 "Restore Confidence. / Rediscover Intimacy." (ED/performance/wellness), Hero 2 "Stronger Erections. / Lasting Performance." (ED/PE/intimacy), Hero 3 "Private Care. / Personalized Results." (doctor-led telehealth experience — no longer a specific-condition message). One subtle left-side gradient only (`black/55→transparent`), no full-image tint/darken/blur. `unoptimized` prop removed from Hero's `<Image>` (see §11).
- **Routine Graph redesigned again**: replaced percentage-ring stat cards with ONE unified comparison dashboard, 3 columns (Products Used / Monthly Cost / Time Per Day), each a literal Traditional→SimplyMen visual transformation (icon grid→single icon, coin stack→smaller coin stack, large clock→small clock) with count-up numbers on scroll-into-view. No rings/donuts/gauges anywhere.
- **Full responsive QA pass** across Hero + all 14 other homepage sections, real-browser-verified (desktop 1920 down to mobile 320px) via Chrome automation — since OS-level window resize doesn't affect viewport in this environment, verification used a same-origin iframe at fixed widths as a substitute for device emulation. Found and fixed 3 real Hero bugs:
  - Heading wrapped to 4 lines at ≤360px width, clipping the top of the heading against the fixed-height hero section — fixed by reducing base heading size (`text-[26px]`, tighter `leading-[1.15]`) and switching the section from fixed `h-[420px]/h-[520px]` to `min-h-[480px]/min-h-[560px]` at mobile/tablet (lg+ keeps the original fixed height).
  - Trust-indicator row collided with the carousel dot indicators at ≤360px — fixed with tighter mobile vertical spacing (`mt-5`/`mt-6` vs `mt-8`) and reserved bottom padding (`pb-14` at mobile, `sm:pb-0`).
  - `object-center` on the hero `<Image>` cropped the right-third subject out of frame on narrow/tall mobile viewports — fixed with a per-slide `focalPoint` (e.g. `"70% 38%"`) applied via inline `objectPosition`, tuned to each image's actual composition instead of one shared crop.
  - Confirmed via `scrollWidth` check: no horizontal overflow anywhere on the page at 320px width.
- **CTA consistency fix**: the merged How It Works CTA used hardcoded hex colors (`#C08A4B`/`#B2773E` background + inline JS hover) left over from the old NotSureCTA code — replaced with the standard `bg-accent hover:bg-accent/90` token classes used by Hero/Program Showcase/Why Better. Noted but **not changed** (documented, intentional, out of scope): Treatment Programs cards use `bg-teal-600` for their CTA instead of gold, and CTA padding/size/icon presence still varies by section context (compact dark strips vs full section endings) — flagging for awareness, not a bug.
- **Performance**: added `loading="lazy"` to the plain `<img>` tags in `home/program-showcase.tsx`, `home/treatment-programs.tsx`, `home/meet-our-experts.tsx`, `landing/wellness-knowledge.tsx`, and `landing/how-it-works.tsx` (step illustrations). Not changed (flagged as a future opportunity, not fixed — would be a larger, riskier refactor): most of these still use plain `<img>` instead of `next/image`, so they don't get automatic responsive `srcset`/optimization the way Hero does.
- **Scroll UX refinement** (same day, follow-up): standardized vertical section padding to `py-24 md:py-28 lg:py-36` across all 11 story sections (fixed 3 real outliers — Treatment Programs and Routine Graph were `py-24 lg:py-32`; Why Choose Simply Men had no `lg:` step at all). Standardized every viewport-triggered entrance animation to `transition={{duration: 0.6, ease: "easeOut"}}` (many had no explicit transition before) and normalized `initial y` offsets to `20` (was a mix of 20/24/30). **`home/program-showcase.tsx` had zero entrance animation before this pass** — its 4 rows were plain `<div>`s; now wrapped in `motion.div` matching every other section. No scroll-snap/sticky/pinning added or removed (none existed); no reordering, no content changes.
- **Meet Our Experts wheel-scroll fix**: the doctor carousel (`home/meet-our-experts.tsx`) was trapping vertical mouse-wheel scroll — not from any JS wheel listener, but from a native Chromium quirk where a horizontal-only-overflow container (`overflow-x-auto` + `snap-x`, no vertical overflow) auto-converts a vertical wheel delta into horizontal container scroll, consuming the event before it reaches the page. Fixed with a native (non-passive — React's `onWheel` is passive by default and can't `preventDefault()`) `wheel` listener added via `useEffect`: vertical-dominant deltas (`|deltaY| > |deltaX|`) call `preventDefault()` and forward the scroll to `window.scrollBy({top: e.deltaY, behavior: "instant"})` (explicit `instant` needed — the page's global `scroll-behavior: smooth` in `globals.css` only applies to programmatic scrolls and would otherwise make the forwarded scroll visibly lag behind native page scrolling elsewhere); horizontal-dominant deltas are left untouched so the carousel's existing horizontal wheel/trackpad/arrow/swipe behavior is unaffected. Verified via a dispatched `WheelEvent`: vertical delta now moves `window.scrollY` by the exact delta with `carousel.scrollLeft` staying at 0; horizontal-dominant path confirmed untouched by code inspection (real hardware trackpad testing wasn't reproducible via synthetic/untrusted DOM events in this environment — browsers don't run default scroll actions for untrusted events regardless of `preventDefault`, so that check must be re-verified with a real trackpad/mouse if in doubt).

---

## 18. Full Product Audit — Backend & Feature Reality Check (29 July 2026)

> SimplyMen is a full-stack telehealth platform, not a homepage project — the homepage has gotten most of the iteration attention recently, but the product also includes real auth, a real database layer, two dashboards, and a checkout flow. This section is the source of truth for what's *actually* implemented under the hood, verified by reading the real source files (not by trusting prior doc claims). See also §11 Feature Status for the corrected summary table, and `PROJECT_STATUS.md` / `LAUNCH_CHECKLIST.md` in the repo root for the launch-facing view of the same facts.

### Architecture

Server Actions do almost all the backend work — there is **no REST/CRUD API layer**. Only 2 routes exist under `src/app/api/`:
- `api/health/route.ts` — GET, runs 3 parallel Supabase `count` queries (users/products/orders), real.
- `api/webhooks/clerk/route.ts` — real svix-verified Clerk webhook, upserts `users` on create/update, deletes on `user.deleted`, auto-promotes a hardcoded admin email. Rejects with 400/500 on bad signature or missing secret. No other webhook routes exist (no Razorpay webhook, since there's no real Razorpay integration).

All other backend logic lives in `src/app/actions/`:
- `admin.ts` — `getUserRole`, `getAllOrders`, `updateOrderStatus`, `updateTrackingNumber`, `getAdminStats`. Role checks (`requireAdmin`/`requireDoctorOrAdmin`) query the DB first, falling back to hardcoded `ADMIN_EMAILS = ["aryanadlakha002@gmail.com"]` and an **empty** `DOCTOR_EMAILS = []` (comment: "add doctor emails here" — nobody has, so the DOCTOR role is currently unreachable except by setting a DB row's role directly).
- `assessments.ts` — `saveAssessmentResult`, `getUserAssessments`. Real Supabase reads/writes to `assessment_results`.
- `orders.ts` — `createOrder`, `getUserOrders`. Real Supabase reads/writes to `orders`+`order_items`.

### Authentication & route protection

`src/middleware.ts` uses `clerkMiddleware` + `createRouteMatcher(["/checkout(.*)", "/orders(.*)", "/dashboard(.*)", "/admin(.*)", "/doctor(.*)"])`, calling `auth.protect()` only on matches. Two things worth knowing:
- `/dashboard` is protected but **no `/dashboard` route exists anywhere in `src/app`** — a dead matcher entry, harmless.
- **Role gating for `/admin` and `/doctor` happens only inside the server actions, not in middleware.** Middleware only checks "is this user signed in at all" — any authenticated user's browser will mount the admin/doctor page shell before the underlying `requireAdmin`/`requireDoctorOrAdmin` calls reject their data fetch. No real data leaks (the reject happens before any Supabase read), but it's a UX/security-hygiene gap worth closing with a proper role check at the route level before launch.

Sign-in/sign-up (`src/app/sign-in`, `src/app/sign-up`) are thin wrappers around Clerk's hosted `<SignIn/>`/`<SignUp/>` components (styling overrides only) — forgot-password and email-verification are handled entirely inside Clerk's own component, no custom app code for either.

### Database

`src/lib/supabase.ts` — real `createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, {persistSession: false, autoRefreshToken: false})`, throws at import time if either env var is missing. Includes a `cuid()` helper that is a **simplified custom ID generator** (`c` + base36 timestamp + 8 random chars) — not the real `cuid`/`cuid2` npm package, but sufficient for uniqueness. Tables per CLAUDE.md §4: `users`, `products`, `orders`, `order_items`, `appointments`, `assessment_results` — all confirmed genuinely read/written by the server actions above.

### Payments — simulated, not integrated

`src/app/checkout/page.tsx` creates a real DB order (`createOrder`), then **simulates** the payment step: `setTimeout(() => {...}, 1500)` with an explicit `// Simulated Razorpay payment — replace with real integration later` comment. No `razorpay` package is installed (confirmed absent from `package.json`), no SDK is ever loaded or called. Two additional bugs worth fixing alongside real payment integration:
- If `createOrder` fails, checkout **still proceeds to the success screen** — the error is only `console.warn`'d, never surfaced to the user or blocking the flow.
- The success screen displays a **fabricated order ID** (`SM-${Date.now().toString(36)...}`) that has no relationship to the real database order id returned by `createOrder`.

### Cart

`cart-store.ts` (Zustand) has full CRUD (add/remove/updateQuantity/clear) and derived getters, but `cart/page.tsx` only renders a **read-only bundle list** — `removeItem`/`updateQuantity` exist in the store but aren't wired to any UI control. The discount-code input is a **non-functional placeholder** (text field + "Apply" button with no `onClick`). Cart state is **not persisted** — no Zustand `persist` middleware, so it's lost on page refresh.

### Doctor dashboard — mostly a stub

`src/app/doctor/page.tsx` reuses `getAllOrders`/`getUserRole` from `admin.ts` for its order list, which is real. But the actual "doctor" value-add — call status and notes — is **entirely client-side and fake**: `loadCallStatuses`/`saveCallStatuses` read/write a `localStorage` key (`simplymens_doctor_call_status`), never touching Supabase. This means doctor notes are **per-browser, not shared across devices or between doctors**, and vanish if the browser cache is cleared. There is **no prescription-writing feature and no real approval/review workflow** — the "doctor review" step described in the business model (§1, §11) doesn't have a corresponding implemented feature beyond viewing the same order list an admin sees.

### Admin dashboard

Real and the most complete backend-facing surface: stats tiles, searchable/paginated orders table, live order-status dropdown (`updateOrderStatus`), tracking-number input (`updateTrackingNumber`) — all real Supabase writes. Gap: **no UI for managing users, doctors, or products** — role promotion currently requires editing the DB directly or the hardcoded email arrays in `actions/admin.ts`.

### Emails — not implemented at all

Grepped `src/` for `sendEmail|nodemailer|resend|sendgrid|smtp` — zero hits, zero email SDK in `package.json`. Checkout's "We'll send a confirmation email with tracking details shortly" copy is **UI text only** — no email is ever sent, for any event (welcome, assessment confirmation, doctor approval, order confirmation, shipping update, password reset, review request). This is a launch blocker for a real commercial flow, not just a nice-to-have.

### Legal pages, contact info, placeholders

- `/privacy`, `/terms`, `/refund-policy`, `/shipping-policy`, `/medical-disclaimer`, `/help`, `/contact`, `/about` — **none exist**. All are linked from `layout/footer.tsx` and 404 if clicked.
- 5 program detail pages (`/programs/confidence-recovery`, `/performance-control`, `/testosterone-restore`, `/libido-revival`, `/complete-health`) — **none exist**, same dead-link situation from the footer and Treatment Programs/Program Showcase sections.
- Footer social icons (Instagram/X/LinkedIn) are all `href="#"` — non-functional placeholders.
- Footer phone number is still a literal placeholder: `tel:+91XXXXXXXXXX` / displayed `"+91 XXXXX XXXXX"`. Navbar shows a different, fully-formatted number (`+91 800 123 4567` / `tel:+918001234567`) — **unclear which, if either, is a real business number**; this discrepancy was flagged during the 29 July responsive QA pass too and is still unresolved.

### SEO

`layout.tsx` has real, reasonable metadata: title, description, keywords array, OpenGraph title/description/url/siteName/type. Missing: `twitter:` card metadata, and — more importantly — **no `sitemap.ts`/`.xml` and no `robots.ts`/`.txt` anywhere** in `src/app` or `public`. `src/app/favicon.ico` exists (25.9KB, auto-served by Next's App Router convention) — `public/favicon.ico` does not exist but isn't needed given the App Router one is present.

### Accessibility

Sparse: only 16 total `aria-label`/`aria-hidden`/`role=`/`alt=` occurrences across 10 of 31 `.tsx` files. **`checkout`, `cart`, `orders`, `admin`, `doctor`, and `results` pages have zero aria attributes** — these are exactly the transactional/account pages where screen-reader support matters most. Icon-only buttons (admin's tracking "Add" button, doctor call-status toggles, FAQ/accordion chevrons in some places) commonly lack `aria-label`. Footer's social icons are a good counter-example — they do use `aria-label` correctly. Alt text on images is generally present on the homepage sections (audited separately this session) but not universally applied to `<img>` tags in the dashboard/checkout pages.

### Security

- `.env.local` correctly does not exist in the repo (secrets aren't committed) — required keys are documented in §3.
- `next.config.ts` sets only `images.remotePatterns` — **no security headers at all** (no CSP, `X-Frame-Options`, HSTS, `Referrer-Policy`), no rate limiting on any server action or API route.
- Clerk webhook signature verification is real (svix), not a stub.
- Role-based authorization for `/admin` and `/doctor` happens at the server-action layer, not at the middleware/route layer (see Authentication section above) — functionally safe (no data leaks) but not defense-in-depth.

### Analytics

None. Grepped for `gtag|analytics|posthog|mixpanel` — zero hits anywhere in `src/`.
