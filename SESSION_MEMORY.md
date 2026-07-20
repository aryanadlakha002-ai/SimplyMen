# SimplyMen Project Memory

Last Updated: 2026-07-21
Current Branch: main
Last Commit: 8156207 — "Add design reference PDFs"
Current Phase: Homepage V2 UI Redesign (in progress — most sections done, some original sections still untouched)

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

**Current status:** Backend (assessment, results, cart, checkout, Clerk auth, Supabase, admin/doctor dashboards) was already complete before this redesign phase. This phase is a **UI-only** homepage redesign against a "Homepage V2 — Kits First" reference PDF + a Component Design System PDF. No business logic, routing, auth, or DB code was touched.

---

# CURRENT PRIORITY

Building Homepage (V2 redesign)

---

# CURRENT TASK

• Session paused after pushing all redesigned code + design reference PDFs to GitHub. No section is actively mid-edit right now — next task is open (see "Continue From Here" at bottom).

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

---

# PENDING TASKS

1. Remove `unoptimized` prop from Hero's `<Image>` once hero banner images are finalized (re-enables Next.js image optimization for production)
2. IMA Banner (`landing/ima-banner.tsx`) was never actually redesigned — still the original scrolling marquee trust banner from before this redesign phase. A restyle pass was started early in this session but interrupted and never completed.
3. Testimonials, Wellness Knowledge, FAQ, Navbar — none of these were touched during this redesign phase. Still original pre-V2 design.
4. Confirm doctor photo mapping: `public/docs/vk aggarwal.jpeg` was assumed to be "Prof. Dr. Vishnu Agrawal" by elimination (filename doesn't match the name spelling) — verify this is the correct person.
5. Real phone number needed for footer — currently placeholder `+91 XXXXX XXXXX` in `layout/footer.tsx`.
6. Placeholder routes don't exist as real pages yet: `/programs/{slug}` (5 program detail pages), `/help`, `/contact`, `/privacy`, `/terms`, `/refund-policy`, `/shipping-policy`, `/medical-disclaimer`, `/about`. Footer and Treatment Programs / Program Showcase link to these.
7. "Homepage V2 PDF" originally specified an "Our Kits" section positioned differently and a distinct product-carousel concept (individual SKUs) that was explicitly descoped early in this project (kits-only business model — see Important Decisions). Confirm no further V2 sections remain unbuilt beyond what's listed above.
8. `public/choose your treatment pics/` folder name has spaces — works fine in code but flagged as a candidate for a kebab-case rename if desired (not done, would need confirmation since it's a rename outside component scope).
9. Consider renaming `Why Better` and `Why Choose Simply Men` sections or merging them — they cover overlapping "why choose us" ground and currently sit back-to-back on the homepage (flagged during build, never resolved).

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
│   │   ├── landing/                 # hero, ima-banner, how-it-works, conditions,
│   │   │                            # routine-graph, testimonials, wellness-knowledge, faq
│   │   │                            # (why-choose-us.tsx DELETED this session)
│   │   ├── home/                    # NEW this session: not-sure-cta, treatment-programs,
│   │   │                            # program-showcase, why-better, meet-our-experts,
│   │   │                            # why-choose-simplymen
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
| Hero | `landing/hero.tsx` | Completed — rebuilt as pure image carousel |
| IMA Banner | `landing/ima-banner.tsx` | Needs Redesign — restyle was started and interrupted, never finished |
| Conditions | `landing/conditions.tsx` | Completed — rebuilt to single 5-card row |
| Not Sure CTA | `home/not-sure-cta.tsx` | Completed |
| Treatment Programs | `home/treatment-programs.tsx` | Completed |
| Program Showcase | `home/program-showcase.tsx` | Completed |
| How It Works | `landing/how-it-works.tsx` | Completed — rebuilt to 4-card grid |
| Why Better | `home/why-better.tsx` | Completed |
| Routine Graph | `landing/routine-graph.tsx` | Completed — rebuilt to progress-ring cards |
| Meet Our Experts | `home/meet-our-experts.tsx` | Completed |
| Why Choose Simply Men | `home/why-choose-simplymen.tsx` | Completed |
| Why Choose Us (old) | `landing/why-choose-us.tsx` | **Deleted** — superseded by Why Better + Why Choose Simply Men |
| Testimonials | `landing/testimonials.tsx` | Not touched this session (original) |
| Wellness Knowledge | `landing/wellness-knowledge.tsx` | Not touched this session (original) |
| FAQ | `landing/faq.tsx` | Not touched this session (original) |
| Footer | `layout/footer.tsx` | Completed — rebuilt twice, final version matches PDF reference |

**Current homepage render order** (`src/app/page.tsx`):
Hero → IMA Banner → Conditions → Not Sure CTA → Treatment Programs → Program Showcase → How It Works → Why Better → Routine Graph → Meet Our Experts → Why Choose Simply Men → Testimonials → Wellness Knowledge → FAQ → Footer

---

# ASSETS

| Location | Contents | Used In |
|---|---|---|
| `/public/hero/hero1.png`, `hero2.png`, `hero3.png` | Final pre-designed hero banners (heading/CTA baked into image) | `landing/hero.tsx` |
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

- IMA Banner (`landing/ima-banner.tsx`) is the most obviously incomplete piece — it was assigned for redesign early in the previous session but never actually rebuilt. Start here if continuing the visual redesign.
- Testimonials, Wellness Knowledge, and FAQ sections have not been touched at all — confirm with the project owner whether these are in scope for the V2 redesign or intentionally left as-is.
- Before going to production, remove the `unoptimized` prop from Hero's `<Image>` component (`src/components/landing/hero.tsx`) now that the image-optimizer caching bug has been diagnosed and the root cause understood — re-enable Next.js image optimization.
- Confirm the doctor photo mapping for `public/docs/vk aggarwal.jpeg` → "Prof. Dr. Vishnu Agrawal" is correct (flagged as an assumption, never verified).
- Build out the placeholder pages that are already linked from the homepage: 5 program detail pages (`/programs/{slug}`), and the legal/support pages (`/privacy`, `/terms`, `/refund-policy`, `/shipping-policy`, `/medical-disclaimer`, `/help`, `/contact`, `/about`). All currently 404.
- Get the real business phone number to replace the `+91 XXXXX XXXXX` placeholder in the footer.
- Decide whether the Medical Disclaimer text (removed from the footer in this redesign) needs to live somewhere else on the site for compliance reasons — it was cut, not relocated.
- Consider whether "Why Better" and "Why Choose Simply Men" sections (currently back-to-back on the homepage) should be merged or reordered — they cover overlapping ground and this was flagged but never resolved during the build.
- Run a full type-check (`npx tsc --noEmit`) and a real browser pass across desktop/tablet/mobile — most of this session's verification was code-level only (no `node_modules`/dev server was available in the first working copy used for early sections; later sections were verified against a running dev server, but a full end-to-end pass hasn't been done).
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
