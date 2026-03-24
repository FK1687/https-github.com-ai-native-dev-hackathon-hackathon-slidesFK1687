# KLEB. Product Finder — Phase 2 Implementation Plan

## Overview

Phase 2 addresses the gaps left after the hackathon sprints: testing coverage, backend migration from in-memory mocks to Supabase/PostgreSQL, React Query integration, search improvements, observability, security hardening, and CI pipeline maturity.

### Phase 1 Recap (Completed)

- 19 tasks across 7 tiers (T-001 → T-019)
- Full working frontend deployed to GitHub Pages
- In-memory mock API simulating 796 seeded products
- 9 UI primitives, 5 feature pages, Zustand comparison store
- No tests, no real backend, no React Query, no auth

### Phase 2 Goals

| Goal | Description |
|------|-------------|
| **Testing** | Unit tests (Vitest) for all components, hooks, stores; E2E tests (Playwright) for all user flows |
| **Backend migration** | Replace in-memory mock API with real Supabase/PostgreSQL backend |
| **React Query** | Replace custom `useProductData` hook with React Query for caching, refetching, and stale management |
| **Search** | Full-text search via PostgreSQL `tsvector`/`tsquery` or Supabase full-text search |
| **Observability** | Structured logging, error tracking, basic analytics events |
| **Security** | Input sanitization, authentication, parameterized queries |
| **CI/CD** | Test gates on PRs, lint checks, build verification |

---

## Execution Order (Dependency Graph)

```
Tier 0 — Test & Backend Foundation
├── P2-001: Vitest test infrastructure                    [frontend]
├── P2-002: Playwright E2E infrastructure                 [frontend]
└── P2-003: Supabase project & database schema            [backend]

Tier 1 — Unit Tests (Primitives & State)
├── P2-004: UI primitive component tests                  [frontend]  → P2-001
├── P2-005: Zustand store unit tests                      [frontend]  → P2-001
├── P2-006: Custom hooks unit tests                       [frontend]  → P2-001
└── P2-007: API client & seed-data unit tests             [frontend]  → P2-001

Tier 2 — Backend Migration
├── P2-008: Product data migration & seed script          [backend]   → P2-003
├── P2-009: Product API endpoints (Supabase)              [backend]   → P2-003, P2-008
├── P2-010: Filter & options API endpoints (Supabase)     [backend]   → P2-003, P2-008
└── P2-011: Appointment & contact endpoints (Supabase)    [backend]   → P2-003

Tier 3 — Frontend Integration
├── P2-012: React Query integration                       [frontend]  → P2-009, P2-010
├── P2-013: API client refactor (real backend)            [frontend]  → P2-009, P2-010, P2-011
└── P2-014: Full-text search (PostgreSQL)                 [backend]   → P2-008

Tier 4 — Feature Page Tests
├── P2-015: Product Finder page tests                     [frontend]  → P2-004, P2-005, P2-006
├── P2-016: Product Catalog page tests                    [frontend]  → P2-004, P2-005, P2-006
├── P2-017: Product Detail page tests                     [frontend]  → P2-004, P2-006
├── P2-018: Product Compare page tests                    [frontend]  → P2-004, P2-005
└── P2-019: Contact Sales page tests                      [frontend]  → P2-004, P2-006

Tier 5 — E2E, Accessibility & Observability
├── P2-020: E2E test: Product discovery flow              [frontend]  → P2-002, P2-012
├── P2-021: E2E test: Product comparison flow             [frontend]  → P2-002, P2-012
├── P2-022: E2E test: Contact & appointment flow          [frontend]  → P2-002, P2-013
├── P2-023: Accessibility audit & WCAG remediation        [frontend]  → P2-015 – P2-019
└── P2-024: Structured logging                            [backend]   → P2-009

Tier 6 — Hardening & CI
├── P2-025: Authentication & user sessions                [backend]   → P2-009
├── P2-026: Input sanitization & security hardening       [backend]   → P2-009, P2-011
├── P2-027: Performance optimization & bundle analysis    [frontend]  → P2-012
└── P2-028: CI pipeline — test gates & lint checks        [backend]   → P2-020, P2-021, P2-022
```

---

## Task Summary

| ID | Title | Agent | Dependencies | Priority |
|----|-------|-------|-------------|----------|
| P2-001 | Vitest test infrastructure | frontend | None | high |
| P2-002 | Playwright E2E infrastructure | frontend | None | high |
| P2-003 | Supabase project & database schema | backend | None | high |
| P2-004 | UI primitive component tests | frontend | P2-001 | high |
| P2-005 | Zustand store unit tests | frontend | P2-001 | high |
| P2-006 | Custom hooks unit tests | frontend | P2-001 | high |
| P2-007 | API client & seed-data unit tests | frontend | P2-001 | medium |
| P2-008 | Product data migration & seed script | backend | P2-003 | high |
| P2-009 | Product API endpoints (Supabase) | backend | P2-003, P2-008 | high |
| P2-010 | Filter & options API endpoints (Supabase) | backend | P2-003, P2-008 | high |
| P2-011 | Appointment & contact endpoints (Supabase) | backend | P2-003 | high |
| P2-012 | React Query integration | frontend | P2-009, P2-010 | high |
| P2-013 | API client refactor (real backend) | frontend | P2-009, P2-010, P2-011 | high |
| P2-014 | Full-text search (PostgreSQL) | backend | P2-008 | medium |
| P2-015 | Product Finder page tests | frontend | P2-004, P2-005, P2-006 | medium |
| P2-016 | Product Catalog page tests | frontend | P2-004, P2-005, P2-006 | medium |
| P2-017 | Product Detail page tests | frontend | P2-004, P2-006 | medium |
| P2-018 | Product Compare page tests | frontend | P2-004, P2-005 | medium |
| P2-019 | Contact Sales page tests | frontend | P2-004, P2-006 | medium |
| P2-020 | E2E test: Product discovery flow | frontend | P2-002, P2-012 | medium |
| P2-021 | E2E test: Product comparison flow | frontend | P2-002, P2-012 | medium |
| P2-022 | E2E test: Contact & appointment flow | frontend | P2-002, P2-013 | medium |
| P2-023 | Accessibility audit & WCAG remediation | frontend | P2-015 – P2-019 | medium |
| P2-024 | Structured logging | backend | P2-009 | low |
| P2-025 | Authentication & user sessions | backend | P2-009 | low |
| P2-026 | Input sanitization & security hardening | backend | P2-009, P2-011 | medium |
| P2-027 | Performance optimization & bundle analysis | frontend | P2-012 | low |
| P2-028 | CI pipeline — test gates & lint checks | backend | P2-020, P2-021, P2-022 | low |

