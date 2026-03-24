---
mode: agent
description: "Create a GitHub Issue from a functional spec task with dependencies, agent assignment, and acceptance criteria"
---

# Create Implementation Issue

Read the functional spec at `docs/specs/{{ spec_file }}`.

For task **{{ task_description }}**, create a GitHub Issue with:

## Title
`[US-{{ us_number }}] {{ task_title }}`

## Body

```markdown
## Description
{{ task_description }}

## Spec Reference
`docs/specs/{{ spec_file }}`

## Agent Assignment
Agent: `{{ agent_name }}`

## Dependencies
{{ dependencies_list }}

## Acceptance Criteria
{{ acceptance_criteria }}

## Technical Notes
{{ technical_notes }}
```

## Labels
- `{{ agent_name }}`
- `spec:us-{{ us_number }}`
