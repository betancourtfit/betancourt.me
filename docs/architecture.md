# betancourt.me Brownfield Architecture Document

## Introduction

This document captures the **CURRENT STATE** of the betancourt.me portfolio website codebase, including technical decisions, migration history, and real-world patterns. It serves as a comprehensive reference for understanding the system's architecture and planning future enhancements.

### Document Scope

Comprehensive documentation of the entire system, focused on evolution and future enhancements.

### Purpose

This document is designed for **senior developers** and AI agents to:
- Understand the complete architecture and technical decisions
- Plan and execute system evolution
- Identify opportunities for enhancement
- Maintain consistency during development

### Change Log

| Date       | Version | Description                 | Author             |
| ---------- | ------- | --------------------------- | ------------------ |
| 2025-12-02 | 1.0     | Initial brownfield analysis | Winston (Architect)|

---

## Quick Reference - Key Files and Entry Points

### Critical Files for Understanding the System

**Main Application Structure:**
- **Root Layout**: `src/app/layout.tsx` - Root layout with metadata, fonts, and Speed Insights
- **Home Page**: `src/app/page.tsx` - Main page with ISR revalidation (1 hour)
- **Global Styles**: `src/app/globals.css` - Application-wide styling

**Core Components:**
- **Header**: `src/app/components/Header.tsx` - Simple header with logo (minimal navigation)
- **Hero Section**: `src/app/components/HeroSection.tsx` - Profile image, bio, social links
- **Portfolio Section**: `src/app/components/PortfolioSection.tsx` - Server Component with ISR data fetching

**Data Layer:**
- **Sanity Client**: `src/lib/sanity.ts` - Sanity CMS client, types, and GROQ queries
- **Portfolio Logic**: `src/lib/portfolio.ts` - Data fetching and grouping utilities
- **Firebase (Legacy)**: `src/app/firebase.js` - **NOT CURRENTLY USED** - Preserved for reference

**Configuration:**
- **Next.js Config**: `next.config.ts` - React Strict Mode enabled
- **TypeScript Config**: `tsconfig.json` - ES2017 target, strict mode
- **ESLint Config**: `eslint.config.mjs` - Next.js core-web-vitals + TypeScript rules
- **Dependencies**: `package.json` - Next.js 15, React 19, Sanity v4

**Assets:**
- **Public Assets**: `public/foto_perfil.jpg` - Profile photo and SVG icons
- **Font Awesome Config**: `src/app/utils/fontawesome.js` - Font Awesome library setup

---

## High Level Architecture

### Technical Summary

**betancourt.me** is a modern Next.js 15 portfolio website leveraging:
- **Server Components** with Incremental Static Regeneration (ISR)
- **Sanity CMS** as headless content backend (migrated from Firebase)
- **Vercel deployment** with Speed Insights integration
- **TypeScript** with strict mode for type safety

The architecture follows Next.js App Router conventions with a clean separation between presentation (components), data fetching (lib), and configuration.

### Actual Tech Stack

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

### Repository Structure Reality Check

- **Type**: Single repository (monorepo-style structure with bmad-core)
- **Package Manager**: npm (using package-lock.json)
- **Notable Structural Decisions**:
  - `.bmad-core/` - BMAD™ framework for AI-assisted development
  - `.claude/`, `.cursor/`, `.gemini/`, `.windsurf/` - Multi-AI IDE configuration
  - `src/` follows Next.js 15 App Router conventions
  - `patches/` - Custom patches for dependencies (get-random-values-esm)
  - `.firebase-backup` files - Legacy code preserved for reference

---

## Source Tree and Module Organization

### Project Structure (Actual)

