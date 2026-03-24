# KLEB. Product Finder — Implementation Plan

## Execution Order (Dependency Graph)

Tasks must be executed in topological order. Each tier depends on all previous tiers being complete.

```
Tier 0 (Foundation)
├── T-001: Database schema & seed data          [backend]
├── T-002: Shared TypeScript types & interfaces  [backend]
└── T-003: UI primitive components               [frontend]

Tier 1 (Core API)
├── T-004: Product API endpoints                 [backend]  → depends on T-001, T-002
├── T-005: Filter & options API endpoints        [backend]  → depends on T-001, T-002
└── T-006: API client layer                      [frontend] → depends on T-002

Tier 2 (App Shell)
├── T-007: App shell & routing                   [frontend] → depends on T-003, T-006
├── T-008: Product data provider (global state)  [frontend] → depends on T-006, T-004, T-005
└── T-009: Comparison state management           [frontend] → depends on T-002

Tier 3 (Shared Components)
├── T-010: ProductCard component                 [frontend] → depends on T-003, T-008, T-009
├── T-011: PaginationControls component          [frontend] → depends on T-003
└── T-012: CompareBar component                  [frontend] → depends on T-009, T-007

Tier 4 (Feature Pages)
├── T-013: Product Finder page (filters + results) [frontend] → depends on T-008, T-010, T-011
├── T-014: Product Catalog page                    [frontend] → depends on T-008, T-010, T-011
├── T-015: Product Detail page                     [frontend] → depends on T-008, T-010, T-009
└── T-016: Product Compare page                    [frontend] → depends on T-009, T-008, T-010

Tier 5 (Contact Feature)
├── T-017: Appointment & contact API endpoints     [backend]  → depends on T-001, T-002
└── T-018: Contact Sales page                      [frontend] → depends on T-003, T-006, T-007

Tier 6 (Polish)
└── T-019: E2E testing & accessibility audit       [frontend] → depends on T-013–T-018
```

## Task Summary

| ID | Title | Agent | Spec | Dependencies | Priority |
|----|-------|-------|------|-------------|----------|
| T-001 | Database schema & seed data | backend | US-01 | None | high |
| T-002 | Shared TypeScript types & interfaces | backend | US-01 | None | high |
| T-003 | UI primitive components | frontend | US-01 | None | high |
| T-004 | Product API endpoints | backend | US-01 | T-001, T-002 | high |
| T-005 | Filter & options API endpoints | backend | US-01 | T-001, T-002 | high |
| T-006 | API client layer | frontend | US-01 | T-002 | high |
| T-007 | App shell & routing | frontend | US-01 | T-003, T-006 | high |
| T-008 | Product data provider | frontend | US-01 | T-006, T-004, T-005 | high |
| T-009 | Comparison state management | frontend | US-04 | T-002 | high |
| T-010 | ProductCard component | frontend | US-01, US-02 | T-003, T-008, T-009 | high |
| T-011 | PaginationControls component | frontend | US-01, US-02 | T-003 | medium |
| T-012 | CompareBar component | frontend | US-04 | T-009, T-007 | medium |
| T-013 | Product Finder page | frontend | US-01 | T-008, T-010, T-011 | high |
| T-014 | Product Catalog page | frontend | US-02 | T-008, T-010, T-011 | high |
| T-015 | Product Detail page | frontend | US-03 | T-008, T-010, T-009 | medium |
| T-016 | Product Compare page | frontend | US-04 | T-009, T-008, T-010 | medium |
| T-017 | Appointment & contact API endpoints | backend | US-05 | T-001, T-002 | medium |
| T-018 | Contact Sales page | frontend | US-05 | T-003, T-006, T-007 | medium |
| T-019 | E2E testing & accessibility audit | frontend | All | T-013–T-018 | low |
