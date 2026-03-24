# T-010: ProductCard Component

## Description

Build the reusable ProductCard component displayed across the Product Finder, Product Catalog (grid view), and related products sections. Shows product thumbnail, name, category, SKU, key specs, resistance indicators, and action buttons.

## Spec Reference

`docs/specs/us-01-app-shell-and-filters.md`, `docs/specs/us-02-product-catalog.md`

## Agent Assignment

Agent: `frontend`

## Dependencies

- T-003 (UI primitive components)
- T-008 (Product data provider)
- T-009 (Comparison state management)

## Acceptance Criteria

- [ ] Displays: category badge, SKU, product name, short description (2-line clamp)
- [ ] Key specs section (unless `compact` prop): adhesion strength + temperature range in bordered boxes
- [ ] Resistance indicators: up to 4 icons with tooltip showing active/inactive state, "+N" overflow
- [ ] "Add to Compare" toggle button (check icon when product is in comparison list)
- [ ] "View Detail" button that navigates to `/products/:id`
- [ ] Keyboard accessible: role="button", tabIndex, Enter/Space support
- [ ] Proper `aria-label` on all interactive elements
- [ ] `compact` prop hides the spec boxes (used in catalog grid)
- [ ] Placed in `src/components/ui/` or `src/features/shared/`

## Technical Notes

- Reads comparison state from `useComparisonStore()`
- Uses design tokens for all styling
- Keep under 300 lines

---

# T-011: PaginationControls Component

## Description

Build the reusable pagination component used across Product Finder and Product Catalog pages. Shows item range, page navigation with numbered buttons, and smooth scroll behavior.

## Spec Reference

`docs/specs/us-01-app-shell-and-filters.md`, `docs/specs/us-02-product-catalog.md`

## Agent Assignment

Agent: `frontend`

## Dependencies

- T-003 (UI primitive components)

## Acceptance Criteria

- [ ] Displays "Showing X - Y of Z products" text
- [ ] Previous/Next navigation buttons
- [ ] Numbered page buttons with ellipsis for large page counts
- [ ] Active page visually highlighted with `aria-current="page"`
- [ ] Smooth scroll to target element or page top on page change
- [ ] Props: currentPage, totalPages, totalItems, itemsPerPage, onPageChange, scrollTargetId
- [ ] All buttons have `aria-label` attributes
- [ ] Placed in `src/components/ui/`

## Technical Notes

- Scroll target via `scrollTargetId` prop for anchor scrolling
- Show ellipsis for page ranges > 7

---

# T-012: CompareBar Component

## Description

Build the sticky comparison bar that appears at the bottom of the viewport when products are selected for comparison. Shows selected products as removable chips with navigation to the compare page.

## Spec Reference

`docs/specs/us-04-product-compare.md`

## Agent Assignment

Agent: `frontend`

## Dependencies

- T-009 (Comparison state management)
- T-007 (App shell & routing)

## Acceptance Criteria

- [ ] Fixed at bottom of viewport, only visible when compareList.length > 0
- [ ] Animates in/out (slide up/down)
- [ ] Shows "Compare" label, selected product names as removable chips, counter badge "{count}/4"
- [ ] Each chip has a remove button with `aria-label="Remove {product name} from comparison"`
- [ ] "Clear" ghost button removes all products
- [ ] "Compare" solid button navigates to `/compare`
- [ ] Chips are horizontally scrollable on small viewports
- [ ] Placed in the app shell layout (after main content, before footer)

## Technical Notes

- Reads state from `useComparisonStore()`
- Needs product names resolved from product data
- Use CSS animation or a transition library for slide animation