```text
betancourt.me/
├── .bmad-core/              # BMAD™ AI development framework
│   ├── tasks/               # Reusable task definitions
│   ├── templates/           # Document templates
│   ├── checklists/          # Quality checklists
│   └── core-config.yaml     # Project configuration
├── .claude/                 # Claude Code configuration
├── .cursor/                 # Cursor IDE configuration
├── .gemini/                 # Gemini configuration
├── .windsurf/               # Windsurf IDE configuration
├── src/
│   ├── app/
│   │   ├── components/      # React components
│   │   │   ├── Header.tsx           # Simple header with logo
│   │   │   ├── HeroSection.tsx      # Profile, bio, social links
│   │   │   └── PortfolioSection.tsx # Server Component with ISR
│   │   ├── utils/
│   │   │   └── fontawesome.js       # Font Awesome configuration
│   │   ├── firebase.js      # LEGACY - Not in use (backup preserved)
│   │   ├── layout.tsx       # Root layout with fonts + Speed Insights
│   │   ├── page.tsx         # Home page (ISR revalidation: 3600s)
│   │   ├── globals.css      # Global styles
│   │   ├── page.module.css  # Page-specific styles (legacy?)
│   │   └── favicon.ico      # Site favicon
│   └── lib/
│       ├── sanity.ts        # Sanity client, types, GROQ queries
│       └── portfolio.ts     # Portfolio data fetching + grouping
├── public/
│   ├── foto_perfil.jpg      # Profile photo (322KB)
│   ├── next.svg             # Next.js logo
│   ├── vercel.svg           # Vercel logo
│   └── *.svg                # Various SVG assets
├── patches/                 # Custom dependency patches
├── docs/                    # Project documentation (this file)
├── next.config.ts           # Next.js configuration (Strict Mode)
├── tsconfig.json            # TypeScript configuration
├── eslint.config.mjs        # ESLint flat config
├── package.json             # Dependencies + security overrides
├── CLAUDE.md                # AI assistant project instructions
├── SECURITY_FIXES.md        # Security vulnerability resolution log
└── README.md                # Project overview
```

### Key Modules and Their Purpose

**Component Layer** (`src/app/components/`):
- **Header.tsx**: Minimal header component (only displays "Betancourt" logo, no navigation yet)
- **HeroSection.tsx**: Hero section with profile image (Next.js Image), bio text, and Font Awesome social icons
- **PortfolioSection.tsx**: Server Component that fetches portfolio data from Sanity CMS and renders grouped by category

**Data Fetching Layer** (`src/lib/`):
- **sanity.ts**: Centralized Sanity client configuration, TypeScript types, and GROQ query definitions
- **portfolio.ts**: Business logic for fetching portfolio items and grouping by category

**Utilities** (`src/app/utils/`):
- **fontawesome.js**: Font Awesome library configuration (imports and setup)

**Legacy Code** (Preserved but not active):
- **firebase.js**: Firebase/Firestore initialization - **NOT CURRENTLY USED** in production flow
- **PortfolioSection.tsx.firebase-backup**: Original Firebase-based portfolio component

---

## Data Models and APIs

### Data Models

**Portfolio Item Type** (See `src/lib/sanity.ts:11-19`):

```typescript
export type PortfolioItem = {
  title: string;
  url: string;
  category: string;      // Used for grouping (e.g., "Articles", "Projects")
  date: string;
  description?: string;  // Optional field
  image: string;         // Required for display
  type?: string;         // Additional classification field
}
```

**Data Source**: Sanity CMS (Content Type: `portfolio`)

**Key Constraints**:
- `image` field is **required** - items without images are filtered out (`portfolio.ts:8`)
- Schema designed to maintain compatibility with legacy Firebase structure

### API Specifications

**Sanity CMS Integration:**

**GROQ Query** (`src/lib/sanity.ts:22-30`):
```groq
*[_type == "portfolio"]{
  title,
  url,
  category,
  date,
  description,
  image,
  type
}
```

**Client Configuration**:
- **Project ID**: `NEXT_PUBLIC_SANITY_PROJECT_ID` (env variable)
- **Dataset**: `production` (default)
- **API Version**: `2025-06-29`
- **CDN**: Enabled (`useCdn: true`)

