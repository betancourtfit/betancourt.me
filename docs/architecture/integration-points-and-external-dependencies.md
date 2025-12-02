# Integration Points and External Dependencies

## External Services

| Service           | Purpose                | Integration Type | Key Files                | Notes                           |
| ----------------- | ---------------------- | ---------------- | ------------------------ | ------------------------------- |
| **Sanity CMS**    | Content management     | SDK + API        | `src/lib/sanity.ts`      | Primary content source          |
| **Vercel**        | Hosting + Analytics    | Platform         | N/A (config-free)        | Speed Insights embedded         |
| **Firebase**      | Legacy data source     | SDK (unused)     | `src/app/firebase.js`    | **DEPRECATED** - not in use     |
| **Google Fonts**  | Typography (Geist)     | Next.js loader   | `src/app/layout.tsx:2`   | Loaded via next/font/google     |
| **Font Awesome**  | Icon library           | NPM + React      | `src/app/utils/fontawesome.js` | Free brands icons only    |

## Internal Integration Points

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
