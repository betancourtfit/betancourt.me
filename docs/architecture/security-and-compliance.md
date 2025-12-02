# Security and Compliance

## Current Security Posture

**Dependency Security**:
- **Status**: ✅ All known vulnerabilities resolved (as of Dec 2, 2024)
- **Method**: Dependency overrides in `package.json`
- **Documentation**: See `SECURITY_FIXES.md` for CVE history

**Recent Security Fixes**:
1. **CVE-2025-5889** (brace-expansion ReDoS) - Resolved via npm audit fix
2. **CVE-2025-49005** (Next.js Cache Poisoning) - Updated to Next.js 15.3.5
3. **CVE-2024-53382** (PrismJS DOM Clobbering) - Forced prismjs@^1.30.0

**Environment Variable Security**:
- All Sanity variables prefixed with `NEXT_PUBLIC_*` (intentionally exposed to client)
- Firebase credentials in `.env` files (not in version control via `.gitignore`)
- **Recommendation**: Rotate Firebase credentials before removal

**Content Security**:
- Sanity CMS: Content managed via secure dashboard
- No user-generated content accepted on frontend
- External links use `rel="noopener noreferrer"` (see `HeroSection.tsx:32`)

## Security Recommendations for Evolution

**Short Term**:
1. Remove Firebase SDK and rotate any exposed credentials
2. Implement Content Security Policy (CSP) headers
3. Add Sanity webhook authentication for on-demand revalidation

**Long Term**:
1. Implement automated security scanning in CI/CD
2. Add OWASP dependency check
3. Consider Sanity Content Lake access controls for sensitive data

---