**Data Fetching Pattern**:
- Server Component calls `getPortfolioData()` at build time
- ISR revalidation every 3600 seconds (1 hour)
- Error handling returns empty array on failure
- Client logs errors to console

**No External REST APIs** currently exposed by this application.

---

## Technical Debt and Known Issues

### Critical Technical Debt

1. **Firebase Integration Remnants**
   - **Location**: `src/app/firebase.js`
   - **Issue**: Firebase SDK and configuration still present in codebase but **NOT USED**
   - **Impact**: Increases bundle size, potential security risk if credentials not rotated
   - **Recommendation**: Remove `firebase` dependency after confirming complete migration to Sanity
   - **Priority**: Medium (no functional impact, but maintenance burden)

2. **Inline Styles in Components**
   - **Location**: `src/app/components/HeroSection.tsx`
   - **Issue**: Heavy use of inline styles instead of CSS modules or styled components
   - **Impact**: Difficult to maintain, poor reusability, no theme support
   - **Example**: Lines 7, 9, 15-20, 30 - all use inline `style` props
   - **Recommendation**: Migrate to CSS modules or Tailwind CSS for consistency
   - **Priority**: Low (cosmetic, but affects scalability)

3. **Empty Navigation in Header**
   - **Location**: `src/app/components/Header.tsx:5`
   - **Issue**: `<nav>` element exists but is empty
   - **Impact**: Incomplete feature, may indicate planned navigation not implemented
   - **Recommendation**: Either remove empty `<nav>` or implement navigation menu
   - **Priority**: Low (may be intentional for single-page design)

4. **Unused CSS Module**
   - **Location**: `src/app/page.module.css`
   - **Issue**: CSS module file exists but not imported in `page.tsx`
   - **Impact**: Dead code, confusing for developers
   - **Recommendation**: Either use the module or delete it
   - **Priority**: Low (no functional impact)

5. **Mixed Content Strategy**
   - **Issue**: Some components use CSS modules (`page.module.css`), some use inline styles (`HeroSection.tsx`), global styles exist (`globals.css`)
   - **Impact**: Inconsistent styling approach makes maintenance harder
   - **Recommendation**: Standardize on one approach (CSS modules, Tailwind, or styled-components)
   - **Priority**: Medium (affects long-term maintainability)

### Workarounds and Gotchas

**Security Overrides in package.json**:
- **Context**: Multiple security vulnerabilities addressed via dependency overrides
- **Workarounds**:
  ```json
  "overrides": {
    "prismjs": "^1.30.0",      // CVE-2024-53382 mitigation
    "vite": "6.4.1",           // Force specific version
    "glob": "11.1.0",          // CVE-2025-5889 resolution
    "valibot": "^1.2.0",       // Forced update
    // ... and more
  }
  ```
- **Gotcha**: Overrides prevent automatic dependency updates - must manually verify compatibility
- **Documentation**: See `SECURITY_FIXES.md` for full history

**Environment Variables**:
- **Sanity CMS**: Requires `NEXT_PUBLIC_SANITY_*` variables (see `.env.local.example`)
- **Firebase (Legacy)**: `NEXT_PUBLIC_FIREBASE_*` variables still referenced in `firebase.js` but not required
- **Gotcha**: Missing Sanity env variables will cause silent failures (returns empty portfolio)

**ISR Revalidation**:
- **Setting**: `export const revalidate = 3600` in `page.tsx:8`
- **Gotcha**: Changes to Sanity CMS take up to 1 hour to appear in production
- **Workaround**: Use on-demand revalidation or reduce revalidate time for faster content updates

**Image Filtering Logic**:
- **Location**: `src/lib/portfolio.ts:8`
- **Logic**: `data.filter((item: PortfolioItem) => item.image)`
- **Gotcha**: Portfolio items without images are silently dropped - no warning to content editors
- **Recommendation**: Add validation in Sanity schema to make `image` required

