# Development and Deployment

## Local Development Setup

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

## Build and Deployment Process

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
