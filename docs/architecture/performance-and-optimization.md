# Performance and Optimization

## Current Performance Strategy

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

## Performance Considerations

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