---

## Integration Points and External Dependencies

### External Services

| Service           | Purpose                | Integration Type | Key Files                | Notes                           |
| ----------------- | ---------------------- | ---------------- | ------------------------ | ------------------------------- |
| **Sanity CMS**    | Content management     | SDK + API        | `src/lib/sanity.ts`      | Primary content source          |
| **Vercel**        | Hosting + Analytics    | Platform         | N/A (config-free)        | Speed Insights embedded         |
| **Firebase**      | Legacy data source     | SDK (unused)     | `src/app/firebase.js`    | **DEPRECATED** - not in use     |
| **Google Fonts**  | Typography (Geist)     | Next.js loader   | `src/app/layout.tsx:2`   | Loaded via next/font/google     |
| **Font Awesome**  | Icon library           | NPM + React      | `src/app/utils/fontawesome.js` | Free brands icons only    |

### Internal Integration Points

**Data Flow**:
1. **Build Time** (or ISR revalidation):
   - `page.tsx` (Server Component) → calls `getPortfolioData()`
   - `portfolio.ts` → fetches data from Sanity client
   - `sanity.ts` → executes GROQ query via Sanity API
   - Returns `PortfolioItem[]` → grouped by category → rendered

2. **Client Interaction**:
   - Static HTML served to client
   - Speed Insights tracks performance
   - Social links open in new tabs (external navigation)

**Component Dependencies**:
- `page.tsx` imports `Header`, `HeroSection`, `PortfolioSection`
- `PortfolioSection` depends on `portfolio.ts` and `sanity.ts`
- All components share global styles from `globals.css`

**No Internal APIs** - this is a frontend-only application with no backend routes.

---

## Development and Deployment

### Local Development Setup

**Prerequisites**:
- Node.js (version not specified in package.json - recommend v18+ for Next.js 15)
- npm (lockfile present)

**Setup Steps** (Actual working process):

1. **Clone repository**
   ```bash
   git clone <repo-url>
   cd betancourt.me
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```
   - **Note**: Overrides in package.json will force specific versions
   - **Gotcha**: Some dependencies may show peer dependency warnings (expected)

3. **Configure environment variables**
   - Copy `.env.local.example` to `.env.local`
   - Set Sanity CMS credentials:
     ```
     NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id
     NEXT_PUBLIC_SANITY_DATASET=production
     NEXT_PUBLIC_SANITY_API_VERSION=2025-06-29
     ```
   - **Optional**: Remove Firebase env variables (not needed)

4. **Run development server**
   ```bash
   npm run dev
   ```
   - Opens on `http://localhost:3000`
   - Hot reloading enabled
   - TypeScript errors shown in terminal and browser

**Known Development Issues**:
- **First run**: May need to restart dev server if Sanity data doesn't load
- **Type checking**: Strict mode enabled - expect type errors if data schema changes

### Build and Deployment Process

**Build Process**:

```bash
npm run build    # Creates production build in .next/
npm run start    # Serves production build locally on port 3000
```

**Build Configuration**:
- **Webpack**: Handled by Next.js (no custom config)
- **Output**: Optimized static HTML + React hydration bundles
- **ISR**: Pages with `revalidate` export generate static with on-demand regeneration

**Deployment** (Vercel - Current Platform):

1. **Automatic Deployment**:
   - Push to `main` branch triggers Vercel build
   - Build command: `npm run build`
   - Output directory: `.next/`
   - Environment variables configured in Vercel dashboard

2. **Deployment Environments**:
   - **Production**: Linked to `main` branch
   - **Preview**: Auto-generated for pull requests
   - **No staging environment** currently configured

3. **Post-Deployment**:
   - Speed Insights automatically enabled
   - ISR cache managed by Vercel edge network
   - Sanity webhooks can trigger on-demand revalidation (not currently configured)

