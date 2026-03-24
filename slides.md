---
theme: default
title: AI-Native Development Hackathon
info: |
  From Prototype to Production — with Engineered Delegation
class: text-center
drawings:
  persist: false
transition: slide-left
mdc: true
fonts:
  sans: DM Sans
  mono: DM Mono
---

<style>
@import url('https://fonts.googleapis.com/css2?family=DM+Mono:wght@300;400;500&family=DM+Sans:ital,wght@0,400;0,500;0,700&display=swap');
</style>

# AI-Native Development Hackathon

### From Prototype to Production — with Engineered Delegation

<div style="margin-top: 2em; display: flex; gap: 2em; justify-content: center; align-items: center; opacity: 0.9;">
  <span style="font-family: 'DM Mono', monospace; color: #9CA3AF; font-size: 0.9em;">GitHub &times; Microsoft &times; PRODYNA</span>
</div>

<div style="margin-top: 2em;">

**Challenge:** Recreate the KLEB. Product Finder as an enterprise-grade application using AI-native engineering practices.

**Prize:** GitHub Swag Shop Voucher for the winning team! 🏆

</div>

---

# The Shift — From Vibe Coding to Governed AI

Traditional AI-assisted coding:
- Ad-hoc prompts → inconsistent results
- No guardrails → security & quality gaps
- No reuse → every session starts from zero

**AI-native engineering:**
- **Structured primitives** that guide every AI interaction
- **Governed workflows** where agents follow architectural rules
- **Reusable artifacts** that compound team knowledge

> "The quality of AI output is determined by the quality of the constraints you give it."

---

# The Challenge

### KLEB. Product Finder — From Prototype to Enterprise

You have a working prototype (Figma Make export) of an industrial adhesive product finder with:

| Feature | Description |
|---------|-------------|
| **Product Finder** | Guided discovery with multi-faceted filters across ~796 products |
| **Product Catalog** | Browsable catalog with category tabs, search, grid/list views |
| **Product Detail** | Full technical specs, dimensions, resistance properties |
| **Product Compare** | Side-by-side comparison of up to 4 products |
| **Contact Sales** | Appointment booking & contact form with a sales engineer |

**Your mission:** Rebuild this as a production-ready application on a tech stack of your team's choice — guided entirely by AI agents you design yourself.

---

# The Prototype — What You're Starting With

### Repository: `ai-native-dev-hackathon/kleb-productfinder-prototype`

**What's in the repo:**

```
Handover to DEV/
  ├── 00-initial-prompt-and-context.md   ← Application context & tech stack
  ├── 01-...-layout-navigation-filters.md ← US-01: App shell & product finder
  ├── 02-products-catalog-page.md         ← US-02: Product catalog
  ├── 03-product-detail-page.md           ← US-03: Product detail page
  ├── 04-compare-feature.md               ← US-04: Comparison feature
  ├── 05-contact-sales-expert.md          ← US-05: Contact & booking
  └── design-system-manifest.json         ← Design system export
guidelines/
  ├── Guidelines.md                       ← Brand identity & design system
  ├── accessibility_guidelines.md         ← WCAG 2.2 AA requirements
  └── design_token_guidelines.md          ← Design token specification
src/                                      ← Prototype source code (React/Vite)
supabase/                                 ← Backend (Supabase Edge Functions)
```

The user stories (US-01 through US-05) contain **prototype-specific technical details**. Your job is to extract the **business intent** and re-implement it in your own stack.

---

# Sprint Overview

```
┌──────────────────────────────────────────────────────────────────────┐
│ Sprint 1: The Guardrails          │ Define AI primitives & agents    │
│ 10:00 – 11:00                     │ that govern your project         │
├──────────────────────────────────────────────────────────────────────┤
│ Sprint 2: The Specification       │ Use agents to translate user     │
│ 11:15 – 12:00                     │ stories → functional specs       │
├──────────────────────────────────────────────────────────────────────┤
│ Sprint 3: The Blueprint           │ Break specs into tasks with a    │
│ 13:00 – 14:00                     │ dependency graph → GitHub Issues │
├──────────────────────────────────────────────────────────────────────┤
│ Sprint 4: The Build               │ Orchestrator agent executes      │
│ 14:00 – 15:00 + 15:15 – 16:00    │ tasks via specialized subagents  │
├──────────────────────────────────────────────────────────────────────┤
│ Show & Tell                       │ Demo your solution + AI          │
│ 16:00 – 16:45                     │ primitives you built             │
└──────────────────────────────────────────────────────────────────────┘
```

