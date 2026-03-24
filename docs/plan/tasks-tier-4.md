# T-013: Product Finder Page (Filters + Results)

## Description

Build the Product Finder home page with a hero section, search bar, multi-faceted filter panel (Tier A and Tier B), sort controls, view mode toggle, product results grid, and pagination. This is the primary product discovery interface.

## Spec Reference

`docs/specs/us-01-app-shell-and-filters.md`

## Agent Assignment

Agent: `frontend`

## Dependencies

- T-008 (Product data provider)
- T-010 (ProductCard component)
- T-011 (PaginationControls component)

## Acceptance Criteria

- [ ] Hero section with badge, heading, description, and search input
- [ ] Search filters by name, SKU, description, material, and tags
- [ ] Toolbar: product count, active filter count with "Clear N filters", sort dropdown, view toggle, mobile filter trigger
- [ ] Filter panel: Tier A filters expanded by default (Category, Application, Temperature Range, Adhesion Strength, Properties)
- [ ] Filter panel: Tier B filters collapsed by default (Adhesive Type, Substrate, Environment, Certification)
- [ ] Filter logic: OR for multi-select facets, AND for properties, overlap for temperature, containment for adhesion
- [ ] Sort options: Name (A-Z), Adhesion Low→High, Adhesion High→Low, Temperature Range
- [ ] Results: Grid/Table view toggle
- [ ] Pagination: 24 items per page, resets to page 1 on any filter/sort change
- [ ] "Reset All Filters" button when any filter is active
- [ ] Desktop: sidebar filter panel; Mobile: slide-out sheet
- [ ] Responsive across all breakpoints

## Technical Notes

- Place in `src/features/product-finder/`
- Filter state managed locally with `useState` or in a Zustand filter store
- Client-side filtering using the `filterProducts()` logic from the data model
- Keep page component under 300 lines — split filter panel into subcomponent

---

# T-014: Product Catalog Page

## Description

Build the Product Catalog page with category filtering, text search, grid/list view modes, and pagination. Supports deep-linking via URL category parameter.

## Spec Reference

`docs/specs/us-02-product-catalog.md`

## Agent Assignment

Agent: `frontend`

## Dependencies

- T-008 (Product data provider)
- T-010 (ProductCard component)
- T-011 (PaginationControls component)

## Acceptance Criteria

- [ ] Page heading "All Products" with description and search bar
- [ ] Category dropdown with "All Categories" plus 10 categories from backend labels
- [ ] URL query parameter `?category=` pre-selects category on load
- [ ] Grid view (default): responsive columns (1/2/3/4 col)
- [ ] List view: horizontal rows with SKU, category, name, description, specs, actions
- [ ] Mobile: hide certain columns (adhesion, temperature) in list view
- [ ] Product count display (e.g., "124 products")
- [ ] Empty state: search icon + "No products found" + guidance text
- [ ] Pagination: 24 per page, resets on search/category change
- [ ] "Add to Compare" and "View Detail" on each product
- [ ] Entry animations (staggered fade-in)
- [ ] Responsive across all breakpoints

## Technical Notes

- Place in `src/features/product-catalog/`
- Use `useSearchParams()` for URL-based category filtering
- Search matches: name, SKU, material, shortDescription

---

# T-015: Product Detail Page

## Description

Build the Product Detail page with breadcrumb navigation, product header, tabbed specifications (Specifications, Dimensions, Resistance), and a related products section.

## Spec Reference

`docs/specs/us-03-product-detail.md`

## Agent Assignment

Agent: `frontend`

## Dependencies

- T-008 (Product data provider)
- T-010 (ProductCard component)
- T-009 (Comparison state management)

## Acceptance Criteria

- [ ] Route: `/products/:id`
- [ ] Breadcrumb: Products > {Category} > {Product Name} with working links
- [ ] Product header: category badge, SKU, environment badge, name, description, material card, adhesive type card, application badges, certification badges
- [ ] Action buttons: "Technical Data Sheet" (primary), "Add to Compare" toggle
- [ ] Specifications tab: key-value table (category, material, adhesive type, adhesion, temp range, shelf life, environment, color)
- [ ] Dimensions tab: available widths (mm) and lengths (m) as chips
- [ ] Resistance tab: grid of 8 boolean properties with active/inactive indicators
- [ ] Related products: cards from same category (excluding current), horizontally scrollable
- [ ] "Product Not Found" state for invalid IDs with link to catalog
- [ ] Responsive across all breakpoints

## Technical Notes

- Place in `src/features/product-detail/`
- Use route params to fetch product ID
- Category breadcrumb links to `/products?category={category}`

---

# T-016: Product Compare Page

## Description

Build the Product Compare page with side-by-side comparison table, searchable product selector, empty state, and per-product removal.

## Spec Reference

`docs/specs/us-04-product-compare.md`

## Agent Assignment

Agent: `frontend`

## Dependencies

- T-009 (Comparison state management)
- T-008 (Product data provider)
- T-010 (ProductCard component)

## Acceptance Criteria

- [ ] Route: `/compare`
- [ ] Empty state: message, guidance, "Browse Products" button when no products selected
- [ ] Header: "Compare Products", "Clear all", "Add Product", "Back to Products"
- [ ] Side-by-side table: products as columns, specification rows (category, material, adhesive type, adhesion, temp range, shelf life, environment, color, 8 boolean properties)
- [ ] Boolean values: visual Yes/No indicators with accessible labels
- [ ] Remove button on each product column header
- [ ] "View Details" link per product navigating to detail page
- [ ] Searchable product selector: text search, shows name + category + SKU + description, excludes already-selected products, shows result count
- [ ] Max 4 products enforced
- [ ] Responsive: horizontal scroll on mobile for the comparison table

## Technical Notes

- Place in `src/features/product-compare/`
- Product selector can be a dropdown/popover with search input
