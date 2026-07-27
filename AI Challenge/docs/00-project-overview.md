---
Document ID: DOC-00
Title: Project Overview
Version: 1.0
Status: Approved
Owner: AI Challenge Engineering
Last Updated: 2026-07-27
---

# 1. Purpose

This document defines the purpose, scope, and structural composition of the **AI Challenge** application. It serves as the entry point for any engineer or AI agent onboarding onto this codebase.

# 2. Scope

AI Challenge is a standalone Vite + React + TypeScript single-page application. In scope for the current release:

- 2.1 Authentication — Login and Register screens with client-side validation and a mock, local authentication backend.
- 2.2 Application Shell — a sidebar-driven dashboard layout, including navigation, branding, and account controls.
- 2.3 Jobs Module — a fully implemented job-listing page (tab navigation, search, job cards with match scoring, informational side panel).

Out of scope for the current release (see Section 3):

- 2.4 Resume, Profile, AI Agent, Coaching, and Interview modules are routed but not implemented. They render an empty content area within the application shell.
- 2.5 Server-side authentication, persistence, or any backend service.

# 3. Deferred Scope

The modules listed in 2.4 are intentionally deferred. Any implementation of these modules is a scope change and must be preceded by an update to this document and to `03-rules-and-skills.md` §2 (Directory Structure Policy) if new component categories are introduced.

# 4. System Composition

```
AI Challenge/
├── docs/                          # Governing documentation (this set)
│   ├── 00-project-overview.md
│   ├── 01-prompts-and-build-log.md
│   ├── 02-stack-and-architecture.md
│   └── 03-rules-and-skills.md
├── .agent                         # Operating instructions for AI agents working in this repository
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── ui/                    # Generic, reusable UI primitives — no feature dependencies
│   │   │   ├── FormField.tsx
│   │   │   └── PrimaryButton.tsx
│   │   ├── auth/                  # Login/Register module components
│   │   │   └── AuthLayout.tsx
│   │   ├── layout/                # Application shell — sidebar and dashboard frame
│   │   │   ├── Sidebar.tsx
│   │   │   └── DashboardLayout.tsx
│   │   └── jobs/                  # Jobs module components
│   │       ├── JobCard.tsx
│   │       ├── JobsTopBar.tsx
│   │       └── RightRail.tsx
│   ├── data/
│   │   └── mockJobs.ts            # Static sample data for the Jobs module
│   ├── lib/
│   │   ├── mockAuth.ts            # Local authentication store (non-production)
│   │   └── validation.ts          # Form validation schemas
│   ├── pages/
│   │   ├── Login.tsx
│   │   ├── Register.tsx
│   │   └── Dashboard.tsx
│   ├── styles/
│   │   └── classNames.ts          # Centralized style constants
│   ├── types/
│   │   └── auth.ts                # Shared domain types for authentication
│   ├── App.tsx                    # Route registry
│   ├── main.tsx                   # Application entry point
│   └── index.css                  # Design tokens and global styles
├── index.html
├── package.json
├── tsconfig*.json
└── vite.config.ts
```

The rationale for the `src/components/` subdivision (§4) is defined formally in `03-rules-and-skills.md` §2. All contributors, human or automated, must comply with that policy when adding new files.

# 5. Release Status

| Item | Status |
|---|---|
| Build | Passing (`npm run build`) |
| Lint | Passing, zero warnings (`npm run lint`) |
| Formatting | Compliant (`npm run format`) |
| Authentication | Functional against local mock store; not production-grade (see `02-stack-and-architecture.md` §5) |
| Jobs Module | Feature-complete for current scope |

# 6. Related Documents

| Document | Purpose |
|---|---|
| `01-prompts-and-build-log.md` | Chronological build record and reusable prompt reference |
| `02-stack-and-architecture.md` | Technology stack and architectural rationale |
| `03-rules-and-skills.md` | Binding engineering policy for this repository |
| `.agent` | Operating instructions for AI agents |

# 7. Revision History

| Version | Date | Change |
|---|---|---|
| 1.0 | 2026-07-27 | Initial company-standard release of project documentation |
