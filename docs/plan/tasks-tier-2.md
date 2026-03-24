# T-007: App Shell & Routing

## Description

Build the application shell (Layout component) with persistent header, footer, mobile navigation, and route configuration. The shell wraps all pages and provides consistent branding and navigation.

## Spec Reference

`docs/specs/us-01-app-shell-and-filters.md`

## Agent Assignment

Agent: `frontend`

## Dependencies

- T-003 (UI primitive components)
- T-006 (API client layer)

## Acceptance Criteria

- [ ] Layout component renders header, main content area, and footer on every page
- [ ] Header is sticky with KLEB. logo (links to home), navigation links (Product Finder, Products, Compare, Contact), and CTA buttons
- [ ] Mobile navigation: hamburger menu opens a slide-out panel from the right with all nav items
- [ ] Footer: 4-column responsive grid (1 col mobile, 2 col tablet, 4 col desktop) with product/support/company links and copyright
- [ ] Route configuration with lazy-loaded pages for: / (Product Finder), /products (Catalog), /products/:id (Detail), /compare (Compare), /contact (Contact)
- [ ] Active navigation state highlights current page
- [ ] All nav links have proper ARIA labels
- [ ] Responsive across mobile, tablet, and desktop

## Technical Notes

- Use React Router v6+ with lazy() for code splitting
- Place in `src/features/app-shell/` or root level
- Navigation items: Product Finder (/), Products (/products), Compare (/compare), Contact (/contact)

---

# T-008: Product Data Provider (Global State)

## Description

Create a global data provider that fetches products, filters, and options from the backend on app initialization and distributes them via state management. Handles loading and error states.

## Spec Reference

`docs/specs/us-01-app-shell-and-filters.md`

## Agent Assignment

Agent: `frontend`

## Dependencies

- T-006 (API client layer)
- T-004 (Product API endpoints)
- T-005 (Filter & options API endpoints)

## Acceptance Criteria

- [ ] Provider fetches products, filters, and options in parallel on mount
- [ ] Exposes: products, options, filters, loading, error, refetch
- [ ] Loading state shows while any fetch is in progress
- [ ] Error state shows on any fetch failure with a "Retry" action
- [ ] Data is accessible from any component in the app
- [ ] Uses React Query or Zustand for state management

## Technical Notes

- Can be implemented as a React Query provider pattern or a Zustand store hydrated on mount
- Place in `src/stores/` or `src/hooks/`

---

# T-009: Comparison State Management

## Description

Implement the global comparison state that persists across page navigation, supporting up to 4 selected product IDs with add, remove, and clear actions.

## Spec Reference

`docs/specs/us-04-product-compare.md`

## Agent Assignment

Agent: `frontend`

## Dependencies

- T-002 (Shared TypeScript types)

## Acceptance Criteria

- [ ] Zustand store with: compareList (string[]), addToCompare(id), removeFromCompare(id), clearCompare()
- [ ] Maximum of 4 products enforced — addToCompare is a no-op beyond 4
- [ ] State persists across page navigation
- [ ] Store placed in `src/stores/comparison-store.ts`
- [ ] Custom hook `useComparisonStore()` exported for component usage

## Technical Notes

- Use Zustand for simplicity and persistence
- No need for server-side persistence — client-only state
