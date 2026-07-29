# SimplyMen Project Memory

Last Updated: 2026-07-29
Current Branch: main
Last Commit: 13850f1 — "Add SESSION_MEMORY.md — project progress memory file" (everything below — homepage reorder/merge, hero rebuild, routine graph redesign, responsive/scroll-UX QA pass, Meet Our Experts wheel-scroll fix, full-product audit, doc sync — is UNCOMMITTED as of this update)
Current Phase: Full-product audit + documentation pass complete, on top of the Homepage V2 milestone. **SimplyMen is a full-stack telehealth platform, not a homepage project** — see "FULL PRODUCT AUDIT" section below and `PROJECT_STATUS.md`/`LAUNCH_CHECKLIST.md` (new files, repo root) for the complete picture. Homepage narrative reorder, Hero rebuild, Routine Graph redesign, responsive/CTA/performance/scroll-UX audits, and a wheel-scroll bug fix are all done and verified. A separate, deeper audit of the backend/auth/dashboards/checkout/emails/legal/SEO/security surfaced that several previously-"Complete" features are actually partial or simulated (see below) — CLAUDE.md §11/§18 corrected accordingly.
Homepage V2 completion: ~90% (unchanged assessment, still accurate). **Overall project (production-launch) completion: ~55%** — see PROJECT_STATUS.md for the full breakdown; the gap between "homepage looks done" and "platform is launch-ready" is real payments, real emails, legal pages, a non-stub doctor workflow, and security/SEO hardening.

---

# PROJECT OVERVIEW

SimplyMen (simplymen.care) is a male sexual health e-commerce + telehealth platform.

**Business model:** Assessment → Kit recommendation → Doctor review (if Rx) → Discreet delivery.

**Product model:** Kits-only (no standalone products). 3 curated 2-week kits:
- Essential Wellness Kit — ₹1,499
- Confidence Plus Kit — ₹1,999
- Complete Men's Health Kit — ₹2,999

**Target audience:** Indian men seeking confidential, doctor-backed treatment for ED, PE, low libido, hormonal disorders, male infertility.

**Brand personality:** Premium, clinical, discreet, doctor-led, warm (not cold/sterile), not "bro-marketing." Think Apple/Hims/Stripe restraint, not aggressive e-commerce.

**Current status:** The homepage redesign phases in this session were UI-only (no business logic, routing, auth, or DB code touched). **However, a 2026-07-29 full-codebase audit found the backend itself is only partially complete** — assessment/results/orders/admin-dashboard/Clerk-auth/Supabase are genuinely real and functional, but payments are fully simulated, the doctor dashboard's core value (call notes) is localStorage-only fake persistence with no real approval workflow, cart is missing UI wiring for remove/quantity/discount, no emails are ever sent, and no legal pages exist. See "FULL PRODUCT AUDIT" section below for the complete, source-verified picture — do not assume "backend complete" from older parts of this file without checking that section first.

---

# CURRENT PRIORITY

Building Homepage (V2 redesign)

---

# CURRENT TASK

• Milestone QA + documentation pass complete (2026-07-29): homepage reorder to a healthcare-decision-journey narrative (Hero → Trust → How It Works → Conditions → Programs → Program Details → Why Better → Routine Graph → Experts → Testimonials → Why Choose SimplyMen → FAQ → Wellness Knowledge → Footer), "Your Personalized Treatment Plan Starts Here" merged into How It Works, Hero rebuilt against 3 final production photos, Routine Graph redesigned into a comparison dashboard, full responsive audit (desktop 1920→mobile 320) with 3 real Hero bugs fixed, one CTA-consistency fix, lazy-loading added to 5 components' images, and both CLAUDE.md + this file synced to current state. **Uncommitted** — working tree has all of the above pending review before commit.

---

# COMPLETED TASKS

