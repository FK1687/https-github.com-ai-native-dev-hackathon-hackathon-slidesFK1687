# US-04: Product Comparison Feature

## Overview

A cross-page comparison system that allows users to select up to 4 adhesive products from any page and compare them side-by-side in a detailed specification table. Includes a persistent comparison bar, a dedicated comparison page, and a searchable product selector.

## User Stories

- As a user evaluating multiple adhesive products, I want to select up to 4 products across any page and compare them side-by-side in a detailed specification table, so that I can make an informed decision on which product best fits my application.

## Functional Requirements

1. A global comparison state must persist across all pages, tracking up to 4 selected product IDs.
2. A comparison bar must be fixed at the bottom of the viewport, visible whenever at least one product is selected for comparison.
3. The comparison bar must display:
   - A "Compare" label
   - Selected product names as removable chips (product name + remove button)
   - A counter badge showing "{count}/4"
   - A "Clear" button to remove all products
   - A "Compare" button that navigates to the comparison page
4. The comparison bar must animate in/out when products are added/removed.
5. Each chip's remove button must have an accessible label: "Remove {product name} from comparison".
6. The comparison page must be accessible at a dedicated URL (e.g., `/compare`).
7. When no products are selected, the comparison page must show an empty state with a message ("No products selected for comparison"), guidance text, and a button to browse products.
8. When products are selected, the comparison page must display:
   - A header with "Compare Products" heading and actions ("Clear all", "Add Product", "Back to Products")
   - A side-by-side comparison table with products as columns and specification rows
9. The comparison table must include these specification rows:
   - Category, Material, Adhesive Type, Adhesion Strength (N/25mm), Temperature Range (°C), Shelf Life (months), Environment, Color, and all 8 resistance/property boolean values
10. Boolean property values must display as visual indicators (e.g., check/cross icons) with accessible labels ("Yes"/"No").
11. A searchable product selector ("Add Product") must allow adding more products (up to 4 total).
12. The product selector must support text search, showing matching products with name, category badge, SKU, and short description.
13. The product selector must display: a result count (e.g., "12 of 796 products"), and only show products not already in the comparison.
14. Individual products can be removed from the comparison via a remove button on their column header.
15. The comparison page must show a "View Details" link for each product that navigates to its detail page.

## Data Model

Uses the shared Product model from US-01 (see [us-01-app-shell-and-filters.md](us-01-app-shell-and-filters.md#data-model)).

### Comparison State

| Attribute | Type | Description |
|-----------|------|-------------|
| compareList | string[] | Array of selected product IDs (max 4) |
| addToCompare(id) | function | Add a product ID to the list |
| removeFromCompare(id) | function | Remove a product ID from the list |
| clearCompare() | function | Remove all products from the list |

### Comparison Table Rows

| Row Label | Source | Display Format |
|-----------|--------|----------------|
| Category | category | Label from mappings |
| Material | material | Plain text |
| Adhesive Type | adhesiveType | Label from mappings |
| Adhesion Strength | properties.adhesionStrength | "{value} N/25mm" |
| Temperature Range | properties.temperatureMin – temperatureMax | "{min}°C to {max}°C" |
| Shelf Life | shelfLife | "{value} months" |
| Environment | environment | Label from mappings |
| Color | color | Plain text |
| UV Resistance | properties.uvResistance | Yes/No indicator |
| Water Resistance | properties.waterResistance | Yes/No indicator |
| Solvent Resistance | properties.solventResistance | Yes/No indicator |
| Food Safe | properties.foodSafe | Yes/No indicator |
| Flame Retardant | properties.flameRetardant | Yes/No indicator |
| Antistatic | properties.antistatic | Yes/No indicator |
| Transparent Bond | properties.transparentBond | Yes/No indicator |
| Removable | properties.removable | Yes/No indicator |

## User Flows

### Add Product to Comparison
1. User clicks "Add to Compare" on any product card (catalog, finder, or detail page).
2. Product ID is added to the comparison list.
3. The comparison bar appears at the bottom (or updates if already visible).
4. The button on the product card toggles to a "selected" state.

### Remove Product from Comparison
1. User clicks the remove ("X") button on a chip in the comparison bar, or the remove button on the column header in the comparison page.
2. Product is removed from the comparison list.
3. If no products remain, the comparison bar disappears.

### View Comparison
1. User clicks "Compare" in the comparison bar (or navigates to the comparison page directly).
2. The comparison page displays selected products side-by-side.
3. User can scan specification rows to compare values.

### Add Product from Comparison Page
1. User clicks "Add Product" on the comparison page.
2. A searchable product selector dropdown appears.
3. User types to search; results filter in real-time.
4. User clicks a product to add it to the comparison.
5. The comparison table updates with the new column.

## Business Rules

- BR-01: Maximum of 4 products can be selected for comparison at any time.
- BR-02: Comparison state persists across page navigation within the application.
- BR-03: Products already in the comparison list are excluded from the product selector search results.
- BR-04: The comparison bar is hidden when zero products are selected.
- BR-05: The "Compare" button in the bar is always enabled when at least one product is selected.

## Acceptance Criteria

- [ ] AC-01: Users can add up to 4 products to the comparison from any page (finder, catalog, detail).
- [ ] AC-02: Comparison bar appears at the bottom when 1+ products are selected.
- [ ] AC-03: Comparison bar shows product names, counter, clear, and compare actions.
- [ ] AC-04: Removing a product updates the bar; removing all hides the bar.
- [ ] AC-05: Comparison page shows empty state when no products are selected.
- [ ] AC-06: Comparison page shows side-by-side table with all specification rows when products are selected.
- [ ] AC-07: Boolean properties display as visual Yes/No indicators with accessible labels.
- [ ] AC-08: Product search selector works and excludes already-selected products.
- [ ] AC-09: Individual products can be removed from the comparison page.
- [ ] AC-10: "View Details" links navigate to the correct product detail page.
- [ ] AC-11: Comparison state persists across navigation.
- [ ] AC-12: All interactive elements have keyboard navigation and ARIA attributes.
- [ ] AC-13: Layout is responsive across mobile, tablet, and desktop breakpoints.

## Cross-References

- Related: US-01 (App Shell & Filters) — comparison bar rendered in the app shell; "Add to Compare" on product cards.
- Related: US-02 (Product Catalog) — "Add to Compare" on catalog product cards/rows.
- Related: US-03 (Product Detail) — "Add to Compare" button on the detail page.
