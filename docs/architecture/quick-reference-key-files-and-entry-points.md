# Quick Reference - Key Files and Entry Points

## Critical Files for Understanding the System

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
