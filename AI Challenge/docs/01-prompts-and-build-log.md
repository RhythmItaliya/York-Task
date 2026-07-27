---
Document ID: DOC-01
Title: Prompts & Build Log
Version: 1.0
Status: Approved
Owner: AI Challenge Engineering
Last Updated: 2026-07-27
---

# 1. Purpose

This document is the authoritative, chronological build record for the AI Challenge application. It exists to satisfy two requirements:

1. **Traceability** — every material change to the codebase is recorded as a numbered phase, in the order it occurred.
2. **Reusability** — each phase is documented as a standalone, self-contained prompt that can be issued to an AI coding agent to reproduce that portion of the system independently of this project's history.

# 2. Format

Each phase below records:
- **Prompt** — the instruction, written to be self-contained (explicit colors, spacing, icon choices, and behavior are stated directly rather than referencing external material).
- **Execution Record** — what the agent did in response, for audit purposes.

# 3. Build Phases

---

### Phase 1 — Scaffold a Vite + React + TypeScript app with a Login and Register page

**Prompt:**
> Create a new Vite + React + TypeScript app using the official `create-vite` CLI. Build a Login page and a separate Register page as a client-side single-page app (no backend yet). Use a centered white card (rounded-2xl, subtle border, shadow) on a light slate background, with a small circular mint-green (#5ee6a0) logo badge and a dark ink (#0f172a) icon at the top, above the app name in bold. Login needs email + password fields; Register needs full name, email, password, and confirm-password, with a "passwords must match" validation rule. Both need a mint-green (#5ee6a0) primary submit button with dark ink (#0f172a) text, a loading state while submitting, and a link at the bottom to switch between the two pages. Use `react-router-dom` for navigation, `react-hook-form` + `zod` for form state and validation, and Tailwind CSS for styling.

**Execution Record:**
- Ran `npm create vite@latest . -- --template react-ts`.
- Installed `react-router-dom`, `react-hook-form`, `zod`, `@hookform/resolvers`, `lucide-react`, `clsx`, `tailwindcss`, `@tailwindcss/vite`.
- Built `Login.tsx` and `Register.tsx` as separate pages sharing an `AuthLayout` component (the card + logo badge + title/subtitle chrome).
- Verified with `npm run build` and `npm run dev`.

### Phase 2 — Add a docs folder

**Prompt:**
> Create a `docs/` folder in this project with numbered markdown files documenting the plan, the tech stack/skills used, and the coding rules to follow.

**Execution Record:**
- Created an initial `docs/00-overview.md`, `01-plan.md`, `02-skills-and-stack.md`, `03-rules.md`.
- (This folder was later deleted and replaced by the current build-log-style documentation, in Phase 11.)

### Phase 3 — Add a working demo login using local mock authentication

**Prompt:**
> There's no backend yet, so make the Login and Register forms actually work end-to-end using a local mock authentication system. Register should save a new user (name, email, password) somewhere in the browser and log them in; if the email is already registered, show a clear error instead of a generic one. Login should check the entered email/password against saved users and show "Invalid email or password" on a mismatch. Seed one working demo account automatically (`demo@example.com` / `demo1234`) so login works immediately without registering first. After login, redirect to a `/dashboard` page.

**Execution Record:**
- Built `src/lib/mockAuth.ts` — a `localStorage`-backed store (`registerUser`, `loginUser`, `getCurrentUser`, `logoutUser`, `seedDemoAccount`), with an explicit code comment flagging it as demo-only and not secure (plain-text passwords, no server validation).
- Wired `Register.tsx` and `Login.tsx` to use it with real validation errors.
- Added a `Dashboard.tsx` placeholder as the post-login landing page.

### Phase 4 — Pre-fill the demo credentials in the login form

**Prompt (mid-task steering):**
> Make the demo account's email and password show up already filled in on the Login form by default.

**Execution Record:**
- Set `defaultValues` on the Login form's `useForm` call to `demo@example.com` / `demo1234`, in addition to a hint line displayed above the form.

### Phase 5 — Restructure for minimal styling, full reusability, full typing, and proper scripts

**Prompt:**
> Restructure this project properly: use Tailwind as minimally and cleanly as possible (avoid repeating the same long class strings everywhere), make the code reusable (shared input/button components instead of duplicated form markup), write everything in modern, fully-typed TypeScript (no `any`, infer form types from validation schemas), and set up proper npm scripts for formatting, linting, and building. Also remove the visible demo-credentials hint text from the Login page's UI — keep the fields pre-filled, just don't show the text banner about it.

**Execution Record:**
- Added `src/types/auth.ts` (shared `CurrentUser`, `LoginCredentials`, `RegisterInput` types) and `src/lib/validation.ts` (Zod schemas with inferred types, moved out of the page files).
- Extracted `FormField` and `PrimaryButton` components to remove duplicated input/button markup between Login and Register, and a `classNames.ts` file to centralize repeated Tailwind class strings.
- Added Prettier (`.prettierrc`, `.prettierignore`) and `format` / `format:check` npm scripts alongside the existing `lint` script.
- Removed the visible "Demo account: …" hint text from the Login page.
- Verified `npm run build`, `npm run lint`, `npm run format` all pass clean.

*(A mid-phase steering message asked for a sidebar and a dashboard content area, reusing components — this became Phase 6.)*

### Phase 6 — Build an app sidebar and a dashboard shell

**Prompt:**
> Add a sidebar to the dashboard with a blank content area next to it. The sidebar should have: a small rounded logo badge in mint green (#7be9c4) with a dark ink (#16211f) icon and the app name at the top; a vertical nav list with icon + label for each item (use a job/briefcase icon for "Jobs", a document icon for "Resume", a person icon for "Profile", a sparkle icon with an "AI" badge for "AI Agent", a message-bubble icon for "Coaching", and a distinct icon plus a "NEW" badge for "Interview"); the active nav item should have a light mint (#dff5ea) background; below the nav, a "Refer & Earn" promo card with a gift icon, then Messages/Feedback/Settings utility links, then a user chip at the very bottom showing the logged-in user's initial in a mint circle, their name and email, and a logout icon button. On mobile it should collapse into a top bar with a menu button that opens a slide-in drawer; on desktop it's a fixed 240px-wide column. Also build a reusable dashboard layout component that places this sidebar next to a content area, and use it on the dashboard page with the content area left blank for now.

**Execution Record:**
- First pass built a simplified version with generic slate colors; corrected after the user asked for exact color/spacing fidelity rather than an approximation.
- Added the exact color tokens described (`--jobright-mint: #7be9c4`, `--jobright-mint-dark: #4fd39a`, `--jobright-ink: #16211f`, `--sidebar: #ffffff`, `--sidebar-accent: #dff5ea`, `--sidebar-border: #e7ebea`) as CSS variables in `src/index.css`.
- Built `Sidebar.tsx` with the nav list, badges, "Refer & Earn" card, utility links, user chip with logout, mobile top bar + slide-in drawer, and a desktop fixed sidebar.
- Added `DashboardLayout.tsx` (sidebar + content area) and wired `Dashboard.tsx` to use it with a blank content area.

### Phase 7 — Fix a duplicated icon and add a job listing to the dashboard

**Prompt:**
> The Coaching and Interview sidebar items currently use the same icon — give Interview a different, distinct icon (e.g. a microphone). Also, the Jobs content area shouldn't be blank — show a list of sample job postings there instead.

**Execution Record:**
- Changed the Interview nav icon from the duplicated message-bubble icon to a microphone icon.
- Created `src/data/mockJobs.ts` with five sample job postings (company, title, industry, location, salary, match score, etc.) and a `JobCard` component to render each one (company avatar, tags, title, meta row, match score).
- Wired `Dashboard.tsx` to render the job list on the `/dashboard` (Jobs) route.

### Phase 8 — Build out the full Jobs page: tabs, search, match-score cards, and a right-hand panel

**Prompt:**
> The Jobs page needs more than just a card list. Add a top bar with a "JOBS" title, a row of tabs (Recommended, Liked with a count badge, Applied with a count badge, External with a count badge), a search input with a search icon, and a dark pill-shaped "Claim Your 45-min Coaching" button with a sparkle icon. Each job card needs, on the right side, a dark gradient panel with an animated circular progress ring showing the match percentage, a match label underneath (e.g. "GOOD MATCH"), and — below the job details on the left — a row of action buttons: a circular "not interested" button, a circular "save/like" button, an outlined "ASK ORION" button with a sparkle icon, and a solid mint "APPLY WITH AUTOFILL" button. Also add a right-hand sidebar panel next to the job list showing: the logged-in user's name with a "Turbo Plan" badge, a "Your Saved Filters" card with one example saved filter, and an "Up Next" promo card about a coaching event with a dismiss button and a "Save My Spot Now" button. Only build this out for the Jobs page — leave the other sidebar sections (Resume, Profile, AI Agent, Coaching, Interview) blank for now.

**Execution Record:**
- Compared a running screenshot of the app against the intended design and identified what was missing: the tab bar, the right rail, and the simplified job card that lacked the match-score panel and action buttons.
- Rebuilt `JobCard.tsx` with the dark gradient panel, an SVG-based animated match-score ring, and the four action buttons.
- Built `JobsTopBar.tsx` (title, tabs with counts, search input, coaching CTA) and `RightRail.tsx` (user plan chip, Saved Filters card, Up Next card).
- Drafted, then explicitly discarded, static placeholder content for the other sidebar sections, keeping the instruction to leave them blank for now.
- Added a `noPadding` option to `DashboardLayout` so the Jobs page could manage its own top-bar/content/right-rail spacing.

### Phase 9 — Remove an unused reference folder

**Prompt:**
> This is done now — you can delete the other project folder in this workspace that's no longer needed.

**Execution Record:**
- Verified the folder was its own separate git repository synced to a remote before deleting it, so its history remains recoverable elsewhere if ever needed.
- Removed the folder from the workspace.

### Phase 10 — Optimize and deduplicate without removing any functionality

**Prompt:**
> Go through this project and optimize it — make the code more reusable, remove any unnecessary files. You're allowed to delete files, but do not remove any actual functionality or code behavior.

**Execution Record:**
- Found a byte-for-byte duplicated inline logo/icon block used in two places in the sidebar code, and extracted it into a single shared sub-component — a pure deduplication with zero change in what's rendered.
- Removed an installed dependency that was never actually imported anywhere in the codebase.
- Removed an unused static asset file that nothing referenced.
- Replaced the generic scaffolding boilerplate text in `README.md` with real project information.
- Verified `npm run build` / `npm run lint` / `npm run format` all still pass after cleanup, with no change in behavior.

### Phase 11 — Reverse-engineer build documentation

**Prompt:**
> Delete the docs folder and rebuild it as a reverse-engineered record of how this project was actually built — numbered markdown files (00, 01, 02, 03) — plus a file describing the AI agent/tool used, so this can be shown to someone else as proof of how it was made.

**Execution Record:**
- Deleted the previous plan/stack/rules-style `docs/` folder and replaced it with this build-log-style documentation set, plus an `.agent` file.

### Phase 12 — Reorganize components by concern, and add rules for keeping docs in sync

**Prompt:**
> Reorganize the components folder properly — don't put everything flat in one folder, group things by what they're for. In the docs, add a rule that says: any time code changes outside the docs folder, the docs must be updated to match. Also write a rules-and-skills file specifically meant to help any AI agent that works on this project in the future.

**Execution Record:**
- Reorganized the components folder (previously eight files flat in one place) into four subfolders: one for generic reusable UI primitives, one for the auth-page-specific layout, one for the app shell (sidebar + dashboard wrapper), and one for the Jobs-page-specific pieces — updating every import across the project to match.
- Verified `npm run build` / `npm run lint` / `npm run format` all pass clean, with an identical build output size confirming no behavior changed.
- Rewrote the project overview doc to reflect the new folder structure.
- Wrote a rules-and-skills file aimed at any AI agent working on this repo, with an explicit rule that any code change outside the docs folder requires a matching docs update in the same session.
- Added a file describing the AI agent used to build the project.

### Phase 13 — Rewrite the build log as standalone, reusable prompts

**Prompt:**
> Rewrite the build log so each phase is a self-contained prompt someone could actually use to generate that part of the project — write out the actual colors and design details directly in the prompt instead of saying "copy this from that other project."

**Execution Record:**
- Rewrote every phase in this file as a standalone prompt with explicit colors, spacing, and behavior spelled out directly, removing all references to porting or copying from an external reference project.

# 4. Revision History

| Version | Date | Change |
|---|---|---|
| 1.0 | 2026-07-27 | Initial company-standard release; 13 phases recorded |