✓ Hero rebuilt — pure image carousel (`/hero/hero1-3.png`, pre-designed banners with heading/CTA baked into the image itself, no text/overlay in code)
✓ Conditions rebuilt — dropped old "Comprehensive care, built around you" heading + 2 alternating ED/PE feature blocks; now single row of 5 uniform cards (ED, PE, Low Libido, Hormonal Disorders, Male Infertility), Lucide icons, teal-themed hover
✓ Not Sure CTA section built (`home/not-sure-cta.tsx`) — "Your Personalized Treatment Plan Starts Here", 4-step process row, gold CTA, trust badges, layered warm-cream decorative background
✓ Treatment Programs section built (`home/treatment-programs.tsx`) — 5 program cards, teal theme, "Start Free Assessment" CTA deep-linked per concern
✓ Program Showcase section built (`home/program-showcase.tsx`) — 4 alternating image/benefit rows (ED, PE, Hormonal, Libido)
✓ How It Works rebuilt (`landing/how-it-works.tsx`) — was 3 alternating image/text steps, now 4-card grid with real branded step images
✓ Why Better section built (`home/why-better.tsx`) — "Why Our Treatment Programs Work Better", Traditional-vs-Simply-Men spider/comparison diagram with animated SVG connector lines converging on a center circle
✓ Routine Graph rebuilt (`landing/routine-graph.tsx`) — was a Month 1→5 line graph ("Routine Simplification"), now 3 stat cards with animated progress rings ("Simplify Your Health Routine")
✓ Meet Our Experts section built (`home/meet-our-experts.tsx`) — horizontally scrollable carousel, 7 doctors, snap-scroll + arrow nav, renamed to "Meet Our Medical Experts"
✓ Why Choose Simply Men section built (`home/why-choose-simplymen.tsx`) — single premium rounded container, 5-feature grid + trust pill
✓ `why-choose-us.tsx` deleted entirely (old "Healthcare designed around you" section — lifestyle image + floating bottle + 6 features) — superseded by Why Better + Why Choose Simply Men
✓ Footer rebuilt twice — first dark-navy premium version, then rebuilt again per PDF reference: warm off-white (`#F7F3EE`) background, 5-column layout (brand + Treatment Programs/Support/Legal/Company), trust bar + dark disclaimer block removed, bottom row simplified to copyright + phone/email
✓ Typography migrated: body font DM Sans → Manrope, centralized via `layout.tsx` (`next/font/google`) + `globals.css` (`--font-body`)
✓ Design tokens corrected in `globals.css`: `--primary`, `--primary-dark`, `--muted`, `--success`, `--warning` had drifted from the Design System PDF spec — fixed to match exactly
✓ `react-icons` added as a dependency (`^5.7.0`) after discovering this project's `lucide-react` build lacks `Instagram`/`Linkedin`/`Twitter` exports (confirmed via real build errors)
✓ Hero image-optimizer bug diagnosed and fixed — Next.js image optimizer was serving stale cached bytes for `hero3.png` after asset replacement; fixed by adding `unoptimized` to the Hero `<Image>` (temporary — see Pending Tasks)
✓ Homepage fully responsive pass done across all rebuilt sections (desktop/tablet/mobile grids specified per section)
✓ `CLAUDE.md` updated to reflect all of the above (project structure, design tokens, component list, changelog)
✓ Git repo initialized, connected to `https://github.com/aryanadlakha002-ai/SimplyMen`, force-pushed (old pre-redesign scaffold commit intentionally discarded per explicit user decision)
✓ Design reference PDFs (`Component Library — Design System.pdf`, `Homepage V2 - Kits First.pdf`) moved into `ref documents/` and pushed
✓ Homepage narrative reorder (2026-07-29) — new section order applied in `src/app/page.tsx` to follow a natural decision journey (what happens on click → conditions treated → treatment → trust), see COMPONENT STATUS for exact order. No internal layout of any moved section was changed.
✓ Homepage scroll UX refinement (2026-07-29) — standardized vertical section spacing to `py-24 md:py-28 lg:py-36` across all 11 story sections (`landing/how-it-works.tsx`, `landing/conditions.tsx`, `home/treatment-programs.tsx`, `home/program-showcase.tsx`, `home/why-better.tsx`, `landing/routine-graph.tsx`, `home/meet-our-experts.tsx`, `landing/testimonials.tsx`, `home/why-choose-simplymen.tsx`, `landing/faq.tsx`, `landing/wellness-knowledge.tsx`) — fixed 3 real outliers (`home/treatment-programs.tsx` and `landing/routine-graph.tsx` were `py-24 lg:py-32`; `home/why-choose-simplymen.tsx` had no `lg:` step at all, only `py-24`, the biggest gap). Hero (fixed-height image carousel), IMA Banner (persistent trust ribbon), and Footer (intentional asymmetric `pt-24 pb-16`) are exempt by design, left untouched. Standardized every viewport-triggered entrance animation to `transition={{duration: 0.6, ease: "easeOut"}}` for section headings/wrappers (many previously had no explicit `transition` at all, relying on framer-motion's implicit default) and bumped stagger-item durations under 0.5s up to 0.5s (Testimonials cards 0.4→0.5, FAQ items 0.3→0.5); normalized all `initial={{y: ...}}` offsets to `y: 20` (previously a mix of 20/24/30). **Added the section's first-ever entrance animation to `home/program-showcase.tsx`** — its 4 alternating rows had zero `whileInView`/`motion` wrapper before this pass (plain `<div>`), now wrapped in `motion.div` with the same fade-up pattern as every other section. Hover-only/interaction transitions (RoutineGraph column hover fade/lift/arrow-bounce at 0.3-0.4s, FAQ accordion expand at 0.2s) were deliberately left alone — those are correct at that speed and are not scroll-entrance animations. No scroll-snap, sticky, or pinning used or removed (none existed). No section reordered, no content changed. `npx tsc --noEmit` clean; verified live in browser (Program Showcase's new animation renders correctly, no console errors, spacing reads consistently scrolling through the full page).
✓ Meet Our Experts wheel-scroll fix (2026-07-29) — `home/meet-our-experts.tsx`'s doctor carousel was trapping vertical mouse-wheel scroll. Root cause: not a JS bug, but a native Chromium quirk — a horizontal-only-overflow container (`overflow-x-auto` + `snap-x`, no vertical overflow) auto-converts vertical wheel deltas into horizontal container scroll, consuming the event before it reaches the page. Fixed with a native (non-passive, added via `useEffect` since React's `onWheel` is passive-by-default and silently can't `preventDefault()`) `wheel` listener: vertical-dominant deltas (`|deltaY| > |deltaX|`) get `preventDefault()`'d and forwarded to `window.scrollBy({top: e.deltaY, behavior: "instant"})` — `instant` is required because the page's global `scroll-behavior: smooth` (globals.css) only affects programmatic scrolls and would otherwise make the forwarded scroll visibly lag behind native page scrolling elsewhere. Horizontal-dominant deltas are left untouched (no `preventDefault`), so the carousel's existing horizontal wheel/arrow/swipe behavior is unaffected — confirmed by code inspection (the branch has zero side effects for horizontal deltas). Verified via a dispatched `WheelEvent({deltaY:300})`: `window.scrollY` moved by exactly 300 while `carousel.scrollLeft` stayed 0. Arrow-button click verification was inconclusive in this automation environment (programmatic `.click()` and direct `scrollLeft` writes behaved inconsistently in the test harness itself, unrelated to the fix) — **arrow-button smooth-scroll-on-click should get one real manual click-test** before considering this fully closed, though the underlying `scroll()` function/onClick wiring was not touched by this fix at all. `npx tsc --noEmit` clean.
✓ Full responsive QA + documentation pass (2026-07-29) — see "QA PASS FINDINGS" section below for full detail. Summary: verified Hero + all 14 other homepage sections across desktop (1920/1440/1366/1280), tablet (1024/820/768), and mobile (430/390/375/320) widths; fixed 3 real Hero responsive bugs (heading wrap/clip at ≤360px, trust-indicator/dots collision, `object-center` cropping the subject out of frame on narrow viewports — now per-slide `focalPoint`); fixed one CTA color-token inconsistency (How It Works CTA was hardcoded hex, not `bg-accent`); added `loading="lazy"` to 5 components' `<img>` tags; confirmed no horizontal overflow at 320px sitewide via `scrollWidth` check. `npx tsc --noEmit` clean throughout.
✓ Hero rebuilt again (2026-07-29) — `public/hero/hero1-3.png` replaced with 3 new final custom photography assets (plain editorial photos, no baked-in text this time, composed with clean left negative space + subject on the right). `landing/hero.tsx` now renders heading/subtitle/CTA/trust-indicators in code, overlaid on the left negative space, instead of the old "pure image carousel with baked-in text" approach. New copy: Hero1 "Restore Confidence. / Rediscover Intimacy." (ED/performance/wellness), Hero2 "Stronger Erections. / Lasting Performance." (ED/PE/intimacy), Hero3 "Private Care. / Personalized Results." (doctor-led telehealth experience, no longer a specific-condition message). Heading: DM Serif Display, white, bold. Subtitle: Manrope, `#F3F4F6`, max-w-520px. CTA: "Start Free Assessment" → `/assessment`, `bg-accent` gold pill, hover lift. Trust indicators: Doctor Reviewed / 100% Confidential / 4-Min Assessment, small Lucide icons (`Stethoscope`/`ShieldCheck`/`Clock3`). Added one subtle left-side `black/55→transparent` gradient (text-legibility only, per explicit spec allowance) — no full-image tint/darken/blur. Text block fades up on slide change (`AnimatePresence key={active}`); image crossfade (0.7s) and arrows/dots/autoplay/pause-on-hover carousel mechanics untouched. Removed the temporary `unoptimized` prop from the hero `<Image>` (pending task item, now closed — user confirmed these are final assets). `npx tsc --noEmit` clean; curl-verified new copy renders.
✓ Redesigned `landing/routine-graph.tsx` comparison cards (2026-07-29) — replaced 3 disconnected KPI cards with circular percentage rings with ONE unified `rounded-3xl` white dashboard card containing 3 equal columns (Products Used / Monthly Cost / Time Per Day), each showing a literal Traditional→SimplyMen visual transformation instead of a percentage: 12-icon `Pill` grid → single `Package` icon ("11 fewer products"), 6-coin custom stack → 2-coin stack (₹4,600→₹1,999/month, "Save ₹2,601 every month"), large `Clock` icon → small `Clock` icon (45→5 min/day, "Get 40 minutes back every day"). No percentage rings/donuts/gauges anywhere. Added `AnimatedNumber` helper (framer-motion `animate` + `useInView`, no new dependency) so all stat numbers count up on scroll-into-view. Hover micro-interactions on each column: "Traditional" fades (`opacity 1→0.55`), "SimplyMen" lifts (`y: -6`), transition arrow bounces once — all via framer-motion `variants`/`whileHover` on a shared parent, not new state. Heading kept ("Simplify Your Health Routine"), subtitle copy changed to "Everything you need, without the complexity of traditional treatment." per spec. Bottom dark CTA strip kept as-is structurally; copy changed to "Join 50,000+ men who've simplified their treatment with SimplyMen" (was "...who simplified their health routine"); "Start Free Assessment" button untouched. Background layers, section padding, and outer section wrapper untouched. `npx tsc --noEmit` clean; verified copy renders via curl against the running dev server.
✓ Merged `home/not-sure-cta.tsx` ("Your Personalized Treatment Plan Starts Here") into `landing/how-it-works.tsx` (2026-07-29) — single section now: heading "How It Works" → subheading "Personalized, doctor-led care from assessment to discreet delivery." → "Join 50,000+ men..." line → 4 illustrated step cards (reused `step1-4.svg`, step 3 title changed from "Personalized Plan" to "Personalized Treatment Program" per merge spec, description text unchanged) → "Start Free Assessment" CTA (originally reused NotSureCTA's hardcoded `#C08A4B` pill button + JS hover; corrected 2026-07-29 QA pass to the standard `bg-accent hover:bg-accent/90` token classes, see QA PASS FINDINGS below) → trust indicators row (100% Confidential / Doctor Reviewed / Takes Only 4 Minutes / No Obligation, reused NotSureCTA icons). Kept NotSureCTA's layered decorative background (`#FFF8F0` + gradient blobs + contour SVGs + grain) wrapping the whole merged section for "premium feel." Dropped: NotSureCTA's small icon-circle step row (4-Min Assessment/Doctor Review/Personalized Program/Discreet Delivery with connector arrows) — redundant with the illustrated cards, this was the actual duplicate-messaging problem the merge fixed. Also dropped How It Works' old "Learn more about our clinical standards" text link (`/clinical-standards`) — not in the specified merged structure. `home/not-sure-cta.tsx` deleted from disk (same precedent as `why-choose-us.tsx`). `npx tsc --noEmit` clean after merge.

---

# QA PASS FINDINGS (2026-07-29)

Full responsive + CTA-consistency + performance audit requested after the Homepage V2 milestone. Environment note first: **OS-level browser window resize does not change the actual page viewport in this sandbox** (`window.innerWidth` stayed pinned at 1536 regardless of requested resize width) — verification instead used a same-origin `<iframe>` at fixed pixel widths injected into the page (real CSS breakpoints respond correctly to an iframe's own width), confirmed against `window.innerWidth`/`scrollWidth` reads. If a future session hits the same resize-doesn't-work symptom, this iframe technique is the workaround, not a dead end.

**Breakpoints actually screenshot-verified:** 1920, 1536 (this environment's native/maximized width — stands in for ~1440–1600 laptop range), 1366, 1280, 1024 (iPad Pro / lg boundary), 820 (iPad Air), 768 (iPad Mini / md boundary), 430, 390, 375, 320 (iPhone SE — smallest tested). 360/414/1728/1600/MacBook-specific sizes were not individually screenshot but are safely between verified neighbors with no code branch specific to them (Tailwind breakpoints are `sm:640 md:768 lg:1024 xl:1280`, nothing else changes behavior between the tested points).

**Bugs found and fixed (all in `src/components/landing/hero.tsx`):**
1. **Heading clipped at top, ≤360px width** — two-line heading (e.g. "Restore Confidence." / "Rediscover Intimacy.") wrapped to 4 lines at narrow widths because `text-3xl` (30px) didn't fit one line each in the ~270px available text column; combined with a *fixed* `h-[420px]` mobile section height + `overflow-hidden`, the extra wrapped lines pushed the heading's top above the visible area. Fix: base heading size dropped to `text-[26px]` with `leading-[1.15]`, and the section height changed from fixed `h-[420px] sm:h-[520px]` to `min-h-[480px] sm:min-h-[560px]` (lg/xl keep the original fixed height) so the section can grow with content instead of clipping it.
2. **Trust-indicator row overlapped the carousel dot indicators, ≤360px** — the wrapped 2-line trust row (Doctor Reviewed/100% Confidential/4-Min Assessment) reached far enough down to collide with the absolutely-positioned dots at `bottom-6`. Fix: tighter mobile vertical rhythm (`mt-5 sm:mt-8` on CTA and trust row, was `mt-8` uniformly) plus `pb-14 sm:pb-0` reserved on the content block.
3. **`object-center` cropped the right-third subject out of frame on narrow/tall mobile viewports** — all 3 hero photos are composed with the subject in the right third and empty space on the left; on a mobile viewport (narrow + short) `object-cover` with `object-center` crops mostly from the sides, and centered cropping trimmed straight through the subject rather than framing them. Fix: each slide now carries its own `focalPoint` (`hero1: "70% 38%"`, `hero2: "68% 30%"`, `hero3: "72% 40%"`) applied via inline `style={{objectPosition: ...}}`, tuned by eye to each photo's actual subject position — not a single shared crop.
- **No horizontal overflow found anywhere on the page** — confirmed via `document.body.scrollWidth` (312px) at a 320px viewport, i.e. content never exceeds the viewport width even at the narrowest tested size.
- **RoutineGraph's count-up numbers showing "0" mid-scroll is not a bug** — `AnimatedNumber` (framer-motion `animate` + `useInView`) takes ~1.1s to count up once a column scrolls into view; a screenshot taken immediately after an instant `scrollTo` can catch it at frame zero. Re-screenshotting after a ~2s wait always showed the correct final value. Don't mistake this for a broken counter if re-testing.

**CTA consistency (`Start Free Assessment` button) — Task 3 audit:**
- Fixed: How It Works' merged CTA used hardcoded inline hex (`background: "#C08A4B"`, hover via `onMouseEnter`/`onMouseLeave` JS to `#B2773E`) — leftover from the original NotSureCTA code, never unified when merged. Replaced with `bg-accent hover:bg-accent/90` (the same Tailwind token every other gold CTA on the page uses), inline JS handlers removed.
- **Not changed, flagged only** (would require redesigning a section, out of scope for this pass): Treatment Programs' per-card CTA is `bg-teal-600` instead of gold/accent — this is a pre-existing, explicitly documented intentional exception (see Design System §8 "Teal exception" in CLAUDE.md), not a bug. CTA padding/size/icon-presence also genuinely varies by context (`px-6 py-3 text-sm` in RoutineGraph's compact dark strip vs `px-8/10 py-4 text-base` everywhere else, ArrowRight icon present in Why Better/RoutineGraph but not Hero/Program Showcase/How It Works) — contextually reasonable given each placement, not touched.

**Performance (Task 4):**
- Added `loading="lazy"` to the plain `<img>` tags in `home/program-showcase.tsx`, `home/treatment-programs.tsx`, `home/meet-our-experts.tsx`, `landing/wellness-knowledge.tsx`, and `landing/how-it-works.tsx` (step illustrations). Low-risk, additive, no visual change.
- **Not changed, flagged only**: most non-Hero images across the homepage still use plain `<img>` instead of `next/image`, so they don't get automatic responsive `srcset`/optimization/blur-placeholder the way Hero does. Converting them would be a larger, separate refactor (touches markup structure, aspect-ratio handling) — out of scope for this QA pass, worth a dedicated task if performance work continues.
- Font loading (DM Serif Display + Manrope via `next/font/google`) already has Next's automatic font-metric-override CLS mitigation built in — nothing to change there.
- Hero's `unoptimized` prop removal (this session, see Completed Tasks) is the main outstanding Next.js image-optimization item and is now done.

**Known dev-only artifact, not a bug:** Clerk's "Configure your application" banner (shown because temporary/keyless API keys are active) floats bottom-right and overlapped hero content in several mobile screenshots during this QA pass. It will not appear once real Clerk production keys are configured — do not attempt to "fix" it in component code.

---

# FULL PRODUCT AUDIT (2026-07-29)

Requested explicitly to correct the assumption that SimplyMen is "just a homepage project" — it's a full-stack telehealth platform, and this audit reviewed the real backend/auth/dashboards/checkout/emails/legal/SEO/security surface by reading actual source files (not by trusting prior doc claims). Full detail lives in CLAUDE.md §18 and the new root-level `PROJECT_STATUS.md`/`LAUNCH_CHECKLIST.md` — this is the condensed version for quick scanning.

**Architecture:** almost no REST API layer — only `api/health` (real) and `api/webhooks/clerk` (real, svix-verified). Everything else runs through 3 server-action files (`actions/admin.ts`, `assessments.ts`, `orders.ts`), all genuinely hitting Supabase, no mocked logic in any of them.

**What's real and solid:** Clerk auth + middleware route protection, Supabase REST layer, assessment scoring (real hand-authored logic, 5 conditions × 12 questions, "inspired by" not literally IIEF-5/PEDT), results→kit recommendation, orders page, admin dashboard's stats/orders/tracking (all real Supabase writes).

**What's simulated or stubbed (the important gaps):**
- **Payments are 100% simulated** — `checkout/page.tsx` creates a real DB order then fakes the payment with a 1.5s `setTimeout`, zero Razorpay SDK/dependency. Two bugs found alongside this: if order-creation fails, checkout still shows success (error only `console.warn`'d); the success screen's order ID is fabricated, unrelated to the real DB order id.
- **Doctor dashboard is mostly a stub** — order list is real, but "call status"/notes are `localStorage`-only (never touch Supabase, not shared across devices), and there is no prescription-writing or approval-workflow feature at all despite "Doctor review" being a core business-model step (§1 of CLAUDE.md).
- **Admin dashboard has no user/doctor/product management UI** — role promotion requires editing the DB or a hardcoded `ADMIN_EMAILS`/`DOCTOR_EMAILS` array in `actions/admin.ts` (`DOCTOR_EMAILS` is currently empty — nobody has ever been added).
- **Cart UI doesn't expose remove/quantity controls** even though the Zustand store supports them; discount-code input is a non-functional placeholder (no `onClick`); cart isn't persisted across refresh.
- **Zero email-sending code anywhere** — no `resend`/`nodemailer`/`sendgrid` dependency, no SMTP, nothing. Checkout's "we'll send a confirmation email" line is UI copy only.
- **All legal pages missing** (`/privacy`, `/terms`, `/refund-policy`, `/shipping-policy`, `/medical-disclaimer`, `/help`, `/contact`, `/about`) and all 5 program-detail pages (`/programs/*`) — all footer/homepage-linked, all 404.
- **No sitemap.ts/robots.ts anywhere**, no analytics, no security headers in `next.config.ts` (only `images.remotePatterns` is set).
- **Accessibility is sparse** — only 16 aria/alt/role occurrences across 10 of 31 `.tsx` files; `checkout`/`cart`/`orders`/`admin`/`doctor`/`results` have zero aria attributes.
- **Role-gating for `/admin` and `/doctor` happens only inside server actions, not middleware** — middleware only checks "signed in at all," so any authenticated user's browser mounts the admin/doctor page shell before the server action rejects their data fetch. No data leak (reject happens before any Supabase read), but worth closing before launch.
- **Footer phone is still a placeholder** (`+91 XXXXX XXXXX`) while Navbar shows a different, fully-formatted number (`+91 800 123 4567`) — unclear which (if either) is real, flagged in an earlier QA pass too, still unresolved.

**Estimated completion (see PROJECT_STATUS.md for full table):** Homepage ~90%, Auth ~90%, Backend/DB layer ~75%, Admin Dashboard ~75%, Checkout ~40%, Doctor Dashboard ~45%, Emails 0%, Legal/Policies 0%, SEO ~35%, Accessibility ~30%, Security ~45%, Deployment ~10%. **Overall project (production-launch readiness): ~55%.**

**New root-level files created this session:** `PROJECT_STATUS.md` (master project dashboard — read this first in any new session) and `LAUNCH_CHECKLIST.md` (production launch checklist with ☐/◐/☑ status per item, grounded in this audit).

---

# PENDING TASKS

1. ~~Remove `unoptimized` prop from Hero's `<Image>` once hero banner images are finalized~~ **Done 2026-07-29** — new final hero photography in place, `unoptimized` removed, Next.js image optimization re-enabled.
2. IMA Banner (`landing/ima-banner.tsx`) was never actually redesigned — still the original scrolling marquee trust banner from before this redesign phase. A restyle pass was started early in this session but interrupted and never completed.
3. Testimonials, Wellness Knowledge, FAQ, Navbar — none of these were touched during this redesign phase. Still original pre-V2 design.
4. Confirm doctor photo mapping: `public/docs/vk aggarwal.jpeg` was assumed to be "Prof. Dr. Vishnu Agrawal" by elimination (filename doesn't match the name spelling) — verify this is the correct person.
5. Real phone number needed for footer — currently placeholder `+91 XXXXX XXXXX` in `layout/footer.tsx`.
6. Placeholder routes don't exist as real pages yet: `/programs/{slug}` (5 program detail pages), `/help`, `/contact`, `/privacy`, `/terms`, `/refund-policy`, `/shipping-policy`, `/medical-disclaimer`, `/about`. Footer and Treatment Programs / Program Showcase link to these.
7. "Homepage V2 PDF" originally specified an "Our Kits" section positioned differently and a distinct product-carousel concept (individual SKUs) that was explicitly descoped early in this project (kits-only business model — see Important Decisions). Confirm no further V2 sections remain unbuilt beyond what's listed above.
8. `public/choose your treatment pics/` folder name has spaces — works fine in code but flagged as a candidate for a kebab-case rename if desired (not done, would need confirmation since it's a rename outside component scope).
9. Consider renaming `Why Better` and `Why Choose Simply Men` sections or merging them — they cover overlapping "why choose us" ground and currently sit back-to-back on the homepage (flagged during build, never resolved).
10. Convert remaining plain `<img>` tags (Program Showcase, Treatment Programs, Meet Our Experts, Wellness Knowledge, How It Works step icons, Footer/Navbar logo) to `next/image` for automatic optimization/`srcset` — flagged during the 2026-07-29 QA pass, `loading="lazy"` added as an interim fix but full `next/image` migration not done (larger refactor, needs its own pass).
11. Decide whether Treatment Programs' teal CTA (`bg-teal-600`) should be unified to the gold/accent CTA used everywhere else on the homepage, or stays as the documented intentional exception — flagged during the 2026-07-29 CTA-consistency audit, not changed.

**Launch-critical (from the 2026-07-29 full-product audit — see LAUNCH_CHECKLIST.md for the organized version):**
12. Integrate real Razorpay payments — checkout currently fakes payment success via `setTimeout`, no SDK installed. Also fix: the "success even if order-creation failed" bug and the fabricated (non-DB) order ID shown on the success screen (`checkout/page.tsx`).
13. Build a real doctor workflow — call-status/notes currently live in `localStorage` only (`doctor/page.tsx`), not Supabase; no prescription or approval-workflow feature exists at all despite being a core business-model step.
14. Wire up transactional emails — zero email-sending code exists anywhere (no SDK, no SMTP). Needed at minimum: order confirmation, doctor-approval notice, shipping update.
15. Wire cart's remove/quantity controls to the UI (store already supports it) and either implement or remove the non-functional discount-code input.
16. Add a real role-check at the `/admin` and `/doctor` route/page level, not just inside server actions — currently any signed-in user's browser mounts the page shell before the server action rejects them.
17. Add `sitemap.ts`/`robots.ts`, basic security headers (`next.config.ts` currently only sets `images.remotePatterns`), and close the biggest accessibility gaps (checkout/cart/orders/admin/doctor/results currently have zero aria attributes).

---

# DESIGN SYSTEM

### Colors (CSS variables in `src/app/globals.css`, `:root`)

| Token | Hex | Usage |
|---|---|---|
| `--primary` | `#3B4856` | Steel blue-grey — buttons, links |
| `--primary-dark` | `#1C2530` | Deep midnight — hero bg (old), headings, footer bg (old dark version) |
| `--secondary` | `#3E5577` | Slate blue (not in Design System PDF token list, kept as-is) |
| `--accent` | `#C4915A` | Warm amber/toffee — CTAs |
| `--accent-muted` | `#D9BFA0` | (not in Design System PDF token list, kept as-is) |
| `--gold` | `#B8934A` | Rich dark gold — stats, gradients |
| `--background` | `#FAFAF7` | Off-white warm |
| `--surface` | `#F2F0EB` | Card/surface |
| `--foreground` | `#1C2024` | Body text |
| `--muted` | `#6E7781` | Secondary text |
| `--success` | `#2D8A4E` | Positive states |
| `--warning` | `#D4A017` | Alerts |
| `--danger` | `#C0392B` | Destructive actions (maps to Design System's "Error") |
| `--border` | `#D8D5CE` | (not in Design System PDF token list, kept as-is) |

**Teal exception:** Several new sections (Treatment Programs badges/CTA, Meet Our Experts role badge, condition-icon backgrounds, Footer link hovers) use Tailwind's built-in `teal-*` palette (`bg-teal-50`, `text-teal-600`, etc.) directly. **No `--teal` CSS variable exists.** This was an explicit per-component styling instruction, not a Design System token — do not assume a teal token exists elsewhere.

**Literal hex used outside tokens (explicit per-instruction, not tokens):**
- Footer background: `#F7F3EE` (warm off-white, from PDF reference)
- Footer muted text: `#667085`
- Footer divider: `#E4DDD2`
- Not Sure CTA section: `#FFF8F0` base, decorative accents `#E8C38B` / `#F2D7AF` / `#F7E7C9` / `#D6A35D` / `#C08A4B` / `#B2773E`, heading `#1B1F23`, subheading `#667085`

### Fonts

- Headings: **DM Serif Display** (`--font-display`, weight 400 only)
- Body: **Manrope** (`--font-body`) — migrated from DM Sans, July 2026, centralized in `layout.tsx` + `globals.css`

### Buttons

- Primary CTA: filled `bg-accent` (gold) or gradient `linear-gradient(135deg, var(--gold), var(--accent))`, `rounded-full`, white/dark text depending on section
- Teal CTA variant (Treatment Programs cards only): `bg-teal-600`, `rounded-full`, white text, `hover:bg-teal-700`
- Standard sizing: `px-6 py-3` to `px-10 py-4` depending on prominence, `text-sm` to `text-base`

### Cards

- Standard radius: `rounded-3xl` (24px) — used across Conditions, Treatment Programs, How It Works, Meet Our Experts, Why Choose Simply Men
- Standard shadow recipe (reused everywhere for consistency): `shadow-[0_2px_12px_rgba(28,32,36,0.05)] hover:shadow-[0_20px_40px_rgba(28,32,36,0.12)]`
- Standard hover lift: `hover:-translate-y-1.5` (6px)

### Spacing

- Section vertical padding: `py-24 lg:py-36` (most sections) or `py-24 lg:py-32` (some)
- Section header to content: `mb-16` to `mb-20`
- Footer: `pt-24 pb-16`, column gap `gap-x-24`, link spacing `space-y-[18px]`

### Grid / Responsive behavior

- Most 5-item grids: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-5`
- Most 4-item grids: `grid-cols-1 sm:grid-cols-2 lg:grid-cols-4`
- Alternating image/text rows (Program Showcase): `grid lg:grid-cols-2`, flips via `lg:grid-flow-dense` + `lg:col-start-2`

### Animations

- Standard entrance: `framer-motion` `initial={{opacity:0, y:20}} whileInView={{opacity:1, y:0}} viewport={{once:true}}`
- Card stagger: `transition={{delay: index * 0.08 to 0.1}}`
- Progress rings (Routine Graph): SVG `strokeDasharray`/`strokeDashoffset` animated via framer-motion, ~1s `easeOut`
- Hero carousel: fade only, 700ms transition, 5000ms autoplay, pauses on hover

### Icons

- Primary icon library: `lucide-react` (^1.7.0) — **NOTE: this build lacks brand/social icons** (`Instagram`, `Linkedin`, `Twitter` all failed at build time)
- Brand/social icons: `react-icons/fa6` (`FaInstagram`, `FaXTwitter`, `FaLinkedin`)

---

# BRAND GUIDELINES

- **Logo:** `public/images/logo.png` — used in Navbar (natural colors, light bg) and Footer (no longer inverted — footer bg is now light `#F7F3EE`, not dark)
- **Tone:** Clinical but warm, premium, discreet, doctor-led authority. Not "bro" fitness/pharma marketing.
- **CTA wording:** Standardized to "Start Free Assessment" / "Start Assessment" across the homepage (some sections use "Shop Now" / "Take Assessment" contextually — check specific section before assuming uniform copy)
- **Product naming:** Actively migrating away from the word "Kit"/"Kits" toward "Treatment Program"/"Treatment Programs" in newer sections (Treatment Programs section, Program Showcase, Routine Graph, Footer column heading). Older/untouched sections (Navbar, original page copy) may still say "Kits" — not yet fully migrated site-wide.
- **Medical compliance:** Footer previously carried a Medical Disclaimer paragraph ("This platform provides general health information and is not a substitute for professional medical advice...") — this was **removed** from the footer in the latest rebuild per PDF reference (see Important Decisions). Confirm with stakeholders whether this disclaimer needs to live somewhere else on the site for compliance reasons.

---

# PROJECT STRUCTURE

```
simplymen/
├── public/
│   ├── images/                      # Legacy kit photos + landing imagery
│   ├── hero/                        # hero1.png, hero2.png, hero3.png — final pre-designed banners
│   ├── icons/                       # ED.svg, PE.svg, lowlibido.svg, hormonalimbalance.png, infertility.png
│   ├── docs/                        # 7 doctor portraits (informal filenames, see Assets section)
│   ├── programs/                    # confidence.svg, performance.svg, hormonal.png, libido.svg
│   ├── choose your treatment pics/  # confidence/performance/libido/testosterone/completemenhealth.svg (folder name has spaces)
│   └── How it works/                # step1.svg – step4.svg
├── ref documents/                   # Design reference PDFs (added this session)
│   ├── Component Library — Design System.pdf
│   └── Homepage V2 - Kits First.pdf
├── src/
│   ├── app/
│   │   ├── layout.tsx               # Root layout — ClerkProvider, font setup (DM Serif Display + Manrope)
│   │   ├── page.tsx                 # Landing page — 16 sections, see Component Status below
│   │   ├── globals.css              # Tailwind v4 @theme tokens
│   │   ├── assessment/, results/, products/, blogs/, cart/, checkout/,
│   │   │   dashboard/, orders/, admin/, doctor/, sign-in/, sign-up/,
│   │   │   actions/, api/           # Backend/app routes — untouched this session
│   ├── components/
│   │   ├── landing/                 # hero, ima-banner, how-it-works (now includes merged
│   │   │                            # not-sure-cta content), conditions, routine-graph,
│   │   │                            # testimonials, wellness-knowledge, faq
│   │   │                            # (why-choose-us.tsx DELETED prior session)
│   │   ├── home/                    # treatment-programs, program-showcase, why-better,
│   │   │                            # meet-our-experts, why-choose-simplymen
│   │   │                            # (not-sure-cta.tsx DELETED 2026-07-29 — merged into
│   │   │                            #  landing/how-it-works.tsx)
│   │   ├── layout/                  # navbar.tsx (untouched), footer.tsx (rebuilt)
│   │   └── ui/                      # empty — shared components TBD
│   ├── lib/, store/, types/         # Data, Zustand stores, TS types — untouched this session
│   └── middleware.ts                # Clerk auth middleware — untouched
├── SESSION_MEMORY.md                # ← This file
└── CLAUDE.md                        # Technical project reference (tech stack, env vars, DB schema, etc.)
```

---

# COMPONENT STATUS

| Component | File | Status |
|---|---|---|
| Navbar | `layout/navbar.tsx` | Not touched this session (original) |
| Hero | `landing/hero.tsx` | Completed — rebuilt as pure image carousel, then rebuilt again 2026-07-29 with new final photography (`hero1-3.png`) + code-driven heading/subtitle/CTA/trust-indicators overlaid on the left negative space (text no longer baked into the image) |
| IMA Banner | `landing/ima-banner.tsx` | Needs Redesign — restyle was started and interrupted, never finished |
| Conditions | `landing/conditions.tsx` | Completed — rebuilt to single 5-card row |
| Not Sure CTA | ~~`home/not-sure-cta.tsx`~~ | **Deleted 2026-07-29** — merged into `landing/how-it-works.tsx` (see Completed Tasks) |
| Treatment Programs | `home/treatment-programs.tsx` | Completed |
| Program Showcase | `home/program-showcase.tsx` | Completed — now doubles as "Program Details" step in the reordered narrative |
| How It Works | `landing/how-it-works.tsx` | Completed — rebuilt to 4-card grid, then merged with Not Sure CTA content 2026-07-29 (see Completed Tasks) |
| Why Better | `home/why-better.tsx` | Completed |
| Routine Graph | `landing/routine-graph.tsx` | Completed — rebuilt to progress-ring cards, then redesigned again 2026-07-29 into one unified dashboard with literal before/after visuals (bottle grid→package, coin stack→smaller coin stack, large clock→small clock) replacing the percentage rings entirely |
| Meet Our Experts | `home/meet-our-experts.tsx` | Completed |
| Why Choose Simply Men | `home/why-choose-simplymen.tsx` | Completed |
| Why Choose Us (old) | `landing/why-choose-us.tsx` | **Deleted** — superseded by Why Better + Why Choose Simply Men |
| Testimonials | `landing/testimonials.tsx` | Not touched this session (original) |
| Wellness Knowledge | `landing/wellness-knowledge.tsx` | Not touched this session (original) |
| FAQ | `landing/faq.tsx` | Not touched this session (original) |
| Footer | `layout/footer.tsx` | Completed — rebuilt twice, final version matches PDF reference |

**Current homepage render order** (`src/app/page.tsx`, reordered 2026-07-29 — narrative/UX pass, not a redesign; no internal section layout changed):
Hero → IMA Banner (Trust) → How It Works (merged, includes former Not Sure CTA content) → Conditions → Treatment Programs → Program Showcase (Program Details) → Why Better → Routine Graph → Meet Our Experts → Testimonials → Why Choose Simply Men → FAQ → Wellness Knowledge → Footer

**Previous order (superseded 2026-07-29):** Hero → IMA Banner → Conditions → Not Sure CTA → Treatment Programs → Program Showcase → How It Works → Why Better → Routine Graph → Meet Our Experts → Why Choose Simply Men → Testimonials → Wellness Knowledge → FAQ → Footer

---

# ASSETS

| Location | Contents | Used In |
|---|---|---|
| `/public/hero/hero1.png`, `hero2.png`, `hero3.png` | Final hero photography, replaced 2026-07-29 — plain editorial photos with clean left negative space, heading/subtitle/CTA now rendered in code (no longer baked into the image) | `landing/hero.tsx` |
| `/public/icons/ED.svg`, `PE.svg`, `lowlibido.svg`, `hormonalimbalance.png`, `infertility.png` | Condition icons (superseded by Lucide icons in current Conditions build, kept on disk) | `landing/conditions.tsx` (historical) |
| `/public/docs/` | 7 doctor portraits: `Dr ashwin yadav.jpeg`, `vk aggarwal.jpeg` (mapped to Prof. Dr. Vishnu Agrawal — unconfirmed), `LK sharma.jpeg`, `deepak dubey.jpeg`, `madhukar gupta.jpeg`, `raghav.jpeg`, `monica saini.jpeg` | `home/meet-our-experts.tsx` |
| `/public/programs/confidence.svg`, `performance.svg`, `hormonal.png`, `libido.svg` | Program Showcase lifestyle images | `home/program-showcase.tsx` |
| `/public/choose your treatment pics/` | `confidence.svg`, `performance.svg`, `libido.svg`, `testosterone.svg`, `completemenhealth.svg` | `home/treatment-programs.tsx` |
| `/public/How it works/step1.svg` – `step4.svg` | Branded step icons | `landing/how-it-works.tsx` |
| `/public/images/logo.png` | Site logo | Navbar, Footer |
| `/public/images/essential_wellness.png`, `confidence_plus.png`, `complete_mens_health.png` | Kit product photos | Products page, results page (backend, untouched) |
| `ref documents/Component Library — Design System.pdf` | Design system source of truth (colors, typography, buttons, cards, icons) | Reference only |
| `ref documents/Homepage V2 - Kits First.pdf` | Homepage layout source of truth | Reference only |

---

# IMPORTANT DECISIONS

- We decided the product model stays **kits-only** (3 kits) — the original Homepage V2 PDF's SKU-carousel sections ("Our Bestsellers" + 4 category product carousels) were explicitly descoped early in this project because they assumed individual standalone products, which don't exist in this codebase.
- Hero is now a **pure image carousel** — no text, CTA, gradient, or overlay is rendered in code. The exported PNG banners already contain heading/description/CTA baked in as part of the image design.
- Footer background uses the PDF's warm beige/off-white (`#F7F3EE`), not the site's dark navy — this was a deliberate pivot away from an earlier dark-navy footer rebuild, per explicit reference-image comparison.
- Footer's Medical Disclaimer paragraph and Trust Bar's "50,000+ men" strip were removed from the footer entirely — not merged elsewhere, just removed, per explicit instruction to match the PDF reference exactly.
- Body font is **Manrope**, not DM Sans — migrated to match the Component Design System PDF's typography spec exactly.
- Teal is used as an intentional **per-component exception** to the token-only color rule (Treatment Programs, Meet Our Experts, condition icons, footer link hovers) — explicitly instructed, not a Design System token, don't try to "fix" this by finding/inventing a teal token.
- `why-choose-us.tsx` was **deleted from disk**, not just removed from `page.tsx` — confirmed no other file referenced it before deletion.
- Git history was **intentionally discarded**: the GitHub repo's original single "Initial commit" (pre-redesign scaffold) was overwritten via force-push, per explicit user decision after being offered the safer alternative (push to a new branch instead). This means the old scaffold's exact original file states are no longer recoverable from this repo — they'd need to come from a local backup if ever needed again.
- Two design-reference PDFs live in `ref documents/` in the repo root, committed as reference material (not app code) — added per explicit request after the initial redesign push.
- `lucide-react` in this project's installed version does **not** ship social/brand icons — confirmed via actual build failures (`Instagram`, `Linkedin`, `Twitter` each failed one at a time as they were tried). `react-icons/fa6` was added specifically to cover this gap. Do not assume future brand-icon needs can use `lucide-react`.
- Assessment-before-checkout flow (backend) was already the existing architecture before this redesign phase — not changed.
- **2026-07-29:** Homepage reordered to a "healthcare decision journey" narrative — process (How It Works) now comes before Conditions/Programs, on the reasoning that "what happens if I click Start Free Assessment" should be answered before "what do you treat" / "what will I receive." Explicit instruction: reorder + one merge only, no redesign of any section's internal layout/visuals.
- **2026-07-29:** `home/not-sure-cta.tsx` merged into `landing/how-it-works.tsx` rather than kept as a separate section — both communicated the same "assessment → doctor review → plan → delivery" message back-to-back, judged as duplicate messaging per explicit instruction. NotSureCTA's icon-circle step row was dropped in favor of How It Works' illustrated step cards (the illustrations were the only "step visual" carried forward); NotSureCTA's decorative background, CTA button styling, and trust-indicator row were kept in the merged section for premium feel + conversion.

---

# BUGS / KNOWN ISSUES

### RESOLVED

- **Bug:** `lucide-react` import `Instagram` failed at build time ("Export Instagram doesn't exist in target module").
  **Fix attempt 1:** Replaced with a hand-drawn inline SVG icon. Worked, but then `Linkedin` import failed the same way.
  **Fix attempt 2:** Replaced `Linkedin` with another hand-drawn inline SVG too. Worked, but then `Twitter` import ALSO failed on a fresh server restart.
  **Final fix:** Installed `react-icons` (`^5.7.0`), replaced all three (`FaInstagram`, `FaXTwitter`, `FaLinkedin` from `react-icons/fa6`), removed both hand-drawn SVG fallbacks. **Status: Resolved.**

- **Bug:** Hero slide 3 (`hero3.png`) kept showing an old cached image after the source file was replaced on disk with the same filename.
  **Expected behaviour:** New file content should render immediately (or after a hard refresh).
  **Investigation:** Confirmed via `curl` that the raw static file route (`/hero/hero3.png`) was serving the correct, current file (200 OK, `Content-Length` matched disk size exactly, `Last-Modified` matched file mtime). Root cause identified as the **Next.js Image Optimization cache** (`.next/cache/images`), which sits between the browser and the raw file when using `next/image` with `fill` — it was serving stale optimized output keyed to the old file.
  **Fix:** Added `unoptimized` prop to the Hero `<Image>` component, deleted `.next`, killed and restarted the dev server (`npx next dev --turbopack`). **Status: Resolved, but `unoptimized` is a temporary bypass — see Pending Tasks item 1.**

### OPEN / UNRESOLVED

- IMA Banner redesign was started (task assigned) but the session was interrupted before any code was written — component is still in its pre-redesign state. Not a bug, but an incomplete task that could be mistaken for "done" since it was assigned early.
- Doctor photo filename `vk aggarwal.jpeg` doesn't match "Prof. Dr. Vishnu Agrawal" by name spelling — mapped by process of elimination (only unmatched file, only unmatched doctor). Unconfirmed with the actual source of truth.
- Several placeholder routes (`/programs/{slug}`, `/help`, `/contact`, `/privacy`, `/terms`, `/refund-policy`, `/shipping-policy`, `/medical-disclaimer`, `/about`) are linked from Footer/Treatment Programs/Program Showcase but do not exist as real pages — all will 404 if clicked.
- Footer phone number is a placeholder (`+91 XXXXX XXXXX`) — not a real number.

---

# GIT HISTORY

**Remote:** `https://github.com/aryanadlakha002-ai/SimplyMen` (branch: `main`)

**Commit log (most recent first):**
1. `8156207` — "Add design reference PDFs" (added `ref documents/` folder with both PDFs)
2. `a43c5c6` — "Homepage V2 redesign: full landing page rebuild" (121 files — the entire redesigned codebase, force-pushed, replacing the repo's original single "Initial commit" `833f149` which contained the pre-redesign scaffold)

**Uncommitted changes as of this update:** None — working tree clean.

**Note on auth:** Pushing required `gh auth login` (device-code flow) to be run interactively by the user first — this repo was not previously authenticated in this environment.

---

# DEPENDENCIES

| Library | Version | Purpose | Added When |
|---|---|---|---|
| `react-icons` | `^5.7.0` | Brand/social icons (Instagram, X/Twitter, LinkedIn) — `lucide-react` in this project lacks these | This session, footer rebuild |

All other dependencies (Next.js, React, Clerk, Supabase, Zustand, Framer Motion, Lucide React, svix, Tailwind CSS v4) were already present before this session — see `CLAUDE.md` §1 Tech Stack for the full list with versions.

---

# ENVIRONMENT

| Requirement | Version |
|---|---|
| Node.js | v25.2.1 (installed on this machine; `CLAUDE.md` notes 20+ is the general minimum) |
| Next.js | 16.2.2 (Turbopack) |
| React | 19.2.4 |
| Tailwind CSS | v4 (`@theme inline` syntax) |
| TypeScript | ^5 |

**Run commands:**
```bash
npm install
npx next dev --turbopack     # fast dev server (recommended)
# or
npm run dev                  # standard dev server
```

Full setup instructions (env vars, Clerk/Supabase dashboard links, deployment) are in `CLAUDE.md` §3–5, §12–14 — not duplicated here to avoid drift between the two files. **`CLAUDE.md` is the technical reference; this file is the chronological progress/decision log.**

---

## Continue From Here

- **Everything from the 2026-07-29 milestone (reorder, How It Works/Not Sure CTA merge, Hero rebuild, Routine Graph redesign, responsive/CTA/performance/scroll-UX QA passes, wheel-scroll fix, full-product audit, doc sync) is done and real-browser-verified, but still uncommitted** — review, then commit + push. See QA PASS FINDINGS and FULL PRODUCT AUDIT above for exactly what was checked and fixed.
- **Do one manual click-test on Meet Our Experts' left/right arrow buttons** — the wheel-scroll fix itself is solid and verified, but automated verification of the pre-existing arrow-click smooth-scroll was inconclusive in this session's browser-automation environment (unrelated to the fix; the `scroll()`/onClick code was not touched). Just needs a human or a cleaner automation pass to confirm arrows still smoothly scroll the carousel.
- IMA Banner (`landing/ima-banner.tsx`) is still the most obviously incomplete piece — assigned for redesign in an earlier session but never rebuilt. Now sits as section #2 (Trust) in the new order, directly before How It Works.
- Testimonials, Wellness Knowledge, and FAQ sections have not been touched at all — confirm with the project owner whether these are in scope for the V2 redesign or intentionally left as-is. Their homepage position also changed in the 2026-07-29 reorder (see Component Status). They did pass the 2026-07-29 responsive audit with no issues found.
- Confirm the doctor photo mapping for `public/docs/vk aggarwal.jpeg` → "Prof. Dr. Vishnu Agrawal" is correct (flagged as an assumption, never verified).
- Build out the placeholder pages that are already linked from the homepage: 5 program detail pages (`/programs/{slug}`), and the legal/support pages (`/privacy`, `/terms`, `/refund-policy`, `/shipping-policy`, `/medical-disclaimer`, `/help`, `/contact`, `/about`). All currently 404.
- Get the real business phone number to replace the `+91 XXXXX XXXXX` placeholder in the footer — note Navbar (`layout/navbar.tsx`) already displays a fully-formatted number (`+91 800 123 4567` / `tel:+918001234567`) in its top bar, header, and mobile menu; confirm whether that number is real and, if so, reuse it in the footer instead of sourcing a new one.
- Decide whether the Medical Disclaimer text (removed from the footer in this redesign) needs to live somewhere else on the site for compliance reasons — it was cut, not relocated.
- "Why Better" and "Why Choose Simply Men" sections are still back-to-back in the new order too (just later in the sequence) — the overlap flagged earlier in the project is unresolved, unaffected by this reorder.
- Consider a `next/image` migration for the remaining plain `<img>` tags (see Pending Tasks #10) — `loading="lazy"` was added as a stopgap during the 2026-07-29 QA pass, full migration is a separate task.
- Decide on the Treatment Programs teal-CTA vs. gold-CTA question (see Pending Tasks #11) — flagged, not resolved.
- Several undocumented, unreferenced files exist under `public/` (`Image (7/8/12/13/14).jpeg`, `prompt1_image.png`–`prompt4.jpeg`, `images/condition-ed.jpg` / `condition-pe.jpg`, a duplicate `images/hero/hero1-3.png` alongside the real `hero/hero1-3.png`, and default create-next-app scaffold SVGs `file.svg`/`globe.svg`/`next.svg`/`vercel.svg`/`window.svg`) — confirmed via grep to have zero references in `src`. Candidates for cleanup, not yet removed.
- Once ready, this file (`SESSION_MEMORY.md`) should be updated and pushed alongside every future meaningful change — see Update Rules below.

---

## UPDATE RULES (for future sessions/agents editing this file)

After every significant task:
- Rewrite ONLY the affected sections above — do not regenerate the whole file from scratch.
- Update the "Last Updated" / "Current Branch" / "Last Commit" fields at the top.
- Append newly completed work to Completed Tasks (never delete existing entries).
- Append new decisions to Important Decisions (never delete existing entries — if a decision is reversed, add a new bullet marking the old one deprecated and explain the new one below it).
- Append new bugs to Bugs / Known Issues, and move resolved ones under "RESOLVED" with the fix documented (never delete the record that the bug existed).
- Update Git History with new commits (keep the full log, don't truncate).
- Update Current Task and Pending Tasks to reflect what's actually next.
- Regenerate the "Continue From Here" list at the bottom to reflect the new true next-steps.
- Never summarize away detail, never delete history, never replace prior content with "...", never omit a file path. This file may be the only documentation that survives a session/laptop switch — treat it as mission-critical.
