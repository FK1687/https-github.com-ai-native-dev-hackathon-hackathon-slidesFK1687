# T-003: UI Primitive Components

## Description

Build the shared, reusable UI primitive components used across all features: Button, Card, Input, Select, Badge, Separator, Modal/Sheet, Skeleton, Tabs, Accordion, Slider, Checkbox, and Tooltip. All must follow the KLEB. design system with design tokens.

## Spec Reference

`docs/specs/us-01-app-shell-and-filters.md`

## Agent Assignment

Agent: `frontend`

## Dependencies

None — this task can start immediately.

## Acceptance Criteria

- [ ] Button component with variants (solid, outline, ghost) and sizes
- [ ] Card component with bordered container
- [ ] Input component with icon support and clearable variant
- [ ] Select/Dropdown component
- [ ] Badge component with variants (default, outline, secondary)
- [ ] Separator component (horizontal divider)
- [ ] Sheet/Modal component (slide-out panel for mobile)
- [ ] Skeleton component for loading states
- [ ] Tabs component (TabsList, TabsTrigger, TabsContent)
- [ ] Accordion component (multi-open, collapsible sections)
- [ ] Slider component (dual-thumb range slider)
- [ ] Checkbox component
- [ ] Tooltip component
- [ ] All components accept `className` prop for customization
- [ ] All components use design tokens — no hardcoded colors/spacing
- [ ] All interactive components have proper ARIA attributes
- [ ] Components placed in `src/components/ui/`

## Technical Notes

- Use design tokens from `guidelines/` for all visual properties
- KLEB. brand: dark backgrounds, green accent (#00DF75), zero border-radius
- Forward refs where applicable
- Keep each component under 300 lines

---

# T-004: Product API Endpoints

## Description

Implement the REST API endpoints for products: list all products, get single product by ID, and health check. Endpoints should use service functions for business logic.

## Spec Reference

`docs/specs/us-01-app-shell-and-filters.md`

## Agent Assignment

Agent: `backend`

## Dependencies

- T-001 (Database schema & seed data)
- T-002 (Shared TypeScript types)

## Acceptance Criteria

- [ ] GET /products returns all products array
- [ ] GET /products/:id returns a single product by ID
- [ ] GET /health returns health status
- [ ] POST /data/reseed triggers re-seeding
- [ ] Auto-seed on first request if data doesn't exist
- [ ] All responses use consistent shapes defined in T-002
- [ ] Error responses use `{ error: string, code: string }` format
- [ ] No business logic in route handlers — use service functions
- [ ] Parameterized queries only — no string concatenation

## Technical Notes

- Business logic in service functions (`src/api/services/`)
- Input validation at handler boundary
- Structured logging — no `console.log`

---

# T-005: Filter & Options API Endpoints

## Description

Implement API endpoints for retrieving filter configurations and label/option mappings used by the frontend filter panel.

## Spec Reference

`docs/specs/us-01-app-shell-and-filters.md`

## Agent Assignment

Agent: `backend`

## Dependencies

- T-001 (Database schema & seed data)
- T-002 (Shared TypeScript types)

## Acceptance Criteria

- [ ] GET /filters returns filter configuration (categories, applications, adhesiveTypes, substrates, environments, certifications, properties, temperatureRange, adhesionRange)
- [ ] GET /options returns label mappings for all enum types (categoryLabels, applicationLabels, adhesiveLabels, substrateLabels, environmentLabels, certificationLabels)
- [ ] Responses match the FilterConfiguration and OptionsData interfaces from T-002
- [ ] Error responses use consistent shape

## Technical Notes

- Filter config and options can be derived from seed data or stored separately
- These endpoints are called in parallel with /products on app init

---

# T-006: API Client Layer

## Description

Create the centralized API client layer that all frontend components use to make API calls. Includes typed request functions for all backend endpoints and React Query hooks for data fetching.

## Spec Reference

`docs/specs/us-01-app-shell-and-filters.md`

## Agent Assignment

Agent: `frontend`

## Dependencies

- T-002 (Shared TypeScript types)

## Acceptance Criteria

- [ ] API client module in `src/api/` with base URL configuration
- [ ] Typed fetch functions: `fetchProducts()`, `fetchProduct(id)`, `fetchFilters()`, `fetchOptions()`
- [ ] React Query hooks: `useProducts()`, `useProductDetail(id)`, `useFilters()`, `useOptions()`
- [ ] Error handling with consistent error shapes
- [ ] No direct fetch calls in components — all go through this layer
- [ ] Environment variable for API base URL

## Technical Notes

- Use React Query for caching, refetching, and loading state management
- Configure sensible stale times and cache times
- Export from `src/api/index.ts`
