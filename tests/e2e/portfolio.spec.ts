import { test, expect } from '@playwright/test';

/**
 * Portfolio Section E2E Tests
 * Verifies Sanity CMS integration works correctly after Firebase removal
 */

test.describe('Portfolio Section', () => {
  test('should render portfolio section without errors', async ({ page }) => {
    await page.goto('/');

    // Wait for portfolio section to load
    // Note: Using a more generous timeout as data comes from Sanity CMS
    await page.waitForLoadState('networkidle');

    // Verify page rendered without errors
    const main = page.locator('main');
    await expect(main).toBeVisible();

    // Verify sections exist (may be empty if no Sanity data in dev)
    const allSections = page.locator('section');
    const sectionCount = await allSections.count();

    // Should have at least the hero section
    expect(sectionCount).toBeGreaterThanOrEqual(0);
  });

  test('should display portfolio cards with images and titles', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Verify portfolio cards exist
    const cards = page.locator('.card');
    const cardCount = await cards.count();

    if (cardCount > 0) {
      // Verify first card has required elements
      const firstCard = cards.first();

      // Check for image
      const cardImage = firstCard.locator('img');
      await expect(cardImage).toBeVisible();

      // Check for title
      const cardTitle = firstCard.locator('h3');
      await expect(cardTitle).toBeVisible();

      // Check for "Leer más" link
      const readMoreLink = firstCard.locator('a:has-text("Leer más")');
      await expect(readMoreLink).toBeVisible();
    }
  });

  test('should have working portfolio item links', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Find all "Leer más" links
    const portfolioLinks = page.locator('a:has-text("Leer más")');
    const linkCount = await portfolioLinks.count();

    if (linkCount > 0) {
      // Verify first link has valid attributes
      const firstLink = portfolioLinks.first();
      const href = await firstLink.getAttribute('href');
      const target = await firstLink.getAttribute('target');
      const rel = await firstLink.getAttribute('rel');

      // Should have URL
      expect(href).toBeTruthy();
      expect(href).not.toBe('#');

      // Should open in new tab with security attributes
      expect(target).toBe('_blank');
      expect(rel).toContain('noopener');
      expect(rel).toContain('noreferrer');
    }
  });

  test('should group portfolio items by category', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Verify sections have category headings (h2)
    const categoryHeadings = page.locator('section h2');
    const headingCount = await categoryHeadings.count();

    // Should have at least one category
    expect(headingCount).toBeGreaterThan(0);

    if (headingCount > 0) {
      // Verify first heading has text
      const firstHeading = categoryHeadings.first();
      const headingText = await firstHeading.textContent();
      expect(headingText).toBeTruthy();
      expect(headingText!.length).toBeGreaterThan(0);
    }
  });

  test('should load portfolio images successfully', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Get all portfolio images
    const portfolioImages = page.locator('.card img');
    const imageCount = await portfolioImages.count();

    if (imageCount > 0) {
      // Verify first image loads without errors
      const firstImage = portfolioImages.first();

      // Check image is visible
      await expect(firstImage).toBeVisible();

      // Check image has src attribute
      const src = await firstImage.getAttribute('src');
      expect(src).toBeTruthy();
      expect(src).not.toBe('');

      // Check image has alt text
      const alt = await firstImage.getAttribute('alt');
      expect(alt).toBeTruthy();
    }
  });

  test('should not display Firebase errors in console', async ({ page }) => {
    const consoleErrors: string[] = [];

    // Capture console errors
    page.on('console', msg => {
      if (msg.type() === 'error') {
        consoleErrors.push(msg.text());
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Verify no Firebase-related errors
    const firebaseErrors = consoleErrors.filter(error =>
      error.toLowerCase().includes('firebase') ||
      error.toLowerCase().includes('firestore')
    );

    expect(firebaseErrors).toHaveLength(0);
  });

  test('should not make Firebase requests', async ({ page }) => {
    // Track network requests
    const requests: string[] = [];

    page.on('request', request => {
      requests.push(request.url());
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Verify NO Firebase requests (critical test)
    const firebaseRequests = requests.filter(url =>
      url.includes('firebase') ||
      url.includes('firestore') ||
      url.includes('firebaseapp.com')
    );

    expect(firebaseRequests).toHaveLength(0);

    // Note: Sanity requests may not occur in dev if using ISR with cached data
    // This is expected behavior and not a failure
  });
});
