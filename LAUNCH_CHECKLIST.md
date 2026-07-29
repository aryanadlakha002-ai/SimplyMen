# SimplyMen Launch Checklist

> Single source of truth before deployment. Status marks: ☑ Completed · ◐ In Progress / Partial · ☐ Not Started. Grounded in the 2026-07-29 full-codebase audit (see `CLAUDE.md` §18 and `PROJECT_STATUS.md` for full detail/citations) — not aspirational, reflects the real codebase as of this update.

---

## Branding

- ☑ Logo — `public/images/logo.png`, in use (Navbar + Footer)
- ☑ Favicon — `src/app/favicon.ico` exists, auto-served by Next's App Router convention
- ◐ Meta — `layout.tsx` has real title/description/keywords/OpenGraph tags; missing `twitter:` card metadata
- ☐ Social Preview — no `twitter:` card, OG image not explicitly verified/confirmed to render correctly when shared
- ☐ Canonical — no explicit canonical URL configuration found

## Homepage

- ☑ Hero — rebuilt against final production photography, code-rendered copy, per-slide focal points, responsive-verified
- ☑ Responsiveness — full audit done 2026-07-29 across desktop (1920→1280), tablet (1024/820/768), mobile (430→320); 3 real bugs found and fixed
- ☑ Animations — standardized entrance animation (`duration:0.6, ease:easeOut, y:20`) across all 11 story sections; Program Showcase's missing animation added
- ☑ CTA — "Start Free Assessment" consistency audited; one hardcoded-hex color bug fixed; teal-vs-gold variance documented as intentional, not fixed
- ◐ Content — IMA Banner still unstyled (pre-V2 marquee); Testimonials/Wellness Knowledge/FAQ untouched since original build (passed audit, just not redesigned)
- ◐ Accessibility — homepage sections have reasonable alt-text coverage; not exhaustively audited against WCAG

## Authentication

- ☑ Signup — Clerk hosted `<SignUp/>`, functional
- ☑ Signin — Clerk hosted `<SignIn/>`, functional
- ☑ Password Reset — handled entirely by Clerk's hosted flow (no custom app code, by design)
- ☑ Email Verification — handled entirely by Clerk's hosted flow (no custom app code, by design)
- ◐ Protected Routes — middleware protects `/checkout`, `/orders`, `/dashboard` (dead — no route exists), `/admin`, `/doctor` for "signed in or not" only; role-gating (admin/doctor) happens one layer down in server actions, not at the route level — should be hardened before launch

## Assessment

- ☑ Questions — real, hand-authored, 5 conditions × 12 questions (`lib/data/questionnaires.ts`)
- ☑ Validation — multi-phase flow (info → concern → questions → analyzing) with real state management
- ☑ Results — computed severity + kit recommendation, real
- ☐ Doctor Review — **does not functionally exist** — no review/approval step beyond the doctor dashboard's local-only status tag (see Doctor Dashboard section)
- ☑ Recommendations — `getRecommendedKit()` maps condition+severity to a single kit correctly

## Products