---

# The AI Primitives Toolbox

| Primitive | What It Does | File Location |
|-----------|-------------|---------------|
| **Workspace Instructions** | Always-on project-wide rules | `.github/copilot-instructions.md` |
| **File Instructions** | Scoped rules for file patterns | `.github/instructions/*.instructions.md` |
| **Custom Agents** | Specialized personas with restricted tools | `.github/agents/*.agent.md` |
| **Prompts** | Reusable single-task templates | `.github/prompts/*.prompt.md` |
| **Skills** | On-demand workflows with bundled assets | `.github/skills/<name>/SKILL.md` |
| **Hooks** | Deterministic lifecycle automation | `.github/hooks/*.json` |

---

# How Primitives Work Together

<div style="font-size: 0.65em; line-height: 1.2;">

```
User Request
    │
    ▼
┌──────────────────────────────────┐
│  Workspace Instructions          │  ← Always loaded (project DNA)
│  .github/copilot-instructions.md │
└───────────────┬──────────────────┘
                ▼
┌──────────────────────────────────┐
│  Custom Agent                    │  ← Specialized persona + tool restrictions
│  .github/agents/backend.agent.md │
│  ┌─────────────────────────┐     │
│  │ Skills (on-demand)      │     │  ← Loaded when task matches
│  └─────────────────────────┘     │
│  ┌─────────────────────────┐     │
│  │ File Instructions       │     │  ← Auto-attached for file patterns
│  └─────────────────────────┘     │
└───────────────┬──────────────────┘
                ▼
┌──────────────────────────────────┐
│  Hooks                           │  ← Enforce policy at lifecycle events
│  PreToolUse → validate           │
│  PostToolUse → lint/format       │
└──────────────────────────────────┘
```

</div>

---
layout: section
class: bg-black text-white
---

# SPRINT 1: THE GUARDRAILS

---

# Sprint 1 — Mission

### Define Your Project DNA and Build Your Agent Team

**Duration:** 10:00 – 11:00 (60 min)

**Goal:** Set up the AI primitives that will govern every AI interaction for the rest of the day. Choose your technology stack and create custom agents tailored to it.

> **Meta-Tip:** Use Copilot itself to create your AI primitives! Ask it to generate your workspace instructions, agent files, and skills. It knows the correct file formats and frontmatter. Iterate on the output — refining an agent's system prompt with AI is faster than writing it from scratch.

---

# Sprint 1 — Expected Outcomes

| # | Deliverable | Description |
|---|------------|-------------|
| 1 | **Tech Stack Decision** | Choose your frontend, backend, database, and styling approach |
| 2 | **Workspace Instructions** | Customize `.github/copilot-instructions.md` with your project rules |
| 3 | **2+ Custom Agents** | Customize the starter agents + create new ones for your team |
| 4 | **1+ Skills** | Customize or add skills in `.github/skills/` |
| 5 | **Customized Repo** | The starter repo with all primitives tailored to your team |

> **Your repo already contains a starter kit!** The `.github/` folder has skeleton agents, instructions, skills, and hooks. Your job is to **fill in the `<!-- TODO -->` placeholders** for your team's technology choices, and **create new primitives** as you need them. Use AI to do it!

---

# Sprint 1 — Tips & Pitfalls

### The #1 Tip: Use AI to Create Your AI Primitives

This is an AI-native hackathon — **don't hand-write your agent files from scratch.** Tell Copilot what you need, let it generate the files, then review and refine.

### Do's

- **Description is the discovery surface** — agents find skills/instructions by matching keywords in the `description` field
- Keep workspace instructions **concise** — they load into every interaction
- Give each agent a **clear, narrow scope** — don't make a "do everything" agent
- Use `tools: [read, search]` for read-only agents (e.g., code review)

### Don'ts

- Don't use `applyTo: "**"` on file instructions unless truly universal
- Don't put prototype-specific technology choices in instructions
- Don't create agents without a `description` — they won't be discoverable as subagents
- Don't duplicate information already in workspace instructions inside agents

---
layout: section
class: bg-black text-white
---

# SPRINT 2: THE SPECIFICATION

---

# Sprint 2 — Mission

### Translate Prototype User Stories into Technology-Agnostic Functional Specs

