---
Document ID: DOC-03
Title: Rules & Skills — Engineering Policy for AI Agents
Version: 1.1
Status: Approved
Owner: AI Challenge Engineering
Last Updated: 2026-07-27
---

# 1. Purpose and Applicability

This document is binding engineering policy for **any AI coding agent** (Kiro, Claude Code, Cursor, GitHub Copilot, or equivalent) performing work in this repository. It complements `00-project-overview.md` (system composition) and `02-stack-and-architecture.md` (approved stack and architectural rationale). An agent must read this document before making any change to the repository.

# 2. Directory Structure Policy

## 2.1 Documentation Synchronization (Mandatory)

**Any change made outside of `docs/` must be accompanied by a corresponding update to the relevant document(s) inside `docs/`, completed within the same session, before the task is considered complete.**

Specifically:

| Change | Required documentation update |
|---|---|
| Add, move, or rename a component, page, or file | Update the system composition listing in `00-project-overview.md` §4 |
| Add a route, page, or feature | Append a new numbered phase to `01-prompts-and-build-log.md` §3, in the established format (Prompt → Execution Record) |
| Modify the stack (dependency, build tool, styling approach) | Update `02-stack-and-architecture.md` §2 or §4 as applicable, and increment its version |
| Modify a convention (naming, directory structure, validation pattern) | Update this document and increment its version |
| Replace the mock authentication layer with a production backend | This is a governed architectural change. Update `02-stack-and-architecture.md` §5 in full, including removal of the risk disclosure once no longer applicable |

This is not optional cleanup work. **A code change submitted without its corresponding documentation update is an incomplete task.** If uncertain which document governs a given change, the minimum acceptable action is a new entry in `01-prompts-and-build-log.md` §3 — that document's function is to preserve a complete change history.

## 2.2 Component Directory Policy

New components must not be added flat into `src/components/`. Every component must be placed in the subdirectory matching its concern:

| Directory | Scope | Constraint |
|---|---|---|
| `src/components/ui/` | Generic, reusable, feature-agnostic primitives | Must not import from `pages/`, `data/`, or any feature-specific type. Any reference to auth, jobs, or layout concepts disqualifies a component from this directory. |
| `src/components/auth/` | Login/Register module | Scoped exclusively to authentication screens. |
| `src/components/layout/` | Application shell | Anything rendered on every authenticated page, regardless of feature. |
| `src/components/jobs/` | Jobs module | Scoped exclusively to the Jobs page. |

When implementing a new feature area (e.g. the deferred Resume module — see `00-project-overview.md` §3), create a new subdirectory named for that feature (`src/components/resume/`). Do not place new-feature components into an existing, unrelated directory, and do not place them flat in `src/components/`.

## 2.3 General File Placement

- Shared domain types belong in `src/types/`, or alongside their originating data module if narrowly scoped (e.g. `Job` is exported from `src/data/mockJobs.ts`).
- Validation schemas belong in `src/lib/validation.ts`.
- Repeated style strings belong in `src/styles/classNames.ts`, not duplicated inline.

# 3. Dependency Approval Policy

**Every time a new dependency needs to be installed (via `npm install`, `npm install -D`, or equivalent), the agent must ask the user for explicit approval before installing it.**

This applies to every new package, with no exceptions for packages that seem small, common, or "obviously needed":

1. State the exact package name and version to be installed, and a one-line reason it's needed.
2. Wait for explicit approval before running the install command.
3. Do not install a dependency speculatively (e.g. "in case it's needed later") — prior work on this codebase already had to remove a dependency (`clsx`) that was installed speculatively and never used (see the Task 2 questions-and-answers file at the project root, and `01-prompts-and-build-log.md`).
4. This rule applies regardless of whether the dependency is a `dependency` or `devDependency`, and regardless of whether it is being added, upgraded to a new major version, or replaced.

Removing an unused dependency does not require this approval step — only installation does.

# 4. Code Reuse Policy

Before authoring new markup, an agent must check `src/components/ui/` and `src/styles/classNames.ts` for existing implementations. Prior engineering work on this codebase (documented in `01-prompts-and-build-log.md`) was specifically directed at eliminating duplicated input/button markup and repeated Tailwind class strings. Reintroducing such duplication is a policy violation. Any JSX block repeated more than once must be extracted into a component.

# 5. Type Safety Policy

Every function, prop, and unit of state must be explicitly typed. Use of `any` is prohibited. Types must be derived from a single source of truth:

- Form values must be inferred from their Zod schema (`z.infer<typeof schema>`); hand-written parallel interfaces are prohibited.
- Shared domain types (`CurrentUser`, `Job`, etc.) must be imported from their canonical location (`src/types/`, or the owning data module), not redeclared.

# 6. Design Fidelity Policy

Portions of this application's interface (Sidebar, JobCard, JobsTopBar, RightRail) were implemented from prompts specifying exact colors, spacing, icon selections, and behavior (see `01-prompts-and-build-log.md`, Phases 6 and 8). When a prompt specifies such detail:

1. Implement the exact values given (hex colors, spacing units, icon names). Approximation is not acceptable where an exact value is specified.
2. Match the described structure and naming as closely as possible. Deviation is permitted only where a described requirement is technically incompatible with the current stack (e.g. an interaction that would require a backend not present in this project).
3. Where simplification is unavoidable due to a missing dependency (backend, API, router capability), this must be disclosed explicitly in a code comment at the point of simplification — never silently.

# 7. Verification Policy

Every change must pass the following sequence, in order, before being considered complete:

```bash
npm run format     # apply formatting
npm run lint        # oxlint — zero errors and zero warnings required
npm run build         # tsc -b && vite build — must succeed
```

`npm run build` may not be skipped under any circumstance: it is the only step in this sequence that performs type-checking, since the development server (`vite dev`) does not.

# 8. Authentication Security Policy

`src/lib/mockAuth.ts` stores credentials in plain text in `localStorage` and must never be represented as production-ready. It must not be extended to store additional sensitive data. Its risk-disclosure comment must remain intact in all future revisions. If a task requires production-grade authentication, this constitutes a request for backend/auth-provider integration and must be flagged explicitly to the requester — it must never be satisfied by silently expanding the mock implementation.

# 9. Scope Discipline Policy

This project's scope has been corrected mid-task on multiple occasions (e.g., restricting a broader implementation to the Jobs module only, per `01-prompts-and-build-log.md` Phase 8). An agent must default to the smallest change that satisfies the literal request received. Where a request is ambiguous between a narrow adjustment and a full feature implementation, the agent must select the narrower interpretation, state what was done, and await further instruction — rather than assuming the larger scope and requiring correction afterward.

# 10. Reference Skills

The following capabilities are required to operate correctly within this repository:

- Vite + React + TypeScript project configuration (`vite.config.ts`, `tsconfig*.json`).
- Tailwind CSS v4 via the Vite plugin (no `tailwind.config.js`; tokens are defined in CSS via custom properties).
- React Router v7 (`BrowserRouter`, `Routes`, `Route`, `Link`, `useNavigate`, `Navigate`, `useLocation`).
- React Hook Form with Zod (`useForm` with `zodResolver`; types inferred via `z.infer`).
- Component composition as a discipline for eliminating duplication, per §4.
- Precise translation of a detailed design specification into implementation, per §6.

# 11. Revision History

| Version | Date | Change |
|---|---|---|
| 1.0 | 2026-07-27 | Initial company-standard release of engineering policy for AI agents |
| 1.1 | 2026-07-27 | Added §3, Dependency Approval Policy — new dependency installs require explicit user approval before proceeding; renumbered subsequent sections |
