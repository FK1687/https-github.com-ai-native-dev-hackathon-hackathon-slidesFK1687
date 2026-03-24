---
applyTo: "src/components/**/*.tsx,src/features/**/*.tsx"
---

# React Component Instructions

- All components must be functional components with named exports
- Component files must be `PascalCase` (e.g., `ProductCard.tsx`)
- Co-locate component, styles, and tests: `ComponentName/index.tsx`, `ComponentName.test.tsx`
- Extract business logic into custom hooks — components handle rendering only
- Use `React.memo` only when profiling shows a measurable performance gain
- All interactive elements need proper `aria-*` attributes for WCAG 2.2 AA
- Props interfaces are named `{ComponentName}Props`
- Avoid inline styles — use Tailwind utility classes or design tokens
- Limit component files to 300 lines; split into subcomponents if larger
- Never use `dangerouslySetInnerHTML` without sanitization