- ☑ Images — real photos for all 3 kits
- ☑ Pricing — ₹1,499 / ₹1,999 / ₹2,999, correctly wired through cart/checkout
- ☐ Inventory — no stock/inventory tracking system found (kits-only model may not need it, but flagging since it wasn't found either way)
- ☑ Descriptions — real, complete per kit
- ☐ Stock — no explicit stock-level display or out-of-stock handling found

## Checkout

- ◐ Cart — Zustand store has full CRUD; UI only renders a read-only bundle view, remove/quantity controls not wired up
- ☐ Payment — **fully simulated** (`setTimeout`, no Razorpay SDK/dependency at all) — launch blocker
- ◐ Success — success screen renders, but shows a **fabricated order ID** unrelated to the real DB order, and displays even when order-creation actually failed
- ☐ Failure — no real payment-failure handling exists (nothing to fail, since payment is simulated)
- ☐ Refund — no refund flow or policy page exists

## Emails

- ☐ Welcome — not implemented
- ☐ Assessment — not implemented
- ☐ Doctor Approval — not implemented (and the underlying approval workflow itself doesn't exist either)
- ☐ Order Confirmation — not implemented (checkout UI copy claims this happens; it does not)
- ☐ Shipping — not implemented
- ☐ Password Reset — handled by Clerk's own email system (outside this app's control), not a gap in this app's code
- ☐ Support — no support-request email flow exists

**Overall: zero email infrastructure of any kind** — no SDK dependency, no templates, no trigger code anywhere in `src/`.

## Doctor Dashboard

- ☑ Review Queue — real order list (shares `getAllOrders` with admin dashboard)
- ☐ Patients — no dedicated patient-record view beyond the order list
- ☐ Prescriptions — feature does not exist
- ◐ Notes — exists, but **`localStorage`-only**, never persisted to Supabase, not shared across devices/doctors
- ◐ Status — same as Notes — client-side only, not a real backend workflow

## Admin Dashboard

- ☑ Users — visible implicitly via orders (customer info), but no dedicated user-management UI
- ☐ Doctors — no doctor-management UI; promotion requires editing `DOCTOR_EMAILS` array in code or the DB directly (array is currently empty)
- ☐ Products — no product-management UI (kits are hardcoded in `lib/data/products.ts`)
- ☑ Orders — real, searchable, paginated, with live status/tracking updates
- ☑ Analytics (basic) — stat tiles (orders/pending/revenue/users) are real, computed from Supabase

## Legal

- ☐ Privacy — page does not exist, footer link 404s
- ☐ Terms — page does not exist, footer link 404s
- ☐ Refund — page does not exist, footer link 404s
- ☐ Shipping — page does not exist, footer link 404s
- ☐ Medical Disclaimer — page does not exist; was previously removed from the footer entirely (per an earlier design decision) and never relocated anywhere
- ☐ Consent — no explicit consent-capture UI found (e.g., for health-data processing)
- ☐ Age Restrictions — no age-gate or age-verification found anywhere in the assessment/checkout flow

**This entire section is a likely compliance requirement before accepting real orders for a health-adjacent product — treat as launch-blocking, not optional.**

## SEO

- ◐ Metadata — real title/description/keywords/OG tags in `layout.tsx`; missing Twitter card
- ☐ Schema — no structured data (JSON-LD) found anywhere
- ☐ robots.txt — does not exist
- ☐ Sitemap — does not exist (no `sitemap.ts`/`.xml`)
- ☐ Canonical — not explicitly configured
- ◐ Alt Text — present on most homepage image components; not verified on dashboard/checkout pages

## Accessibility

- ☐ Contrast — not formally audited against WCAG AA/AAA
- ◐ Keyboard Navigation — standard interactive elements (links/buttons/inputs) are keyboard-reachable by default (no custom focus-trapping found), not explicitly tested end-to-end
- ☐ ARIA — sparse: only 16 total `aria-label`/`aria-hidden`/`role=` occurrences across 10 of 31 `.tsx` files; `checkout`/`cart`/`orders`/`admin`/`doctor`/`results` have **zero**
- ☐ Focus States — not audited; relies on browser/Tailwind defaults, no custom focus-visible styling confirmed sitewide

## Performance

- ◐ Images — Hero fully optimized (`next/image`, responsive `sizes`, no `unoptimized`); most other components still use plain `<img>` with `loading="lazy"` added as a stopgap, not full `next/image` migration
- ☐ Bundle — no bundle-size analysis performed
- ☑ Caching — Next.js defaults apply; no custom caching strategy audited beyond that
- ◐ Lazy Loading — added to 5 components' `<img>` tags in the 2026-07-29 pass; not sitewide
- ☐ CLS — not formally measured (font loading uses `next/font`'s automatic metric-override mitigation, which helps, but no Lighthouse/CLS number captured)
- ☐ LCP — not formally measured

## Security

- ☑ Secrets — `.env.local` correctly not committed to the repo; required keys documented in `CLAUDE.md` §3
- ◐ Validation — form-level validation exists on assessment/checkout inputs; not exhaustively audited for every field
- ☑ Authentication — Clerk-backed, real, functional
- ◐ Authorization — role checks are real but only enforced at the server-action layer, not at the route/middleware layer for `/admin` and `/doctor`
- ☐ API Protection — the 2 real API routes have no explicit rate limiting; Clerk webhook does verify signatures (real, via svix)
- ☐ Rate Limiting — not implemented anywhere

## Deployment

- ☐ Production Build — not attempted/verified in this session (`npm run build` not run as part of this audit)
- ☐ Environment Variables — no production env configured; only local dev keys assumed to exist outside the repo
- ☐ Domain — `simplymen.care` referenced in metadata; DNS/hosting steps from `CLAUDE.md` §14 not executed
- ☐ SSL — depends on hosting step above (Vercel auto-provisions once domain is added — not yet reached)
- ☐ Monitoring — none configured
- ☐ Error Logging — none configured (no Sentry or equivalent)
- ☐ Analytics — none configured (no GA/Vercel Analytics/PostHog/Mixpanel)

---

## Summary

**Launch-blocking (must complete before any real commercial launch):** Payment integration, transactional emails, all legal pages, a real doctor-review workflow, production deployment + env setup.

**High-priority but not strictly blocking:** Role-gating hardening at the route level, sitemap/robots.txt, basic security headers, cart UI wiring (remove/quantity/discount).

**Lower priority / polish:** IMA Banner restyle, `next/image` migration for remaining images, accessibility pass, teal-vs-gold CTA decision, dead-file cleanup in `public/`.
