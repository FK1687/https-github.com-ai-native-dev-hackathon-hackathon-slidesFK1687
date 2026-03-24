---
name: spec-translation
description: "Translates prototype user stories from the kleb-productfinder-prototype repo into technology-agnostic functional specifications. Strips React/Supabase/Tailwind implementation details and preserves business intent, data models, and acceptance criteria."
---

# Spec Translation Skill

This skill translates prototype user stories into clean, technology-agnostic functional specifications for the KLEB. Product Finder.

## When to Use

Use this skill when you need to:
- Convert a prototype user story into a functional spec
- Extract business intent from implementation-heavy documentation
- Create specs for `docs/specs/` from the prototype repo

## Inputs

- **User story number** (US-01 through US-05)
- **Source repo:** `ai-native-dev-hackathon/kleb-productfinder-prototype`

## User Story Mapping

| US | File in Prototype Repo | Output Spec |
|----|----------------------|-------------|
| US-01 | `Handover to DEV/01-application-overview-layout-navigation-filters.md` | `docs/specs/us-01-app-shell-and-filters.md` |
| US-02 | `Handover to DEV/02-products-catalog-page.md` | `docs/specs/us-02-product-catalog.md` |
| US-03 | `Handover to DEV/03-product-detail-page.md` | `docs/specs/us-03-product-detail.md` |
| US-04 | `Handover to DEV/04-compare-feature.md` | `docs/specs/us-04-product-compare.md` |
| US-05 | `Handover to DEV/05-contact-sales-expert.md` | `docs/specs/us-05-contact-sales.md` |

## Process

### Step 1: Fetch the Source
Read the user story from the prototype repo via GitHub MCP:
```
Read file `Handover to DEV/{filename}` from repo `ai-native-dev-hackathon/kleb-productfinder-prototype`
```

### Step 2: Extract Business Intent
Parse the document and separate:

**STRIP** (implementation artifacts):
- Framework names: React, Vue, Angular, Supabase, Tailwind, etc.
- CSS class names, component file paths, import statements
- Technology-specific patterns (hooks, providers, middleware)
- Pixel-based breakpoints → replace with "mobile/tablet/desktop"
- Package names and version numbers

**KEEP** (business knowledge):
- User goals and workflows
- Business rules and constraints
- Data entities, attributes, and relationships
- Pagination thresholds (e.g., 24 items per page)
- Sort/filter options and their behavior
- Accessibility requirements
- Error states and edge cases
- Acceptance criteria

### Step 3: Produce the Spec
Write the spec to `docs/specs/` using this template:

```markdown
# US-{XX}: {Title}

## Overview
Brief description of the feature's business purpose.

## User Stories
- As a [role], I want [goal], so that [benefit].

## Functional Requirements
1. The system must...
2. The system must...

## Data Model
### {Entity Name}
| Attribute | Type | Description |
|-----------|------|-------------|
| ... | ... | ... |

### Relationships
- {Entity A} has many {Entity B}
- ...

## User Flows
### {Flow Name}
1. User does...
2. System responds...

## Business Rules
- BR-01: {Rule description}
- BR-02: {Rule description}

## Acceptance Criteria
- [ ] AC-01: {Testable criterion}
- [ ] AC-02: {Testable criterion}

## Cross-References
- Related: US-{XX} ({title}) — {relationship description}
```

### Step 4: Quality Verification
Run these checks on the output:
- [ ] Search for framework names — none should appear
- [ ] Search for CSS class names — none should appear
- [ ] Every business rule from the source is present
- [ ] Data relationships are fully described
- [ ] Acceptance criteria are testable without knowing the tech stack
- [ ] Cross-references to related specs are included

## Output

The completed spec file saved to `docs/specs/`.
