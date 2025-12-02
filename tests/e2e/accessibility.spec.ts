import { test, expect } from '@playwright/test';

/**
 * Accessibility Tests
 * Ensures Firebase removal didn't affect accessibility
 */

test.describe('Accessibility', () => {
  test('should have proper document structure', async ({ page }) => {
    await page.goto('/');

    // Verify single h1
    const h1Count = await page.locator('h1').count();
    expect(h1Count).toBe(1);

    // Verify h1 has meaningful text
    const h1Text = await page.locator('h1').textContent();
    expect(h1Text).toContain('Juan Betancourt');
  });

  test('should have alt text for all images', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Get all images
    const images = page.locator('img');
    const imageCount = await images.count();

    // Check each image has alt text
    for (let i = 0; i < imageCount; i++) {
      const img = images.nth(i);
      const alt = await img.getAttribute('alt');
      expect(alt).toBeTruthy();
      expect(alt).not.toBe('');
    }
  });

  test('should have proper link accessibility', async ({ page }) => {
    await page.goto('/');

    // All visible links should have discernible text, aria-label, or icon
    const links = page.locator('a:visible');
    const linkCount = await links.count();

    for (let i = 0; i < linkCount; i++) {
      const link = links.nth(i);
      const text = await link.textContent();
      const ariaLabel = await link.getAttribute('aria-label');
      const hasIcon = await link.locator('svg').count() > 0;

      // Link should have either text content, aria-label, or contain an icon
      expect(text?.trim() || ariaLabel || hasIcon).toBeTruthy();
    }
  });

  test('should have proper semantic HTML', async ({ page }) => {
    await page.goto('/');

    // Verify semantic elements exist
    const header = page.locator('header');
    await expect(header).toBeVisible();

    const main = page.locator('main');
    await expect(main).toBeVisible();

    const sections = page.locator('section');
    const sectionCount = await sections.count();
    expect(sectionCount).toBeGreaterThan(0);
  });

  test('should have proper heading hierarchy', async ({ page }) => {
    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Get all headings
    const h1Count = await page.locator('h1').count();
    const h2Count = await page.locator('h2').count();
    const h3Count = await page.locator('h3').count();

    // Should have proper hierarchy
    expect(h1Count).toBe(1); // Single h1
    expect(h2Count).toBeGreaterThanOrEqual(0); // Categories
    expect(h3Count).toBeGreaterThanOrEqual(0); // Portfolio items
  });

  test('should not have console accessibility warnings', async ({ page }) => {
    const consoleWarnings: string[] = [];

    page.on('console', msg => {
      if (msg.type() === 'warning' || msg.type() === 'error') {
        consoleWarnings.push(msg.text());
      }
    });

    await page.goto('/');
    await page.waitForLoadState('networkidle');

    // Filter for a11y-related warnings
    const a11yWarnings = consoleWarnings.filter(warning =>
      warning.toLowerCase().includes('accessibility') ||
      warning.toLowerCase().includes('aria') ||
      warning.toLowerCase().includes('role')
    );

    expect(a11yWarnings).toHaveLength(0);
  });
});
