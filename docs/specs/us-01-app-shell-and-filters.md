# US-01: Application Shell, Navigation, and Product Finder

## Overview

The application shell provides persistent branding, navigation, and a product comparison bar across all pages. The home page is a guided Product Finder that enables users to narrow down ~796 adhesive products using multi-faceted filters, search, sorting, and paginated results.

## User Stories

- As a user visiting the KLEB. Product Finder, I want a consistent application shell with persistent navigation, a branded header, and a comprehensive footer, so that I can navigate between all sections of the application seamlessly.
- As a user on the Product Finder (home page), I want a multi-faceted filter panel with collapsible/expandable sections, search, and paginated results, so that I can narrow down ~796 products to find the right adhesive for my use case.

## Functional Requirements

1. The application must display a persistent header, main content area, comparison bar, and footer on every page.
2. The header must be sticky and contain the KLEB. logo (links to home), primary navigation links (Product Finder, Products, Compare, Contact), and call-to-action buttons ("Search Products", "Find Product").
3. On mobile viewports, the navigation must collapse into a hamburger menu that opens a slide-out panel from the right side.
4. The footer must display a 4-column grid (responsive: 1 col mobile, 2 col tablet, 4 col desktop) with product links, support links, company links, and copyright information.
5. The comparison bar must appear at the bottom of the viewport when one or more products are selected for comparison, showing selected product names as removable chips, a counter (e.g., "2/4"), a "Clear" action, and a "Compare" action that navigates to the comparison page.
6. The comparison bar must animate into view when products are added and out of view when cleared.
7. On page load, the system must fetch all products, filter configurations, and label mappings from the backend in parallel.
8. A loading state must be shown while data is fetching (spinner + "Loading products from database...").
9. An error state must be shown on fetch failure with a "Retry" button.
10. The Product Finder page must display a hero section with a badge ("Product Finder"), heading, description, and a search input.
11. The search input must filter products by name, SKU, description, material, and tags.
12. A toolbar must show the total product count (e.g., "796 products found"), an active filter indicator with "Clear N filters" link, a sort dropdown, a view mode toggle (Table/Grid), and a mobile filter trigger button.
13. The filter panel must be a sidebar on desktop and a slide-out sheet on mobile.
14. The filter panel must contain Tier A filters (default expanded) and Tier B filters (default collapsed) organized in collapsible accordion sections.
15. Results must be paginated at 24 products per page, resetting to page 1 when any filter or sort changes.

## Data Model

### Product

| Attribute | Type | Description |
|-----------|------|-------------|
| id | string | Unique identifier |
| name | string | Product name |
| sku | string | Stock keeping unit code |
| category | string (enum) | One of 10 product categories |
| application | string[] | Array of applicable application types (14 types) |
| material | string | Material composition |
| adhesiveType | string (enum) | One of 12 adhesive types |
| description | string | Full product description |
| shortDescription | string | Brief product description |
| properties | object | Boolean resistance/feature properties (see below) |
| availableWidths | number[] | Available widths in mm |
| availableLengths | number[] | Available lengths in m |
| color | string | Product color |
| substrate | string[] | Compatible substrate types (14 types) |
| environment | string (enum) | Operating environment (5 types) |
| certification | string[] | Industry certifications (10 types) |
| shelfLife | number | Shelf life in months |
| tags | string[] | Searchable tags |

### Product Properties (Boolean Flags)

| Property | Description |
|----------|-------------|
| uvResistance | UV light resistance |
| waterResistance | Water/moisture resistance |
| solventResistance | Chemical solvent resistance |
| foodSafe | Food-contact safe |
| flameRetardant | Flame retardancy |
| antistatic | Antistatic properties |
| transparentBond | Transparent bonding |
| removable | Removable/repositionable |

### Filter Configuration

| Attribute | Type | Description |
|-----------|------|-------------|
| categories | string[] | Available product categories |
| applications | string[] | Available application types |
| adhesiveTypes | string[] | Available adhesive types |
| substrates | string[] | Available substrate types |
| environments | string[] | Available environment types |
| certifications | string[] | Available certifications |
| properties | string[] | Available boolean property names |
| temperatureRange | { min, max } | Global temperature range bounds (default: -70°C to 260°C) |
| adhesionRange | { min, max } | Global adhesion strength bounds (default: 0 to 15 N/25mm) |