---

## Detailed Task Definitions

---

### P2-001: Vitest Test Infrastructure

#### Description

Set up the Vitest testing infrastructure with React Testing Library, JSDOM environment, path alias resolution, and coverage reporting. Create test utilities (render helpers, mock providers) shared across all test files.

#### Spec Reference

Cross-cutting — supports all specs (US-01 through US-05)

#### Agent Assignment

Agent: `frontend`

#### Dependencies

None — this task can start immediately.

#### Acceptance Criteria

- [ ] Vitest configured with JSDOM environment in `vite.config.ts` or `vitest.config.ts`
- [ ] `@testing-library/react` and `@testing-library/jest-dom` installed
- [ ] `@testing-library/user-event` installed for interaction testing
- [ ] Path aliases (`@/`) resolve correctly in test files
- [ ] Coverage reporting configured (Istanbul or v8 provider) with thresholds
- [ ] Shared test utilities created: `renderWithProviders()` wrapping components in Router + Zustand context
- [ ] `pnpm test` runs all `*.test.ts(x)` files
- [ ] `pnpm test:coverage` generates a coverage report
- [ ] At least one smoke test passes to validate the setup

#### Technical Notes

- Install: `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event`, `jsdom`
- Place test utils in `src/test/utils.tsx`
- Configure `setupFiles` to import `@testing-library/jest-dom/vitest`
- Coverage thresholds: start at 50% lines/branches, increase as tests are added

---

### P2-002: Playwright E2E Infrastructure

#### Description

Set up Playwright for end-to-end testing with project configuration, base URL, CI-compatible settings, and a shared page object model pattern.

#### Spec Reference

Cross-cutting — supports all specs (US-01 through US-05)

#### Agent Assignment

Agent: `frontend`

#### Dependencies

None — this task can start immediately.

#### Acceptance Criteria

- [ ] `@playwright/test` installed and `playwright.config.ts` created
- [ ] Configured for Chromium, Firefox, and WebKit browsers
- [ ] `webServer` config starts the Vite dev server before tests
- [ ] Base URL configured (`http://localhost:5173`)
- [ ] Page object model pattern established in `e2e/pages/`
- [ ] `pnpm test:e2e` runs all E2E test files in `e2e/` directory
- [ ] Screenshot-on-failure configured for CI debugging
- [ ] At least one smoke test (app loads, header visible) passes

#### Technical Notes

- Place tests in `e2e/` at project root
- Page objects: `ProductFinderPage`, `CatalogPage`, `DetailPage`, `ComparePage`, `ContactPage`
- Use `webServer.reuseExistingServer: true` for faster local iterations
- HTML reporter for CI artifact uploads

---

### P2-003: Supabase Project & Database Schema

#### Description

Create the Supabase project, define PostgreSQL tables for products, filter configurations, label mappings, appointments, and contact messages. Set up Row Level Security policies and environment variable configuration.

#### Spec Reference

`docs/specs/us-01-app-shell-and-filters.md`, `docs/specs/us-05-contact-sales.md`

#### Agent Assignment

Agent: `backend`

#### Dependencies

None — this task can start immediately.

#### Acceptance Criteria

- [ ] Supabase project created with PostgreSQL database
- [ ] `products` table with all columns matching the `Product` interface (id, name, sku, category, application, material, adhesiveType, description, shortDescription, properties JSONB, availableWidths, availableLengths, color, substrate, environment, certification, shelfLife, tags)
- [ ] `appointments` table (id, name, email, date, time, message, status, created_at)
- [ ] `contact_messages` table (id, name, email, company, subject, message, created_at)
- [ ] Row Level Security enabled; read-only public access for products; insert-only for appointments/contacts
- [ ] Supabase migration files in `supabase/migrations/`
- [ ] Environment variables documented: `VITE_SUPABASE_URL`, `VITE_SUPABASE_ANON_KEY`
- [ ] `.env.example` created with placeholder values
- [ ] Connection tested from local development environment

#### Technical Notes

- Use `supabase init` and `supabase migration new` for schema management
- `application`, `substrate`, `certification`, `tags` columns as `text[]` (PostgreSQL arrays)
- `properties` as JSONB for the 8 boolean flags + numeric values
- `availableWidths` and `availableLengths` as `numeric[]`
- Create indexes on `category`, `adhesiveType`, `environment` for filter performance

---

### P2-004: UI Primitive Component Tests

#### Description

Write unit tests for all 9 UI primitive components: Button, Input, Badge, Card, Skeleton, Separator, Select, Tabs, Accordion. Test rendering, variants, accessibility attributes, and user interactions.

#### Spec Reference

`docs/specs/us-01-app-shell-and-filters.md` (UI requirements)

#### Agent Assignment

Agent: `frontend`

#### Dependencies

- P2-001 — Vitest test infrastructure

#### Acceptance Criteria

