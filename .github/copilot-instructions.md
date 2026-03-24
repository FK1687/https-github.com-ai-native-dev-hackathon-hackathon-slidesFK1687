# KLEB. Product Finder — Workspace Instructions

## Project Overview

Enterprise-grade industrial adhesive product finder application rebuilt from a Figma prototype. The application enables users to discover, browse, compare, and inquire about ~796 adhesive products.

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Frontend** | React 18+ with TypeScript, Vite |
| **Styling** | Tailwind CSS 3+ with design tokens |
| **State Management** | Zustand for global state, React Query for server state |
| **Backend** | Node.js with Express/Fastify, TypeScript |
| **Database** | PostgreSQL via Supabase |
| **Testing** | Vitest (unit), Playwright (E2E) |
| **Package Manager** | pnpm |

## Architecture Rules

- Follow a feature-based folder structure: `src/features/<feature-name>/`
- Shared UI components go in `src/components/ui/`
- All API calls go through a centralized API layer in `src/api/`
- Business logic lives in custom hooks, not in components
- Use barrel exports (`index.ts`) for each feature module

## Code Standards

- **TypeScript strict mode** — no `any` types unless explicitly justified
- All components must be functional components with named exports
- Use `interface` for object shapes, `type` for unions/intersections
- File naming: `kebab-case` for files, `PascalCase` for components
- Maximum file length: 300 lines — split if larger

## Design System

- Follow the KLEB. brand identity from `guidelines/`
- Use design tokens — never hardcode colors, spacing, or font sizes
- All interactive elements must meet WCAG 2.2 AA accessibility standards
- Responsive breakpoints: mobile (< 768px), tablet (768–1024px), desktop (> 1024px)

## Git Conventions

- Branch naming: `feat/`, `fix/`, `chore/` prefixes
- Commit messages: conventional commits format (`feat:`, `fix:`, `docs:`, etc.)
- One logical change per commit

## Security

- Sanitize all user inputs
- Use parameterized queries — no string concatenation in SQL
- No secrets in code — use environment variables
- Validate API responses at system boundaries

## What NOT to Do

- Do not use `console.log` for production code — use a structured logger
- Do not install new dependencies without justification
- Do not bypass TypeScript errors with `@ts-ignore`
- Do not put business logic in API route handlers — use service functions