**Duration:** 11:15 – 12:00 (45 min)

**Goal:** Use a custom agent or prompt to transform the prototype's user stories (which contain React/Supabase/Tailwind-specific details) into clean, business-focused functional specifications that are independent of any technology stack.

> **AI all the way down:** First use AI to *create* your spec-translation agent/prompt, then use that agent/prompt to *produce* the functional specs. You're building the tool that builds the artifact.

---

# Sprint 2 — Expected Outcomes

| # | Deliverable | Description |
|---|------------|-------------|
| 1 | **Spec Agent or Prompt** | A custom agent (`.github/agents/`) or prompt (`.github/prompts/`) dedicated to specification translation |
| 2 | **5 Functional Specs** | Markdown files in `docs/specs/` — one per user story (US-01 through US-05) |
| 3 | **Business Intent Only** | Specs must describe *what* the system does, not *how* the prototype implements it |

---

# Sprint 2 — GitHub MCP

The prototype user stories live in the **kleb-productfinder-prototype** repo. Your agents can read them directly using the **GitHub MCP server**.

### What Is GitHub MCP?

The GitHub MCP server lets any agent or prompt fetch files from GitHub repositories — just like reading local files, but from any repo you have access to.

### How to Enable It

1. Open VS Code Settings and search for **MCP**
2. Ensure the **GitHub MCP server** is enabled (it ships with the GitHub Copilot extension)
3. Your agents and prompts can now read files from any GitHub repo

Once enabled, your agents and prompts can reference files from the prototype repo:

```
Read the user story at `Handover to DEV/01-application-overview-layout-navigation-filters.md`
from the ai-native-dev-hackathon/kleb-productfinder-prototype repo on GitHub.
```

---

# Sprint 2 — Build Your Spec Translation

Create a **custom agent** or **reusable prompt** that:

1. Reads a user story from the kleb-prototype Space (via MCP)
2. Strips all prototype-specific implementation details
3. Extracts pure business intent
4. Outputs a functional spec to `docs/specs/`

> **Build it with AI:** Ask Copilot to create a spec-writer agent or prompt for you. Describe what to strip (framework names, CSS classes, component references) and what to keep (business rules, data relationships, user flows) and let it generate the primitive. Then run it for all 5 user stories (US-01 through US-05).

---

# Sprint 2 — Tips & Pitfalls

### Do's
- Have the agent read the prototype user story via GitHub MCP
- Store specs in a consistent location (`docs/specs/`) with a naming convention
- Cross-reference between specs (e.g., "Compare feature" references "Product Card" from the catalog spec)
- Include business constraints that could be missed (e.g., "pagination at 24 items")

### Don'ts
- Don't just find-and-replace technology names — the structure should change too
- Don't lose the data model — abstract it but keep the relationships
- Don't skip the acceptance criteria — Sprint 3 needs them for task validation
- Don't let prototype CSS breakpoints leak in — describe as "mobile/tablet/desktop responsive"

### Quality Check
After generating each spec, verify: ✅ No framework/library names · ✅ No CSS classes · ✅ All business rules preserved · ✅ Data relationships described · ✅ Acceptance criteria testable

---
layout: section
class: bg-black text-white
---

# SPRINT 3: THE BLUEPRINT

---

# Sprint 3 — Mission

### Break Specifications into an Implementation Plan with a Dependency Graph

**Duration:** 13:00 – 14:00 (60 min)

**Goal:** Decompose each functional specification into implementation tasks, map their dependencies, and create GitHub Issues with full traceability back to the specs.

---

# Sprint 3 — Expected Outcomes

| # | Deliverable | Description |
|---|------------|-------------|
| 1 | **Planning Agent** | An AI agent that reads functional specs and creates a task breakdown |
| 2 | **GitHub Issues** | One issue per task, created in the team's repo |
| 3 | **Dependency Graph** | Each issue defines which other issues must be completed first |
| 4 | **Spec Traceability** | Every issue links back to its source functional spec |
| 5 | **Agent Assignment** | Every issue specifies which custom agent should implement it |
| 6 | **Detailed Descriptions** | Each issue has a clear description of what should be done |

---
layout: section
class: bg-black text-white
---

# SPRINT 4: THE BUILD

---

# Sprint 4 — Mission

### Orchestrate Automated Implementation via Agent Handoffs

**Duration:** 14:00 – 16:00 (with coffee break at 15:00)