- [ ] Button: renders all variants (solid, outline, ghost), sizes, disabled state, click handler, keyboard activation
- [ ] Input: renders with placeholder, icon, clearable variant, onChange handler, aria-label
- [ ] Badge: renders all variants (default, outline, secondary), custom className
- [ ] Card: renders children, applies className
- [ ] Skeleton: renders with correct dimensions
- [ ] Separator: renders horizontal divider with correct role
- [ ] Select: renders options, handles selection change, has accessible label
- [ ] Tabs: renders TabsList/TabsTrigger/TabsContent, switches tabs on click and keyboard
- [ ] Accordion: renders sections, expand/collapse behavior, multiple sections open simultaneously
- [ ] All components tested for ARIA attributes (role, aria-label, aria-expanded, etc.)
- [ ] Tests in `src/components/ui/__tests__/` or colocated as `*.test.tsx`

#### Technical Notes

- Use `@testing-library/user-event` for click/keyboard interactions
- Test accessibility with `toHaveAttribute('aria-*')` matchers
- Snapshot tests are acceptable for visual regression but not as sole coverage

---

### P2-005: Zustand Store Unit Tests

#### Description

Write unit tests for the `useComparisonStore` Zustand store, verifying add/remove/clear logic, the 4-product maximum, duplicate prevention, and `isInCompare` checks.

#### Spec Reference

`docs/specs/us-04-product-compare.md`

#### Agent Assignment

Agent: `frontend`

#### Dependencies

- P2-001 — Vitest test infrastructure

#### Acceptance Criteria

- [ ] `addToCompare` adds a product ID to the list
- [ ] `addToCompare` is a no-op when the list already has 4 items
- [ ] `addToCompare` is a no-op for duplicate IDs
- [ ] `removeFromCompare` removes the specified product ID
- [ ] `removeFromCompare` is a no-op for IDs not in the list
- [ ] `clearCompare` empties the list
- [ ] `isInCompare` returns true/false correctly
- [ ] Store resets between tests (no state leakage)
- [ ] Tests in `src/stores/__tests__/comparison-store.test.ts`

#### Technical Notes

- Use `useComparisonStore.setState()` or `useComparisonStore.getState()` for direct store testing without rendering components
- Reset store between tests with `beforeEach(() => useComparisonStore.setState({ compareList: [] }))`

---

### P2-006: Custom Hooks Unit Tests

#### Description

Write unit tests for custom hooks: `useProductData` and `useFilterProducts`. Test loading states, error handling, data transformation, and filter logic.

#### Spec Reference

`docs/specs/us-01-app-shell-and-filters.md`

#### Agent Assignment

Agent: `frontend`

#### Dependencies

- P2-001 — Vitest test infrastructure

#### Acceptance Criteria

- [ ] `useProductData`: test loading state is true initially, transitions to false after fetch
- [ ] `useProductData`: test successful data fetch populates products, filters, options
- [ ] `useProductData`: test error state on fetch failure with error message
- [ ] `useProductData`: test refetch function triggers a new data load
- [ ] `useFilterProducts`: test filtering by category (OR logic)
- [ ] `useFilterProducts`: test filtering by properties (AND logic)
- [ ] `useFilterProducts`: test text search across name, SKU, description, material, tags
- [ ] `useFilterProducts`: test temperature range overlap filter
- [ ] `useFilterProducts`: test adhesion range containment filter
- [ ] `useFilterProducts`: test sort options (name, adhesion asc/desc, temp range)
- [ ] `useFilterProducts`: test pagination reset on filter change
- [ ] Tests in `src/hooks/__tests__/`

#### Technical Notes

- Use `renderHook` from `@testing-library/react` for hook testing
- Mock `src/api/client.ts` functions with `vi.mock()` for `useProductData` tests
- Create a small fixture of 5–10 test products for `useFilterProducts` tests

---

### P2-007: API Client & Seed Data Unit Tests

#### Description

Write unit tests for the in-memory API client functions (`fetchProducts`, `fetchProduct`, `fetchFilters`, `fetchOptions`, `fetchAvailableSlots`, `bookAppointment`, `submitContact`) and the seed data generator.

#### Spec Reference

`docs/specs/us-01-app-shell-and-filters.md`, `docs/specs/us-05-contact-sales.md`

#### Agent Assignment

Agent: `frontend`

#### Dependencies

- P2-001 — Vitest test infrastructure

#### Acceptance Criteria

- [ ] `fetchProducts` returns ~796 products with correct shape
- [ ] `fetchProduct` returns a single product for a valid ID, undefined for invalid
- [ ] `fetchFilters` returns a FilterConfiguration with all fields populated
- [ ] `fetchOptions` returns an OptionsData with all label mappings
- [ ] `fetchAvailableSlots` returns 10 business days with valid time slots
- [ ] `bookAppointment` succeeds with valid input and returns confirmation
- [ ] `bookAppointment` throws on missing required fields
- [ ] `bookAppointment` throws on invalid email format
- [ ] `bookAppointment` throws on double-booking the same slot
- [ ] `submitContact` succeeds with valid input
- [ ] `submitContact` throws on missing required fields
- [ ] Seed data generator produces deterministic output (796 products, 10 categories)
- [ ] Tests in `src/api/__tests__/`

#### Technical Notes

- These test the current in-memory implementation; they will also serve as a contract for the real backend migration
- Fast-forward timers (`vi.useFakeTimers()`) to skip artificial delays if needed

---

### P2-008: Product Data Migration & Seed Script

#### Description

Create a migration/seed script that populates the Supabase PostgreSQL `products` table with the same ~796 products generated by the current `seed-data.ts`. Verify data integrity between in-memory and database representations.

#### Spec Reference

`docs/specs/us-01-app-shell-and-filters.md`

#### Agent Assignment

Agent: `backend`