**Environment Variables (Deployment)**:
- Must configure in Vercel dashboard:
  - `NEXT_PUBLIC_SANITY_PROJECT_ID`
  - `NEXT_PUBLIC_SANITY_DATASET`
  - `NEXT_PUBLIC_SANITY_API_VERSION`

**CI/CD**:
- **No GitHub Actions** or custom CI configured
- Relies entirely on Vercel's built-in CI/CD

---

## Testing Reality

### Current Test Coverage

**Hard Truth**: **No tests exist in this project.**

- **Unit Tests**: 0% coverage (no test files)
- **Integration Tests**: None
- **E2E Tests**: None
- **Manual Testing**: Primary QA method

**Test Infrastructure**:
- No test framework installed (no Jest, Vitest, or testing-library)
- No test scripts in `package.json`
- No `__tests__` or `.test.ts` files in codebase

### Testing Gaps and Recommendations

**Critical Testing Gaps**:

1. **Data Fetching Logic** (`portfolio.ts`):
   - No tests for `getPortfolioData()` error handling
   - No tests for `groupPortfolioByCategory()` edge cases

2. **Component Rendering**:
   - No tests for conditional rendering in `PortfolioSection`
   - No tests for social link generation in `HeroSection`

3. **Type Safety**:
   - TypeScript provides compile-time checks, but no runtime validation
   - Sanity data shape not validated at runtime

**Recommended Testing Strategy** (for future):

```bash
# Install testing dependencies (not currently installed)
npm install -D jest @testing-library/react @testing-library/jest-dom
npm install -D @types/jest ts-jest

# Recommended test structure
src/
├── lib/
│   ├── portfolio.ts
│   └── portfolio.test.ts       # Unit tests for data logic
└── app/
    └── components/
        ├── PortfolioSection.tsx
        └── PortfolioSection.test.tsx  # Component tests
```

**Current QA Process**:
1. Manual testing in local development
2. Visual review in Vercel preview deployments
3. TypeScript compile-time checks via `npm run lint`

---

## Performance and Optimization

### Current Performance Strategy

**Next.js Optimizations** (automatically applied):
- **Image Optimization**: `next/image` used in `HeroSection.tsx:10` with `priority` flag
- **Font Optimization**: `next/font/google` loads Geist fonts with variable CSS
- **Code Splitting**: Automatic by Next.js App Router
- **Static Generation**: Home page pre-rendered at build time (ISR)

**ISR Configuration**:
- **Revalidation Period**: 3600 seconds (1 hour)
- **Strategy**: Background regeneration on cache miss
- **Trade-off**: Content freshness vs. build frequency

**Vercel Speed Insights**:
- Real User Monitoring (RUM) enabled via `@vercel/speed-insights`
- Tracks Web Vitals (LCP, FID, CLS, etc.)
- Integrated in `layout.tsx:30`

### Performance Considerations

**Assets**:
- **Profile Photo**: `foto_perfil.jpg` is 322KB (relatively large)
  - **Recommendation**: Optimize with WebP format or smaller dimensions
- **Font Awesome**: Loading entire brand icon set (potential optimization opportunity)

**Sanity CMS**:
- CDN enabled (`useCdn: true`) for faster image delivery
- GROQ query fetches all portfolio items (no pagination)
  - **Gotcha**: As portfolio grows, payload size increases
  - **Recommendation**: Implement pagination or filtering for large datasets

**Bundle Size**:
- Firebase SDK included but unused (adds ~200KB to bundle)
  - **Recommendation**: Remove Firebase dependency

---

## Security and Compliance

### Current Security Posture

**Dependency Security**:
- **Status**: ✅ All known vulnerabilities resolved (as of Dec 2, 2024)
- **Method**: Dependency overrides in `package.json`
- **Documentation**: See `SECURITY_FIXES.md` for CVE history