**Goal:** Create an orchestrator agent that reads the issues for a functional spec, respects the dependency graph, and delegates each task to the appropriate specialized agent defined in the issue.

> **The final layer of delegation:** Use AI to write your orchestrator agent, then let the orchestrator use AI (your subagents) to write the actual code. You're now two levels deep in engineered delegation — and that's the point.

---

# Sprint 4 — Expected Outcomes

| # | Deliverable | Description |
|---|------------|-------------|
| 1 | **Orchestrator Agent** | A master agent in `.github/agents/` that coordinates the build |
| 2 | **Automated Execution** | The orchestrator invokes subagents per issue according to dependencies |
| 3 | **Working Code** | Implemented features — as many as your pipeline produces |
| 4 | **Closed Issues** | Issues marked as complete as agents finish tasks |

---

# Sprint 4 — Build the Orchestrator Agent

This is the capstone: create an **orchestrator agent** that automates the build by delegating to your specialized subagents.

### What the Orchestrator Should Do

1. Read a functional spec from `docs/specs/`
2. Fetch all GitHub Issues linked to that spec
3. Build a dependency graph from each issue's "Dependencies" section
4. Execute tasks in dependency order, delegating each to the agent named in the issue
5. Report progress after each completed task

---

# Sprint 4 — Orchestrator Design Decisions

| Decision | Options |
|----------|---------|
| **Tool access** | `tools: [read, edit, search, execute, agent]` — needs `agent` for subagent delegation |
| **Subagent restriction** | `agents: [frontend, backend]` — limit which agents it can call |
| **Failure handling** | Stop on error? Skip and continue? Retry once? |
| **GitHub integration** | Give it MCP tools to read/close issues automatically |
| **Approval gate** | Should it present the execution plan before starting? |

> **Build it with AI:** Ask Copilot to create an orchestrator agent based on the requirements above. Describe how your issues are structured and which subagents exist.

---

# Sprint 4 — Tips & Pitfalls

### Do's
- Start with **foundation specs** (App Shell, shared components) before feature specs
- Let the orchestrator handle **one spec at a time** for clarity
- If a subagent produces incorrect code, **refine the agent instructions** and re-run

### Don'ts
- Don't run all specs in parallel — shared components must exist first
- Don't manually fix agent output without updating the agent instructions (fix the system, not the symptom)

### When Things Go Wrong
**Wrong tech stack?** → Check workspace instructions · **Ignores a constraint?** → Add it to the agent's system prompt · **Out of order?** → Verify the dependency graph · **Subagent not found?** → Check its `description` field

---
layout: section
class: bg-black text-white
---

# SHOW & TELL

---

# Show & Tell — What to Present

**Duration:** 16:00 – 16:45 (8–10 min per team)

### 1. Your AI Primitives
- Workspace instructions — what rules did you encode?
- Custom agents — how many, what roles, what tool restrictions?
- Skills — what reusable workflows did you create?
- What worked? What surprised you?

### 2. Your Solution
- Live demo of the running application (or as far as you got)
- Which features are implemented?
- Show the code — does it follow the standards your agents enforce?

### 3. Lessons Learned
- What was the hardest part?
- What would you do differently?
- How did the constraints improve (or hinder) the AI output?

---

# Community Vote

After all teams have presented, **every participant votes** for their favorite team.

### What to Consider When Voting

| Aspect | What to Look For |
|--------|------------------|
| **AI Primitive Quality** | Well-structured agents, instructions, and skills. Clear separation of concerns. |
| **Specification Quality** | Clean business-focused specs free of prototype implementation details. |
| **Implementation Plan** | Logical dependency graph, well-defined issues with traceability. |
| **Working Solution** | Features that actually work — functionality over quantity. |
| **Creativity & Innovation** | Novel use of AI primitives, hooks, agent handoffs, or skills. |

> **You cannot vote for your own team.** The team with the most votes wins!

---
layout: center
class: text-center
---

# What You Built Today

**Custom Instructions** · **Specialized Agents** · **Reusable Skills** · **Prompts** · **Orchestration Patterns**

### This Is AI-Native Engineering

Not "AI writes code for me" — but **"I architect the system that governs how AI builds software."**

The quality of the constraints you design determines the quality of the software that ships.

<br>

**Community vote → Winner announced → GitHub Swag Shop Voucher!** 🎉
