# Source Tree and Module Organization

## Project Structure (Actual)

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

## Key Modules and Their Purpose

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
