# Technical Debt and Known Issues

## Critical Technical Debt

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

## Workarounds and Gotchas

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
