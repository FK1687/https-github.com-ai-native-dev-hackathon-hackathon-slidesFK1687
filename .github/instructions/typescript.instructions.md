---
applyTo: "**/*.{ts,tsx}"
---

# TypeScript File Instructions

- Enable strict mode — no `any` types unless justified with a comment
- Use `interface` for object shapes, `type` for unions and intersections
- Prefer `unknown` over `any` for dynamic data; narrow with type guards
- All exported functions must have explicit return types
- Use `const` assertions for literal types where applicable
- Prefer discriminated unions over optional properties for variant types
- Never use `@ts-ignore` or `@ts-expect-error` without a linked issue
- Use `satisfies` operator for type checking without widening