#### Dependencies

- P2-003 — Supabase project & database schema

#### Acceptance Criteria

- [ ] Seed script reads from `generateProducts(796)` and batch-inserts into Supabase `products` table
- [ ] All 796 products inserted with correct data types (arrays, JSONB, enums)
- [ ] Filter configurations stored in a `filter_config` table or derived from product data at query time
- [ ] Label mappings stored in an `option_labels` table or served as static JSON
- [ ] Seed script is idempotent (safe to re-run with upsert or truncate-and-insert)
- [ ] Script runnable via `pnpm db:seed` or equivalent
- [ ] Data integrity verified: product counts, category distribution, property ranges

#### Technical Notes

- Use Supabase JS client (`@supabase/supabase-js`) for inserts
- Batch insert in chunks of 100 to avoid request size limits
- Consider storing filter config as a materialized view or computed from product data
- Place script in `supabase/seed.ts` or `scripts/seed-db.ts`

---

### P2-009: Product API Endpoints (Supabase)

#### Description

Implement real REST API endpoints for products using Supabase Edge Functions or a Node.js backend with Supabase client. Replace in-memory product data access with PostgreSQL queries.

#### Spec Reference

`docs/specs/us-01-app-shell-and-filters.md`

#### Agent Assignment

Agent: `backend`

#### Dependencies

- P2-003 — Supabase project & database schema
- P2-008 — Product data migration & seed script

#### Acceptance Criteria

- [ ] `GET /products` returns all products from PostgreSQL with correct response shape
- [ ] `GET /products/:id` returns a single product, 404 if not found
- [ ] `GET /health` returns service health status
- [ ] `POST /data/reseed` triggers re-seed from script
- [ ] All queries use parameterized statements (no string concatenation)
- [ ] Business logic in service functions, not route handlers
- [ ] Response shapes match existing `Product`, `ApiError` TypeScript interfaces
- [ ] Error responses: `{ error: string, code: string }` with appropriate HTTP status codes
- [ ] Pagination support: `?page=1&limit=24` query parameters (server-side pagination)

#### Technical Notes

- Option A: Supabase Edge Functions (Deno) — deploy alongside database
- Option B: Express/Fastify server with `@supabase/supabase-js` — deploy to Vercel/Railway
- Keep parity with current in-memory API response shapes for backward compatibility
- Add server-side filtering query parameters for future optimization: `?category=`, `?search=`, etc.

---

### P2-010: Filter & Options API Endpoints (Supabase)

#### Description

Implement API endpoints for filter configurations and label mappings backed by PostgreSQL data.

#### Spec Reference

`docs/specs/us-01-app-shell-and-filters.md`

#### Agent Assignment

Agent: `backend`

#### Dependencies

- P2-003 — Supabase project & database schema
- P2-008 — Product data migration & seed script

#### Acceptance Criteria

- [ ] `GET /filters` returns `FilterConfiguration` derived from actual product data (distinct categories, applications, etc.)
- [ ] `GET /options` returns `OptionsData` label mappings
- [ ] Filter ranges (temperature, adhesion) computed from actual min/max in product data
- [ ] Responses cached or computed efficiently (avoid N+1 queries)
- [ ] Response shapes match existing TypeScript interfaces

#### Technical Notes