**Recent Security Fixes**:
1. **CVE-2025-5889** (brace-expansion ReDoS) - Resolved via npm audit fix
2. **CVE-2025-49005** (Next.js Cache Poisoning) - Updated to Next.js 15.3.5
3. **CVE-2024-53382** (PrismJS DOM Clobbering) - Forced prismjs@^1.30.0

**Environment Variable Security**:
- All Sanity variables prefixed with `NEXT_PUBLIC_*` (intentionally exposed to client)
- Firebase credentials in `.env` files (not in version control via `.gitignore`)
- **Recommendation**: Rotate Firebase credentials before removal

**Content Security**:
- Sanity CMS: Content managed via secure dashboard
- No user-generated content accepted on frontend
- External links use `rel="noopener noreferrer"` (see `HeroSection.tsx:32`)

### Security Recommendations for Evolution

**Short Term**:
1. Remove Firebase SDK and rotate any exposed credentials
2. Implement Content Security Policy (CSP) headers
3. Add Sanity webhook authentication for on-demand revalidation

**Long Term**:
1. Implement automated security scanning in CI/CD
2. Add OWASP dependency check
3. Consider Sanity Content Lake access controls for sensitive data

---

## Coding Standards and Patterns

### Existing Patterns Observed

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

### ESLint Configuration

**Rules Enforced** (via `eslint.config.mjs`):
- `next/core-web-vitals` - Next.js best practices
- `next/typescript` - TypeScript-specific Next.js rules

**No Custom Rules** currently configured.

### TypeScript Configuration

**Key Settings** (`tsconfig.json`):
- `strict: true` - All strict checks enabled
- `target: "ES2017"` - Modern JavaScript features
- `moduleResolution: "bundler"` - Next.js bundler resolution
- `paths: { "@/*": ["./*"] }` - Absolute imports

### Recommendations for Future Development

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

## Migration History and Legacy Code

### Firebase → Sanity CMS Migration

**Migration Status**: ✅ **Complete** (functionally, but cleanup pending)

**Timeline**:
- **Original System**: Firebase Firestore for portfolio data storage
- **Migration Date**: Estimated mid-2025 (based on file dates)
- **Current State**: Sanity CMS active, Firebase code preserved but unused

**Migration Artifacts**:

1. **Legacy Files** (preserved as `.firebase-backup`):
   - `src/app/components/PortfolioSection.tsx.firebase-backup` - Original Firebase-based component

2. **Unused Code** (still in repo):
   - `src/app/firebase.js` - Firebase initialization (imports but not called)
   - Firebase env variables still referenced in code

3. **Dependencies** (still installed):
   - `firebase@11.1.0` in `package.json` (unused, adds bundle size)

**Schema Compatibility**:
- Sanity schema designed to match Firebase structure:
  - `category`, `title`, `url`, `date`, `image` fields preserved
  - Additional `type` and `description` fields added in Sanity

**Data Migration**:
- Portfolio items migrated to Sanity CMS
- Firebase Realtime Database URL still in code: `betancourtme-143ba-default-rtdb.firebaseio.com`

### Cleanup Recommendations

**High Priority**:
1. Remove `firebase` from `package.json` dependencies
2. Delete `src/app/firebase.js`
3. Remove `NEXT_PUBLIC_FIREBASE_*` from env variable documentation

**Low Priority**:
1. Delete `.firebase-backup` files (if no rollback needed)
2. Update `CLAUDE.md` to remove Firebase references

---

## Future Evolution and Scalability

### Current Limitations and Growth Constraints

**Content Management**:
- **Current**: All portfolio items fetched in single query (no pagination)
- **Limit**: As portfolio grows (>100 items), page payload increases
- **Recommendation**: Implement pagination or category-based filtering

**Styling System**:
- **Current**: Mixed inline styles, CSS modules, and global CSS
- **Limit**: Difficult to scale to multi-page site or design system
- **Recommendation**: Adopt unified styling framework

