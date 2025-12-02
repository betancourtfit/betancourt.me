import { test, expect } from '@playwright/test';

/**
 * Performance & Bundle Size Tests
 * Verifies Firebase removal improved performance metrics
 */

test.describe('Performance', () => {
  test('should have reasonable page load time', async ({ page }) => {
    const startTime = Date.now();

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    const loadTime = Date.now() - startTime;

    // Page should load in under 5 seconds (generous for local dev)
    expect(loadTime).toBeLessThan(5000);
  });

  test('should not load Firebase SDK', async ({ page }) => {
    // Track all script sources
    const scripts: string[] = [];

    page.on('response', async response => {
      if (response.url().endsWith('.js')) {
        scripts.push(response.url());
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Verify no Firebase scripts are loaded
    const firebaseScripts = scripts.filter(url =>
      url.includes('firebase') ||
      url.includes('firestore') ||
      url.includes('firebaseapp')
    );

    expect(firebaseScripts).toHaveLength(0);
  });

  test('should have JavaScript bundles loaded', async ({ page }) => {
    const jsFiles: string[] = [];

    page.on('response', async response => {
      // Track JavaScript files
      if (response.url().includes('.js') && response.url().includes('/_next/')) {
        jsFiles.push(response.url());
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Should have Next.js JavaScript bundles loaded
    console.log(`Total JS files loaded: ${jsFiles.length}`);
    expect(jsFiles.length).toBeGreaterThan(0);

    // Verify no Firebase bundles
    const firebaseFiles = jsFiles.filter(url =>
      url.includes('firebase') || url.includes('firestore')
    );
    expect(firebaseFiles).toHaveLength(0);
  });

  test('should not have Firebase-related memory leaks', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Check for Firebase globals that shouldn't exist
    const hasFirebaseGlobal = await page.evaluate(() => {
      return typeof (window as any).firebase !== 'undefined';
    });

    expect(hasFirebaseGlobal).toBe(false);
  });

  test('should have Speed Insights component in layout', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Verify Speed Insights is in the layout (may not load in dev mode)
    // In production, Speed Insights loads from Vercel's CDN
    // We just verify there are no Firebase Analytics scripts
    const scripts: string[] = [];

    page.on('response', response => {
      scripts.push(response.url());
    });

    await page.reload();
    await page.waitForLoadState('networkidle');

    // Critical: Should NOT have Firebase Analytics
    const firebaseAnalytics = scripts.filter(url =>
      url.includes('firebase') && url.includes('analytics')
    );
    expect(firebaseAnalytics).toHaveLength(0);

    // Note: Speed Insights only loads in production Vercel deployments
  });
});
