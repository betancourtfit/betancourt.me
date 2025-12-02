# Data Models and APIs

## Data Models

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

## API Specifications

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