**Component Reusability**:
- **Current**: Components tightly coupled to home page
- **Limit**: Adding new pages requires component refactoring
- **Recommendation**: Extract reusable UI components (Button, Card, Section, etc.)

**SEO and Metadata**:
- **Current**: Static metadata in `layout.tsx`
- **Limit**: No dynamic meta tags per portfolio item or category
- **Recommendation**: Implement dynamic metadata for better SEO

**Analytics and Tracking**:
- **Current**: Only Vercel Speed Insights (performance)
- **Limit**: No user behavior tracking, conversion tracking, or A/B testing
- **Recommendation**: Add Google Analytics or Plausible for insights

### Architecture Evolution Paths

**Path 1: Enhanced Portfolio Features**
- **Add**:
  - Individual portfolio item detail pages (`/portfolio/[slug]`)
  - Category filtering UI
  - Search functionality
  - Tags/technology filters
- **Impact**: Requires routing changes, new components, enhanced Sanity schema

**Path 2: Multi-Page Expansion**
- **Add**:
  - About page (`/about`)
  - Blog integration (`/blog`)
  - Contact form (`/contact`)
- **Impact**: Need form handling (API routes), possibly email service integration

**Path 3: Design System Implementation**
- **Add**:
  - Tailwind CSS or styled-components
  - Reusable component library
  - Theme system (light/dark mode)
  - Responsive breakpoints standardization
- **Impact**: Large refactoring effort, improves long-term maintainability

**Path 4: Performance Optimization**
- **Add**:
  - Image optimization (WebP, AVIF formats)
  - Bundle size reduction (remove Firebase, tree-shake Font Awesome)
  - Advanced caching strategies (stale-while-revalidate)
  - Sanity image CDN optimization
- **Impact**: Faster load times, better Core Web Vitals scores

**Path 5: Content Editing Experience**
- **Add**:
  - Sanity Studio customization
  - Preview mode for content editors
  - Draft/publish workflow
  - Content validation rules
- **Impact**: Better content management UX, reduces publishing errors

### Technical Evolution Roadmap

**Phase 1: Cleanup and Foundation** (1-2 weeks)
- Remove Firebase dependencies
- Standardize styling approach (recommend Tailwind CSS)
- Add testing framework (Jest + Testing Library)
- Implement Prettier for consistent formatting

**Phase 2: Enhanced Features** (2-4 weeks)
- Add portfolio item detail pages
- Implement category filtering
- Add dynamic metadata for SEO
- Enhance Sanity schema with additional fields

**Phase 3: Scalability** (4-6 weeks)
- Implement pagination for portfolio items
- Add search functionality
- Optimize images and bundle size
- Add comprehensive test coverage

**Phase 4: Expansion** (6-8 weeks)
- Multi-page architecture (About, Blog, Contact)
- Design system implementation
- Advanced analytics integration
- Sanity preview mode for editors

---

## Known Issues and Gotchas Summary

### Critical Gotchas for Developers

1. **ISR Revalidation Delay**:
   - Content changes in Sanity take up to 1 hour to appear
   - Solution: Reduce `revalidate` time or implement on-demand revalidation

2. **Firebase Credentials in Codebase**:
   - Firebase SDK still imported, credentials still referenced
   - Solution: Remove before new developers have access (security)

3. **Silent Portfolio Item Filtering**:
   - Items without images disappear without warning
   - Solution: Make `image` required in Sanity schema or add validation logs

4. **Dependency Overrides Lock-In**:
   - `package.json` overrides prevent automatic updates
   - Solution: Regularly review and test removing overrides

5. **Empty Navigation Element**:
   - `<nav>` exists but is empty - intentional or incomplete?
   - Solution: Clarify intent and either remove or implement

6. **Mixed Styling Approaches**:
   - Inline styles, CSS modules, global CSS all coexist
   - Solution: Standardize before adding more components

### Environment Variable Gotchas

