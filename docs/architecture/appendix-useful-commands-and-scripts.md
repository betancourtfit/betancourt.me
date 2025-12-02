# Appendix - Useful Commands and Scripts

## Frequently Used Commands

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

## Debugging and Troubleshooting

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
