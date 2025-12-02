# Known Issues and Gotchas Summary

## Critical Gotchas for Developers

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

## Environment Variable Gotchas

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
