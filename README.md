# AI-Native Development Hackathon — Slides

Presentation slides for the **AI-Native Development Hackathon: From Prototype to Production — with Engineered Delegation**, built with [Slidev](https://sli.dev).

## Overview

These slides guide participants through a full-day hackathon where teams rebuild the **KLEB. Product Finder** as an enterprise-grade application using AI-native engineering practices — custom agents, workspace instructions, reusable skills, and orchestration patterns.

### Sprint Structure

| Sprint | Topic | Duration |
|--------|-------|----------|
| **Sprint 1** | The Guardrails — Define AI primitives & custom agents | 10:00 – 11:00 |
| **Sprint 2** | The Specification — Translate user stories → functional specs | 11:15 – 12:00 |
| **Sprint 3** | The Blueprint — Task breakdown & dependency graph → GitHub Issues | 13:00 – 14:00 |
| **Sprint 4** | The Build — Orchestrator agent executes tasks via subagents | 14:00 – 16:00 |
| **Show & Tell** | Demo solutions + AI primitives | 16:00 – 16:45 |

## Prerequisites

- [Node.js](https://nodejs.org/) (v18+)

## Getting Started

```bash
# Install dependencies
npm install

# Start the slide deck in dev mode (opens browser)
npm run dev
```

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Start the Slidev dev server with live reload |
| `npm run build` | Build the slides as a static SPA |
| `npm run export` | Export slides to PDF |

## Tech Stack

- **[Slidev](https://sli.dev)** — Markdown-based presentation framework
- **DM Sans / DM Mono** — Typography
- Custom dark theme with PRODYNA/KLEB brand colors

## Project Structure

```
hackathon-slides/
├── slides.md    ← All slide content (Markdown + frontmatter)
├── style.css    ← Custom theme (dark mode, brand colors, typography)
├── package.json
└── .gitignore
```