### Label Mappings

Dictionaries mapping internal enum values to human-readable labels for: categories, applications, adhesive types, substrates, environments, certifications.

## User Flows

### Page Load
1. User navigates to the home page.
2. System fetches products, filters, and label mappings from the backend in parallel.
3. While loading, a spinner with "Loading products from database..." is shown.
4. On success, the Product Finder displays all products with default filter state.
5. On failure, an error message with a "Retry" button is shown.

### Filtering Products
1. User expands a filter section in the accordion.
2. User selects a filter value (checkbox, slider, or toggle chip).
3. The product list updates in real-time to show matching products.
4. The toolbar updates the product count and shows the number of active filters.
5. Pagination resets to page 1.

### Search
1. User types in the search bar.
2. Products are filtered by matching name, SKU, description, material, or tags.
3. A clear button appears to reset the search.

### Sort
1. User selects a sort option from the dropdown.
2. Options: Name (A-Z), Adhesion: Low to High, Adhesion: High to Low, Temperature Range.
3. Product list re-orders accordingly.

## Business Rules

- BR-01: Filter logic for multi-select facets (category, application, adhesive type, substrate, environment, certification) uses inclusive OR — any matching value qualifies the product.
- BR-02: Filter logic for properties uses AND — all selected properties must be true on the product.
- BR-03: Temperature range filter uses overlap — the product's temperature range must overlap with the selected range.
- BR-04: Adhesion range filter uses containment — the product's adhesion value must fall within the selected range.
- BR-05: Text search matches across name, SKU, description, material, and tags (case-insensitive).
- BR-06: Pagination uses 24 items per page.
- BR-07: Pagination resets to page 1 on any filter, search, or sort change.
- BR-08: Comparison list supports a maximum of 4 products and persists across navigation.

## Filter Tiers

### Tier A (Default Expanded)

| Filter | Control Type | Options |
|--------|-------------|---------|
| Category | Checkbox list | 10 product categories |
| Application | Toggle chips | 14 application types |
| Temperature Range | Dual-thumb range slider | -70°C to 260°C |
| Adhesion Strength | Dual-thumb range slider | 0 to 15 N/25mm |
| Properties | Checkbox list with icons | 8 boolean properties |

### Tier B (Default Collapsed)

| Filter | Control Type | Options |
|--------|-------------|---------|
| Adhesive Type | Checkbox list | 12 adhesive types |
| Substrate | Toggle chips | 14 substrate types |
| Environment | Checkbox list | 5 environment types |
| Certification | Toggle chips | 10 certifications |

A "Reset All Filters" button appears when any filter is active.

## Backend API Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| /products | GET | Returns all products (auto-seeds on first call) |
| /products/:id | GET | Returns a single product by ID |
| /filters | GET | Returns filter configuration |
| /options | GET | Returns label/option mappings |
| /data/reseed | POST | Force re-seed product data |
| /health | GET | Health check |

## Acceptance Criteria

- [ ] AC-01: Application shell renders header, main content, comparison bar, and footer on every page.
- [ ] AC-02: Navigation links (Product Finder, Products, Compare, Contact) work and highlight the active page.
- [ ] AC-03: Mobile menu opens/closes and contains all navigation items.
- [ ] AC-04: Footer displays 4-column layout (responsive) with all link groups.
- [ ] AC-05: Product data, filters, and options load from the backend on page load.
- [ ] AC-06: Loading and error states display correctly.
- [ ] AC-07: Search filters products by name, SKU, description, material, and tags.
- [ ] AC-08: All Tier A and Tier B filters work with correct logic (OR for multi-select, AND for properties, overlap for ranges).
- [ ] AC-09: Products re-filter and pagination resets on any filter/sort change.
- [ ] AC-10: Sort options produce correctly ordered results.
- [ ] AC-11: Pagination shows 24 products per page with correct "Showing X - Y of Z" display.
- [ ] AC-12: Comparison bar appears when products are selected and supports add/remove/clear/compare actions.
- [ ] AC-13: All interactive elements have keyboard navigation and appropriate ARIA attributes.
- [ ] AC-14: Layout is responsive across mobile, tablet, and desktop breakpoints.

## Cross-References

- Related: US-02 (Product Catalog) — shares ProductCard component and pagination behavior.
- Related: US-04 (Product Compare) — comparison bar and comparison state management.
