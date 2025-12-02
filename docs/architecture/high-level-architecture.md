# High Level Architecture

## Technical Summary

**betancourt.me** is a modern Next.js 15 portfolio website leveraging:
- **Server Components** with Incremental Static Regeneration (ISR)
- **Sanity CMS** as headless content backend (migrated from Firebase)
- **Vercel deployment** with Speed Insights integration
- **TypeScript** with strict mode for type safety

The architecture follows Next.js App Router conventions with a clean separation between presentation (components), data fetching (lib), and configuration.

## Actual Tech Stack

| Category           | Technology            | Version  | Notes                                      |
| ------------------ | --------------------- | -------- | ------------------------------------------ |
| **Framework**      | Next.js               | 15.5.6   | App Router, Server Components, ISR enabled |
| **Runtime**        | React                 | 19.0.0   | Latest stable, strict mode enabled         |
| **Language**       | TypeScript            | 5.x      | ES2017 target, strict mode                 |
| **CMS**            | Sanity CMS            | 4.13.0   | Headless CMS with GROQ queries             |
| **CMS Integration**| next-sanity           | 11.6.4   | Official Next.js integration               |
| **Icons**          | Font Awesome          | 6.7.2    | Free brands + React components             |
| **Fonts**          | Google Fonts (Geist)  | Latest   | Geist Sans + Geist Mono via next/font      |
| **Analytics**      | Vercel Speed Insights | 1.1.0    | Performance monitoring                     |
| **Linting**        | ESLint                | 9.x      | Next.js core-web-vitals + TypeScript       |
| **Deployment**     | Vercel                | N/A      | Optimized for Vercel platform              |
| **Legacy (Unused)**| Firebase              | 11.1.0   | **DEPRECATED** - Backup exists             |

## Repository Structure Reality Check

- **Type**: Single repository (monorepo-style structure with bmad-core)
- **Package Manager**: npm (using package-lock.json)
- **Notable Structural Decisions**:
  - `.bmad-core/` - BMAD™ framework for AI-assisted development
  - `.claude/`, `.cursor/`, `.gemini/`, `.windsurf/` - Multi-AI IDE configuration
  - `src/` follows Next.js 15 App Router conventions
  - `patches/` - Custom patches for dependencies (get-random-values-esm)
  - `.firebase-backup` files - Legacy code preserved for reference

---
