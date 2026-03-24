# US-02: Product Catalog

## Overview

A full browsable product catalog page that allows users to explore all ~796 adhesive products with category filtering, text search, grid/list view modes, and pagination. Integrates with the cross-page comparison feature.

## User Stories

- As a user browsing the KLEB. product range, I want a catalog page with category tabs, search, and switchable views, so that I can explore all products and find what I need.

## Functional Requirements

1. The catalog page must display a heading ("All Products"), a description, and a search bar at the top.
2. The search bar must filter products by name, SKU, material, and short description.
3. A category dropdown must allow selecting from "All Categories" plus the 10 product categories (labels loaded from the backend).
4. The page must support pre-selecting a category via a URL query parameter (e.g., `?category=packaging`).
5. A view toggle must switch between grid view (default) and list view.
6. Grid view must display products using a card component with product thumbnail, name, category, SKU, key specs, resistance indicators, and action buttons.
7. In grid view with compact mode, the technical specification boxes (adhesion/temperature) are hidden to save space.
8. List view must display products as horizontal rows showing SKU, category badge, product name, short description, adhesion value, temperature range, and action buttons.
9. On mobile, certain data columns (adhesion, temperature) are hidden in list view.
10. Results must show a product count (e.g., "124 products").
11. An empty state must be shown when no products match the search/category with a search icon and guidance text ("No products found").
12. Pagination must be at 24 products per page with controls showing "Showing X - Y of Z products", previous/next buttons, and numbered page buttons.
13. Pagination resets to page 1 when search or category changes.
14. Each product card/row must have an "Add to Compare" toggle and a "View Detail" button.
15. Entry animations must stagger per card/row for visual polish.

## Data Model

Uses the shared Product model from US-01 (see [us-01-app-shell-and-filters.md](us-01-app-shell-and-filters.md#data-model)).

### Page State

| State | Type | Default | Purpose |
|-------|------|---------|---------|
| search | string | "" | Text search filter |
| selectedCategory | string | "all" (or from URL) | Active category filter |
| viewMode | "grid" or "list" | "grid" | Display mode toggle |
| currentPage | number | 1 | Current pagination page |

## User Flows

### Browse Catalog
1. User navigates to the catalog page.
2. All products are shown in grid view, paginated at 24 per page.
3. User can change category via the dropdown to filter products.
4. User can search by typing in the search bar.
5. User can toggle between grid and list views.

### Deep Link to Category
1. User follows a link with a category parameter (e.g., from the footer or another page).
2. The catalog page loads with that category pre-selected.
3. Products are filtered to show only that category.

### Add to Comparison
1. User clicks "Add to Compare" on a product card/row.
2. The product is added to the comparison tray (visible at bottom of page).
3. The button toggles to a "checked" state.
4. User can add up to 4 products for comparison.

## Business Rules

- BR-01: Search matches against name, SKU, material, and short description (case-insensitive).
- BR-02: Category filter shows only products matching the selected category; "All Categories" shows all.
- BR-03: Pagination uses 24 items per page.
- BR-04: Page resets to 1 on search or category change.
- BR-05: Comparison list is shared across all pages and supports a maximum of 4 products.

## Acceptance Criteria

- [ ] AC-01: Catalog page displays all products in a paginated grid view by default.
- [ ] AC-02: Search filters products by name, SKU, material, and short description.
- [ ] AC-03: Category dropdown filters products; pre-selects from URL parameter if provided.
- [ ] AC-04: Grid view renders responsive columns: 1 col mobile, 2 col tablet, 3 col large, 4 col extra-large.
- [ ] AC-05: List view renders products as horizontal rows with relevant data columns.
- [ ] AC-06: View toggle switches between grid and list modes.
- [ ] AC-07: Pagination shows 24 products per page with correct "Showing X - Y of Z" display.
- [ ] AC-08: Empty state displays when no products match the current filters.
- [ ] AC-09: "Add to Compare" toggles product in the comparison list (max 4).
- [ ] AC-10: "View Detail" navigates to the product detail page.
- [ ] AC-11: Search input has a clear button and appropriate accessibility label.
- [ ] AC-12: All interactive elements have keyboard navigation and ARIA attributes.
- [ ] AC-13: Layout is responsive across mobile, tablet, and desktop breakpoints.

## Cross-References

- Related: US-01 (App Shell & Filters) — shares ProductCard component, pagination controls, and data model.
- Related: US-03 (Product Detail) — "View Detail" links to the product detail page.
- Related: US-04 (Product Compare) — "Add to Compare" integrates with the comparison state.
