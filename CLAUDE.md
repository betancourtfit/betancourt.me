# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Development Commands

```bash
npm run dev        # Start development server on localhost:3000
npm run build      # Build for production
npm run start      # Start production server
npm run lint       # Run ESLint with Next.js rules
```

## Architecture Overview

This is a Next.js 15 portfolio website built with React 19 and TypeScript, featuring:

### Technology Stack
- **Framework:** Next.js 15 with App Router
- **Runtime:** React 19 with Strict Mode enabled
- **Language:** TypeScript targeting ES2017
- **Styling:** CSS modules and global CSS
- **Icons:** Font Awesome integration
- **Database:** Firebase Firestore
- **Analytics:** Vercel Speed Insights
- **Deployment:** Optimized for Vercel

### Project Structure
- Uses App Router architecture (`src/app/`)
- Component-based structure in `src/app/components/`
- Firebase configuration in `src/app/firebase.js`
- Font Awesome utilities in `src/app/utils/`

## Key Configuration

### TypeScript Configuration
- Target: ES2017 with strict mode
- Path mapping: `@/*` points to project root
- Includes Next.js TypeScript plugin

### ESLint Configuration
- Extends Next.js core web vitals and TypeScript rules
- Uses flat config format with compatibility layer

### Content Management
- **Current**: Sanity CMS headless integration
- **Legacy**: Firebase/Firestore (backed up as `.firebase-backup`)
- ISR enabled with 1-hour revalidation
- GROQ queries for optimized data fetching

## Development Notes

### Component Architecture
- Modular component structure: Header, HeroSection, PortfolioSection
- Components are imported directly in main page component
- Font Awesome configured globally through utils

### Styling Approach
- CSS modules for page-specific styles
- Global CSS for application-wide styles
- Geist font family integration (sans and mono variants)

### Environment Setup
Sanity CMS requires environment variables:
- `NEXT_PUBLIC_SANITY_PROJECT_ID` (6nwko94l)
- `NEXT_PUBLIC_SANITY_DATASET` (production)  
- `NEXT_PUBLIC_SANITY_API_VERSION` (2025-06-29)

Legacy Firebase variables (can be removed):
- `NEXT_PUBLIC_FIREBASE_*` (preserved in `.firebase-backup` files)