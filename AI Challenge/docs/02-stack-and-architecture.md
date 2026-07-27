---
Document ID: DOC-02
Title: Stack & Architecture
Version: 1.0
Status: Approved
Owner: AI Challenge Engineering
Last Updated: 2026-07-27
---

# 1. Purpose

This document specifies the approved technology stack for the AI Challenge application and the architectural rationale behind it. It is binding: substitutions to the stack require a version increment to this document.

# 2. Approved Technology Stack

| Layer | Selection | Notes |
|---|---|---|
| Build tool | Vite | Scaffolded via the official `create-vite` CLI (`react-ts` template) |
| Framework | React 19 + TypeScript | Strict mode enabled via `tsconfig.app.json` |
| Routing | `react-router-dom` v7 | Client-side routing via `BrowserRouter` |
| Styling | Tailwind CSS v4 | Via `@tailwindcss/vite` plugin, imported in `src/index.css` |
| Forms | `react-hook-form` | Uncontrolled form state |
| Validation | `zod` + `@hookform/resolvers` | Schema-based validation; types inferred with `z.infer` |
| Icons | `lucide-react` | Sole approved icon library for this codebase |
| Linting | `oxlint` | Zero-warning policy (see `03-rules-and-skills.md` §7) |
| Formatting | `prettier` | No semicolons, single quotes |

No backend framework, ORM, or database is in scope. Authentication is served by a client-side mock (§5).

# 3. Architectural Rationale

The stack was selected for a lightweight, dependency-minimal single-page application: React Hook Form and Zod for forms, Tailwind for styling, Lucide for icons — a common, well-supported combination — without introducing a full-stack meta-framework, an authentication provider, or a large component library, none of which are justified at the current scope. The application builds to static assets (`vite build` → `dist/`) and requires no server runtime.

# 4. Architecture

### 4.1 Routing
`src/App.tsx` is the single route registry. `/` redirects to `/login`. Navigation items without a dedicated implementation (`/resume`, `/profile`, `/agent`, `/coaching`, `/interview`) route to the `Dashboard` component, which renders an empty content region for any path other than `/dashboard`. This is documented scope deferral, not an oversight (see `00-project-overview.md` §3).

### 4.2 Component Organization
Components are organized by concern under `src/components/`, not held flat in a single directory:

| Directory | Contents | Constraint |
|---|---|---|
| `ui/` | Generic, reusable, feature-agnostic primitives (`FormField`, `PrimaryButton`) | Must not import from `pages/`, `data/`, or any feature-specific type |
| `auth/` | Login/Register-specific components (`AuthLayout`) | Scoped to the authentication module |
| `layout/` | Application shell (`Sidebar`, `DashboardLayout`) | Used by every authenticated page regardless of feature |
| `jobs/` | Jobs-module-specific components (`JobCard`, `JobsTopBar`, `RightRail`) | Scoped to the Jobs module |

The binding directory policy, including the rule for introducing new feature directories, is defined in `03-rules-and-skills.md` §2.

### 4.3 State & Data
- **Authentication session** — `src/lib/mockAuth.ts`, a `localStorage`-backed store. Not production authentication (§5).
- **Job listings** — `src/data/mockJobs.ts`, static in-memory data; no network calls.
- **Form state** — local to each page via `react-hook-form`. No global state library is introduced; none is justified at current scope.
- **Shared domain types** — `src/types/auth.ts` (`CurrentUser`, `LoginCredentials`, `RegisterInput`), consumed by both the authentication library and the presentation layer to prevent type drift.

### 4.4 Styling
- Tailwind utility classes are applied directly in JSX.
- Design tokens (brand and sidebar accent colors) are defined as CSS custom properties in `src/index.css` and consumed via Tailwind arbitrary-value syntax (e.g. `bg-[var(--jobright-mint)]`).
- Repeated utility strings (input styling, error text, primary button styling) are centralized in `src/styles/classNames.ts`. Duplication of these strings across files is a policy violation (see `03-rules-and-skills.md` §4).

# 5. Authentication — Risk Disclosure

`src/lib/mockAuth.ts` is a **non-production** authentication mechanism and must not be represented otherwise:

- Passwords are stored in **plain text** in the browser's `localStorage`.
- No hashing, no server-side validation, no protection against client-side tampering.
- It exists solely to allow the Login/Register interface to function end-to-end during development, including a seeded account (`demo@example.com` / `demo1234`).

**Remediation requirement:** prior to handling any real user data, `mockAuth.ts` must be replaced with server-backed authentication (hashed credentials, server-issued sessions). This replacement is a governed change and must be recorded in this document per the docs-synchronization policy in `03-rules-and-skills.md` §1.

# 6. Command Reference

```bash
npm run dev              # start the development server
npm run build             # type-check (tsc -b) and produce a production build
npm run preview            # preview the production build locally
npm run lint               # run oxlint
npm run format              # format all files with Prettier
npm run format:check         # verify formatting without writing changes
```

# 7. Revision History

| Version | Date | Change |
|---|---|---|
| 1.0 | 2026-07-27 | Initial company-standard release of stack and architecture documentation |
