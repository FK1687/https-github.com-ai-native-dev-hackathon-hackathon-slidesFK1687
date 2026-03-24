# T-001: Database Schema & Seed Data

## Description

Create the database schema for the KLEB. Product Finder and implement a product generator that programmatically creates ~796 adhesive products across 10 categories with realistic variations. The backend should auto-seed on first request.

## Spec Reference

`docs/specs/us-01-app-shell-and-filters.md`

## Agent Assignment

Agent: `backend`

## Dependencies

None — this task can start immediately.

## Acceptance Criteria

- [ ] Database schema supports all Product attributes (id, name, sku, category, application, material, adhesiveType, description, shortDescription, properties, availableWidths, availableLengths, color, substrate, environment, certification, shelfLife, tags)
- [ ] Product generator creates ~796 products across 10 categories
- [ ] Products have realistic variations in properties, dimensions, and specifications
- [ ] Auto-seed triggers on first API request if data doesn't exist
- [ ] Force re-seed endpoint available (POST /data/reseed)
- [ ] Filter configuration stored (categories, applications, adhesiveTypes, substrates, environments, certifications, properties, temperatureRange, adhesionRange)
- [ ] Label mappings stored for all enum types

## Technical Notes

- Use Supabase KV store or PostgreSQL tables
- Product generator should create deterministic data (seeded random) for consistency
- 10 categories with 70-80 products each to reach ~796 total
- Each product needs realistic adhesion strength (0-15 N/25mm) and temperature range (-70°C to 260°C)
- 8 boolean resistance properties per product
- Multiple widths/lengths arrays per product

---

# T-002: Shared TypeScript Types & Interfaces

## Description

Define all shared TypeScript interfaces and type definitions used across frontend and backend: Product, ProductProperties, filter types, API response shapes, and enum types for categories, applications, adhesive types, substrates, environments, and certifications.

## Spec Reference

`docs/specs/us-01-app-shell-and-filters.md`

## Agent Assignment

Agent: `backend`

## Dependencies

None — this task can start immediately.

## Acceptance Criteria

- [ ] Product interface with all attributes defined
- [ ] ProductProperties interface with 8 boolean flags
- [ ] Enum types for ProductCategory (10), ApplicationType (14), AdhesiveType (12), SubstrateType (14), EnvironmentType (5), CertificationType (10)
- [ ] FilterConfiguration interface
- [ ] OptionsData interface (label mappings)
- [ ] API response interfaces for all endpoints
- [ ] Types exported from a shared location (`src/types/`)
- [ ] No `any` types — strict TypeScript

## Technical Notes

- Place in `src/types/` with barrel export
- Use `interface` for object shapes, `type` for unions/intersections
- Ensure types can be shared between frontend and backend
