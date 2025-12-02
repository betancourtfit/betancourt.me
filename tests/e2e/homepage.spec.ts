import { test, expect } from '@playwright/test';

/**
 * Homepage E2E Tests
 * Verifies critical functionality after Firebase removal
 */

test.describe('Homepage', () => {
  test('should load homepage successfully', async ({ page }) => {
    await page.goto('/');

    // Verify page loads
    await expect(page).toHaveTitle(/betancourt\.me/);
  });

  test('should display header with logo', async ({ page }) => {
    await page.goto('/');

    // Verify header exists
    const header = page.locator('header');
    await expect(header).toBeVisible();

    // Verify logo text
    const logo = page.locator('.logo');
    await expect(logo).toHaveText('Betancourt');
  });

  test('should display hero section with profile', async ({ page }) => {
    await page.goto('/');

    // Verify hero section
    const heroSection = page.locator('section').first();
    await expect(heroSection).toBeVisible();

    // Verify profile name
    await expect(page.locator('h1')).toContainText('Juan Betancourt');

    // Verify tagline
    await expect(page.locator('p').first()).toContainText('Growth Marketer');

    // Verify profile image loads
    const profileImage = page.locator('img[alt="Juan Betancourt"]');
    await expect(profileImage).toBeVisible();
  });

  test('should display social media links', async ({ page }) => {
    await page.goto('/');

    // Verify all social links are present and visible
    const linkedinLink = page.locator('a[href*="linkedin.com"]');
    await expect(linkedinLink).toBeVisible();

    const twitterLink = page.locator('a[href*="twitter.com"]');
    await expect(twitterLink).toBeVisible();

    const instagramLink = page.locator('a[href*="instagram.com"]');
    await expect(instagramLink).toBeVisible();

    const githubLink = page.locator('a[href*="github.com"]');
    await expect(githubLink).toBeVisible();
  });

  test('should have proper link attributes for external links', async ({ page }) => {
    await page.goto('/');

    // Verify external links have proper security attributes
    const externalLinks = page.locator('a[target="_blank"]');
    const count = await externalLinks.count();

    // Should have at least 4 external links (social media)
    expect(count).toBeGreaterThanOrEqual(4);

    // Verify first external link has noopener noreferrer
    const firstLink = externalLinks.first();
    const rel = await firstLink.getAttribute('rel');
    expect(rel).toContain('noopener');
    expect(rel).toContain('noreferrer');
  });
});