**Required Variables**:
- `NEXT_PUBLIC_SANITY_PROJECT_ID` - **Must be set** or portfolio is empty
- `NEXT_PUBLIC_SANITY_DATASET` - Defaults to "production" if missing
- `NEXT_PUBLIC_SANITY_API_VERSION` - Defaults to "2025-06-29" if missing

**Unused But Referenced Variables**:
- `NEXT_PUBLIC_FIREBASE_*` - Still in `.env.local.example` but not needed

**Vercel Deployment**:
- Must configure Sanity variables in Vercel dashboard
- Missing variables cause silent failures (no error, just empty data)

---

## Appendix - Useful Commands and Scripts

### Frequently Used Commands

```bash
# Development
npm run dev         # Start dev server on localhost:3000

# Production
npm run build       # Build production bundle
npm run start       # Serve production build locally

# Code Quality
npm run lint        # Run ESLint (Next.js + TypeScript rules)

# Dependency Management
npm install         # Install dependencies (applies overrides)
npm audit           # Check for security vulnerabilities
npm audit fix       # Auto-fix security issues (may not work with overrides)
```

### Debugging and Troubleshooting

**Common Issues**:

1. **Empty Portfolio on Home Page**:
   - Check Sanity env variables are set
   - Verify Sanity project ID matches your Sanity dashboard
   - Check browser console for `Error fetching portfolio data from Sanity`
   - Verify portfolio items in Sanity have `image` field populated

2. **TypeScript Errors**:
   - Run `npm run lint` to see all errors
   - Check `tsconfig.json` for strict mode settings
   - Verify imports use `@/*` path alias correctly

3. **Build Failures**:
   - Clear `.next/` directory: `rm -rf .next`
   - Reinstall dependencies: `rm -rf node_modules && npm install`
   - Check for missing env variables in build logs

4. **Styling Not Applied**:
   - Check if CSS file is imported in component
   - Verify `globals.css` is imported in `layout.tsx`
   - Check for CSS specificity conflicts

**Debug Mode**:
- Next.js debug output: `DEBUG=* npm run dev`
- TypeScript verbose: `tsc --noEmit --extendedDiagnostics`

**Logs**:
- **Development**: Terminal output from `npm run dev`
- **Production (Vercel)**: Check Vercel deployment logs in dashboard
- **Client Errors**: Browser console (no server-side error logging configured)

---

## Contact and Support

**Project Maintainer**: Juan Betancourt
- **LinkedIn**: [linkedin.com/in/betancourtfit](https://linkedin.com/in/betancourtfit)
- **GitHub**: [github.com/betancourtfit](https://github.com/betancourtfit)
- **Twitter**: [@betan_eth](https://twitter.com/betan_eth)

**Codebase Repository**: (Specify Git remote URL)

**Content Management**:
- **Sanity CMS Dashboard**: [sanity.io](https://www.sanity.io/) (requires account access)
- **Sanity Project ID**: `NEXT_PUBLIC_SANITY_PROJECT_ID` (see env variables)

---

## Conclusion

This brownfield architecture document captures the **actual state** of the betancourt.me portfolio website as of December 2, 2025. The system is a modern Next.js 15 application with a clean, working architecture using Sanity CMS as its content backend.

**Key Strengths**:
- Modern tech stack (Next.js 15, React 19, TypeScript)
- Clean separation of concerns (components, lib, config)
- Performance-optimized (ISR, image optimization, Speed Insights)
- Security vulnerabilities addressed

**Key Opportunities**:
- Remove Firebase legacy code and dependencies
- Standardize styling approach for scalability
- Add testing infrastructure
- Implement pagination for growing content
- Enhance SEO with dynamic metadata

**For AI Agents and Developers**:
This document provides the foundation for understanding the current system and planning enhancements. Always consult this document before making architectural changes, and update it as the system evolves.

---

**Document Version**: 1.0
**Last Updated**: 2025-12-02
**Next Review**: After next major enhancement or quarterly
