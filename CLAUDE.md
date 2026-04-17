@AGENTS.md

# PulseTix — Rebuild Project

## What This Is
NYC nightlife ticketing platform. Rebuilding from a Replit prototype into a proper Next.js + Supabase app.
Live at: https://flite-events.vercel.app

## Tech Stack
- Next.js 16.2.2 (App Router, Turbopack), TypeScript
- Supabase (PostgreSQL, Auth, RLS, Storage)
- Stripe Checkout + webhooks
- Tailwind CSS v4 (`@theme inline` in globals.css, NO tailwind.config.ts)
- Framer Motion, Lenis smooth scrolling
- Fonts: **Bricolage Grotesque** (display) + **Albert Sans** (body) via `next/font/google`
- Single accent color: `#FF4D4D` (electric coral)

## Design Context
See `.impeccable.md` for full design context. Key points:
- Brand voice: "raw, nocturnal, electric"
- Dark theme (nightlife product used at night)
- Photography-forward, minimal decoration
- References: Resident Advisor, DICE app, Boiler Room, Supreme

## Installed Skills (in `.claude/skills/`)
18 skills from `pbakaus/impeccable` + Anthropic's `frontend-design`. These are user-invocable slash commands:
- `/impeccable teach` — establish design context (already done, see `.impeccable.md`)
- `/impeccable craft [feature]` — shape-then-build workflow
- `/audit` — score design quality across 5 dimensions
- `/typeset` — audit typography
- `/colorize` — audit color system
- `/critique`, `/polish`, `/layout`, `/animate`, `/bolder`, `/quieter`, `/delight`, `/distill`, `/optimize`, `/overdrive`, `/adapt`, `/shape`, `/clarify`

**IMPORTANT**: The user explicitly wants these skills used. Run `/audit` first thing to score the current state, then use the results to guide improvements.

## Current State (as of session end)

### Completed
- **Phase 1 (Foundation)**: Root layout, navbar, footer, landing page (hero, features, events, CTA), auth (login/register), middleware
- **Phase 2 (Events + Admin)**: Events browse, event detail, admin dashboard, create event, edit event, door sales, promoter dashboard, promoter signup, my-tickets, profile, scanner — ALL wired to Supabase with sample data fallback
- **Phase 3 (Tickets + Payments)**: `TicketTier` type, `/api/tiers` CRUD, tier display on event detail, tier selector in checkout, tier builder in admin create-event. Stripe checkout creates session with tier pricing. Stripe webhook creates ticket + QR code + sends email via Resend. Referral code captured in middleware, commission calculated in webhook.
- **Phase 4 (Guest List)**: `GuestListEntry` type, `/api/guest-list` CRUD, admin guest list management page, scanner has QR + Guest List tabs
- **Phase 5 (Door Operations)**: Camera-based QR scanner using html5-qrcode (real device camera). Door sales sends email with QR code via `/api/door-sales-email`.
- **Phase 6 (Extras)**: AI chatbot wired to Claude API (`claude-sonnet-4-5`). Contact form page at `/contact`. My Tickets shows real QR codes (generated client-side via qrcode lib) with download button.
- **Design overhaul**: Killed AI slop (gradients, glassmorphism, particles), warm-tinted neutrals, distinctive fonts
- **Audit fixes**: WCAG AA contrast (text-dim #9A9692), htmlFor/id on all forms, aria-labels on all icon buttons, focus-visible indicators, glass-strong removed, film grain z-index fixed, tap targets 44px, animate-bounce killed

### Uncommitted Changes
Many files modified/added/deleted. Changes span all phases above.

### Remaining Polish
- Image upload requires `event-images` Supabase Storage bucket to be created
- Loading skeletons could be added to more pages (promoter dashboard, my-tickets)
- `decrement_tickets_left` RPC function needs to be added to migrations for atomic door sales
- Promoter payout/Stripe Connect onboarding flow (currently just status management) (currently placeholder)

## Key Files
| File | Purpose |
|------|---------|
| `src/app/layout.tsx` | Root layout — Bricolage Grotesque + Albert Sans fonts |
| `src/app/globals.css` | Tailwind v4 `@theme inline`, color system, animations |
| `src/lib/types.ts` | All TypeScript interfaces (Event, Ticket, TicketTier, GuestListEntry, Promoter) |
| `src/lib/supabase.ts` | Browser Supabase client |
| `src/lib/supabase-server.ts` | Server Supabase client (cookies-based) |
| `src/lib/supabase-admin.ts` | Admin client (service role, bypasses RLS) |
| `src/lib/sample-events.ts` | Fallback data when Supabase not configured |
| `.impeccable.md` | Design context for impeccable skill |

## Rules
- Don't ask "want me to continue?" — just keep working
- Use the installed skills (`/audit`, `/impeccable craft`, etc.)
- Dark theme only. Single accent color (#FF4D4D). No gradients on text.
- Fonts: Bricolage Grotesque (display) + Albert Sans (body) — do NOT change these
- `@theme inline` in globals.css — no tailwind.config.ts file
- Supabase data with sample data fallback for all pages
