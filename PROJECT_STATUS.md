# SimplyMen Project Status

> Last updated: 2026-07-29. Read this file first in any new session — it's the fastest path to understanding the entire project. For file-level detail and citations, see `CLAUDE.md` (technical reference) and `SESSION_MEMORY.md` (chronological decision log). For the production launch checklist, see `LAUNCH_CHECKLIST.md`.

**Brief overview:** SimplyMen (simplymen.care) is a male sexual health e-commerce + telehealth platform for Indian men — assessment → doctor-reviewed kit recommendation → discreet delivery, for ED, PE, low libido, hormonal disorders, and male infertility. Kits-only product model (3 curated 2-week kits, no standalone SKUs). Brand tone: premium, clinical, discreet, doctor-led — Apple/Hims/Stripe restraint, not aggressive e-commerce.

**Current development stage:** The homepage has had the most recent iteration (V2 redesign, narrative reorder, responsive/scroll-UX polish — all done and verified). A full-codebase audit (2026-07-29) confirmed the backend is a real, working system for its core flows (auth, assessment, orders, admin dashboard) but has significant gaps before a real commercial launch: payments are simulated, the doctor dashboard's core workflow is a client-only stub, no emails are ever sent, and no legal pages exist.

**Current completion %:** ~55% toward production launch. Homepage/UI layer alone is ~90% done; the gap is concentrated in payments, doctor workflow, emails, legal pages, and security/SEO hardening — see Overall Completion below for the full breakdown.

**Overall architecture:** Next.js 16 App Router monolith. No separate backend service — Server Actions (`src/app/actions/*`) do almost all business logic, talking directly to Supabase over REST (not a Postgres wire connection, which is blocked by a corporate firewall in the dev environment). Only 2 real API routes exist (`/api/health`, `/api/webhooks/clerk`). Clerk handles all auth UI and session state; middleware gates routes by "signed in or not," with role checks (admin/doctor) happening one layer down inside the server actions themselves.

---

# Tech Stack

