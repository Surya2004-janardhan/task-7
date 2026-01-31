const { test, expect } = require('@playwright/test');

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';

test.describe('Blog Platform Requirements', () => {
  
  test('Homepage has necessary components and recent posts', async ({ page }) => {
    await page.goto(baseUrl);
    
    // Check if site title is present in the hero section
    await expect(page.locator('h1:has-text("Modern Blog")')).toBeVisible();
    
    // Check for post-list container
    const postList = page.locator('[data-testid="post-list"]');
    await expect(postList).toBeVisible();
    
    // Check if at least some post cards are present
    const postCards = page.locator('[data-testid^="post-card-"]');
    const count = await postCards.count();
    expect(count).toBeGreaterThan(0);
    
    // Verify a post card has a "Read More" link with correct data-testid
    const firstPostSlug = await postCards.first().getAttribute('data-testid');
    const slug = firstPostSlug.replace('post-card-', '');
    const readMore = page.locator(`[data-testid="read-more-${slug}"]`);
    await expect(readMore).toBeVisible();
  });

  test('Blog archive and pagination', async ({ page }) => {
    await page.goto(`${baseUrl}/blog`);
    
    // Check for post-list on archive page
    await expect(page.locator('[data-testid="post-list"]')).toBeVisible();
    
    // Check for pagination (assuming more than 10 posts)
    const pagination = page.locator('[data-testid="pagination"]');
    if (await pagination.isVisible()) {
      await expect(page.locator('[data-testid="pagination-next"]')).toBeVisible();
      // If we're on page 1, prev should not be there or should be disabled
      const prev = page.locator('[data-testid="pagination-prev"]');
      await expect(prev).not.toBeVisible();
      
      // Navigate to page 2
      await page.click('[data-testid="pagination-next"]');
      await expect(page).toHaveURL(/.*blog\/2/);
      await expect(page.locator('[data-testid="pagination-prev"]')).toBeVisible();
    }
  });

  test('Individual post page requirements', async ({ page }) => {
    // Navigate to the first post
    await page.goto(`${baseUrl}/blog`);
    const firstPostCard = page.locator('[data-testid^="post-card-"]').first();
    const slugAttr = await firstPostCard.getAttribute('data-testid');
    const slug = slugAttr.replace('post-card-', '');
    
    await page.click(`[data-testid="read-more-${slug}"]`);
    
    // Check article container
    await expect(page.locator('[data-testid="blog-post"]')).toBeVisible();
    
    // Check title
    await expect(page.locator('[data-testid="post-title"]')).toBeVisible();
    
    // Check content
    await expect(page.locator('[data-testid="post-content"]')).toBeVisible();
    
    // Check reading time
    await expect(page.locator('[data-testid="reading-time"]')).toBeVisible();
    
    // Check optimized image (hero or content)
    await expect(page.locator('[data-testid="optimized-image"]').first()).toBeVisible();
    
    // Check code blocks (if present in the first post)
    // We'll search for one in the post-content
    const codeBlock = page.locator('[data-testid="code-block"]');
    if (await codeBlock.count() > 0) {
      await expect(codeBlock.first()).toBeVisible();
    }
  });

  test('Theme toggle functionality', async ({ page }) => {
    await page.goto(baseUrl);
    
    const themeToggle = page.locator('[data-testid="theme-toggle"]');
    await expect(themeToggle).toBeVisible();
    
    // Check initial mode (usually light or dark based on system)
    const html = page.locator('html');
    const initialClass = await html.getAttribute('class') || '';
    
    await themeToggle.click();
    
    // Wait for theme change - checking for class change
    await expect(async () => {
      const currentClass = await html.getAttribute('class') || '';
      expect(currentClass).not.toBe(initialClass);
    }).toPass();
  });

  test('Custom 404 page', async ({ page }) => {
    await page.goto(`${baseUrl}/non-existent-page`);
    await expect(page.locator('[data-testid="not-found-message"]')).toBeVisible();
    await expect(page.locator('text=404')).toBeVisible();
  });

  test('Sitemap and RSS feeds are accessible', async ({ page }) => {
    const sitemap = await page.request.get(`${baseUrl}/sitemap.xml`);
    expect(sitemap.status()).toBe(200);
    
    const rss = await page.request.get(`${baseUrl}/rss.xml`);
    expect(rss.status()).toBe(200);
  });

  test('SEO Meta Tags', async ({ page }) => {
    await page.goto(baseUrl);
    const title = await page.title();
    expect(title).toBeTruthy();
    
    const description = await page.locator('meta[name="description"]').getAttribute('content');
    expect(description).toBeTruthy();
    
    // Check OpenGraph
    const ogTitle = await page.locator('meta[property="og:title"]').getAttribute('content');
    expect(ogTitle).toBeTruthy();
  });
});
