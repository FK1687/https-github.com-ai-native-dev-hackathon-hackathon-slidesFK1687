# US-03: Product Detail Page

## Overview

A full product detail page that displays comprehensive information about a single adhesive product, including technical specifications, dimensions, resistance properties, certifications, and related products. Supports adding the product to the comparison list.

## User Stories

- As a user evaluating an adhesive product, I want a detailed product page with full technical specifications, dimensions, and resistance properties, so that I can determine if the product meets my application requirements.

## Functional Requirements

1. The page must be accessible via a URL path that includes the product's unique identifier (e.g., `/products/:id`).
2. A breadcrumb navigation bar must be displayed: Products > {Category Name} > {Product Name}, where "Products" links to the catalog and the category name links to the catalog pre-filtered by that category.
3. The page must display a product header section with:
   - Category badge
   - SKU label
   - Environment badge
   - Product name (heading)
   - Full description
   - Material type and adhesive type in side-by-side info cards
   - Application badges (all applicable application types)
   - Certification badges (if the product has certifications)
4. Action buttons must include:
   - "Technical Data Sheet" (primary action, simulates download)
   - "Add to Compare" / "Remove from Compare" toggle
5. A tabbed specification section must show:
   - **Specifications tab**: Key-value table of technical specifications (adhesion strength, temperature range, shelf life, etc.)
   - **Dimensions tab**: Available widths (mm) and lengths (m) displayed as selectable chips, with any dimension-related notes.
   - **Resistance tab**: Grid of resistance/property cards showing each boolean property as active or inactive with appropriate visual indicators.
6. A related products section must display other products from the same category (excluding the current product), shown as product cards with a horizontal scrollable layout.
7. If the product ID is not found, a "Product Not Found" message must be displayed with a link back to the catalog.

## Data Model

Uses the shared Product model from US-01 (see [us-01-app-shell-and-filters.md](us-01-app-shell-and-filters.md#data-model)).

### Specifications Table Rows

| Row Label | Source Field | Notes |
|-----------|-------------|-------|
| Category | category (label) | |
| Material | material | |
| Adhesive Type | adhesiveType (label) | |
| Adhesion Strength | properties.adhesionStrength | Displayed in N/25mm |
| Temperature Range | properties.temperatureMin – temperatureMax | Displayed in °C |
| Shelf Life | shelfLife | Displayed in months |
| Environment | environment (label) | |
| Color | color | |

### Dimension Data

| Attribute | Type | Display |
|-----------|------|---------|
| availableWidths | number[] | Shown as selectable chips in mm |
| availableLengths | number[] | Shown as selectable chips in m |

### Resistance Properties Grid

Each of the 8 boolean properties (uvResistance, waterResistance, solventResistance, foodSafe, flameRetardant, antistatic, transparentBond, removable) is displayed as a card showing active/inactive status.

## User Flows

### View Product Detail
1. User clicks "View Detail" on a product card from the catalog or finder.
2. System navigates to the product detail page.
3. The product's full information is displayed.
4. User can browse specifications, dimensions, and resistance tabs.

### Compare from Detail
1. User clicks "Add to Compare" on the product detail page.
2. The product is added to the comparison list (comparison bar appears).
3. The button toggles to "Remove from Compare" state.

### Navigate via Breadcrumbs
1. User clicks "Products" in the breadcrumb to go to the full catalog.
2. User clicks the category name to go to the catalog pre-filtered by that category.

### View Related Products
1. User scrolls to the related products section.
2. Products from the same category are shown as scrollable cards.
3. User can click a related product to navigate to its detail page.

## Business Rules

- BR-01: Related products are filtered from the same category as the current product, excluding the current product itself.
- BR-02: Breadcrumb category name links to the catalog with a category query parameter.
- BR-03: Certification badges are only shown if the product has certifications.
- BR-04: Dimension chips display the raw numeric values with unit labels (mm for widths, m for lengths).
- BR-05: Product not found state shows when the provided ID doesn't match any product.

## Acceptance Criteria

- [ ] AC-01: Product detail page loads for a valid product ID and displays all product information.
- [ ] AC-02: Breadcrumb navigation shows correct hierarchy and all links work.
- [ ] AC-03: Product header displays category, SKU, environment, name, description, material, adhesive type, applications, and certifications.
- [ ] AC-04: Specification tabs (Specifications, Dimensions, Resistance) switch correctly and display accurate data.
- [ ] AC-05: Dimension chips display all available widths and lengths.
- [ ] AC-06: Resistance grid shows all 8 boolean properties with correct active/inactive states.
- [ ] AC-07: "Add to Compare" / "Remove from Compare" toggles the product in the comparison list.
- [ ] AC-08: Related products section shows products from the same category (excluding current).
- [ ] AC-09: "Product Not Found" state displays for invalid product IDs with a link back to catalog.
- [ ] AC-10: All interactive elements have keyboard navigation and ARIA attributes.
- [ ] AC-11: Layout is responsive across mobile, tablet, and desktop breakpoints.

## Cross-References

- Related: US-01 (App Shell & Filters) — shares data model and product card component.
- Related: US-02 (Product Catalog) — breadcrumb links back to catalog; "View Detail" navigates here.
- Related: US-04 (Product Compare) — "Add to Compare" integrates with comparison state.