| Layer | Technology |
|---|---|
| Frontend framework | Next.js 16.2.2 (App Router, Turbopack) |
| UI library | React 19.2.4 |
| Language | TypeScript ^5 |
| Backend | Next.js Server Actions (`src/app/actions/*`) — no separate API/backend service |
| Authentication | Clerk (`@clerk/nextjs` ^7.0.8) — Google + Email, hosted `<SignIn/>`/`<SignUp/>` components |
| Database | Supabase (`@supabase/supabase-js` ^2.101.1) via REST/HTTPS, service-role key, server-side only |
| Payments | **None integrated.** Razorpay is referenced in copy/docs only — no SDK dependency, checkout simulates payment success via `setTimeout` |
| Storage | Supabase (implicit, for any file storage needs) — no dedicated file-upload flow found in the audit |
| Email | **None.** No email SDK/dependency of any kind (`resend`/`nodemailer`/`sendgrid` all absent), zero email-sending code found anywhere in `src/` |
| Hosting | **Not deployed.** No Vercel project connected yet; local dev only (`npx next dev --turbopack`, port 3000) |
| UI libraries | Tailwind CSS v4 (`@theme inline`), Framer Motion ^12.38.0, Lucide React ^1.7.0, `react-icons` ^5.7.0 (brand/social icons — this project's Lucide build lacks them), `class-variance-authority`, `clsx`, `tailwind-merge` |
| State | Zustand ^5.0.12 (`cart-store.ts`, `assessment-store.ts` — neither persisted across refresh) |
| Webhook verification | `svix` ^1.90.0 (Clerk webhook signature verification — real, not a stub) |

---

# Product Modules

| Module | Status | Completed % | Notes | Pending work |
|---|---|---|---|---|
| Homepage | ✅ Complete | ~90% | 15 sections, narrative-ordered, responsive-audited, animation-standardized. See Homepage Status below | IMA Banner unstyled, Testimonials/Wellness Knowledge/FAQ untouched since original build (though they passed the audit) |
| Authentication | ✅ Mostly complete | ~90% | Clerk fully wired, middleware route protection real, webhook signature-verified and functional | No custom forgot-password/verification UI (fine — delegated to Clerk); role-gating (admin/doctor) only enforced inside server actions, not at the route level |
| Assessment | ✅ Complete | ~90% | Real hand-authored scoring (5 conditions × 12 questions), saves to Supabase | Scoring is "inspired by" IIEF-5/PEDT, not the literal licensed instruments (already disclosed in-app) |
| Recommendations | ✅ Complete | 95% | `getRecommendedKit()` maps condition+severity to a single kit, shown on results page | — |
| Products / Kits | ✅ Complete | 90% | 3 kits, real product images, comparison grid, kit detail pages | — |
| Cart | ⚠️ Partial | 50% | Zustand store has full CRUD; only a read-only bundle view is rendered | Remove/quantity controls not wired to UI; discount-code input is a non-functional placeholder; not persisted across refresh |
| Checkout | ⚠️ Partial | 40% | Real order creation to Supabase; shipping/country/state form real | Payment is 100% simulated (no Razorpay SDK); success shown even if order-creation fails; success screen shows a fabricated order ID unrelated to the real one |
| Payments | 🔲 Not integrated | 0% | — | Needs a real Razorpay (or alternative) integration end-to-end: SDK, order verification, webhook |
| Doctor Dashboard | ⚠️ Mostly stub | 45% | Order list is real (shared with admin's data) | "Call status"/notes are `localStorage`-only, never touch Supabase; no prescription feature; no real approval workflow |
| Admin Dashboard | ✅ Mostly complete | 75% | Real stats, searchable/paginated orders, live status/tracking updates | No UI for managing users/doctors/products — role promotion needs a direct DB edit or hardcoded email list |
| Orders | ✅ Complete | 90% | Real Supabase-backed order history, expandable cards | — |
| User Profile | 🔲 Minimal | 20% | Clerk's `<UserButton/>` provides basic account management | No custom profile/settings page in the app itself |
| Emails | 🔲 Not started | 0% | — | No SDK, no templates, no triggers for any transactional event (welcome, assessment, order, shipping, password reset, review request) |
| Policies (Legal) | 🔲 Not started | 0% | — | Privacy, Terms, Refund, Shipping, Medical Disclaimer, Help, Contact, About — none exist, all footer-linked 404s |
| API | ⚠️ Minimal | 20% (of what a "full API" would be, but by design most logic is in Server Actions, not REST) | `/api/health` (real), `/api/webhooks/clerk` (real, signature-verified) | No REST layer for orders/products/etc. — intentional (Server Actions handle this), just noting there is no external-facing API surface beyond these 2 routes |

---

# Homepage Status

**Current section order** (`src/app/page.tsx`, reordered 2026-07-29 into a "decision journey" narrative):

1. Hero
2. IMA Banner (Trust)
3. How It Works *(merged with the former "Your Personalized Treatment Plan Starts Here" section)*
4. Conditions We Treat
5. Treatment Programs
6. Program Showcase (Program Details)
7. Why Better
8. Routine Graph ("Simplify Your Health Routine")
9. Meet Our Experts
10. Testimonials
11. Why Choose Simply Men
12. FAQ
13. Wellness Knowledge (Knowledge Hub)
14. Footer

**Completed sections:** all 14 above are built and rendering; Hero, How It Works, Routine Graph rebuilt this cycle with new photography/copy/dashboard visuals; Conditions, Treatment Programs, Program Showcase, Why Better, Meet Our Experts, Why Choose Simply Men, Footer rebuilt in the original V2 redesign; all 11 "story" sections have standardized spacing (`py-24 md:py-28 lg:py-36`) and entrance animation (`duration: 0.6, ease: easeOut`, `y: 20`) as of the 2026-07-29 scroll-UX pass.

**Pending improvements:**
- IMA Banner still uses its original pre-V2 marquee styling — never restyled despite being assigned early on.
- Testimonials, Wellness Knowledge, FAQ untouched since the original build (they did pass the 2026-07-29 responsive/animation audit with no issues).
- Footer phone number is still a placeholder (`+91 XXXXX XXXXX`); Navbar shows a different, fully-formatted number — discrepancy unresolved.
- 5 program-detail routes (`/programs/*`) and 8 legal/support routes all 404.

---

# Current Assets

| Asset | Location | Status |
|---|---|---|
| Hero images | `public/hero/hero1.png`, `hero2.png`, `hero3.png` | ✅ Final production photography (replaced 2026-07-29) — plain photos, no baked-in text, heading/CTA rendered in code |
| Doctor images | `public/docs/*.jpeg` (7 portraits) | ✅ In use; one filename→doctor mapping (`vk aggarwal.jpeg` → "Prof. Dr. Vishnu Agrawal") is an unverified assumption |
| Program images | `public/programs/*`, `public/choose your treatment pics/*` | ✅ In use (mix of SVG illustrations + one raster photo) |
| Kit product images | `public/images/essential_wellness.png`, `confidence_plus.png`, `complete_mens_health.png` | ✅ Real photos wired into products/results pages |
| Logo | `public/images/logo.png` | ✅ In use (Navbar + Footer) |
| Brand assets (PDFs) | `ref documents/Component Library — Design System.pdf`, `Homepage V2 - Kits First.pdf` | ✅ Reference material, not app code |
| Favicon | `src/app/favicon.ico` | ✅ Exists (25.9KB), auto-served by Next's App Router convention |
| Dead/unused files | `public/Image (7/8/12/13/14).jpeg`, `prompt1_image.png`–`prompt4.jpeg`, `images/condition-ed.jpg`/`condition-pe.jpg`, duplicate `images/hero/*`, default create-next-app SVGs | Confirmed zero references in `src/` — cleanup candidates, not yet removed |
| New, uncommitted images | `public/images/ChatGPT Image Jul 29, 2026...png` (×3) | Untracked in git as of this update — purpose/origin not yet confirmed in this session |

---

# Current Brand Guidelines

**Typography:** DM Serif Display (headings, `--font-display`, weight 400 only) + Manrope (body, `--font-body`, migrated from DM Sans July 2026).

**Colours:** `--primary #3B4856`, `--primary-dark #1C2530`, `--secondary #3E5577`, `--accent #C4915A` (main CTA gold), `--gold #B8934A`, `--background #FAFAF7`, `--surface #F2F0EB`, `--foreground #1C2024`, `--muted #6E7781`, `--success #2D8A4E`, `--warning #D4A017`, `--danger #C0392B`, `--border #D8D5CE`. Teal (`teal-*` Tailwind palette, not a token) is an explicit per-component exception used in Treatment Programs, Meet Our Experts, condition icons.

**Spacing:** Standardized 2026-07-29 — all "story" sections use `py-24 md:py-28 lg:py-36` (generous desktop, graduated tablet, compact mobile). Hero, IMA Banner, Footer are exempt by design.

**Button styles:** Primary CTA is `bg-accent hover:bg-accent/90`, `rounded-full`, white text — used by Hero, How It Works, Program Showcase, Why Better, Routine Graph. Treatment Programs uses `bg-teal-600` instead (documented intentional exception, not a bug). Sizing/icon-presence varies slightly by section context (compact dark strips vs. full section endings) — noted, not unified.

**Card styles:** `rounded-3xl`, shadow recipe `shadow-[0_2px_12px_rgba(28,32,36,0.05)] hover:shadow-[0_20px_40px_rgba(28,32,36,0.12)]`, hover lift `hover:-translate-y-1.5`.

**Animation language:** Standardized 2026-07-29 — every viewport-triggered entrance uses `initial={{opacity:0, y:20}}`, `transition={{duration:0.6, ease:"easeOut"}}`, `viewport={{once:true}}`. Hover/interaction transitions (accordion expand, carousel hover) intentionally stay faster (0.2–0.4s). No scroll-snap, sticky, or pinning anywhere on the homepage — natural scroll only, by explicit design decision.

**Design philosophy:** Premium, clinical, discreet, doctor-led, warm — not "bro-marketing," not a gym ad, not a dating app, not stock photography. Think Apple × Hims × Stripe restraint.

---

# Current Integrations

| Integration | Status | Notes |
|---|---|---|
| Clerk | ✅ Real | Auth, session, middleware protection, webhook (svix-verified) all functional. Needs production keys + `CLERK_WEBHOOK_SECRET` configured before launch |
| Supabase | ✅ Real | REST client, service-role key, all server actions read/write for real. Tables: `users`, `products`, `orders`, `order_items`, `appointments`, `assessment_results` |
| Payments | 🔲 Not integrated | No Razorpay (or any) SDK dependency; checkout simulates success |
| Email | 🔲 Not integrated | No SDK/service of any kind connected |
| Storage | ⚠️ Implicit only | No dedicated file-upload flow found; relies on static `public/` assets and hardcoded image paths |
| Analytics | 🔲 Not integrated | Zero analytics code anywhere (no GA/Vercel Analytics/PostHog/Mixpanel) |

---

# Known Issues

- Checkout shows a success screen even if the underlying `createOrder()` call fails (error only `console.warn`'d).
- Checkout success screen displays a fabricated order ID (`SM-${Date.now()...}`), unrelated to the real database order id.
- Doctor dashboard's call-status/notes are `localStorage`-only — not shared across devices/doctors, lost on cache clear.
- Cart's discount-code input has no `onClick` handler — completely non-functional.
- Cart has no remove/quantity UI despite the store supporting it.
- `/admin` and `/doctor` role-gating happens only in server actions, not middleware — authenticated non-admin/doctor users can mount the page shell before their data fetch is rejected (no data leak, but not defense-in-depth).
- Footer phone number is a placeholder; Navbar shows a different, seemingly-real number — unclear which is correct.
- 13 linked routes 404 (5 program-detail pages + 8 legal/support pages).
- IMA Banner was assigned for a V2 restyle early on and never completed.
- Doctor photo filename `vk aggarwal.jpeg` → "Prof. Dr. Vishnu Agrawal" mapping is an unverified assumption (by elimination).
- `DOCTOR_EMAILS` array in `actions/admin.ts` is empty — no one can currently reach the DOCTOR role via the hardcoded-email fallback path.

---

# Technical Debt

- Most non-Hero images still use plain `<img>` instead of `next/image` (no automatic `srcset`/optimization) — `loading="lazy"` added as a 2026-07-29 stopgap, full migration not done.
- `cuid()` in `lib/supabase.ts` is a simplified custom ID generator, not the real `cuid`/`cuid2` package — fine for uniqueness, not spec-compliant.
- Several undocumented, unreferenced files sit in `public/` (see Current Assets table) — cleanup candidate.
- No `next/image` migration, no bundle-size audit performed.
- Accessibility coverage is sparse and uneven — worth a dedicated pass rather than only incidental fixes.
- Treatment Programs' teal CTA vs. the gold/accent CTA used everywhere else — flagged as a design-consistency question, not resolved either way.
- Why Better and Why Choose Simply Men sections cover overlapping ground and sit back-to-back — flagged during the original build, never resolved.

---

# Production Blockers

1. **No real payment integration** — cannot process a real transaction today.
2. **No email system** — no order confirmations, no doctor-approval notices, no password-reset-adjacent comms beyond what Clerk itself sends.
3. **No legal pages** — Privacy/Terms/Refund/Shipping/Medical Disclaimer don't exist; likely a compliance requirement for a health-adjacent commercial site before accepting real orders.
4. **Doctor review workflow doesn't functionally exist** — "Doctor review (if Rx)" is core to the stated business model but the dashboard only offers a local-only status tag, no prescription or clinical documentation feature.
5. **Not deployed anywhere** — no Vercel project, no production environment variables, no domain DNS pointed anywhere yet (see CLAUDE.md §14 for the planned steps, none executed).
6. **No security headers / rate limiting** — acceptable for a dev environment, not for a live commercial site handling health data.

---

# Release History

- **31 May 2026** — Migrated to kits-only product model (removed 8 standalone products, added 3 curated kits); added Routine Graph landing section.
- **21 July 2026** — Homepage V2 redesign: full landing-page rebuild against a "Homepage V2 — Kits First" reference + Component Design System PDF (Hero, Conditions, Not Sure CTA, Treatment Programs, Program Showcase, How It Works, Why Better, Routine Graph, Meet Our Experts, Why Choose Simply Men, Footer all rebuilt or newly added); typography migrated DM Sans→Manrope; design tokens corrected to match spec.
- **29 July 2026** — Homepage narrative reorder + How It Works/Not Sure CTA merge; Hero rebuilt against final production photography with code-rendered copy; Routine Graph redesigned into a literal-transformation comparison dashboard; full responsive QA pass (3 real Hero bugs fixed); scroll-UX pass (spacing/animation standardized sitewide, Program Showcase's missing entrance animation added); Meet Our Experts wheel-scroll bug fixed; full-product audit performed and all documentation (`CLAUDE.md`, `SESSION_MEMORY.md`) corrected to reflect real backend/dashboard/checkout/email/legal/SEO/security state; `PROJECT_STATUS.md` and `LAUNCH_CHECKLIST.md` created.

---

# Next Milestone

**Real payment integration (Razorpay).** This is the single highest-leverage item: it's the actual product-blocking gap between "looks like an e-commerce site" and "can process a real order," it's self-contained (one flow, one file mainly — `checkout/page.tsx`), and every other launch blocker (emails, legal pages, doctor workflow) can proceed in parallel or after without being blocked by it. Recommended before anything else in the Homepage backlog (IMA Banner, etc.) — those are cosmetic; this is transactional.

---

# Overall Completion

| Area | Completion |
|---|---|
| Homepage | ~90% |
| Backend (DB + server actions + APIs) | ~75% |
| Doctor Dashboard | ~45% |
| Admin Dashboard | ~75% |
| Authentication | ~90% |
| Payments | 0% |
| Emails | 0% |
| SEO | ~35% |
| Accessibility | ~30% |
| Security | ~45% |
| Deployment | ~10% |
| **Entire Project (production-launch readiness)** | **~55%** |