- Filter config can be computed with `SELECT DISTINCT` queries or a materialized view
- Label mappings can be a static table or hardcoded in the service layer (they don't change)
- Consider caching filter config since it changes only when products change

---

### P2-011: Appointment & Contact Endpoints (Supabase)

#### Description

Migrate the appointment booking and contact message API endpoints from in-memory storage to Supabase PostgreSQL.

#### Spec Reference

`docs/specs/us-05-contact-sales.md`

#### Agent Assignment

Agent: `backend`

#### Dependencies

- P2-003 — Supabase project & database schema

#### Acceptance Criteria

- [ ] `GET /appointments/available` queries the `appointments` table to exclude booked slots
- [ ] `POST /appointments/book` inserts into `appointments` table with conflict detection
- [ ] Booking returns 409 Conflict if the date+time combination already exists (unique constraint)
- [ ] `POST /contact` inserts into `contact_messages` table
- [ ] Server-side validation: required fields, email format
- [ ] Parameterized queries only
- [ ] All business logic in service functions
- [ ] Response shapes match existing TypeScript interfaces

#### Technical Notes

- Add a unique constraint on `appointments(date, time)` for automatic conflict detection
- Use Supabase RPC or direct insert with `.onConflict()` handling
- Email validation regex on the server side (defense in depth)

---

### P2-012: React Query Integration

#### Description

Replace the custom `useProductData` hook with React Query (`@tanstack/react-query`) for data fetching, caching, stale-while-revalidate, and automatic refetching. Add a `QueryClientProvider` to the app root.

#### Spec Reference

`docs/specs/us-01-app-shell-and-filters.md`

#### Agent Assignment

Agent: `frontend`

#### Dependencies

- P2-009 — Product API endpoints (Supabase)
- P2-010 — Filter & options API endpoints (Supabase)

#### Acceptance Criteria

- [ ] `QueryClientProvider` wraps the app in `App.tsx` or `main.tsx`
- [ ] `useProducts()` query hook replaces `fetchProducts()` usage with caching
- [ ] `useProduct(id)` query hook for single product fetching with cache
- [ ] `useFilters()` query hook for filter configuration
- [ ] `useOptions()` query hook for label mappings
- [ ] `useAvailableSlots()` query hook for appointment slots
- [ ] `useBookAppointment()` mutation hook with optimistic updates or invalidation
- [ ] `useSubmitContact()` mutation hook
- [ ] Loading and error states derived from React Query's `isLoading`, `isError`, `error`
- [ ] Stale time configured appropriately (products: 5 min, slots: 1 min)
- [ ] Custom `useProductData` hook removed or deprecated
- [ ] All consuming components updated to use new hooks

#### Technical Notes

- `@tanstack/react-query` is already in `package.json` — just needs integration
- Place query hooks in `src/hooks/queries/`
- Query keys: `['products']`, `['products', id]`, `['filters']`, `['options']`, `['slots']`
- Configure `QueryClient` defaults: `staleTime`, `retry`, `refetchOnWindowFocus`

---

### P2-013: API Client Refactor (Real Backend)

#### Description

Refactor `src/api/client.ts` to call real HTTP endpoints instead of in-memory functions. Support environment-based switching between mock and real backends for development flexibility.

#### Spec Reference

All specs (US-01 through US-05)

#### Agent Assignment

Agent: `frontend`

#### Dependencies

- P2-009 — Product API endpoints (Supabase)
- P2-010 — Filter & options API endpoints (Supabase)
- P2-011 — Appointment & contact endpoints (Supabase)

#### Acceptance Criteria

- [ ] API client uses `fetch()` or Supabase JS client to call real endpoints
- [ ] Base URL configured via `VITE_API_BASE_URL` environment variable
- [ ] Fallback to in-memory mock when `VITE_USE_MOCK_API=true` (development convenience)
- [ ] All API functions return the same TypeScript types as before
- [ ] Error handling: network errors, HTTP error codes mapped to user-friendly messages
- [ ] Request/response types validated at the boundary

#### Technical Notes

- Option A: Direct Supabase JS client calls (simplest, no separate backend needed)
- Option B: HTTP fetch to Express/Fastify backend
- Keep the existing in-memory client as `src/api/mock-client.ts` for offline development
- Use a factory pattern or conditional import based on env var

---

### P2-014: Full-Text Search (PostgreSQL)

#### Description

Implement server-side full-text search using PostgreSQL `tsvector`/`tsquery` or Supabase's built-in full-text search, replacing client-side string matching for better performance and relevance.

#### Spec Reference

`docs/specs/us-01-app-shell-and-filters.md` (BR-05), `docs/specs/us-02-product-catalog.md` (BR-01)

#### Agent Assignment

Agent: `backend`

#### Dependencies

- P2-008 — Product data migration & seed script

#### Acceptance Criteria

- [ ] `tsvector` column added to `products` table combining name, SKU, description, material, tags
- [ ] GIN index created on the `tsvector` column for fast lookups
- [ ] `GET /products?search=term` performs server-side full-text search
- [ ] Search results ranked by relevance (`ts_rank`)
- [ ] Fallback to `ILIKE` for short queries (< 3 characters)
- [ ] Search trigger or generated column keeps `tsvector` up to date on insert/update
- [ ] Performance: search across 796 products completes in < 100ms

#### Technical Notes

- Use `to_tsvector('english', name || ' ' || sku || ' ' || description || ' ' || material || ' ' || array_to_string(tags, ' '))`
- Create a GIN index: `CREATE INDEX idx_products_search ON products USING GIN (search_vector)`
- For Supabase, use the `.textSearch()` method in the JS client

---

### P2-015: Product Finder Page Tests

#### Description

Write unit/integration tests for the Product Finder page (`ProductFinderPage`), covering search, filtering, sorting, pagination, and view mode switching.

#### Spec Reference

`docs/specs/us-01-app-shell-and-filters.md`

#### Agent Assignment

Agent: `frontend`

#### Dependencies

- P2-004 — UI primitive component tests
- P2-005 — Zustand store unit tests
- P2-006 — Custom hooks unit tests

#### Acceptance Criteria

- [ ] Renders hero section with heading, description, and search input
- [ ] Search input filters products by text (mocked data)
- [ ] Filter accordion sections expand and collapse
- [ ] Category filter selects/deselects checkboxes and filters results
- [ ] Property filter applies AND logic
- [ ] Sort dropdown changes product order
- [ ] View mode toggle switches between grid and table
- [ ] Pagination renders correct page controls and updates on page change
- [ ] "Reset All Filters" clears active filters
- [ ] Loading state renders skeleton/spinner
- [ ] Error state renders with retry button
- [ ] Tests in `src/features/product-finder/__tests__/`

#### Technical Notes

- Mock `useProductData` hook to provide controlled test data
- Use 5–10 fixture products with known categories/properties for deterministic assertions
- Test both desktop and mobile layouts if responsive behavior is component-driven

---

### P2-016: Product Catalog Page Tests

#### Description

Write unit/integration tests for the Product Catalog page, covering search, category filtering, view modes, pagination, and URL parameter handling.

#### Spec Reference

`docs/specs/us-02-product-catalog.md`

#### Agent Assignment

Agent: `frontend`

#### Dependencies

- P2-004 — UI primitive component tests
- P2-005 — Zustand store unit tests
- P2-006 — Custom hooks unit tests

#### Acceptance Criteria

- [ ] Renders heading "All Products" and search bar
- [ ] Category dropdown filters products
- [ ] URL `?category=packaging` pre-selects category on load
- [ ] Grid view renders product cards in responsive grid
- [ ] List view renders product rows
- [ ] View toggle switches between grid and list
- [ ] Empty state renders when no products match
- [ ] Pagination renders and navigates correctly
- [ ] "Add to Compare" toggles product in comparison store
- [ ] Product count updates with filter changes
- [ ] Tests in `src/features/product-catalog/__tests__/`

#### Technical Notes

- Use `MemoryRouter` with initial entries for URL parameter testing
- Mock comparison store for "Add to Compare" tests

---

### P2-017: Product Detail Page Tests

#### Description

Write unit/integration tests for the Product Detail page, covering breadcrumbs, tabbed specifications, resistance grid, related products, and comparison integration.

#### Spec Reference

`docs/specs/us-03-product-detail.md`

#### Agent Assignment

Agent: `frontend`

#### Dependencies

- P2-004 — UI primitive component tests
- P2-006 — Custom hooks unit tests

#### Acceptance Criteria

- [ ] Renders product header: name, SKU, category badge, description
- [ ] Breadcrumb navigation shows Products > Category > Product Name
- [ ] Breadcrumb links have correct href values
- [ ] Specifications tab displays key-value pairs with correct data
- [ ] Dimensions tab shows width and length chips
- [ ] Resistance tab shows 8 property cards with active/inactive states
- [ ] Tab switching works via click and keyboard
- [ ] "Add to Compare" / "Remove from Compare" toggles correctly
- [ ] Related products section renders products from same category
- [ ] "Product Not Found" state for invalid IDs
- [ ] Tests in `src/features/product-detail/__tests__/`

#### Technical Notes

- Mock `useParams()` to provide product ID
- Mock `useProductData` with a known product fixture
- Test tab content rendering independently

---

### P2-018: Product Compare Page Tests

#### Description

Write unit/integration tests for the Product Compare page, covering the comparison table, product removal, product selector, and empty state.

#### Spec Reference

`docs/specs/us-04-product-compare.md`

#### Agent Assignment

Agent: `frontend`

#### Dependencies

- P2-004 — UI primitive component tests
- P2-005 — Zustand store unit tests

#### Acceptance Criteria

- [ ] Empty state renders when no products are selected
- [ ] Comparison table renders with correct columns (one per product)
- [ ] All specification rows display correct values (category, material, adhesion, temperature, etc.)
- [ ] Boolean properties show Yes/No visual indicators
- [ ] "Remove" button removes a product from the comparison
- [ ] "Clear all" removes all products
- [ ] "Add Product" opens searchable selector
- [ ] Product search filters results and excludes already-selected products
- [ ] "View Details" links have correct href
- [ ] Tests in `src/features/product-compare/__tests__/`

#### Technical Notes

- Pre-populate comparison store with 2–3 product IDs for table tests
- Mock product data to return known products matching those IDs

---

### P2-019: Contact Sales Page Tests

#### Description

Write unit/integration tests for the Contact Sales page, covering the appointment booking flow, message form, validation, and success/error states.

#### Spec Reference

`docs/specs/us-05-contact-sales.md`

#### Agent Assignment

Agent: `frontend`

#### Dependencies

- P2-004 — UI primitive component tests
- P2-006 — Custom hooks unit tests

#### Acceptance Criteria

- [ ] Sales expert card renders with name, title, contact info, expertise tags
- [ ] "Book Appointment" tab shows 3-step flow
- [ ] Date selection buttons render with slot counts
- [ ] Time slot grid renders for selected date
- [ ] Submit button disabled until required fields filled
- [ ] Successful booking shows confirmation screen with appointment details
- [ ] "Book Another" resets the form
- [ ] "Send Message" tab renders all form fields
- [ ] Message submit disabled until name + email + message filled
- [ ] Successful message shows confirmation screen
- [ ] Error states display validation messages
- [ ] Tests in `src/features/contact-sales/__tests__/`

#### Technical Notes

- Mock `fetchAvailableSlots`, `bookAppointment`, `submitContact` API functions
- Use `vi.useFakeTimers()` if testing date-dependent logic
- Test form validation independently from API calls

---

### P2-020: E2E Test — Product Discovery Flow

#### Description

Write Playwright E2E tests covering the complete product discovery user journey: landing on the Product Finder, applying filters, searching, sorting, paginating, and navigating to a product detail page.

#### Spec Reference

`docs/specs/us-01-app-shell-and-filters.md`, `docs/specs/us-02-product-catalog.md`, `docs/specs/us-03-product-detail.md`

#### Agent Assignment

Agent: `frontend`

#### Dependencies

- P2-002 — Playwright E2E infrastructure
- P2-012 — React Query integration

#### Acceptance Criteria

- [ ] App loads and displays product finder with all products
- [ ] Search filters products by text input
- [ ] Category filter reduces product count
- [ ] Property filter narrows results (AND logic verified)
- [ ] Sort changes product order
- [ ] Pagination navigates between pages
- [ ] Clicking "View Detail" navigates to product detail page
- [ ] Product detail displays correct specifications
- [ ] Breadcrumb navigation returns to catalog
- [ ] Navigation between Product Finder and Product Catalog works
- [ ] Tests in `e2e/product-discovery.spec.ts`

#### Technical Notes

- Use page object pattern: `ProductFinderPage`, `CatalogPage`, `DetailPage`
- Explicit waits for data loading (wait for product cards to appear, not arbitrary timeouts)
- Assert on specific product names/SKUs for deterministic tests

---

### P2-021: E2E Test — Product Comparison Flow

#### Description

Write Playwright E2E tests covering the complete comparison user journey: adding products from different pages, using the comparison bar, viewing the comparison table, and managing the comparison list.

#### Spec Reference

`docs/specs/us-04-product-compare.md`

#### Agent Assignment

Agent: `frontend`

#### Dependencies

- P2-002 — Playwright E2E infrastructure
- P2-012 — React Query integration

#### Acceptance Criteria

- [ ] Adding a product shows the comparison bar at the bottom
- [ ] Comparison bar shows correct product count (e.g., "1/4")
- [ ] Adding 4 products prevents adding a 5th
- [ ] Removing a product from the comparison bar updates the chip list
- [ ] "Compare" button navigates to the comparison page
- [ ] Comparison table shows correct specification values
- [ ] Removing a product from the comparison page updates the table
- [ ] "Clear all" empties the comparison and shows empty state
- [ ] "Add Product" selector works with search
- [ ] Comparison state persists across page navigation
- [ ] Tests in `e2e/product-compare.spec.ts`

#### Technical Notes

- Start from the Product Finder page, add products, then navigate to compare
- Verify the comparison bar is visible across different pages
- Use accessible selectors (role, label) for chip remove buttons

---

### P2-022: E2E Test — Contact & Appointment Flow

#### Description

Write Playwright E2E tests covering the complete contact/appointment user journey: booking an appointment through the 3-step flow and submitting a contact message.

#### Spec Reference

`docs/specs/us-05-contact-sales.md`

#### Agent Assignment

Agent: `frontend`

#### Dependencies

- P2-002 — Playwright E2E infrastructure
- P2-013 — API client refactor (real backend)

#### Acceptance Criteria

- [ ] Contact page loads with sales expert card visible
- [ ] "Book Appointment" tab displays available dates
- [ ] Selecting a date shows time slots
- [ ] Selecting a time shows summary banner
- [ ] Filling in name and email enables the submit button
- [ ] Submitting shows confirmation with appointment details
- [ ] "Book Another" resets the form
- [ ] "Send Message" tab renders the message form
- [ ] Filling required fields and submitting shows success confirmation
- [ ] Validation errors display for empty required fields
- [ ] Tests in `e2e/contact-sales.spec.ts`

#### Technical Notes

- Test both happy path and validation error scenarios
- Verify submit button disabled states
- Use accessible form field selectors (label text)

---

### P2-023: Accessibility Audit & WCAG Remediation

#### Description

Perform a comprehensive accessibility audit against WCAG 2.2 AA standards. Use automated tools (axe-core) integrated into tests and manual keyboard/screen reader testing. Fix all identified issues.

#### Spec Reference

All specs — AC items referencing ARIA attributes, keyboard navigation, responsive layout

#### Agent Assignment

Agent: `frontend`

#### Dependencies

- P2-015 through P2-019 — Feature page tests (so we have test coverage before modifying components)

#### Acceptance Criteria

- [ ] `@axe-core/react` or `vitest-axe` integrated into component tests
- [ ] Zero critical or serious axe violations across all pages
- [ ] All interactive elements reachable via keyboard (Tab, Shift+Tab)
- [ ] All interactive elements activatable via Enter or Space
- [ ] Focus indicators visible on all focusable elements
- [ ] All form inputs have associated `<label>` elements with `htmlFor`
- [ ] All images/icons have appropriate alt text or `aria-hidden`
- [ ] Color contrast ratios meet AA minimums (4.5:1 for text, 3:1 for large text)
- [ ] Comparison bar, modals, and sheets manage focus correctly (focus trap)
- [ ] Screen reader announces page transitions (live region or document title update)
- [ ] Landmark roles defined: `<header>`, `<main>`, `<footer>`, `<nav>`

#### Technical Notes

- Install `vitest-axe` for unit test accessibility checks
- Add `axe-playwright` for E2E accessibility scans
- Run Lighthouse accessibility audit and record scores
- Fix issues in priority order: critical → serious → moderate → minor

---

### P2-024: Structured Logging

#### Description

Replace any `console.log` usage with a structured logger. Add request logging middleware to the backend API. Configure log levels and output formats for development and production.

#### Spec Reference

Cross-cutting — workspace instructions: "Do not use `console.log` for production code — use a structured logger"

#### Agent Assignment

Agent: `backend`

#### Dependencies

- P2-009 — Product API endpoints (Supabase)

#### Acceptance Criteria

- [ ] Structured logger library installed (pino, winston, or similar)
- [ ] Logger configured with levels: debug, info, warn, error
- [ ] JSON output format for production, pretty-print for development
- [ ] Request logging middleware: method, path, status code, duration
- [ ] Error logging with stack traces and request context
- [ ] No `console.log` or `console.error` in production code
- [ ] Logger exported from a shared module (`src/lib/logger.ts` or similar)

#### Technical Notes

- pino is recommended for performance (especially with Fastify)
- Include correlation IDs for request tracing if using a multi-service architecture
- Frontend: consider a lightweight browser logger for error boundaries

---

### P2-025: Authentication & User Sessions

#### Description

Implement authentication using Supabase Auth for user sessions. Add protected routes for administrative actions (re-seed, appointment management) and optional user identity for contact forms.

#### Spec Reference

Cross-cutting — security requirements

#### Agent Assignment

Agent: `backend`

#### Dependencies

- P2-009 — Product API endpoints (Supabase)

#### Acceptance Criteria

- [ ] Supabase Auth configured with email/password provider
- [ ] `POST /data/reseed` requires authenticated admin role
- [ ] Appointment and contact endpoints accept optional authenticated user context
- [ ] Row Level Security policies updated for authenticated vs. anonymous access
- [ ] Auth middleware validates JWT tokens from Supabase
- [ ] Frontend: Supabase Auth UI for admin login (optional, low priority)
- [ ] Public endpoints (products, filters, options) remain unauthenticated

#### Technical Notes

- Products read access should remain public (anon key)
- Admin operations behind a service role key or authenticated admin check
- Consider Supabase's built-in RLS+Auth integration for simplicity
- User sessions are not required for the primary product finder experience

---

### P2-026: Input Sanitization & Security Hardening

#### Description

Audit and harden all user input handling across the application. Ensure defense-in-depth with server-side validation, input sanitization, and protection against common attack vectors.

#### Spec Reference

Cross-cutting — OWASP Top 10, workspace security rules

#### Agent Assignment

Agent: `backend`

#### Dependencies

- P2-009 — Product API endpoints (Supabase)
- P2-011 — Appointment & contact endpoints (Supabase)

#### Acceptance Criteria

- [ ] All user inputs sanitized before database insertion (strip HTML, limit length)
- [ ] Email validation uses a robust regex on both frontend and backend
- [ ] Appointment name, message fields sanitized (no script injection)
- [ ] Contact form subject, message, company fields sanitized
- [ ] SQL injection prevented (parameterized queries verified through code review)
- [ ] XSS prevention: React's default escaping verified, no `dangerouslySetInnerHTML` usage
- [ ] Rate limiting on POST endpoints (appointments, contact) to prevent abuse
- [ ] CORS configured to allow only the deployed frontend origin
- [ ] HTTP security headers: X-Content-Type-Options, X-Frame-Options, Strict-Transport-Security

#### Technical Notes

- Use a sanitization library (e.g., `sanitize-html` or `DOMPurify` for any rich text)
- Input length limits: name (200 chars), email (254 chars), message (5000 chars), subject (500 chars)
- Rate limiting: 10 requests/minute per IP for POST endpoints
- Supabase Edge Functions have built-in CORS support

---

### P2-027: Performance Optimization & Bundle Analysis

#### Description

Analyze and optimize the application bundle size, runtime performance, and loading times. Ensure lazy loading is effective and identify opportunities for code splitting.

#### Spec Reference

Cross-cutting — production readiness

#### Agent Assignment

Agent: `frontend`

#### Dependencies

- P2-012 — React Query integration

#### Acceptance Criteria

- [ ] Bundle analyzer report generated (`rollup-plugin-visualizer` or `vite-bundle-analyzer`)
- [ ] Total bundle size documented (target: < 200KB gzipped for main bundle)
- [ ] All feature pages lazy-loaded and verified in network tab
- [ ] React Query deduplicates API requests (no duplicate fetches)
- [ ] Images/assets optimized (if any)
- [ ] Lighthouse performance score > 90 on deployed site
- [ ] Largest Contentful Paint (LCP) < 2.5 seconds
- [ ] Total Blocking Time (TBT) < 200ms
- [ ] No unused dependencies identified and removed

#### Technical Notes

- Use `npx vite-bundle-visualizer` or add `rollup-plugin-visualizer` to vite config
- Check for tree-shaking effectiveness on Zustand, React Router, React Query
- Consider preloading critical routes
- Audit `pnpm-lock.yaml` for duplicate or unnecessary transitive dependencies

---

### P2-028: CI Pipeline — Test Gates & Lint Checks

#### Description

Configure GitHub Actions CI pipeline with test gates that block PR merges on failure. Include linting, type checking, unit tests, and E2E tests.

#### Spec Reference

Cross-cutting — CI/CD maturity

#### Agent Assignment

Agent: `backend`

#### Dependencies

- P2-020 — E2E test: Product discovery flow
- P2-021 — E2E test: Product comparison flow
- P2-022 — E2E test: Contact & appointment flow

#### Acceptance Criteria

- [ ] GitHub Actions workflow: `.github/workflows/ci.yml`
- [ ] Pipeline stages: install → lint → typecheck → unit test → build → E2E test
- [ ] `pnpm lint` must pass (ESLint)
- [ ] `pnpm tsc --noEmit` must pass (TypeScript type check)
- [ ] `pnpm test` must pass (Vitest unit tests)
- [ ] `pnpm build` must succeed
- [ ] `pnpm test:e2e` must pass (Playwright E2E tests)
- [ ] Coverage report uploaded as CI artifact
- [ ] Playwright report uploaded as CI artifact on failure
- [ ] Branch protection rule requires CI to pass before merge
- [ ] Pipeline runs on push to `main` and on all pull requests

#### Technical Notes

- Use `pnpm` for package installation in CI
- Cache `node_modules` and Playwright browsers for faster runs
- Playwright in CI: use `--reporter=html` and upload the report folder
- Consider parallel jobs: lint+typecheck | unit tests | E2E tests

---

## Priority Summary

### High Priority (Tier 0–2) — Do First

Foundation tasks that unblock everything else:

| Tasks | Description |
|-------|-------------|
| P2-001, P2-002 | Test infrastructure (Vitest + Playwright) |
| P2-003 | Supabase database schema |
| P2-004 – P2-007 | Unit tests for existing components, hooks, stores, API |
| P2-008 – P2-011 | Backend migration to Supabase |

### Medium Priority (Tier 3–5) — Core Improvements

Major functionality upgrades and comprehensive testing:

| Tasks | Description |
|-------|-------------|
| P2-012, P2-013 | React Query integration + API client refactor |
| P2-014 | Full-text search |
| P2-015 – P2-019 | Feature page unit/integration tests |
| P2-020 – P2-022 | E2E tests for all user flows |
| P2-023 | Accessibility audit & remediation |
| P2-026 | Security hardening |

### Low Priority (Tier 6) — Polish & Hardening

Production readiness and operational maturity:

| Tasks | Description |
|-------|-------------|
| P2-024 | Structured logging |
| P2-025 | Authentication |
| P2-027 | Performance optimization |
| P2-028 | CI pipeline |

---

## Parallel Execution Strategy

Frontend and backend agents can work in parallel on independent tiers:

```
Week 1:  frontend → P2-001, P2-002     |  backend → P2-003
Week 2:  frontend → P2-004 – P2-007    |  backend → P2-008 – P2-011
Week 3:  frontend → P2-012, P2-013     |  backend → P2-014
Week 4:  frontend → P2-015 – P2-019    |  backend → P2-024, P2-025
Week 5:  frontend → P2-020 – P2-023    |  backend → P2-026
Week 6:  frontend → P2-027             |  backend → P2-028
```

## Cross-References

- Phase 1 plan: `docs/plan/implementation-plan.md`
- Phase 1 task details: `docs/plan/tasks-tier-0.md` through `docs/plan/tasks-tier-5-6.md`
- Functional specs: `docs/specs/us-01-app-shell-and-filters.md` through `docs/specs/us-05-contact-sales.md`
