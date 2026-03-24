---
applyTo: "src/api/**/*.ts,supabase/**/*.ts"
---

# API & Backend Instructions

- All API calls go through the centralized API layer in `src/api/`
- Use parameterized queries — never concatenate user input into SQL
- Validate all request parameters at the handler boundary
- Business logic belongs in service functions, not route handlers
- Return consistent error response shapes: `{ error: string, code: string }`
- Use environment variables for all secrets and connection strings
- Log with a structured logger — no `console.log` in production code
- Handle errors explicitly — no silent catches
