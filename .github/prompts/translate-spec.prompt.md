---
mode: agent
description: "Translate a prototype user story into a technology-agnostic functional specification"
---

# Translate User Story to Functional Spec

Read the user story for **US-{{ us_number }}** from the `ai-native-dev-hackathon/kleb-productfinder-prototype` repo on GitHub:

```
Handover to DEV/{{ filename }}
```

Then produce a technology-agnostic functional specification following these rules:

## Strip (implementation details)
- All framework/library names (React, Supabase, Tailwind, etc.)
- CSS class names and component file paths
- Technology-specific API patterns or SDK usage
- Pixel-based breakpoints — use "mobile/tablet/desktop" instead

## Keep (business intent)
- User goals, workflows, and behaviors
- Business rules, constraints, and validation logic
- Data entities, attributes, and relationships
- Pagination limits, defaults, and thresholds
- Accessibility requirements
- Error states and edge cases
- Acceptance criteria (rewrite to be testable but tech-agnostic)

## Output

Save the spec to `docs/specs/us-{{ us_number }}-{{ slug }}.md` using this structure:

1. **Overview** — business purpose
2. **User Stories** — As a [role], I want [goal], so that [benefit]
3. **Functional Requirements** — numbered list
4. **Data Model** — entities and relationships
5. **User Flows** — step-by-step interactions
6. **Business Rules** — constraints and validation
7. **Acceptance Criteria** — testable criteria
8. **Cross-References** — links to related specs

## Quality Check

Before saving, verify:
- No framework or library names anywhere
- No CSS classes or styling specifics
- All business rules preserved
- Data relationships clearly described
- Acceptance criteria testable without knowing the tech stack
