# AI Challenge

A Vite + React + TypeScript single-page application implementing a Login/Register flow and a Jobs dashboard module, built with an AI coding agent (Kiro CLI).

## Governing Documentation

This repository is governed by a formal documentation set under [`docs/`](./docs). Any engineer or AI agent working in this repository must read these documents before making changes:

| Document | Purpose |
|---|---|
| [`docs/00-project-overview.md`](./docs/00-project-overview.md) | Scope, deferred scope, and system composition |
| [`docs/01-prompts-and-build-log.md`](./docs/01-prompts-and-build-log.md) | Authoritative, chronological build record |
| [`docs/02-stack-and-architecture.md`](./docs/02-stack-and-architecture.md) | Approved technology stack and architectural rationale |
| [`docs/03-rules-and-skills.md`](./docs/03-rules-and-skills.md) | Binding engineering policy, including directory structure and documentation-synchronization rules |

[`.agent`](./.agent) contains binding operating instructions for any AI coding agent working in this repository, including directory/folder placement rules.

**Policy note:** any change made to this codebase outside of `docs/` must be accompanied by a corresponding update to the relevant document(s) inside `docs/`, in the same change. See `docs/03-rules-and-skills.md` §2.1.

## Scripts

```bash
npm run dev              # start the development server
npm run build             # type-check and produce a production build
npm run preview            # preview the production build
npm run lint               # run oxlint
npm run format              # format with Prettier
npm run format:check         # check formatting without writing
```
