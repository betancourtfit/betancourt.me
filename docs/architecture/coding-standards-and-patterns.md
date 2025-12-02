# Coding Standards and Patterns

## Existing Patterns Observed

**Code Style**:
- **TypeScript**: Strict mode enabled, ES2017 target
- **React**: Functional components with hooks (no class components)
- **Imports**: Absolute imports via `@/*` path alias
- **Formatting**: No Prettier config detected - relies on ESLint autofix

**Component Patterns**:
1. **Server Components** (default in App Router):
   - `PortfolioSection.tsx` - fetches data server-side
   - No `'use client'` directive unless needed

2. **Async Server Components**:
   - `PortfolioSection.tsx` exports `async function` for data fetching

3. **Inline Styles** (inconsistent):
   - Used heavily in `HeroSection.tsx`
   - **Not recommended** for future components

**Data Fetching**:
- Business logic separated into `lib/` directory
- Error handling returns fallback values (empty arrays)
- No loading states (relies on SSG/ISR for instant page loads)

**File Naming Conventions**:
- Components: PascalCase with `.tsx` extension (`HeroSection.tsx`)
- Utilities: camelCase with `.ts` or `.js` extension (`sanity.ts`, `fontawesome.js`)
- Styles: kebab-case for globals, module.css for scoped styles

## ESLint Configuration

**Rules Enforced** (via `eslint.config.mjs`):
- `next/core-web-vitals` - Next.js best practices
- `next/typescript` - TypeScript-specific Next.js rules

**No Custom Rules** currently configured.

## TypeScript Configuration

**Key Settings** (`tsconfig.json`):
- `strict: true` - All strict checks enabled
- `target: "ES2017"` - Modern JavaScript features
- `moduleResolution: "bundler"` - Next.js bundler resolution
- `paths: { "@/*": ["./*"] }` - Absolute imports

## Recommendations for Future Development

**Adopt Consistent Styling Approach**:
- **Option 1**: Migrate to Tailwind CSS (popular with Next.js)
- **Option 2**: Standardize on CSS Modules for all components
- **Option 3**: Implement styled-components or Emotion

**Add Code Formatting**:
- Install and configure Prettier
- Integrate with ESLint via `eslint-config-prettier`

**Improve Type Safety**:
- Add runtime validation for Sanity data (e.g., Zod schema)
- Define stricter types for component props

---
